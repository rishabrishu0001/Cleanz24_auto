import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const homeCleaningServices = [
  { title: "Sofa Cleaning", desc: "Our sofa cleaning services effectively remove dirt, stains, and odors, restoring your furniture's freshness and enhancing its longevity with expert care.", icon: "🛋️" },
  { title: "Carpet Cleaning", desc: "Professional carpet cleaning ensures deep dirt removal, eliminates allergens, and revitalizes your carpets, leaving them fresh, clean, and visually appealing.", icon: "🏠" },
  { title: "Mattress cleaning", desc: "Mattress cleaning services remove dust and stains, refresh fabrics, and maintain their texture, ensuring a clean and elegant home environment.", icon: "🛏️" },
];

export default function HomeCleaning() {
  const [formData, setFormData] = useState({ name: '', mobile: '', address: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your pickup request is received.`);
    setFormData({ name: '', mobile: '', address: '' });
  };

  return (
    <div className="home-cleaning-page">
      {/* Page Header */}
      <section className="bg-light py-5 text-center" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container py-4">
          <h1 className="display-5 fw-bold text-dark mb-3">Home Cleaning</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-primary fw-semibold">Home</Link></li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Home Cleaning</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section py-5" style={{ background: '#EBF8FF' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="section-subtitle">Professional Home Cleaning Services for Hygienic Living</span>
              <h1 className="display-4 fw-bold text-dark mt-3 mb-4" style={{ lineHeight: '1.2' }}>
                Premium Home Cleaning Services. Book Your Service Now!
              </h1>
              <p className="lead mb-4 text-muted">
                Say goodbye to Home Cleaning hassles! Experience top-notch Cleaning With Our Premium Home Cleaning services, crafted for your convenience and satisfaction.
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

      {/* Keeping Your Home Spotless */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
               <h2 className="section-title mb-4">Keeping Your Home Spotless, Always</h2>
               <p className="text-muted mb-4 lead">
                 "Keeping Your home spotless, always" embodies our dedication to providing top-notch home cleaning services for your furniture, carpets, and curtains. At Cleanz24, we ensure every detail is addressed, delivering a fresh, tidy, and inviting home environment you can enjoy every day.
               </p>
               <ul className="list-unstyled mb-4">
                 <li className="mb-3 d-flex gap-3">
                   <div style={{ color: 'var(--global-primary)' }}>✔</div>
                   <div>
                     <strong>Professional care for every surface and material:</strong> Whether it’s wood, glass, metal, fabric, or marble, you have the right techniques and expertise to clean each surface properly without causing damage.
                   </div>
                 </li>
                 <li className="mb-3 d-flex gap-3">
                   <div style={{ color: 'var(--global-primary)' }}>✔</div>
                   <div>
                     <strong>Safe, gentle methods that protect your furniture and décor:</strong> We use gentle, safe techniques ensuring that furniture, upholstery, and decorative items remain in excellent condition while still being cleaned thoroughly.
                   </div>
                 </li>
                 <li className="mb-3 d-flex gap-3">
                   <div style={{ color: 'var(--global-primary)' }}>✔</div>
                   <div>
                     <strong>Immaculate cleaning with a fresh, welcoming finish—guaranteed:</strong> After the cleaning, every space looks spotless, smells fresh, and feels inviting.
                   </div>
                 </li>
               </ul>
               <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-primary-custom mt-2">Schedule Free Pickup</a>
            </div>
            <div className="col-lg-6">
               <div className="bg-light radius-lg" style={{ height: '500px', border: '1px solid #EDF2F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span className="text-muted">Home Cleaning Image Placeholder</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Need */}
      <section className="section-padding" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container text-center">
          <h2 className="section-title mb-5">Home cleaning Services For every need</h2>
          <div className="row g-4 justify-content-center">
            {homeCleaningServices.map((item, idx) => (
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

      {/* Trusted Delivery */}
      <section className="section-padding bg-dark text-white text-center">
        <div className="container">
           <h2 className="fw-bold mb-5 text-white">Your Trusted Home Cleaning Service Across India</h2>
           <div className="row g-4 justify-content-center">
              {[
                { title: 'Wash & Fold', time: '48 Hrs Delivery' },
                { title: 'Wash & Steam Iron', time: '48 Hrs Delivery' },
                { title: 'Woolen Laundry', time: '48 Hrs Delivery' },
                { title: 'Express Laundry', time: 'Same Day Delivery' }
              ].map((service, i) => (
                 <div key={i} className="col-lg-3 col-md-6">
                    <div className="p-4 radius-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                       <h4 className="h6 fw-bold mb-3 text-white">{service.title}</h4>
                       <span className="badge" style={{ background: 'var(--global-primary)', color: 'white', padding: '8px 15px', borderRadius: 20 }}>
                           {service.time}
                       </span>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
