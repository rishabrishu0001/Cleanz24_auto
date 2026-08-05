'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import laundryLogo from '../../assets/laundry_logo_user.jpg';

export default function LaundryLoading() {
  // Scroll lock while loader is active — cleanup on unmount
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <>
      <div style={{
        /* Full-screen fixed overlay — covers everything */
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        /* 100dvh for mobile browsers (iOS Safari address bar), fallback to 100vh */
        height: '100dvh',
        minHeight: '100vh',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, #0B2417 0%, #05140C 65%, #010603 100%)',
        color: '#FFFFFF',
        fontFamily: "'Poppins', sans-serif",
      }}>
        {/* Outer Card Wrapper */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 36px',
          borderRadius: '24px',
          background: 'rgba(7, 26, 16, 0.85)',
          border: '1px solid rgba(0, 201, 109, 0.3)',
          boxShadow: '0 16px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 201, 109, 0.2)',
          width: '320px',
          maxWidth: '85vw',
        }}>
          {/* Glowing Logo Frame */}
          <div style={{
            position: 'relative',
            width: '240px',
            height: '115px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '20px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 201, 109, 0.2)',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            background: '#2B7A42',
          }}>
            <Image
              src={laundryLogo}
              alt="Cleanz24 Laundry Studio"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          {/* Text Subtitle */}
          <p style={{
            margin: '0 0 16px 0',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: '#00C96D',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            Entering Laundry Studio...
          </p>

          {/* Animated Progress Bar */}
          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-50%',
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, #00C96D, #D4AF37, transparent)',
              borderRadius: '10px',
              animation: 'shimmerProgress 1.4s ease-in-out infinite',
            }} />
          </div>
        </div>

        <style>{`
          @keyframes shimmerProgress {
            0%   { left: -50%; }
            100% { left: 100%; }
          }
        `}</style>
      </div>

      {/*
        Spacer div: Next.js App Router renders loading.js in the layout tree.
        Without this, the layout may collapse to 0px during loading.
        This keeps the document flow stable while the fixed overlay is shown.
      */}
      <div style={{ visibility: 'hidden', minHeight: '100vh' }} aria-hidden="true" />
    </>
  );
}
