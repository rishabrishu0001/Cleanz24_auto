'use client';

import React, { useState } from 'react';
import Header from '../../views/laundry/components/LaundryHeader';
import Footer from '../../views/laundry/components/LaundryFooter';
import '../../styles/laundry.css';

export default function LaundryClientLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className={`laundry-app d-flex flex-column min-vh-100 ${isDarkMode ? 'laundry-dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
