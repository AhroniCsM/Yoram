import React from 'react';
import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL } from '../data';

const BrandMark: React.FC = () => (
  <img
    src="/emblem.png"
    alt="לוגו יורם שחר"
    width={80}
    height={80}
    className="w-20 h-20 mb-2 rounded-full bg-[#F7F2E7] object-cover"
  />
);

const Footer: React.FC = () => (
  <footer className="bg-primary text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <BrandMark />
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
