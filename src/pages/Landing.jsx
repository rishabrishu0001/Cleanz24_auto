import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo2.jpeg';
import '../App.css';

function Landing() {
  const [hoveredSide, setHoveredSide] = useState(null); // 'laundry' | 'car-spa' | null
  const [bubbles, setBubbles] = useState([]);
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    // Generate bubbles for Laundry side
    const bubbleArray = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90}%`,
      size: `${Math.random() * 25 + 8}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 6 + 5}s`
    }));
    setBubbles(bubbleArray);

    // Generate sparks for Car Spa side
    const sparkArray = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90}%`,
      size: `${Math.random() * 5 + 2}px`,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 5 + 4}s`
    }));
    setSparks(sparkArray);
  }, []);

  // Diagonal clip path values 
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
      
      {/* Central Glassmorphic Badge / Logo Overlay (Hidden on Mobile) */}
      <div className="landing-center-badge d-none d-md-flex">
        <div className="center-badge-blur" />
        <div className="center-badge-content text-center">
          <img src={logoImg} alt="Cleanz24 Logo" className="landing-center-logo img-fluid mb-2" />
          <div className="center-badge-divider" />
          <div className="center-badge-tagline">INDIA'S PREMIUM SERVICE NETWORK</div>
          <div className="center-badge-trust">Trusted Across 21 States • 100+ Franchise Locations</div>
        </div>
      </div>

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
          transition: 'clip-path 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.4s ease, filter 0.4s ease',
          backgroundColor: hoveredSide === 'laundry' ? '#00C96D' : hoveredSide === 'car-spa' ? '#D4AF37' : 'rgba(255,255,255,0.15)',
          filter: hoveredSide === 'laundry' 
            ? 'drop-shadow(0 0 10px #00C96D) drop-shadow(0 0 25px #00C96D)' 
            : hoveredSide === 'car-spa' 
            ? 'drop-shadow(0 0 10px #D4AF37) drop-shadow(0 0 25px #D4AF37)' 
            : 'none'
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
            {bubbles.map((b) => (
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
            {/* Premium Laundry SVG Icon */}
            <div className="landing-icon-wrap mb-4" style={{ filter: 'drop-shadow(0 0 12px rgba(0, 201, 109, 0.45))' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00C96D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 10a2 2 0 0 0-2 2" />
                <path d="M18 19v-4" />
                <path d="M15 16h6" />
                <path d="M7 8h.01" />
                <path d="M11 8h.01" />
              </svg>
            </div>
            <h2 className="display-4 fw-black text-uppercase tracking-wide font-oswald text-white mb-3">
              PREMIER <br /><span style={{ color: '#00C96D' }}>LAUNDRY</span>
            </h2>
            <p className="lead fw-light mb-4 text-light-custom" style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.78)' }}>
              Expert garment care, chemical dry cleaning, and fabric restoration services with door-to-door convenience.
            </p>
            <a href="https://www.cleanz24.com" className="btn-portal btn-laundry text-uppercase fw-bold py-3 px-5 rounded-pill shadow-lg border text-decoration-none position-relative" style={{ borderColor: '#00C96D', display: 'inline-block', zIndex: 20 }}>
              ENTER LAUNDRY
            </a>
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
            {sparks.map((s) => (
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
            {/* Premium Car Detailing SVG Icon */}
            <div className="landing-icon-wrap mb-4" style={{ filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.45))' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
                <path d="M13 10h3" />
                <path d="M5 10h4" />
                <path d="M12 4v2" />
                <path d="M19 4l-1.5 1.5" />
                <path d="M5 4l1.5 1.5" />
              </svg>
            </div>
            <h2 className="display-4 fw-black text-uppercase tracking-wide font-oswald text-white mb-3">
              CAR <br /><span style={{ color: '#D4AF37' }}>SPA</span>
            </h2>
            <p className="lead fw-light mb-4 text-light-custom" style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.78)' }}>
              Advanced paint protection film (PPF), 10H DNA Graphene coatings, & premium detail wash restoration.
            </p>
            <Link to="/car-spa" className="btn-portal btn-carspa text-uppercase fw-bold py-3 px-5 rounded-pill shadow-lg border text-decoration-none position-relative" style={{ borderColor: '#D4AF37', display: 'inline-block', zIndex: 20 }}>
              ENTER CAR SPA
            </Link>
          </div>
        </div>

      </div>

      {/* Mobile Center Header (Visible only on mobile) */}
      <div className="mobile-landing-header d-block d-md-none text-center w-100 py-3 position-absolute top-0 start-0 z-3 bg-black bg-opacity-70 border-bottom border-secondary border-opacity-20">
        <img src={logoImg} alt="Cleanz24 Logo" style={{ height: '40px' }} />
        <div style={{ fontSize: '0.65rem', color: '#D4AF37', letterSpacing: '2px', fontWeight: 'bold', marginTop: '2px' }}>
          INDIA'S PREMIUM SERVICE NETWORK
        </div>
      </div>

      <style>{`
        /* Bubble Particles for Laundry */
        .bubble {
          position: absolute;
          bottom: -40px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 70%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          animation: floatUp 8s infinite ease-in;
          pointer-events: none;
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
        }

        .carbon-mesh-overlay {
          background-image: 
            linear-gradient(45deg, #111 25%, transparent 25%), 
            linear-gradient(-45deg, #111 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #111 75%), 
            linear-gradient(-45deg, transparent 75%, #111 75%);
          background-size: 8px 8px;
          background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
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

        /* Central Glassmorphic Badge Styling */
        .landing-center-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 320px;
          height: 320px;
          border-radius: 50%;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
          overflow: hidden;
        }
        .center-badge-blur {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(10, 15, 13, 0.65);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          z-index: 1;
        }
        .center-badge-content {
          position: relative;
          z-index: 2;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .landing-center-logo {
          max-height: 55px;
          object-fit: contain;
        }
        .center-badge-divider {
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, #00C96D, #D4AF37);
          margin: 12px 0;
        }
        .center-badge-tagline {
          font-family: 'Oswald', sans-serif;
          font-size: 0.7rem;
          color: #D4AF37;
          letter-spacing: 2px;
          font-weight: 800;
        }
        .center-badge-trust {
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.45);
          margin-top: 4px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
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
          font-family: 'Oswald', sans-serif !important;
        }

        .split-panel {
          height: 100%;
        }

        .laundry-content-wrapper {
          max-width: 380px;
          width: 100%;
          transition: all 0.5s;
          padding: 1.5rem;
          text-align: center;
        }
        .carspa-content-wrapper {
          max-width: 380px;
          width: 100%;
          transition: all 0.5s;
          padding: 1.5rem;
          text-align: center;
        }

        .laundry-panel .laundry-content-wrapper {
          transform: none;
        }
        .carspa-panel .carspa-content-wrapper {
          transform: none;
        }

        .laundry-panel:hover .laundry-content-wrapper {
          transform: scale(1.03);
        }
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
          .split-panel {
            position: relative !important;
            height: 50vh !important;
            min-height: 380px !important; /* Prevent content clipping on smaller screens */
            clip-path: none !important;
            width: 100% !important;
            overflow: visible !important; /* Ensure buttons don't get clipped on smaller viewports */
          }
          .laundry-panel {
            background: radial-gradient(circle at center, rgba(0, 201, 109, 0.22) 0%, rgba(3, 10, 6, 0.99) 100%) !important;
            padding-top: 40px;
          }
          .carspa-panel {
            background: radial-gradient(circle at center, rgba(212, 175, 55, 0.22) 0%, rgba(6, 13, 9, 0.99) 100%) !important;
          }
          .laundry-content-wrapper {
            transform: none !important;
            padding: 1.5rem !important;
            text-align: center !important;
            margin: 60px auto 0 auto !important; /* Push down to clear mobile header */
          }
          .carspa-content-wrapper {
            transform: none !important;
            padding: 1.5rem !important;
            text-align: center !important;
            margin: 0 auto !important;
          }
          
          /* Scale down typography & icons for mobile */
          .landing-content h2 {
            font-size: 2.2rem !important; /* Smaller display title */
            margin-bottom: 0.5rem !important;
          }
          .landing-content p {
            font-size: 0.85rem !important; /* Tighter body text */
            margin-bottom: 1rem !important;
            padding: 0 10px;
          }
          .landing-icon-wrap {
            margin-bottom: 0.5rem !important;
          }
          .landing-icon-wrap svg {
            width: 48px !important;
            height: 48px !important;
          }
          .btn-portal {
            padding: 10px 30px !important; /* Smaller button padding */
            font-size: 0.78rem !important;
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
