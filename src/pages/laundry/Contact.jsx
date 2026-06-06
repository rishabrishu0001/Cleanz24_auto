import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import aboutBg from '../../assets/about_bg.jpg';
import SEOMeta from '../../components/SEOMeta';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        service: 'Contact Inquiry / Pickup',
        date: 'N/A',
        time: 'N/A',
        address: formData.message,
        type: 'Laundry Pickup / Contact Request',
        source: 'Laundry'
      };

      await fetch('http://localhost:5000/api/pickups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
    } finally {
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

      {/* ─── PAGE HEADER ─── */}
      <section className="py-5 text-center" style={{ background: 'linear-gradient(135deg, #1a7a2e 0%, #0f5520 100%)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container py-4">
          <h1 className="display-5 fw-bold text-white mb-3">Contact Us</h1>
          <p className="text-white mb-3" style={{ opacity: 0.85, fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 16px' }}>
            We'd love to hear from you. Get in touch and our team will respond within 24 hours.
          </p>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none fw-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: 'rgba(255,255,255,0.55)' }}>Contact Us</li>
            </ol>
          </nav>
        </div>
      </section>

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
                  <p className="text-muted mb-0">Mumbai, India</p>
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
                  style={{ width: 60, height: 60, fontSize: '24px', background: '#f0faf2', borderRadius: 12, flexShrink: 0 }}>
                  💬
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">WhatsApp</h5>
                  <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="text-muted text-decoration-none">
                    Chat with us on WhatsApp
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
                  <p className="text-muted mb-0">Mon – Sun: 7:00 AM – 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Right – Contact Form */}
            <div className="col-lg-7">
              <div className="p-4 p-md-5 h-100" style={{ background: '#f8fafc', borderRadius: 20, border: '1px solid #e2e8f0' }}>
                {submitted ? (
                  <div className="text-center py-5">
                    <div style={{ fontSize: '4rem', marginBottom: 16 }}>✅</div>
                    <h4 className="fw-bold mb-2" style={{ color: '#1a7a2e' }}>Message Sent!</h4>
                    <p className="text-muted">Thank you, <strong>{formData.name}</strong>! Our team will contact you at <strong>{formData.mobile}</strong> within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <h4 className="fw-bold mb-4" style={{ color: '#1A202C' }}>Send Us a Message</h4>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Name <span className="text-danger">*</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                          className="form-control py-3 bg-white" style={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
                          placeholder="Your full name" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Mobile <span className="text-danger">*</span></label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange}
                          className="form-control py-3 bg-white" style={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
                          placeholder="Your mobile number" required />
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
                          style={{ borderRadius: 10, background: '#1a7a2e', justifyContent: 'center' }}>
                          Send Message →
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

      {/* ─── GOOGLE MAP ─── */}
      <section className="mb-0">
        <iframe
          title="Cleanz24 Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995!3d19.08219785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
          width="100%" height="380"
          style={{ border: 0, display: 'block' }}
          allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ─── ABOUT US SECTION (below contact) ─── */}
      {/* ══════════════════════════════════════════════════════════ */}

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
