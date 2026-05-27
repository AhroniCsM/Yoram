import React from 'react';
import { PHONE_DISPLAY, PHONE_TEL } from '../data';

const StickyCallBar: React.FC = () => (
  <a
    href={`tel:${PHONE_TEL}`}
    className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-secondary text-white py-3 px-4 flex items-center justify-center gap-2 font-semibold shadow-[0_-4px_10px_rgba(0,0,0,0.1)]"
    aria-label={`התקשר עכשיו ${PHONE_DISPLAY}`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
    התקשר עכשיו: {PHONE_DISPLAY}
  </a>
);

export default StickyCallBar;
