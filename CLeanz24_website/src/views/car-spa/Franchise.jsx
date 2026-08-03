'use client';

import { CarSpaThemeContext } from '../../app/car-spa/CarSpaClientLayout';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  statsCounterData, 
  franchiseSuccessStories, 
  franchiseJourneySteps, 
  roiProjections 
} from '../../data';
import '../../styles/carSpa.css';
const lastVideo = '/assets/last_video.mp4';
import { GOOGLE_SHEETS_CAR_SPA_FRANCHISE_SCRIPT_URL } from '../../config';

const countries = [
  { code: '+91', emoji: '🇮🇳', name: 'India' },
  { code: '+1', emoji: '🇺🇸', name: 'United States' },
  { code: '+44', emoji: '🇬🇧', name: 'United Kingdom' },
  { code: '+971', emoji: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+1', emoji: '🇨🇦', name: 'Canada' },
  { code: '+61', emoji: '🇦🇺', name: 'Australia' },
  { code: '+65', emoji: '🇸🇬', name: 'Singapore' },
  { code: '+64', emoji: '🇳🇿', name: 'New Zealand' },
  { code: '+977', emoji: '🇳🇵', name: 'Nepal' },
  { code: '+880', emoji: '🇧🇩', name: 'Bangladesh' },
  { code: '+94', emoji: '🇱🇰', name: 'Sri Lanka' },
  { code: '+27', emoji: '🇿🇦', name: 'South Africa' },
];

function Franchise(props) {
  const context = React.useContext(CarSpaThemeContext);
  const isDarkMode = props.isDarkMode ?? context.isDarkMode ?? true;
  const toggleTheme = props.toggleTheme ?? context.toggleTheme;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    budget: 'Premium (₹20-25 Lacs)',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const [selectedModel, setSelectedModel] = useState('Premium');
  const [hoveredTimelineStep, setHoveredTimelineStep] = useState(null);

  const [successStoryIndex, setSuccessStoryIndex] = useState(0);
  const [successVisibleCards, setSuccessVisibleCards] = useState(3);
  const [countryCode, setCountryCode] = useState('+91');
  const [countryEmoji, setCountryEmoji] = useState('🇮🇳');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSuccessVisibleCards(1);
      } else if (window.innerWidth < 992) {
        setSuccessVisibleCards(2);
      } else {
        setSuccessVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = franchiseSuccessStories.length - successVisibleCards;
    if (successStoryIndex > maxIndex) {
      setSuccessStoryIndex(Math.max(0, maxIndex));
    }
  }, [successVisibleCards]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      setFormData((prev) => ({ ...prev, [id]: value.replace(/\D/g, '') }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      budget: 'Premium (₹20-25 Lacs)',
      message: ''
    });
    setFormErrors({});
    setFormSubmitted(false);
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7,15}$/;

    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const dateStr = new Date().toISOString().split('T')[0];
        const payload = {
          date: dateStr,
          Date: dateStr,
          timestamp: dateStr,
          Timestamp: dateStr,
          datetime: dateStr,
          dateTime: dateStr,
          createdAt: dateStr,
          created_at: dateStr,
          time: dateStr,
          Time: dateStr,
          name: formData.name,
          mobile: `'${countryCode} ${formData.phone}`,
          email: formData.email,
          city: formData.location,
          modelType: formData.budget,
          message: formData.message || 'N/A'
        };

        await fetch('https://script.google.com/macros/s/AKfycbwuJjthW5Agp_jorAzJWMhCnF_Fpr0YmUd6cii2b1AO03wS28xJJLIDU5aXaMqLFibt/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error('Error submitting franchise inquiry:', err);
      } finally {
        setIsSubmitting(false);
        setFormSubmitted(true);
      }
    }
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleModelInquiry = (modelKey, budgetLabel) => {
    setSelectedModel(modelKey);
    setFormData(prev => ({ ...prev, budget: budgetLabel }));
    setTimeout(() => {
      scrollToCalculator();
    }, 100);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="franchise-page-wrapper d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
            {/* HERO SECTION */}
      <section className="hero-section position-relative text-center overflow-hidden d-flex flex-column justify-content-center" style={{ height: '100vh', backgroundImage: 'none', backgroundColor: '#000' }}>
        {/* Cinematic Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src={lastVideo?.src || lastVideo} type="video/mp4" />
        </video>

        {/* Global Dark Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.72)',
            zIndex: 1
          }}
        />

        <motion.div
          className="container mt-5 position-relative z-2"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Urgency/Fomo Banner */}
          <motion.div variants={fadeUpVariant} className="mb-4">
            <span className="urgency-banner">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
               HIGH-GROWTH TERRITORIES AVAILABLE
            </span>
          </motion.div>

          <motion.span variants={fadeUpVariant} className="text-uppercase tracking-widest text-brand-primary fw-bold small mb-2 d-block" style={{ letterSpacing: '4px' }}>
            PARTNER WITH INDIA'S ELITE
          </motion.span>
          
          <motion.h1 variants={fadeUpVariant} className="display-2 fw-black mb-4 text-gradient" style={{ lineHeight: '1.1', fontWeight: 900 }}>
            CLEANZ24 FRANCHISE <br /> OPPORTUNITY
          </motion.h1>
          
          <motion.p variants={fadeUpVariant} className="lead text-white mb-5 mx-auto" style={{ maxWidth: '650px', fontSize: '1.1rem', opacity: 0.95 }}>
            Join the fastest-growing premium automotive wash network. Leverage our 100+ Stores Pan India network footprint to capture the booming B2C premium car care segment.
          </motion.p>
          
          <motion.div variants={fadeUpVariant} className="d-flex gap-3 justify-content-center flex-wrap">
            <button onClick={scrollToCalculator} className="btn btn-glow btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg text-decoration-none" style={{ cursor: 'pointer' }}>
              Interactive ROI Calculator
            </button>
            <a href="#inquiry" className="btn btn-outline-primary-custom btn-lg rounded-pill px-5 py-3 fw-bold text-decoration-none">
              Apply For Franchise
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS COUNTDOWN PANEL */}
      <section className="py-4 bg-secondary-custom border-bottom border-top" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container">
          <div className="row g-4 text-center">
            {statsCounterData.map((stat, index) => (
              <div className="col-md-3 col-6" key={index}>
                <div className="p-2">
                  <div className="fs-3 mb-1">{stat.icon}</div>
                  <h3 className="fw-bold mb-0 text-heading display-6" style={{ color: index === 0 ? 'var(--accent-color)' : 'var(--primary-color)' }}>
                    {stat.value}{stat.suffix}
                  </h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.72rem', letterSpacing: '1px' }}>{stat.label}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE BENEFITS */}
      <section className="py-5 bg-secondary-custom border-bottom" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
            <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
              PROFIT METRICS
            </span>
            <h2 className="display-5 fw-bold text-heading">WHY INVEST IN CLEANZ24?</h2>
            <p className="text-muted-custom">Our franchise ecosystem is engineered for rapid growth, automated billing, and premium service demand.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 p-4 premium-card text-center">
                <div className="card-icon-wrapper mx-auto mb-3" style={{ background: 'rgba(0, 201, 109, 0.08)', border: '1px solid rgba(0, 201, 109, 0.2)', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h4 className="fw-bold h5 text-heading mb-2">High Profit Margin</h4>
                <p className="text-muted-custom small mb-0">Up to 40% net operational profitability margins on express washes, vacuuming, and polish packages.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 p-4 premium-card text-center">
                <div className="card-icon-wrapper mx-auto mb-3" style={{ background: 'rgba(0, 201, 109, 0.08)', border: '1px solid rgba(0, 201, 109, 0.2)', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h4 className="fw-bold h5 text-heading mb-2">Fast Payback</h4>
                <p className="text-muted-custom small mb-0">Average investment return timeframe (ROI) ranges from 12 to 18 months based on site audit feasibility studies.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 p-4 premium-card text-center">
                <div className="card-icon-wrapper mx-auto mb-3" style={{ background: 'rgba(0, 201, 109, 0.08)', border: '1px solid rgba(0, 201, 109, 0.2)', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h4 className="fw-bold h5 text-heading mb-2">Direct Supply</h4>
                <p className="text-muted-custom small mb-0">Direct centralized supply of proprietary eco shampoos, active foam solutions, and premium wax sealants.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 p-4 premium-card text-center">
                <div className="card-icon-wrapper mx-auto mb-3" style={{ background: 'rgba(0, 201, 109, 0.08)', border: '1px solid rgba(0, 201, 109, 0.2)', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h4 className="fw-bold h5 text-heading mb-2">CRM Automation</h4>
                <p className="text-muted-custom small mb-0">Automated mobile application bookings, customer billing analytics, and targeted digital lead generation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED FRANCHISE MODELS */}
      <section id="models" className="py-5 bg-primary-custom">
        <div className="container py-5 text-center">
          <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
            STUDIO MODELS
          </span>
          <h2 className="display-5 fw-bold mb-3 text-heading">INVESTMENT MODELS</h2>
          <p className="text-muted-custom mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Choose from our pre-configured studio setups optimized for market density, spatial footprint, and resources.
          </p>

          <div className="row g-4">
            
            {/* Model 1: Express */}
            <div className="col-lg-4" id="franchise-model-express">
              <div className="card h-100 p-4 premium-card text-start">
                <h3 className="fw-bold h4 text-heading mb-1 text-gradient">Express</h3>
                <p className="text-muted-custom small mb-3">Designed for compact high-footfall spaces. Focuses on foam washing and express vacuuming.</p>
                
                <hr className="border-secondary my-2" style={{ opacity: 0.15 }} />
                
                <div className="mb-3">
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Investment:</div>
                    <div className="col-6 text-brand-primary fw-bold">₹10 - ₹12 Lacs</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Store Size:</div>
                    <div className="col-6 text-main">800 - 1000 sqft</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Manpower:</div>
                    <div className="col-6 text-main">2 - 3 Technicians</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Water Required:</div>
                    <div className="col-6 text-main">500 Ltr (Eco wash)</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Electricity:</div>
                    <div className="col-6 text-main">5 KW</div>
                  </div>
                </div>

                <h5 className="fw-bold text-heading small text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Included Setup & Tools:</h5>
                <ul className="package-service-list mb-4">
                  <li>1 Eco Optima Steam Cleaning Machine</li>
                  <li>2 Dual-Action Polishers (Shinemate/Rupes)</li>
                  <li>1 Heavy Duty Dry Vacuum Cleaner</li>
                  <li>Premium Microfiber cloth kit & basic compound compounds</li>
                  <li>Best for: High-density suburban startups</li>
                </ul>
                <button className="btn btn-outline-primary-custom w-100 py-3 mt-auto rounded-0" onClick={() => handleModelInquiry('Express', 'Express (₹10-12 Lacs)')}>Inquire Express</button>
              </div>
            </div>

            {/* Model 2: Premium */}
            <div className="col-lg-4" id="franchise-model-premium">
              <div className="card h-100 p-4 premium-card text-start highlighted">
                <h3 className="fw-bold h4 text-heading mb-1 text-gradient">Premium</h3>
                <p className="text-muted-custom small mb-3">Our standard studio setup. Handles deep cleaning wash, engine cleaning, and ceramic shield protection washes.</p>
                
                <hr className="border-secondary my-2" style={{ opacity: 0.15 }} />
                
                <div className="mb-3">
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Investment:</div>
                    <div className="col-6 text-brand-primary fw-bold">₹20 - ₹25 Lacs</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Store Size:</div>
                    <div className="col-6 text-main">1500 - 2000 sqft</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Manpower:</div>
                    <div className="col-6 text-main">4 - 5 Certified Wash Technicians</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Water Required:</div>
                    <div className="col-6 text-main">1200 Ltr</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Electricity:</div>
                    <div className="col-6 text-main">12 KW</div>
                  </div>
                </div>

                <h5 className="fw-bold text-heading small text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Included Setup & Tools:</h5>
                <ul className="package-service-list mb-4">
                  <li>1 Triplex High-Pressure Washer System</li>
                  <li>4 Professional Rotary / DA Polishers</li>
                  <li>1 Infrared Curing Lamp (3-Pod Module)</li>
                  <li>LED Hexagonal Lighting Grid</li>
                  <li>Upholstery Cleaner & Tornador Blow Gun</li>
                  <li>Best for: Major urban centers with premium demand</li>
                </ul>
                <button className="btn btn-glow w-100 py-3 mt-auto rounded-0" onClick={() => handleModelInquiry('Premium', 'Premium (₹20-25 Lacs)')}>Inquire Premium</button>
              </div>
            </div>

            {/* Model 3: Elite Mega */}
            <div className="col-lg-4" id="franchise-model-elite-mega">
              <div className="card h-100 p-4 premium-card text-start">
                <h3 className="fw-bold h4 text-heading mb-1 text-gradient">Elite Mega</h3>
                <p className="text-muted-custom small mb-3">Flagship mega washing workspace. Accommodates multiple high-speed washing tracks, deep cleaning bays, and a cafe lounge.</p>
                
                <hr className="border-secondary my-2" style={{ opacity: 0.15 }} />
                
                <div className="mb-3">
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Investment:</div>
                    <div className="col-6 text-brand-primary fw-bold">₹40+ Lacs</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Store Size:</div>
                    <div className="col-6 text-main">3000+ sqft</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Manpower:</div>
                    <div className="col-6 text-main">6 - 8 Wash & Polish Specialists</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Water Required:</div>
                    <div className="col-6 text-main">2000 Ltr (Recycled)</div>
                  </div>
                  <div className="row g-2 py-1 border-bottom border-secondary border-opacity-10 small">
                    <div className="col-6 fw-bold text-heading">Electricity:</div>
                    <div className="col-6 text-main">24 KW</div>
                  </div>
                </div>

                <h5 className="fw-bold text-heading small text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Included Setup & Tools:</h5>
                <ul className="package-service-list mb-4">
                  <li>2 High-Pressure Plunger Washers & Underbody Lance</li>
                  <li>6 Pro Polishers & Digital Paint Gauges</li>
                  <li>3 Mobile IR Curing Lamps (3-Pod & 6-Pod Tracks)</li>
                  <li>Dust-free AC dry & wax conditioning bays</li>
                  <li>Hydraulic scissor lift for coatings</li>
                  <li>Best for: Mega cities & luxury dealership tie-ups</li>
                </ul>
                <button className="btn btn-outline-primary-custom w-100 py-3 mt-auto rounded-0" onClick={() => handleModelInquiry('Elite Mega', 'Elite Mega (₹40+ Lacs)')}>Inquire Elite</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW: INTERACTIVE ROI PROJECTION CALCULATOR */}
      <section id="calculator" className="py-5 bg-secondary-custom border-top border-bottom" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
            <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
              REVENUE CALCULATOR
            </span>
            <h2 className="display-5 fw-bold text-heading">FINANCIAL PROJECTIONS</h2>
            <p className="text-muted-custom">Toggle between the franchise models below to calculate capital investment structure and projected return-on-investment parameters.</p>
          </div>

          <div className="roi-calculator mx-auto" style={{ maxWidth: '950px' }}>
            {/* Model Select Buttons */}
            <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
              {Object.keys(roiProjections).map((model) => (
                <button
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={`btn rounded-pill px-4 py-2 text-uppercase fw-bold small ${selectedModel === model ? 'btn-glow border border-success' : 'btn-outline-secondary text-white'}`}
                >
                  {model}
                </button>
              ))}
            </div>

            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                <h4 className="fw-bold text-heading mb-4 pb-2 border-bottom border-secondary border-opacity-10 d-flex justify-content-between">
                  <span>{selectedModel} Parameters</span>
                  <span className="text-brand-primary" style={{ fontSize: '0.85rem' }}>{roiProjections[selectedModel].margin} NET MARGIN</span>
                </h4>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between small fw-bold mb-2">
                    <span className="text-muted-custom">Initial Setup Investment</span>
                    <span className="text-white">{roiProjections[selectedModel].investment}</span>
                  </div>
                  <div className="progress bg-dark" style={{ height: '6px' }}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: selectedModel === 'Express' ? '30%' : selectedModel === 'Premium' ? '60%' : '100%' }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between small fw-bold mb-2">
                    <span className="text-muted-custom">Projected Monthly Revenue</span>
                    <span className="text-white">{roiProjections[selectedModel].monthlyRevenue}</span>
                  </div>
                  <div className="progress bg-dark" style={{ height: '6px' }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: selectedModel === 'Express' ? '30%' : selectedModel === 'Premium' ? '60%' : '100%' }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between small fw-bold mb-2">
                    <span className="text-muted-custom">Daily Intake Capacity</span>
                    <span className="text-white">{roiProjections[selectedModel].carsPerDay} Cars / Day</span>
                  </div>
                  <div className="progress bg-dark" style={{ height: '6px' }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: selectedModel === 'Express' ? '35%' : selectedModel === 'Premium' ? '60%' : '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="roi-result-card h-100">
                      <div className="small text-muted-custom mb-1 fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Projected Net Profit</div>
                      <div className="roi-result-value">{roiProjections[selectedModel].monthlyProfit}</div>
                      <div className="text-xs text-muted-custom mt-1" style={{ fontSize: '0.7rem' }}>Per Month</div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="roi-result-card h-100" style={{ borderColor: 'rgba(212, 175, 55, 0.25)', background: 'rgba(212, 175, 55, 0.05)' }}>
                      <div className="small text-muted-custom mb-1 fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Break-Even Period</div>
                      <div className="roi-result-value" style={{ color: 'var(--accent-color)' }}>{roiProjections[selectedModel].breakeven}</div>
                      <div className="text-xs text-muted-custom mt-1" style={{ fontSize: '0.7rem' }}>Avg. Site Audit</div>
                    </div>
                  </div>
                  
                  <div className="col-12 mt-3">
                    <div className="p-3 bg-primary-custom border border-secondary border-opacity-10 rounded text-start">
                      <h6 className="fw-bold text-heading small mb-2 d-flex align-items-center gap-2">
                        <span className="text-success">✔</span> PROPRIETARY AUTOMATED FLOWS
                      </h6>
                      <p className="text-muted-custom mb-0 small" style={{ fontSize: '0.78rem', lineHeight: '1.5' }}>
                        Operational numbers are optimized via our cloud CRM portal. Valet pickup routes, chemicals intake, and utility recycling protocols are automated to preserve the 40% margin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: FRANCHISE JOURNEY TIMELINE */}
      <section className="py-5 bg-primary-custom border-bottom">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
            <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
              THE TIMELINE
            </span>
            <h2 className="display-5 fw-bold text-heading">YOUR EXPANSION JOURNEY</h2>
            <p className="text-muted-custom">5 sequential stages to get your premium car detailing studio operational.</p>
          </div>

          <div className="franchise-timeline mx-auto mt-4" style={{ maxWidth: '1000px' }}>
            {/* Visual connected line */}
            <div 
              className="franchise-timeline-progress d-none d-md-block"
              style={{
                width: hoveredTimelineStep !== null ? `${(hoveredTimelineStep / 4) * 80}%` : '80%'
              }}
            />

            {franchiseJourneySteps.map((item, idx) => (
              <div 
                className={`timeline-step ${hoveredTimelineStep === idx || (hoveredTimelineStep === null) ? 'active' : ''}`}
                key={idx}
                onMouseEnter={() => setHoveredTimelineStep(idx)}
                onMouseLeave={() => setHoveredTimelineStep(null)}
              >
                <div className="timeline-step-icon">
                  {item.icon}
                </div>
                <h4 className="timeline-step-title">{item.title}</h4>
                <p className="timeline-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CLEANZ24 & PROPERTY REQUIREMENTS */}
      <section className="py-5 bg-secondary-custom border-top border-bottom" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          
          {/* Why Cleanz24 Wash Studio */}
          <div className="row g-5 mb-5 align-items-center">
            <div className="col-12">
              <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest text-center" style={{ letterSpacing: '3px' }}>
                THE BRAND ADVANTAGE
              </span>
              <h2 className="display-5 fw-bold text-center text-heading mb-5">
                WHY <span className="text-brand-primary">CLEANZ24 WASH STUDIO</span>?
              </h2>
              
              <div className="row g-4 text-start">
                <div className="col-md-4">
                  <div className="p-4 bg-primary-custom border border-secondary border-opacity-10 h-100" style={{ borderRadius: '12px' }}>
                    <h4 className="fw-bold h5 text-heading mb-3" style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '10px' }}>
                      The Lineage
                    </h4>
                    <p className="text-muted-custom small mb-0" style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                      Being the progeny of India's elite laundry and home care network, Cleanz24 Wash Studio is a high-end car care and washing studio. We bring decades of service experience, premium formulations, and state-of-the-art washing bay blueprints to form awe-inspiring results any car owner can be proud of.
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 bg-primary-custom border border-secondary border-opacity-10 h-100" style={{ borderRadius: '12px' }}>
                    <h4 className="fw-bold h5 text-heading mb-3" style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '10px' }}>
                      Obsession with Quality
                    </h4>
                    <p className="text-muted-custom small mb-0" style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                      We believe every vehicle needs to be treated with utmost care. Be it a Hatchback, a Sedan, an SUV, or a Luxury supercar, trust us for uncompromising and superior treatment. We bring you a wide range of car care products from the best global brands at the best car wash franchise cost.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-4 bg-primary-custom border border-secondary border-opacity-10 h-100" style={{ borderRadius: '12px' }}>
                    <h4 className="fw-bold h5 text-heading mb-3" style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '10px' }}>
                      The Experience
                    </h4>
                    <p className="text-muted-custom small mb-0" style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                      Blending experience with innovation and technology, our products and methods go beyond ultimate presentation and superior protection. In a competitive world, creating an ever-lasting impression is vital for building long-term business relationships, and that remains our core focus.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <hr className="my-5 border-secondary" style={{ opacity: 0.15 }} />

          {/* Property Requirements */}
          <div className="text-center mb-5">
            <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
              SITE AUDIT
            </span>
            <h2 className="display-5 fw-bold text-heading">PROPERTY REQUIREMENTS</h2>
            <p className="text-muted-custom">Minimum infrastructure specifications required to configure your car wash studio.</p>
          </div>

          <div className="row g-4">
            
            {/* Card 1: Space Requirement */}
            <div className="col-lg-3 col-sm-6">
              <div className="property-req-card">
                <div className="property-req-icon-wrapper">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="20" height="18" rx="2" />
                    <path d="M6 10h12v7H6z" />
                    <path d="M9 13h6" />
                    <path d="M12 10v7" />
                    <path d="M2 9h20" />
                    <path d="M12 21v-4" />
                  </svg>
                </div>
                <div className="property-req-details">
                  <h5 className="fw-bold mb-1">Space Requirement</h5>
                  <p className="mb-0">2000 Sq. Ft. Onwards With 12 Ft. Height</p>
                </div>
              </div>
            </div>

            {/* Card 2: Prime Location */}
            <div className="col-lg-3 col-sm-6">
              <div className="property-req-card">
                <div className="property-req-icon-wrapper">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M8 10h8" />
                  </svg>
                </div>
                <div className="property-req-details">
                  <h5 className="fw-bold mb-1">Prime Location</h5>
                  <p className="mb-0">Commercial or Semi-Commercial Ground Floor Space</p>
                </div>
              </div>
            </div>

            {/* Card 3: Front Fascia */}
            <div className="col-lg-3 col-sm-6">
              <div className="property-req-card">
                <div className="property-req-icon-wrapper">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 3h18v18H3z" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9h6v12" />
                    <circle cx="6" cy="6" r="1" />
                    <circle cx="18" cy="6" r="1" />
                  </svg>
                </div>
                <div className="property-req-details">
                  <h5 className="fw-bold mb-1">Front Fascia</h5>
                  <p className="mb-0">25 Feet Minimum Frontage Width</p>
                </div>
              </div>
            </div>

            {/* Card 4: Electricity */}
            <div className="col-lg-3 col-sm-6">
              <div className="property-req-card">
                <div className="property-req-icon-wrapper">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div className="property-req-details">
                  <h5 className="fw-bold mb-1">Electricity</h5>
                  <p className="mb-0">1 - 3 Phase Electricity Connection</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* NEW: FRANCHISE SUCCESS STORIES */}
      <section className="py-5 bg-primary-custom border-bottom">
        <div className="container py-5 text-center">
          <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
            INVESTOR SUCCESS
          </span>
          <h2 className="display-5 fw-bold text-heading mb-4">SUCCESS STORIES FROM THE PAN-INDIA NETWORK</h2>
          <p className="text-muted-custom mb-5 mx-auto" style={{ maxWidth: '650px' }}>
            Hear from our active franchise owners who leveraged our branding, CRM dashboard, and chemical lines to build profitable car spa centers.
          </p>

          <div className="d-flex justify-content-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => setSuccessStoryIndex(prev => Math.max(0, prev - 1))}
              disabled={successStoryIndex === 0}
              className="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '44px',
                height: '44px',
                padding: 0,
                opacity: successStoryIndex === 0 ? 0.3 : 1,
                cursor: successStoryIndex === 0 ? 'not-allowed' : 'pointer',
                border: '1.5px solid var(--primary-color)',
                color: 'var(--primary-color)',
                background: 'transparent',
                transition: 'all 0.2s ease',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
              onMouseEnter={(e) => { if (successStoryIndex !== 0) { e.currentTarget.style.background = 'var(--primary-color)'; e.currentTarget.style.color = '#000'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary-color)'; }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setSuccessStoryIndex(prev => Math.min(franchiseSuccessStories.length - successVisibleCards, prev + 1))}
              disabled={successStoryIndex >= franchiseSuccessStories.length - successVisibleCards}
              className="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '44px',
                height: '44px',
                padding: 0,
                opacity: successStoryIndex >= franchiseSuccessStories.length - successVisibleCards ? 0.3 : 1,
                cursor: successStoryIndex >= franchiseSuccessStories.length - successVisibleCards ? 'not-allowed' : 'pointer',
                border: '1.5px solid var(--primary-color)',
                color: 'var(--primary-color)',
                background: 'transparent',
                transition: 'all 0.2s ease',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
              onMouseEnter={(e) => { if (successStoryIndex < franchiseSuccessStories.length - successVisibleCards) { e.currentTarget.style.background = 'var(--primary-color)'; e.currentTarget.style.color = '#000'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary-color)'; }}
            >
              →
            </button>
          </div>

          <div style={{ overflow: 'hidden', width: '100%', padding: '10px 0' }}>
            <div
              style={{
                display: 'flex',
                gap: '24px',
                transform: `translateX(calc(-${successStoryIndex} * (100% + 24px) / ${successVisibleCards}))`,
                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                width: '100%'
              }}
            >
              {franchiseSuccessStories.map((story, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: `0 0 calc((100% - (${successVisibleCards} - 1) * 24px) / ${successVisibleCards})`,
                    width: `calc((100% - (${successVisibleCards} - 1) * 24px) / ${successVisibleCards})`
                  }}
                  className="text-start"
                >
                  <div className="success-story-card h-100 p-4 d-flex flex-column">
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="success-story-avatar">
                        {story.initials}
                      </div>
                      <div>
                        <h5 className="fw-bold text-heading mb-0 small">{story.name}</h5>
                        <div className="text-muted-custom text-xs" style={{ fontSize: '0.75rem' }}>{story.city}</div>
                        <span className="badge bg-success py-1 px-2 mt-1" style={{ fontSize: '0.65rem', fontWeight: 600 }}>✓ VERIFIED OWNER</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-custom italic small mb-4 flex-grow-1" style={{ lineHeight: '1.6', fontStyle: 'italic' }}>
                      "{story.quote}"
                    </p>

                    <div className="pt-3 border-top border-secondary border-opacity-10 d-flex justify-content-between align-items-center mt-auto">
                      <span className="small text-muted-custom fw-semibold">{story.model}</span>
                      <span className="fw-bold text-brand-primary" style={{ fontSize: '0.9rem' }}>{story.milestone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2 mt-4">
            {Array.from({ length: franchiseSuccessStories.length - successVisibleCards + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSuccessStoryIndex(idx)}
                style={{
                  width: successStoryIndex === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: successStoryIndex === idx ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  outline: 'none'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="inquiry" className="py-5 bg-secondary-custom border-top" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                GET STARTED
              </span>
              <h2 className="display-4 fw-bold mb-4 text-gradient">FRANCHISE INQUIRY FORM</h2>
              <p className="lead text-muted-custom mb-4">Complete the form details and our business development expansion managers will contact you within 24 hours with custom location analysis blueprints.</p>
              
              <div className="p-4 bg-primary-custom border border-secondary border-opacity-10 mb-4" style={{ borderRadius: '12px' }}>
                <h5 className="fw-bold text-heading mb-3">Comprehensive Launch Support:</h5>
                <ul className="list-unstyled mb-0 small text-muted-custom" style={{ lineHeight: '2' }}>
                  <li className="mb-2"><span className="text-brand-primary me-2">✔</span> Full workshop layout architecture designs</li>
                  <li className="mb-2"><span className="text-brand-primary me-2">✔</span> Technical training academy certification for wash technicians</li>
                  <li className="mb-2"><span className="text-brand-primary me-2">✔</span> Local brand launch campaigns & target digital lead streams</li>
                  <li><span className="text-brand-primary me-2">✔</span> Specialized chemical inventory & hardware setup packages</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card bg-primary-custom shadow-lg rounded-0 overflow-hidden" style={{ border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="card-title fw-bold mb-4 text-heading">Apply For Territory</h3>
                  
                  {formSubmitted ? (
                    <div className="text-center py-5">
                      <div className="display-1 text-success mb-3">
                        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h4 className="fw-bold text-heading mb-2">Application Received!</h4>
                      <p className="text-muted-custom">Thank you, {formData.name}. Our expansion representative will call you within 24 hours at <strong className="text-white">{countryCode} {formData.phone}</strong>.</p>
                      <div className="p-3 bg-secondary-custom rounded border border-success border-opacity-20 text-start mt-4 mb-3">
                        <small className="text-muted-custom">
                          Our location audit team has cataloged your requested territory: <strong>{formData.location}</strong>. We are checking slot availability and will email matching setup blueprints to <strong>{formData.email}</strong>.
                        </small>
                      </div>
                      <button className="btn btn-outline-primary-custom px-4 py-2 mt-3" onClick={handleResetForm}>Submit Another Inquiry</button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold small text-uppercase text-muted-custom">Full Name *</label>
                        <input 
                          type="text" 
                          className="form-control py-3 rounded-0" 
                          id="name" 
                          placeholder="Enter your name" 
                          required 
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label htmlFor="email" className="form-label fw-bold small text-uppercase text-muted-custom">Email Address *</label>
                          <input 
                            type="email" 
                            className={`form-control py-3 rounded-0${formErrors.email ? ' is-invalid' : ''}`} 
                            id="email" 
                            placeholder="Enter email" 
                            required 
                            value={formData.email}
                            onChange={(e) => { handleInputChange(e); setFormErrors(prev => ({ ...prev, email: '' })); }}
                          />
                          {formErrors.email && <div className="invalid-feedback d-block" style={{ fontSize: '0.78rem' }}>{formErrors.email}</div>}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="phone" className="form-label fw-bold small text-uppercase text-muted-custom">Phone Number *</label>
                          <div style={{ position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                width: '85px',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                color: '#cbd5e1',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                zIndex: 10,
                                cursor: 'pointer',
                                paddingLeft: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '4px'
                              }}
                            >
                              <span>{countryEmoji} {countryCode}</span>
                              <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>▼</span>
                            </button>
                            {dropdownOpen && (
                              <>
                                <div 
                                  onClick={() => setDropdownOpen(false)} 
                                  style={{
                                    position: 'fixed',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    zIndex: 99,
                                    background: 'transparent'
                                  }}
                                />
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    zIndex: 100,
                                    background: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                    width: '120px',
                                    maxHeight: '180px',
                                    overflowY: 'auto',
                                    marginTop: '4px'
                                  }}
                                >
                                  {countries.map((c, i) => (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        setCountryCode(c.code);
                                        setCountryEmoji(c.emoji);
                                        setDropdownOpen(false);
                                      }}
                                      style={{
                                        padding: '8px 12px',
                                        fontSize: '0.9rem',
                                        color: '#cbd5e1',
                                        cursor: 'pointer',
                                        background: countryCode === c.code && countryEmoji === c.emoji ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'background 0.2s'
                                      }}
                                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                      onMouseLeave={(e) => { e.currentTarget.style.background = countryCode === c.code && countryEmoji === c.emoji ? 'rgba(255,255,255,0.1)' : 'transparent'; }}
                                    >
                                      <span>{c.emoji}</span>
                                      <span>{c.code}</span>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                            <input 
                              type="tel" 
                              className={`form-control py-3 rounded-0${formErrors.phone ? ' is-invalid' : ''}`} 
                              id="phone" 
                              placeholder="Enter phone number" 
                              required 
                              value={formData.phone}
                              onChange={(e) => { handleInputChange(e); setFormErrors(prev => ({ ...prev, phone: '' })); }}
                              style={{ paddingLeft: '92px' }}
                            />
                          </div>
                          {formErrors.phone && <div className="invalid-feedback d-block" style={{ fontSize: '0.78rem' }}>{formErrors.phone}</div>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="location" className="form-label fw-bold small text-uppercase text-muted-custom">Proposed Location (City/State) *</label>
                        <input 
                          type="text" 
                          className="form-control py-3 rounded-0" 
                          id="location" 
                          placeholder="e.g. Bangalore, Karnataka" 
                          required 
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="budget" className="form-label fw-bold small text-uppercase text-muted-custom">Investment Budget tier *</label>
                        <select 
                          className="form-control py-3 rounded-0" 
                          id="budget" 
                          value={formData.budget}
                          onChange={handleInputChange}
                        >
                          <option>Express (₹10-12 Lacs)</option>
                          <option>Premium (₹20-25 Lacs)</option>
                          <option>Elite Mega (₹40+ Lacs)</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="message" className="form-label fw-bold small text-uppercase text-muted-custom">Message Details</label>
                        <textarea 
                          className="form-control rounded-0" 
                          id="message" 
                          rows="3" 
                          placeholder="Tell us about your business background or space details (optional)"
                          value={formData.message}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      <div className="d-grid gap-2">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg rounded-0 fw-bold btn-glow py-3"
                          disabled={isSubmitting}
                          style={{
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.7 : 1
                          }}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Franchise Request'}
                        </button>
                        <div className="text-center text-muted-custom small my-1">OR</div>
                        <a 
                          href={`https://wa.me/919138004800?text=Hi,%20I'm%20interested%20in%20a%20Cleanz24%20Wash%20Studio%20Franchise%20model.%20Please%20send%20details.`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-outline-success btn-lg rounded-0 fw-bold py-3 d-flex align-items-center justify-content-center gap-2"
                        >
                          <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
                            <path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16c0 2.4.6 4.7 1.8 6.7L2.5 29.5l7-1.8c2 .1 4.1 1.8 6.5 1.8 7.5 0 13.5-6 13.5-13.5S23.5 2.5 16 2.5zm0 22.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4C5.5 18.2 5 16.1 5 14c0-6.1 5-11 11-11s11 4.9 11 11-4.9 11-11 11zm6-7.8c-.3-.2-2-.1-2.3-.8-.3-.7-.3-1.3-.4-1.4-.2-.2-.5-.2-.8 0-.3.3-1.3 1.3-1.5 1.5-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-1-1-1.3-1.3-1.5-1.5-.2-.2 0-.3.1-.4.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.4-1-.5-1.4-.1-.4-.2-.3-.3-.3h-.3c-.1 0-.3 0-.5.2-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4 1.7.8 2.3.9 3.1.8.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.6-.4z" />
                          </svg>
                          Quick Inquiry via WhatsApp
                        </a>
                      </div>

                      <div className="d-flex justify-content-center gap-3 mt-4 text-muted-custom text-center" style={{ fontSize: '0.75rem' }}>
                        <span>🔒 SSL Secured</span>
                        <span>•</span>
                        <span>🛡️ Zero Hidden Costs</span>
                        <span>•</span>
                        <span>📝 Free Layout Plan</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
    </div>
  );
}

export default Franchise;
