import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { faqsData, storesData } from '../../data';
import SEOMeta from '../../components/SEOMeta';
import '../../styles/carSpa.css';
import { GOOGLE_SHEETS_CAR_SPA_SCRIPT_URL } from '../../config';
import carwashingTransparent from '../../assets/carwashing_transparent.png';

function Book(props) {
  const context = useOutletContext() || {};
  const isDarkMode = props.isDarkMode ?? context.isDarkMode ?? true;
  const toggleTheme = props.toggleTheme ?? context.toggleTheme;
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const packageQuery = queryParams.get('package');
  
  const defaultServices = [
    'CRYSTAL SHIELD',
    'VELVET TOUCH',
    'PEARL RADIANCE',
    'PLATINUM REVIVAL'
  ];

  // Find matching service case-insensitively
  const matchedService = defaultServices.find(
    s => s.toLowerCase() === packageQuery?.toLowerCase()
  ) || 'CRYSTAL SHIELD';

  const [memberData] = useState(() => {
    try {
      const saved = localStorage.getItem('cleanz24_logged_in_member');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [vehicleClass, setVehicleClass] = useState('sedan');

  // Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: memberData?.name || '',
    mobile: memberData?.mobile || '',
    service: matchedService,
    date: '',
    time: '',
    address: ''
  });

  // Form validation errors state
  const [formErrors, setFormErrors] = useState({});

  const validateField = (id, value) => {
    const errors = { ...formErrors };

    if (id === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '');
      if (value && (digitsOnly.length < 7 || digitsOnly.length > 15)) {
        errors.mobile = 'Please enter a valid mobile number';
      } else {
        delete errors.mobile;
      }
    }

    if (id === 'name') {
      if (value && value.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      } else {
        delete errors.name;
      }
    }

    if (id === 'time') {
      if (value) {
        const [hours, minutes] = value.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const minMinutes = 9 * 60;   // 9:00 AM
        const maxMinutes = 18 * 60;  // 6:00 PM
        if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
          errors.time = 'Preferred time must be between 9:00 AM and 6:00 PM';
        } else {
          delete errors.time;
        }
      } else {
        delete errors.time;
      }
    }

    setFormErrors(errors);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  const handleResetForm = () => {
    setFormData({
      name: memberData?.name || '',
      mobile: memberData?.mobile || '',
      service: matchedService,
      date: '',
      time: '',
      address: ''
    });
    setVehicleClass('sedan');
    setFormErrors({});
    setFormSubmitted(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submit
    const errors = {};
    const mobileDigits = formData.mobile.replace(/\D/g, '');
    if (mobileDigits.length < 7 || mobileDigits.length > 15) {
      errors.mobile = 'Please enter a valid mobile number';
    }
    if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (formData.time) {
      const [hours, minutes] = formData.time.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      const minMinutes = 9 * 60;
      const maxMinutes = 18 * 60;
      if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
        errors.time = 'Preferred time must be between 9:00 AM and 6:00 PM';
      }
    } else {
      errors.time = 'Preferred time is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    try {
      const payload = {
        timestamp: new Date().toISOString().split('T')[0],
        name: formData.name,
        mobile: formData.mobile,
        service: `${formData.service} (${vehicleClass.toUpperCase()})`,
        date: formData.date || 'N/A',
        time: formData.time || 'N/A',
        address: formData.address,
        type: 'Car Wash Booking',
        source: 'Car Spa',
        price: selectedPriceInfo.current,
        isMember: selectedPriceInfo.isMember
      };

      await fetch('https://script.google.com/macros/s/AKfycbx_JufRZRE54mcOfK2ph-Kdz3o0Nn-s7xhyPdbUoApuiFns_v-8JTY4LbjpZ_JAdlSY/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Error submitting booking:', err);
    } finally {
      setFormSubmitted(true);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Filter stores based on search query
  const filteredStores = storesData.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const washPrices = {
    'CRYSTAL SHIELD': {
      'hatchback': { regular: 750, member: 500 },
      'sedan': { regular: 800, member: 550 },
      'suv & luxury': { regular: 850, member: 600 }
    },
    'VELVET TOUCH': {
      'hatchback': { regular: 1800, member: 1500 },
      'sedan': { regular: 2200, member: 1800 },
      'suv & luxury': { regular: 2500, member: 2000 }
    },
    'PEARL RADIANCE': {
      'hatchback': { regular: 2400, member: 1800 },
      'sedan': { regular: 2800, member: 2000 },
      'suv & luxury': { regular: 3000, member: 2200 }
    },
    'PLATINUM REVIVAL': {
      'hatchback': { regular: 3800, member: 3000 },
      'sedan': { regular: 4300, member: 3200 },
      'suv & luxury': { regular: 4800, member: 3400 }
    }
  };

  const getPackagePrice = (serviceName) => {
    const servicePrices = washPrices[serviceName] || washPrices['CRYSTAL SHIELD'];
    const classPrices = servicePrices[vehicleClass] || servicePrices['sedan'];
    const isMember = !!memberData;

    return {
      original: classPrices.regular,
      current: isMember ? classPrices.member : classPrices.regular,
      isMember: isMember
    };
  };

  const selectedPriceInfo = getPackagePrice(formData.service);

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      <SEOMeta
        title="Book Online Car Spa & Detailing Service"
        description="Book your premium car spa, foam wash, or detailing package online. Choose your service, find your nearest Cleanz24 store, and schedule your appointment today."
        keywords="book car wash online, car detailing booking, ceramic coating appointment, Cleanz24 booking"
      />
      
      {/* NAVBAR */}
      {/* CINEMATIC HERO SECTION */}
      <section className="hero-section position-relative text-center overflow-hidden" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
        {/* Animated Gradient Mesh Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(0,10,5,1) 0%, rgba(0,30,15,1) 25%, rgba(0,50,25,1) 50%, rgba(0,20,10,1) 75%, rgba(0,10,5,1) 100%)',
            zIndex: 0
          }}
        />
        {/* Emerald Glow Orb */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '15%',
            width: '40vw',
            height: '40vw',
            background: 'radial-gradient(circle, rgba(0,201,109,0.15) 0%, transparent 70%)',
            zIndex: 0,
            pointerEvents: 'none',
            animation: 'pulse 4s ease-in-out infinite alternate'
          }}
        />
        {/* Gold Accent Orb */}
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '35vw',
            height: '35vw',
            background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
            zIndex: 0,
            pointerEvents: 'none',
            animation: 'pulse 5s ease-in-out infinite alternate-reverse'
          }}
        />
        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
            PREMIUM CAR SPA EXPERIENCE
          </motion.span>
          <motion.h1 variants={fadeUpVariant} className="display-1 fw-black mb-4 text-gradient" style={{ lineHeight: '1.1', fontWeight: 900 }}>
            BOOK YOUR <br /> APPOINTMENT
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="lead text-white mb-5 mx-auto" style={{ maxWidth: '650px', fontSize: '1.1rem', opacity: 0.95 }}>
            Premium Car Spa Experience — Doorstep Service Available
          </motion.p>
          <motion.div variants={fadeUpVariant} className="d-flex gap-3 justify-content-center flex-wrap">
            <a href="#book" className="btn btn-glow btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg text-decoration-none">
              Reserve Your Slot
            </a>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.dispatchEvent(new Event('open-packages-dropdown'));
              }}
              className="btn btn-outline-primary-custom btn-lg rounded-pill px-5 py-3 fw-bold text-decoration-none"
            >
              View Pricing Matrix
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* CONVERTING LEAD FORM CARD */}
      <section id="book" className="py-5 bg-primary-custom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <motion.div className="col-lg-6" initial="hidden" animate="visible" variants={fadeUpVariant}>
              <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                RESERVE A SLOT
              </span>
              <h1 className="display-4 fw-bold mb-4 text-gradient">READY FOR THE ULTIMATE SHINE?</h1>
              
              <div className="row text-center mb-1 g-3 bg-secondary-custom rounded-0 py-4 mx-0 shadow-sm" style={{ border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                <div className="col-4 border-end" style={{ borderColor: 'var(--card-border)' }}>
                  <h3 className="fw-bold mb-0 text-brand-primary">70+</h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.75rem' }}>Wash Bays</small>
                </div>
                <div className="col-4 border-end" style={{ borderColor: 'var(--card-border)' }}>
                  <h3 className="fw-bold mb-0 text-brand-primary">43</h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.75rem' }}>Major Cities</small>
                </div>
                <div className="col-4">
                  <h3 className="fw-bold mb-0 text-brand-primary">21</h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.75rem' }}>States</small>
                </div>
              </div>

              {/* Car Washing Image */}
              <div className="d-flex justify-content-center mt-0 mb-4">
                <img
                  src={carwashingTransparent}
                  alt="Car Wash Detailing"
                  className="img-fluid"
                  style={{ width: '100%', maxWidth: '380px', height: 'auto' }}
                />
              </div>

              <div className="custom-faq-wrapper mt-4">
                <h4 className="fw-bold mb-4 text-heading">FREQUENTLY ASKED QUESTIONS</h4>
                {faqsData.map((item, index) => {
                  const isDropdownOpen = openFaqIndex === index;
                  return (
                    <div className="faq-dropdown-item py-3" key={index}>
                      <div className="faq-dropdown-header d-flex align-items-center" onClick={() => toggleFaq(index)} style={{ cursor: 'pointer' }}>
                        <span className={`faq-arrow-icon ${isDropdownOpen ? 'arrow-rotated' : ''}`}>›</span>
                        <h3 className="fw-bold text-heading h6 mb-0 text-start">{item.q}</h3>
                      </div>
                      <div className={`faq-dropdown-body ${isDropdownOpen ? 'body-open' : ''}`}>
                        <div className="text-muted-custom ps-4 text-sm mt-2 text-start">{item.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div className="col-lg-6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="card bg-secondary-custom shadow-lg rounded-0 overflow-hidden" style={{ border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                <div className="card-body p-4 p-md-5 position-relative">
                  <div className="position-absolute top-0 end-0 p-3 opacity-25" style={{ fontSize: '4rem', pointerEvents: 'none' }}>📅</div>
                  <h3 className="card-title fw-bold mb-2 text-heading position-relative z-1">Schedule Car Wash</h3>
                  <p className="card-text text-muted-custom small mb-4 position-relative z-1">Complimentary safe pickup and transit drop operations valid across all registered stores.</p>
                  
                  {formSubmitted ? (
                    <div className="text-center py-5 position-relative z-1">
                      <div className="display-1 text-success mb-3">
                        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h4 className="fw-bold text-heading mb-2">Booking Confirmed!</h4>
                      <p className="text-muted-custom">Thank you, {formData.name}. Our concierge representative will contact you shortly to coordinate slot timing.</p>
                      
                      <div className="p-3 bg-primary-custom rounded border border-success border-opacity-20 text-start mt-4 mb-3">
                        <small className="text-muted-custom">
                          Selected Package: <strong>{formData.service}</strong><br />
                          Price: <strong>₹{selectedPriceInfo.current.toLocaleString('en-IN')}</strong><br />
                          Contact Number: <strong>{formData.mobile}</strong><br />
                          Preferred Time: <strong>{formData.date} at {formData.time}</strong><br />
                          Address: <strong>{formData.address}</strong>
                        </small>
                      </div>
                      
                      <button className="btn btn-outline-primary-custom px-4 py-2 mt-3" onClick={handleResetForm}>Schedule Another Appointment</button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="position-relative z-1" noValidate>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold small text-uppercase text-muted-custom">Full Name *</label>
                        <input 
                          type="text" 
                          className={`form-control py-3 rounded-0 ${formErrors.name ? 'border-danger' : ''}`}
                          id="name" 
                          placeholder="Enter your name" 
                          required 
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        {formErrors.name && (
                          <small className="d-block mt-1" style={{ color: '#ff4d4d', fontSize: '0.78rem' }}>{formErrors.name}</small>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="mobile" className="form-label fw-bold small text-uppercase text-muted-custom">Mobile Number *</label>
                        <input 
                          type="tel" 
                          className={`form-control py-3 rounded-0 ${formErrors.mobile ? 'border-danger' : ''}`}
                          id="mobile" 
                          placeholder="Enter mobile number" 
                          required 
                          value={formData.mobile}
                          onChange={handleInputChange}
                          maxLength={15}
                        />
                        {formErrors.mobile && (
                          <small className="d-block mt-1" style={{ color: '#ff4d4d', fontSize: '0.78rem' }}>{formErrors.mobile}</small>
                        )}
                      </div>

                       <div className="mb-3">
                        <label htmlFor="vehicleClass" className="form-label fw-bold small text-uppercase text-muted-custom">Vehicle Category *</label>
                        <select 
                          className="form-control py-3 rounded-0" 
                          id="vehicleClass" 
                          value={vehicleClass}
                          onChange={(e) => setVehicleClass(e.target.value)}
                        >
                          <option value="hatchback">Hatchback</option>
                          <option value="sedan">Sedan</option>
                          <option value="suv & luxury">SUV & Luxury</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="service" className="form-label fw-bold small text-uppercase text-muted-custom">Service Package *</label>
                        <div className="d-flex align-items-center gap-3">
                          <select 
                            className="form-control py-3 rounded-0 flex-grow-1" 
                            id="service" 
                            value={formData.service}
                            onChange={handleInputChange}
                          >
                            <option>CRYSTAL SHIELD</option>
                            <option>VELVET TOUCH</option>
                            <option>PEARL RADIANCE</option>
                            <option>PLATINUM REVIVAL</option>
                          </select>
                          <div className="price-circle-badge d-flex flex-column align-items-center justify-content-center text-center rounded-circle border" 
                               style={{ 
                                 width: '85px', 
                                 height: '85px', 
                                 background: 'rgba(0, 201, 109, 0.1)', 
                                 borderColor: 'var(--accent-color)', 
                                 minWidth: '85px',
                                 boxShadow: '0 0 15px rgba(0, 201, 109, 0.2)',
                                 lineHeight: '1.2',
                                 color: '#fff'
                               }}>
                            {selectedPriceInfo.isMember ? (
                              <>
                                <span className="text-muted text-decoration-line-through" style={{ fontSize: '0.7rem', opacity: 0.6 }}>
                                  ₹{selectedPriceInfo.original.toLocaleString('en-IN')}
                                </span>
                                <span className="text-brand-primary fw-black" style={{ fontSize: '0.95rem', fontWeight: 900, color: '#00C96D' }}>
                                  ₹{selectedPriceInfo.current.toLocaleString('en-IN')}
                                </span>
                                <span className="badge bg-success py-0 px-1 rounded-pill" style={{ fontSize: '0.55rem', marginTop: '2px' }}>
                                  MEMBER
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-muted-custom small" style={{ fontSize: '0.65rem' }}>Price</span>
                                <span className="text-brand-primary fw-black" style={{ fontSize: '1rem', fontWeight: 900, color: '#00C96D' }}>
                                  ₹{selectedPriceInfo.current.toLocaleString('en-IN')}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label htmlFor="date" className="form-label fw-bold small text-uppercase text-muted-custom">Preferred Date *</label>
                          <input 
                            type="date" 
                            className="form-control py-3 rounded-0 text-white" 
                            id="date" 
                            required 
                            value={formData.date}
                            onChange={handleInputChange}
                            style={{ colorScheme: 'dark' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="time" className="form-label fw-bold small text-uppercase text-muted-custom">Preferred Time * (9 AM - 6 PM)</label>
                          <input 
                            type="time" 
                            className={`form-control py-3 rounded-0 text-white ${formErrors.time ? 'border-danger' : ''}`}
                            id="time" 
                            required 
                            min="09:00"
                            max="18:00"
                            value={formData.time}
                            onChange={handleInputChange}
                            style={{ colorScheme: 'dark' }}
                          />
                          {formErrors.time && (
                            <small className="d-block mt-1" style={{ color: '#ff4d4d', fontSize: '0.78rem' }}>{formErrors.time}</small>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="address" className="form-label fw-bold small text-uppercase text-muted-custom">Pickup & Delivery Address *</label>
                        <textarea 
                          className="form-control rounded-0" 
                          id="address" 
                          rows="3" 
                          placeholder="Enter location details for valet transit" 
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 fw-bold btn-glow py-3">Submit Wash Booking</button>
                        <div className="text-center text-muted-custom small my-1">OR</div>
                        <a 
                          href={`https://wa.me/919138004800?text=Hi,%20I'd%20like%20to%20schedule%20a%20car%20detailing%20appointment.%20Please%20send%20available%20slots.`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-outline-success btn-lg rounded-0 fw-bold py-3 d-flex align-items-center justify-content-center gap-2"
                        >
                          <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
                            <path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16c0 2.4.6 4.7 1.8 6.7L2.5 29.5l7-1.8c2 .1 4.1 1.8 6.5 1.8 7.5 0 13.5-6 13.5-13.5S23.5 2.5 16 2.5zm0 22.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4C5.5 18.2 5 16.1 5 14c0-6.1 5-11 11-11s11 4.9 11 11-4.9 11-11 11zm6-7.8c-.3-.2-2-.1-2.3-.8-.3-.7-.3-1.3-.4-1.4-.2-.2-.5-.2-.8 0-.3.3-1.3 1.3-1.5 1.5-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-1-1-1.3-1.3-1.5-1.5-.2-.2 0-.3.1-.4.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.4-1-.5-1.4-.1-.4-.2-.3-.3-.3h-.3c-.1 0-.3 0-.5.2-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4 1.7.8 2.3.9 3.1.8.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.6-.4z" />
                          </svg>
                          Book via WhatsApp
                        </a>
                      </div>

                      <div className="d-flex justify-content-center gap-3 mt-4 text-muted-custom text-center" style={{ fontSize: '0.72rem' }}>
                        <span>🔒 SSL Secure</span>
                        <span>•</span>
                        <span>🚛 Free Pickup & Delivery</span>
                        <span>•</span>
                        <span>🛡️ Insured Transit</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORES LOCATOR SECTION */}
      <section id="stores" className="py-5 bg-secondary-custom position-relative border-top" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5 text-center">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '2px' }}>
            FIND STORES
          </motion.span>
          <h2 className="display-5 fw-bold text-heading mb-4 text-gradient">
            CLEANZ24 STORES NEAR YOU
          </h2>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="store-search-container mb-5">
            <input 
              type="text" 
              className="form-control store-search-input py-3" 
              placeholder="Search By State/Pincode/Locality" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-glow rounded-0 px-4 fw-bold text-uppercase" onClick={() => setSearchQuery('Bangalore')}>
              BANGALORE
            </button>
          </motion.div>

          <motion.div className="row g-4 justify-content-center mb-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <motion.div className="col-lg-4 col-md-6" key={store.id} variants={fadeUpVariant}>
                  <div className="premium-card store-card h-100 text-start">
                    <h4 className="text-heading fw-bold mb-2">{store.name}</h4>
                    <p className="store-address text-muted-custom small mb-4">{store.address}</p>
                    <div className="google-rating d-flex align-items-center mb-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="google-icon me-2" style={{ width: '18px' }} />
                      <span className="text-muted-custom text-xs font-normal">Google Rating</span>
                      <div className="ms-auto text-heading fw-semibold">
                        {store.rating} <span className="stars text-warning">★★★★★</span> ({store.reviews})
                      </div>
                    </div>
                    <div className="store-btn-grid d-flex flex-wrap gap-2">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`} target="_blank" rel="noreferrer" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">Directions</a>
                      <Link to="/car-spa/services" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">Check Pricing</Link>
                      <a href="tel:+919138004800" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">Call Now</a>
                      <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">WhatsApp</a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-12 py-4">
                <p className="text-muted-custom">No detailing stores found matching your search.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
    </div>
  );
}

export default Book;
