'use client';

import React from 'react';
import Image from 'next/image';
import carSpaLogo from '../../assets/logo3.jpeg';

export default function CarSpaLoading() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #0A1A10 0%, #060D09 70%, #020503 100%)',
      color: '#FFFFFF',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Outer Card Wrapper */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 36px',
        borderRadius: '24px',
        background: 'rgba(10, 26, 16, 0.9)',
        border: '1px solid rgba(0, 201, 109, 0.35)',
        boxShadow: '0 16px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 201, 109, 0.2)',
        width: '320px',
        maxWidth: '85vw'
      }}>
        {/* Glowing Logo Frame (Exact Rectangular Aspect Ratio) */}
        <div style={{
          position: 'relative',
          width: '240px',
          height: '115px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '20px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 201, 109, 0.2)',
          border: '1.5px solid rgba(255, 255, 255, 0.25)',
          background: '#060D09'
        }}>
          <Image
            src={carSpaLogo}
            alt="Cleanz24 Car Spa Studio"
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
          textAlign: 'center'
        }}>
          Entering Car Spa Studio...
        </p>

        {/* Animated Progress Bar */}
        <div style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-50%',
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, #00C96D, #D4AF37, transparent)',
            borderRadius: '10px',
            animation: 'shimmerProgress 1.4s ease-in-out infinite'
          }} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmerProgress {
          0% { left: -50%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
