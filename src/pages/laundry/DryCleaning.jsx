import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const dryCleaningDestinations = [
  { title: "Men's Wear", desc: "Our best dry cleaners near me/you ensure your men's wear looks pristine, offering expert care for suits, shirts, and casual wear.", icon: "👔" },
  { title: "Wedding Gowns", desc: "Our Dry cleaning services delicately preserve wedding gowns, ensuring they remain spotless, fresh, and beautifully maintained for years.", icon: "👗" },
  { title: "Kids's Wear", desc: "Our dry cleaning services gently care for kid's wear, keeping clothes soft, clean, and free from stains and odors.", icon: "🧸" },
  { title: "Women's Wear", desc: "Our dry cleaning services provide exceptional care for women's wear, ensuring dresses, blouses, and skirts remain fresh and flawless.", icon: "👚" },
  { title: "Bag Cleaning", desc: "Our bag cleaning services restore the freshness of your handbags, removing dirt and stains while maintaining their shape and quality.", icon: "👜" },
];

const advantages = [
  { title: "Eco-Friendly Cleaning", desc: "Safe For Your Clothes", icon: "🌱" },
  { title: "Fast Delivery", desc: "Same-Day or next day Return", icon: "⚡" },
  { title: "Affordable Pricing", desc: "Transparent, Competitive plans.", icon: "💰" },
  { title: "Premium Quality", desc: "Attention To every Fabric Detail", icon: "⭐" },
  { title: "Convenience", desc: "Pickup At Your Doorstep", icon: "🚚" },
];

export default function DryCleaning() {
  const [formData, setFormData] = useState({ name: '', mobile: '', address: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your pickup request is received.`);
    setFormData({ name: '', mobile: '', address: '' });
  };

  return (
    <div className="dry-cleaning-page">
      {/* Page Header */}
      <section className="bg-light py-5 text-center" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container py-4">
          <h1 className="display-5 fw-bold text-dark mb-3">Dry Cleaning</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-primary fw-semibold">Home</Link></li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Dry Cleaning</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section py-5" style={{ background: '#EBF8FF' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="section-subtitle">best dry cleaners near me</span>
              <h1 className="display-4 fw-bold text-dark mt-3 mb-4" style={{ lineHeight: '1.2' }}>
                Book Your Pickup Now !
              </h1>
              <p className="lead mb-4 text-muted">
                Say goodbye to dry cleaning hassles! Experience top-notch Cleaning With Best Dry Cleaners Near Me/You, crafted for your convenience and satisfaction.
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

      {/* Why Choose Cleanz24 */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
               <div className="bg-light radius-lg" style={{ height: '400px', border: '1px solid #EDF2F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span className="text-muted">Dry Cleaning Image Placeholder</span>
               </div>
            </div>
            <div className="col-lg-6">
               <h2 className="section-title mb-4">Premium Dry-Cleaning with Free Pickup, Express &amp; Same-Day Delivery</h2>
               <h4 className="fw-bold mb-3 text-primary">Why Choose Cleanz24?</h4>
               <ul className="list-unstyled mb-4">
                 <li className="mb-3"><strong>Exceptional Quality at Affordable Prices:</strong> Get premium care for your clothes without overspending.</li>
                 <li className="mb-3"><strong>Expert Fabric Care:</strong> Our specialists handle every fabric with precision and care.</li>
                 <li className="mb-3"><strong>Personalized Attention:</strong> Each garment is treated individually to ensure a flawless finish.</li>
                 <li className="mb-3"><strong>Comprehensive Services:</strong> From daily cleaning to special treatments, we’ve got all your needs covered.</li>
                 <li className="mb-3"><strong>Convenience at Your Doorstep:</strong> Enjoy hassle-free laundry with flexible pickup and delivery options.</li>
               </ul>
               <p className="text-muted fst-italic">
                 Think dry-cleaning always comes with a hefty price tag? Not anymore! At Cleanz24 - best dry cleaners near me/you, we deliver top-quality dry-cleaning at prices that fit your budget.
               </p>
               <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-primary-custom mt-3">Schedule Free Pickup</a>
            </div>
          </div>
        </div>
      </section>

      {/* One-Stop Destination */}
      <section className="section-padding" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Your One-Stop dry Cleaning Destination</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {dryCleaningDestinations.map((item, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                 <div className="bg-white p-4 radius-lg h-100 shadow-sm border border-light text-center transition hover-shadow">
                    <div className="mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: 70, height: 70, background: '#EBF8FF', color: 'var(--global-primary)', borderRadius: '50%', fontSize: '32px' }}>
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

      {/* What Makes Us No 1 */}
      <section className="section-padding bg-white">
        <div className="container text-center">
           <h2 className="section-title mb-5">What Makes Us Your No.1 Dry-Cleaning Choice</h2>
           <div className="row g-4 justify-content-center">
              {['Top-Quality Care', 'Convenience at Its Best', 'Comprehensive Dry Cleaning Solutions', 'Express Service Option', '99% Stain Removal Promise', 'Color Stability Assurance', 'Minor Repairing & Extra Services'].map((feature, i) => (
                 <div key={i} className="col-md-4 col-sm-6">
                    <div className="p-3 radius-lg" style={{ background: '#F7FAFC', border: '1px solid #EDF2F7' }}>
                       <span className="fw-semibold text-dark">{feature}</span>
                    </div>
                 </div>
              ))}
           </div>
           <div className="mt-5">
             <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-primary-custom">Schedule Free Pickup</a>
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
