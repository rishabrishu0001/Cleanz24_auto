import React from 'react';
import logoImg from '../assets/logo3.jpeg';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-custom pt-5 pb-4 mt-auto">
      <div className="container pt-3">

        {/* Main Footer Grid */}
        <div className="row mb-5 g-4">

          {/* Column 1: Brand */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <Link className="navbar-brand d-flex align-items-center mb-4 text-decoration-none" to="/car-spa">
              <img src={logoImg} alt="Cleanz24" height={60} className="me-2" />
              <span className="fw-bold tracking-widest text-heading h5 mb-0" style={{ letterSpacing: '2px' }}>CLEANZ24</span>
            </Link>
            <p className="text-muted-custom pe-lg-3 mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
              Cleanz24 is India's leading Premium Laundry and Dry Clean Studio and Car spa studio. In Laundry industry we have 100+ Franchise operational across multiple cities and States across India.
            </p>

            {/* Social Links */}
            <div className="d-flex gap-2 mb-4">
              <a href="https://www.instagram.com/cleanz24india/" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1D2QDyaHBG/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com/@cleanz24-india?si=8Sq-bqqygHsMWBus" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/cleanz24india/" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-4 col-6">
            <h4 className="h6 fw-bold mb-4 position-relative pb-2 footer-heading text-heading">Quick Links</h4>
            <ul className="list-unstyled footer-links">
              <li><Link to="/car-spa" className="text-muted-custom text-decoration-none hover-brand">Home</Link></li>
              <li><Link to="/services" className="text-muted-custom text-decoration-none hover-brand">Services</Link></li>
              <li><Link to="/book" className="text-muted-custom text-decoration-none hover-brand">Book Now</Link></li>
              <li><Link to="/franchise" className="text-muted-custom text-decoration-none hover-brand">Franchise</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-lg-2 col-md-4 col-6">
            <h4 className="h6 fw-bold mb-4 position-relative pb-2 footer-heading text-heading">Services</h4>
            <ul className="list-unstyled footer-links">
              <li><Link to="/services" className="text-muted-custom text-decoration-none hover-brand">Foam & Pressure Wash</Link></li>
              <li><Link to="/services" className="text-muted-custom text-decoration-none hover-brand">Deep Detailing</Link></li>
              <li><Link to="/services" className="text-muted-custom text-decoration-none hover-brand">Ceramic Coating</Link></li>
              <li><a href="https://www.cleanz24.com" target="_blank" rel="noreferrer" className="text-muted-custom text-decoration-none hover-brand">Laundry Services</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-lg-4 col-md-4">
            <h4 className="h6 fw-bold mb-4 position-relative pb-2 footer-heading text-heading">Contact Us</h4>
            <div className="d-flex align-items-start mb-3 text-muted-custom" style={{ fontSize: '0.88rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2 mt-1 flex-shrink-0" style={{ color: 'var(--primary-color)' }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
              <span>Plot No. 24, Industrial Area Phase 2, Panchkula, Haryana</span>
            </div>
            <div className="d-flex align-items-center mb-3 text-muted-custom" style={{ fontSize: '0.88rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2 flex-shrink-0" style={{ color: 'var(--primary-color)' }}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              <a href="tel:+919138004800" className="text-muted-custom text-decoration-none hover-brand">+91 91380 04800</a>
            </div>
            <div className="d-flex align-items-center mb-3 text-muted-custom" style={{ fontSize: '0.88rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2 flex-shrink-0" style={{ color: 'var(--primary-color)' }}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              <a href="mailto:info@cleanz24.com" className="text-muted-custom text-decoration-none hover-brand">info@cleanz24.com</a>
            </div>

            {/* Trust Line */}
            <div className="mt-4 d-flex align-items-center gap-2" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--primary-color)"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              <span>Trusted by 10,000+ car owners across India</span>
            </div>
          </div>
        </div>

        {/* Certification Badges Row */}
        <div className="footer-cert-badges justify-content-center mb-4 d-flex">
          <div className="footer-cert-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            ISO 9001 Quality
          </div>
          <div className="footer-cert-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            Eco-Safe Protocols
          </div>
          <div className="footer-cert-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Google Verified Business
          </div>
          <div className="footer-cert-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
            100+ Stores Pan India
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center" style={{ borderColor: 'var(--card-border) !important' }}>
          <p className="mb-2 mb-md-0 text-muted-custom small">© {new Date().getFullYear()} Cleanz24. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a href="#" className="text-muted-custom text-decoration-none small hover-brand">Privacy Policy</a>
            <a href="#" className="text-muted-custom text-decoration-none small hover-brand">Terms of Service</a>
            <a href="#" className="text-muted-custom text-decoration-none small hover-brand">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
