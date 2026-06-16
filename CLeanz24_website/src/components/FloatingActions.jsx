import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './FloatingActions.css';

export default function FloatingActions() {
  const [isMember, setIsMember] = useState(() => {
    try { return !!localStorage.getItem('cleanz24_logged_in_member'); } catch { return false; }
  });
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        setIsMember(!!localStorage.getItem('cleanz24_logged_in_member'));
      } catch {
        setIsMember(false);
      }
    };
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  const handlePickupClick = (e) => {
    if (location.pathname === '/car-spa' || location.pathname === '/car-spa/') {
      e.preventDefault();
      const target = document.querySelector('#book');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="floating-actions">
      {isMember && (
        <a
          href="/car-spa#book"
          onClick={handlePickupClick}
          className="fab fab-pickup animate-btn"
          aria-label="Schedule Free Pickup"
          style={{ textDecoration: 'none' }}
        >
          <span style={{ fontSize: '1.6rem' }} title="Schedule Free Member Pickup">🚗</span>
        </a>
      )}
      <a
        href="https://wa.me/919138004800?text=Hi%2C%20I%20am%20interested%20in%20Car%20Spa%20services"
        target="_blank"
        rel="noreferrer"
        className="fab fab-whatsapp"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="36" height="36" fill="currentColor">
          <path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16c0 2.4.6 4.7 1.8 6.7L2.5 29.5l7-1.8c2 .1 4.1 1.8 6.5 1.8 7.5 0 13.5-6 13.5-13.5S23.5 2.5 16 2.5zm0 22.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4C5.5 18.2 5 16.1 5 14c0-6.1 5-11 11-11s11 4.9 11 11-4.9 11-11 11zm6-7.8c-.3-.2-2-.1-2.3-.8-.3-.7-.3-1.3-.4-1.4-.2-.2-.5-.2-.8 0-.3.3-1.3 1.3-1.5 1.5-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-1-1-1.3-1.3-1.5-1.5-.2-.2 0-.3.1-.4.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.4-1-.5-1.4-.1-.4-.2-.3-.3-.3h-.3c-.1 0-.3 0-.5.2-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4 1.7.8 2.3.9 3.1.8.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.6-.4z" />
        </svg>
      </a>
      <a href="tel:+919138004800" className="fab fab-phone" aria-label="Call Us">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>
    </div>
  );
}
