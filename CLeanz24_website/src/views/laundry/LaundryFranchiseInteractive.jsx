'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FRANCHISE_CITIES } from '../../data/franchiseCities';
import { GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL } from '../../config';
import storeimg1 from '../../assets/storeimg1.jpeg';
import storeimg2 from '../../assets/storeimg2.jpeg';
import storeimg3 from '../../assets/storeimg3.jpeg';
import storeimg4 from '../../assets/storeimg4.jpeg';
import storeimg5 from '../../assets/storeimg5.jpeg';
import storeimg6 from '../../assets/storeimg6.jpeg';
import storeimg7 from '../../assets/storeimg7.jpeg';

const storeImages = [
  '/assets/store_hero.jpg',
  storeimg1,
  storeimg2,
  storeimg3,
  storeimg4,
  storeimg5,
  storeimg6,
  storeimg7,
];

// ─── ROI Calculator Data ──────────────────────────────────────────────────
const CALCULATOR_DATA = {
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

// ─── Hero Slideshow ─────────────────────────────────────────────────────────
function HeroSlideshow() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % storeImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'relative', width: '100%', height: 'clamp(280px, 45vh, 460px)',
      borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 16px 48px rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.08)',
    }}>
      {storeImages.map((src, i) => (
        <img
          key={i}
          src={typeof src === 'string' ? src : (src?.src || '')}
          alt={`Cleanz24 laundry franchise store interior — store ${i + 1}`}
          width={600}
          height={460}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center', borderRadius: 20,
            opacity: activeIdx === i ? 1 : 0,
            transform: activeIdx === i ? 'scale(1.03)' : 'scale(1)',
            transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
            zIndex: activeIdx === i ? 2 : 1,
          }}
        />
      ))}
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '90px', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)', zIndex: 3 }} />
      {/* Dots navigation */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 7, zIndex: 4 }}>
        {storeImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActiveIdx(i)}
            style={{
              width: activeIdx === i ? 24 : 8, height: 8, borderRadius: 4,
              background: activeIdx === i ? '#22c55e' : 'rgba(255,255,255,0.6)',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'width 0.35s ease, background 0.3s', outline: 'none',
            }}
          />
        ))}
      </div>
      {/* Store count badge */}
      <div style={{
        position: 'absolute', top: 16, right: 16,
        background: 'rgba(22, 101, 52, 0.95)', color: '#fff', borderRadius: 30,
        padding: '6px 16px', fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif',
        fontWeight: 700, letterSpacing: '0.5px', zIndex: 4, backdropFilter: 'blur(6px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}>
        📍 100+ Stores Across India
      </div>
    </div>
  );
}

// ─── ROI Calculator ──────────────────────────────────────────────────────────
function ROICalculator() {
  const [calcTier, setCalcTier] = useState('tier1');
  const [calcModel, setCalcModel] = useState('beta');
  const activeCalcData = CALCULATOR_DATA[calcTier]?.[calcModel] || CALCULATOR_DATA.tier1.beta;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', background: '#ffffff', borderRadius: 24, padding: '36px 28px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', border: '1.5px solid #d1fae5' }}>
      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <label style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, display: 'block' }}>1. Select Location / City Tier</label>
          <select
            value={calcTier}
            onChange={e => setCalcTier(e.target.value)}
            aria-label="Select city tier for ROI calculation"
            style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', fontWeight: 600, fontSize: '0.92rem', outline: 'none', marginBottom: 20 }}
          >
            <option value="tier1">Delhi NCR, Mumbai, Pune, Bengaluru, Hyderabad (Tier-1)</option>
            <option value="tier2">Tier-2 Cities (Lucknow, Jaipur, Patna, etc.)</option>
            <option value="tier3">Tier-3 Cities / Regional Towns</option>
          </select>

          <label style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, display: 'block' }}>2. Select Franchise Model</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { id: 'alpha', label: 'Alpha Model', inv: '₹13 Lacs' },
              { id: 'beta', label: 'Beta Model', inv: '₹15 Lacs' },
              { id: 'combo', label: 'Combo Model', inv: '₹22 Lacs' },
              { id: 'hydro', label: 'Hydro-Carbon', inv: '₹35 Lacs+' },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setCalcModel(m.id)}
                aria-pressed={calcModel === m.id}
                aria-label={`Select ${m.label} — Investment ${m.inv}`}
                style={{
                  padding: '12px 10px', borderRadius: 10,
                  border: calcModel === m.id ? '2px solid #16a34a' : '1.5px solid #e2e8f0',
                  background: calcModel === m.id ? '#ecfdf5' : '#f8fafc',
                  color: calcModel === m.id ? '#16a34a' : '#334155',
                  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <div>{m.label}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.85, marginTop: 2 }}>{m.inv}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-lg-6">
          <div style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', borderRadius: 20, padding: 24, border: '1.5px solid #86efac' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>
              🎯 ESTIMATED METRICS: {activeCalcData.name.toUpperCase()} ({activeCalcData.investment})
            </div>
            {[
              { label: 'Monthly Revenue:', value: `${activeCalcData.revenue} / mo`, color: '#16a34a' },
              { label: 'Annual Net Profit:', value: `${activeCalcData.profit} / yr`, color: '#2563eb' },
              { label: 'Payback Period:', value: activeCalcData.payback, color: '#d97706' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i < 2 ? 14 : 0, paddingBottom: i < 2 ? 12 : 0, borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{row.label}</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid #f1f5f9', width: '100%' }}>
          <a
            href="#franchise-form"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#0f172a', color: '#ffffff', textDecoration: 'none',
              padding: '14px 32px', borderRadius: 12, fontWeight: 700,
              fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem',
            }}
          >
            Get Your Personalized Franchise Report →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Franchise Application Form ──────────────────────────────────────────────
function FranchiseForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', budget: '₹13L - ₹15L (Alpha Model)' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = e => {
    const { id, value } = e.target;
    if (id === 'phone') {
      setFormData(prev => ({ ...prev, [id]: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleFinalSubmit = async e => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const dateStr = new Date().toISOString().split('T')[0];
      const payload = {
        date: dateStr, Date: dateStr, timestamp: dateStr,
        name: formData.name, mobile: `'+91 ${formData.phone}`,
        email: formData.email || 'N/A', city: formData.city, budget: formData.budget,
        modelType: 'Main Franchise Form',
      };
      await fetch(GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { 'send_to': 'AW-16562330559/Ly9XCOC_iLQaEL-3xNk9' });
        window.gtag('event', 'laundry_franchise_lead', { 'event_category': 'Franchise', 'event_label': 'Main Form Submission' });
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="franchise_form" style={{ background: '#ffffff', borderRadius: 24, padding: '40px 32px', border: '2px solid #86efac', boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}>
      <div style={{ background: '#dcfce7', borderRadius: 12, padding: '10px 16px', textAlign: 'center', marginBottom: 24, color: '#15803d', fontWeight: 700, fontSize: '0.88rem' }}>
        📞 Our franchise team will call you within 24 hours
      </div>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
          <div style={{ fontSize: 56, marginBottom: 14 }}>✅</div>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#16a34a', marginBottom: 8 }}>Application Submitted!</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Thank you, <strong>{formData.name}</strong>. Our franchise expansion manager will contact you at <strong>+91 {formData.phone}</strong> shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleFinalSubmit} noValidate>
          {[
            { id: 'name', label: '1. Full Name *', type: 'text', placeholder: 'e.g. Ramesh Sharma', required: true },
            { id: 'email', label: '3. Email Address', type: 'email', placeholder: 'e.g. yourname@gmail.com', required: false },
            { id: 'city', label: '4. Target City / Area *', type: 'text', placeholder: 'e.g. Noida / Gurugram / Pune', required: true },
          ].map(field => (
            <div key={field.id} style={{ marginBottom: 18 }}>
              <label htmlFor={field.id} style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 6, display: 'block', color: '#334155' }}>{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={handleFormChange}
                required={field.required}
                style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '0.95rem', outline: 'none' }}
              />
            </div>
          ))}

          {/* Phone field */}
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="phone" style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 6, display: 'block', color: '#334155' }}>2. Mobile Number (10 Digits) *</label>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ background: '#e2e8f0', border: '1.5px solid #cbd5e1', borderRadius: 12, padding: '14px 16px', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>🇮🇳 +91</span>
              <input
                id="phone"
                type="tel"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleFormChange}
                maxLength={10}
                required
                style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '0.95rem', outline: 'none' }}
              />
            </div>
          </div>

          {/* Budget */}
          <div style={{ marginBottom: 28 }}>
            <label htmlFor="budget" style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 6, display: 'block', color: '#334155' }}>5. Investment Budget Range *</label>
            <select
              id="budget"
              value={formData.budget}
              onChange={handleFormChange}
              aria-label="Select investment budget range"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '0.95rem', outline: 'none' }}
            >
              <option>₹13L - ₹15L (Alpha Model)</option>
              <option>₹15L - ₹20L (Beta Model)</option>
              <option>₹22L - ₹25L (Combo Model)</option>
              <option>₹35L+ (Hydro-Carbon Studio)</option>
            </select>
          </div>

          <button
            type="submit"
            id="franchise-apply-btn"
            disabled={isSubmitting}
            style={{
              width: '100%', padding: '16px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              color: '#ffffff', fontWeight: 800, fontSize: '1.05rem',
              fontFamily: 'Poppins, sans-serif', cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 24px rgba(22,163,74,0.3)',
            }}
          >
            {isSubmitting ? 'Submitting Application...' : 'Talk to Franchise Team →'}
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Lead Popup (10s timer) ──────────────────────────────────────────────────
function LeadPopup() {
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [popupData, setPopupData] = useState({ name: '', phone: '', email: '', city: '' });
  const [popupSubmitting, setPopupSubmitting] = useState(false);
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const [popupError, setPopupError] = useState('');
  const pathname = usePathname() || '';

  useEffect(() => {
    let alreadySeen = false;
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        alreadySeen = window.sessionStorage.getItem('lf_popup_seen');
      }
    } catch (e) {}
    if (alreadySeen || (typeof window !== 'undefined' && window.location?.hash)) return;
    const timer = setTimeout(() => setShowLeadPopup(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = showLeadPopup ? 'hidden' : '';
    }
    return () => { if (typeof document !== 'undefined') document.body.style.overflow = ''; };
  }, [showLeadPopup]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location?.hash) {
      setShowLeadPopup(false);
      if (typeof document !== 'undefined') document.body.style.overflow = '';
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { 'send_to': 'AW-16562330559/IThJCPHEmaIaEL-3xNk9', 'value': 1.0, 'currency': 'INR' });
    }
  }, []);

  const closeLeadPopup = () => {
    try { if (typeof window !== 'undefined' && window.sessionStorage) window.sessionStorage.setItem('lf_popup_seen', '1'); } catch (e) {}
    setShowLeadPopup(false);
  };

  const handlePopupChange = e => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setPopupData(prev => ({ ...prev, phone: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setPopupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePopupSubmit = async e => {
    e.preventDefault();
    if (popupSubmitting) return;
    if (!popupData.name.trim() || !popupData.phone.trim() || !popupData.city.trim()) {
      setPopupError('Please fill all required fields.');
      return;
    }
    if (popupData.phone.length < 10) { setPopupError('Enter a valid 10-digit phone number.'); return; }
    setPopupError('');
    setPopupSubmitting(true);
    try {
      const dateStr = new Date().toISOString().split('T')[0];
      await fetch(GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ date: dateStr, Date: dateStr, timestamp: dateStr, name: popupData.name, mobile: `'+91 ${popupData.phone}`, email: popupData.email || 'N/A', city: popupData.city, modelType: 'Franchise Popup Lead' }),
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { 'send_to': 'AW-16562330559/Ly9XCOC_iLQaEL-3xNk9' });
        window.gtag('event', 'laundry_franchise_lead', { 'event_category': 'Franchise', 'event_label': 'Franchise Popup Submission' });
      }
      setPopupSubmitted(true);
      try { if (typeof window !== 'undefined' && window.sessionStorage) window.sessionStorage.setItem('lf_popup_seen', '1'); } catch (e) {}
      setTimeout(() => setShowLeadPopup(false), 2500);
    } catch (err) {
      console.error('Popup error:', err);
      setPopupError('Something went wrong. Please try again.');
    } finally {
      setPopupSubmitting(false);
    }
  };

  if (!showLeadPopup) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Free franchise consultation offer"
      style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(6px)' }}
    >
      <div style={{ background: '#ffffff', borderRadius: 20, maxWidth: 480, width: '100%', padding: 32, position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', border: '1px solid #e2e8f0' }}>
        <button
          onClick={closeLeadPopup}
          aria-label="Close popup"
          style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: '#64748b' }}
        >✕</button>

        {popupSubmitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#16a34a', marginBottom: 8 }}>Details Received!</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Our franchise team will connect with you shortly.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'inline-block', background: '#dcfce7', borderRadius: 20, padding: '4px 12px', marginBottom: 12 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', fontFamily: 'Poppins, sans-serif' }}>FREE CONSULTATION</span>
            </div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#0f172a', marginBottom: 6 }}>
              Get Franchise Details <span style={{ color: '#16a34a' }}>Instantly</span> 🚀
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 20 }}>
              Investment starts at <strong>₹13 Lacs</strong>. Expected ROI in 18–20 months.
            </p>
            <form onSubmit={handlePopupSubmit}>
              {[
                { name: 'name', type: 'text', placeholder: 'Your Full Name *', required: true },
                { name: 'phone', type: 'tel', placeholder: 'Mobile Number (10 digits) *', required: true, maxLength: 10 },
                { name: 'email', type: 'email', placeholder: 'Email Address (Optional)', required: false },
                { name: 'city', type: 'text', placeholder: 'Your City *', required: true },
              ].map(field => (
                <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={popupData[field.name]}
                  onChange={handlePopupChange}
                  required={field.required}
                  maxLength={field.maxLength}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', marginBottom: 12, outline: 'none' }}
                />
              ))}
              {popupError && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: 10 }}>⚠️ {popupError}</div>}
              <button
                type="submit"
                disabled={popupSubmitting}
                style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: '#fff', fontWeight: 700, fontFamily: 'Poppins, sans-serif', cursor: 'pointer', boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}
              >
                {popupSubmitting ? 'Submitting...' : '🚀 Get Free Franchise Report'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Locations Grid ──────────────────────────────────────────────────────────
function LocationsGrid() {
  return (
    <div style={{ maxHeight: 340, overflowY: 'auto', padding: '20px 16px', borderRadius: 16, background: 'rgba(255, 255, 255, 0.8)', border: '1px solid #e2e8f0' }}>
      <div className="row g-2 justify-content-center">
        {FRANCHISE_CITIES && FRANCHISE_CITIES.map((item, i) => (
          <div className="col-6 col-md-3 col-lg-2" key={i}>
            <Link href={`/best-laundry-drycleaning/franchise-opportunities/${item.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: '#f1f5f9', fontSize: '0.82rem', color: '#334155', fontWeight: 600, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={`${item.city}, ${item.state} — Cleanz24 Laundry Franchise`}>
                📍 {item.city}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export: section-based dispatcher ────────────────────────────────────
export default function LaundryFranchiseInteractive({ section }) {
  if (section === 'slideshow') return <HeroSlideshow />;
  if (section === 'calculator') return <ROICalculator />;
  if (section === 'form') return (
    <>
      <LeadPopup />
      <FranchiseForm />
    </>
  );
  if (section === 'locations') return <LocationsGrid />;
  return null;
}
