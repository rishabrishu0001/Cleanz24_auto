import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="bg-light py-5 text-center" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container py-4">
          <h1 className="display-5 fw-bold text-dark mb-3">About Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-primary fw-semibold">Home</Link></li>
              <li className="breadcrumb-item active text-muted" aria-current="page">About Us</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="pe-lg-4">
                <span className="section-subtitle">Fresh, Clean, and Always Reliable</span>
                <h2 className="section-title mt-2 mb-4" style={{ lineHeight: '1.3' }}>At Cleanz24, we make clothing care simple, reliable, and stress-free.</h2>
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  From daily laundry to delicate dry-cleaning, we handle every garment with expert attention and care. Our mission is to keep your clothes looking fresh, spotless, and perfectly maintained—so you can feel confident every day.
                </p>
                <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  With advanced cleaning techniques, eco-friendly solutions, and a commitment to customer satisfaction, we ensure your wardrobe is always in safe hands. Whether it’s your everyday wear, office outfits, or special occasion attire, your dry-clean is our priority at Cleanz24.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-light radius-lg p-5 d-flex align-items-center justify-content-center" style={{ height: '400px', border: '1px solid var(--global-palette7)' }}>
                <span className="text-muted">About Us Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Stand Out */}
      <section className="section-padding" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container">
          <div className="text-center mb-5 mx-auto" style={{ maxWidth: '700px' }}>
            <h2 className="section-title">What Makes Us Stand Out</h2>
            <p className="text-muted">
              At Cleanz24 , we go beyond just laundry and dry-cleaning—we deliver care, convenience, and quality you can trust. What sets us apart is our dedication to making your experience smooth and satisfying every time.
            </p>
          </div>
          
          <div className="row g-4 justify-content-center">
            {[
              { title: 'Expert Care', desc: 'Skilled professionals who treat every fabric with precision.', icon: '⭐' },
              { title: '24/7 Convenience', desc: 'Service designed to fit your busy lifestyle.', icon: '🕒' },
              { title: 'Eco-Friendly Cleaning', desc: 'Safe solutions that protect both your clothes and the planet.', icon: '🌱' },
              { title: 'On-Time Delivery', desc: 'Fresh, clean clothes when you need them, without delays.', icon: '🚚' },
              { title: 'Customer-First Approach', desc: 'Your satisfaction is always our top priority.', icon: '❤️' },
            ].map((feature, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="bg-white p-4 radius-lg text-center h-100 shadow-sm border border-light">
                  <div className="mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: 60, height: 60, background: 'var(--global-palette8)', borderRadius: '50%', fontSize: '24px' }}>
                    {feature.icon}
                  </div>
                  <h4 className="h5 fw-bold mb-3">{feature.title}</h4>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
             <p className="lead fw-semibold" style={{ color: 'var(--global-primary)' }}>With Cleanz24, you don’t just get clean clothes—you get peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Where Care Meets Commitment */}
      <section className="section-padding bg-white text-center">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: '800px' }}>
            <h2 className="section-title mb-4">Where Care Meets Commitment</h2>
            <p className="text-muted lead mb-0" style={{ lineHeight: '1.8' }}>
              At Cleanz24, we’re committed to giving your clothes the care they deserve. Every garment we handle is treated with attention, expertise, and respect—because we know your wardrobe is more than just fabric, it’s a part of your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-center">
        <div className="container py-4">
          <h2 className="text-white fw-bold mb-3">
            Your Trusted Partner for Premium Laundry and Dry-Cleaning Service, Now Near You
          </h2>
          <p className="text-white-50 mb-5 fst-italic" style={{ maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
            "Cleanz24 – Expert Laundry &amp; Dry Cleaning Services Near You. Fast, eco-friendly, and professionally done. Visit us today!"
          </p>
          <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-primary-custom px-5 py-3 fs-5">
            Schedule Your Free Pickup Now
          </a>
        </div>
      </section>
    </div>
  );
}
