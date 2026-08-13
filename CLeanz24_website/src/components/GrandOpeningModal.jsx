'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GrandOpeningModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a slight delay on page load
    const timer = setTimeout(() => {
      // Check if user closed it during this browser session
      const hasDismissed = sessionStorage.getItem('cleanz24_grand_opening_closed');
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('cleanz24_grand_opening_closed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '16px',
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              maxHeight: '92vh',
              backgroundColor: '#0a1d12',
              backgroundImage: 'radial-gradient(circle at top, #143822 0%, #06130b 100%)',
              borderRadius: '24px',
              border: '2px solid rgba(46, 204, 113, 0.4)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(46, 204, 113, 0.25)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close Grand Opening Announcement"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'transform 0.2s, backgroundColor 0.2s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = 'rgba(231, 76, 60, 0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
              }}
            >
              ✕
            </button>

            {/* Poster Image Container */}
            <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '22px 22px 0 0' }}>
              {/* Grand Opening Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  padding: '6px 14px',
                  borderRadius: '30px',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
                Grand Opening
              </div>

              <img
                src="/grand_opening.jpg"
                alt="Cleanz24 Grand Opening Kurukkol Kerala"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Action Bar / Details */}
            <div style={{ padding: '18px 20px 22px', backgroundColor: '#07160d', textAlign: 'center' }}>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#4ade80',
                  margin: '0 0 4px',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Inauguration Ceremony
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#e2e8f0',
                  margin: '0 0 14px',
                  fontWeight: 500,
                }}
              >
                📍 Kurukkol, Tirur–Puthanathani Road, Malappuram, Kerala
              </p>

              {/* Call / WhatsApp CTAs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <a
                  href="tel:+919074403040"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#15803d'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#16a34a'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call +91 9138004800
                </a>

                <a
                  href="https://wa.me/919138004800?text=Hi%20Cleanz24%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Grand%20Opening%20of%20Kurukkol%20branch!"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#25d366',
                    color: '#ffffff',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1eb956'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#25d366'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16c0 2.4.6 4.7 1.8 6.7L2.5 29.5l7-1.8c2 .1 4.1 1.8 6.5 1.8 7.5 0 13.5-6 13.5-13.5S23.5 2.5 16 2.5zm0 22.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4C5.5 18.2 5 16.1 5 14c0-6.1 5-11 11-11s11 4.9 11 11-4.9 11-11 11zm6-7.8c-.3-.2-2-.1-2.3-.8-.3-.7-.3-1.3-.4-1.4-.2-.2-.5-.2-.8 0-.3.3-1.3 1.3-1.5 1.5-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-1-1-1.3-1.3-1.5-1.5-.2-.2 0-.3.1-.4.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.4-1-.5-1.4-.1-.4-.2-.3-.3-.3h-.3c-.1 0-.3 0-.5.2-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4 1.7.8 2.3.9 3.1.8.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.6-.4z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
