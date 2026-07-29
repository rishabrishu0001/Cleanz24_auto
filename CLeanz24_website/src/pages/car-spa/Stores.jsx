import React, { useState, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { storesData as detailedStores } from '../../data';
import SEOMeta from '../../components/SEOMeta';

const storeLocationsGrouped = [
  { state: 'Bihar', cities: ['Purnia'] },
  { state: 'Chhattisgarh', cities: ['Arjunda'] },
  { state: 'Gujarat', cities: ['Nadiad'] },
  { state: 'Haryana', cities: ['Gurugram', 'Panchkula'] },
  { state: 'Himachal Pradesh', cities: ['Una'] },
  { state: 'Karnataka', cities: ['HSR Layout', 'Padmanabhanagar', 'Varthur Hobli'] },
  { state: 'Kerala', cities: ['Cheriyamundam', 'Kannur', 'Kazhakkoottam', 'Kozhikode', 'Panoor', 'Parad', 'Parat', 'Trivandrum', 'Vaikom'] },
  { state: 'Madhya Pradesh', cities: ['Bhopal'] },
  { state: 'Maharashtra', cities: ['Alibag', 'Pimpri-Chinchwad', 'Pune', 'Thane West', 'Wakad'] },
  { state: 'Odisha', cities: ['Angul', 'Berhampur', 'Chandrasekharpur', 'CDA Cuttack', 'Jatni Khordha', 'Jeypore', 'Old Town Bhubaneswar', 'Palasuni Bhubaneswar'] },
  { state: 'Puducherry', cities: ['Mahe'] },
  { state: 'Punjab', cities: ['Amritsar', 'Bathinda', 'Kharar', 'Patiala'] },
  { state: 'Rajasthan', cities: ['Bhilwara', 'Sanchore', 'Udaipur'] },
  { state: 'Tamil Nadu', cities: ['Kalaiyarkovil', 'Karungal'] },
  { state: 'Telangana', cities: ['Beeramguda', 'Gachibowli', 'Gopanpally', 'Kokapet', 'Kondapur', 'Kukatpally', 'Narsingi', 'Secunderabad', 'Tellapur', 'Vanasthalipuram'] },
  { state: 'Uttar Pradesh', cities: ['Bhinga', 'Greater Noida', 'Greater Noida West', 'Indirapuram', 'Noida', 'Noida Extension', 'Vaishali'] },
  { state: 'Uttarakhand', cities: ['Karnaprayag', 'Roorkee'] },
  { state: 'West Bengal', cities: ['Siliguri'] }
];

const popularSearches = ["Noida", "Bengaluru", "Hyderabad", "Secunderabad", "Pune", "Gurugram"];

const comingSoonStores = [
  {
    id: 6,
    name: "Cleanz24 Premium Laundry",
    type: "Laundry",
    city: "Gopalganj",
    state: "Bihar",
    area: "Main Road",
    timeline: "Opening July 2026",
    status: "Under Construction"
  },
  // Car Spa coming soon outlets
  {
    id: 8,
    name: "Cleanz24 Car Spa Studio",
    type: "Car Spa",
    city: "Hyderabad",
    state: "Telangana",
    area: "Gachibowli",
    timeline: "Opening August 2026",
    status: "Fit-out Stage"
  },
  {
    id: 9,
    name: "Cleanz24 Detailing Lab",
    type: "Car Spa",
    city: "Bengaluru",
    state: "Karnataka",
    area: "Whitefield",
    timeline: "Opening August 2026",
    status: "Under Construction"
  },
  {
    id: 10,
    name: "Cleanz24 Car Spa Studio",
    type: "Car Spa",
    city: "Noida",
    state: "Uttar Pradesh",
    area: "Sector 62",
    timeline: "Opening September 2026",
    status: "Fit-out Stage"
  },
  {
    id: 11,
    name: "Cleanz24 Detailing Lab",
    type: "Car Spa",
    city: "Pune",
    state: "Maharashtra",
    area: "Ravet",
    timeline: "Opening September 2026",
    status: "Under Construction"
  }
];

export default function Stores() {
  const { isDarkMode } = useOutletContext() || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [comingSoonFilter, setComingSoonFilter] = useState('All');
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
    store.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (store.tags && store.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className={`stores-page ${isDarkMode ? 'text-white' : 'text-dark'}`} style={{ minHeight: '100vh', fontFamily: 'var(--font-family-base)', backgroundColor: isDarkMode ? '#000000' : '#ffffff', transition: 'background-color 0.4s ease, color 0.4s ease' }}>
      <SEOMeta
        title="Find Car Spa & Detailing Studios Near You"
        description="Find your nearest Cleanz24 Car Spa and professional detailing studio. Locate addresses, phone numbers, and get directions for our detailing outlets."
        keywords="car spa stores, car wash near me, detailing studio locator, ceramic coating near me, find car wash Noida, Cleanz24 car spa"
      />
      
      {/* Search Section / Store Locator Hero */}
      <section 
        className="d-flex align-items-center position-relative store-locator-hero"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(180deg, #000000 0%, #040e06 100%)' 
            : 'linear-gradient(180deg, #ffffff 0%, #f3faf5 100%)',
          borderBottom: isDarkMode ? '1px solid rgba(0, 201, 109, 0.15)' : '1px solid #EDF2F7',
          padding: '120px 0 80px'
        }}
      >
        {/* Emerald Glow Orb in Dark Mode */}
        {isDarkMode && (
          <div 
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '60vw', 
              height: '60vw', 
              background: 'radial-gradient(circle, rgba(0, 201, 109, 0.12) 0%, transparent 60%)', 
              zIndex: 1, 
              pointerEvents: 'none' 
            }} 
          />
        )}

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '30px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '13px', color: isDarkMode ? 'rgba(255,255,255,0.7)' : '#4A5568', alignItems: 'center' }}>
              <Link to="/car-spa" style={{ color: isDarkMode ? 'var(--primary-color)' : '#2B6CB0', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
              <span>›</span>
              <span style={{ color: isDarkMode ? '#fff' : '#1A202C', fontWeight: 600 }}>Stores</span>
            </div>
          </nav>

          <div className="row justify-content-center text-center mb-4">
            <div className="col-lg-8">
              <span 
                style={{
                  display: 'inline-block',
                  background: isDarkMode ? 'rgba(0, 201, 109, 0.15)' : 'rgba(0, 201, 109, 0.1)',
                  color: isDarkMode ? 'var(--primary-color)' : '#00a858',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '6px 18px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '16px'
                }}
              >
                📍 Detailing Network
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
                Find a Car Spa Studio Near You
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
                Search by City, State, or Area to discover nearby premium studios, master detailers, and get instant directions.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              {/* Search Bar Input */}
              <div className="car-search-pill position-relative w-100">
                <span className="car-search-icon">🔍</span>
                <input 
                  ref={searchInputRef}
                  type="text"
                  className="car-search-field fs-5"
                  placeholder="Enter City, State or Locality..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ outline: 'none' }}
                />
                {searchQuery && (
                  <button 
                    onClick={clearSearch} 
                    className="car-search-clear border-0 p-0 me-2"
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
                    className="btn btn-sm btn-outline-primary-custom rounded-pill px-3 py-1 fw-medium"
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
      <section ref={resultsRef} className="py-5" style={{ background: isDarkMode ? '#000000' : '#ffffff' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3" style={{ borderColor: isDarkMode ? 'var(--card-border)' : '#e2e8f0' }}>
            <h3 className={`h4 fw-bold mb-0 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
              {searchQuery ? `Search Results (${filteredStores.length})` : 'All Studios'}
            </h3>
            {searchQuery && (
              <button 
                onClick={clearSearch} 
                className="btn btn-sm btn-link text-brand-primary fw-semibold text-decoration-none"
              >
                Clear Search
              </button>
            )}
          </div>

          <div className="row g-4 justify-content-center">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <div key={store.id} className="col-lg-4 col-md-6">
                  <div className="car-store-result-card h-100">
                    <div className="car-store-result-header">
                      <div className="car-store-icon-wrap">
                        <span style={{ fontSize: '1.4rem' }}>📍</span>
                      </div>
                      <div>
                        <h4 className="car-store-result-name">{store.name}</h4>
                        <span className="car-store-city-tag">{store.city}, {store.state}</span>
                      </div>
                    </div>
                    
                    <p className="car-store-result-address">
                      {store.address}
                    </p>

                    {/* Google Rating Block with Inline Colored SVG */}
                    <div className="car-store-result-rating">
                      <svg aria-hidden="true" viewBox="0 0 18 18" style={{ width: '16px', height: '16px', marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
                        <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.8 2.7l2.8 2.17c1.63-1.5 2.8-3.72 2.8-6.5z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.2l-2.8-2.17c-.78.52-1.78.83-3.16.83-2.43 0-4.48-1.64-5.21-3.85L.94 12.8C2.42 15.75 5.48 18 9 18z"/>
                        <path fill="#FBBC05" d="M3.79 10.61A5.4 5.4 0 0 1 3.5 9c0-.56.1-1.1.29-1.61L.94 5.2A8.96 8.96 0 0 0 0 9c0 1.39.32 2.71.94 3.8l2.85-2.19z"/>
                        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.1C13.46.7 11.42 0 9 0 5.48 0 2.42 2.25.94 5.2l2.85 2.19C4.52 5.22 6.57 3.58 9 3.58z"/>
                      </svg>
                      <span style={{ fontSize: '0.78rem' }}>Google Rating</span>
                      <div className="ms-auto">
                        <strong style={{ fontSize: '0.85rem' }}>{store.rating}</strong>
                        <span className="text-warning ms-1">★★★★★</span>
                        <span style={{ fontSize: '0.75rem' }}> ({store.reviews})</span>
                      </div>
                    </div>

                    <div className="mb-3 pt-3 border-top" style={{ borderColor: isDarkMode ? 'var(--card-border)' : '#f1f5f9' }}>
                      <div className="d-flex align-items-center gap-2 mb-2 small" style={{ color: 'var(--text-muted)' }}>
                        <span>📞</span>
                        <span className={`fw-semibold ${isDarkMode ? 'text-heading' : 'text-dark'}`}>+91 91380 04800</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-3 small" style={{ color: 'var(--text-muted)' }}>
                        <span style={{ color: '#25D366', display: 'flex', alignItems: 'center' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.83 14.09c-.25.7-.1.97-.24 1.45-.33 1.15-1.35 1.77-2.38 1.95-1.12.19-2.3-.22-3.32-.73-2.18-1.09-3.9-2.81-4.99-4.99-.51-1.02-.92-2.2-.73-3.32.18-1.03.8-2.05 1.95-2.38.48-.14.75.01 1.45-.24.28.56.84 1.68 1.12 2.24.14.28.01.56-.14.84-.28.56-.84 1.12-.56 1.4.56 1.12 1.4 1.96 2.52 2.52.28.28.84-.28 1.4-.56.28-.14.56-.28.84-.14.56.28 1.68.84 2.24 1.12.25.14.39.42.24.71z"/></svg>
                        </span>
                        <span className="text-success fw-semibold">Available on WhatsApp</span>
                      </div>

                      {/* Detailing Guides Block */}
                      <div className="store-guides-section p-2 rounded mb-2" style={{ 
                        fontSize: '0.78rem', 
                        background: isDarkMode ? 'rgba(0, 201, 109, 0.05)' : '#f8fafc', 
                        border: isDarkMode ? '1px solid rgba(0, 201, 109, 0.2)' : '1px solid #e2e8f0' 
                      }}>
                        <span className={`fw-bold d-block mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>📖 Detailing Guides:</span>
                        <div className="d-flex flex-column gap-1">
                          <Link 
                            to={`/car-spa/blog/best-car-spa-nearby-you-${store.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${store.id}`}
                            className="text-decoration-none text-brand-primary fw-semibold"
                          >
                            • Best Car Spa Nearby
                          </Link>
                          <Link 
                            to={`/car-spa/blog/best-ceramic-coating-in-${store.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${store.id}`}
                            className="text-decoration-none text-brand-primary fw-semibold"
                          >
                            • Ceramic Coating Guide
                          </Link>
                          <Link 
                            to={`/car-spa/blog/best-ppf-paint-protection-film-in-${store.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${store.id}`}
                            className="text-decoration-none text-brand-primary fw-semibold"
                          >
                            • PPF Detailing Guide
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Store Action Buttons */}
                    <div className="car-store-result-actions">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="car-store-btn car-store-btn-outline"
                      >
                        Directions
                      </a>
                      <a 
                        href="tel:+919138004800" 
                        className="car-store-btn car-store-btn-primary"
                      >
                        Call
                      </a>
                      <a 
                        href={`https://wa.me/${store.whatsapp}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="car-store-btn car-store-btn-green"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <span className="fs-1 d-block mb-3">📍</span>
                <h4 className={`fw-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>No studios found in "{searchQuery}"</h4>
                <p className="text-muted mx-auto mb-4" style={{ maxWidth: '450px' }}>
                  We might still serve your area! We offer doorstep vehicle pickup & delivery to our nearest detailing studio.
                </p>
                <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn btn-glow px-4 py-2 fw-bold text-black rounded-pill">
                  Schedule Valet Pickup
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Coming Soon Outlets Section */}
      <section 
        className="py-5 border-top"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(180deg, #000000 0%, #040e06 100%)' 
            : 'linear-gradient(180deg, #ffffff 0%, #f3faf5 100%)',
          borderColor: isDarkMode ? 'rgba(0, 201, 109, 0.15)' : '#edf2f7'
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <span className="text-uppercase text-brand-primary fw-bold small tracking-wider" style={{ letterSpacing: '1.5px' }}>Expansion Update</span>
              <h2 className={`fw-bold mt-2 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Coming Soon Outlets</h2>
              <p className={`mt-2 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                We are expanding our presence rapidly! Check out our upcoming laundry and premium car spa franchise locations near you.
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
            <button
              onClick={() => setComingSoonFilter('All')}
              className={`btn btn-sm px-4 py-2 rounded-pill fw-semibold ${comingSoonFilter === 'All' ? 'btn-glow border border-success' : 'btn-outline-primary-custom'}`}
            >
              All Outlets
            </button>
            <button
              onClick={() => setComingSoonFilter('Laundry')}
              className={`btn btn-sm px-4 py-2 rounded-pill fw-semibold ${comingSoonFilter === 'Laundry' ? 'btn-glow border border-success' : 'btn-outline-primary-custom'}`}
            >
              🧺 Laundry
            </button>
            <button
              onClick={() => setComingSoonFilter('Car Spa')}
              className={`btn btn-sm px-4 py-2 rounded-pill fw-semibold ${comingSoonFilter === 'Car Spa' ? 'btn-glow border border-success' : 'btn-outline-primary-custom'}`}
            >
              🚗 Car Spa
            </button>
          </div>

          <div className="row g-4">
            {comingSoonStores
              .filter(store => comingSoonFilter === 'All' || store.type === comingSoonFilter)
              .map((store) => (
                <div key={store.id} className="col-lg-4 col-md-6">
                  <div 
                    className="card h-100 border-0 shadow-sm rounded-3 p-4 text-start"
                    style={{ 
                      background: isDarkMode ? '#09090b' : '#ffffff',
                      border: isDarkMode ? '1px solid rgba(0, 201, 109, 0.25)' : '1px solid #edf2f7',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span 
                        className={`badge rounded-pill px-3 py-1 fw-bold`} 
                        style={{ 
                          fontSize: '0.72rem',
                          background: store.type === 'Laundry' 
                            ? (isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(43, 108, 176, 0.1)') 
                            : (isDarkMode ? 'rgba(0, 201, 109, 0.15)' : 'rgba(0, 201, 109, 0.1)'),
                          color: store.type === 'Laundry' ? '#3b82f6' : 'var(--primary-color)'
                        }}
                      >
                        {store.type === 'Laundry' ? '🧺 Laundry' : '🚗 Car Spa'}
                      </span>
                      <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-1 fw-bold" style={{ fontSize: '0.72rem' }}>
                        {store.status}
                      </span>
                    </div>

                    <h4 className={`h5 fw-bold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{store.name}</h4>
                    <p className="text-muted small mb-3">{store.area}, {store.city}, {store.state}</p>

                    <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between" style={{ borderColor: isDarkMode ? 'rgba(0, 201, 109, 0.2)' : '#f1f5f9' }}>
                      <span className="fw-semibold text-success small">📅 {store.timeline}</span>
                      <a 
                        href={`https://wa.me/919138004800?text=${encodeURIComponent(`Hi, I'm interested in the upcoming Cleanz24 ${store.type} outlet in ${store.city} (${store.area}).`)}`}
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-decoration-none text-brand-primary small fw-bold"
                      >
                        Inquire →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-5 text-center" style={{ backgroundColor: 'var(--primary-color)' }}>
        <div className="container py-4">
          <h2 className="fw-bold mb-3" style={{ color: '#000000' }}>Can't Find a Detailer Near You?</h2>
          <p className="mx-auto mb-4" style={{ maxWidth: '600px', fontSize: '1.05rem', color: 'rgba(0, 0, 0, 0.75)', fontWeight: 500 }}>
            We've got you covered! Enjoy free doorstep vehicle transit (pickup & delivery) to our nearest detailing lab.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a 
              href="https://wa.me/919138004800?text=Hi,%20I'd%20like%20to%20schedule%20a%20doorstep%20vehicle%20pickup%20for%20detailing." 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-light px-4 py-3 fw-bold text-black rounded shadow-sm"
              style={{ background: '#ffffff', color: '#000000', border: 'none' }}
            >
              Schedule Valet Pickup
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
