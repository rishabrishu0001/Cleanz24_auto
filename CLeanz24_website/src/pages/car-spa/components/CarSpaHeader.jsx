import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../../assets/logo3.jpeg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ isDarkMode, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagesAccordionOpen, setPackagesAccordionOpen] = useState(false);
  const [packagesDropdownOpen, setPackagesDropdownOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [activeVehicleType, setActiveVehicleType] = useState('hatchback');
  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try { return !!localStorage.getItem('cleanz24_logged_in_member'); } catch { return false; }
  });
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const [memberData, setMemberData] = useState(() => {
    try {
      const saved = localStorage.getItem('cleanz24_logged_in_member');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const modalPackages = [
    {
      name: 'CRYSTAL SHIELD', icon: '🛡️', id: 'crystal-shield', badge: 'Entry Level',
      prices: {
        hatchback: { regular: '750', member: '500' },
        sedan: { regular: '800', member: '550' },
        'suv & luxury': { regular: '850', member: '600' }
      }
    },
    {
      name: 'VELVET TOUCH', icon: '🛋️', id: 'velvet-touch', badge: 'Mid Range',
      prices: {
        hatchback: { regular: '1,800', member: '1,500' },
        sedan: { regular: '2,200', member: '1,800' },
        'suv & luxury': { regular: '2,500', member: '2,000' }
      }
    },
    {
      name: 'PEARL RADIANCE', icon: '✨', id: 'pearl-radiance', badge: 'Premium',
      prices: {
        hatchback: { regular: '2,400', member: '1,800' },
        sedan: { regular: '2,800', member: '2,000' },
        'suv & luxury': { regular: '3,000', member: '2,200' }
      }
    },
    {
      name: 'PLATINUM REVIVAL', icon: '💎', id: 'platinum-revival', badge: 'Ultimate',
      prices: {
        hatchback: { regular: '3,800', member: '3,000' },
        sedan: { regular: '4,300', member: '3,200' },
        'suv & luxury': { regular: '4,800', member: '3,400' }
      }
    }
  ];

  const navLinks = [
    { to: '/car-spa', label: 'Home', icon: '🏠' },
    { to: '/car-spa/services', label: 'Services', icon: '✂️' },
    { to: '/car-spa/franchise', label: 'Franchise', icon: '🤝' },
    { to: '/car-spa/stores', label: 'Stores', icon: '📍' },
    { to: '/car-spa/blog', label: 'Blog', icon: '📝' },
    { to: '/', label: '← Main Site', icon: '🔙', accent: true },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const saved = localStorage.getItem('cleanz24_logged_in_member');
        setMemberData(saved ? JSON.parse(saved) : null);
        setIsLoggedIn(!!saved);
      } catch {
        setMemberData(null);
        setIsLoggedIn(false);
      }
    };
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
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

  useEffect(() => {
    const handleOpenDropdown = () => {
      if (window.innerWidth < 992) {
        setIsPricingModalOpen(true);
      } else {
        setPackagesDropdownOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('open-packages-dropdown', handleOpenDropdown);
    return () => window.removeEventListener('open-packages-dropdown', handleOpenDropdown);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setPackagesDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const getPlanName = (planId) => {
    if (!planId) return 'N/A';
    const planMap = {
      'crystal-shield-annual': 'Crystal Shield (Annual)',
      'velvet-touch-annual': 'Velvet Touch (Annual)',
      'pearl-radiance-annual': 'Pearl Radiance (Annual)',
      'platinum-revival-annual': 'Platinum Revival (Annual)',
      'crystal-shield-monthly': 'Crystal Shield (Monthly)',
      'velvet-touch-monthly': 'Velvet Touch (Monthly)',
      'pearl-radiance-monthly': 'Pearl Radiance (Monthly)',
      'platinum-revival-monthly': 'Platinum Revival (Monthly)',
    };
    return planMap[planId] || planId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const parseLocalDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length !== 3) { const d = new Date(dateStr); return isNaN(d.getTime()) ? null : d; }
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  };
  const formatMemberDate = (dateStr) => { const d = parseLocalDate(dateStr); if (!d) return 'N/A'; return d.toLocaleDateString('en-IN'); };
  const getMemberEndDate = (startDateStr, planId) => {
    const d = parseLocalDate(startDateStr);
    if (!d) return 'N/A';
    if (planId && planId.toLowerCase().includes('annual')) { d.setFullYear(d.getFullYear() + 1); } else { d.setMonth(d.getMonth() + 1); }
    return d.toLocaleDateString('en-IN');
  };
  const handleMemberLogout = () => {
    localStorage.removeItem('cleanz24_logged_in_member');
    window.dispatchEvent(new Event('auth-change'));
    setMemberDropdownOpen(false);
  };

  const isActive = (path) => location.pathname === path;
  const isLightHeroPage = isActive('/car-spa/membership') || isActive('/car-spa/stores') || location.pathname.startsWith('/car-spa/blog') || location.pathname.startsWith('/car-spa/packages');

  const isMobile = windowWidth < 992;

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* ───── DESKTOP NAV (Bootstrap collapse approach) ───── */}
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark' : 'navbar-light'} nav-full ${isScrolled ? 'nav-scrolled' : ''} ${isLightHeroPage ? 'nav-light-hero' : ''}`}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center text-decoration-none gap-2" to="/car-spa">
            <img src={logoImg} alt="Cleanz24" className="me-1 navbar-logo" style={{ height: isScrolled ? '34px' : '40px', transition: 'height 0.4s ease' }} />
            <span className="nav-certified-badge d-none d-xxl-inline-flex">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              Certified
            </span>
          </Link>

          {/* Custom Hamburger for mobile */}
          {isMobile ? (
            <button
              className="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          ) : (
            /* Desktop navbar links */
            <div className="navbar-collapse justify-content-end d-none d-lg-flex">
              <div className="navbar-nav align-items-center">
                <Link className={`nav-link text-heading mx-xl-2 mx-xxl-3 fw-medium hover-brand ${isActive('/car-spa') ? 'active-link' : ''}`} to="/car-spa">Home</Link>
                <Link className={`nav-link text-heading mx-xl-2 mx-xxl-3 fw-medium hover-brand ${isActive('/car-spa/services') ? 'active-link' : ''}`} to="/car-spa/services">Services</Link>

                {/* Desktop Packages Dropdown */}
                <div className="nav-item dropdown mx-xl-2" style={{ position: 'relative' }}>
                  <button
                    className={`nav-link dropdown-toggle text-heading fw-medium hover-brand border-0 bg-transparent ${location.pathname.startsWith('/car-spa/packages') ? 'active-link' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setPackagesDropdownOpen(!packagesDropdownOpen); }}
                    style={{ outline: 'none', boxShadow: 'none' }}
                  >
                    Packages
                  </button>
                  <ul className={`dropdown-menu dropdown-menu-end border shadow-lg mt-2 py-2 ${packagesDropdownOpen ? 'show' : ''}`} style={{ backgroundColor: isDarkMode ? '#0a1a10' : '#ffffff', borderColor: isDarkMode ? 'rgba(0,201,109,0.35)' : 'rgba(0,201,109,0.25)', borderRadius: '6px', display: packagesDropdownOpen ? 'block' : 'none', position: 'absolute', right: 0, zIndex: 1000 }}>
                    {[
                      { to: '/car-spa/packages/crystal-shield', label: '🛡️ Crystal Shield' },
                      { to: '/car-spa/packages/velvet-touch', label: '🛋️ Velvet Touch' },
                      { to: '/car-spa/packages/pearl-radiance', label: '✨ Pearl Radiance' },
                      { to: '/car-spa/packages/platinum-revival', label: '💎 Platinum Revival' },
                    ].map(item => (
                      <li key={item.to}>
                        <Link
                          className={`dropdown-item py-2 ${isDarkMode ? 'text-white' : 'text-dark'}`}
                          to={item.to}
                          style={{ fontSize: '0.9rem', transition: 'all 0.2s', backgroundColor: 'transparent' }}
                          onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary-color)'; e.currentTarget.style.backgroundColor = 'rgba(0,201,109,0.08)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = isDarkMode ? '#fff' : '#000'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                          onClick={() => { setPackagesDropdownOpen(false); }}
                        >{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link className={`nav-link text-heading mx-xl-2 mx-xxl-3 fw-medium hover-brand ${isActive('/car-spa/franchise') ? 'active-link' : ''}`} to="/car-spa/franchise">Franchise</Link>
                <Link className={`nav-link text-heading mx-xl-2 mx-xxl-3 fw-medium hover-brand ${isActive('/car-spa/stores') ? 'active-link' : ''}`} to="/car-spa/stores">Stores</Link>
                <Link className={`nav-link text-heading mx-xl-2 mx-xxl-3 fw-medium hover-brand ${location.pathname.startsWith('/car-spa/blog') ? 'active-link' : ''}`} to="/car-spa/blog">Blog</Link>
                <Link className="nav-link text-heading mx-xl-2 mx-xxl-3 fw-medium hover-brand" style={{ color: 'var(--accent-color)' }} to="/">
                  <span className="d-xxl-none">← Main</span>
                  <span className="d-none d-xxl-inline">← Back to Main</span>
                </Link>
                <button onClick={toggleTheme} className="theme-toggle ms-xl-2 me-xl-3" aria-label="Toggle Theme">
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
                {isLoggedIn ? (
                  <>
                    <a className="btn btn-glow btn-nav-cta px-3 px-xl-4 ms-lg-2 fw-bold text-decoration-none" href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20schedule%20a%20free%20pickup%20for%20my%20vehicle." target="_blank" rel="noreferrer">
                      <span className="d-xxl-none">Schedule Pickup</span>
                      <span className="d-none d-xxl-inline">Schedule Free Pickup</span>
                    </a>
                    {memberData && (
                      <div className="nav-item dropdown ms-lg-3" style={{ position: 'relative' }}>
                        <button
                          className="btn btn-outline-success btn-member-toggle dropdown-toggle d-flex align-items-center gap-2"
                          onClick={(e) => { e.stopPropagation(); setMemberDropdownOpen(!memberDropdownOpen); setPackagesDropdownOpen(false); }}
                        >
                          <span className="member-avatar" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-color)', color: '#000', fontSize: '0.75rem', fontWeight: 800 }}>
                            {memberData.name ? memberData.name.charAt(0).toUpperCase() : 'M'}
                          </span>
                          {memberData.name ? memberData.name.split(' ')[0] : 'Member'}
                        </button>
                        <ul className={`dropdown-menu dropdown-menu-end border shadow-lg mt-2 py-3 px-3 ${memberDropdownOpen ? 'show' : ''}`} style={{ backgroundColor: isDarkMode ? '#0a1a10' : '#ffffff', borderColor: 'var(--primary-color)', borderRadius: '12px', display: memberDropdownOpen ? 'block' : 'none', position: 'absolute', right: 0, zIndex: 1000, minWidth: '290px' }}>
                          <li className="mb-2 pb-2" style={{ borderBottom: '1px solid rgba(0,201,109,0.2)' }}>
                            <div className="fw-bold text-uppercase" style={{ fontSize: '0.65rem', color: 'var(--primary-color)' }}>Active Member</div>
                            <div className="fw-bold mt-1" style={{ fontSize: '0.95rem', color: isDarkMode ? '#fff' : '#000' }}>{memberData.name}</div>
                            <div className="small" style={{ color: isDarkMode ? '#aaa' : '#666' }}>{memberData.mobile}</div>
                          </li>
                          <li className="mb-2 text-start">
                            <div className="small text-uppercase fw-bold" style={{ fontSize: '0.62rem', color: isDarkMode ? '#aaa' : '#666' }}>Plan</div>
                            <div className="fw-semibold" style={{ fontSize: '0.82rem', color: isDarkMode ? '#fff' : '#000' }}>{getPlanName(memberData.plan)}</div>
                          </li>
                          <li className="mb-2 text-start">
                            <div className="small text-uppercase fw-bold" style={{ fontSize: '0.62rem', color: isDarkMode ? '#aaa' : '#666' }}>Vehicle</div>
                            <div className="fw-semibold" style={{ fontSize: '0.82rem', color: isDarkMode ? '#fff' : '#000' }}>{memberData.vehicleNumber} ({memberData.vehicleModel})</div>
                          </li>
                          <li className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(0,201,109,0.2)' }}>
                            <button onClick={handleMemberLogout} className="btn btn-outline-danger w-100 py-2 btn-sm fw-bold rounded-pill" style={{ fontSize: '0.8rem' }}>Logout</button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link className="btn btn-glow btn-nav-cta px-3 px-xl-4 ms-lg-2 fw-bold text-decoration-none" to="/car-spa/membership">
                    <span className="d-xxl-none">Join Membership</span>
                    <span className="d-none d-xxl-inline">Become Our Member</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* ───── MOBILE FULL-SCREEN MENU ───── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Slide Panel */}
            <motion.div
              className="mobile-menu-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Panel Header */}
              <div className="mobile-panel-header">
                <Link to="/car-spa" onClick={() => setMobileMenuOpen(false)}>
                  <img src={logoImg} alt="Cleanz24" style={{ height: '38px', borderRadius: '6px' }} />
                </Link>
                <div className="mobile-panel-header-right">
                  <button onClick={toggleTheme} className="mobile-theme-btn" aria-label="Toggle Theme">
                    {isDarkMode ? '☀️' : '🌙'}
                  </button>
                  <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">✕</button>
                </div>
              </div>

              {/* Member Badge (if logged in) */}
              {memberData && (
                <div className="mobile-member-badge">
                  <div className="mobile-member-avatar">{memberData.name ? memberData.name.charAt(0).toUpperCase() : 'M'}</div>
                  <div className="mobile-member-info">
                    <div className="mobile-member-name">{memberData.name}</div>
                    <div className="mobile-member-plan">{getPlanName(memberData.plan)}</div>
                  </div>
                  <button onClick={handleMemberLogout} className="mobile-member-logout">Logout</button>
                </div>
              )}

              {/* Nav Links */}
              <nav className="mobile-nav-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      to={link.to}
                      className={`mobile-nav-item ${isActive(link.to) ? 'active' : ''} ${link.accent ? 'accent' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mobile-nav-icon">{link.icon}</span>
                      <span className="mobile-nav-label">{link.label}</span>
                      {isActive(link.to) && <span className="mobile-nav-active-dot"></span>}
                    </Link>
                  </motion.div>
                ))}

                {/* Packages Accordion */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 * 0.06 + 0.1 }}
                >
                  <button
                    className={`mobile-nav-item mobile-accordion-trigger ${location.pathname.startsWith('/car-spa/packages') ? 'active' : ''}`}
                    onClick={() => setPackagesAccordionOpen(!packagesAccordionOpen)}
                  >
                    <span className="mobile-nav-icon">📦</span>
                    <span className="mobile-nav-label">Packages</span>
                    <motion.span
                      className="mobile-accordion-chevron"
                      animate={{ rotate: packagesAccordionOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {packagesAccordionOpen && (
                      <motion.div
                        className="mobile-packages-accordion"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        {modalPackages.map((pkg) => (
                          <Link
                            key={pkg.id}
                            to={`/car-spa/packages/${pkg.id}`}
                            className={`mobile-package-item ${isActive(`/car-spa/packages/${pkg.id}`) ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="pkg-acc-icon">{pkg.icon}</span>
                            <div className="pkg-acc-info">
                              <span className="pkg-acc-name">{pkg.name}</span>
                              <span className="pkg-acc-badge">{pkg.badge}</span>
                            </div>
                            <div className="pkg-acc-price">
                              <span className="pkg-acc-price-val">₹{pkg.prices['hatchback'].regular}+</span>
                            </div>
                          </Link>
                        ))}
                        <button
                          className="mobile-view-pricing-btn"
                          onClick={() => { setMobileMenuOpen(false); setIsPricingModalOpen(true); }}
                        >
                          📊 View Full Pricing Matrix
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </nav>

              {/* Mobile CTA */}
              <div className="mobile-cta-area">
                {isLoggedIn ? (
                  <a
                    href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20schedule%20a%20free%20pickup%20for%20my%20vehicle."
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-cta-btn"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🚗 Schedule Free Pickup
                  </a>
                ) : (
                  <Link
                    to="/car-spa/membership"
                    className="mobile-cta-btn"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ⭐ Join Membership
                  </Link>
                )}
                <Link
                  to="/car-spa/book"
                  className="mobile-cta-btn-outline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📅 Book Appointment
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ───── PRICING MATRIX MODAL ───── */}
      <AnimatePresence>
        {isPricingModalOpen && (
          <div className="pricing-matrix-modal-backdrop" onClick={() => setIsPricingModalOpen(false)}>
            <motion.div
              className="pricing-matrix-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header-custom">
                <h4 className="modal-title-custom">PRICING MATRIX</h4>
                <button className="modal-close-btn" onClick={() => setIsPricingModalOpen(false)}>✕</button>
              </div>
              <div className="modal-vehicle-switcher">
                {['hatchback', 'sedan', 'suv & luxury'].map((type) => (
                  <button
                    key={type}
                    className={`modal-vehicle-tab ${activeVehicleType === type ? 'active' : ''}`}
                    onClick={() => setActiveVehicleType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="modal-packages-list">
                {modalPackages.map((pkg) => (
                  <div key={pkg.id} className="modal-package-row">
                    <div className="modal-package-info">
                      <span className="modal-package-icon">{pkg.icon}</span>
                      <div className="modal-package-names">
                        <Link to={`/car-spa/packages/${pkg.id}`} className="modal-package-link" onClick={() => setIsPricingModalOpen(false)}>
                          {pkg.name}
                        </Link>
                        <span className="view-details-txt">Tap to view details →</span>
                      </div>
                    </div>
                    <div className="modal-package-prices">
                      <div className="price-item regular">
                        <span className="price-lbl">REGULAR</span>
                        <span className="price-val">₹{pkg.prices[activeVehicleType].regular}</span>
                      </div>
                      <div className="price-item member">
                        <span className="price-lbl">MEMBER</span>
                        <span className="price-val">₹{pkg.prices[activeVehicleType].member}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer-custom">
                <Link to="/car-spa/book" className="btn btn-glow w-100 py-2 text-center text-decoration-none" onClick={() => setIsPricingModalOpen(false)}>
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
