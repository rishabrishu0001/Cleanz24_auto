import React from 'react';
import logoImg from '../assets/logo.jpeg';
import { handleSmoothScroll } from '../utils';

export default function Footer() {
  return (
    <footer className="footer-custom pt-5 pb-4 mt-auto">
      <div className="container pt-3">
        <div className="row justify-content-between mb-5">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <a className="navbar-brand d-flex align-items-center mb-4" href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>
              <img src={logoImg} alt="Cleanz24" height={45} className="rounded-circle border border-secondary me-2" />
              <span className="fw-bold tracking-widest text-heading h4 mb-0" style={{ letterSpacing: '2px' }}>CLEANZ24</span>
            </a>
            <p className="text-muted-custom pe-lg-4 mb-4">
              Premium automotive detailing and spa services utilizing industry-leading eco-friendly compounds.
            </p>
            <div className="d-flex align-items-center mb-2 text-muted-custom">
              <span className="me-2">📍</span> Plot No. 24, Industrial Area Phase 2, Panchkula
            </div>
            <div className="d-flex align-items-center mb-2 text-muted-custom">
              <span className="me-2">📍</span> VIP Road, Zirakpur
            </div>
            <div className="d-flex align-items-center mb-2 text-muted-custom">
              <span className="me-2">📞</span> +91 91380 04800
            </div>
            <div className="d-flex align-items-center text-muted-custom">
              <span className="me-2">✉️</span> info@cleanz24.com
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6 ps-lg-5">
            <h4 className="h5 fw-bold mb-4 position-relative pb-2 footer-heading text-heading">Quick Links</h4>
            <ul className="list-unstyled footer-links">
              <li><a href="#home" className="text-muted-custom text-decoration-none hover-brand" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a></li>
              <li><a href="#overview" className="text-muted-custom text-decoration-none hover-brand" onClick={(e) => handleSmoothScroll(e, '#overview')}>About Us</a></li>
              <li><a href="#process" className="text-muted-custom text-decoration-none hover-brand" onClick={(e) => handleSmoothScroll(e, '#process')}>Our Process</a></li>
              <li><a href="#book" className="text-muted-custom text-decoration-none hover-brand" onClick={(e) => handleSmoothScroll(e, '#book')}>Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-top border-secondary-subtle pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-0 text-muted-custom small">© {new Date().getFullYear()} Cleanz24. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
