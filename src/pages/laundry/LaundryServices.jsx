import React from 'react';
import { Link } from 'react-router-dom';

export default function Laundry() {
  return (
    <div className="cleanz24-official-laundry" style={{ fontFamily: '"Inter", sans-serif', color: '#2D3748', backgroundColor: '#ffffff' }}>
      <style>{`
        .cleanz24-official-laundry {
          background-color: #ffffff;
          color: #2D3748;
        }
        .cleanz24-official-laundry a {
          text-decoration: none;
        }
        .cleanz24-official-laundry .top-bar {
          background-color: #2B6CB0;
          color: white;
          padding: 8px 0;
          font-size: 14px;
        }
        .cleanz24-official-laundry .main-header {
          background-color: #ffffff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          padding: 15px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .cleanz24-official-laundry .nav-links a {
          color: #2D3748;
          font-weight: 500;
          margin: 0 15px;
          transition: color 0.3s;
        }
        .cleanz24-official-laundry .nav-links a:hover {
          color: #2B6CB0;
        }
        .cleanz24-official-laundry .hero-section {
          padding: 80px 0;
          background: #F7FAFC;
        }
        .cleanz24-official-laundry .hero-title {
          color: #1A202C;
          font-weight: 700;
          font-size: 42px;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .cleanz24-official-laundry .btn-primary {
          background-color: #2B6CB0;
          color: white;
          padding: 12px 30px;
          border-radius: 999px;
          font-weight: 600;
          display: inline-block;
          border: none;
        }
        .cleanz24-official-laundry .btn-primary:hover {
          background-color: #215387;
          color: white;
        }
        .cleanz24-official-laundry .service-card {
          background: white;
          border: 1px solid #EDF2F7;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          height: 100%;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          transition: transform 0.3s;
        }
        .cleanz24-official-laundry .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0,0,0,0.05);
        }
        .cleanz24-official-laundry .service-icon {
          width: 60px;
          height: 60px;
          background: #EBF8FF;
          color: #2B6CB0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 20px;
        }
        .cleanz24-official-laundry .section-title {
          color: #1A202C;
          font-weight: 700;
          font-size: 32px;
          margin-bottom: 40px;
          text-align: center;
        }
        .cleanz24-official-laundry .feature-box {
          display: flex;
          align-items: flex-start;
          margin-bottom: 30px;
        }
        .cleanz24-official-laundry .feature-icon {
          background: #EBF8FF;
          color: #2B6CB0;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-right: 20px;
          flex-shrink: 0;
        }
        .cleanz24-official-laundry .footer {
          background-color: #1A202C;
          color: #A0AEC0;
          padding: 60px 0 30px;
        }
        .cleanz24-official-laundry .footer h4 {
          color: white;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .cleanz24-official-laundry .footer a {
          color: #A0AEC0;
          display: block;
          margin-bottom: 10px;
        }
        .cleanz24-official-laundry .footer a:hover {
          color: white;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span style={{ color: '#2B6CB0', fontWeight: '600', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px' }}>
                Welcome to Cleanz24
              </span>
              <h1 className="hero-title mt-3">
                Your Top Choice for <br/>
                <span style={{ color: '#2B6CB0' }}>Laundry &amp; Dry-Cleaning</span>
              </h1>
              <p style={{ fontSize: '18px', color: '#4A5568', lineHeight: '1.6', marginBottom: '30px' }}>
                Tired of searching for "best laundry services near me"? Cleanz24 has you covered! Enjoy high-quality laundry and dry-cleaning at pocket-friendly prices. From daily wear to delicate garments, we deliver expert cleaning and ironing to keep your wardrobe fresh.
              </p>
              <div className="d-flex gap-3">
                <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-primary">
                  Schedule Your Pickup
                </a>
              </div>
            </div>
            
            {/* Booking Form Card matching original style */}
            <div className="col-lg-5 offset-lg-1">
              <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                <h3 style={{ color: '#1A202C', fontWeight: '700', marginBottom: '25px', textAlign: 'center' }}>Schedule Free Pickup</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#4A5568', marginBottom: '8px' }}>Name *</label>
                    <input type="text" className="form-control bg-light border-0 py-2" required />
                  </div>
                  <div className="mb-3">
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#4A5568', marginBottom: '8px' }}>Mobile Number *</label>
                    <input type="tel" className="form-control bg-light border-0 py-2" required />
                  </div>
                  <div className="mb-4">
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#4A5568', marginBottom: '8px' }}>Address *</label>
                    <textarea className="form-control bg-light border-0 py-2" rows="3" required></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-100 py-3" style={{ fontSize: '16px' }}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-5 bg-white" id="services">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span style={{ color: '#2B6CB0', fontWeight: '600', textTransform: 'uppercase', fontSize: '14px' }}>All-in-One Laundry Solutions</span>
            <h2 className="section-title mt-2">Our Range of Services</h2>
            <p style={{ color: '#718096', maxWidth: '700px', margin: '0 auto' }}>
              Want to keep your wardrobe fresh and spotless without any effort? From everyday wear to delicate fabrics, Cleanz24 takes care of it all with expert attention and care.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="service-icon">👕</div>
                <h4 style={{ color: '#1A202C', fontWeight: '600', fontSize: '18px' }}>Quick Wash & Fold</h4>
                <p style={{ color: '#718096', fontSize: '14px', marginTop: '15px', marginBottom: 0 }}>For Your Casual Wear And Everyday Essential</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="service-icon">👔</div>
                <h4 style={{ color: '#1A202C', fontWeight: '600', fontSize: '18px' }}>Wash & Steam Iron</h4>
                <p style={{ color: '#718096', fontSize: '14px', marginTop: '15px', marginBottom: 0 }}>Ensures Your Clothes Are Crisp, Wrinkle-Free, And Ready To Wear.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="service-icon">✨</div>
                <h4 style={{ color: '#1A202C', fontWeight: '600', fontSize: '18px' }}>Premium Laundry</h4>
                <p style={{ color: '#718096', fontSize: '14px', marginTop: '15px', marginBottom: 0 }}>Tailored Care For Formal Outfits And Special Fabrics</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="service-icon">🧣</div>
                <h4 style={{ color: '#1A202C', fontWeight: '600', fontSize: '18px' }}>Woolen Laundry</h4>
                <p style={{ color: '#718096', fontSize: '14px', marginTop: '15px', marginBottom: 0 }}>For Your Casual Winter Wear And Everyday Essential</p>
              </div>
            </div>
          </div>
          
          <div className="mt-5 text-center p-4 rounded" style={{ backgroundColor: '#F7FAFC', border: '1px solid #EDF2F7' }}>
            <p style={{ color: '#4A5568', margin: 0, lineHeight: '1.8' }}>
              At Cleanz24, we use advanced technology, modern washing and drying machines, and top-quality steam ironing equipment to deliver unmatched care for your clothes. Enjoy the convenience of free home pickup and delivery, with express options available when you need them fast.
            </p>
          </div>
        </div>
      </section>

      {/* One Stop Destination */}
      <section className="py-5" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="container py-5">
          <h2 className="section-title">Your One-Stop Laundry Destination</h2>
          
          <div className="row g-5 mt-2">
            <div className="col-md-6">
              <div className="feature-box">
                <div className="feature-icon">👖</div>
                <div>
                  <h4 style={{ color: '#1A202C', fontWeight: '600', fontSize: '20px' }}>Everyday Laundry</h4>
                  <p style={{ color: '#4A5568', lineHeight: '1.6' }}>Perfect for your daily wear, including casuals and work clothes, our everyday laundry service is designed to meet your daily needs with efficiency.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-box">
                <div className="feature-icon">👗</div>
                <div>
                  <h4 style={{ color: '#1A202C', fontWeight: '600', fontSize: '20px' }}>Delicate Fabric Care</h4>
                  <p style={{ color: '#4A5568', lineHeight: '1.6' }}>Our delicate fabric care service is tailored to treat your finest garments, such as silk, chiffon, and cashmere, with the utmost care.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-box">
                <div className="feature-icon">🧺</div>
                <div>
                  <h4 style={{ color: '#1A202C', fontWeight: '600', fontSize: '20px' }}>Wash And Fold</h4>
                  <p style={{ color: '#4A5568', lineHeight: '1.6' }}>Ideal for busy individuals who need hassle-free laundry, our wash and fold service offers a convenient solution. Your clothes are thoroughly washed, neatly folded, and delivered back to you, ready to be put away.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-box">
                <div className="feature-icon">🧷</div>
                <div>
                  <h4 style={{ color: '#1A202C', fontWeight: '600', fontSize: '20px' }}>Wash and Iron</h4>
                  <p style={{ color: '#4A5568', lineHeight: '1.6' }}>For Those Who Need Both Washing and crisp ironing, our Wash And Iron Service is Perfect. We wash Your Clothes With Care, then press them to perfection for a fresh, wrinkle-free finish.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
