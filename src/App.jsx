import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/Landing';
import CarSpa from './pages/CarSpa';
import Franchise from './pages/Franchise';
import Services from './pages/Services';
import Book from './pages/Book';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/car-spa" element={<CarSpa isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        <Route path="/franchise" element={<Franchise isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        <Route path="/services" element={<Services isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        <Route path="/book" element={<Book isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  );
}

export default App;