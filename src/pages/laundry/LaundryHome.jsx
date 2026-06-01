import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import local assets
import heroCircleImg from '../../assets/hero_laundry_circle.png';
import introLoadingImg from '../../assets/intro_laundry_loading.gif';
import srvLaundryImg from '../../assets/service_laundry.png';
import srvDryImg from '../../assets/service_dry.png';
import srvHomeImg from '../../assets/service_home.png';
import srvIronImg from '../../assets/service_iron.png';
import srvShoeImg from '../../assets/service_shoe.png';
import machineIllustrationImg from '../../assets/laundry_machine_illustration.jpg';
import processFlowImg from '../../assets/process_flow.gif';
import testimonialJatinImg from '../../assets/testimonial_jatin.jpg';
import testimonialAnishaImg from '../../assets/testimonial_anisha.jpg';
import testimonialManishImg from '../../assets/testimonial_manish.jpg';
import playStoreBadgeImg from '../../assets/play_store_badge.png';
import appMockupImg from '../../assets/app_mockup.png';
import media1Img from '../../assets/media_mention_1.png';
import media2Img from '../../assets/media_mention_2.png';
import media3Img from '../../assets/media_mention_3.png';
import media4Img from '../../assets/media_mention_4.png';
import storefrontImg from '../../assets/laundry_storefront2.png';

export default function LaundryHome() {
  // Booking Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', address: '' });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaChecked) {
      alert("Please check the 'I'm not a robot' box.");
      return;
    }
    if (formData.name && formData.mobile && formData.address) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', mobile: '', address: '' });
        setRecaptchaChecked(false);
      }, 5000);
    }
  };

  // Testimonials Data using local images
  const testimonials = [
    {
      name: "Jatin Aggarwal",
      role: "Customer",
      image: testimonialJatinImg,
      text: "What I Love Most Is the convenience of their pickup and delivery option. I have a busy schedule so having someone Pick up my laundry and return it washed and folded is a game-changer. The delivery is always on time and the staff is friendly and professional."
    },
    {
      name: "Anisha Beniwal",
      role: "Customer",
      image: testimonialAnishaImg,
      text: "I'm really impressed with the quality of service they provide. The wash and fold service is top-notch, with clothes always returned clean, fresh, and neatly folded. They even managed to remove some tough stains that I thought were permanent."
    },
    {
      name: "Manish Kumar",
      role: "Customer",
      image: testimonialManishImg,
      text: "I've been using Cleanz24 For Several Months now, and I couldn't be happier with their service. From the moment I first contacted them they've been nothing but professional and reliable. Here's what I love about them."
    }
  ];

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="home-page-new">
      {/* ────────────────── 1. HERO SECTION ────────────────── */}
      <section className="hero-section-new">
        {/* Soap Bubbles Animation Overlay */}
        <div className="bubble-container">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
          <div className="bubble bubble-5"></div>
          <div className="bubble bubble-6"></div>
          <div className="bubble bubble-7"></div>
        </div>

        <div className="container position-relative z-3">
          <div className="row align-items-center">
            {/* Hero Left Content */}
            <div className="col-lg-8 text-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="hero-top-text">
                  Fresh and reliable<br />
                  laundry & dry cleaning service
                </p>
                
                <h1 className="hero-title-new">
                  <span className="text-highlight">Best Laundry</span> & Dry<br />
                  Clean Service in India
                </h1>

                <p className="hero-discount-text">
                  Save up to 20% on your first order!
                </p>
                
                {/* Floating/Action buttons next to text */}
                <div className="d-flex gap-3 align-items-center flex-wrap">
                  <a href="#booking-form-section" className="btn-primary-custom">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    Schedule Your Pickup
                  </a>
                  <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-secondary-custom">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.83 14.09c-.25.7-.1.97-.24 1.45-.33 1.15-1.35 1.77-2.38 1.95-1.12.19-2.3-.22-3.32-.73-2.18-1.09-3.9-2.81-4.99-4.99-.51-1.02-.92-2.2-.73-3.32.18-1.03.8-2.05 1.95-2.38.48-.14.75.01 1.45-.24.28.56.84 1.68 1.12 2.24.14.28.01.56-.14.84-.28.56-.84 1.12-.56 1.4.56 1.12 1.4 1.96 2.52 2.52.28.28.84-.28 1.4-.56.28-.14.56-.28.84-.14.56.28 1.68.84 2.24 1.12.25.14.39.42.24.71z"/></svg>
                    Chat On Whatsapp
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 2. BOOKING SECTION ────────────────── */}
      <section className="split-booking-section" id="booking-form-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            {/* Left side: Brand Stats & Image */}
            <div className="col-lg-6">
              <div className="brand-card-box">
                <h4>India’s Fast Growing Laundry &amp; Dry Cleaning Franchise Chain</h4>
                <div className="brand-stats-row mt-3">
                  <div className="brand-stat-item">
                    <span className="green-dot"></span>
                    <span>100+ Stores</span>
                  </div>
                  <div className="brand-stat-item">
                    <span className="green-dot"></span>
                    <span>43 Cities</span>
                  </div>
                  <div className="brand-stat-item">
                    <span className="green-dot"></span>
                    <span>21 States</span>
                  </div>
                </div>
              </div>
              <div className="store-img-container">
                <img src={storefrontImg} alt="Cleanz24 Storefront" />
              </div>
            </div>

            {/* Right side: Booking Form */}
            <div className="col-lg-6">
              <div className="booking-right-side text-start">
                <h2>Get Up to 20% OFF<br />Free Doorstep Pickup &amp; Delivery</h2>
                <h3>Schedule a free pickup</h3>
                <p>We offer free pickup &amp; drop for order value above Rs.300.00 across all our stores in India.</p>
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="booking-form-v2"
                      onSubmit={handleFormSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="booking-form-v2"
                    >
                      <div className="mb-3">
                        <label className="form-label text-dark">Name <span className="text-danger">*</span></label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-control" 
                          placeholder="Enter your name" 
                          required 
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-dark">Mobile Number <span className="text-danger">*</span></label>
                        <input 
                          type="tel" 
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="form-control" 
                          placeholder="Enter a valid mobile number" 
                          required 
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-dark">Address <span className="text-danger">*</span></label>
                        <textarea 
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="form-control" 
                          rows="2" 
                          placeholder="Enter your complete address" 
                          required
                        ></textarea>
                      </div>

                      {/* Recaptcha Mock */}
                      <div className="recaptcha-mock">
                        <div className="recaptcha-left d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => setRecaptchaChecked(prev => !prev)}>
                          <div className="recaptcha-checkbox">
                            {recaptchaChecked && (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c853" strokeWidth="4">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )}
                          </div>
                          <span style={{ fontSize: '14px', color: '#555' }}>I'm not a robot</span>
                        </div>
                        <div className="recaptcha-right">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="#4285F4">
                            <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12h2c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8c-2.4 0-4.52 1.05-6 2.74V4h-2v5h5V7H7.72C8.83 5.17 10.27 4 12 4z"/>
                          </svg>
                          <span>reCAPTCHA</span>
                          <span>Privacy - Terms</span>
                        </div>
                      </div>

                      <button type="submit" className="btn-submit-v2 px-4 py-2 text-white">
                        Submit
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-message-v2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="py-4"
                    >
                      <div className="mb-3 d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle" style={{ width: '50px', height: '50px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <h4 className="fw-bold text-success">Booking Request Received!</h4>
                      <p className="text-muted small mt-2">
                        Thank you, <strong>{formData.name}</strong>. Our logistics executive will contact you shortly on <strong>{formData.mobile}</strong>.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ────────────────── 2. INTRO / STATS CHECKLIST SECTION ────────────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0 text-start">
              <span className="section-subtitle">India's Best Dry-Clean &amp; Laundry Service</span>
              <h2 className="section-title">
                Getting Tired With Your <br />
                <span>Dirty Clothes?</span>
              </h2>
              <p className="lead text-muted mb-4">
                Let us take care of it! With Cleanz24, enjoy professional laundry and dry cleaning services designed to make your life easier. We prioritize fabric hygiene, German eco-friendly detergents, and expert stain removal.
              </p>
              
              <div className="row g-4 mt-2">
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-light-blue rounded-circle p-2 text-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(43, 108, 176, 0.1)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">German Eco Friendly</h5>
                      <p className="text-muted small mb-0">Mild, non-toxic cleaning solvents.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-light-blue rounded-circle p-2 text-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(43, 108, 176, 0.1)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Up to 20% OFF</h5>
                      <p className="text-muted small mb-0">Exclusive savings on your first pickup.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-light-blue rounded-circle p-2 text-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(43, 108, 176, 0.1)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">2 Lac+ Customers</h5>
                      <p className="text-muted small mb-0">Trusted service across multiple cities.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-light-blue rounded-circle p-2 text-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(43, 108, 176, 0.1)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">70+ Store Outlets</h5>
                      <p className="text-muted small mb-0">A reliable laundry chain near you.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 d-flex gap-3">
                <a href="#booking-form" className="btn-primary-custom">Get Started</a>
                <a href="https://cleanz24.com/about-us/" target="_blank" rel="noreferrer" className="btn-outline-custom">Learn More</a>
              </div>
            </div>

            {/* Intro Right Graphic */}
            <div className="col-lg-5 offset-lg-1 text-center position-relative">
              <motion.img 
                whileInView={{ scale: [0.95, 1], rotate: [0, 1, -1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                src={introLoadingImg} 
                alt="Cleanz24 Laundry"
                className="img-fluid rounded-4 animate-bob"
                style={{ maxHeight: '420px', border: '8px solid #F8FAFC', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
              />
              {/* Trust Badge overlay */}
              <div 
                className="position-absolute bg-white p-3 shadow-soft rounded-3 d-flex align-items-center gap-3 border border-light" 
                style={{ bottom: '-20px', left: '20px', maxWidth: '280px' }}
              >
                <div className="bg-success text-white p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                </div>
                <div className="text-start">
                  <h6 className="fw-bold mb-0 text-dark">ISO 9001:2015</h6>
                  <p className="text-muted small mb-0">Certified garment hygiene protocols.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Three Feature Checklist Columns */}
          <div className="row g-4 mt-5">
            <div className="col-md-4">
              <div className="check-feature-card">
                <div className="check-feature-icon">🚚</div>
                <div className="text-start">
                  <h5 className="fw-bold mb-1">Free Delivery</h5>
                  <p className="text-muted small mb-0">Free pickup &amp; delivery for orders above Rs. 300.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="check-feature-card">
                <div className="check-feature-icon">🕒</div>
                <div className="text-start">
                  <h5 className="fw-bold mb-1">Open 24 Hours</h5>
                  <p className="text-muted small mb-0">Always open, always fresh - booking 24/7 online.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="check-feature-card">
                <div className="check-feature-icon">🛡️</div>
                <div className="text-start">
                  <h5 className="fw-bold mb-1">Safety Guaranteed</h5>
                  <p className="text-muted small mb-0">Expert diagnostics matching care labels.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 3. SERVICES SECTION ────────────────── */}
      <section className="section-padding bg-light">
        <div className="container text-center">
          <span className="section-subtitle">Discover the Cleanz24 Difference</span>
          <h2 className="section-title">Our Premium <span>Laundry &amp; Dry-Cleaning Services</span></h2>
          <p className="text-muted mx-auto mb-5" style={{ maxWidth: '600px' }}>
            We provide a wide range of professional cleaning treatments tailored for your garments, shoes, and home soft furnishings.
          </p>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="services-grid-inline"
          >
            {[
              { title: 'Laundry', desc: 'We wash, dry, and fold with precision for a spotless finish.', icon: srvLaundryImg, link: '/laundry/services' },
              { title: 'Dry Cleaning', desc: 'Professional care for suits, silks, and delicate fabrics.', icon: srvDryImg, link: '/laundry/dry-cleaning' },
              { title: 'Home Cleaning', desc: 'Professional cleaning for a healthier living space.', icon: srvHomeImg, link: '/laundry/home-cleaning' },
              { title: 'Steam Ironing', desc: 'Wrinkle-free perfection, every time.', icon: srvIronImg, link: '/laundry/steam-ironing' },
              { title: 'Shoe Cleaning', desc: 'Bring back the shine to your favorite pairs.', icon: srvShoeImg, link: '/laundry/shoe-cleaning' }
            ].map((srv, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="service-card-wrapper">
                <div className="service-card-new">
                  <div>
                    <img src={srv.icon} alt={srv.title} />
                    <h3>{srv.title}</h3>
                    <p>{srv.desc}</p>
                  </div>
                  <div className="text-center">
                    <a href={srv.link} className="know-more-btn text-decoration-none">
                      <span>Know More</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────────────────── 4. DIRTY CLOTHES SECTION ────────────────── */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Graphic with Lottie Washing Machine Animation */}
            <div className="col-lg-6 position-relative text-center mb-5 mb-lg-0">
              {/* Soap Bubble Overlay */}
              <div className="bubble-container" style={{ height: '400px', pointerEvents: 'none' }}>
                <span className="bubble bubble-1" style={{ width: '20px', height: '20px', left: '20%' }}></span>
                <span className="bubble bubble-3" style={{ width: '35px', height: '35px', left: '45%' }}></span>
                <span className="bubble bubble-5" style={{ width: '15px', height: '15px', left: '70%' }}></span>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ position: 'relative', zIndex: 2 }}
              >
                <lottie-player
                  src="/washing_machine.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '320px', height: '320px', margin: '0 auto' }}
                  loop
                  autoplay
                ></lottie-player>
              </motion.div>
            </div>
            
            {/* Right Text */}
            <div className="col-lg-6 text-start ps-lg-5">
              <span className="section-subtitle">Tackle the Stains</span>
              <h2 className="section-title">Getting Tired of Laundry Pile-Ups?</h2>
              <p className="lead text-muted mb-4">
                Doing laundry takes hours out of your week. Sorting colors, pre-treating stains, choosing correct dryer temperatures, and folding can feel endless.
              </p>
              <p className="text-muted mb-4">
                Our laundry experts handle it with high-grade machinery and eco-friendly solutions. We separate your clothing by fabric type and care label to keep your wardrobe in showroom condition.
              </p>
              <div className="d-flex align-items-center gap-3">
                <a href="#booking-form" className="btn-primary-custom">Schedule Free Pickup</a>
                <a href="tel:+919138004800" className="btn-outline-custom">Call us: 9138004800</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 5. 6-STEP PROCESS SECTION ────────────────── */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">How We Work</span>
            <h2 className="section-title">Our 6-Step <span>Expert Cleaning Process</span></h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              From doorstep pickup to final packaging, every item is handled with expert protocols for sanitation, quality control, and care.
            </p>
          </div>

          <div className="row align-items-center process-container">
            {/* Left Steps */}
            <div className="col-lg-4 col-md-6 order-1">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="process-step-item text-start">
                  <div className="process-step-num">01</div>
                  <div>
                    <h4 className="h5 fw-bold mb-2">Sorting</h4>
                    <p className="text-muted small mb-0">Garments are sorted by care label, fabric type, and color density.</p>
                  </div>
                </div>
                <div className="process-step-item text-start">
                  <div className="process-step-num">02</div>
                  <div>
                    <h4 className="h5 fw-bold mb-2">Pre-treatment</h4>
                    <p className="text-muted small mb-0">Tough spots and collar stains are treated with fabric-safe solutions.</p>
                  </div>
                </div>
                <div className="process-step-item text-start">
                  <div className="process-step-num">03</div>
                  <div>
                    <h4 className="h5 fw-bold mb-2">Processing</h4>
                    <p className="text-muted small mb-0">Garments are cleaned in state-of-the-art machines with eco detergents.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Middle Graphic */}
            <div className="col-lg-4 col-md-12 order-2 mb-5 mb-lg-0 text-center">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                src={processFlowImg} 
                alt="Expert washing process" 
                className="img-fluid process-center-gif"
                style={{ maxWidth: '300px' }}
              />
            </div>

            {/* Right Steps */}
            <div className="col-lg-4 col-md-6 order-3">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="process-step-item text-start">
                  <div className="process-step-num">04</div>
                  <div>
                    <h4 className="h5 fw-bold mb-2">Ironing/Pressing</h4>
                    <p className="text-muted small mb-0">Steam presses iron out wrinkles and give clothes a crisp finish.</p>
                  </div>
                </div>
                <div className="process-step-item text-start">
                  <div className="process-step-num">05</div>
                  <div>
                    <h4 className="h5 fw-bold mb-2">Quality Inspection</h4>
                    <p className="text-muted small mb-0">Inspection officers check for spots, seams, and finishing quality.</p>
                  </div>
                </div>
                <div className="process-step-item text-start">
                  <div className="process-step-num">06</div>
                  <div>
                    <h4 className="h5 fw-bold mb-2">Folding/Packaging</h4>
                    <p className="text-muted small mb-0">Neatly folded, wrapped in premium guards, and prepared for dispatch.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 6. DRY CLEAN SOLUTIONS PROMO BANNER ────────────────── */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #2B6CB0 0%, #1A3E60 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="bubble-container">
          <div className="bubble bubble-1" style={{ opacity: 0.3 }}></div>
          <div className="bubble bubble-4" style={{ opacity: 0.3 }}></div>
        </div>
        <div className="container py-4 position-relative z-3 text-center">
          {/* Lottie Animation for 24/7 Booking Banner */}
          <div className="d-flex justify-content-center mb-3">
            <lottie-player
              src="/laundry1.json"
              background="transparent"
              speed="1"
              style={{ width: '250px', height: '250px' }}
              loop
              autoplay
            ></lottie-player>
          </div>
          <span className="badge bg-success px-3 py-2 rounded-pill uppercase mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>24/7 Booking Available</span>
          <h2 className="display-5 fw-bold mb-3">Dry Clean Solutions For a Busy Life</h2>
          <p className="lead mx-auto mb-4 text-white-50" style={{ maxWidth: '700px' }}>
            Managing dirty laundry can be an uphill battle when juggling a busy schedule. Our express pickup & dropoff services make dry cleaning seamless, reliable, and prompt.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="#booking-form" className="btn-secondary-custom">
              Schedule Free Pickup
            </a>
            <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-outline-light-custom">
              Chat On Whatsapp
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────── 7. TESTIMONIAL CAROUSEL ────────────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Testimonials</span>
            <h2 className="section-title">What Our <span>Happy Customers Say</span></h2>
            <p className="text-muted">Don’t just take our word for it—see what our customers have to say about Cleanz24.</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9 col-md-11">
              <div className="testimonial-slider-container">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="row align-items-center text-start"
                  >
                    <div className="col-lg-3 col-md-4 text-center mb-4 mb-md-0">
                      <img 
                        src={testimonials[currentTestimonial].image} 
                        alt={testimonials[currentTestimonial].name} 
                        className="testimonial-user-img mb-3"
                      />
                      <h5 className="fw-bold text-dark mb-0">{testimonials[currentTestimonial].name}</h5>
                      <span className="text-muted small">{testimonials[currentTestimonial].role}</span>
                    </div>
                    <div className="col-lg-9 col-md-8 border-start border-md-none border-light ps-lg-4">
                      <p className="testimonial-text">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      <div className="d-flex gap-1 text-warning">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button onClick={handlePrevTestimonial} className="testimonial-nav-btn" aria-label="Previous Testimonial">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button onClick={handleNextTestimonial} className="testimonial-nav-btn" aria-label="Next Testimonial">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 8. NO FADING, ONLY CLEANING ────────────────── */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Safety &amp; Protection</span>
            <h2 className="section-title">No Fading, Only Cleaning</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              If you’re concerned about maintaining the color and integrity of your clothes during dry cleaning, choose a dry cleaner that prioritizes gentle, professional cleaning methods.
            </p>
          </div>

          <div className="row g-4 justify-content-center text-start">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 p-4 rounded-4 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
                <div className="mb-3 fs-2 text-primary">🌸</div>
                <h4 className="h5 fw-bold mb-3 text-dark">Premium Perfume</h4>
                <p className="text-muted mb-0 small">
                  We offer fragrance-infused garment conditioning treatments to leave a subtle, pleasant aroma that lasts for days after packaging.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 p-4 rounded-4 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
                <div className="mb-3 fs-2 text-primary">🧴</div>
                <h4 className="h5 fw-bold mb-3 text-dark">Trusted Detergents</h4>
                <p className="text-muted mb-0 small">
                  We employ eco-friendly, mild detergents and sanitizing agents that clean fibers deeply without degrading the thread count.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 p-4 rounded-4 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
                <div className="mb-3 fs-2 text-primary">👐</div>
                <h4 className="h5 fw-bold mb-3 text-dark">Gentle Handling</h4>
                <p className="text-muted mb-0 small">
                  Every fabric type has its own washing cycle and tumble dry limit. Gentle mechanical movements ensure color longevity and texture retention.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <a href="#booking-form" className="btn-primary-custom">Schedule Free Pickup Now</a>
          </div>
        </div>
      </section>

      {/* ────────────────── 9. MOBILE APP DOWNLOAD PROMO ────────────────── */}
      <section className="section-padding bg-white overflow-hidden pb-0">
        <div className="container">
          <div className="row align-items-center">
            {/* Left promo info */}
            <div className="col-lg-6 text-start mb-5 mb-lg-0">
              <span className="section-subtitle">Mobile Laundry App</span>
              <h2 className="section-title">Laundry At Your Fingertips <br />With <span>Cleanz24 App</span></h2>
              <p className="lead text-muted mb-4">
                Download the Cleanz24 app to schedule pickups, track garment diagnostics, inspect item bills, and order contact-free express deliveries.
              </p>
              <div className="d-flex gap-3">
                <a href="https://play.google.com/store" target="_blank" rel="noreferrer">
                  <img src={playStoreBadgeImg} alt="Google Play Store" style={{ height: '54px', width: 'auto', objectFit: 'contain' }} />
                </a>
              </div>
            </div>

            {/* Right app mockups */}
            <div className="col-lg-6 text-center">
              <motion.img 
                initial={{ y: 150, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={appMockupImg} 
                alt="Cleanz24 Mobile App Interface" 
                className="img-fluid"
                style={{ maxHeight: '380px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 10. MEDIA MENTIONS TICKER ────────────────── */}
      <section className="py-5 bg-light border-top border-bottom border-light-grey">
        <div className="container">
          <h4 className="text-center fw-bold text-muted uppercase tracking-widest mb-4" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Media Mentions</h4>
          <div className="media-mentions-ticker">
            <div className="media-mentions-track">
              {/* Iteration 1 */}
              <img src={media1Img} alt="Media outlet 1" />
              <img src={media2Img} alt="Media outlet 2" />
              <img src={media3Img} alt="Media outlet 3" />
              <img src={media4Img} alt="Media outlet 4" />
              {/* Iteration 2 */}
              <img src={media1Img} alt="Media outlet 1" />
              <img src={media2Img} alt="Media outlet 2" />
              <img src={media3Img} alt="Media outlet 3" />
              <img src={media4Img} alt="Media outlet 4" />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── STICKY WIDGETS AT BOTTOM-LEFT ────────────────── */}
      <div className="laundry-sticky-widgets d-none d-md-flex">
        <a 
          href="https://wa.me/919138004800" 
          target="_blank" 
          rel="noreferrer" 
          className="whatsapp-pill-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.83 14.09c-.25.7-.1.97-.24 1.45-.33 1.15-1.35 1.77-2.38 1.95-1.12.19-2.3-.22-3.32-.73-2.18-1.09-3.9-2.81-4.99-4.99-.51-1.02-.92-2.2-.73-3.32.18-1.03.8-2.05 1.95-2.38.48-.14.75.01 1.45-.24.28.56.84 1.68 1.12 2.24.14.28.01.56-.14.84-.28.56-.84 1.12-.56 1.4.56 1.12 1.4 1.96 2.52 2.52.28.28.84-.28 1.4-.56.28-.14.56-.28.84-.14.56.28 1.68.84 2.24 1.12.25.14.39.42.24.71z"/></svg>
          Schedule Your Pickup
        </a>
        <a 
          href="tel:+919138004800" 
          className="phone-circle-btn"
          aria-label="Call Cleanz24"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </a>
      </div>
    </div>
  );
}
