import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo2.jpeg';
import carSpaLogo from '../assets/logo3.jpeg'; // Replace with exact filename if different
import '../styles/carSpa.css';
import SEOMeta from '../components/SEOMeta';

function Landing() {
  const [hoveredSide, setHoveredSide] = useState(null); // 'laundry' | 'car-spa' | null
  const [bubbles, setBubbles] = useState([]);
  const [sparks, setSparks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Generate bubbles for Laundry side
    const bubbleArray = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90}%`,
      size: `${Math.random() * 25 + 8}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 6 + 5}s`
    }));
    setBubbles(bubbleArray);

    // Generate sparks for Car Spa side
    const sparkArray = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90}%`,
      size: `${Math.random() * 5 + 2}px`,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 5 + 4}s`
    }));
    setSparks(sparkArray);

    return () => clearTimeout(timer);
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
      <SEOMeta
        title="Cleanz24 — Premium Laundry & Dry Clean Studio & Car Spa Studio"
        description="Cleanz24 is India's leading Premium Laundry and Dry Clean Studio and Car spa studio. In Laundry industry we have 100+ Franchise operational across multiple cities and States across India. We also offer premium Car Spa services including foam wash, ceramic coating, PPF and car detailing."
        canonical="https://cleanz24.com/"
      />

      {/* ── PRELOADER ANIMATION ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            className="preloader-overlay"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: '-100vh',
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
            <div className="preloader-glow" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="d-flex flex-column align-items-center"
            >
              <img src={logoImg} alt="Cleanz24 Logo" className="preloader-logo mb-3" />
            </motion.div>
            <motion.div 
              className="preloader-line"
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ delay: 0.5, duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="preloader-tagline"
            >
              INDIA'S PREMIUM SERVICE NETWORK
            </motion.div>
            <div className="preloader-bar-bg">
              <motion.div 
                className="preloader-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="preloader-status"
            >
              Loading experience...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Midline neon separator */}
      <motion.div 
        className={`split-midline d-none d-md-block ${hoveredSide ? `active-${hoveredSide}` : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
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
        <motion.div 
          className="split-panel laundry-panel position-absolute top-0 start-0 w-100 h-100 text-decoration-none text-white overflow-hidden d-flex align-items-center justify-content-center"
          initial={{ x: '-10%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
            {/* Cleanz24 Logo */}
            <motion.div 
              className="landing-icon-wrap mb-4" 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <img src={logoImg} alt="Cleanz24 Logo" style={{ height: '70px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', objectFit: 'contain' }} />
            </motion.div>
            <motion.h2 
              className="display-4 fw-black text-uppercase tracking-wide font-oswald text-white mb-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              PREMIUM <br /><span style={{ color: '#00C96D' }}>LAUNDRY</span>
            </motion.h2>
            <motion.p 
              className="lead fw-light mb-4 text-light-custom" 
              style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.78)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Expert garment care, chemical dry cleaning, and fabric restoration services with door-to-door convenience.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link to="/laundry" className="btn-portal btn-laundry text-uppercase fw-bold py-3 px-5 rounded-pill shadow-lg border text-decoration-none position-relative" style={{ borderColor: '#00C96D', display: 'inline-block', zIndex: 20 }}>
                ENTER LAUNDRY
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* 2. CAR SPA SIDE */}
        <motion.div 
          className="split-panel carspa-panel position-absolute top-0 start-0 w-100 h-100 text-decoration-none text-white overflow-hidden d-flex align-items-center justify-content-center"
          initial={{ x: '10%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
            {/* Premium Car Spa Logo */}
            <motion.div 
              className="landing-icon-wrap mb-4" 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <img src={carSpaLogo} alt="Cleanz24 Car Spa Logo" style={{ height: '70px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', objectFit: 'contain' }} />
            </motion.div>
            <motion.h2 
              className="display-4 fw-black text-uppercase tracking-wide font-oswald text-white mb-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              CAR <br /><span style={{ color: '#D4AF37' }}>SPA</span>
            </motion.h2>
            <motion.p 
              className="lead fw-light mb-4 text-light-custom" 
              style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.78)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Advanced paint protection film (PPF), 10H DNA Graphene coatings, & premium detail wash restoration.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link to="/car-spa" className="btn-portal btn-carspa text-uppercase fw-bold py-3 px-5 rounded-pill shadow-lg border text-decoration-none position-relative" style={{ borderColor: '#D4AF37', display: 'inline-block', zIndex: 20 }}>
                ENTER CAR SPA
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>

      <style>{`

        /* Preloader Styles */
        .preloader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, #111a24 0%, #05080c 100%);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .preloader-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 201, 109, 0.08) 0%, rgba(212, 175, 55, 0.06) 50%, transparent 100%);
          filter: blur(40px);
          pointer-events: none;
          animation: pulseGlow 3s infinite alternate ease-in-out;
        }

        @keyframes pulseGlow {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        .preloader-logo {
          max-height: 80px;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.05);
        }

        .preloader-line {
          height: 2px;
          background: linear-gradient(90deg, #00C96D, #D4AF37);
          margin: 15px 0;
          border-radius: 1px;
        }

        .preloader-tagline {
          font-family: 'Oswald', sans-serif;
          font-size: 0.8rem;
          color: #D4AF37;
          letter-spacing: 3px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .preloader-bar-bg {
          width: 200px;
          height: 3px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          margin-top: 35px;
          overflow: hidden;
          position: relative;
        }

        .preloader-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00C96D, #D4AF37);
          border-radius: 10px;
          box-shadow: 0 0 8px rgba(0, 201, 109, 0.5);
        }

        .preloader-status {
          margin-top: 10px;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
          text-transform: uppercase;
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
            font-size: 1.8rem !important; /* Smaller display title to fit 50vh */
            margin-bottom: 0.25rem !important;
            line-height: 1.2 !important;
          }
          .landing-content p {
            font-size: 0.8rem !important; /* Tighter body text to fit 50vh */
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
            height: 40px !important;
          }
          .btn-portal {
            padding: 8px 24px !important; /* Smaller button padding to fit 50vh */
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
