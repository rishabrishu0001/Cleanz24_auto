import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../../../assets/logo2.jpeg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ isDarkMode, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [franchiseDropdownOpen, setFranchiseDropdownOpen] = useState(false);
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

  const isHome = location.pathname === '/laundry' || location.pathname === '/laundry/';
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
        className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark' : 'navbar-light'} nav-full ${isScrolled ? 'nav-scrolled' : ''} ${isTransparent ? 'nav-transparent' : ''}`}
      >
        <div className="container">
          {/* Logo & Certified Badge - Always visible */}
          <Link 
            className="navbar-brand d-flex align-items-center text-decoration-none gap-2" 
            to="/laundry"
          >
            <div className="d-flex flex-column align-items-start">
              <img src={logoImg} alt="Cleanz24" className="me-1 navbar-logo" style={{ height: isScrolled ? '36px' : '48px', transition: 'height 0.4s ease' }} />
              <div className="logo-subtitle text-start mt-1">
                {/* <span>Call/Whatsapp us:</span>
                <strong>9138004800</strong> */}
              </div>
            </div>
            {/* <span className="nav-certified-badge d-none d-md-inline-flex" style={{ color: isTransparent ? '#fff' : 'var(--global-primary)', borderColor: isTransparent ? 'rgba(255,255,255,0.4)' : 'rgba(43, 108, 176, 0.25)', background: isTransparent ? 'rgba(255,255,255,0.1)' : 'rgba(43, 108, 176, 0.1)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              Certified
            </span> */}
          </Link>
          
          <button className="navbar-toggler border-0 shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon" style={{ filter: (isDarkMode || isTransparent) ? 'brightness(0) invert(1)' : 'brightness(0)', opacity: 1 }}></span>
          </button>
          
          <div className="collapse navbar-collapse justify-content-end" id="mynavbar">
            <div className="navbar-nav align-items-center">
              {/* Navigation links */}
              <Link className={`nav-link text-heading mx-2 fw-medium ${isActive('/laundry') ? 'active-link' : ''}`} to="/laundry">Home</Link>
              <Link className={`nav-link text-heading mx-2 fw-medium ${isActive('/laundry/about-us') ? 'active-link' : ''}`} to="/laundry/about-us">About</Link>
              
              {/* Dropdown for Services */}
              <div 
                className="nav-item dropdown mx-2"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link 
                  className={`nav-link text-heading fw-medium dropdown-toggle ${location.pathname.startsWith('/laundry/services') || location.pathname.includes('cleaning') || location.pathname.includes('ironing') ? 'active-link' : ''}`} 
                  to="/laundry/services"
                  role="button" 
                  aria-expanded={dropdownOpen}
                >
                  Services
                </Link>
                <div className={`dropdown-menu border-0 shadow-sm ${dropdownOpen ? 'show' : ''}`} style={{ position: 'absolute', backgroundColor: isDarkMode ? '#13263d' : '#fff', borderRadius: '8px', padding: '10px 0', marginTop: '0' }}>
                  <Link className="dropdown-item py-2 px-3 fw-semibold small" to="/laundry/services">All Services</Link>
                  <Link className="dropdown-item py-2 px-3 fw-semibold small" to="/laundry/dry-cleaning">Dry Cleaning</Link>
                  <Link className="dropdown-item py-2 px-3 fw-semibold small" to="/laundry/home-cleaning">Home Cleaning</Link>
                  <Link className="dropdown-item py-2 px-3 fw-semibold small" to="/laundry/steam-ironing">Steam Ironing</Link>
                  <Link className="dropdown-item py-2 px-3 fw-semibold small" to="/laundry/shoe-cleaning">Shoe Cleaning</Link>
                </div>
              </div>

              <Link className={`nav-link text-heading mx-2 fw-medium ${isActive('/laundry/franchise') ? 'active-link' : ''}`} to="/laundry/franchise">Franchise</Link>
              <Link className={`nav-link text-heading mx-2 fw-medium ${isActive('/laundry/stores') ? 'active-link' : ''}`} to="/laundry/stores">Stores</Link>
              <Link className={`nav-link text-heading mx-2 fw-medium ${isActive('/laundry/contact-us') ? 'active-link' : ''}`} to="/laundry/contact-us">Contact</Link>
              
              {/* Back to Home link */}
              <Link className="nav-link text-heading mx-2 fw-medium back-to-home-link" style={{ fontWeight: '700' }} to="/">
                ← Back to Home
              </Link>
              
              {/* Day/Night Theme Toggler */}
              <button 
                onClick={toggleTheme} 
                className="theme-toggle ms-2 me-3" 
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', filter: isTransparent ? 'brightness(0) invert(1)' : 'none' }}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              
              {/* Schedule Pickup Action Button - Always visible */}
              <Link 
                className="btn-header-pickup px-4 ms-lg-2 fw-bold text-decoration-none" 
                to="/laundry/contact-us"
              >
                Schedule Free Pickup
                <span className="circle-arrow">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
