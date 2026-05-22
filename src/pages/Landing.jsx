import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpeg';
import afterDetailingImg from '../assets/after_detailing.png';
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
          clipPath: dividerClip,
          transition: 'clip-path 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.4s ease, filter 0.4s ease',
          backgroundColor: hoveredSide === 'laundry' ? '#00e281' : hoveredSide === 'car-spa' ? '#ff0d1b' : 'rgba(255,255,255,0.15)',
          filter: hoveredSide === 'laundry' 
            ? 'drop-shadow(0 0 8px #00e281) drop-shadow(0 0 15px #00e281)' 
            : hoveredSide === 'car-spa' 
            ? 'drop-shadow(0 0 8px #ff0d1b) drop-shadow(0 0 15px #ff0d1b)' 
            : 'none'
        }}
      />

      <div className="d-flex flex-column flex-md-row min-vh-100 w-100 position-relative">
        
        {/* 1. LAUNDRY SIDE */}
        <a 
          href="https://www.cleanz24.com" 
          className="split-panel laundry-panel position-absolute top-0 start-0 w-100 h-100 text-decoration-none text-white overflow-hidden d-flex align-items-center justify-content-center"
          style={{
            clipPath: leftClip,
            transition: 'clip-path 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
            zIndex: 1,
            background: 'radial-gradient(circle at 30% 50%, rgba(0, 102, 162, 0.45) 0%, rgba(0, 17, 34, 0.95) 80%)'
          }}
          onMouseEnter={() => setHoveredSide('laundry')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Animated Water Bubbles */}
          <div className="particles-layer position-absolute w-100 h-100 top-0 start-0 overflow-hidden">
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
            <div className="landing-icon-wrap mb-4 display-3" style={{ textShadow: '0 0 20px rgba(0, 226, 129, 0.3)' }}>🧺</div>
            <h2 className="display-4 fw-black text-uppercase tracking-wide font-oswald text-white mb-3">
              PREMIER <br /><span className="text-info">LAUNDRY</span>
            </h2>
            <p className="text-white-50 lead fw-light mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Expert garment care, chemical dry cleaning, and fabric restoration services.
            </p>
            <span className="btn-portal btn-laundry text-uppercase fw-bold py-3 px-5 rounded-pill shadow-lg border border-info">
              ENTER LAUNDRY
            </span>
          </div>
        </a>

        {/* 2. CAR SPA SIDE */}
        <Link 
          to="/car-spa" 
          className="split-panel carspa-panel position-absolute top-0 start-0 w-100 h-100 text-decoration-none text-white overflow-hidden d-flex align-items-center justify-content-center"
          style={{
            clipPath: rightClip,
            transition: 'clip-path 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
            zIndex: 2,
            background: `radial-gradient(circle at 70% 50%, rgba(217, 4, 41, 0.25) 0%, rgba(5, 5, 5, 0.98) 85%), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.55)), url(${afterDetailingImg}) center/cover no-repeat`
          }}
          onMouseEnter={() => setHoveredSide('car-spa')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Animated Sparks */}
          <div className="particles-layer position-absolute w-100 h-100 top-0 start-0 overflow-hidden">
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

          {/* Carbon grid overlay */}
          <div className="carbon-mesh-overlay position-absolute w-100 h-100 top-0 start-0 opacity-10 pointer-events-none" />

          <div className="landing-content carspa-content-wrapper z-2">
            <div className="landing-icon-wrap mb-4 display-3" style={{ textShadow: '0 0 20px rgba(255, 13, 27, 0.3)' }}>🚘</div>
            <h2 className="display-4 fw-black text-uppercase tracking-wide font-oswald text-white mb-3">
              CAR <br /><span className="text-danger">SPA</span>
            </h2>
            <p className="text-white-50 lead fw-light mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Advanced paint protection film (PPF), 10H DNA Graphene, & detail restoration.
            </p>
            <span className="btn-portal btn-carspa text-uppercase fw-bold py-3 px-5 rounded-pill shadow-lg border border-danger">
              ENTER CAR SPA
            </span>
          </div>
        </Link>

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
          background-color: #ff0d1b;
          box-shadow: 0 0 6px #ff0d1b, 0 0 12px #ff0d1b;
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

        .btn-portal {
          display: inline-block;
          letter-spacing: 2px;
          font-size: 0.85rem;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          border-radius: 50px !important;
        }

        .btn-laundry {
          background: rgba(0, 102, 162, 0.2);
          color: #0dcaf0 !important;
          border-radius: 50px !important;
        }
        .btn-laundry:hover {
          background: #0dcaf0;
          color: #000 !important;
          box-shadow: 0 0 20px rgba(13, 202, 240, 0.5) !important;
          transform: translateY(-2px);
        }

        .btn-carspa {
          background: rgba(217, 4, 41, 0.2);
          color: #ff0d1b !important;
          border-radius: 50px !important;
        }
        .btn-carspa:hover {
          background: #ff0d1b;
          color: #fff !important;
          box-shadow: 0 0 20px rgba(255, 13, 27, 0.5) !important;
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
            left: 25% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
          .carspa-content-wrapper {
            position: absolute !important;
            left: 75% !important;
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
            clip-path: none !important;
            width: 100% !important;
          }
          .laundry-panel {
            background: radial-gradient(circle at center, rgba(0, 102, 162, 0.5) 0%, rgba(0, 11, 33, 0.98) 100%) !important;
          }
          .carspa-panel {
            background: radial-gradient(circle at center, rgba(217, 4, 41, 0.3) 0%, rgba(5, 5, 5, 0.99) 100%), linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.6)), url(${afterDetailingImg}) center/cover no-repeat !important;
          }
          .landing-logo-container {
            top: 15px !important;
            transform: scale(0.8) translateX(-62.5%);
          }
          .laundry-content-wrapper,
          .carspa-content-wrapper {
            transform: none !important;
            padding: 1.5rem !important;
            text-align: center !important;
            margin: 0 auto;
          }
          .laundry-panel:hover .laundry-content-wrapper,
          .carspa-panel:hover .carspa-content-wrapper {
            transform: scale(1.02) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Landing;
