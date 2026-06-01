import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const steamIroningServices = [
  { title: "Delicate fabric care", desc: "Specialized Steam ironing for silk, chiffon, and other delicate fabrics to prevent damage and maintain quality.", icon: "👗" },
  { title: "Formal Wear Pressing", desc: "Perfectly Pressed Suits, Shirts, and trousers for a crisp, professional look.", icon: "👔" },
  { title: "Curtains and Drapes Steaming", desc: "Removes Creases and refreshes heavy fabrics without dismantling them.", icon: "🏡" },
  { title: "Wedding dress steaming", desc: "Ensures wedding gowns are wrinkle-free and flawless for your special day.", icon: "✨" },
];

const advantages = [
  { title: "Eco-Friendly Cleaning", desc: "Safe For Your Clothes", icon: "🌱" },
  { title: "Fast Delivery", desc: "Same-Day or next day Return", icon: "⚡" },
  { title: "Affordable Pricing", desc: "Transparent, Competitive plans.", icon: "💰" },
  { title: "Premium Quality", desc: "Attention To every Fabric Detail", icon: "⭐" },
  { title: "Convenience", desc: "Pickup At Your Doorstep", icon: "🚚" },
];

export default function SteamIroning() {
  const [formData, setFormData] = useState({ name: '', mobile: '', address: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your pickup request is received.`);
    setFormData({ name: '', mobile: '', address: '' });
  };

  return (
    <div className="steam-ironing-page">
      {/* Page Header */}
      <section className="bg-light py-5 text-center" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container py-4">
          <h1 className="display-5 fw-bold text-dark mb-3">Steam Ironing</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-primary fw-semibold">Home</Link></li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Steam Ironing</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section py-5" style={{ background: '#EBF8FF' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="section-subtitle">Professional Steam Ironing Services for Clothes & Fabrics</span>
              <h1 className="display-4 fw-bold text-dark mt-3 mb-4" style={{ lineHeight: '1.2' }}>
                Premium Steam Ironing Services. Book Your Pickup Now!
              </h1>
              <p className="lead mb-4 text-muted">
                Say goodbye to Steam Ironing hassles! Experience top-notch Cleaning With Our Premium Steam Ironing services, crafted for your convenience and satisfaction.
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

      {/* Specialized Services */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
               <div className="bg-light radius-lg" style={{ height: '500px', border: '1px solid #EDF2F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span className="text-muted">Steam Ironing Image Placeholder</span>
               </div>
            </div>
            <div className="col-lg-6">
               <h2 className="section-title mb-4">Specialized in Steam Ironing Services</h2>
               <p className="text-muted mb-4 lead">
                 "Specialized in steam ironing Services" Reflects Our Expertise in using advanced steam technology to refresh and restore fabrics, ensuring each garment receives exceptional treatment for lasting quality and style. At Cleanz24, we take pride in offering meticulous attention and superior care through our steam ironing services.
               </p>
               <ul className="list-unstyled mb-4">
                 <li className="mb-3 d-flex gap-3">
                   <div style={{ color: 'var(--global-primary)' }}>✔</div>
                   <div>
                     <strong>Removes wrinkles while sanitizing fabrics:</strong> Steam ironing not only smooths out wrinkles but also uses high-temperature steam to kill germs, bacteria, and allergens.
                   </div>
                 </li>
                 <li className="mb-3 d-flex gap-3">
                   <div style={{ color: 'var(--global-primary)' }}>✔</div>
                   <div>
                     <strong>Fast and efficient—steam ironing saves you time:</strong> Unlike traditional ironing, steam penetrates fabric quickly and evenly, making the process much faster.
                   </div>
                 </li>
                 <li className="mb-3 d-flex gap-3">
                   <div style={{ color: 'var(--global-primary)' }}>✔</div>
                   <div>
                     <strong>Minimizes the need for frequent dry cleaning:</strong> Since steam refreshes clothes, removes odors, and sanitizes them, it reduces the number of times you need to send garments for dry cleaning.
                   </div>
                 </li>
               </ul>
               <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-primary-custom mt-2">Schedule Free Pickup</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Need */}
      <section className="section-padding" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container text-center">
          <h2 className="section-title mb-5">Steam ironing Services for Every Need</h2>
          <div className="row g-4 justify-content-center">
            {steamIroningServices.map((item, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                 <div className="bg-white p-4 radius-lg h-100 shadow-sm border border-light transition hover-shadow">
                    <div className="mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: 70, height: 70, background: '#EBF8FF', color: 'var(--global-primary)', borderRadius: '50%', fontSize: '30px' }}>
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
