import React, { useState, useEffect } from 'react';

import CarSpaHeader from './components/CarSpaHeader';
import CarSpaFooter from './components/CarSpaFooter';
import FloatingActions from '../../components/FloatingActions';
import '../../styles/carSpa.css';
import '../../styles/store-search.css';
import '../../styles/store-cards.css';


/**
 * CarSpaLayout
 * Wraps all /car-spa/* routes with the dark-themed Car Spa Header & Footer.
 * Dark mode state is managed here so it's scoped to the Car Spa section only.
 */
export default function CarSpaLayout() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    // Clean up when leaving car spa section
    return () => document.body.classList.remove('light-mode');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className="car-spa-layout d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      <CarSpaHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow-1">
        <Outlet context={{ isDarkMode, toggleTheme }} />
      </main>
      <CarSpaFooter />
      <FloatingActions />
    </div>
  );
}
