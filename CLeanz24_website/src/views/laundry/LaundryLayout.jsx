import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/LaundryHeader';
import Footer from './components/LaundryFooter';
import '../../styles/laundry.css';
import '../../styles/store-search.css';
import '../../styles/store-cards.css';

export default function LaundryLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname() || ''; const location = { pathname, state: {} };

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const isHome = location.pathname === '/laundry' || location.pathname === '/laundry/';

  return (
    <div className={`laundry-app d-flex flex-column min-vh-100 ${isDarkMode ? 'laundry-dark' : ''} ${isHome ? 'laundry-home-page' : 'laundry-subpage'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow-1">
        <Outlet context={{ isDarkMode, toggleTheme }} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
