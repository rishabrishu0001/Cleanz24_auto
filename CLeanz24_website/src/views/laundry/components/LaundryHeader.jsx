'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../../assets/logo2.jpeg';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header({ isDarkMode, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);
  const pathname = usePathname() || '';

  const isHome = pathname === '/laundry' || pathname === '/laundry/';
  const isTransparent = isHome && !isScrolled;
  const isMobile = windowWidth < 992;

  const navLinks = [
    { to: '/laundry', label: 'Home', icon: '🏠' },
    { to: '/laundry/services', label: 'Services', icon: '👔' },
    { to: '/laundry/franchise', label: 'Franchise', icon: '🤝' },
    { to: '/laundry/stores', label: 'Stores', icon: '📍' },
    { to: '/laundry/blog', label: 'Blog', icon: '📝' },
    { to: '/laundry/contact-us', label: 'Contact', icon: '📞' },
    { to: '/', label: '← Main Site', icon: '🔙', accent: true },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="laundry-scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* ─── DESKTOP NAV ─── */}
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`navbar navbar-expand-lg nav-full ${isScrolled ? 'nav-scrolled' : ''} ${isTransparent ? 'nav-transparent' : ''}`}
      >
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center text-decoration-none gap-2" href="/laundry">
            <div className="d-flex flex-column align-items-start">
              <Image src={logoImg} alt="Cleanz24" className="me-1 navbar-logo" style={{ height: isScrolled ? '36px' : '48px', width: 'auto', transition: 'height 0.4s ease', objectFit: 'contain' }} />
              <div className="logo-subtitle text-start mt-1"></div>
            </div>
          </Link>

          {/* Mobile Hamburger */}
          {isMobile ? (
            <button
              className="laundry-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <span className={`laundry-hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`laundry-hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`laundry-hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          ) : (
            /* Desktop Links */
            <div className="d-none d-lg-flex navbar-collapse justify-content-end" id="mynavbar">
              <div className="navbar-nav align-items-center">
                {navLinks.filter(l => !l.accent).map(link => (
                  <Link
                    key={link.to}
                    className={`nav-link text-heading mx-2 fw-medium ${isActive(link.to) || (link.to !== '/laundry' && pathname.startsWith(link.to)) ? 'active-link' : ''}`}
                    href={link.to}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link className="nav-link text-heading mx-2 fw-medium back-to-home-link" style={{ fontWeight: '700' }} href="/">
                  ← Back to Main
                </Link>

                <button
                  onClick={toggleTheme}
                  className="laundry-theme-btn-desktop ms-2 me-3"
                  aria-label="Toggle Theme"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>

                <Link
                  className="btn-header-pickup px-4 ms-lg-2 fw-bold text-decoration-none"
                  href="/laundry/contact-us"
                >
                  Schedule Free Pickup
                  <span className="circle-arrow">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="9 18 15 12 9 6"/></svg>
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* ─── MOBILE SLIDE PANEL ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="laundry-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="laundry-mobile-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Panel Header */}
              <div className="laundry-panel-header">
                <Link href="/laundry" onClick={() => setMobileMenuOpen(false)}>
                  <Image src={logoImg} alt="Cleanz24" style={{ height: '40px', width: 'auto', borderRadius: '6px', objectFit: 'contain' }} />
                </Link>
                <div className="laundry-panel-header-right">
                  <button onClick={toggleTheme} className="laundry-mobile-theme-btn" aria-label="Toggle Theme">
                    {isDarkMode ? '☀️' : '🌙'}
                  </button>
                  <button className="laundry-mobile-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close">✕</button>
                </div>
              </div>

              {/* Tagline strip */}
              <div className="laundry-panel-tagline">
                <span className="laundry-tagline-badge">✨ Expert Laundry &amp; Dry Cleaning</span>
                <span className="laundry-tagline-phone">📞 9138004800</span>
              </div>

              {/* Nav Links */}
              <nav className="laundry-mobile-nav">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      href={link.to}
                      className={`laundry-mobile-nav-item ${isActive(link.to) ? 'active' : ''} ${link.accent ? 'accent' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="laundry-nav-icon">{link.icon}</span>
                      <span className="laundry-nav-label">{link.label}</span>
                      {isActive(link.to) && <span className="laundry-nav-active-dot"></span>}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Quick Contact Row */}
              <div className="laundry-mobile-contact-row">
                <a href="https://wa.me/919138004800?text=Hi%2C%20I%20need%20laundry%20services" target="_blank" rel="noreferrer" className="laundry-contact-pill whatsapp">
                  <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor"><path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16c0 2.4.6 4.7 1.8 6.7L2.5 29.5l7-1.8c2 .1 4.1 1.8 6.5 1.8 7.5 0 13.5-6 13.5-13.5S23.5 2.5 16 2.5zm0 22.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4C5.5 18.2 5 16.1 5 14c0-6.1 5-11 11-11s11 4.9 11 11-4.9 11-11 11zm6-7.8c-.3-.2-2-.1-2.3-.8-.3-.7-.3-1.3-.4-1.4-.2-.2-.5-.2-.8 0-.3.3-1.3 1.3-1.5 1.5-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-1-1-1.3-1.3-1.5-1.5-.2-.2 0-.3.1-.4.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.4-1-.5-1.4-.1-.4-.2-.3-.3-.3h-.3c-.1 0-.3 0-.5.2-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4 1.7.8 2.3.9 3.1.8.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.6-.4z"/></svg>
                  WhatsApp
                </a>
                <a href="tel:+919138004800" className="laundry-contact-pill phone">
                  📞 Call Us
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="laundry-mobile-cta">
                <Link
                  href="/laundry/contact-us"
                  className="laundry-cta-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🚚 Schedule Free Pickup
                </Link>
                <Link
                  href="/best-laundry-franchise"
                  className="laundry-cta-outline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🤝 Franchise Enquiry
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
