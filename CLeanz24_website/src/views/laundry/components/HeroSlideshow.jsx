'use client';

import React, { useState, useEffect } from "react";
import storeimg1 from '../../../assets/storeimg1.jpeg';
import storeimg2 from '../../../assets/storeimg2.jpeg';
import storeimg3 from '../../../assets/storeimg3.jpeg';
import storeimg4 from '../../../assets/storeimg4.jpeg';
import storeimg5 from '../../../assets/storeimg5.jpeg';
import storeimg6 from '../../../assets/storeimg6.jpeg';
import storeimg7 from '../../../assets/storeimg7.jpeg';

const storeImages = [
  '/assets/store_hero.jpg',
  storeimg1,
  storeimg2,
  storeimg3,
  storeimg4,
  storeimg5,
  storeimg6,
  storeimg7
];

export default function HeroSlideshow({ dark }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % storeImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(280px, 45vh, 460px)',
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: `0 16px 48px rgba(0,0,0,${dark ? '0.5' : '0.15'})`,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`
    }}>
      {storeImages.map((src, i) => (
        <img
          key={i}
          src={typeof src === 'string' ? src : (src?.src || '')}
          alt={`Cleanz24 Store ${i + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 20,
            opacity: activeIdx === i ? 1 : 0,
            transform: activeIdx === i ? 'scale(1.03)' : 'scale(1)',
            transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
            zIndex: activeIdx === i ? 2 : 1,
          }}
        />
      ))}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '90px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        zIndex: 3,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 7,
        zIndex: 4,
      }}>
        {storeImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActiveIdx(i)}
            style={{
              width: activeIdx === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: activeIdx === i ? '#22c55e' : 'rgba(255,255,255,0.6)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.35s ease, background 0.3s',
              outline: 'none',
            }}
          />
        ))}
      </div>
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(22, 101, 52, 0.95)',
        color: '#fff',
        borderRadius: 30,
        padding: '6px 16px',
        fontSize: '0.8rem',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.5px',
        zIndex: 4,
        backdropFilter: 'blur(6px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        📍 100+ Stores Across India
      </div>
    </div>
  );
}
