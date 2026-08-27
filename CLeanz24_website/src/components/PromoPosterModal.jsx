'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromoPosterModal({
  isOpen: controlledIsOpen,
  onClose,
  imageSrc = '/raksha_bandhan.jpg',
  altText = 'Cleanz24 Raksha Bandhan Special Offer',
  sessionKey = 'cleanz24_rakhi_popup_closed',
  phone = '9138004800',
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    if (!isControlled) {
      // Show popup after 800ms delay on page load if not dismissed in this session
      const timer = setTimeout(() => {
        const hasDismissed = sessionStorage.getItem(sessionKey);
        if (!hasDismissed) {
          setInternalIsOpen(true);
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isControlled, sessionKey]);

  const handleClose = () => {
    if (!isControlled) {
      setInternalIsOpen(false);
      sessionStorage.setItem(sessionKey, 'true');
    }
    if (onClose) {
      onClose();
    }
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
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '16px',
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 15 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              display: 'inline-block',
              maxWidth: '92vw',
              maxHeight: '90vh',
              lineHeight: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Red Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close Announcement"
              style={{
                position: 'absolute',
                top: '-14px',
                right: '-14px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#dc2626',
                border: '2px solid #ffffff',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                boxShadow: '0 6px 18px rgba(0,0,0,0.6)',
                transition: 'transform 0.2s, backgroundColor 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.12)';
                e.currentTarget.style.backgroundColor = '#b91c1c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#dc2626';
              }}
            >
              ✕
            </button>

            {/* Poster Image */}
            <img
              src={imageSrc}
              alt={altText}
              style={{
                maxWidth: '92vw',
                maxHeight: '86vh',
                width: 'auto',
                height: 'auto',
                display: 'block',
                borderRadius: '18px',
                boxShadow: '0 25px 65px rgba(0, 0, 0, 0.95), 0 0 30px rgba(234, 179, 8, 0.35)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
              }}
            />

            {/* Quick Action Bar under poster */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px',
                zIndex: 40,
                width: '90%',
                justifyContent: 'center',
              }}
            >
              <a
                href={`tel:${phone}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '50px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                📞 Call Now
              </a>

              <a
                href={`https://wa.me/91${phone}?text=Hi%20Cleanz24,%20I%20want%20to%20book%20laundry%20pickup%20for%20Raksha%20Bandhan!`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '50px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                💬 WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
