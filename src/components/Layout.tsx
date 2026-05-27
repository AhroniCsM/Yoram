import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import StickyCallBar from './StickyCallBar';
import WhatsAppFab from './WhatsAppFab';

const Layout: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-green-100 flex flex-col">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
    >
      דלג לתוכן הראשי
    </a>
    <main id="main" className="flex-1 pb-20 md:pb-0">
      <Outlet />
    </main>
    <Footer />
    <StickyCallBar />
    <WhatsAppFab />
  </div>
);

export default Layout;
