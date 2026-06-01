import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', message: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been sent. Our team will contact you shortly.`);
    setFormData({ name: '', mobile: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="bg-light py-5 text-center" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container py-4">
          <h1 className="display-5 fw-bold text-dark mb-3">Contact Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-primary fw-semibold">Home</Link></li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Contact Us</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="pe-lg-4">
                <span className="section-subtitle">Get In Touch</span>
                <h2 className="section-title mt-2 mb-4">We’d love to hear from you!</h2>
                <p className="text-muted mb-5" style={{ fontSize: '1.1rem' }}>
                  Have a question or project in mind? Reach out through the form or contact details below—our team is here to help!
                </p>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-light d-flex align-items-center justify-content-center radius-lg shadow-sm" style={{ width: 60, height: 60, fontSize: '24px', color: 'var(--global-primary)' }}>
                    📍
                  </div>
                  <div className="ms-4">
                    <h5 className="fw-bold mb-1">Our Address</h5>
                    <p className="text-muted mb-0">Mumbai, India</p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <div className="bg-light d-flex align-items-center justify-content-center radius-lg shadow-sm" style={{ width: 60, height: 60, fontSize: '24px', color: 'var(--global-primary)' }}>
                    ✉️
                  </div>
                  <div className="ms-4">
                    <h5 className="fw-bold mb-1">Our Email</h5>
                    <p className="text-muted mb-0">
                      <a href="mailto:happy2helpu@cleanz24.com" className="text-muted text-decoration-none">happy2helpu@cleanz24.com</a>
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <div className="bg-light d-flex align-items-center justify-content-center radius-lg shadow-sm" style={{ width: 60, height: 60, fontSize: '24px', color: 'var(--global-primary)' }}>
                    📞
                  </div>
                  <div className="ms-4">
                    <h5 className="fw-bold mb-1">Phone Number</h5>
                    <p className="text-muted mb-0">
                      <a href="tel:+919138004800" className="text-muted text-decoration-none">+91 9138004800</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-7">
              <div className="bg-light p-4 p-md-5 radius-lg shadow-sm h-100 border border-light">
                <form onSubmit={handleFormSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control border-0 py-3 bg-white" placeholder="Enter your full name" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Mobile Number *</label>
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="form-control border-0 py-3 bg-white" placeholder="Enter your mobile number" required />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control border-0 py-3 bg-white" placeholder="Enter your email address" required />
                    </div>
                    <div className="col-12 mb-4">
                      <label className="form-label fw-semibold">Message *</label>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} className="form-control border-0 py-3 bg-white" rows="5" placeholder="How can we help you?" required></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-primary-custom w-100 py-3 fs-5 radius-lg">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-0">
        <iframe 
          title="Cleanz24 Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995!3d19.08219785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{ border: 0, display: 'block' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </section>
    </div>
  );
}
