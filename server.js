/* eslint-disable */
// Production server for Fly.io: serves the React build and handles /api/contact.
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 8080;

// Behind Fly's proxy — trust X-Forwarded-* so req.ip / rate limiting are accurate.
app.set('trust proxy', 1);
app.disable('x-powered-by');

// --- Config (set as Fly secrets) ---
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || '';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'leads@yoramshahar.com';
const RESEND_KEY = process.env.RESEND_API_KEY;
const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE; // e.g. 972505508499
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY;

// --- Admin page credentials (set as Fly secrets) ---
const ADMIN_USER = process.env.ADMIN_USER || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
// The admin URL path is itself a secret (set ADMIN_PATH on Fly). The default
// here is only a harmless fallback; the real path never lives in the repo.
const ADMIN_PATH = '/' + (process.env.ADMIN_PATH || 'admin').replace(/^\/+|\/+$/g, '');
// Shared key for the Google Ads lead-form webhook (set GOOGLE_LEAD_KEY on Fly).
const GOOGLE_LEAD_KEY = process.env.GOOGLE_LEAD_KEY || '';

// Lead log lives on the mounted Fly volume so it survives deploys.
const DATA_DIR = process.env.DATA_DIR || __dirname;
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl');
try {
  fs.mkdirSync(DATA_DIR, { recursive: true });
} catch (e) {
  console.error('could not ensure data dir', e);
}

const RATE_LIMIT_PER_HOUR = 5;
const rateMap = new Map(); // ip -> { count, resetAt }
// Periodically purge expired entries so the map can't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip);
  }
}, 600_000).unref();

// --- Security headers (helmet) ---
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://www.googletagmanager.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'data:',
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://googleads.g.doubleclick.net',
          'https://www.google.com',
          'https://www.google.co.il',
        ],
        connectSrc: [
          "'self'",
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://googleads.g.doubleclick.net',
          'https://www.google.com',
        ],
        frameSrc: ["'self'", 'https://td.doubleclick.net', 'https://www.googletagmanager.com'],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    hsts: { maxAge: 15552000, includeSubDomains: true },
  })
);
app.use(compression());
app.use(express.json({ limit: '16kb' }));

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const isValidPhone = (p) => /^[\d\s+\-()]{7,20}$/.test(p);

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= RATE_LIMIT_PER_HOUR;
}

async function sendEmail(lead, ip) {
  if (!RESEND_KEY || !NOTIFY_EMAIL) return;
  const resend = new Resend(RESEND_KEY);
  const emailRow = lead.email
    ? `<p><strong>אימייל:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>`
    : '';
  const payload = {
    from: `Yoram Shahar Site <${FROM_EMAIL}>`,
    to: NOTIFY_EMAIL,
    subject: `פנייה חדשה מהאתר: ${lead.name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>פנייה חדשה מהאתר</h2>
        <p><strong>שם:</strong> ${escapeHtml(lead.name)}</p>
        <p><strong>טלפון:</strong> <a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></p>
        ${emailRow}
        <p><strong>הודעה:</strong></p>
        <blockquote style="border-right: 3px solid #E67E22; padding-right: 10px; color: #333;">
          ${escapeHtml(lead.message).replace(/\n/g, '<br>')}
        </blockquote>
        <hr><p style="color:#999;font-size:12px;">IP: ${escapeHtml(ip)} · ${new Date().toISOString()}</p>
      </div>`,
  };
  // Only set reply-to when we actually have a valid email (Google leads may lack one).
  if (lead.email) payload.replyTo = lead.email;
  await resend.emails.send(payload);
}

async function sendWhatsApp(lead) {
  if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) return;
  const text = `פנייה חדשה מהאתר:\nשם: ${lead.name}\nטלפון: ${lead.phone}\nאימייל: ${lead.email}\n\n${lead.message}`;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(CALLMEBOT_PHONE)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}`;
  await fetch(url);
}

app.get('/healthz', (_req, res) => res.status(200).send('ok'));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, message, website } = req.body || {};

    // Honeypot — bots fill this, humans never do.
    if (website && String(website).trim() !== '') {
      return res.status(200).json({ ok: true });
    }
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: 'חסרים פרטים' });
    }
    if ([name, phone, email, message].some((v) => typeof v !== 'string')) {
      return res.status(400).json({ error: 'פרטים לא תקינים' });
    }
    if (name.length > 200 || phone.length > 30 || email.length > 200 || message.length > 2000) {
      return res.status(400).json({ error: 'שדה ארוך מדי' });
    }
    if (!isValidEmail(email)) return res.status(400).json({ error: 'אימייל לא תקין' });
    if (!isValidPhone(phone)) return res.status(400).json({ error: 'מספר טלפון לא תקין' });

    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: 'נשלחו יותר מדי פניות. נסה שוב בעוד שעה.' });
    }

    const lead = { name, phone, email, message };

    // Persist (best-effort, append-only log on the volume).
    try {
      fs.appendFileSync(LEADS_FILE, JSON.stringify({ ...lead, source: 'אתר', ip, ts: new Date().toISOString() }) + '\n');
    } catch (e) {
      console.error('lead log error', e);
    }

    // Notify via email + WhatsApp in parallel; failures don't block each other.
    const results = await Promise.allSettled([sendEmail(lead, ip), sendWhatsApp(lead)]);
    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`notification ${i} failed:`, r.reason);
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('contact handler error', e);
    return res.status(500).json({ error: 'שגיאת שרת' });
  }
});

// ---------------------------------------------------------------------------
// Google Ads Lead Form webhook. Google POSTs each lead here; we verify the
// shared key, store it in the same lead log, and notify. Appears in /admin.
// ---------------------------------------------------------------------------
app.post('/api/google-lead', async (req, res) => {
  try {
    const body = req.body || {};
    if (!GOOGLE_LEAD_KEY || body.google_key !== GOOGLE_LEAD_KEY) {
      return res.status(401).json({ error: 'invalid key' });
    }
    const cols = Array.isArray(body.user_column_data) ? body.user_column_data : [];
    const pick = (...ids) => {
      for (const id of ids) {
        const c = cols.find((x) => String(x.column_id).toUpperCase() === id);
        if (c && c.string_value) return c.string_value;
      }
      return '';
    };
    const name = pick('FULL_NAME', 'FIRST_NAME', 'LAST_NAME');
    const phone = pick('PHONE_NUMBER');
    const email = pick('EMAIL');
    const message = body.is_test ? '[בדיקה] ליד מ-Google Ads' : 'ליד שהתקבל דרך Google Ads';
    const lead = { name, phone, email, message };

    try {
      fs.appendFileSync(
        LEADS_FILE,
        JSON.stringify({ ...lead, source: 'Google Ads', is_test: !!body.is_test, lead_id: body.lead_id, ip: 'google-ads', ts: new Date().toISOString() }) + '\n'
      );
    } catch (e) {
      console.error('google-lead log error', e);
    }

    if (!body.is_test) {
      await Promise.allSettled([sendEmail(lead, 'Google Ads'), sendWhatsApp(lead)]);
    }
    return res.status(200).json({ status: 'ok' });
  } catch (e) {
    console.error('google-lead error', e);
    return res.status(500).json({ error: 'server error' });
  }
});

// ---------------------------------------------------------------------------
// Admin area — Basic Auth protected, server-rendered. Lead data never enters
// the public React bundle. Locked entirely until ADMIN_USER/ADMIN_PASSWORD set.
// ---------------------------------------------------------------------------
function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

function requireAdmin(req, res, next) {
  res.set('Cache-Control', 'no-store');
  if (!ADMIN_USER || !ADMIN_PASSWORD) {
    return res.status(503).send('האזור האישי לא הוגדר עדיין.');
  }
  const hdr = req.headers.authorization || '';
  const [scheme, encoded] = hdr.split(' ');
  if (scheme === 'Basic' && encoded) {
    const decoded = Buffer.from(encoded, 'base64').toString();
    const idx = decoded.indexOf(':');
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    if (safeEqual(user, ADMIN_USER) && safeEqual(pass, ADMIN_PASSWORD)) {
      return next();
    }
  }
  res.set('WWW-Authenticate', 'Basic realm="Yoram Admin", charset="UTF-8"');
  return res.status(401).send('נדרשת הזדהות');
}

function readLeads() {
  try {
    return fs
      .readFileSync(LEADS_FILE, 'utf8')
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function renderAdmin(leads) {
  const rows = leads
    .map((l, i) => {
      const when = new Date(l.ts).toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' });
      const source = l.source || 'אתר';
      const badge = source === 'Google Ads' ? 'background:#4285F4;color:#fff' : 'background:#E67E22;color:#fff';
      return `<tr>
        <td>${leads.length - i}</td>
        <td class="nowrap">${escapeHtml(when)}</td>
        <td><span class="src" style="${badge}">${escapeHtml(source)}</span></td>
        <td>${escapeHtml(l.name || '')}</td>
        <td class="nowrap"><a href="tel:${escapeHtml(l.phone || '')}">${escapeHtml(l.phone || '')}</a></td>
        <td><a href="mailto:${escapeHtml(l.email || '')}">${escapeHtml(l.email || '')}</a></td>
        <td class="msg">${escapeHtml(l.message || '')}</td>
      </tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="he" dir="rtl"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>פניות מהאתר — יורם שחר</title>
<style>
  body{font-family:-apple-system,Segoe UI,Rubik,Arial,sans-serif;background:#f4f6f8;color:#2C3E50;margin:0;padding:24px;}
  .wrap{max-width:1100px;margin:0 auto;}
  h1{font-size:22px;margin:0 0 4px;}
  .sub{color:#667;margin:0 0 20px;}
  .bar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px;}
  .btn{background:#E67E22;color:#fff;text-decoration:none;padding:8px 16px;border-radius:8px;font-weight:600;}
  table{width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);}
  th,td{padding:10px 12px;text-align:right;border-bottom:1px solid #eef;vertical-align:top;font-size:14px;}
  th{background:#2C3E50;color:#fff;font-weight:600;position:sticky;top:0;}
  tr:nth-child(even) td{background:#fafbfc;}
  td a{color:#2980b9;text-decoration:none;}
  .nowrap{white-space:nowrap;}
  .msg{max-width:380px;white-space:pre-wrap;}
  .empty{background:#fff;padding:40px;text-align:center;color:#889;border-radius:10px;}
  .src{display:inline-block;padding:2px 8px;border-radius:99px;font-size:12px;white-space:nowrap;}
</style></head><body><div class="wrap">
  <div class="bar">
    <div><h1>פניות מהאתר</h1><p class="sub">סה״כ ${leads.length} פניות · ממוין מהחדש לישן</p></div>
    ${leads.length ? `<a class="btn" href="${ADMIN_PATH}/export.csv">הורד CSV</a>` : ''}
  </div>
  ${
    leads.length
      ? `<table><thead><tr><th>#</th><th>תאריך</th><th>מקור</th><th>שם</th><th>טלפון</th><th>אימייל</th><th>הודעה</th></tr></thead><tbody>${rows}</tbody></table>`
      : '<div class="empty">אין עדיין פניות.</div>'
  }
</div></body></html>`;
}

app.get(ADMIN_PATH, requireAdmin, (_req, res) => {
  const leads = readLeads().reverse(); // newest first
  res.type('html').send(renderAdmin(leads));
});

app.get(ADMIN_PATH + '/export.csv', requireAdmin, (_req, res) => {
  const leads = readLeads().reverse();
  const esc = (v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
  const header = ['timestamp', 'source', 'name', 'phone', 'email', 'message', 'ip'];
  const lines = [header.join(',')].concat(
    leads.map((l) => [l.ts, l.source || 'אתר', l.name, l.phone, l.email, l.message, l.ip].map(esc).join(','))
  );
  res.set('Content-Type', 'text/csv; charset=utf-8');
  res.set('Content-Disposition', 'attachment; filename="leads.csv"');
  res.send('﻿' + lines.join('\n')); // BOM so Excel reads Hebrew correctly
});

// Serve the static React build.
const buildDir = path.join(__dirname, 'build');
app.use(express.static(buildDir));

// SPA fallback — any non-API GET returns index.html.
app.get('*', (_req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

// Malformed-JSON and catch-all error handler (keeps the process alive).
app.use((err, _req, res, _next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'בקשה לא תקינה' });
  }
  console.error('unhandled error', err);
  return res.status(500).json({ error: 'שגיאת שרת' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});

// Graceful shutdown on Fly machine stop.
process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('SIGINT', () => server.close(() => process.exit(0)));
