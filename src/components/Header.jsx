import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo3.jpeg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ isDarkMode, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
        className={`navbar navbar-expand-lg navbar-dark nav-full ${isScrolled ? 'nav-scrolled' : ''}`}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center text-decoration-none gap-2" to="/car-spa">
            <img src={logoImg} alt="Cleanz24" height={55} className="me-1" />
            <span className="nav-certified-badge d-none d-md-inline-flex">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              Certified
            </span>
          </Link>
          <button className="navbar-toggler border-0 shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon" style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)', opacity: 1 }}></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="mynavbar">
            <div className="navbar-nav align-items-center">
              <Link className={`nav-link text-heading mx-3 fw-medium hover-brand ${isActive('/car-spa') ? 'active-link' : ''}`} to="/car-spa">Home</Link>
              <Link className={`nav-link text-heading mx-3 fw-medium hover-brand ${isActive('/services') ? 'active-link' : ''}`} to="/services">Services</Link>
              <Link className={`nav-link text-heading mx-3 fw-medium hover-brand ${isActive('/franchise') ? 'active-link' : ''}`} to="/franchise">Franchise</Link>
              <a href="https://www.cleanz24.com" target="_blank" rel="noreferrer" className="nav-link text-heading mx-3 fw-medium hover-brand" style={{ color: 'var(--accent-color)' }}>
                Laundry
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="ms-1 opacity-50"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
              </a>
              <button onClick={toggleTheme} className="theme-toggle ms-2 me-3" aria-label="Toggle Theme">
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <Link className="btn btn-glow px-4 ms-lg-2 fw-bold text-decoration-none" to="/book">Book Now</Link>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
