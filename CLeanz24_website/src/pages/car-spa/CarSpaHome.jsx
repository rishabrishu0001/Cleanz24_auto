import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  testimonialsData, 
  faqsData, 
  storesData,
  pricingPackagesData
} from '../../data';
import { handleSmoothScroll } from '../../utils';
import beforeDetailingImg from '../../assets/before_detailing.png';
import afterDetailingImg from '../../assets/after_detailing.png';
import cleanz24Technicians from '../../assets/cleanz24_technicians.jpg';
import neonCarRender from '../../assets/neon_car_render.png';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/carSpa.css';
import SEOMeta from '../../components/SEOMeta';
import { Player } from '@lottiefiles/react-lottie-player';
import { API_URL } from '../../config';

// 1. BEFORE/AFTER SLIDER COMPONENT
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX, rect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <div 
      className="slider-container"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      style={{ cursor: 'ew-resize' }}
    >
      {/* Before Image */}
      <div 
        className="slider-image-before"
        style={{ backgroundImage: `url(${beforeDetailingImg})` }}
      >
        <span className="slider-label-before">
          Before
        </span>
      </div>

      {/* After Image */}
      <div 
        className="slider-image-after"
        style={{ 
          backgroundImage: `url(${afterDetailingImg})`,
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <span className="slider-label-after">
          After
        </span>
      </div>

      {/* Divider Line */}
      <div 
        className="slider-divider-line"
        style={{ left: `${sliderPosition}%` }}
      />

      {/* Drag Handle Icon */}
      <div 
        className="slider-drag-handle"
        style={{ left: `${sliderPosition}%` }}
      >
        ↔
      </div>
    </div>
  );
}

// 2. MAIN CAR SPA PAGE
function CarSpa({ isDarkMode, toggleTheme }) {
  const location = useLocation();
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const carSearchRef = useRef(null);
  const carResultsRef = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const targetSection = document.querySelector(location.hash);
      if (targetSection) {
        setTimeout(() => {
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 150);
      }
    }
  }, [location.hash]);
  
  // Interactive Visualizer State
  const [selectedColor, setSelectedColor] = useState('Emerald Glow');
  const [selectedVisualizerOption, setSelectedVisualizerOption] = useState('Ceramic');
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Dynamic Personalization Form State
  const [carType, setCarType] = useState('Sedan');
  const [paintCondition, setPaintCondition] = useState(5);
  const [drivingHabit, setDrivingHabit] = useState('Daily Commute');
  const [vehicleClass, setVehicleClass] = useState('sedan');

  // Booking Form State
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '',
    mobile: '',
    date: '',
    time: '',
    address: '',
    service: 'CRYSTAL SHIELD'
  });

  const [memberData, setMemberData] = useState(() => {
    try {
      const saved = localStorage.getItem('cleanz24_logged_in_member');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  useEffect(() => {
    const checkAuth = () => {
      try {
        const saved = localStorage.getItem('cleanz24_logged_in_member');
        setMemberData(saved ? JSON.parse(saved) : null);
      } catch { setMemberData(null); }
    };
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  const getPlanName = (planId) => {
    if (!planId) return 'N/A';
    const planMap = {
      'crystal-shield-annual': 'Crystal Shield (Annual)',
      'velvet-touch-annual': 'Velvet Touch (Annual)',
      'pearl-radiance-annual': 'Pearl Radiance (Annual)',
      'platinum-revival-annual': 'Platinum Revival (Annual)',
      'crystal-shield-monthly': 'Crystal Shield (Monthly)',
      'velvet-touch-monthly': 'Velvet Touch (Monthly)',
      'pearl-radiance-monthly': 'Pearl Radiance (Monthly)',
      'platinum-revival-monthly': 'Platinum Revival (Monthly)',
    };
    return planMap[planId] || planId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  useEffect(() => {
    if (memberData) {
      setBookingData(prev => ({
        ...prev,
        name: memberData.name || '',
        mobile: memberData.mobile || '',
        address: prev.address || '',
        service: prev.service || 'CRYSTAL SHIELD'
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        name: '',
        mobile: '',
        address: '',
        service: 'CRYSTAL SHIELD'
      }));
    }
  }, [memberData]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const handleBookingInputChange = (e) => {
    const { id, value } = e.target;
    setBookingData(prev => ({ ...prev, [id]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    // Validate mobile number (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(bookingData.mobile)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return;
    }
    setMobileError('');
    setIsSubmitting(true);

    try {
      const payload = {
        name: bookingData.name,
        mobile: bookingData.mobile,
        service: `${bookingData.service} (${vehicleClass.toUpperCase()})`,
        date: bookingData.date || 'N/A',
        time: bookingData.time || 'N/A',
        address: bookingData.address,
        type: memberData ? 'Free Member Pickup' : 'Car Wash Booking',
        source: 'Car Spa',
        price: selectedPriceInfo.current,
        isMember: selectedPriceInfo.isMember
      };

      await fetch(`${API_URL}/api/pickups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Error saving booking:', error);
    } finally {
      setIsSubmitting(false);
      setBookingSubmitted(true);
    }
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
  const filteredStores = storesData.filter(store => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      store.name.toLowerCase().includes(q) ||
      store.address.toLowerCase().includes(q) ||
      (store.city && store.city.toLowerCase().includes(q)) ||
      (store.state && store.state.toLowerCase().includes(q)) ||
      (store.tags && store.tags.some(t => t.toLowerCase().includes(q)))
    );
  });
  const carDropdownSuggestions = searchQuery.length >= 2 ? filteredStores.slice(0, 3) : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (carSearchRef.current && !carSearchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Interactive Visualizer Colors configuration
  const visualizerColors = [
    { name: 'Emerald Glow', colorCode: '#00C96D', filter: 'hue-rotate(60deg) saturate(1.4) brightness(1.05)' },
    { name: 'Liquid Gold', colorCode: '#D4AF37', filter: 'hue-rotate(20deg) saturate(1.8) brightness(1.15)' },
    { name: 'Cobalt Shield', colorCode: '#3182CE', filter: 'hue-rotate(185deg) saturate(1.6) brightness(1.0)' },
    { name: 'Ruby Coating', colorCode: '#E53E3E', filter: 'hue-rotate(320deg) saturate(1.5) brightness(1.0)' },
    { name: 'Stealth Matte', colorCode: '#4A5568', filter: 'grayscale(0.9) brightness(0.75)' }
  ];

  const currentFilter = visualizerColors.find(c => c.name === selectedColor)?.filter || '';

  // Advanced Personalization Calculator Formula
  const typeKey = (carType || 'Sedan').toLowerCase();
  const packages = pricingPackagesData[typeKey] || pricingPackagesData['sedan'];

  let recommendationTitle = "";
  let recommendationPrice = "";
  let recommendationDesc = "";
  let progressScore = 50;

  if (paintCondition <= 3) {
    recommendationTitle = packages[0].name;
    recommendationPrice = packages[0].price;
    recommendationDesc = "Recommended for light surface dirt and dust protection. Perfect for quick weekly washes.";
    progressScore = 40;
  } else if (paintCondition <= 7) {
    if (drivingHabit === 'Daily Commute') {
      recommendationTitle = packages[1].name;
      recommendationPrice = packages[1].price;
      recommendationDesc = "Restores high gloss, deep vacuum cleans interior cabin, & eliminates light road contaminants.";
      progressScore = 75;
    } else {
      recommendationTitle = packages[2].name;
      recommendationPrice = packages[2].price;
      recommendationDesc = "Includes machine polishing to erase light swirls, finished with SiO2 hydrophobic spray protection.";
      progressScore = 88;
    }
  } else {
    recommendationTitle = packages[3].name;
    recommendationPrice = packages[3].price;
    recommendationDesc = "Ultimate detail clean. Clay bar decontamination, DA machine polishing, SiO2 ceramic coat lock.";
    progressScore = 98;
  }

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

  const selectedPriceInfo = getPackagePrice(bookingData.service);

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" id="home" style={{ overflowX: 'hidden' }}>
      <SEOMeta
        title="Premium Car Spa, Wash & Detailing Network"
        description="Experience the ultimate car wash, ceramic coating, paint protection film (PPF), and detailing services at Cleanz24. National network of certified master detailers."
        canonical="https://cleanz24.com/car-spa"
      />
      {/* CINEMATIC HERO SECTION */}
      <section className="hero-section position-relative text-center overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
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
          <source src="/first_video.mp4" type="video/mp4" />
        </video>

        {/* Global Dark Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
            {memberData ? `WELCOME BACK, ${memberData.name.toUpperCase()}` : 'DEVIATE FROM ORDINARY'}
          </motion.span>
          <motion.h1 variants={fadeUpVariant} className="display-1 fw-black mb-4 text-gradient" style={{ lineHeight: '1.1', fontWeight: 900 }}>
            {memberData ? 'YOUR EXCLUSIVE' : 'RESTORE. PROTECT.'} <br /> {memberData ? 'MEMBER PORTAL' : 'MAINTAIN.'}
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="lead text-white mb-5 mx-auto" style={{ maxWidth: '650px', fontSize: '1.1rem', opacity: 0.95 }}>
            {memberData 
              ? `You are signed up for the ${getPlanName(memberData.plan)} plan. Book your complimentary doorstep pickup and let our master detailers treat your vehicle.`
              : 'Experience professional paint protection coatings, high-gloss graphene shields & eco-friendly foam washes.'}
          </motion.p>
          <motion.div variants={fadeUpVariant} className="d-flex gap-3 justify-content-center flex-wrap">
            {memberData ? (
              <>
                <a href="#book" className="btn btn-glow btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg text-decoration-none" onClick={(e) => handleSmoothScroll(e, '#book')}>
                  🚗 Schedule Free Pickup
                </a>
                <Link to="/car-spa/membership" className="btn btn-outline-primary-custom btn-lg rounded-pill px-5 py-3 fw-bold text-decoration-none">
                  View Plan Details
                </Link>
              </>
            ) : (
              <>
                <a href="#book" className="btn btn-glow btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg text-decoration-none" onClick={(e) => handleSmoothScroll(e, '#book')}>
                  Book Appointment
                </a>
                <Link to="/car-spa/services" className="btn btn-outline-primary-custom btn-lg rounded-pill px-5 py-3 fw-bold text-decoration-none">
                  View Pricing Matrix
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* 3-COLUMN CUSTOM LAYOUT SECTION */}
      <section className="position-relative py-5" style={{ minHeight: '100vh', background: 'var(--bg-body)' }}>
        {/* Decorative Green/Gold Glows */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,201,109,0.1) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

        <div className="container-fluid px-4 px-xl-5 mt-5 pt-3 position-relative z-2">
          {/* Main Title */}
          <div className="text-center mb-5">
            <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
              INTERACTIVE SUITE
            </span>
            <h1 className="display-4 fw-black mb-3 text-gradient" style={{ letterSpacing: '2px' }}>
              EXPERIENCE THE CLEANZ24 DIFFERENCE
            </h1>
            <p className="text-muted-custom">Interact with our visualizer and customized recommendation matrix below.</p>
          </div>

          <div className="row g-4 align-items-stretch">
            
            {/* COLUMN 1: LIVE STUDIO VISUALIZER */}
            <div className="col-lg-5">
              <div className="premium-card h-100 p-4 d-flex flex-column" style={{ background: 'var(--card-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--card-border)' }}>
                <h4 className="text-center text-brand-primary fw-bold mb-4" style={{ letterSpacing: '2px', fontSize: '1.1rem' }}>LIVE STUDIO VISUALIZER</h4>
                
                <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
                  {['Ceramic', 'PPF Matte', 'DNA Coating'].map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => setSelectedVisualizerOption(opt)}
                      className={`btn btn-sm px-3 rounded-pill fw-bold ${selectedVisualizerOption === opt ? 'btn-glow border border-success' : 'btn-outline-primary-custom'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="position-relative flex-grow-1 d-flex align-items-center justify-content-center rounded overflow-hidden" style={{ minHeight: '300px', background: 'rgba(0,0,0,0.3)' }}>
                  {/* Car Image with Dynamic CSS Filter */}
                  <img 
                    src={neonCarRender} 
                    alt="Car visualizer render" 
                    className="img-fluid position-relative z-2 w-100" 
                    style={{ 
                      objectFit: 'contain',
                      filter: currentFilter,
                      transition: 'filter 0.5s ease-in-out'
                    }} 
                  />
                  
                  {/* Interactive Hotspots Overlay */}
                  <div className="position-absolute top-50 end-0 translate-middle-y z-3 d-flex flex-column gap-3 pe-3">
                    {[
                      { key: 'wheel', label: 'WHEEL', desc: 'Ceramic Caliper Coat' },
                      { key: 'paint', label: 'PAINT', desc: '10H DNA Protection' },
                      { key: 'interior', label: 'CABIN', desc: 'Anti-Bacterial Shield' }
                    ].map((spot) => (
                      <div 
                        key={spot.key}
                        onClick={() => setActiveHotspot(activeHotspot === spot.key ? null : spot.key)}
                        className={`text-center p-2 rounded-circle border d-flex flex-column align-items-center justify-content-center cursor-pointer`}
                        style={{ 
                          width: '65px', 
                          height: '65px', 
                          background: 'rgba(5,13,8,0.85)',
                          borderColor: activeHotspot === spot.key ? 'var(--accent-color)' : 'var(--primary-color)',
                          boxShadow: activeHotspot === spot.key ? '0 0 15px var(--accent-color)' : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                         <span className="d-block fw-bold text-uppercase" style={{ fontSize: '0.55rem', color: activeHotspot === spot.key ? 'var(--accent-color)' : 'var(--primary-color)' }}>{spot.label}</span>
                         <span className="d-block text-white" style={{ fontSize: '0.45rem', marginTop: '1px' }}>INFO</span>
                      </div>
                    ))}
                  </div>

                  {/* Hotspot details popover */}
                  <AnimatePresence>
                    {activeHotspot && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="position-absolute bottom-0 start-0 w-100 p-3 bg-black bg-opacity-80 border-top text-start z-3"
                        style={{ borderColor: 'var(--accent-color)' }}
                      >
                        <h6 className="fw-bold text-uppercase mb-1" style={{ color: 'var(--accent-color)', fontSize: '0.78rem' }}>
                          {activeHotspot === 'wheel' ? 'Wheel Detailing Protocol' : activeHotspot === 'paint' ? 'Paint Restoration Protocol' : 'Interior Sanitation Protocol'}
                        </h6>
                        <p className="text-muted-custom mb-0 small" style={{ fontSize: '0.7rem', lineHeight: '1.4' }}>
                          {activeHotspot === 'wheel' 
                            ? 'Dissolves bonded metallic brake dust. Clay decontaminates the barrel, finished with a 200°C heat-resistant SiO2 caliper coat.'
                            : activeHotspot === 'paint'
                            ? 'Decontaminates micro-pores using soft clay blocks, applies DNA Nano Graphene compound, and locks it with UV curing lamps.'
                            : 'Cabin steam sterilization killing 99.9% pathogens, vacuum extraction on fabric/leather, finished with pH-balanced conditioners.'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Color swatches selector */}
                <div className="mt-4 text-center">
                  <h6 className="fw-bold text-heading small text-uppercase tracking-wider mb-2">Select Protection Coating Tone</h6>
                  <div className="d-flex justify-content-center gap-2 mb-3">
                    {visualizerColors.map((tone) => (
                      <button
                        key={tone.name}
                        onClick={() => setSelectedColor(tone.name)}
                        className="rounded-circle border border-secondary"
                        style={{
                          width: '25px',
                          height: '25px',
                          backgroundColor: tone.colorCode,
                          boxShadow: selectedColor === tone.name ? '0 0 10px rgba(255,255,255,0.8)' : 'none',
                          border: selectedColor === tone.name ? '2px solid white !important' : '1px solid rgba(255,255,255,0.2)',
                          padding: 0,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        title={tone.name}
                      />
                    ))}
                  </div>
                  <h3 className="fw-bold text-heading h5 mb-1">{selectedColor} Finish</h3>
                  <p className="text-muted-custom small mb-0">Protective overlay: {selectedVisualizerOption}</p>
                </div>
              </div>
            </div>

            {/* COLUMN 2: ADVANCED PERSONALIZATION FORM */}
            <div className="col-lg-4">
              <div className="premium-card h-100 p-4" style={{ background: 'var(--card-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--card-border)' }}>
                <h4 className="text-center text-heading fw-bold mb-4" style={{ letterSpacing: '2px', fontSize: '1.1rem' }}>DYNAMIC PRICING ESTIMATOR</h4>
                
                <div className="bg-white rounded p-4 text-dark" style={{ color: '#000' }}>
                  <h5 className="fw-bold mb-3 small text-uppercase" style={{ color: '#000', letterSpacing: '1px' }}>Calculate Treatment</h5>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted text-uppercase" style={{ fontSize: '0.68rem' }}>Vehicle Size Class</label>
                    <select 
                      className="form-select bg-light border-0 py-2 small"
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                    >
                      <option value="Hatchback">Hatchback Class</option>
                      <option value="Sedan">Sedan Class</option>
                      <option value="SUV">SUV Class</option>
                      <option value="Luxury">Luxury / Premium</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small text-muted d-flex justify-content-between text-uppercase" style={{ fontSize: '0.68rem' }}>
                      <span>Current Paint Swirl/Scratch Rating</span>
                      <span className="text-success fw-bold">Level {paintCondition}/10</span>
                    </label>
                    <input 
                      type="range" 
                      className="form-range custom-green-range" 
                      min="1" 
                      max="10" 
                      value={paintCondition}
                      onChange={(e) => setPaintCondition(Number(e.target.value))}
                    />
                    <div className="d-flex justify-content-between px-1 text-muted small" style={{ fontSize: '0.65rem' }}>
                      <span>New Paint</span><span>Swirled</span><span>Scratched</span><span>Dull/Oxidized</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small text-muted text-uppercase" style={{ fontSize: '0.68rem' }}>Driving Exposure</label>
                    <div className="d-flex gap-2">
                      {['Daily Commute', 'Weekend Use', 'Show Car'].map((habit) => (
                        <button 
                          key={habit}
                          type="button"
                          onClick={() => setDrivingHabit(habit)}
                          className={`btn btn-sm flex-grow-1 py-2 ${drivingHabit === habit ? 'btn-success text-white' : 'btn-outline-secondary'}`}
                          style={{ fontSize: '0.72rem', fontWeight: 600 }}
                        >
                          {habit}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded" style={{ background: 'rgba(0,201,109,0.08)', border: '1px solid rgba(0,201,109,0.18)' }}>
                    <h6 className="fw-bold text-dark mb-1 small text-uppercase" style={{ fontSize: '0.7rem', color: '#111' }}>Recommended Package:</h6>
                    <p className="small text-muted mb-2 fw-semibold" style={{ color: '#222' }}>{recommendationTitle}</p>
                    
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="small text-muted font-normal">Estimated price:</span>
                      <span className="fw-bold text-success" style={{ fontSize: '1rem' }}>{recommendationPrice}</span>
                    </div>

                    <div className="progress bg-dark bg-opacity-10" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: `${progressScore}%`, transition: 'width 0.4s ease' }}
                      />
                    </div>
                    <div className="d-flex justify-content-between mt-1" style={{fontSize: '0.65rem'}}>
                      <span className="text-muted">Algorithm Match Score</span>
                      <span className="text-muted fw-bold">{progressScore}% Match</span>
                    </div>
                  </div>

                  <a 
                    href="#book" 
                    className="btn btn-dark w-100 py-3 mt-3 fw-bold text-white text-uppercase rounded"
                    style={{ fontSize: '0.8rem', letterSpacing: '1px' }}
                    onClick={(e) => {
                      setBookingData(prev => ({ ...prev, service: recommendationTitle }));
                      handleSmoothScroll(e, '#book');
                    }}
                  >
                    Select Recommended Wash
                  </a>

                </div>
              </div>
            </div>

            {/* COLUMN 3: TRUST PROTOCOL & LOCAL COMMUNITY IMPACT */}
            <div className="col-lg-3">
              <div className="premium-card h-100 p-4" style={{ background: 'var(--card-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--card-border)' }}>
                <h4 className="text-center text-heading fw-bold mb-4" style={{ letterSpacing: '1px', fontSize: '1rem', lineHeight: '1.4' }}>TRUST PROTOCOL & COMMUNITY</h4>
                
                <h6 className="text-brand-primary fw-bold mb-3 small">SAFETY STANDARDS</h6>
                
                {/* Certified Master Detailers */}
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge rounded-circle border border-primary text-primary" style={{width:'22px', height:'22px', display:'flex', alignItems:'center', justifyContent:'center', fontSize: '0.7rem'}}>A</span>
                    <h6 className="fw-bold text-heading mb-0 small" style={{ fontSize: '0.78rem' }}>MASTER DETAILERS</h6>
                  </div>
                  <div className="d-flex align-items-center gap-2 ps-4">
                    <div className="text-center border p-2 rounded flex-grow-1" style={{background: 'var(--bg-body)', borderColor: 'var(--card-border)'}}>
                      <div className="text-heading fw-bold" style={{fontSize:'0.7rem'}}>Rajiv K. • Lead Technician</div>
                      <div className="text-brand-primary" style={{fontSize:'0.65rem'}}>12 Years Exp • Certified Master</div>
                    </div>
                  </div>
                </div>

                {/* Eco Safe */}
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge rounded-circle border border-primary text-primary" style={{width:'22px', height:'22px', display:'flex', alignItems:'center', justifyContent:'center', fontSize: '0.7rem'}}>B</span>
                    <h6 className="fw-bold text-heading mb-0 small" style={{ fontSize: '0.78rem' }}>ECO-SAFE PROTOCOLS</h6>
                  </div>
                  <p className="text-muted-custom ps-4 mb-0 small" style={{fontSize: '0.78rem', lineHeight: '1.5' }}>
                    100% Biodegradable shampoos. Water scaling recycling technology to conserve 80% utility waste.
                  </p>
                </div>

                {/* Certifications row */}
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge rounded-circle border border-primary text-primary" style={{width:'22px', height:'22px', display:'flex', alignItems:'center', justifyContent:'center', fontSize: '0.7rem'}}>C</span>
                    <h6 className="fw-bold text-heading mb-0 small" style={{ fontSize: '0.78rem' }}>ISO ACCREDITATION</h6>
                  </div>
                  
                  {/* Custom certification rows */}
                  <div className="ps-4">
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center gap-2 border p-2" style={{ background: 'var(--bg-body)', borderColor: 'var(--card-border)', borderRadius: '6px' }}>
                        <span className="text-success small">✔</span>
                        <div className="small" style={{ fontSize: '0.7rem' }}>
                          <strong className="text-heading">ISO 9001:2015</strong> Certified Studio Network
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 border p-2" style={{ background: 'var(--bg-body)', borderColor: 'var(--card-border)', borderRadius: '6px' }}>
                        <span className="text-success small">✔</span>
                        <div className="small" style={{ fontSize: '0.7rem' }}>
                          <strong className="text-heading">Google Verified</strong>detailing network
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-3 ps-4">
                    <span className="badge bg-success px-3 py-2 rounded-pill" style={{ fontSize: '0.7rem', fontWeight: 600 }}>10,000+ VEHICLES DETAILED</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BEFORE & AFTER TRANSFORMATION SECTION */}
      <section className="py-5 bg-secondary-custom border-bottom" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <motion.div className="col-lg-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                SEE THE DIFFERENCE
              </span>
              <h2 className="display-5 fw-bold text-heading mb-4">
                TRANSFORMATION SHOWCASE
              </h2>
              <p className="text-muted-custom mb-4" style={{ lineHeight: '1.8' }}>
                Witness the power of our premium detailing services. Drag the slider to see how we restore dull, scratched paint to a brilliant, mirror-like finish using our multi-stage polishing and ceramic coating process.
              </p>
              <ul className="list-unstyled text-muted-custom mb-0" style={{ lineHeight: '2.2', fontWeight: '500' }}>
                <li className="d-flex align-items-center gap-2">
                  <span className="text-brand-primary fw-bold">✓</span> Removes swirl marks and fine scratches.
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span className="text-brand-primary fw-bold">✓</span> Restores original factory gloss and depth.
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span className="text-brand-primary fw-bold">✓</span> Protects against UV rays and oxidation.
                </li>
              </ul>
            </motion.div>
            
            <motion.div className="col-lg-7" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="shadow-lg rounded overflow-hidden" style={{ border: '1px solid rgba(0, 201, 109, 0.2)' }}>
                <BeforeAfterSlider />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL CREW BANNER */}
      <section className="py-5 bg-primary-custom border-bottom" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="position-relative overflow-hidden shadow-lg"
                style={{ width: '100%', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img
                  src={cleanz24Technicians}
                  alt="Our Insured & Certified Wash Crew"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 w-100 bg-success text-white p-3 fw-bold small text-uppercase tracking-wider text-center" style={{ letterSpacing: '1px', zIndex: 2 }}>
                  Our Insured & Certified Wash Crew
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                  TRUSTED CREW
                </span>
                <h2 className="display-5 fw-bold text-heading mb-4">MEET YOUR WASH CHAMPIONS</h2>
                <p className="text-muted-custom mb-4" style={{ lineHeight: '1.8' }}>
                  Our professional technicians are certified in paint-safe washing technology. Wearing our iconic Cleanz24 uniforms, they ensure a thorough, scratch-free wash using high-tech equipment and premium pH-neutral cleaning solutions.
                </p>
                <ul className="list-unstyled text-muted-custom mb-0" style={{ lineHeight: '2.2', fontWeight: '500' }}>
                  <li className="d-flex align-items-center gap-2">
                    <span className="text-brand-primary fw-bold">✓</span> Background-verified & professionally trained crew.
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <span className="text-brand-primary fw-bold">✓</span> 100% scratch-free active foam washing methodology.
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <span className="text-brand-primary fw-bold">✓</span> Reliable doorstep valet transit handlers.
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SERVICES PROMO BLOCK */}
      <section className="py-5 bg-secondary-custom text-center border-bottom border-top" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
            OUR CAPABILITIES
          </span>
          <h2 className="display-5 fw-bold text-heading mb-4">EXPLORE OUR WASH PACKAGES</h2>
          <p className="text-muted-custom mb-1 mx-auto" style={{ maxWidth: '650px', lineHeight: '1.8' }}>
            We provide specialized Foam & Pressure Washing, Deep Interior Detailing Wash, and Ceramic Wax Protective Coatings. Each wash is optimized for size class and executed using scratch-free active foam technology.
          </p>
          {/* Car Washing Lottie Animation for Quick Services Promo Banner */}
          <div className="d-flex justify-content-center mt-2 mb-5">
            <Player
              src="/carwash3.json"
              background="transparent"
              speed={1}
              style={{ width: '420px', height: '300px' }}
              loop
              autoplay
            />
          </div>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/car-spa/services" className="btn btn-glow btn-lg rounded-pill px-5 py-3 fw-bold text-decoration-none">
              View Packages & Detailed Process
            </Link>
            <a href="#book" className="btn btn-outline-primary-custom btn-lg rounded-pill px-5 py-3 fw-bold text-decoration-none" onClick={(e) => handleSmoothScroll(e, '#book')}>
              Book Appointment
            </a>
          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-5 bg-secondary-custom position-relative">
        <div className="container py-5 text-center">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '2px' }}>
            TESTIMONIALS
          </motion.span>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="display-5 fw-bold text-heading mb-3">
            WHAT CAR OWNERS SAY
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-muted-custom mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Hear from our satisfied customers who experienced our premium washing overhauls.
          </motion.p>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="testimonial-carousel position-relative mx-auto mt-4" style={{ maxWidth: '900px' }}>

            <button className="testimonial-arrow arrow-prev" onClick={prevTestimonial}>
              &#10094;
            </button>
            <button className="testimonial-arrow arrow-next" onClick={nextTestimonial}>
              &#10095;
            </button>

            <div className="testimonial-box p-4 p-md-5 mb-4 position-relative" style={{ borderRadius: '12px' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="testimonial-text mb-0 fw-bold w-100 text-center"
                >
                  "{testimonialsData[currentTestimonialIndex].text}"
                </motion.p>
              </AnimatePresence>
              <div className="testimonial-caret"></div>
            </div>

            <div className="d-flex align-items-center justify-content-center mb-4" style={{ minHeight: '60px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`profile-${currentTestimonialIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="d-flex align-items-center"
                >
                  {/* Initials-based colored avatar instead of pravatar.cc */}
                  <div className="success-story-avatar me-3" style={{ background: 'var(--gradient-primary)', width: '55px', height: '55px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {testimonialsData[currentTestimonialIndex].initials}
                  </div>
                  <div className="text-start">
                    <h6 className="fw-bold mb-0 text-heading">{testimonialsData[currentTestimonialIndex].name}</h6>
                    <small className="text-muted-custom" style={{ fontSize: '0.85rem' }}>{testimonialsData[currentTestimonialIndex].role}</small>
                    <div className="text-warning text-xs mt-1" style={{ fontSize: '0.75rem' }}>
                      ★★★★★ <span className="text-muted-custom" style={{ fontSize: '0.7rem' }}>• Google Verified</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="d-flex justify-content-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  className={`testimonial-dot ${idx === currentTestimonialIndex ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonialIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORES LOCATOR SECTION */}
      <section id="stores" className="py-5 store-locator-section position-relative border-top" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5 text-center">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '2px' }}>
            FIND STORES
          </motion.span>
          <h2 className="display-5 fw-bold text-heading mb-3 text-gradient">
            CLEANZ24 STORES NEAR YOU
          </h2>
          <p className="text-muted-custom mx-auto mb-5" style={{ maxWidth: '550px', lineHeight: 1.7, fontSize: '0.97rem' }}>
            Search by city, state, or locality to discover nearby stores, contact numbers, and get instant directions.
          </p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="mb-5" style={{ maxWidth: '580px', margin: '0 auto 3rem' }}>
            <div className="position-relative" ref={carSearchRef}>
              {/* Search Bar */}
              <div className="car-search-pill d-flex align-items-center">
                <span className="car-search-icon">📍</span>
                <input
                  type="text"
                  className="car-search-field"
                  placeholder="Type your city, area or state..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSearchDropdown(true); }}
                  onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setShowSearchDropdown(false); }}
                    className="car-search-clear"
                    aria-label="Clear"
                  >×</button>
                )}
              </div>

              {/* Dropdown Suggestions */}
              {showSearchDropdown && carDropdownSuggestions.length > 0 && (
                <div className="car-dropdown-panel">
                  <div className="car-dropdown-header">
                    <span className="car-dropdown-label">📍 Nearby Stores</span>
                    {filteredStores.length > 3 && (
                      <span className="car-dropdown-count">{filteredStores.length} found</span>
                    )}
                  </div>
                  {carDropdownSuggestions.map((store) => (
                    <div
                      key={store.id}
                      className="car-dropdown-item"
                      onClick={() => {
                        setSearchQuery(store.city);
                        setShowSearchDropdown(false);
                        setTimeout(() => carResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
                      }}
                    >
                      <span className="car-dropdown-pin text-brand-primary">📍</span>
                      <div className="car-dropdown-info flex-grow-1 text-start">
                        <div className="car-dropdown-name text-heading fw-semibold">{store.name}</div>
                        <div className="car-dropdown-address text-muted-custom">{store.address}</div>
                        <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                          <span className="car-city-badge text-brand-primary">
                            {store.city}, {store.state}
                          </span>
                          <span className="text-muted-custom" style={{ fontSize: '0.72rem' }}>📞 {store.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredStores.length > 3 && (
                    <div className="car-dropdown-more">
                      ↓ {filteredStores.length - 3} more stores shown in cards below
                    </div>
                  )}
                </div>
              )}

              {/* No results */}
              {showSearchDropdown && searchQuery.length >= 2 && carDropdownSuggestions.length === 0 && (
                <div className="car-dropdown-empty">
                  <div style={{ fontSize: '1.8rem' }}>🔍</div>
                  <div className="text-muted-custom mt-1" style={{ fontSize: '0.84rem' }}>No stores found for "<span className="text-heading">{searchQuery}</span>"</div>
                  <div className="text-muted-custom" style={{ fontSize: '0.73rem', marginTop: '4px' }}>Try: Noida, Delhi, Bengaluru, Hyderabad, Pune</div>
                </div>
              )}
            </div>
          </motion.div>

          <div
            ref={carResultsRef}
            key={searchQuery || 'default'}
            className="row g-4 justify-content-center mb-5"
          >
            {(searchQuery ? filteredStores : filteredStores.slice(0, 3)).length > 0 ? (
              (searchQuery ? filteredStores : filteredStores.slice(0, 3)).map((store, index) => (
                <motion.div
                  className="col-lg-4 col-md-6"
                  key={store.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="car-store-result-card h-100">
                    <div className="car-store-result-header">
                      <div className="car-store-icon-wrap">
                        <span style={{ fontSize: '1.4rem' }}>&#128205;</span>
                      </div>
                      <div>
                        <h4 className="car-store-result-name">{store.name}</h4>
                        <span className="car-store-city-tag">{store.city}, {store.state}</span>
                      </div>
                    </div>
                    <p className="car-store-result-address">{store.address}</p>
                    <div className="car-store-result-rating">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '16px' }} />
                      <span style={{ fontSize: '0.78rem' }}>Google Rating</span>
                      <div className="ms-auto">
                        <strong style={{ fontSize: '0.85rem' }}>{store.rating}</strong>
                        <span className="text-warning ms-1">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                        <span style={{ fontSize: '0.75rem' }}> ({store.reviews})</span>
                      </div>
                    </div>
                    <div className="car-store-result-actions">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`} target="_blank" rel="noreferrer" className="car-store-btn car-store-btn-outline">Directions</a>
                      <a href={`tel:${store.phone ? store.phone.replace(/\s+/g, '') : '+919138004800'}`} className="car-store-btn car-store-btn-primary">Call Now</a>
                      <a href={`https://wa.me/${store.whatsapp || '919138004800'}`} target="_blank" rel="noreferrer" className="car-store-btn car-store-btn-green">WhatsApp</a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-12 py-5 text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>&#128269;</div>
                <p className="text-muted-custom fw-semibold">No stores found for "<span className="text-heading">{searchQuery}</span>"</p>
                <p className="text-muted-custom" style={{ fontSize: '0.85rem' }}>Try: Noida, Delhi, Bengaluru, Hyderabad, Pune</p>
              </div>
            )}
          </div>

          {!searchQuery && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <Link to="/car-spa/services" className="btn btn-glow px-5 py-3 fw-bold text-uppercase text-decoration-none">
                View All Stores
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* CONVERTING LEAD FORM CARD */}
      <section id="book" className="py-5 bg-primary-custom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <motion.div className="col-lg-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <h2 className="display-4 fw-bold mb-4 text-gradient">READY FOR THE ULTIMATE SHINE?</h2>
              
              <div className="row text-center mb-5 g-3 bg-secondary-custom rounded-0 py-4 mx-0 shadow-sm" style={{ border: '1px solid var(--card-border)', borderRadius: '12px' }}>
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

              {/* Lottie Animation of Car Wash */}
              <div className="d-flex justify-content-center my-4">
                <Player
                  src="/carwash1.json"
                  background="transparent"
                  speed={1}
                  style={{ width: '260px', height: '260px' }}
                  loop
                  autoplay
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
            
            <motion.div className="col-lg-6" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="card bg-secondary-custom shadow-lg rounded-0 overflow-hidden" style={{ border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                <div className="card-body p-4 p-md-5 position-relative">
                  <div className="position-absolute top-0 end-0 p-3 opacity-25" style={{ fontSize: '4rem', pointerEvents: 'none' }}>📅</div>
                  <h3 className="card-title fw-bold mb-2 text-heading position-relative z-1">{memberData ? 'Schedule Free Member Pickup' : 'Schedule Car Wash'}</h3>
                  <p className="card-text text-muted-custom small mb-4 position-relative z-1">{memberData ? 'Enjoy your club benefit! Complimentary doorstep pickup & transit wash scheduling are included in your active membership.' : 'Complimentary safe pickup and transit drop operations valid across all registered stores.'}</p>
                  
                  {bookingSubmitted ? (
                    <div className="text-center py-5 position-relative z-1">
                      <div className="display-1 text-success mb-3">
                        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h4 className="fw-bold text-heading mb-2">{memberData ? 'Free Member Pickup Scheduled!' : 'Booking Submitted!'}</h4>
                      <p className="text-muted-custom">{memberData ? `Thank you, ${bookingData.name}. Your complimentary member pickup has been registered. Our driver will coordinate transit for your vehicle ${memberData.vehicleNumber}.` : `Thank you, ${bookingData.name}. Our concierge service representative will contact you shortly to coordinate slot timing.`}</p>
                      <div className="p-3 bg-primary-custom rounded border border-success border-opacity-20 text-start mt-4 mb-3">
                        <small className="text-muted-custom">
                          Selected Treatment: <strong>{bookingData.service}</strong><br />
                          Price: <strong>₹{selectedPriceInfo.current.toLocaleString('en-IN')}</strong><br />
                          Contact Number: <strong>{bookingData.mobile}</strong><br />
                          {memberData && <>Registered Vehicle: <strong>{memberData.vehicleNumber} ({memberData.vehicleModel})</strong><br /></>}
                          {bookingData.date && <>Preferred Date: <strong>{bookingData.date}</strong><br /></>}
                          {bookingData.time && <>Preferred Time: <strong>{bookingData.time}</strong><br /></>}
                          Pickup Address: <strong>{bookingData.address}</strong>
                        </small>
                      </div>
                      <button className="btn btn-outline-primary-custom px-4 py-2 mt-3" onClick={() => setBookingSubmitted(false)}>{memberData ? 'Schedule Another Pickup' : 'Schedule Another Wash'}</button>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="position-relative z-1">
                      {memberData && (
                        <div className="p-3 mb-4 rounded d-flex align-items-center justify-content-between text-start" style={{ background: 'rgba(0, 201, 109, 0.08)', border: '1px solid rgba(0, 201, 109, 0.2)', borderRadius: '8px' }}>
                          <div>
                            <span className="badge bg-success mb-1" style={{ fontSize: '0.65rem' }}>FREE MEMBER PICKUP ACTIVE</span>
                            <div className="fw-bold text-white" style={{ fontSize: '0.9rem' }}>{memberData.vehicleModel} ({memberData.vehicleNumber})</div>
                            <div className="small text-muted-custom" style={{ fontSize: '0.75rem' }}>Plan: {getPlanName(memberData.plan)}</div>
                          </div>
                          <span style={{ fontSize: '2rem' }}>🚗</span>
                        </div>
                      )}
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold small text-uppercase text-muted-custom">Name *</label>
                        <input 
                          type="text" 
                          className="form-control py-3 rounded-0" 
                          id="name" 
                          placeholder="Enter full name" 
                          required 
                          value={bookingData.name}
                          onChange={handleBookingInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="mobile" className="form-label fw-bold small text-uppercase text-muted-custom">Mobile Number *</label>
                        <input 
                          type="tel" 
                          className={`form-control py-3 rounded-0 ${mobileError ? 'border-danger' : ''}`}
                          id="mobile" 
                          placeholder="Enter 10-digit mobile number" 
                          required 
                          maxLength={10}
                          value={bookingData.mobile}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setBookingData(prev => ({ ...prev, mobile: val }));
                            if (mobileError) setMobileError('');
                          }}
                        />
                        {mobileError && <small className="text-danger d-block mt-1">{mobileError}</small>}
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
                            value={bookingData.service}
                            onChange={handleBookingInputChange}
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
                        <div className="col-6">
                          <label htmlFor="date" className="form-label fw-bold small text-uppercase text-muted-custom">Preferred Date</label>
                          <input 
                            type="date" 
                            className="form-control py-3 rounded-0" 
                            id="date" 
                            value={bookingData.date}
                            onChange={handleBookingInputChange}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="time" className="form-label fw-bold small text-uppercase text-muted-custom">Preferred Time</label>
                          <input 
                            type="time" 
                            className="form-control py-3 rounded-0" 
                            id="time" 
                            value={bookingData.time}
                            onChange={handleBookingInputChange}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="address" className="form-label fw-bold small text-uppercase text-muted-custom">Address *</label>
                        <textarea 
                          className="form-control rounded-0" 
                          id="address" 
                          rows="3" 
                          placeholder="Enter location details" 
                          required
                          value={bookingData.address}
                          onChange={handleBookingInputChange}
                        ></textarea>
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg rounded-0 fw-bold btn-glow py-3" disabled={isSubmitting}>
                          {isSubmitting ? 'Saving to System...' : (memberData ? 'Confirm Free Member Pickup' : 'Submit Wash Booking')}
                        </button>
                      </div>
                      <div className="d-flex justify-content-between mt-3 text-muted-custom text-center" style={{ fontSize: '0.72rem' }}>
                        <span>🔒 Secure Submission</span>
                        <span>•</span>
                        <span>🚘 432 Bookings This Month</span>
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

      {/* PREMIUM FOOTER SECTION */}

    </div>
  );
}

export default CarSpa;