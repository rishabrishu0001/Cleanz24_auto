'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GrandOpeningModal({
  isOpen: controlledIsOpen,
  onClose,
  imageSrc = '/grand_opening.jpg',
  altText = 'Cleanz24 Store Grand Opening',
  sessionKey = 'cleanz24_grand_opening_closed',
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    if (!isControlled) {
      // Show popup after a slight delay on page load if not dismissed
      const timer = setTimeout(() => {
        const hasDismissed = sessionStorage.getItem(sessionKey);
        if (!hasDismissed) {
          setInternalIsOpen(true);
        }
      }, 700);

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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              display: 'inline-block',
              maxWidth: '92vw',
              maxHeight: '90vh',
              lineHeight: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Floating Close Button */}
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

            {/* Pure Poster Image - Exact aspect ratio, no container box or black borders */}
            <img
              src={imageSrc}
              alt={altText}
              style={{
                maxWidth: '92vw',
                maxHeight: '88vh',
                width: 'auto',
                height: 'auto',
                display: 'block',
                borderRadius: '16px',
                boxShadow: '0 25px 65px rgba(0, 0, 0, 0.95), 0 0 25px rgba(34, 197, 94, 0.4)',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
              }}
              onError={(e) => {
                e.currentTarget.src = '/grand_opening.jpg';
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
