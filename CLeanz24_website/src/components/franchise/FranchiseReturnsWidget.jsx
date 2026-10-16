'use client';

import React, { useState, useEffect } from 'react';
import { GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL } from '../../config';

// ── Exact Business Metrics Matrix (Identical to Franchise Page) ─────────────
export const CALCULATOR_DATA = {
  tier1: {
    name: 'Delhi NCR, Mumbai, Pune, Bengaluru, Hyderabad (Tier-1)',
    alpha: { name: 'Alpha Model', investment: '₹13 Lacs', revenue: '₹2 – 4 Lakhs', profit: '₹12 – 18 Lakhs', payback: '20 – 24 Months' },
    beta: { name: 'Beta Model', investment: '₹15 Lacs', revenue: '₹4 – 5 Lakhs', profit: '₹15 – 24 Lakhs', payback: '18 – 22 Months' },
    combo: { name: 'Combo Model', investment: '₹22 Lacs', revenue: '₹6 – 8 Lakhs', profit: '₹18 – 30 Lakhs', payback: '18 – 22 Months' },
    hydro: { name: 'Hydro-Carbon Model', investment: '₹35 Lacs+', revenue: '₹7 – 10 Lakhs', profit: '₹24 – 36 Lakhs', payback: '18 – 22 Months' },
  },
  tier2: {
    name: 'Tier-2 Cities (Lucknow, Jaipur, Patna, etc.)',
    alpha: { name: 'Alpha Model', investment: '₹13 Lacs', revenue: '₹2 – 3 Lakhs', profit: '₹12 – 18 Lakhs', payback: '20 – 24 Months' },
    beta: { name: 'Beta Model', investment: '₹15 Lacs', revenue: '₹3 – 4 Lakhs', profit: '₹15 – 20 Lakhs', payback: '18 – 22 Months' },
    combo: { name: 'Combo Model', investment: '₹22 Lacs', revenue: '₹4 – 6 Lakhs', profit: '₹20 – 24 Lakhs', payback: '18 – 22 Months' },
    hydro: { name: 'Hydro-Carbon Model', investment: '₹35 Lacs+', revenue: '₹6 – 8 Lakhs', profit: '₹24 – 30 Lakhs', payback: '18 – 22 Months' },
  },
  tier3: {
    name: 'Tier-3 Cities / Regional Towns',
    alpha: { name: 'Alpha Model', investment: '₹13 Lacs', revenue: '₹1.5 – 2.5 Lakhs', profit: '₹8 – 12 Lakhs', payback: '20 – 24 Months' },
    beta: { name: 'Beta Model', investment: '₹15 Lacs', revenue: '₹2.5 – 3.5 Lakhs', profit: '₹15 – 24 Lakhs', payback: '18 – 22 Months' },
    combo: { name: 'Combo Model', investment: '₹22 Lacs', revenue: '₹3.5 – 5 Lakhs', profit: '₹18 – 22 Lakhs', payback: '18 – 22 Months' },
    hydro: { name: 'Hydro-Carbon Model', investment: '₹35 Lacs+', revenue: '₹5 – 7 Lakhs', profit: '₹22 – 28 Lakhs', payback: '18 – 22 Months' },
  },
};

export default function FranchiseReturnsWidget({ initialModel = 'alpha', onModelChange }) {
  const [calcTier, setCalcTier] = useState('tier1');
  const [calcModel, setCalcModel] = useState(initialModel || 'alpha');

  // Lead modal state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    budget: '₹13L - ₹15L (Alpha Model)',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Sync with prop when changed externally
  useEffect(() => {
    if (initialModel && initialModel !== calcModel) {
      setCalcModel(initialModel);
    }
  }, [initialModel]);

  const activeCalcData = CALCULATOR_DATA[calcTier]?.[calcModel] || CALCULATOR_DATA.tier1.alpha;

  const handleSelectModel = (id) => {
    setCalcModel(id);
    let b = '₹13L - ₹15L (Alpha Model)';
    if (id === 'beta') b = '₹15L - ₹20L (Beta Model)';
    else if (id === 'combo') b = '₹22L - ₹25L (Combo Model)';
    else if (id === 'hydro') b = '₹35L+ (Hydro-Carbon Studio)';
    setFormData((prev) => ({ ...prev, budget: b }));
    if (typeof onModelChange === 'function') onModelChange(id);
  };

  const handleOpenReportModal = () => {
    let b = '₹13L - ₹15L (Alpha Model)';
    if (calcModel === 'beta') b = '₹15L - ₹20L (Beta Model)';
    else if (calcModel === 'combo') b = '₹22L - ₹25L (Combo Model)';
    else if (calcModel === 'hydro') b = '₹35L+ (Hydro-Carbon Studio)';
    setFormData((prev) => ({ ...prev, budget: b }));
    setSubmitted(false);
    setFormError('');
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.city.trim()) {
      setFormError('Please fill all required fields.');
      return;
    }
    if (formData.phone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const dateStr = new Date().toISOString().split('T')[0];
    const payload = {
      date: dateStr,
      Date: dateStr,
      timestamp: dateStr,
      name: formData.name.trim(),
      mobile: `'+91 ${formData.phone.trim()}`,
      email: formData.email.trim(),
      city: formData.city.trim(),
      budget: formData.budget,
      modelType: `Franchise Blog Report - ${formData.budget}`,
    };

    try {
      // 1. Post to API route
      fetch('/api/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          mobile: formData.phone.trim(),
          email: formData.email.trim(),
          city: formData.city.trim(),
          modelType: `Franchise Blog Returns Widget - ${formData.budget}`,
        }),
      }).catch((err) => console.error('API route lead err:', err));

      // 2. Post to Google Sheets
      if (GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL) {
        await fetch(GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload),
        });
      }

      // Conversion tracking
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { 'send_to': 'AW-16562330559/Ly9XCOC_iLQaEL-3xNk9' });
        window.gtag('event', 'laundry_franchise_lead', {
          event_category: 'Franchise Blog',
          event_label: 'Returns Calculator Lead',
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="returns-calculator"
      style={{
        margin: '40px 0',
        padding: '36px 24px',
        borderRadius: 24,
        background: '#f0faf2',
        border: '1.5px solid #d1fae5',
        boxShadow: '0 12px 35px rgba(22,163,74,0.06)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Title & Badge */}
      <div className="text-center mb-4">
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 800,
            color: '#16a34a',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            background: '#dcfce7',
            padding: '4px 14px',
            borderRadius: '20px',
            display: 'inline-block',
            marginBottom: 8,
          }}
        >
          INTERACTIVE WIDGET
        </span>
        <h3
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(22px, 3vw, 32px)',
            color: '#0f172a',
            margin: '6px 0',
          }}
        >
          Calculate Your Estimated <span style={{ color: '#16a34a' }}>Franchise Returns</span>
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: 640, margin: '8px auto 0' }}>
          Select your city tier and franchise model to view exact projected revenue, annual profit &amp; payback period.
        </p>
      </div>

      {/* Main Calculator Box */}
      <div
        style={{
          maxWidth: 860,
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: 22,
          padding: '32px 24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          border: '1.5px solid #d1fae5',
        }}
      >
        <div className="row g-4 align-items-center">
          {/* Inputs Column */}
          <div className="col-12 col-lg-6">
            <label style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, display: 'block', color: '#1e293b' }}>
              1. Select Location / City Tier
            </label>
            <select
              value={calcTier}
              onChange={(e) => setCalcTier(e.target.value)}
              aria-label="Select City Tier"
              style={{
                width: '100%',
                padding: '13px 16px',
                borderRadius: 12,
                border: '1.5px solid #e2e8f0',
                background: '#f8fafc',
                color: '#0f172a',
                fontWeight: 600,
                fontSize: '0.92rem',
                outline: 'none',
                marginBottom: 20,
              }}
            >
              <option value="tier1">Delhi NCR, Mumbai, Pune, Bengaluru, Hyderabad (Tier-1)</option>
              <option value="tier2">Tier-2 Cities (Lucknow, Jaipur, Patna, etc.)</option>
              <option value="tier3">Tier-3 Cities / Regional Towns</option>
            </select>

            <label style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, display: 'block', color: '#1e293b' }}>
              2. Select Franchise Model
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { id: 'alpha', label: 'Alpha Model', inv: '₹13 Lacs' },
                { id: 'beta', label: 'Beta Model', inv: '₹15 Lacs' },
                { id: 'combo', label: 'Combo Model', inv: '₹22 Lacs' },
                { id: 'hydro', label: 'Hydro-Carbon', inv: '₹35 Lacs+' },
              ].map((m) => {
                const isSelected = calcModel === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelectModel(m.id)}
                    aria-pressed={isSelected}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 10,
                      border: isSelected ? '2px solid #16a34a' : '1.5px solid #e2e8f0',
                      background: isSelected ? '#ecfdf5' : '#f8fafc',
                      color: isSelected ? '#16a34a' : '#334155',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(22,163,74,0.12)' : 'none',
                    }}
                  >
                    <div>{m.label}</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, opacity: 0.85, marginTop: 2 }}>{m.inv}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Calculation Output Column */}
          <div className="col-12 col-lg-6">
            <div
              style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                borderRadius: 20,
                padding: '24px 20px',
                border: '1.5px solid #86efac',
              }}
            >
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#15803d',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: 16,
                }}
              >
                🎯 ESTIMATED METRICS: {activeCalcData.name.toUpperCase()} ({activeCalcData.investment})
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 14,
                  paddingBottom: 12,
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#334155' }}>Monthly Revenue:</span>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#16a34a' }}>
                  {activeCalcData.revenue} / mo
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 14,
                  paddingBottom: 12,
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#334155' }}>Annual Net Profit:</span>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#2563eb' }}>
                  {activeCalcData.profit} / yr
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#334155' }}>Payback Period:</span>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#d97706' }}>
                  {activeCalcData.payback}
                </span>
              </div>
            </div>

            {/* ROI Disclaimer Note */}
            <div
              style={{
                marginTop: 12,
                padding: '10px 14px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '0.9rem', lineHeight: 1.4, color: '#64748b' }}>ℹ️</span>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45 }}>
                <strong style={{ color: '#475569' }}>Disclaimer:</strong> Results are based on historical performance of existing studios and may vary based on location and operations.
              </p>
            </div>
          </div>
        </div>

        {/* Soft CTA Button */}
        <div style={{ textAlign: 'center', marginTop: 28, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
          <button
            type="button"
            onClick={handleOpenReportModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              padding: '14px 32px',
              borderRadius: 12,
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(15,23,42,0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            Get Your Personalized Franchise Report →
          </button>
        </div>
      </div>

      {/* ── Franchise Report Modal ── */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            backdropFilter: 'blur(6px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              maxWidth: 480,
              width: '100%',
              padding: 28,
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              border: '1.5px solid #d1fae5',
            }}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 700,
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, color: '#16a34a', marginBottom: 6 }}>
                  Application Submitted!
                </h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: 16 }}>
                  Thank you <strong>{formData.name}</strong>! Our franchise manager will contact you at <strong>+91 {formData.phone}</strong> with the full financial deck and location analysis.
                </p>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    background: '#16a34a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    padding: '10px 24px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'inline-block', background: '#dcfce7', borderRadius: 20, padding: '3px 12px', marginBottom: 10 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d' }}>OFFICIAL CLEANZ24 REPORT</span>
                </div>
                <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: '#0f172a', margin: '4px 0 6px' }}>
                  Get Your Franchise Report 🚀
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 16px' }}>
                  Detailed unit economics, machinery battery, and territory feasibility report for <strong>{formData.budget}</strong>.
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                      Mobile Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleFormChange}
                      maxLength={10}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                      Target City / Location *
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Noida / Pune / Bengaluru"
                      value={formData.city}
                      onChange={handleFormChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                      Preferred Franchise Model *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    >
                      <option value="₹13L - ₹15L (Alpha Model)">₹13L - ₹15L (Alpha Model)</option>
                      <option value="₹15L - ₹20L (Beta Model)">₹15L - ₹20L (Beta Model)</option>
                      <option value="₹22L - ₹25L (Combo Model)">₹22L - ₹25L (Combo Model)</option>
                      <option value="₹35L+ (Hydro-Carbon Studio)">₹35L+ (Hydro-Carbon Studio)</option>
                    </select>
                  </div>

                  {formError && (
                    <div style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: 10, fontWeight: 600 }}>
                      ⚠️ {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '13px',
                      borderRadius: 10,
                      border: 'none',
                      background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      fontFamily: "'Poppins', sans-serif",
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(22,163,74,0.3)',
                    }}
                  >
                    {isSubmitting ? 'Submitting Application...' : '🚀 Request Free Franchise Deck →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
