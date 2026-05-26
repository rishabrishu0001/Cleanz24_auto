import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/Landing';
import CarSpa from './pages/CarSpa';
import Franchise from './pages/Franchise';
import Services from './pages/Services';
import Book from './pages/Book';
import { Link } from 'react-router-dom';
import FloatingActions from './components/FloatingActions';

// 404 Page
function NotFound() {
  return (
    <div className="not-found-page">
      <div>
        <div className="not-found-code">404</div>
        <h2 className="fw-bold text-heading mb-3" style={{ textTransform: 'none' }}>Page Not Found</h2>
        <p className="text-muted-custom mb-4">The page you're looking for doesn't exist or has been moved.</p>
        <div className="d-flex gap-3 justify-content-center">
          <Link to="/car-spa" className="btn btn-glow px-4 py-2 text-decoration-none">Go Home</Link>
          <Link to="/services" className="btn btn-outline-primary-custom px-4 py-2 text-decoration-none">View Services</Link>
        </div>
      </div>
    </div>
  );
}

// Animated Routes Wrapper
function AnimatedRoutes({ isDarkMode, toggleTheme }) {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/car-spa" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <CarSpa isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </motion.div>
        } />
        <Route path="/franchise" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Franchise isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </motion.div>
        } />
        <Route path="/services" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Services isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </motion.div>
        } />
        <Route path="/book" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Book isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </motion.div>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

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
      <AnimatedRoutes isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <FloatingActions />
    </Router>
  );
}

export default App;