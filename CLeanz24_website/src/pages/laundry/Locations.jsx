import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storesData } from '../../data';
import SEOMeta from '../../components/SEOMeta';

// Helper to slugify city names
const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export default function Locations() {
  const [activeTab, setActiveTab] = useState('All');

  // Group stores by State and then City
  const stateGroups = storesData.reduce((acc, store) => {
    const state = store.state || 'Other';
    const city = store.city || 'Other';
    
    if (!acc[state]) {
      acc[state] = {};
    }
    if (!acc[state][city]) {
      acc[state][city] = [];
    }
    acc[state][city].push(store);
    return acc;
  }, {});

  // Sort states alphabetically
  const sortedStates = Object.keys(stateGroups).sort();

  // Get all unique states
  const statesList = ['All', ...sortedStates];

  return (
    <div style={{ background: '#F7FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <SEOMeta
        title="Find Premium Laundry & Dry Cleaning Outlets Near You"
        description="Browse Cleanz24's store locator to find our closest laundry & dry cleaning outlet in your city. Premium services with free home pickup and delivery."
        canonical="https://cleanz24.com/locations"
      />

      {/* Hero Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1A365D 0%, #2A4365 50%, #2B6CB0 100%)',
          color: '#fff',
          padding: '80px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '30px',
              fontSize: '13px',
              fontWeight: 700,
              padding: '6px 20px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px',
            }}
          >
            🏪 Store Locator & Directory
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              marginBottom: '16px',
            }}
          >
            Cleanz24 Laundry Network in India
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '17px',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            With 61+ outlets across the nation, professional laundry, dry cleaning, and specialized premium fabric care is always close to your doorstep.
          </motion.p>
        </div>
      </section>

      {/* Directory Grid */}
      <div className="container" style={{ marginTop: '40px', padding: '0 16px' }}>
        
        {/* State Tabs */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '10px',
            marginBottom: '40px',
            paddingBottom: '12px',
            scrollbarWidth: 'none',
            justifyContent: 'flex-start',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          {statesList.map((state) => (
            <button
              key={state}
              onClick={() => setActiveTab(state)}
              style={{
                flexShrink: 0,
                background: activeTab === state ? '#2B6CB0' : '#fff',
                color: activeTab === state ? '#fff' : '#4A5568',
                border: activeTab === state ? 'none' : '1px solid #E2E8F0',
                borderRadius: '30px',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              }}
            >
              {state}
            </button>
          ))}
        </div>

        {/* Directory Content */}
        <div className="row g-4">
          {sortedStates
            .filter((state) => activeTab === 'All' || activeTab === state)
            .map((state) => {
              const cities = stateGroups[state];
              return (
                <div key={state} className="col-12 col-md-6 col-lg-4" style={{ marginBottom: '24px' }}>
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: '16px',
                      padding: '30px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                      border: '1px solid #EDF2F7',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#1A365D',
                        fontFamily: "'Poppins', sans-serif",
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        borderBottom: '2px solid #EBF8FF',
                        paddingBottom: '12px',
                      }}
                    >
                      📍 {state}
                    </h2>
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
                      {Object.keys(cities).sort().map((city) => {
                        const stores = cities[city];
                        const citySlug = slugify(city);
                        return (
                          <li
                            key={city}
                            style={{
                              padding: '10px 0',
                              borderBottom: '1px dashed #EDF2F7',
                            }}
                          >
                            <Link
                              to={`/laundry/${citySlug}`}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: '#2D3748',
                                fontWeight: 500,
                                fontSize: '15px',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#2B6CB0';
                                e.currentTarget.style.transform = 'translateX(4px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#2D3748';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              <span>{city}</span>
                              <span
                                style={{
                                  background: '#EBF8FF',
                                  color: '#2B6CB0',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  borderRadius: '12px',
                                  padding: '2px 8px',
                                }}
                              >
                                {stores.length} {stores.length === 1 ? 'store' : 'stores'} ➜
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
