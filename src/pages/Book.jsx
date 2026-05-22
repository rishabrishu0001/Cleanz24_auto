import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { faqsData, storesData } from '../data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';

function Book({ isDarkMode, toggleTheme }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  // Filter stores based on search query
  const filteredStores = storesData.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      
      {/* NAVBAR */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* CONVERTING LEAD FORM CARD */}
      <section id="book" className="py-5 mt-5 bg-primary-custom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <motion.div className="col-lg-6" initial="hidden" animate="visible" variants={fadeUpVariant}>
              <h1 className="display-4 fw-bold mb-4 text-gradient">READY FOR THE ULTIMATE SHINE?</h1>
              <div className="row text-center mb-5 g-3 bg-secondary-custom rounded-0 py-4 mx-0 shadow-sm" style={{ border: '1px solid var(--card-border)' }}>
                <div className="col-4 border-end" style={{ borderColor: 'var(--card-border)' }}>
                  <h3 className="fw-bold mb-0 text-brand-primary">70+</h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.75rem' }}>Wash Bays</small>
                </div>
                <div className="col-4 border-end" style={{ borderColor: 'var(--card-border)' }}>
                  <h3 className="fw-bold mb-0 text-brand-primary">43</h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.75rem' }}>Major Cities</small>
                </div>
                <div className="col-4">
                  <h3 className="fw-bold mb-0 text-brand-primary">21</h3>
                  <small className="text-uppercase tracking-wider text-muted-custom small" style={{ fontSize: '0.75rem' }}>States</small>
                </div>
              </div>
              <div className="custom-faq-wrapper mt-4">
                <h4 className="fw-bold mb-4 text-heading">FREQUENTLY ASKED QUESTIONS</h4>
                {faqsData.map((item, index) => {
                  const isDropdownOpen = openFaqIndex === index;
                  return (
                    <div className="faq-dropdown-item py-3" key={index}>
                      <div className="faq-dropdown-header d-flex align-items-center" onClick={() => toggleFaq(index)} style={{ cursor: 'pointer' }}>
                        <span className={`faq-arrow-icon ${isDropdownOpen ? 'arrow-rotated' : ''}`}>›</span>
                        <h3 className="fw-bold text-heading h6 mb-0 text-start">{item.q}</h3>
                      </div>
                      <div className={`faq-dropdown-body ${isDropdownOpen ? 'body-open' : ''}`}>
                        <div className="text-muted-custom ps-4 text-sm mt-2 text-start">{item.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div className="col-lg-6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="card bg-secondary-custom shadow-sm rounded-0 overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
                <div className="card-body p-4 p-md-5 position-relative">
                  <div className="position-absolute top-0 end-0 p-3 opacity-25" style={{ fontSize: '4rem' }}>📅</div>
                  <h3 className="card-title fw-bold mb-2 text-heading position-relative z-1">Schedule Car Wash</h3>
                  <p className="card-text text-muted-custom small mb-4 position-relative z-1">Complimentary safe pickup and transit drop operations valid across all registered hubs.</p>
                  <form onSubmit={(e) => { e.preventDefault(); alert("Booking Submitted! Our team will contact you shortly."); }} className="position-relative z-1">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold small text-uppercase text-muted-custom">Name *</label>
                      <input type="text" className="form-control py-3 rounded-0" id="name" placeholder="Enter full name" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label fw-bold small text-uppercase text-muted-custom">Mobile Number *</label>
                      <input type="tel" className="form-control py-3 rounded-0" id="mobile" placeholder="Enter mobile contact" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="address" className="form-label fw-bold small text-uppercase text-muted-custom">Address *</label>
                      <textarea className="form-control rounded-0" id="address" rows="3" placeholder="Enter location details" required></textarea>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg rounded-0 fw-bold btn-glow py-3">Submit Wash Booking</button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORES LOCATOR SECTION */}
      <section id="stores" className="py-5 bg-secondary-custom position-relative border-top" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5 text-center">
          <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '2px' }}>
            FIND HUBS
          </span>
          <h2 className="display-5 fw-bold text-heading mb-4 text-gradient">
            CLEANZ24 HUBS NEAR YOU
          </h2>
          
          <div className="store-search-container mb-5">
            <input 
              type="text" 
              className="form-control store-search-input py-3" 
              placeholder="Search By State/Pincode/Locality" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-glow rounded-0 px-4 fw-bold" onClick={() => setSearchQuery('Bangalore')}>
              BANGALORE
            </button>
          </div>

          <div className="row g-4 justify-content-center mb-5">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <div className="col-lg-4 col-md-6" key={store.id}>
                  <div className="premium-card store-card h-100 text-start">
                    <h4 className="text-heading fw-bold mb-2">{store.name}</h4>
                    <p className="store-address text-muted-custom small mb-4">{store.address}</p>
                    <div className="google-rating d-flex align-items-center mb-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="google-icon me-2" style={{ width: '18px' }} />
                      <span className="text-muted-custom text-xs font-normal">Google Rating</span>
                      <div className="ms-auto text-heading fw-semibold">
                        {store.rating} <span className="stars text-warning">★★★★★</span> ({store.reviews})
                      </div>
                    </div>
                    <div className="store-btn-grid d-flex flex-wrap gap-2">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`} target="_blank" rel="noreferrer" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">Directions</a>
                      <a href="tel:+919138004800" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">Call Now</a>
                      <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="store-btn btn btn-outline-secondary btn-sm flex-grow-1 text-center text-decoration-none">WhatsApp</a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 py-4">
                <p className="text-muted-custom">No detailing hubs found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Book;
