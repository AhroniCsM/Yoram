import React from 'react';
import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL } from '../data';

const Header: React.FC = () => (
  <header className="sticky top-0 z-30 bg-white/95 backdrop-blur shadow-sm">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3" aria-label="יורם שחר - דף הבית">
        <img
          src="/emblem.png"
          alt="לוגו יורם שחר"
          width={44}
          height={44}
          className="w-11 h-11 rounded-full bg-[#F7F2E7] object-cover"
        />
        <span className="leading-tight">
          <span className="block font-bold text-primary text-lg">יורם שחר</span>
          <span className="block text-xs text-gray-500">מגשר מקצועי</span>
        </span>
      </Link>
      <a
        href={`tel:${PHONE_TEL}`}
        className="hidden sm:flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {PHONE_DISPLAY}
      </a>
    </div>
  </header>
);

export default Header;
