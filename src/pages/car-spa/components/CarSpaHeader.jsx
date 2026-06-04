import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../../../assets/logo3.jpeg';
import { Link, useLocation } from 'react-router-dom';
import { handleSmoothScroll } from '../../../utils';

export default function Header({ isDarkMode, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [packagesDropdownOpen, setPackagesDropdownOpen] = useState(false);
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleDocumentClick = () => {
      setPackagesDropdownOpen(false);
      setMemberDropdownOpen(false);
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

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
    if (parts.length !== 3) {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? null : d;
    }
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  };

  const formatMemberDate = (dateStr) => {
    const d = parseLocalDate(dateStr);
    if (!d) return 'N/A';
    return d.toLocaleDateString('en-IN');
  };

  const getMemberEndDate = (startDateStr, planId) => {
    const d = parseLocalDate(startDateStr);
    if (!d) return 'N/A';
    if (planId && planId.toLowerCase().includes('annual')) {
      d.setFullYear(d.getFullYear() + 1);
    } else {
      d.setMonth(d.getMonth() + 1);
    }
    return d.toLocaleDateString('en-IN');
  };

  const handleMemberLogout = () => {
    localStorage.removeItem('cleanz24_logged_in_member');
    window.dispatchEvent(new Event('auth-change'));
    setMemberDropdownOpen(false);
  };

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
        className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark' : 'navbar-light'} nav-full ${isScrolled ? 'nav-scrolled' : ''} ${isActive('/car-spa/membership') ? 'nav-light-hero' : ''}`}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center text-decoration-none gap-2" to="/car-spa">
            <img src={logoImg} alt="Cleanz24" className="me-1 navbar-logo" style={{ height: isScrolled ? '34px' : '40px', transition: 'height 0.4s ease' }} />
            <span className="nav-certified-badge d-none d-xxl-inline-flex">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              Certified
            </span>
          </Link>
          <button className="navbar-toggler border-0 shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon" style={{ filter: (isDarkMode || !isScrolled) ? 'brightness(0) invert(1)' : 'brightness(0)', opacity: 1 }}></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="mynavbar">
            <div className="navbar-nav align-items-center">
              <Link className={`nav-link text-heading mx-1 mx-lg-1 mx-xl-2 mx-xxl-3 fw-medium hover-brand ${isActive('/car-spa') ? 'active-link' : ''}`} to="/car-spa">Home</Link>
              <Link className={`nav-link text-heading mx-1 mx-lg-1 mx-xl-2 mx-xxl-3 fw-medium hover-brand ${isActive('/car-spa/services') ? 'active-link' : ''}`} to="/car-spa/services">Services</Link>
              
              {/* Packages Dropdown */}
              <div className="nav-item dropdown mx-1 mx-lg-1 mx-xl-2" style={{ position: 'relative' }}>
                <button 
                  className={`nav-link dropdown-toggle text-heading fw-medium hover-brand border-0 bg-transparent ${location.pathname.startsWith('/car-spa/packages') ? 'active-link' : ''}`} 
                  id="packagesDropdown" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPackagesDropdownOpen(!packagesDropdownOpen);
                  }}
                  aria-expanded={packagesDropdownOpen}
                  style={{ outline: 'none', boxShadow: 'none' }}
                >
                  Packages
                </button>
                <ul className={`dropdown-menu dropdown-menu-end border shadow-lg mt-2 py-2 ${packagesDropdownOpen ? 'show' : ''}`} aria-labelledby="packagesDropdown" style={{ backgroundColor: isDarkMode ? '#0a1a10' : '#ffffff', borderColor: isDarkMode ? 'rgba(0, 201, 109, 0.35)' : 'rgba(0, 201, 109, 0.25)', borderRadius: '6px', display: packagesDropdownOpen ? 'block' : 'none', position: 'absolute', right: 0, zIndex: 1000 }}>
                  <li>
                    <Link 
                      className={`dropdown-item py-2 hover-brand-item ${isDarkMode ? 'text-white' : 'text-dark'}`} 
                      to="/car-spa/packages/crystal-shield"
                      style={{ fontSize: '0.9rem', transition: 'all 0.2s ease', backgroundColor: 'transparent', color: isDarkMode ? '#ffffff' : '#000000' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary-color)'; e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(0, 201, 109, 0.08)' : 'rgba(0, 201, 109, 0.06)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = isDarkMode ? '#ffffff' : '#000000'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                      onClick={() => setPackagesDropdownOpen(false)}
                    >
                      Crystal Shield
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className={`dropdown-item py-2 hover-brand-item ${isDarkMode ? 'text-white' : 'text-dark'}`} 
                      to="/car-spa/packages/velvet-touch"
                      style={{ fontSize: '0.9rem', transition: 'all 0.2s ease', backgroundColor: 'transparent', color: isDarkMode ? '#ffffff' : '#000000' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary-color)'; e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(0, 201, 109, 0.08)' : 'rgba(0, 201, 109, 0.06)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = isDarkMode ? '#ffffff' : '#000000'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                      onClick={() => setPackagesDropdownOpen(false)}
                    >
                      Velvet Touch
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className={`dropdown-item py-2 hover-brand-item ${isDarkMode ? 'text-white' : 'text-dark'}`} 
                      to="/car-spa/packages/pearl-radiance"
                      style={{ fontSize: '0.9rem', transition: 'all 0.2s ease', backgroundColor: 'transparent', color: isDarkMode ? '#ffffff' : '#000000' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary-color)'; e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(0, 201, 109, 0.08)' : 'rgba(0, 201, 109, 0.06)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = isDarkMode ? '#ffffff' : '#000000'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                      onClick={() => setPackagesDropdownOpen(false)}
                    >
                      Pearl Radiance
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className={`dropdown-item py-2 hover-brand-item ${isDarkMode ? 'text-white' : 'text-dark'}`} 
                      to="/car-spa/packages/platinum-revival"
                      style={{ fontSize: '0.9rem', transition: 'all 0.2s ease', backgroundColor: 'transparent', color: isDarkMode ? '#ffffff' : '#000000' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary-color)'; e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(0, 201, 109, 0.08)' : 'rgba(0, 201, 109, 0.06)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = isDarkMode ? '#ffffff' : '#000000'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                      onClick={() => setPackagesDropdownOpen(false)}
                    >
                      Platinum Revival
                    </Link>
                  </li>
                </ul>
              </div>
 
              <Link className={`nav-link text-heading mx-1 mx-lg-1 mx-xl-2 mx-xxl-3 fw-medium hover-brand ${location.pathname.startsWith('/car-spa/blog') ? 'active-link' : ''}`} to="/car-spa/blog">Blog</Link>
              <Link className={`nav-link text-heading mx-1 mx-lg-1 mx-xl-2 mx-xxl-3 fw-medium hover-brand ${isActive('/car-spa/franchise') ? 'active-link' : ''}`} to="/car-spa/franchise">Franchise</Link>
              
              {/* Back to Home Link */}
              <Link className="nav-link text-heading mx-1 mx-lg-1 mx-xl-2 mx-xxl-3 fw-medium hover-brand" style={{ color: 'var(--accent-color)' }} to="/">
                <span className="d-inline d-xxl-none">← Home</span>
                <span className="d-none d-xxl-inline">← Back to Home</span>
              </Link>
              <button onClick={toggleTheme} className="theme-toggle ms-1 ms-lg-1 ms-xl-2 me-1 me-lg-2 me-xl-3" aria-label="Toggle Theme">
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              {isLoggedIn ? (
                <>
                  <a className="btn btn-glow btn-nav-cta px-3 px-xl-4 ms-lg-2 fw-bold text-decoration-none animate-btn" href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20schedule%20a%20free%20pickup%20for%20my%20vehicle." target="_blank" rel="noreferrer">
                    <span className="d-inline d-xxl-none">Schedule Pickup</span>
                    <span className="d-none d-xxl-inline">Schedule Free Pickup</span>
                  </a>
                  {memberData && (
                    <div className="nav-item dropdown ms-lg-3 mt-2 mt-lg-0" style={{ position: 'relative' }}>
                      <button 
                        className="btn btn-outline-success btn-member-toggle dropdown-toggle d-flex align-items-center gap-2"
                        id="memberDropdown"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMemberDropdownOpen(!memberDropdownOpen);
                          setPackagesDropdownOpen(false);
                        }}
                        aria-expanded={memberDropdownOpen}
                      >
                        <span className="member-avatar" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-color)', color: '#000', fontSize: '0.75rem', fontWeight: 800 }}>
                          {memberData.name ? memberData.name.charAt(0).toUpperCase() : 'M'}
                        </span>
                        {memberData.name ? memberData.name.split(' ')[0] : 'Member'}
                      </button>
                      
                      <ul 
                        className={`dropdown-menu dropdown-menu-end border shadow-lg mt-2 py-3 px-3 ${memberDropdownOpen ? 'show' : ''}`}
                        aria-labelledby="memberDropdown"
                        style={{
                          backgroundColor: isDarkMode ? '#0a1a10' : '#ffffff',
                          borderColor: 'var(--primary-color)',
                          borderRadius: '12px',
                          display: memberDropdownOpen ? 'block' : 'none',
                          position: windowWidth < 992 ? 'relative' : 'absolute',
                          right: 0,
                          zIndex: 1000,
                          minWidth: windowWidth < 992 ? '100%' : '290px',
                          boxShadow: windowWidth < 992 ? 'none' : '0 10px 30px rgba(0,0,0,0.5)',
                          marginTop: windowWidth < 992 ? '10px' : '8px'
                        }}
                      >
                        <li className="mb-2 pb-2" style={{ borderBottom: '1px solid rgba(0, 201, 109, 0.2)' }}>
                          <div className="fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.65rem', color: 'var(--primary-color)' }}>
                            Active Member
                          </div>
                          <div className="fw-bold mt-1" style={{ fontSize: '0.95rem', color: isDarkMode ? '#fff' : '#000' }}>{memberData.name}</div>
                          <div className="small" style={{ fontSize: '0.8rem', color: isDarkMode ? '#aaa' : '#666' }}>{memberData.mobile}</div>
                        </li>
                        
                        <li className="mb-2 text-start">
                          <div className="small text-uppercase fw-bold" style={{ fontSize: '0.62rem', opacity: 0.8, color: isDarkMode ? '#aaa' : '#666' }}>Plan</div>
                          <div className="fw-semibold" style={{ fontSize: '0.82rem', color: isDarkMode ? '#fff' : '#000' }}>
                            {getPlanName(memberData.plan)}
                          </div>
                        </li>
 
                        <li className="mb-2 text-start">
                          <div className="small text-uppercase fw-bold" style={{ fontSize: '0.62rem', opacity: 0.8, color: isDarkMode ? '#aaa' : '#666' }}>Vehicle</div>
                          <div className="fw-semibold" style={{ fontSize: '0.82rem', color: isDarkMode ? '#fff' : '#000' }}>
                            {memberData.vehicleNumber} ({memberData.vehicleModel})
                          </div>
                        </li>
 
                        <li className="mb-3 row g-0 text-start">
                          <div className="col-6">
                            <div className="small text-uppercase fw-bold" style={{ fontSize: '0.62rem', opacity: 0.8, color: isDarkMode ? '#aaa' : '#666' }}>Start Date</div>
                            <div className="fw-semibold" style={{ fontSize: '0.82rem', color: isDarkMode ? '#fff' : '#000' }}>
                              {formatMemberDate(memberData.startDate)}
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="small text-uppercase fw-bold" style={{ fontSize: '0.62rem', opacity: 0.8, color: isDarkMode ? '#aaa' : '#666' }}>Ending Date</div>
                            <div className="fw-semibold" style={{ fontSize: '0.82rem', color: isDarkMode ? '#fff' : '#000' }}>
                              {getMemberEndDate(memberData.startDate, memberData.plan)}
                            </div>
                          </div>
                        </li>
 
                        <li className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(0, 201, 109, 0.2)' }}>
                          <button 
                            onClick={handleMemberLogout} 
                            className="btn btn-outline-danger w-100 py-2 btn-sm fw-bold rounded-pill"
                            style={{ fontSize: '0.8rem' }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link className="btn btn-glow btn-nav-cta px-3 px-xl-4 ms-lg-2 fw-bold text-decoration-none" to="/car-spa/membership">
                  <span className="d-inline d-xxl-none">Join Membership</span>
                  <span className="d-none d-xxl-inline">Become Our Member</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
