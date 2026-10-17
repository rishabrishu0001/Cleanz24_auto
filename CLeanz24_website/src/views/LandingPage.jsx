'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../assets/laundry_logo_user.jpg';
import carSpaLogo from '../assets/logo3.jpeg';

// Static deterministic particle coordinates — zero hydration lag & zero layout shift
const BUBBLES = [
  { id: 0, left: '15%', size: '18px', delay: '0s', duration: '7s' },
  { id: 1, left: '35%', size: '26px', delay: '2s', duration: '9s' },
  { id: 2, left: '55%', size: '14px', delay: '4s', duration: '6s' },
  { id: 3, left: '75%', size: '22px', delay: '1s', duration: '8s' },
  { id: 4, left: '88%', size: '16px', delay: '3s', duration: '10s' },
];

const SPARKS = [
  { id: 0, left: '12%', size: '4px', delay: '0s', duration: '6s' },
  { id: 1, left: '28%', size: '3px', delay: '1.5s', duration: '5s' },
  { id: 2, left: '42%', size: '5px', delay: '0.8s', duration: '7s' },
  { id: 3, left: '58%', size: '3px', delay: '2.2s', duration: '6.5s' },
  { id: 4, left: '72%', size: '6px', delay: '1.2s', duration: '5.5s' },
  { id: 5, left: '84%', size: '4px', delay: '3s', duration: '8s' },
  { id: 6, left: '92%', size: '3px', delay: '0.5s', duration: '6s' },
  { id: 7, left: '48%', size: '5px', delay: '2.8s', duration: '7.2s' },
];

function Landing() {
  const [hoveredSide, setHoveredSide] = useState(null); // 'laundry' | 'car-spa' | null

  // Diagonal clip path values for interactive desktop split screen
  let leftClip = "polygon(0 0, 52% 0, 48% 100%, 0 100%)";
  let rightClip = "polygon(52% 0, 100% 0, 100% 100%, 48% 100%)";
  let dividerClip = "polygon(calc(52% - 2px) 0, calc(52% + 2px) 0, calc(48% + 2px) 100%, calc(48% - 2px) 100%)";

  if (hoveredSide === 'laundry') {
    leftClip = "polygon(0 0, 68% 0, 60% 100%, 0 100%)";
    rightClip = "polygon(68% 0, 100% 0, 100% 100%, 60% 100%)";
    dividerClip = "polygon(calc(68% - 2px) 0, calc(68% + 2px) 0, calc(60% + 2px) 100%, calc(60% - 2px) 100%)";
  } else if (hoveredSide === 'car-spa') {
    leftClip = "polygon(0 0, 36% 0, 28% 100%, 0 100%)";
    rightClip = "polygon(36% 0, 100% 0, 100% 100%, 28% 100%)";
    dividerClip = "polygon(calc(36% - 2px) 0, calc(36% + 2px) 0, calc(28% + 2px) 100%, calc(28% - 2px) 100%)";
  }

  return (
    <div className="landing-container bg-black min-vh-100 position-relative overflow-hidden w-100">
      
      {/* Dynamic Midline neon separator */}
      <div 
        className={`split-midline d-none d-md-block ${hoveredSide ? `active-${hoveredSide}` : ''}`}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 4,
          pointerEvents: 'none',
          clipPath: dividerClip,
          transition: 'clip-path 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.4s ease',
          backgroundColor: hoveredSide === 'laundry' ? '#00C96D' : hoveredSide === 'car-spa' ? '#D4AF37' : 'rgba(255,255,255,0.15)'
        }}
      />

      <div className="d-flex flex-column flex-md-row min-vh-100 w-100 position-relative">
        
        {/* 1. LAUNDRY SIDE */}
        <div 
          className="split-panel laundry-panel position-absolute top-0 start-0 w-100 h-100 text-decoration-none text-white overflow-hidden d-flex align-items-center justify-content-center"
          style={{
            clipPath: leftClip,
            transition: 'clip-path 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
            zIndex: hoveredSide === 'laundry' ? 10 : 1,
            background: 'radial-gradient(circle at 30% 50%, rgba(0, 201, 109, 0.22) 0%, rgba(3, 10, 6, 0.98) 80%)'
          }}
          onMouseEnter={() => setHoveredSide('laundry')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Animated Water Bubbles */}
          <div className="particles-layer position-absolute w-100 h-100 top-0 start-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
            {BUBBLES.map((b) => (
              <div 
                key={b.id} 
                className="bubble" 
                style={{
                  left: b.left,
                  width: b.size,
                  height: b.size,
                  animationDelay: b.delay,
                  animationDuration: b.duration
                }}
              />
            ))}
          </div>

          <div className="landing-content laundry-content-wrapper z-2">
            {/* Cleanz24 Logo */}
            <div className="landing-icon-wrap mb-4 anim-fade-scale">
              <Image 
                src={logoImg} 
                alt="Cleanz24 Premium Laundry Logo" 
                priority={true}
                sizes="(max-width: 768px) 140px, 180px"
                style={{ height: '70px', width: 'auto', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', objectFit: 'contain' }} 
              />
            </div>
            <h2 className="display-4 fw-black text-uppercase tracking-wide font-oswald text-white mb-3 anim-fade-up anim-delay-1">
              PREMIUM <br /><span style={{ color: '#00C96D' }}>LAUNDRY</span>
            </h2>
            <p 
              className="lead fw-light mb-4 text-light-custom anim-fade-up anim-delay-2" 
              style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.78)' }}
            >
              Expert garment care, chemical dry cleaning, and fabric restoration services with door-to-door convenience.
            </p>
            <div className="anim-fade-up anim-delay-3">
              <Link href="/best-laundry-drycleaning" className="btn-portal btn-laundry text-uppercase fw-bold py-3 px-5 rounded-pill shadow-lg border text-decoration-none position-relative" style={{ borderColor: '#00C96D', display: 'inline-block', zIndex: 20 }}>
                ENTER LAUNDRY
              </Link>
            </div>
          </div>
        </div>

        {/* 2. CAR SPA SIDE */}
        <div 
          className="split-panel carspa-panel position-absolute top-0 start-0 w-100 h-100 text-decoration-none text-white overflow-hidden d-flex align-items-center justify-content-center"
          style={{
            clipPath: rightClip,
            transition: 'clip-path 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
            zIndex: hoveredSide === 'car-spa' ? 10 : 2,
            background: 'radial-gradient(circle at 70% 50%, rgba(212, 175, 55, 0.22) 0%, rgba(6, 13, 9, 0.98) 80%)'
          }}
          onMouseEnter={() => setHoveredSide('car-spa')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Animated Sparks */}
          <div className="particles-layer position-absolute w-100 h-100 top-0 start-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
            {SPARKS.map((s) => (
              <div 
                key={s.id} 
                className="spark" 
                style={{
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  animationDelay: s.delay,
                  animationDuration: s.duration
                }}
              />
            ))}
          </div>

          <div className="landing-content carspa-content-wrapper z-2">
            {/* Premium Car Spa Logo */}
            <div className="landing-icon-wrap mb-4 anim-fade-scale">
              <Image 
                src={carSpaLogo} 
                alt="Cleanz24 Car Spa Logo" 
                priority={true}
                sizes="(max-width: 768px) 140px, 180px"
                style={{ height: '70px', width: 'auto', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', objectFit: 'contain' }} 
              />
            </div>
            <h2 className="display-4 fw-black text-uppercase tracking-wide font-oswald text-white mb-3 anim-fade-up anim-delay-1">
              CAR <br /><span style={{ color: '#D4AF37' }}>SPA</span>
            </h2>
            <p 
              className="lead fw-light mb-4 text-light-custom anim-fade-up anim-delay-2" 
              style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.78)' }}
            >
              Advanced paint protection film (PPF), 10H DNA Graphene coatings, & premium detail wash restoration.
            </p>
            <div className="anim-fade-up anim-delay-3">
              <Link href="/car-spa" className="btn-portal btn-carspa text-uppercase fw-bold py-3 px-5 rounded-pill shadow-lg border text-decoration-none position-relative" style={{ borderColor: '#D4AF37', display: 'inline-block', zIndex: 20 }}>
                ENTER CAR SPA
              </Link>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        /* Lightweight Hardware-Accelerated Animations */
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-scale {
          animation: fadeScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .anim-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .anim-delay-1 { animation-delay: 0.1s; }
        .anim-delay-2 { animation-delay: 0.2s; }
        .anim-delay-3 { animation-delay: 0.3s; }

        @media (min-width: 768px) {
          .laundry-panel {
            animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .carspa-panel {
            animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
        }

        /* Bubble Particles for Laundry */
        .bubble {
          position: absolute;
          bottom: -40px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 70%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          animation: floatUp 8s infinite ease-in;
          pointer-events: none;
          will-change: transform, opacity;
        }

        /* Spark Particles for Car Spa */
        .spark {
          position: absolute;
          bottom: -15px;
          background-color: #D4AF37;
          box-shadow: 0 0 6px #D4AF37, 0 0 12px #D4AF37;
          border-radius: 50%;
          animation: flyUp 6s infinite linear;
          pointer-events: none;
          will-change: transform, opacity;
        }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-110vh) scale(1.4) rotate(360deg); opacity: 0; }
        }

        @keyframes flyUp {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 0.8; }
          100% { transform: translateY(-110vh) translateX(30px) scale(0.3); opacity: 0; }
        }

        .btn-portal {
          display: inline-block;
          letter-spacing: 2px;
          font-size: 0.85rem;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          border-radius: 50px !important;
        }

        .btn-laundry {
          background: rgba(0, 201, 109, 0.1);
          color: #00C96D !important;
          border-radius: 50px !important;
        }
        .btn-laundry:hover {
          background: #00C96D;
          color: #000 !important;
          box-shadow: 0 0 25px rgba(0, 201, 109, 0.45) !important;
          transform: translateY(-2px);
        }

        .btn-carspa {
          background: rgba(212, 175, 55, 0.1);
          color: #D4AF37 !important;
          border-radius: 50px !important;
        }
        .btn-carspa:hover {
          background: #D4AF37;
          color: #000 !important;
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.45) !important;
          transform: translateY(-2px);
        }

        .font-oswald {
          font-family: var(--font-oswald), sans-serif !important;
        }

        .split-panel {
          height: 100%;
        }

        .laundry-content-wrapper,
        .carspa-content-wrapper {
          max-width: 380px;
          width: 100%;
          transition: transform 0.5s ease;
          padding: 1.5rem;
          text-align: center;
        }

        .laundry-panel .laundry-content-wrapper,
        .carspa-panel .carspa-content-wrapper {
          transform: none;
        }

        .laundry-panel:hover .laundry-content-wrapper,
        .carspa-panel:hover .carspa-content-wrapper {
          transform: scale(1.03);
        }

        @media (min-width: 768px) {
          .laundry-content-wrapper {
            position: absolute !important;
            left: 23% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
          .carspa-content-wrapper {
            position: absolute !important;
            left: 77% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
          }

          .laundry-panel:hover .laundry-content-wrapper {
            transform: translate(-50%, -50%) scale(1.03) !important;
          }
          .carspa-panel:hover .carspa-content-wrapper {
            transform: translate(-50%, -50%) scale(1.03) !important;
          }
        }

        /* Mobile Adjustments */
        @media (max-width: 767px) {
          .landing-container {
            position: relative !important;
            width: 100vw !important;
            min-height: 100dvh !important;
            height: auto !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
          }
          .landing-container > .d-flex {
            height: auto !important;
            min-height: 100dvh !important;
            width: 100% !important;
            overflow: visible !important;
          }
          .split-panel {
            position: relative !important;
            height: auto !important;
            min-height: 50dvh !important;
            max-height: none !important;
            padding: 2.5rem 0 !important;
            clip-path: none !important;
            width: 100% !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .laundry-panel {
            background: radial-gradient(circle at center, rgba(0, 201, 109, 0.22) 0%, rgba(3, 10, 6, 0.99) 100%) !important;
          }
          .carspa-panel {
            background: radial-gradient(circle at center, rgba(212, 175, 55, 0.22) 0%, rgba(6, 13, 9, 0.99) 100%) !important;
          }
          .laundry-content-wrapper,
          .carspa-content-wrapper {
            transform: none !important;
            padding: 0.5rem !important;
            text-align: center !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 320px !important;
          }
          
          /* Scale down typography & icons for mobile */
          .landing-content h2 {
            font-size: 1.8rem !important;
            margin-bottom: 0.25rem !important;
            line-height: 1.2 !important;
          }
          .landing-content p {
            font-size: 0.8rem !important;
            margin-bottom: 0.75rem !important;
            padding: 0 10px;
            line-height: 1.4 !important;
          }
          .landing-icon-wrap {
            margin-bottom: 0.4rem !important;
          }
          .landing-icon-wrap img {
            height: 48px !important;
          }
          .landing-icon-wrap svg {
            width: 40px !important;
          }
          .btn-portal {
            padding: 8px 24px !important;
            font-size: 0.75rem !important;
          }
          
          .laundry-panel:hover .laundry-content-wrapper,
          .carspa-panel:hover .carspa-content-wrapper {
            transform: scale(1.02) !important;
          }
          .btn-laundry {
            background: #00C96D !important;
            color: #000000 !important;
            font-weight: 800 !important;
            box-shadow: 0 4px 15px rgba(0, 201, 109, 0.3) !important;
          }
          .btn-carspa {
            background: #D4AF37 !important;
            color: #000000 !important;
            font-weight: 800 !important;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Landing;
