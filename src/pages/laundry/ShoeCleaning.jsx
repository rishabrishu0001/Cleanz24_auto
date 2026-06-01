import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const shoeCleaningServices = [
  { title: "Sports Shoes", desc: "Our sports shoe cleaning services rejuvenate your footwear, removing dirt, odors, and stains while preserving their durability and comfort.", icon: "👟" },
  { title: "Suede & Leather Shoes", desc: "Our suede and leather shoe cleaning services expertly remove stains and restore their original shine, ensuring lasting elegance and care.", icon: "👞" },
  { title: "High heels & Sandals", desc: "Our cleaning services for high heels and sandals ensure they remain spotless, polished, and comfortable, preserving their style and quality.", icon: "👡" },
];

const advantages = [
  { title: "Eco-Friendly Cleaning", desc: "Safe For Your Clothes", icon: "🌱" },
  { title: "Fast Delivery", desc: "Same-Day or next day Return", icon: "⚡" },
  { title: "Affordable Pricing", desc: "Transparent, Competitive plans.", icon: "💰" },
  { title: "Premium Quality", desc: "Attention To every Fabric Detail", icon: "⭐" },
  { title: "Convenience", desc: "Pickup At Your Doorstep", icon: "🚚" },
];

export default function ShoeCleaning() {
  const [formData, setFormData] = useState({ name: '', mobile: '', address: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your pickup request is received.`);
    setFormData({ name: '', mobile: '', address: '' });
  };

  return (
    <div className="shoe-cleaning-page">
      {/* Page Header */}
      <section className="bg-light py-5 text-center" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container py-4">
          <h1 className="display-5 fw-bold text-dark mb-3">Shoe Cleaning</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-primary fw-semibold">Home</Link></li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Shoe Cleaning</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section py-5" style={{ background: '#EBF8FF' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="section-subtitle">Premium Shoe Cleaning Services for All Type | #1 Cleaning</span>
              <h1 className="display-4 fw-bold text-dark mt-3 mb-4" style={{ lineHeight: '1.2' }}>
                Premium Shoe Cleaning Services. Book Your Pickup Now!
              </h1>
              <p className="lead mb-4 text-muted">
                Say goodbye to Shoe Cleaning hassles! Experience top-notch Cleaning With Our Premium Shoe Cleaning services, crafted for your convenience and satisfaction.
              </p>
            </div>
            
            <div className="col-lg-5 offset-lg-1">
              <div className="bg-white p-4 p-md-5 radius-lg shadow-soft">
                <h3 className="h4 fw-bold text-center mb-4">Schedule Free Pickup</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control bg-light border-0 py-2" placeholder="Name *" required />
                  </div>
                  <div className="mb-3">
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="form-control bg-light border-0 py-2" placeholder="Mobile Number *" required />
                  </div>
                  <div className="mb-4">
                    <textarea name="address" value={formData.address} onChange={handleInputChange} className="form-control bg-light border-0 py-2" rows="3" placeholder="Address *" required></textarea>
                  </div>
                  <button type="submit" className="btn-primary-custom w-100 py-3 rounded-3">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated to Perfect Shoe Care */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
               <h2 className="section-title mb-4">Dedicated to Perfect Shoe Care</h2>
               <p className="text-muted mb-4 lead">
                 "Dedicated to perfect shoe care" reflects our expertise in cleaning and restoring footwear, ensuring your shoes receive exceptional treatment for enduring quality and style. At Cleanz24, meticulous attention and superior care define our shoe cleaning services.
               </p>
               <h4 className="fw-bold mb-3 text-primary">Step Confidently with Shoes That Shine – Experience Perfection with Cleanz24!</h4>
               <p className="text-muted mb-3">
                 At Cleanz24, we believe flawless shoe care shouldn’t come at a hefty price. Our expert cleaning and repair services ensure every pair is restored, refreshed, and cared for with precision—making them look as good as new, every time.
               </p>
               <p className="text-muted mb-4">
                 Using advanced techniques and eco-friendly, fabric-safe solutions, we protect your footwear while delivering exceptional results. Unlike local cleaners who use harsh chemicals that harm shoe fibers and the environment, Cleanz24 ensures gentle, effective, and sustainable care. Trust us to keep your shoes shining and lasting longer—we look forward to serving you!
               </p>
               <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-primary-custom mt-2">Schedule Free Pickup</a>
            </div>
            <div className="col-lg-6">
               <div className="bg-light radius-lg" style={{ height: '500px', border: '1px solid #EDF2F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span className="text-muted">Shoe Cleaning Image Placeholder</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Need */}
      <section className="section-padding" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container text-center">
          <h2 className="section-title mb-5">Shoe Cleaning Services For Every Need</h2>
          <div className="row g-4 justify-content-center">
            {shoeCleaningServices.map((item, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                 <div className="bg-white p-4 radius-lg h-100 shadow-sm border border-light transition hover-shadow">
                    <div className="mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: 80, height: 80, background: '#EBF8FF', color: 'var(--global-primary)', borderRadius: '50%', fontSize: '36px' }}>
                      {item.icon}
                    </div>
                    <h4 className="h5 fw-bold mb-3">{item.title}</h4>
                    <p className="text-muted mb-0">{item.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage */}
      <section className="section-padding" style={{ backgroundColor: '#1A202C' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-white fw-bold">The cleanz24 advantage</h2>
          </div>
          <div className="row g-4 justify-content-center">
             {advantages.map((adv, i) => (
               <div key={i} className="col-lg-2 col-md-4 col-6 text-center">
                 <div className="mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: 60, height: 60, background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '50%', fontSize: '24px' }}>
                   {adv.icon}
                 </div>
                 <h4 className="text-white h6 fw-bold mb-2">{adv.title}</h4>
                 <p className="text-white-50 small mb-0">{adv.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
