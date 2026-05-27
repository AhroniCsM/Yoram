# יורם שחר — אתר מגשר מקצועי

Hebrew/RTL marketing site for Yoram Shahar's mediation practice (family, couples, business). Built with React 18 + TypeScript + Tailwind, deployed on Vercel with a serverless contact endpoint.

---

## Quick start (local dev)

```bash
npm install
npm start            # React dev server only — http://localhost:3000

# To test the serverless API too:
npm i -g vercel
vercel link          # one-time: link to a Vercel project
vercel env pull      # pulls env vars to .env.local
npm run dev          # runs `vercel dev` — both frontend and api/contact
```

`npm test` runs the Jest smoke test. `npm run build` produces the production build under `build/`.

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo. Build/output settings come from `vercel.json`.
3. Add the environment variables from `.env.example` (Project → Settings → Environment Variables).
4. Add **Upstash Redis** (Storage → Marketplace → Upstash Redis) — `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are auto-injected.
5. Add a **custom domain** (Settings → Domains) and update the canonical URLs in:
   - `public/index.html` (og:url, canonical)
   - `public/sitemap.xml`
   - `public/robots.txt`

Every push to `main` redeploys. Preview deployments are created for pull requests.

---

## How leads reach Yoram

A submission to the contact form on `/` calls `POST /api/contact`. The handler in [api/contact.ts](api/contact.ts):

1. Validates input + checks the honeypot (`website` field).
2. Rate-limits per IP (5/hour) using Upstash Redis.
3. Persists the lead in Redis under `lead:<ts>:<ip>` and pushes the key onto `leads:list`.
4. Sends an email to `LEAD_NOTIFY_EMAIL` via [Resend](https://resend.com).
5. Sends a WhatsApp message to `CALLMEBOT_PHONE` via [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/).

Each notification is best-effort — a failure in one channel doesn't block the others. All three (email + WhatsApp + DB) fire together on every successful submission.

### Viewing stored leads — the admin page

Visit **`/admin`** (e.g. `https://yoram-shahar.fly.dev/admin`). It's a server-rendered,
Basic-Auth-protected page listing every submission newest-first, with a CSV export.
It stays locked (HTTP 503) until both credentials are set as Fly secrets:

```bash
fly secrets set ADMIN_USER=yoram ADMIN_PASSWORD='a-long-random-password'
```

Lead data lives in `leads.jsonl` on the Fly volume and is never committed to git
nor exposed in the public React bundle.

---

## Project structure

```
api/
  contact.ts          Vercel serverless function — validate/honeypot/rate-limit/persist/notify
public/
  index.html          OG tags, JSON-LD ProfessionalService, manifest link
  sitemap.xml
  robots.txt
  yoram1..3.jpg       Hero photos (≤320 KB each, 1600w)
src/
  index.tsx           Root + BrowserRouter
  App.tsx             Routes
  data.ts             Testimonials, services, FAQs, contact constants
  components/
    Layout.tsx        Skip link + outlet + footer + sticky bar + WhatsApp FAB
    Footer.tsx
    StickyCallBar.tsx Mobile-only fixed call-to-action
    WhatsAppFab.tsx   Floating WhatsApp link (inline SVG)
  pages/
    Home.tsx          Hero, services, testimonials, FAQ, contact form
    About.tsx
    Articles.tsx
    Policy.tsx
    Accessibility.tsx
vercel.json           SPA fallback rewrite, cache headers
.env.example          Required env vars (do not commit a real .env)
```

---

## Editing content

Most human-facing strings live in [src/data.ts](src/data.ts) (testimonials, service descriptions, FAQs, articles, phone/email constants). Hero copy is in [src/pages/Home.tsx](src/pages/Home.tsx).

To change the contact email or phone, edit `PHONE_DISPLAY`, `PHONE_TEL`, `PHONE_WA`, and `EMAIL` in `src/data.ts`.

---

## Pre-launch checklist

- [ ] Replace placeholder `https://yoramshahar.com` in `public/index.html`, `public/sitemap.xml`, `public/robots.txt` with the real domain.
- [ ] Add `public/og-image.jpg` (1200×630, Yoram's photo + name + tagline).
- [ ] Verify Resend domain (`yoramshahar.com`) so emails don't go to spam.
- [ ] Set all env vars in Vercel (see `.env.example`).
- [ ] Submit `https://<domain>/sitemap.xml` to Google Search Console.
- [ ] Optional: add Plausible/GA snippet to `public/index.html`.
- [ ] Run Lighthouse on the production preview URL — target ≥90 perf, ≥95 a11y/SEO/best-practices.

---

## Tech stack

React 18 · TypeScript · Tailwind CSS 3 · Framer Motion · React Router 6 · Vercel (Functions + KV) · Resend · CallMeBot
