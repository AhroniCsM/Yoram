import React from 'react';
import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL } from '../data';

const HomeHeartMark: React.FC = () => (
  <svg viewBox="0 0 64 64" width={64} height={64} className="w-16 h-16 mb-2" role="img" aria-label="לוגו יורם שחר - שלום בית" focusable="false">
    <g fill="#F4E9D8" stroke="#F4E9D8" strokeWidth="2" strokeLinejoin="round">
      <path d="M32 16 L50 31 L14 31 Z" />
      <path d="M19 31 H45 V47 H19 Z" />
    </g>
    <path
      d="M32 45 C 29.8 42.4, 25 39.4, 25 35.7 C 25 33.7, 26.6 32.3, 28.4 32.3 C 29.8 32.3, 31 33.2, 32 34.6 C 33 33.2, 34.2 32.3, 35.6 32.3 C 37.4 32.3, 39 33.7, 39 35.7 C 39 39.4, 34.2 42.4, 32 45 Z"
      fill="#E67E22"
    />
  </svg>
);

const Footer: React.FC = () => (
  <footer className="bg-primary text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <HomeHeartMark />
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
