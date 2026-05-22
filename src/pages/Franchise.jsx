import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpeg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import lastVideo from '../assets/last_video.mp4';
import '../App.css';

function Franchise({ isDarkMode, toggleTheme }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    budget: 'Premium Studio (₹20-25 Lacs)',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      
      {/* 1. GLOBAL HEADER */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* 2. HERO SECTION */}
      <section className="hero-section position-relative text-center overflow-hidden d-flex flex-column justify-content-center" style={{ height: '100vh', backgroundImage: 'none', backgroundColor: '#000' }}>
        {/* Cinematic Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
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
          <source src={lastVideo} type="video/mp4" />
        </video>

        {/* Global Dark Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 1
          }}
        />

        <motion.div
          className="container mt-5 position-relative z-2"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeUpVariant} className="text-uppercase tracking-widest text-brand-primary fw-bold small mb-3 d-block" style={{ letterSpacing: '4px' }}>
            PARTNER WITH INDIA'S ELITE
          </motion.span>
          <motion.h1 variants={fadeUpVariant} className="display-2 fw-black mb-4 text-gradient" style={{ lineHeight: '1.1', fontWeight: 900 }}>
            CLEANZ24 FRANCHISE <br /> OPPORTUNITY
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="lead text-white mb-5 mx-auto" style={{ maxWidth: '650px', fontSize: '1.15rem' }}>
            Join the fastest-growing premium automotive wash network. Invest in a high-return, technology-driven washing studio model.
          </motion.p>
          <motion.div variants={fadeUpVariant}>
            <a href="#models" className="btn btn-glow btn-lg rounded-0 px-5 py-3 fw-bold shadow-lg">
              Explore Investment Models
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. CORE BENEFITS */}
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
                <div className="card-icon-wrapper mx-auto">📈</div>
                <h4 className="fw-bold h5 text-heading mb-2">High Profit Margin</h4>
                <p className="text-muted-custom small mb-0">Up to 40% net operational profitability margins on express washes, vacuuming, and polish packages.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 p-4 premium-card text-center">
                <div className="card-icon-wrapper mx-auto">⏳</div>
                <h4 className="fw-bold h5 text-heading mb-2">Fast Payback</h4>
                <p className="text-muted-custom small mb-0">Average investment return timeframe (ROI) ranges from 12 to 18 months based on site audits.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 p-4 premium-card text-center">
                <div className="card-icon-wrapper mx-auto">📦</div>
                <h4 className="fw-bold h5 text-heading mb-2">Direct Supply</h4>
                <p className="text-muted-custom small mb-0">Direct supply of proprietary eco shampoos, active foam solutions, and premium wax sealants.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 p-4 premium-card text-center">
                <div className="card-icon-wrapper mx-auto">💻</div>
                <h4 className="fw-bold h5 text-heading mb-2">CRM Automation</h4>
                <p className="text-muted-custom small mb-0">Automated mobile application bookings, billing analytics, and targeted lead generation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DETAILED FRANCHISE MODELS */}
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
            
            {/* Model 1: Express Hub */}
            <div className="col-lg-4">
              <div className="card h-100 p-4 premium-card text-start">
                <h3 className="fw-bold h4 text-heading mb-1 text-gradient">Express Hub</h3>
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
                <a href="#inquiry" className="btn btn-outline-primary-custom w-100 py-3 mt-auto">Inquire Express</a>
              </div>
            </div>

            {/* Model 2: Premium Studio */}
            <div className="col-lg-4">
              <div className="card h-100 p-4 premium-card text-start highlighted">
                <h3 className="fw-bold h4 text-heading mb-1 text-gradient">Premium Studio</h3>
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
                <a href="#inquiry" className="btn btn-glow w-100 py-3 mt-auto">Inquire Premium</a>
              </div>
            </div>

            {/* Model 3: Elite Mega Hub */}
            <div className="col-lg-4">
              <div className="card h-100 p-4 premium-card text-start">
                <h3 className="fw-bold h4 text-heading mb-1 text-gradient">Elite Mega Hub</h3>
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
                <a href="#inquiry" className="btn btn-outline-primary-custom w-100 py-3 mt-auto">Inquire Elite</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW: WHY CLEANZ24 & PROPERTY REQUIREMENTS */}
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
                  <div className="p-4 bg-primary-custom border border-secondary border-opacity-10 h-100">
                    <h4 className="fw-bold h5 text-heading mb-3" style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '10px' }}>
                      The Lineage
                    </h4>
                    <p className="text-muted-custom small mb-0" style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                      Being the progeny of India's elite laundry and home care network, Cleanz24 Wash Studio is a high-end car care and washing studio. We bring decades of service experience, premium formulations, and state-of-the-art washing bay blueprints to form awe-inspiring results any car owner can be proud of.
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="p-4 bg-primary-custom border border-secondary border-opacity-10 h-100">
                    <h4 className="fw-bold h5 text-heading mb-3" style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '10px' }}>
                      Our Obsession with Quality
                    </h4>
                    <p className="text-muted-custom small mb-0" style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                      We believe every vehicle needs to be treated with utmost care. Be it a Hatchback, a Sedan, an SUV, or a Luxury supercar, trust us for uncompromising and superior treatment. We bring you a wide range of car care products from the best global brands at the best car wash franchise cost.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-4 bg-primary-custom border border-secondary border-opacity-10 h-100">
                    <h4 className="fw-bold h5 text-heading mb-3" style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '10px' }}>
                      The Experience
                    </h4>
                    <p className="text-muted-custom small mb-0" style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                      Blending experience with innovation and technology, our products and methods go beyond ultimate presentation and superior protection. In a competitive world, creating a never-lasting impression is vital for building long-term business relationships, and that remains our core focus.
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
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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

      {/* 5. INQUIRY FORM */}
      <section id="inquiry" className="py-5 bg-secondary-custom border-top" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                GET STARTED
              </span>
              <h2 className="display-4 fw-bold mb-4 text-gradient">FRANCHISE INQUIRY FORM</h2>
              <p className="lead text-muted-custom mb-4">Complete the form details and our business development expansion managers will contact you within 24 hours with custom location analysis blueprints.</p>
              
              <div className="p-4 bg-primary-custom border border-secondary mb-4">
                <h5 className="fw-bold text-heading mb-3">Support We Provide:</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">🛠️ Full workshop layout architecture designs</li>
                  <li className="mb-2">🎓 Technical training academy for washing technicians</li>
                  <li className="mb-2">📣 Brand launches & digital marketing leads</li>
                  <li>📦 Chemical inventory & hardware tools setups</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card bg-primary-custom shadow-sm rounded-0 overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="card-title fw-bold mb-4 text-heading">Franchise Request</h3>
                  
                  {formSubmitted ? (
                    <div className="text-center py-5">
                      <div className="display-1 text-success mb-3">✓</div>
                      <h4 className="fw-bold text-heading mb-2">Application Received!</h4>
                      <p className="text-muted-custom">Thank you, {formData.name}. Our expansion representative will call you shortly at {formData.phone}.</p>
                      <button className="btn btn-outline-primary-custom px-4 py-2 mt-3" onClick={() => setFormSubmitted(false)}>Submit Another Inquiry</button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold small text-uppercase text-muted-custom">Full Name *</label>
                        <input 
                          type="text" 
                          className="form-control py-3" 
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
                            className="form-control py-3" 
                            id="email" 
                            placeholder="Enter email" 
                            required 
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="phone" className="form-label fw-bold small text-uppercase text-muted-custom">Phone Number *</label>
                          <input 
                            type="tel" 
                            className="form-control py-3" 
                            id="phone" 
                            placeholder="Enter phone contact" 
                            required 
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="location" className="form-label fw-bold small text-uppercase text-muted-custom">Proposed Location (City/State) *</label>
                        <input 
                          type="text" 
                          className="form-control py-3" 
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
                          className="form-control py-3" 
                          id="budget" 
                          value={formData.budget}
                          onChange={handleInputChange}
                        >
                          <option>Express Hub (₹10-12 Lacs)</option>
                          <option>Premium Studio (₹20-25 Lacs)</option>
                          <option>Elite Mega Hub (₹40+ Lacs)</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="message" className="form-label fw-bold small text-uppercase text-muted-custom">Message Details</label>
                        <textarea 
                          className="form-control" 
                          id="message" 
                          rows="3" 
                          placeholder="Tell us about your business background or space details (optional)"
                          value={formData.message}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 fw-bold btn-glow py-3">Submit Franchise Request</button>
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
      <Footer />

    </div>
  );
}

export default Franchise;
