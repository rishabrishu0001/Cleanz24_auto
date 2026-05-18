import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.jpeg';
import { handleSmoothScroll } from '../utils';

export default function Header({ isScrolled, isDarkMode, toggleTheme }) {
  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className={`navbar navbar-expand-lg navbar-dark nav-full ${isScrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>
          <img src={logoImg} alt="Cleanz24" height={40} className="rounded-circle border border-secondary me-2" />
          <span className="fw-bold tracking-widest text-heading" style={{ letterSpacing: '2px', fontSize: '1.2rem' }}>CLEANZ24</span>
        </a>
        <button className="navbar-toggler border-0 shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon" style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)', opacity: 1 }}></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="mynavbar">
          <div className="navbar-nav align-items-center">
            <a className="nav-link text-heading mx-3 fw-medium hover-brand" href="#overview" onClick={(e) => handleSmoothScroll(e, '#overview')}>Overview</a>
            <a className="nav-link text-heading mx-3 fw-medium hover-brand" href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>Services</a>
            <a className="nav-link text-heading mx-3 fw-medium hover-brand" href="#process" onClick={(e) => handleSmoothScroll(e, '#process')}>Process</a>
            <button onClick={toggleTheme} className="theme-toggle ms-2 me-3" aria-label="Toggle Theme">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <a className="btn btn-outline-primary-custom rounded-pill px-4 ms-lg-2 fw-bold" href="#book" onClick={(e) => handleSmoothScroll(e, '#book')}>Book Now</a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
