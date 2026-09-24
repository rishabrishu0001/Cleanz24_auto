'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GrandOpeningModal({
  isOpen: controlledIsOpen,
  onClose,
  imageSrc = '/grand_opening_maharajganj.jpg',
  altText = 'Cleanz24 Grand Opening Ceremony - Maharajganj, Bihar',
  sessionKey = 'cleanz24_grand_opening_maharajganj_v1',
  phone = '9138004800',
  whatsapp = '917632034777',
  locationText = 'Maharajganj, Siwan, Bihar',
  storeUrl = '',
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    if (!isControlled) {
      // Show popup after a slight delay on page load if not dismissed
      const timer = setTimeout(() => {
        try {
          const hasDismissed = sessionStorage.getItem(sessionKey);
          if (!hasDismissed) {
            setInternalIsOpen(true);
          }
        } catch (_e) {
          setInternalIsOpen(true);
        }
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isControlled, sessionKey]);

  const handleClose = () => {
    try {
      sessionStorage.setItem(sessionKey, 'true');
    } catch (_e) {}
    if (!isControlled) {
      setInternalIsOpen(false);
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
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '16px',
            overflowY: 'auto',
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '92vw',
              maxHeight: '92vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Floating Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close Announcement"
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
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
                zIndex: 60,
                boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
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

            {/* Poster Image Container */}
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(34, 197, 94, 0.35)',
                border: '1.5px solid rgba(255, 255, 255, 0.18)',
                lineHeight: 0,
                backgroundColor: '#0a1d0f',
              }}
            >
              <img
                src={imageSrc}
                alt={altText}
                style={{
                  maxWidth: '92vw',
                  maxHeight: 'min(78vh, 640px)',
                  width: 'auto',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
                onError={(e) => {
                  e.currentTarget.src = '/grand_opening.jpg';
                }}
              />
            </div>

            {/* Quick Action Bar under the poster */}
            {(phone || whatsapp) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginTop: '12px',
                  width: '100%',
                  maxWidth: '420px',
                }}
              >
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      backgroundColor: '#15803d',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(21, 128, 61, 0.4)',
                      transition: 'transform 0.2s, background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.backgroundColor = '#16a34a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = '#15803d';
                    }}
                  >
                    <span>📞</span>
                    <span>Call Store</span>
                  </a>
                )}
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi Cleanz24, I saw the Grand Opening invitation for ${locationText || 'Cleanz24'}!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                      transition: 'transform 0.2s, background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.backgroundColor = '#22c55e';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = '#25D366';
                    }}
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                )}
                {storeUrl && (
                  <a
                    href={storeUrl}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      backgroundColor: '#2563EB',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                      transition: 'transform 0.2s, background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = '#2563EB';
                    }}
                  >
                    <span>📍</span>
                    <span>Store Page</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
