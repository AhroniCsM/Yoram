import React from 'react';
import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL } from '../data';

const UnityHeartMark: React.FC = () => (
  <svg viewBox="0 0 64 64" width={64} height={64} className="w-16 h-16 mb-2" role="img" aria-label="לוגו יורם שחר - גישור" focusable="false">
    <path d="M31.5 51 C 31.5 51, 12 37, 12 24.5 C 12 17.5, 18.5 14, 24.2 17 C 27.8 19, 30.4 22, 31.5 26 L31.5 51 Z" fill="#F4E9D8" />
    <path d="M32.5 51 C 32.5 51, 52 37, 52 24.5 C 52 17.5, 45.5 14, 39.8 17 C 36.2 19, 33.6 22, 32.5 26 L32.5 51 Z" fill="#E67E22" />
  </svg>
);

const Footer: React.FC = () => (
  <footer className="bg-primary text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <UnityHeartMark />
          <h3 className="text-xl font-bold">יורם שחר</h3>
          <p className="mt-2">מגשר מקצועי</p>
        </div>
        <div className="text-center md:text-right">
          <a href={`tel:${PHONE_TEL}`} className="hover:text-secondary transition-colors block">
            טלפון: {PHONE_DISPLAY}
          </a>
        </div>
        <nav aria-label="ניווט תחתון" className="flex flex-wrap gap-4">
          <Link to="/policy" className="underline hover:text-secondary">מדיניות האתר</Link>
          <Link to="/accessibility" className="underline hover:text-secondary">נגישות</Link>
          <Link to="/about" className="underline hover:text-secondary">אודות</Link>
          <Link to="/articles" className="underline hover:text-secondary">מאמרים</Link>
        </nav>
      </div>
      <div className="text-center text-sm mt-8 opacity-70">
        © {new Date().getFullYear()} יורם שחר — כל הזכויות שמורות
      </div>
    </div>
  </footer>
);

export default Footer;
