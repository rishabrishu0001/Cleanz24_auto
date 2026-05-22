import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  testimonialsData, 
  featuresData, 
  faqsData, 
  storesData
} from '../data';
import { handleSmoothScroll } from '../utils';
import Header from '../components/Header';
import Footer from '../components/Footer';
import beforeDetailingImg from '../assets/before_detailing.png';
import afterDetailingImg from '../assets/after_detailing.png';
import cleanz24Technicians from '../assets/cleanz24_technicians.jpg';
import firstVideo from '../assets/first_video.mp4';
import { Link } from 'react-router-dom';
import '../App.css';

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
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  // Filter stores based on search query
  const filteredStores = storesData.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" id="home" style={{ overflowX: 'hidden' }}>

      {/* FULL WIDTH NAVIGATION BAR */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* CINEMATIC HERO SECTION */}
      <section className="hero-section position-relative text-center overflow-hidden" style={{ minHeight: '600px' }}>
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
          <source src={firstVideo} type="video/mp4" />
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
            DEVIATE FROM ORDINARY
          </motion.span>
          <motion.h1 variants={fadeUpVariant} className="display-1 fw-black mb-4 text-gradient" style={{ lineHeight: '1.1', fontWeight: 900 }}>
            RESTORE. PROTECT. <br /> MAINTAIN.
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="lead text-white mb-5 mx-auto" style={{ maxWidth: '650px', fontSize: '1.15rem' }}>
            Experience professional eco-friendly foam washes & high-gloss ceramic shield protection.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="d-flex gap-3 justify-content-center flex-wrap">
            <a href="#book" className="btn btn-glow btn-lg rounded-0 px-5 py-3 fw-bold shadow-lg text-decoration-none" onClick={(e) => handleSmoothScroll(e, '#book')}>
              Book Appointment
            </a>
            <Link to="/services" className="btn btn-outline-primary-custom btn-lg rounded-0 px-5 py-3 fw-bold text-decoration-none">
              View Pricing
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CORE BENEFITS SECTION WITH INTERACTIVE BEFORE/AFTER SLIDER */}
      <section id="overview" className="py-5 bg-secondary-custom border-bottom" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            {/* Left Side: Before/After interactive slider */}
            <div className="col-lg-6">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                className="mb-4 text-center text-lg-start"
              >
                <span className="text-uppercase tracking-widest text-brand-primary fw-bold small mb-2 d-block" style={{ letterSpacing: '2px' }}>
                  Car Wash Demonstration
                </span>
                <h3 className="h2 fw-bold text-heading mb-4">DRAG SLIDER TO SEE RESULTS</h3>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
                <BeforeAfterSlider />
              </motion.div>
            </div>

            {/* Right Side: Text & Core benefits */}
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <motion.span
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                  className="text-uppercase tracking-widest text-brand-primary fw-bold small mb-2 d-block" style={{ letterSpacing: '2px' }}>
                  Elite Automotive Cleaning
                </motion.span>
                <motion.h2
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                  className="display-5 fw-bold text-heading mb-4" style={{ lineHeight: '1.2' }}>
                  INDIA’S FINEST CAR WASH HUBS
                </motion.h2>
                <motion.p
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                  className="lead text-muted-custom fw-normal mb-5" style={{ fontSize: '1.1rem' }}>
                  Trusted by passionate car owners. We operate high-tech washing bays engineered to clean, sanitize, and shine your vehicle.
                </motion.p>
                
                <motion.div className="row g-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                  {featuresData.map((feature, idx) => (
                    <motion.div className="col-sm-6" key={idx} variants={fadeUpVariant}>
                      <div className="d-flex align-items-start gap-3">
                        <div className="card-icon-wrapper flex-shrink-0 m-0" style={{ width: '45px', height: '45px', fontSize: '1.25rem' }}>
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="fw-bold h6 text-heading mb-2">{feature.title}</h4>
                          <p className="text-muted-custom small mb-0" style={{ lineHeight: '1.5' }}>{feature.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
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
                className="position-relative overflow-hidden shadow-lg border border-secondary border-opacity-20"
                style={{ width: '100%', aspectRatio: '2/1' }}
              >
                <img 
                  src={cleanz24Technicians} 
                  alt="Cleanz24 Professional Wash Team" 
                  className="w-100 h-100 object-fit-cover"
                />
                <div className="position-absolute bottom-0 start-0 w-100 bg-danger text-white p-3 fw-bold small text-uppercase tracking-wider text-center" style={{ letterSpacing: '1px' }}>
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
                  Our professional technicians are certified in paint-safe washing technology. Wearing our iconic red & black Cleanz24 uniforms, they ensure a thorough, scratch-free wash using high-tech equipment and premium pH-neutral cleaning solutions.
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
          <p className="text-muted-custom mb-5 mx-auto" style={{ maxWidth: '650px', lineHeight: '1.8' }}>
            We provide specialized Foam & Pressure Washing, Deep Interior Detailing Wash, and Ceramic Wax Protective Coatings. Each wash is optimized for size class and executed using scratch-free active foam technology.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/services" className="btn btn-glow btn-lg rounded-0 px-5 py-3 fw-bold">
              View Packages & Detailed Process
            </Link>
            <a href="#book" className="btn btn-outline-primary-custom btn-lg rounded-0 px-5 py-3 fw-bold text-decoration-none" onClick={(e) => handleSmoothScroll(e, '#book')}>
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

            <div className="testimonial-box p-4 p-md-5 mb-4 position-relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
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
                  <img
                    src={testimonialsData[currentTestimonialIndex].image}
                    alt={testimonialsData[currentTestimonialIndex].name}
                    className="rounded-circle me-3 border border-secondary"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div className="text-start">
                    <h6 className="fw-bold mb-0 text-heading">{testimonialsData[currentTestimonialIndex].name}</h6>
                    <small className="text-muted-custom" style={{ fontSize: '0.85rem' }}>{testimonialsData[currentTestimonialIndex].role}</small>
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
      <section id="stores" className="py-5 bg-secondary-custom position-relative border-top" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5 text-center">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '2px' }}>
            FIND HUBS
          </motion.span>
          <h2 className="display-5 fw-bold text-heading mb-4 text-gradient">
            CLEANZ24 HUBS NEAR YOU
          </h2>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="store-search-container mb-5">
            <input 
              type="text" 
              className="form-control store-search-input py-3" 
              placeholder="Search By State/Pincode/Locality" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-glow rounded-0 px-4 fw-bold" onClick={() => setSearchQuery('Bangalore')}>
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
                      <Link to="/services" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">Check Pricing</Link>
                      <a href="tel:+919138004800" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">Call Now</a>
                      <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">WhatsApp</a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-12 py-4">
                <p className="text-muted-custom">No detailing hubs found matching your search.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CONVERTING LEAD FORM CARD */}
      <section id="book" className="py-5 bg-primary-custom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <motion.div className="col-lg-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <h2 className="display-4 fw-bold mb-4 text-gradient">READY FOR THE ULTIMATE SHINE?</h2>
              <div className="row text-center mb-5 g-3 bg-secondary-custom rounded-0 py-4 mx-0 shadow-sm" style={{ border: '1px solid var(--card-border)' }}>
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
              <div className="card bg-secondary-custom shadow-sm rounded-0 overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
                <div className="card-body p-4 p-md-5 position-relative">
                  <div className="position-absolute top-0 end-0 p-3 opacity-25" style={{ fontSize: '4rem' }}>📅</div>
                  <h3 className="card-title fw-bold mb-2 text-heading position-relative z-1">Schedule Car Wash</h3>
                  <p className="card-text text-muted-custom small mb-4 position-relative z-1">Complimentary safe pickup and transit drop operations valid across all registered hubs.</p>
                  <form onSubmit={(e) => { e.preventDefault(); alert("Booking Submitted! Our team will contact you shortly."); }} className="position-relative z-1">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold small text-uppercase text-muted-custom">Name *</label>
                      <input type="text" className="form-control py-3 rounded-0" id="name" placeholder="Enter full name" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label fw-bold small text-uppercase text-muted-custom">Mobile Number *</label>
                      <input type="tel" className="form-control py-3 rounded-0" id="mobile" placeholder="Enter mobile contact" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="address" className="form-label fw-bold small text-uppercase text-muted-custom">Address *</label>
                      <textarea className="form-control rounded-0" id="address" rows="3" placeholder="Enter location details" required></textarea>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg rounded-0 fw-bold btn-glow py-3">Submit Wash Booking</button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREMIUM FOOTER SECTION */}
      <Footer />

      {/* FLOATING ACTION BUTTONS */}
      <div className="floating-actions">
        <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="fab fab-whatsapp" aria-label="WhatsApp">
          <svg viewBox="0 0 32 32" width="36" height="36" fill="currentColor">
            <path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16c0 2.4.6 4.7 1.8 6.7L2.5 29.5l7-1.8c2 .1 4.1 1.8 6.5 1.8 7.5 0 13.5-6 13.5-13.5S23.5 2.5 16 2.5zm0 22.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4C5.5 18.2 5 16.1 5 14c0-6.1 5-11 11-11s11 4.9 11 11-4.9 11-11 11zm6-7.8c-.3-.2-2-.1-2.3-.8-.3-.7-.3-1.3-.4-1.4-.2-.2-.5-.2-.8 0-.3.3-1.3 1.3-1.5 1.5-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-1-1-1.3-1.3-1.5-1.5-.2-.2 0-.3.1-.4.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.4-1-.5-1.4-.1-.4-.2-.3-.3-.3h-.3c-.1 0-.3 0-.5.2-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4 1.7.8 2.3.9 3.1.8.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.6-.4z" />
          </svg>
        </a>
        <a href="tel:+919138004800" className="fab fab-phone" aria-label="Call Us">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
      </div>

    </div>
  );
}

export default CarSpa;