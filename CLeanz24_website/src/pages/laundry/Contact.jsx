import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import aboutBg from '../../assets/about_bg.jpg';
import SEOMeta from '../../components/SEOMeta';
import { GOOGLE_SHEETS_LAUNDRY_SCRIPT_URL } from '../../config';
import indiaMapPins from '../../assets/india_map_pins.png';

export default function Contact() {
  const { isDarkMode } = useOutletContext() || {};
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', message: '' });
  const [countryCode, setCountryCode] = useState('+91');
  const [countryEmoji, setCountryEmoji] = useState('🇮🇳');
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const payload = {
        timestamp: new Date().toISOString().split('T')[0],
        name: formData.name,
        mobile: `'${countryCode} ${formData.mobile}`,
        email: formData.email || 'N/A',
        service: 'Contact Inquiry / Pickup',
        date: 'N/A',
        time: 'N/A',
        address: formData.message,
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
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', mobile: '', email: '', message: '' });
      }, 4000);
    }
  };

  const features = [
    { title: 'Expert Care', desc: 'Skilled professionals who treat every fabric with precision.', icon: '⭐' },
    { title: '24/7 Convenience', desc: 'Service designed to fit your busy lifestyle.', icon: '🕒' },
    { title: 'Eco-Friendly Cleaning', desc: 'Safe solutions that protect both your clothes and the planet.', icon: '🌱' },
    { title: 'On-Time Delivery', desc: 'Fresh, clean clothes when you need them, without delays.', icon: '🚚' },
    { title: 'Customer-First Approach', desc: 'Your satisfaction is always our top priority.', icon: '❤️' },
  ];

  return (
    <div className="contact-page">
      <SEOMeta
        title="Contact Cleanz24 Laundry — Customer Support & Franchise Inquiries"
        description="Have questions about our laundry and dry cleaning services or interested in starting a franchise? Contact Cleanz24 today via phone, WhatsApp, email, or our inquiry form."
        keywords="contact laundry, Cleanz24 customer care, dry cleaning phone number, laundry franchise contact"
      />



      {/* ─── CONTACT DETAILS + FORM ─── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row g-5 align-items-start">

            {/* Left – Contact Info */}
            <div className="col-lg-5">
              <span className="section-subtitle">Get In Touch</span>
              <h2 className="section-title mt-2 mb-4">We'd love to <span>hear from you!</span></h2>
              <p className="text-muted mb-5" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                Have a question, want to schedule a pickup, or interested in a franchise?
                Reach out — our team is always ready to help!
              </p>

              {/* Address */}
              <div className="d-flex align-items-center mb-4">
                <div className="d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: 60, height: 60, fontSize: '24px', background: '#f0faf2', borderRadius: 12, flexShrink: 0 }}>
                  📍
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">Our Address</h5>
                  <p className="text-muted mb-0">Pan India</p>
                </div>
              </div>

              {/* Email */}
              <div className="d-flex align-items-center mb-4">
                <div className="d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: 60, height: 60, fontSize: '24px', background: '#f0faf2', borderRadius: 12, flexShrink: 0 }}>
                  ✉️
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">Our Email</h5>
                  <a href="mailto:happy2helpu@cleanz24.com" className="text-muted text-decoration-none">
                    happy2helpu@cleanz24.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="d-flex align-items-center mb-4">
                <div className="d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: 60, height: 60, fontSize: '24px', background: '#f0faf2', borderRadius: 12, flexShrink: 0 }}>
                  📞
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">Phone Number</h5>
                  <a href="tel:+919138004800" className="text-muted text-decoration-none">+91 9138004800</a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="d-flex align-items-center mb-4">
                <div className="d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: 60, height: 60, background: '#f0faf2', borderRadius: 12, flexShrink: 0, color: '#25D366' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.83 14.09c-.25.7-.1.97-.24 1.45-.33 1.15-1.35 1.77-2.38 1.95-1.12.19-2.3-.22-3.32-.73-2.18-1.09-3.9-2.81-4.99-4.99-.51-1.02-.92-2.2-.73-3.32.18-1.03.8-2.05 1.95-2.38.48-.14.75.01 1.45-.24.28.56.84 1.68 1.12 2.24.14.28.01.56-.14.84-.28.56-.84 1.12-.56 1.4.56 1.12 1.4 1.96 2.52 2.52.28.28.84-.28 1.4-.56.28-.14.56-.28.84-.14.56.28 1.68.84 2.24 1.12.25.14.39.42.24.71z"/></svg>
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">WhatsApp</h5>
                  <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="text-muted text-decoration-none">
                    Chat with us on WhatsApp at +91 9138004800
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="d-flex align-items-center mb-2">
                <div className="d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: 60, height: 60, fontSize: '24px', background: '#f0faf2', borderRadius: 12, flexShrink: 0 }}>
                  🕒
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">Working Hours</h5>
                  <p className="text-muted mb-0">Mon – Sun: 9:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>

            {/* Right – Contact Form */}
            <div className="col-lg-7">
              <div className="p-4 p-md-5 h-100 bg-light" style={{ borderRadius: 20, border: '1px solid #e2e8f0' }}>
                {submitted ? (
                  <div className="text-center py-5">
                    <div style={{ fontSize: '4rem', marginBottom: 16 }}>✅</div>
                    <h4 className="fw-bold mb-2" style={{ color: '#1a7a2e' }}>Message Sent!</h4>
                    <p className="text-muted">Thank you, <strong>{formData.name}</strong>! Our team will contact you at <strong>{formData.mobile}</strong> within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <h4 className="fw-bold mb-4">Send Us a Message</h4>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Name <span className="text-danger">*</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                          className="form-control py-3 bg-white" style={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
                          placeholder="Your full name" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Mobile <span className="text-danger">*</span></label>
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
                              fontSize: '0.95rem',
                              color: '#1e293b',
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
                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>▼</span>
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
                                  background: '#ffffff',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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
                                      color: '#1e293b',
                                      cursor: 'pointer',
                                      background: countryCode === c.code && countryEmoji === c.emoji ? '#f1f5f9' : 'transparent',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = countryCode === c.code && countryEmoji === c.emoji ? '#f1f5f9' : 'transparent'; }}
                                  >
                                    <span>{c.emoji}</span>
                                    <span>{c.code}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                          <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange}
                            className="form-control py-3 bg-white" style={{ borderRadius: 10, border: '1px solid #e2e8f0', paddingLeft: '92px' }}
                            placeholder="Your mobile number" required />
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Email <span className="text-danger">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                          className="form-control py-3 bg-white" style={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
                          placeholder="Your email address" required />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Message <span className="text-danger">*</span></label>
                        <textarea name="message" value={formData.message} onChange={handleInputChange}
                          className="form-control py-3 bg-white" style={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
                          rows="5" placeholder="How can we help you?" required />
                      </div>
                      <div className="col-12 mt-2">
                        <button type="submit" className="btn-primary-custom w-100 py-3 fs-5"
                          disabled={isSubmitting}
                          style={{ borderRadius: 10, background: '#1a7a2e', justifyContent: 'center' }}>
                          {isSubmitting ? 'Sending...' : 'Send Message →'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NATIONAL PRESENCE MAP ─── */}
      <section 
        className="py-5 bg-light" 
        style={{ 
          borderTop: isDarkMode ? '1px solid #1b3252' : '1px solid #edf2f7', 
          borderBottom: isDarkMode ? '1px solid #1b3252' : '1px solid #edf2f7' 
        }}
      >
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Map Image Section */}
            <div className="col-lg-7 text-center">
              <div 
                className={`position-relative p-3 bg-white shadow-sm rounded-4 border ${isDarkMode ? 'border-secondary' : 'border-light'}`} 
                style={{ overflow: 'hidden' }}
              >
                <img 
                  src={indiaMapPins} 
                  alt="Cleanz24 National Presence Map" 
                  className="img-fluid"
                  style={{ 
                    maxHeight: '420px', 
                    objectFit: 'contain',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="col-lg-5 text-start">
              <span className="section-subtitle">National Reach</span>
              <h2 className="section-title mt-2 mb-4">Serving Customers <span>Across India</span></h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                Cleanz24 is rapidly expanding its footprint across the nation. With a robust network of digital hubs and physical outlets, we ensure high-quality fabric care is accessible to households everywhere.
              </p>
              
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle p-2 text-primary" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(43, 108, 176, 0.1)', flexShrink: 0 }}>
                    🏢
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">100+ Franchise Locations</h6>
                    <p className="text-muted small mb-0">Active outlets serving major cities and towns.</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle p-2 text-primary" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(43, 108, 176, 0.1)', flexShrink: 0 }}>
                    📍
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">20+ States Covered</h6>
                    <p className="text-muted small mb-0">From northern cities to southern coastal hubs.</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle p-2 text-primary" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(43, 108, 176, 0.1)', flexShrink: 0 }}>
                    🚚
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Doorstep Pickup & Delivery</h6>
                    <p className="text-muted small mb-0">Free pickup service right at your doorstep.</p>
                  </div>
                </div>
              </div>

              <Link to="/laundry/stores" className="btn-primary-custom px-4 py-3 text-decoration-none d-inline-block" style={{ borderRadius: '8px' }}>
                View All Stores
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Intro */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="section-subtitle">Fresh, Clean, and Always Reliable</span>
              <h2 className="section-title mt-2 mb-4" style={{ lineHeight: 1.3 }}>
                At Cleanz24, we make clothing care <span>simple, reliable, and stress-free.</span>
              </h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                From daily laundry to delicate dry-cleaning, we handle every garment with expert attention and care.
                Our mission is to keep your clothes looking fresh, spotless, and perfectly maintained—so you can feel confident every day.
              </p>
              <p className="text-muted mb-0" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                With advanced cleaning techniques, eco-friendly solutions, and a commitment to customer satisfaction,
                we ensure your wardrobe is always in safe hands. Whether it's everyday wear, office outfits, or special
                occasion attire, your dry-clean is our priority at Cleanz24.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="position-relative" style={{ borderRadius: 20, overflow: 'hidden', height: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                <img src={aboutBg} alt="About Cleanz24" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,122,46,0.15)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Stand Out */}
      <section className="section-padding why-choose-us-section">
        <div className="container">
          <div className="text-center mb-5 mx-auto" style={{ maxWidth: 700 }}>
            <span className="section-subtitle">Why Choose Us</span>
            <h2 className="section-title mt-2">What Makes Us <span>Stand Out</span></h2>
            <p className="text-muted mt-3">
              At Cleanz24, we go beyond just laundry and dry-cleaning—we deliver care, convenience,
              and quality you can trust.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {features.map((feature, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="why-choose-us-card p-4 text-center h-100 shadow-sm" style={{ borderRadius: 16 }}>
                  <div className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{ width: 64, height: 64, background: '#f0faf2', borderRadius: '50%', fontSize: '28px' }}>
                    {feature.icon}
                  </div>
                  <h4 className="h5 fw-bold mb-3">{feature.title}</h4>
                  <p className="mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <p className="lead fw-semibold" style={{ color: 'var(--global-primary)' }}>
              With Cleanz24, you don't just get clean clothes—you get peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Where Care Meets Commitment */}
      <section className="section-padding bg-white text-center">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: 800 }}>
            <h2 className="section-title mb-4">Where Care Meets <span>Commitment</span></h2>
            <p className="text-muted lead mb-0" style={{ lineHeight: 1.8 }}>
              At Cleanz24, we're committed to giving your clothes the care they deserve. Every garment we handle is
              treated with attention, expertise, and respect—because we know your wardrobe is more than just fabric,
              it's a part of your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-center" style={{ background: 'linear-gradient(135deg, #1a7a2e 0%, #0f5520 100%)' }}>
        <div className="container py-4">
          <h2 className="text-white fw-bold mb-3">
            Your Trusted Partner for Premium Laundry and Dry-Cleaning Service, Now Near You
          </h2>
          <p className="mb-5 fst-italic" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 700, margin: '0 auto 32px', lineHeight: 1.8 }}>
            "Cleanz24 – Expert Laundry &amp; Dry Cleaning Services Near You. Fast, eco-friendly, and professionally done."
          </p>
          <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-primary-custom btn-white-bg px-5 py-3 fs-5"
            style={{ justifyContent: 'center' }}>
            📱 Schedule Your Free Pickup Now
          </a>
        </div>
      </section>

    </div>
  );
}
