'use client';

import React, { useState, useEffect, createContext } from 'react';
import CarSpaHeader from '../../views/car-spa/components/CarSpaHeader';
import CarSpaFooter from '../../views/car-spa/components/CarSpaFooter';
import FloatingActions from '../../components/FloatingActions';
import '../../styles/carSpa.css';

export const CarSpaThemeContext = createContext({ isDarkMode: true, toggleTheme: () => {} });

export default function CarSpaClientLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    return () => document.body.classList.remove('light-mode');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className="car-spa-layout d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      <CarSpaHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow-1">
        <CarSpaThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
          {children}
        </CarSpaThemeContext.Provider>
      </main>
      <CarSpaFooter />
      <FloatingActions />
    </div>
  );
}
