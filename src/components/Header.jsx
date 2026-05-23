import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo3.png';
import { Link } from 'react-router-dom';

export default function Header({ isDarkMode, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className={`navbar navbar-expand-lg navbar-dark nav-full ${isScrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center text-decoration-none" to="/car-spa">
          <img src={logoImg} alt="Cleanz24" height={60} className="me-2" />
          {/* <span className="fw-bold tracking-widest text-heading" style={{ letterSpacing: '2px', fontSize: '1.2rem' }}>CLEANZ24</span> */}
        </Link>
        <button className="navbar-toggler border-0 shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon" style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)', opacity: 1 }}></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="mynavbar">
          <div className="navbar-nav align-items-center">
            <Link className="nav-link text-heading mx-3 fw-medium hover-brand" to="/car-spa">Home</Link>
            <Link className="nav-link text-heading mx-3 fw-medium hover-brand" to="/services">Services</Link>
            <Link to="/franchise" className="nav-link text-heading mx-3 fw-medium hover-brand">Franchise</Link>
            <Link to="/" className="nav-link text-heading mx-3 fw-bold" style={{ color: 'var(--primary-color)' }}>← Portal</Link>
            <button onClick={toggleTheme} className="theme-toggle ms-2 me-3" aria-label="Toggle Theme">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <Link className="btn btn-outline-primary-custom px-4 ms-lg-2 fw-bold" to="/book">Book Now</Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
