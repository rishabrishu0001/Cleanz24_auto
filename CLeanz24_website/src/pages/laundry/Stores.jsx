import React, { useState, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { storesData as detailedStores } from '../../data';
import SEOMeta from '../../components/SEOMeta';
import storesBg from '../../assets/stores_bg.jpg';

const storeLocationsGrouped = [
  { state: 'Bihar', cities: ['Purnia'] },
  { state: 'Chhattisgarh', cities: ['Arjunda'] },
  { state: 'Gujarat', cities: ['Nadiad'] },
  { state: 'Haryana', cities: ['Gurugram', 'Panchkula'] },
  { state: 'Himachal Pradesh', cities: ['Una'] },
  { state: 'Karnataka', cities: ['HSR Layout', 'Padmanabhanagar', 'Varthur Hobli'] },
  { state: 'Kerala', cities: ['Kannur', 'Kozhikode', 'Panoor', 'Parat', 'Trivandrum', 'Vaikom'] },
  { state: 'Madhya Pradesh', cities: ['Bhopal'] },
  { state: 'Maharashtra', cities: ['Alibag', 'Pune', 'Thane West'] },
  { state: 'Odisha', cities: ['Angul', 'Berhampur', 'Bomikhal', 'Chandrasekharpur', 'Jatni', 'Jeypore', 'Kharakhia'] },
  { state: 'Puducherry', cities: ['Mahe'] },
  { state: 'Punjab', cities: ['Amritsar', 'Bathinda', 'Kharar', 'Patiala'] },
  { state: 'Rajasthan', cities: ['Bhilwara', 'Sanchore', 'Udaipur'] },
  { state: 'Tamil Nadu', cities: ['Kalaiyarkovil', 'Karungal'] },
  { state: 'Telangana', cities: ['Beeramguda', 'Gachibowli', 'Gopanpally', 'Kondapur', 'Narsingi', 'Vanasthalipuram'] },
  { state: 'Uttar Pradesh', cities: ['Bhinga', 'Greater Noida', 'Greater Noida West', 'Indirapuram', 'Noida', 'Noida Extension'] },
  { state: 'Uttarakhand', cities: ['Karnaprayag', 'Roorkee'] },
  { state: 'West Bengal', cities: ['Siliguri'] }
];

const popularSearches = ["Noida", "Bengaluru", "Hyderabad", "Pune", "Gurugram"];

export default function Stores() {
  const { isDarkMode } = useOutletContext() || {};
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);

  const handleCityClick = (city) => {
    setSearchQuery(city);
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const filteredStores = detailedStores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="stores-page bg-light" style={{ minHeight: '100vh', fontFamily: 'var(--font-family-base)' }}>
      <SEOMeta
        title="Find Laundry Stores & Outlets Near You"
        description="Find your nearest Cleanz24 laundry and dry cleaning store. Locate addresses, phone numbers, and WhatsApp links for all our 100+ stores across India."
        keywords="laundry stores, laundry near me, dry cleaning store locator, find laundry Noida, find laundry Delhi, Cleanz24 outlets"
      />
      {/* Search Section / Store Locator Hero */}
      <section 
        className="d-flex align-items-center position-relative store-locator-hero"
        style={{
          backgroundImage: isDarkMode 
            ? `linear-gradient(rgba(11, 26, 48, 0.88), rgba(11, 26, 48, 0.88)), url(${storesBg})` 
            : `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url(${storesBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          borderBottom: isDarkMode ? '1px solid #1b3252' : '1px solid #EDF2F7'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '30px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '13px', color: isDarkMode ? 'rgba(255,255,255,0.7)' : '#4A5568', alignItems: 'center' }}>
              <Link to="/laundry" style={{ color: isDarkMode ? '#90CDF4' : '#2B6CB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
              <span>›</span>
              <span style={{ color: isDarkMode ? '#fff' : '#1A202C', fontWeight: 600 }}>Stores</span>
            </div>
          </nav>

          <div className="row justify-content-center text-center mb-4">
            <div className="col-lg-8">
              <span 
                style={{
                  display: 'inline-block',
                  background: isDarkMode ? 'rgba(59, 125, 216, 0.15)' : 'rgba(43, 108, 176, 0.1)',
                  color: isDarkMode ? '#90CDF4' : '#2B6CB0',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '6px 18px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '16px'
                }}
              >
                📍 Store Locator
              </span>
              <h2 
                className="fw-bold mt-2 mb-3"
                style={{
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  color: isDarkMode ? '#fff' : '#1A202C',
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.25
                }}
              >
                Find a Cleanz24 Store Near You
              </h2>
              <p 
                style={{ 
                  color: isDarkMode ? '#CBD5E0' : '#4A5568',
                  maxWidth: '650px',
                  margin: '0 auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}
              >
                Search by City, State, or Area to discover nearby stores, contact numbers, and get instant directions.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              {/* Search Bar Input */}
              <div className="store-search-pill position-relative w-100">
                <span className="store-search-icon">🔍</span>
                <input 
                  ref={searchInputRef}
                  type="text"
                  className="store-search-field fs-5"
                  placeholder="Enter City, State or Locality..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ outline: 'none' }}
                />
                {searchQuery && (
                  <button 
                    onClick={clearSearch} 
                    className="store-search-clear border-0 p-0 me-2"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Popular Searches Quick Filters */}
              <div className="mt-4 d-flex flex-wrap gap-2 align-items-center justify-content-center">
                <span className="small fw-semibold" style={{ color: isDarkMode ? '#A0AEC0' : '#718096' }}>Popular Searches:</span>
                {popularSearches.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCityClick(city)}
                    className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-medium"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Dynamic Results Grid */}
      <section ref={resultsRef} className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h3 className="h4 fw-bold text-dark mb-0">
              {searchQuery ? `Search Results (${filteredStores.length})` : 'All Stores'}
            </h3>
            {searchQuery && (
              <button 
                onClick={clearSearch} 
                className="btn btn-sm btn-link text-primary fw-semibold text-decoration-none"
              >
                Clear Search
              </button>
            )}
          </div>

          <div className="row g-4 justify-content-center">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <div key={store.id} className="col-lg-4 col-md-6">
                  <div className="card h-100 border-0 shadow-sm rounded-3 p-4 transition bg-white" style={{ transition: 'all 0.3s ease' }}>
                    <div className="card-body p-0 d-flex flex-column h-100">
                      <div className="d-flex align-items-start gap-2 mb-3">
                        <span className="fs-4">📍</span>
                        <div>
                          <h4 className="h5 fw-bold text-dark mb-1">{store.name}</h4>
                          <Link 
                            to={`/laundry/${store.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1 font-semibold text-decoration-none" 
                            style={{ fontSize: '0.72rem' }}
                          >
                            {store.city}, {store.state}
                          </Link>
                        </div>
                      </div>
                      
                      <p className="text-muted small flex-grow-1 mb-4" style={{ lineHeight: '1.6' }}>
                        {store.address}
                      </p>

                      <div className="mb-4 pt-3 border-top" style={{ borderColor: '#f1f5f9' }}>
                        <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
                          <span>📞</span>
                          <span className="fw-semibold text-dark">+91 91380 04800</span>
                        </div>
                         <div className="d-flex align-items-center gap-2 mb-3 text-muted small">
                          <span style={{ color: '#25D366', display: 'flex', alignItems: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.83 14.09c-.25.7-.1.97-.24 1.45-.33 1.15-1.35 1.77-2.38 1.95-1.12.19-2.3-.22-3.32-.73-2.18-1.09-3.9-2.81-4.99-4.99-.51-1.02-.92-2.2-.73-3.32.18-1.03.8-2.05 1.95-2.38.48-.14.75.01 1.45-.24.28.56.84 1.68 1.12 2.24.14.28.01.56-.14.84-.28.56-.84 1.12-.56 1.4.56 1.12 1.4 1.96 2.52 2.52.28.28.84-.28 1.4-.56.28-.14.56-.28.84-.14.56.28 1.68.84 2.24 1.12.25.14.39.42.24.71z"/></svg>
                          </span>
                          <span className="text-success fw-semibold">Available on WhatsApp</span>
                        </div>
                        
                        <div className="store-guides-section p-2 rounded mb-2" style={{ fontSize: '0.78rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                          <span className="fw-bold text-dark d-block mb-1">📖 Local Guides:</span>
                          <div className="d-flex flex-column gap-1">
                            <Link 
                              to={`/laundry/blog/best-laundry-nearby-you-${store.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${store.id}`}
                              className="text-decoration-none text-primary fw-semibold"
                            >
                              • Best Laundry Nearby
                            </Link>
                            <Link 
                              to={`/laundry/blog/best-laundry-dry-cleaning-store-in-${store.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${store.id}`}
                              className="text-decoration-none text-primary fw-semibold"
                            >
                              • Dry Cleaning Guide
                            </Link>
                            <Link 
                              to={`/laundry/blog/trusted-laundry-store-in-${store.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${store.id}`}
                              className="text-decoration-none text-primary fw-semibold"
                            >
                              • Trusted Store Guide
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Store Buttons */}
                      <div className="d-flex gap-2">
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-outline-secondary btn-sm flex-grow-1 py-2 fw-semibold text-center text-decoration-none"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Directions
                        </a>
                        <a 
                          href="tel:+919138004800" 
                          className="btn btn-outline-primary btn-sm flex-grow-1 py-2 fw-semibold text-center text-decoration-none"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Call
                        </a>
                        <a 
                          href={`https://wa.me/${store.whatsapp}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-success btn-sm flex-grow-1 py-2 fw-semibold text-center text-decoration-none text-white"
                          style={{ fontSize: '0.8rem' }}
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <span className="fs-1 d-block mb-3">📍</span>
                <h4 className="fw-bold text-dark">No stores found in "{searchQuery}"</h4>
                <p className="text-muted mx-auto mb-4" style={{ maxWidth: '450px' }}>
                  We might still serve your area! We offer free doorstep laundry pickup and delivery in many cities.
                </p>
                <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn btn-primary px-4 py-2 fw-bold text-white rounded-pill">
                  Book Doorstep Pickup
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Browse by State Section */}
      <section 
        className="py-5 border-top"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(180deg, #081426 0%, #0d1f36 100%)' 
            : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          borderColor: isDarkMode ? '#1b3252' : '#edf2f7'
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <span className="text-uppercase text-primary fw-bold small tracking-wider">Quick Browse</span>
              <h2 className="fw-bold text-dark mt-2">Browse Outlets By State</h2>
              <p className="text-muted mt-2">
                Click on any city tag below to automatically filter stores and display the locations in that region.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {storeLocationsGrouped.map((loc, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="bg-light p-4 rounded-3 h-100 border border-light" style={{ border: '1px solid #edf2f7' }}>
                  <h3 className="h5 fw-bold text-primary mb-3 border-bottom pb-2" style={{ color: 'var(--global-primary)' }}>
                    {loc.state}
                  </h3>
                  <div className="d-flex flex-wrap gap-2">
                    {loc.cities.map((city, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleCityClick(city)}
                        className="btn btn-light btn-sm bg-white border px-3 py-2 rounded-pill text-muted fw-semibold transition"
                        style={{ fontSize: '0.78rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--global-primary)';
                          e.currentTarget.style.color = 'var(--global-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#f1f5f9';
                          e.currentTarget.style.color = '#6c757d';
                        }}
                      >
                        📍 {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-5 text-center text-white" style={{ backgroundColor: 'var(--global-primary)' }}>
        <div className="container py-4">
          <h2 className="fw-bold mb-3">Can't Find a Store Near You?</h2>
          <p className="text-white-50 mx-auto mb-4" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
            We've got you covered! Enjoy free doorstep pickup and delivery in select localities. Contact us to schedule.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn btn-light px-4 py-3 fw-bold text-primary rounded shadow-sm">
              Schedule Free Pickup
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
