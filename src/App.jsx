import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsData, featuresData, servicesData, processStepsData, faqsData } from './data';
import { handleSmoothScroll } from './utils';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);



  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
    <div className="d-flex flex-column min-vh-100 bg-primary-custom" id="home" style={{ overflowX: 'hidden' }}>

      {/* 1. FULL WIDTH NAVIGATION BAR */}
      <Header isScrolled={isScrolled} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* 2. CINEMATIC HERO SECTION */}
      <section className="hero-section text-center overflow-hidden">
        <motion.div
          className="container mt-5"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeUpVariant} className="text-uppercase tracking-widest text-brand-primary fw-bold small mb-3 d-block" style={{ letterSpacing: '4px' }}>
            Elite Auto Spa Network
          </motion.span>
          <motion.h1 variants={fadeUpVariant} className="display-1 fw-bolder mb-4 text-gradient" style={{ lineHeight: '1.1' }}>
            Premium Detailing <br /> Redefined.
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="lead text-heading mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Experience automotive restoration powered by German Eco-Friendly Car Care Solutions.
          </motion.p>
          <motion.div variants={fadeUpVariant}>
            <a href="#book" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold btn-glow shadow-sm">
              Book Your Appointment
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. CORE BENEFITS SECTION WITH STICKY SCROLL */}
      <section id="overview" className="py-5 bg-secondary-custom border-bottom" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <div className="row g-5">
            {/* Sticky Left Column */}
            <div className="col-lg-5">
              <div className="sticky-container">
                <motion.span
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                  className="text-uppercase tracking-widest text-brand-primary fw-bold small mb-2 d-block" style={{ letterSpacing: '2px' }}>
                  Advanced Auto Aesthetics
                </motion.span>
                <motion.h2
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                  className="display-4 fw-bold text-heading mb-4" style={{ lineHeight: '1.2' }}>
                  India’s Finest <br />
                  <span className="text-gradient">Wash & Detailing</span>
                </motion.h2>
                <motion.p
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                  className="lead text-muted-custom fw-light mb-5" style={{ fontSize: '1.15rem' }}>
                  Trusted by over 2 Lac+ passionate car owners across our 70+ ultra-modern detailing hubs in 43+ major cities.
                </motion.p>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="d-flex gap-3">
                  <a href="#book" className="btn btn-primary rounded-pill px-4 py-3 fw-bold btn-glow">
                    Get Started
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Scrolling Right Column */}
            <div className="col-lg-7">
              <motion.div className="row g-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
                {featuresData.map((feature, idx) => (
                  <motion.div className="col-md-6" key={idx} variants={fadeUpVariant}>
                    <div className="card h-100 p-4 premium-card">
                      <div className="card-body">
                        <div className="card-icon-wrapper">{feature.icon}</div>
                        <h3 className="card-title fw-bold h5 mb-3 text-heading">{feature.title}</h3>
                        <p className="card-text text-muted-custom" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PREMIUM COMPREHENSIVE SERVICE MATRIX */}
      <section id="services" className="py-5 bg-primary-custom">
        <div className="container text-center py-5">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="display-5 fw-bold mb-3 text-heading">Our Signature Services</motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-muted-custom mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Professional care engineering built for high-end hatchbacks, sedans, luxury cruisers, and high-performance SUVs.
          </motion.p>

          <motion.div className="row g-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {servicesData.map((srv, idx) => (
              <motion.div className="col-md-4" key={idx} variants={fadeUpVariant}>
                <div className="card h-100 p-4 premium-card">
                  <div className="card-body">
                    <div className="card-icon-wrapper mx-auto">{srv.icon}</div>
                    <h3 className="card-title fw-bold h5 mb-3 mt-4 text-heading">{srv.title}</h3>
                    <p className="card-text text-muted-custom" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                      {srv.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. METICULOUS 6-STEP DETAILING PROCESS */}
      <section id="process" className="py-5 bg-secondary-custom">
        <div className="container py-5">
          <motion.div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <h2 className="display-5 fw-bold mb-3 text-heading">The 6-Step Perfection</h2>
            <p className="lead text-muted-custom" style={{ fontSize: '1.1rem' }}>
              Every vehicle transitions through our meticulous sequence engineered for safety, precision, and maximum luster.
            </p>
          </motion.div>

          <motion.div className="row g-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
            {processStepsData.map((step, idx) => (
              <motion.div className="col-md-4" key={idx} variants={fadeUpVariant}>
                <div className="p-4 h-100 process-card position-relative overflow-hidden">
                  <div className="watermark-number">{step.num}</div>
                  <h4 className="fw-bold h5 position-relative z-1 mb-3">{step.title}</h4>
                  <p className="text-muted-custom mb-0 position-relative z-1" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-5 bg-secondary-custom position-relative">
        <div className="container py-5 text-center">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest">
            TESTIMONIAL
          </motion.span>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="display-4 fw-bold text-heading mb-3">
            What Our Happy Customers Say
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-muted-custom mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Don’t just take our word for it—see what our customers have to say about Cleanz24.
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
                  className="testimonial-text mb-0 fw-bold w-100"
                >
                  {testimonialsData[currentTestimonialIndex].text}
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
                    className="rounded-circle me-3"
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

      {/* 7. CONVERTING LEAD FORM CARD */}
      <section id="book" className="py-5 bg-primary-custom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <motion.div className="col-lg-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <h2 className="display-4 fw-bold mb-4 text-gradient">Ready For The Ultimate Shine?</h2>
              <div className="row text-center mb-5 g-3 bg-secondary-custom rounded-4 py-4 mx-0 shadow-sm" style={{ border: '1px solid var(--card-border)' }}>
                <div className="col-4 border-end" style={{ borderColor: 'var(--card-border) !important' }}>
                  <h3 className="fw-bold mb-0 text-brand-primary">70+</h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.75rem' }}>Bays</small>
                </div>
                <div className="col-4 border-end" style={{ borderColor: 'var(--card-border) !important' }}>
                  <h3 className="fw-bold mb-0 text-brand-primary">43</h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.75rem' }}>Cities</small>
                </div>
                <div className="col-4">
                  <h3 className="fw-bold mb-0 text-brand-primary">21</h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.75rem' }}>States</small>
                </div>
              </div>
              <div className="custom-faq-wrapper mt-4">
                <h4 className="fw-bold mb-4 text-heading">Frequently Asked Questions</h4>
                {faqsData.map((item, index) => {
                  const isDropdownOpen = openFaqIndex === index;
                  return (
                    <div className="faq-dropdown-item py-3" key={index}>
                      <div className="faq-dropdown-header d-flex align-items-center" onClick={() => toggleFaq(index)} style={{ cursor: 'pointer' }}>
                        <span className={`faq-arrow-icon ${isDropdownOpen ? 'arrow-rotated' : ''}`}>›</span>
                        <h3 className="fw-bold text-heading h6 mb-0">{item.q}</h3>
                      </div>
                      <div className={`faq-dropdown-body ${isDropdownOpen ? 'body-open' : ''}`}>
                        <div className="text-muted-custom ps-4 text-sm mt-2">{item.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div className="col-lg-6" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="card bg-secondary-custom shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
                <div className="card-body p-4 p-md-5 position-relative">
                  <div className="position-absolute top-0 end-0 p-3 opacity-25" style={{ fontSize: '4rem' }}>📅</div>
                  <h3 className="card-title fw-bold mb-2 text-heading position-relative z-1">Schedule Pickup</h3>
                  <p className="card-text text-muted-custom small mb-4 position-relative z-1">Complimentary safe pickup and transit drop operations valid across all registered locations.</p>
                  <form onSubmit={(e) => e.preventDefault()} className="position-relative z-1">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold small text-uppercase text-muted-custom">Name *</label>
                      <input type="text" className="form-control py-3 rounded-3" id="name" placeholder="Enter full name" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label fw-bold small text-uppercase text-muted-custom">Mobile Number *</label>
                      <input type="tel" className="form-control py-3 rounded-3" id="mobile" placeholder="Enter mobile contact" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="address" className="form-label fw-bold small text-uppercase text-muted-custom">Address *</label>
                      <textarea className="form-control rounded-3" id="address" rows="3" placeholder="Enter location details" required></textarea>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold btn-glow py-3">Submit Vehicle Booking</button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. PREMIUM FOOTER SECTION */}
      <Footer />

      {/* 8. FLOATING ACTION BUTTONS */}
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

export default App;