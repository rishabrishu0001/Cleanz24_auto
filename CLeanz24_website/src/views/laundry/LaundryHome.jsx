'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Player from '../../components/LottiePlayer';
import laundry1Url from '../../assets/laundry1.json?url';
import Link from 'next/link';
import Image from 'next/image';
import { storesData } from '../../data';
import { GOOGLE_SHEETS_LAUNDRY_SCRIPT_URL } from '../../config';

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
import playStoreBadgeSvg from '../../assets/play_store_badge.svg';
import appStoreBadgeSvg from '../../assets/app_store_badge.svg';
import appMockupImg from '../../assets/app_mockup.png';
import media1Img from '../../assets/media_mention_1.png';
import media2Img from '../../assets/media_mention_2.png';
import media3Img from '../../assets/media_mention_3.png';
import media4Img from '../../assets/media_mention_4.png';
import storefrontImg from '../../assets/laundry_storefront2.png';
import laundryHandImg from '../../assets/laundry_hand.png';
// laundry2Img removed — unused

export default function LaundryHome() {
  const { isDarkMode } = (() => ({ isDarkMode: false, toggleTheme: () => {} }))() || {};

  // Form state (used in hero form if re-enabled)
  const [_formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', address: '' });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);

  // New Hero Contact Form States
  const [contactFormData, setContactFormData] = useState({ name: '', mobile: '', city: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [countryEmoji, setCountryEmoji] = useState('🇮🇳');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('lh_popup_seen');
    if (alreadySeen) return;
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    sessionStorage.setItem('lh_popup_seen', '1');
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPopup]);

  const countries = [
    { code: '+91', emoji: '🇮🇳', name: 'India' },
    { code: '+1', emoji: '🇺🇸', name: 'United States' },
    { code: '+1', emoji: '🇨🇦', name: 'Canada' },
    { code: '+44', emoji: '🇬🇧', name: 'United Kingdom' },
    { code: '+971', emoji: '🇦🇪', name: 'United Arab Emirates' },
    { code: '+61', emoji: '🇦🇺', name: 'Australia' },
    { code: '+65', emoji: '🇸🇬', name: 'Singapore' },
    { code: '+966', emoji: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+974', emoji: '🇶🇦', name: 'Qatar' },
    { code: '+968', emoji: '🇴🇲', name: 'Oman' },
    { code: '+973', emoji: '🇧🇭', name: 'Bahrain' },
    { code: '+965', emoji: '🇰🇼', name: 'Kuwait' },
    { code: '+49', emoji: '🇩🇪', name: 'Germany' },
    { code: '+33', emoji: '🇫🇷', name: 'France' },
    { code: '+60', emoji: '🇲🇾', name: 'Malaysia' },
    { code: '+81', emoji: '🇯🇵', name: 'Japan' },
    { code: '+64', emoji: '🇳🇿', name: 'New Zealand' },
    { code: '+977', emoji: '🇳🇵', name: 'Nepal' },
    { code: '+880', emoji: '🇧🇩', name: 'Bangladesh' },
    { code: '+94', emoji: '🇱🇰', name: 'Sri Lanka' },
    { code: '+27', emoji: '🇿🇦', name: 'South Africa' },
  ];

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      setContactFormData({ ...contactFormData, [name]: value.replace(/\D/g, '') });
    } else {
      setContactFormData({ ...contactFormData, [name]: value });
    }
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingContact) return;
    setIsSubmittingContact(true);
    try {
      const payload = {
        timestamp: new Date().toISOString().split('T')[0],
        name: contactFormData.name,
        mobile: `'${countryCode} ${contactFormData.mobile}`,
        email: 'N/A',
        service: 'Contact Inquiry / Pickup',
        date: 'N/A',
        time: 'N/A',
        address: contactFormData.city || 'N/A',
        type: 'Laundry Pickup / Contact Request',
        source: 'Laundry',
        price: 0,
        isMember: false,
        sheetName: 'washing leads'
      };

      await fetch(GOOGLE_SHEETS_LAUNDRY_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
    } finally {
      setIsSubmittingContact(false);
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactFormData({ name: '', mobile: '', city: '' });
        setShowPopup(false);
      }, 4500);
    }
  };

  // Store Search State
  const [storeSearchQuery, setStoreSearchQuery] = useState('');
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const storeSearchRef = useRef(null);
  const laundryResultsRef = useRef(null);

  const filteredLaundryStores = storesData.filter(store => {
    const q = storeSearchQuery.toLowerCase();
    if (!q) return true;
    return (
      store.name.toLowerCase().includes(q) ||
      store.address.toLowerCase().includes(q) ||
      store.city.toLowerCase().includes(q) ||
      store.state.toLowerCase().includes(q) ||
      (store.tags && store.tags.some(t => t.toLowerCase().includes(q)))
    );
  });
  const displayedLaundryStores = storeSearchQuery ? filteredLaundryStores : filteredLaundryStores.slice(0, 3);
  const laundryDropdownSuggestions = storeSearchQuery.length >= 2 ? filteredLaundryStores.slice(0, 3) : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (storeSearchRef.current && !storeSearchRef.current.contains(e.target)) {
        setShowStoreDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const _handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line no-unused-vars
  const _handleFormSubmit = (e) => {
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
    },
    {
      name: "Rohit Mehta",
      role: "Business Executive",
      initials: "RM",
      text: "Their express dry cleaning service is an absolute lifesaver. I handed over my formal suits and shirts in the morning, and they were delivered back crisp, steam-ironed, and perfectly packaged by evening. Exceptional speed and quality!"
    },
    {
      name: "Pooja Hegde",
      role: "IT Professional",
      initials: "PH",
      text: "Being new to Bengaluru, finding a trusted laundry service was a challenge until I found Cleanz24. Their app booking is incredibly smooth, and their fabric care for delicate silk garments is premium. Totally worth the subscription!"
    },
    {
      name: "Vikramjit Singh",
      role: "Daily Subscriber",
      initials: "VS",
      text: "I've subscribed to their weekly laundry pack for 6 months. It's affordable, reliable, and consistent. The clothes smell fresh, are ironed flawlessly, and the door delivery saves me hours of household work every week."
    },
    {
      name: "Neha Sharma",
      role: "Creative Designer",
      initials: "NS",
      text: "I was extremely skeptical about sending my designer ethnic wear for dry cleaning, but Cleanz24 did an outstanding job. The gold embroidery was perfectly preserved, and the packaging was top-notch."
    },
    {
      name: "Devendra Yadav",
      role: "Store Manager",
      initials: "DY",
      text: "Cleanz24's shoes cleaning service is underrated. I sent three pairs of dirty white sneakers, and they came back looking almost brand new. Excellent stain removal on the canvas and soles!"
    },
    {
      name: "Sneha Patel",
      role: "Banker",
      initials: "SP",
      text: "With my busy 9-to-9 banking hours, laundry was a major chore. Their automatic scheduling is a lifesaver. The delivery guys are extremely polite, and the service is always on time."
    },
    {
      name: "Aditya Rao",
      role: "University Student",
      initials: "AR",
      text: "The student-friendly packages are perfect for my budget. They pick up my dirty bedsheets and clothes from the hostel gate and deliver them back smelling fresh. Highly recommended!"
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
          <div className="row align-items-center g-5">
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
                
                <h1 className="hero-title-new" style={{ fontSize: '46px' }}>
                  <span className="text-highlight">Best Laundry &amp; Dry Cleaning</span><br />
                  Store in India
                </h1>

                <p className="hero-discount-text" style={{ marginBottom: '20px' }}>
                  Save up to 20% on your first order!
                </p>

                {/* CTA Action button to open popup */}
                <div className="mt-4">
                  <button 
                    onClick={() => setShowPopup(true)} 
                    className="btn-primary-custom"
                    style={{
                      padding: '16px 36px',
                      fontSize: '1.05rem',
                      borderRadius: '50px',
                      boxShadow: '0 8px 25px rgba(60, 139, 53, 0.4)',
                      background: 'linear-gradient(135deg, #3C8B35 0%, #27a243 100%)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(60, 139, 53, 0.55)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(60, 139, 53, 0.4)'; }}
                  >
                    🚀 Schedule Free Pickup
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* ────────────────── 2. INTRO / STATS CHECKLIST SECTION ────────────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0 text-start">
              <span className="section-subtitle" style={{ fontSize: '10px', letterSpacing: '1.5px' }}>India's Best Dry-Clean &amp; Laundry Service</span>
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
                      <h5 className="fw-bold mb-1">100+ Stores Pan India</h5>
                      <p className="text-muted small mb-0">A reliable laundry chain near you.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 d-flex gap-3">
                <Link href="/best-laundry-drycleaning/contact-us" className="btn-primary-custom">Get Started</Link>
                <Link href="/best-laundry-drycleaning/contact-us" className="btn-outline-custom">Learn More</Link>
              </div>
            </div>

            {/* Intro Right Graphic */}
            <div className="col-lg-5 offset-lg-1 text-center position-relative">
              <motion.img 
                whileInView={{ scale: [0.95, 1], rotate: [0, 1, -1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                src={storefrontImg?.src || storefrontImg} 
                alt="Cleanz24 Storefront"
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
              { title: 'Laundry', desc: 'We wash, dry, and fold with precision for a spotless finish.', icon: srvLaundryImg, link: '/best-laundry-drycleaning/services#laundry' },
              { title: 'Dry Cleaning', desc: 'Professional care for suits, silks, and delicate fabrics.', icon: srvDryImg, link: '/best-laundry-drycleaning/services#dry-cleaning' },
              { title: 'Home Cleaning', desc: 'Professional cleaning for a healthier living space.', icon: srvHomeImg, link: '/best-laundry-drycleaning/services#home-cleaning' },
              { title: 'Steam Ironing', desc: 'Wrinkle-free perfection, every time.', icon: srvIronImg, link: '/best-laundry-drycleaning/services#steam-ironing' },
              { title: 'Shoe Cleaning', desc: 'Bring back the shine to your favorite pairs.', icon: srvShoeImg, link: '/best-laundry-drycleaning/services#shoe-cleaning' }
            ].map((srv, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="service-card-wrapper">
                <div className="service-card-new">
                  <div>
                    <Image src={srv.icon} alt={srv.title} width={80} height={80} style={{ objectFit: 'contain' }} />
                    <h3>{srv.title}</h3>
                    <p>{srv.desc}</p>
                  </div>
                  <div className="text-center">
                    <Link href={srv.link} className="know-more-btn text-decoration-none">
                      <span>Know More</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                    </Link>
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
                <Image src={laundryHandImg} alt="Tackle the Stains" className="img-fluid animate-bob" style={{ maxWidth: '100%', maxHeight: '400px', width: 'auto', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))' }} />
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
                <Link href="/best-laundry-drycleaning/contact-us" className="btn-primary-custom">Schedule Free Pickup</Link>
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
                src={processFlowImg?.src || processFlowImg} 
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
            <Player
              src={laundry1Url?.src || laundry1Url}
              background="transparent"
              speed={1}
              style={{ width: '250px', height: '250px' }}
              loop
              autoplay
            />
          </div>
          <span className="badge bg-success px-3 py-2 rounded-pill uppercase mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>24/7 Booking Available</span>
          <h2 className="display-5 fw-bold mb-3">Dry Clean Solutions For a Busy Life</h2>
          <p className="lead mx-auto mb-4 text-white-50" style={{ maxWidth: '700px' }}>
            Managing dirty laundry can be an uphill battle when juggling a busy schedule. Our express pickup & dropoff services make dry cleaning seamless, reliable, and prompt.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link href="/best-laundry-drycleaning/contact-us" className="btn-secondary-custom">
              Schedule Free Pickup
            </Link>
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
                      {testimonials[currentTestimonial].image ? (
                        <Image 
                          src={testimonials[currentTestimonial].image} 
                          alt={testimonials[currentTestimonial].name} 
                          className="testimonial-user-img mb-3"
                          width={65}
                          height={65}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div 
                          className="testimonial-user-avatar mb-3 mx-auto d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" 
                          style={{ 
                            width: '65px', 
                            height: '65px', 
                            borderRadius: '50%', 
                            fontSize: '1.4rem', 
                            backgroundColor: 'var(--global-primary)',
                            border: '3px solid var(--global-primary)'
                          }}
                        >
                          {testimonials[currentTestimonial].initials}
                        </div>
                      )}
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
            <Link href="/best-laundry-drycleaning/contact-us" className="btn-primary-custom">Schedule Free Pickup Now</Link>
          </div>
        </div>
      </section>

      {/* ────────────────── 8.5. STORES LOCATOR SECTION ────────────────── */}
      <section id="stores" className="section-padding store-locator-section border-top border-bottom">
        <div className="container py-3 text-center">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="section-subtitle">
            Find Stores
          </motion.span>
          <h2 className="section-title mt-2 mb-3">
            Cleanz24 <span>Stores Near You</span>
          </h2>
          <p className="text-muted mx-auto mb-5" style={{ maxWidth: '600px', fontSize: '0.97rem', lineHeight: 1.7 }}>
            Search by city, state, or locality to discover nearby stores, contact numbers, and get instant directions.
          </p>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="d-flex gap-3 justify-content-center mb-5 mx-auto"
            style={{ maxWidth: '580px', width: '100%' }}
          >
            <div className="position-relative w-100" ref={storeSearchRef}>
              {/* Search Bar */}
              <div className="store-search-pill d-flex align-items-center">
                <span className="store-search-icon">📍</span>
                <input
                  type="text"
                  className="store-search-field"
                  placeholder="Type your city, area or state..."
                  value={storeSearchQuery}
                  onChange={(e) => { setStoreSearchQuery(e.target.value); setShowStoreDropdown(true); }}
                  onFocus={() => storeSearchQuery.length >= 2 && setShowStoreDropdown(true)}
                  autoComplete="off"
                />
                {storeSearchQuery && (
                  <button
                    className="store-search-clear"
                    onClick={() => { setStoreSearchQuery(''); setShowStoreDropdown(false); }}
                    aria-label="Clear search"
                  >×</button>
                )}
              </div>

              {/* Dropdown Suggestions */}
              {showStoreDropdown && laundryDropdownSuggestions.length > 0 && (
                <div className="store-dropdown-panel">
                  <div className="store-dropdown-header">
                    <span className="store-dropdown-label">📍 Nearby Stores</span>
                    {filteredLaundryStores.length > 3 && (
                      <span className="store-dropdown-count">{filteredLaundryStores.length} found</span>
                    )}
                  </div>
                  {laundryDropdownSuggestions.map((store) => (
                    <div
                      key={store.id}
                      className="store-dropdown-item"
                      onClick={() => {
                        setStoreSearchQuery(store.city);
                        setShowStoreDropdown(false);
                        setTimeout(() => laundryResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
                      }}
                    >
                      <div className="store-dropdown-pin">📍</div>
                      <div className="store-dropdown-info">
                        <div className="store-dropdown-name">{store.name}</div>
                        <div className="store-dropdown-address">{store.address}</div>
                        <div className="store-dropdown-meta">
                          <span className="store-city-badge">{store.city}, {store.state}</span>
                          <span className="store-phone-text">📞 {store.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredLaundryStores.length > 3 && (
                    <div className="store-dropdown-more">
                      ↓ {filteredLaundryStores.length - 3} more stores shown in cards below
                    </div>
                  )}
                </div>
              )}

              {/* No results dropdown */}
              {showStoreDropdown && storeSearchQuery.length >= 2 && laundryDropdownSuggestions.length === 0 && (
                <div className="store-dropdown-empty">
                  <div className="store-dropdown-empty-icon">🔍</div>
                  <div className="store-dropdown-empty-text">No stores found for "<strong>{storeSearchQuery}</strong>"</div>
                  <div className="store-dropdown-empty-hint">Try: Noida, Delhi, Bengaluru, Hyderabad, Pune</div>
                </div>
              )}
            </div>
          </motion.div>



          <div
            ref={laundryResultsRef}
            key={storeSearchQuery || 'default'}
            className="row g-4 justify-content-center mb-5"
          >
            {displayedLaundryStores.length > 0 ? (
              displayedLaundryStores.map((store, index) => (
                <motion.div
                  className="col-lg-4 col-md-6 text-start"
                  key={store.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="laundry-store-card h-100">
                    <div className="laundry-store-card-header">
                      <div className="laundry-store-icon">📍</div>
                      <div>
                        <h4 className="laundry-store-name">{store.name}</h4>
                        <span className="laundry-store-city-tag">{store.city}, {store.state}</span>
                      </div>
                    </div>
                    <p className="laundry-store-address">{store.address}</p>
                    <div className="laundry-store-rating">
                      <svg aria-hidden="true" viewBox="0 0 18 18" style={{ width: '16px', height: '16px', marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
                        <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.8 2.7l2.8 2.17c1.63-1.5 2.8-3.72 2.8-6.5z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.2l-2.8-2.17c-.78.52-1.78.83-3.16.83-2.43 0-4.48-1.64-5.21-3.85L.94 12.8C2.42 15.75 5.48 18 9 18z"/>
                        <path fill="#FBBC05" d="M3.79 10.61A5.4 5.4 0 0 1 3.5 9c0-.56.1-1.1.29-1.61L.94 5.2A8.96 8.96 0 0 0 0 9c0 1.39.32 2.71.94 3.8l2.85-2.19z"/>
                        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.1C13.46.7 11.42 0 9 0 5.48 0 2.42 2.25.94 5.2l2.85 2.19C4.52 5.22 6.57 3.58 9 3.58z"/>
                      </svg>
                      <span style={{ fontSize: '0.78rem' }}>Google Rating</span>
                      <div className="ms-auto">
                        <strong style={{ fontSize: '0.85rem' }}>{store.rating}</strong>
                        <span className="text-warning ms-1">★★★★★</span>
                        <span style={{ fontSize: '0.75rem' }}> ({store.reviews})</span>
                      </div>
                    </div>
                    <div className="laundry-store-actions">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`} target="_blank" rel="noreferrer" className="laundry-store-btn laundry-store-btn-outline">Directions</a>
                      <Link href="/best-laundry-drycleaning/contact-us" className="laundry-store-btn laundry-store-btn-primary">Schedule Pickup</Link>
                      <a href={`tel:+91${store.phone.replace(/\s+/g, '')}`} className="laundry-store-btn laundry-store-btn-outline">Call</a>
                      <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer" className="laundry-store-btn laundry-store-btn-green">WhatsApp</a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-12 py-5 text-center">
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>&#128269;</div>
                <p className="text-muted fw-semibold">No laundry stores found for "<strong>{storeSearchQuery}</strong>"</p>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Try searching: Noida, Delhi, Bengaluru, Hyderabad, Pune</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link href="/best-laundry-drycleaning/stores" className="btn-secondary-custom px-4 py-3 text-decoration-none d-inline-block">
              View All Stores
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── 9. MOBILE APP DOWNLOAD PROMO ────────────────── */}
      <section className="section-padding bg-white overflow-hidden pb-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left promo info */}
            <div className="col-lg-6 text-start mb-5 mb-lg-0">
              <span className="section-subtitle">Mobile Laundry App</span>
              <h2 className="section-title">Laundry At Your Fingertips <br />With <span>Cleanz24 App</span></h2>
              <p className="lead text-muted mb-4">
                Download the Cleanz24 app to schedule pickups, track garment diagnostics, inspect item bills, and order contact-free express deliveries.
              </p>
              <div className="d-flex flex-wrap gap-3 align-items-center mt-2 mb-4">
                <a href="https://play.google.com/store" target="_blank" rel="noreferrer">
                  <Image 
                    src={playStoreBadgeSvg} 
                    alt="Google Play Store" 
                    style={{ 
                      height: '53px', 
                      width: 'auto', 
                      objectFit: 'contain',
                      transition: 'transform 0.2s ease-in-out',
                      cursor: 'pointer'
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </a>
                <a href="https://apps.apple.com" target="_blank" rel="noreferrer">
                  <Image 
                    src={appStoreBadgeSvg} 
                    alt="Download on the App Store" 
                    style={{ 
                      height: '60px', 
                      width: 'auto', 
                      objectFit: 'contain',
                      transition: 'transform 0.2s ease-in-out',
                      cursor: 'pointer'
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
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
                src={appMockupImg?.src || appMockupImg} 
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
              <Image src={media1Img} alt="Media outlet 1" height={40} width={120} style={{ objectFit: 'contain', width: 'auto' }} />
              <Image src={media2Img} alt="Media outlet 2" height={40} width={120} style={{ objectFit: 'contain', width: 'auto' }} />
              <Image src={media3Img} alt="Media outlet 3" height={40} width={120} style={{ objectFit: 'contain', width: 'auto' }} />
              <Image src={media4Img} alt="Media outlet 4" height={40} width={120} style={{ objectFit: 'contain', width: 'auto' }} />
              {/* Iteration 2 */}
              <Image src={media1Img} alt="Media outlet 1" height={40} width={120} style={{ objectFit: 'contain', width: 'auto' }} />
              <Image src={media2Img} alt="Media outlet 2" height={40} width={120} style={{ objectFit: 'contain', width: 'auto' }} />
              <Image src={media3Img} alt="Media outlet 3" height={40} width={120} style={{ objectFit: 'contain', width: 'auto' }} />
              <Image src={media4Img} alt="Media outlet 4" height={40} width={120} style={{ objectFit: 'contain', width: 'auto' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── STICKY WIDGETS AT BOTTOM-LEFT ────────────────── */}
      <div className="laundry-sticky-widgets d-flex">
        <a 
          href="https://wa.me/919138004800" 
          target="_blank" 
          rel="noreferrer" 
          className="whatsapp-circle-btn"
          aria-label="Chat on WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.83 14.09c-.25.7-.1.97-.24 1.45-.33 1.15-1.35 1.77-2.38 1.95-1.12.19-2.3-.22-3.32-.73-2.18-1.09-3.9-2.81-4.99-4.99-.51-1.02-.92-2.2-.73-3.32.18-1.03.8-2.05 1.95-2.38.48-.14.75.01 1.45-.24.28.56.84 1.68 1.12 2.24.14.28.01.56-.14.84-.28.56-.84 1.12-.56 1.4.56 1.12 1.4 1.96 2.52 2.52.28.28.84-.28 1.4-.56.28-.14.56-.28.84-.14.56.28 1.68.84 2.24 1.12.25.14.39.42.24.71z"/></svg>
        </a>
        <a 
          href="tel:+919138004800" 
          className="phone-circle-btn"
          aria-label="Call Cleanz24"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </a>
      </div>

      {/* ────────────────── POPUP BOOKING MODAL ────────────────── */}
      <AnimatePresence>
        {showPopup && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
            onClick={handleClosePopup}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                background: isDarkMode ? '#12253f' : '#ffffff',
                borderRadius: '24px',
                padding: '36px 32px 32px',
                width: '100%',
                maxWidth: '485px',
                boxShadow: isDarkMode 
                  ? '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)' 
                  : '0 20px 50px rgba(0,0,0,0.15)',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClosePopup}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  color: isDarkMode ? '#ffffff' : '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  zIndex: 10,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'; }}
              >
                ✕
              </button>

              {contactSubmitted ? (
                <div className="text-center py-4">
                  <div style={{ fontSize: '3.5rem', marginBottom: 15 }}>✅</div>
                  <h4 className="fw-bold mb-2" style={{ color: '#4ade80', fontFamily: 'Poppins, sans-serif' }}>Request Sent!</h4>
                  <p style={{ color: isDarkMode ? 'rgba(255,255,255,0.8)' : '#334155', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Thank you, <strong style={{ color: isDarkMode ? '#fff' : '#0f172a' }}>{contactFormData.name}</strong>!<br />
                    Our team will call you at <strong style={{ color: '#3C8B35' }}>{countryCode} {contactFormData.mobile}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => { setContactSubmitted(false); setContactFormData({ name: '', mobile: '', email: '', message: '' }); }}
                    className="btn-secondary-custom mt-3"
                    style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactFormSubmit} noValidate>
                  {/* Form Header */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #3C8B35, #27a243)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', boxShadow: '0 4px 12px rgba(60,139,53,0.5)'
                      }}>🚀</div>
                      <h4 style={{
                        fontFamily: 'Poppins, sans-serif',
                        color: isDarkMode ? '#ffffff' : '#0f172a',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        margin: 0,
                        letterSpacing: '-0.3px'
                      }}>
                        Schedule Your Pickup
                      </h4>
                    </div>
                    <p style={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : '#64748b', fontSize: '0.82rem', margin: 0, paddingLeft: '46px' }}>
                      Free pickup • Same day service available
                    </p>
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)', marginBottom: '20px' }} />

                  {/* Name */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: isDarkMode ? 'rgba(255,255,255,0.7)' : '#475569', marginBottom: '6px', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                      Full Name <span style={{ color: '#f87171' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactInputChange}
                      placeholder="Enter your name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: isDarkMode ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #cbd5e1',
                        background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                        color: isDarkMode ? '#ffffff' : '#0f172a',
                        fontSize: '0.92rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, background 0.2s',
                        fontFamily: 'inherit'
                      }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(60,139,53,0.8)'; e.target.style.background = isDarkMode ? 'rgba(255,255,255,0.08)' : '#ffffff'; }}
                      onBlur={e => { e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.12)' : '#cbd5e1'; e.target.style.background = isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc'; }}
                    />
                  </div>

                  {/* Mobile */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: isDarkMode ? 'rgba(255,255,255,0.7)' : '#475569', marginBottom: '6px', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                      Mobile Number <span style={{ color: '#f87171' }}>*</span>
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* Country Code Button */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          style={{
                            padding: '12px 12px',
                            borderRadius: '10px',
                            border: isDarkMode ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #cbd5e1',
                            background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                            color: isDarkMode ? '#ffffff' : '#0f172a',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            whiteSpace: 'nowrap',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                        >
                          <span>{countryEmoji}</span>
                          <span>{countryCode}</span>
                          <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>▼</span>
                        </button>
                        {dropdownOpen && (
                          <>
                            <div
                              onClick={() => setDropdownOpen(false)}
                              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 99 }}
                            />
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              zIndex: 100,
                              background: isDarkMode ? '#1e2d1e' : '#ffffff',
                              border: isDarkMode ? '1px solid rgba(60,139,53,0.4)' : '1px solid #e2e8f0',
                              borderRadius: '10px',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                              width: '130px',
                              maxHeight: '180px',
                              overflowY: 'auto',
                              marginTop: '4px'
                            }}>
                              {countries.map((c, i) => (
                                <div
                                  key={i}
                                  onClick={() => { setCountryCode(c.code); setCountryEmoji(c.emoji); setDropdownOpen(false); }}
                                  style={{
                                    padding: '8px 12px',
                                    fontSize: '0.88rem',
                                    color: isDarkMode ? '#e2e8f0' : '#1e293b',
                                    cursor: 'pointer',
                                    background: countryCode === c.code ? 'rgba(60,139,53,0.15)' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'background 0.15s'
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.08)' : '#f1f5f9'; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = countryCode === c.code ? 'rgba(60,139,53,0.15)' : 'transparent'; }}
                                >
                                  <span>{c.emoji}</span><span>{c.code}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      {/* Phone Input */}
                      <input
                        type="tel"
                        name="mobile"
                        value={contactFormData.mobile}
                        onChange={handleContactInputChange}
                        placeholder="Phone number"
                        required
                        style={{
                          flex: 1,
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: isDarkMode ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #cbd5e1',
                          background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                          color: isDarkMode ? '#ffffff' : '#0f172a',
                          fontSize: '0.92rem',
                          outline: 'none',
                          transition: 'border-color 0.2s, background 0.2s',
                          fontFamily: 'inherit'
                        }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(60,139,53,0.8)'; e.target.style.background = isDarkMode ? 'rgba(255,255,255,0.08)' : '#ffffff'; }}
                        onBlur={e => { e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.12)' : '#cbd5e1'; e.target.style.background = isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc'; }}
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: isDarkMode ? 'rgba(255,255,255,0.7)' : '#475569', marginBottom: '6px', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                      City <span style={{ color: '#f87171' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={contactFormData.city}
                      onChange={handleContactInputChange}
                      placeholder="Enter your city"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: isDarkMode ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #cbd5e1',
                        background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                        color: isDarkMode ? '#ffffff' : '#0f172a',
                        fontSize: '0.92rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, background 0.2s',
                        fontFamily: 'inherit'
                      }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(60,139,53,0.8)'; e.target.style.background = isDarkMode ? 'rgba(255,255,255,0.08)' : '#ffffff'; }}
                      onBlur={e => { e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.12)' : '#cbd5e1'; e.target.style.background = isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc'; }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      borderRadius: '12px',
                      border: 'none',
                      background: isSubmittingContact
                        ? 'rgba(60,139,53,0.5)'
                        : 'linear-gradient(135deg, #3C8B35 0%, #27a243 100%)',
                      color: '#ffffff',
                      fontSize: '0.97rem',
                      fontWeight: 700,
                      cursor: isSubmittingContact ? 'not-allowed' : 'pointer',
                      letterSpacing: '0.3px',
                      boxShadow: isSubmittingContact ? 'none' : '0 4px 20px rgba(60,139,53,0.45)',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={e => { if (!isSubmittingContact) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 25px rgba(60,139,53,0.6)'; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(60,139,53,0.45)'; }}
                  >
                    {isSubmittingContact ? (
                      <span>⏳ Submitting...</span>
                    ) : (
                      <span>🚀 Get Free Pickup</span>
                    )}
                  </button>

                  {/* Trust badges */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                    <span style={{ fontSize: '0.72rem', color: isDarkMode ? 'rgba(255,255,255,0.4)' : '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      🔒 100% Safe
                    </span>
                    <span style={{ fontSize: '0.72rem', color: isDarkMode ? 'rgba(255,255,255,0.4)' : '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ⚡ Quick Response
                    </span>
                    <span style={{ fontSize: '0.72rem', color: isDarkMode ? 'rgba(255,255,255,0.4)' : '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      🌟 Trusted Service
                    </span>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
