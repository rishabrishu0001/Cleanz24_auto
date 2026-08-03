'use client';

import React from 'react';
import Image from 'next/image';
import logoImg from '../assets/logo2.jpeg';

export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #0F2027 0%, #091419 70%, #030709 100%)',
      color: '#FFFFFF',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Main Card Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 36px',
        borderRadius: '24px',
        background: 'rgba(20, 36, 45, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 16px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 201, 109, 0.15)',
        width: '320px',
        maxWidth: '85vw'
      }}>
        {/* Uncropped Rectangular Badge */}
        <div style={{
          position: 'relative',
          width: '220px',
          height: '100px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '20px',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
          background: '#ffffff'
        }}>
          <Image
            src={logoImg}
            alt="Cleanz24 Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Loading Subtitle */}
        <p style={{
          margin: '0 0 16px 0',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '1.5px',
          color: '#00C96D',
          textTransform: 'uppercase',
          textAlign: 'center'
        }}>
          Loading Experience...
        </p>

        {/* Progress Bar */}
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
            background: 'linear-gradient(90deg, transparent, #00C96D, #2B6CB0, transparent)',
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
