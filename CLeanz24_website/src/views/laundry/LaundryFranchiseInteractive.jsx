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

// ─── Helper to smooth scroll to franchise form & preselect model ────────────
export function getBudgetOptionForModel(modelName) {
  if (!modelName) return '₹13L - ₹15L (Alpha Model)';
  const m = modelName.toUpperCase();
  if (m.includes('ALPHA')) return '₹13L - ₹15L (Alpha Model)';
  if (m.includes('BETA')) return '₹15L - ₹20L (Beta Model)';
  if (m.includes('COMBO')) return '₹22L - ₹25L (Combo Model)';
  if (m.includes('HYDRO')) return '₹35L+ (Hydro-Carbon Studio)';
  return '₹13L - ₹15L (Alpha Model)';
}

export function scrollToFranchiseForm(budgetValue, modelName) {
  if (typeof window === 'undefined') return;

  const budgetVal = budgetValue || getBudgetOptionForModel(modelName);

  if (budgetVal) {
    window.dispatchEvent(new CustomEvent('selectFranchiseModel', { 
      detail: { budget: budgetVal, model: modelName } 
    }));
  }

  const target = document.getElementById('franchise-form') || document.getElementById('franchise_form');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
    const prevBorder = target.style.border;
    const prevShadow = target.style.boxShadow;
    target.style.borderColor = '#16a34a';
    target.style.boxShadow = '0 0 30px rgba(22, 163, 74, 0.6)';
    setTimeout(() => {
      target.style.border = prevBorder;
      target.style.boxShadow = prevShadow;
    }, 1500);
  }

  setTimeout(() => {
    const nameInput = document.getElementById('name') || document.querySelector('input[name="name"]');
    if (nameInput) {
      nameInput.focus();
    }
  }, 450);
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
            onClick={(e) => {
              e.preventDefault();
              scrollToFranchiseForm(null, calcModel);
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#0f172a', color: '#ffffff', textDecoration: 'none',
              padding: '14px 32px', borderRadius: 12, fontWeight: 700,
              fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', cursor: 'pointer'
            }}
          >
            Get Your Personalized Franchise Report →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Franchise Application Form (Compact 2-Column Grid) ──────────────────────
function FranchiseForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', budget: '₹13L - ₹15L (Alpha Model)' });
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleSelectModel = (e) => {
      const detail = e.detail || {};
      let budgetVal = detail.budget;
      if (!budgetVal && detail.model) {
        budgetVal = getBudgetOptionForModel(detail.model);
      }
      if (budgetVal) {
        setFormData(prev => ({ ...prev, budget: budgetVal }));
      }
    };
    window.addEventListener('selectFranchiseModel', handleSelectModel);
    return () => window.removeEventListener('selectFranchiseModel', handleSelectModel);
  }, []);

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
    if (!formData.name.trim() || !formData.phone.trim() || !formData.city.trim()) {
      return;
    }
    if (formData.phone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setPhoneError('');
    setIsSubmitting(true);
    try {
      const dateStr = new Date().toISOString().split('T')[0];
      const payload = {
        date: dateStr, Date: dateStr, timestamp: dateStr,
        name: formData.name, mobile: `'+91 ${formData.phone}`,
        email: formData.email, city: formData.city, budget: formData.budget,
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
    <div id="franchise-form">
      <div id="franchise_form" style={{
        background: 'rgba(255, 255, 255, 0.98)',
        borderRadius: 20,
        padding: '22px 20px',
        border: '2px solid #86efac',
        boxShadow: '0 20px 45px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ background: '#dcfce7', borderRadius: 8, padding: '5px 10px', textAlign: 'center', marginBottom: 12, color: '#15803d', fontWeight: 700, fontSize: '0.78rem' }}>
          ⚡ Quick Inquiry — Our team calls you back within 2 hrs
        </div>

      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a', margin: '0 0 2px' }}>
          Apply for Cleanz24 <span style={{ color: '#16a34a' }}>Franchise</span>
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
          Get official blueprint &amp; financial deck
        </p>
      </div>

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>✅</div>
          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#16a34a', marginBottom: 4, fontSize: '1.05rem' }}>Application Submitted!</h4>
          <p style={{ color: '#64748b', fontSize: '0.82rem', margin: 0 }}>
            Thank you <strong>{formData.name}</strong>! Our manager will call you at <strong>+91 {formData.phone}</strong> shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleFinalSubmit}>
          {/* Row 1: Full Name — full width */}
          <div style={{ marginBottom: 10 }}>
            <label htmlFor="name" style={{ fontWeight: 700, fontSize: '0.75rem', marginBottom: 3, display: 'block', color: '#334155' }}>
              Full Name <span style={{ color: '#e53e3e' }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Ramesh Sharma"
              value={formData.name}
              onChange={handleFormChange}
              required
              style={{ width: '100%', padding: '9px 11px', borderRadius: 8, border: '1.5px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Row 2: Phone & City */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: 10 }}>
            <div>
              <label htmlFor="phone" style={{ fontWeight: 700, fontSize: '0.75rem', marginBottom: 3, display: 'block', color: '#334155' }}>
                WhatsApp / Mobile <span style={{ color: '#e53e3e' }}>*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleFormChange}
                maxLength={10}
                required
                style={{ width: '100%', padding: '9px 11px', borderRadius: 8, border: `1.5px solid ${phoneError ? '#e53e3e' : '#cbd5e1'}`, background: '#f8fafc', color: '#0f172a', fontSize: '0.85rem', outline: 'none' }}
              />
              {phoneError && <p style={{ color: '#e53e3e', fontSize: '0.7rem', marginTop: 3, marginBottom: 0 }}>{phoneError}</p>}
            </div>

            <div>
              <label htmlFor="city" style={{ fontWeight: 700, fontSize: '0.75rem', marginBottom: 3, display: 'block', color: '#334155' }}>
                Target City <span style={{ color: '#e53e3e' }}>*</span>
              </label>
              <input
                id="city"
                type="text"
                placeholder="e.g. Jaipur / Pune"
                value={formData.city}
                onChange={handleFormChange}
                required
                style={{ width: '100%', padding: '9px 11px', borderRadius: 8, border: '1.5px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
          </div>

          {/* Row 3: Email (Optional) */}
          <div style={{ marginBottom: 10 }}>
            <label htmlFor="email" style={{ fontWeight: 700, fontSize: '0.75rem', marginBottom: 3, display: 'block', color: '#334155' }}>
              Email Address <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleFormChange}
              style={{ width: '100%', padding: '9px 11px', borderRadius: 8, border: '1.5px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Row 4: Investment Budget */}
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="budget" style={{ fontWeight: 700, fontSize: '0.75rem', marginBottom: 3, display: 'block', color: '#334155' }}>
              Investment Budget
            </label>
            <select
              id="budget"
              value={formData.budget}
              onChange={handleFormChange}
              aria-label="Select investment budget range"
              style={{ width: '100%', padding: '9px 11px', borderRadius: 8, border: '1.5px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '0.85rem', outline: 'none' }}
            >
              <option>₹13L - ₹15L (Alpha Model)</option>
              <option>₹15L - ₹20L (Beta Model)</option>
              <option>₹22L - ₹25L (Combo Model)</option>
              <option>₹35L+ (Hydro-Carbon Studio)</option>
            </select>
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            id="franchise-apply-btn"
            disabled={isSubmitting}
            style={{
              width: '100%', padding: '12px', borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              color: '#ffffff', fontWeight: 800, fontSize: '0.92rem',
              fontFamily: 'Poppins, sans-serif', cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 20px rgba(22,163,74,0.35)',
              transition: 'transform 0.2s', marginBottom: 10,
            }}
          >
            {isSubmitting ? 'Submitting...' : '🚀 Get Free Franchise Deck →'}
          </button>

          {/* WhatsApp Alternative */}
          <a
            href={`https://wa.me/919138004800?text=${encodeURIComponent(`Hi! I'm ${formData.name || 'interested'} from ${formData.city || 'India'}. I want to enquire about Cleanz24 Laundry Franchise (Budget: ${formData.budget}). Please share the details.`)}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '11px', borderRadius: 10,
              background: '#25d366', color: '#ffffff',
              fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 4px 14px rgba(37,211,102,0.35)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.849L0 24l6.335-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.371l-.36-.214-3.732.885.936-3.626-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
            Apply via WhatsApp
          </a>
        </form>
      )}
    </div>
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
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname() || '';

  useEffect(() => {
    const checkDark = () => {
      if (typeof document !== 'undefined') {
        const isDarkTheme = document.body.classList.contains('dark') ||
          document.documentElement.getAttribute('data-bs-theme') === 'dark' ||
          document.body.getAttribute('data-bs-theme') === 'dark';
        setIsDark(Boolean(isDarkTheme));
      }
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    if (typeof document !== 'undefined') {
      observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-bs-theme'] });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-bs-theme'] });
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let alreadySeen = false;
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        alreadySeen = window.sessionStorage.getItem('lf_popup_seen');
      }
    } catch (_err) {
      // sessionStorage unavailable
    }
    if (alreadySeen || (typeof window !== 'undefined' && window.location?.hash)) return;
    const timer = setTimeout(() => setShowLeadPopup(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for external trigger (e.g. from ExpertContactButton)
  useEffect(() => {
    const handler = () => setShowLeadPopup(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('openFranchisePopup', handler);
      return () => window.removeEventListener('openFranchisePopup', handler);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = showLeadPopup ? 'hidden' : '';
    }
    return () => { if (typeof document !== 'undefined') document.body.style.overflow = ''; };
  }, [showLeadPopup]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location?.hash) {
      setTimeout(() => {
        setShowLeadPopup(false);
        if (typeof document !== 'undefined') document.body.style.overflow = '';
      }, 0);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { 'send_to': 'AW-16562330559/IThJCPHEmaIaEL-3xNk9', 'value': 1.0, 'currency': 'INR' });
    }
  }, []);

  const closeLeadPopup = () => {
    try { if (typeof window !== 'undefined' && window.sessionStorage) window.sessionStorage.setItem('lf_popup_seen', '1'); } catch (_err) { /* sessionStorage unavailable */ }
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
      setPopupError('Please fill Name, Mobile Number, and City.');
      return;
    }
    if (popupData.phone.length < 10) { setPopupError('Enter a valid 10-digit mobile number.'); return; }
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
      try { if (typeof window !== 'undefined' && window.sessionStorage) window.sessionStorage.setItem('lf_popup_seen', '1'); } catch (_err) { /* sessionStorage unavailable */ }
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
      style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(8px)' }}
    >
      <style>{`
        .lead-popup-input-${isDark ? 'dark' : 'light'} {
          background-color: ${isDark ? '#0f172a' : '#f8fafc'} !important;
          color: ${isDark ? '#f8fafc' : '#0f172a'} !important;
          border: 1.5px solid ${isDark ? '#334155' : '#cbd5e1'} !important;
        }
        .lead-popup-input-${isDark ? 'dark' : 'light'}::placeholder {
          color: ${isDark ? '#94a3b8' : '#64748b'} !important;
          opacity: 1 !important;
        }
        .lead-popup-input-${isDark ? 'dark' : 'light'}:focus {
          border-color: #16a34a !important;
          box-shadow: 0 0 0 3px ${isDark ? 'rgba(34,197,94,0.25)' : 'rgba(22,163,74,0.15)'} !important;
        }
      `}</style>
      <div style={{
        background: isDark ? '#1e293b' : '#ffffff',
        borderRadius: 20, maxWidth: 480, width: '100%', padding: 32, position: 'relative',
        boxShadow: isDark ? '0 25px 65px rgba(0,0,0,0.6)' : '0 20px 60px rgba(0,0,0,0.2)',
        border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`
      }}>
        <button
          onClick={closeLeadPopup}
          aria-label="Close popup"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            border: 'none', borderRadius: '50%', width: 32, height: 32,
            cursor: 'pointer', fontSize: 18, color: isDark ? '#cbd5e1' : '#64748b'
          }}
        >✕</button>

        {popupSubmitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#16a34a', marginBottom: 8 }}>Details Received!</h3>
            <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.9rem' }}>Our franchise team will connect with you shortly.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'inline-block', background: isDark ? 'rgba(34,197,94,0.2)' : '#dcfce7', border: `1px solid ${isDark ? '#4ade80' : '#86efac'}`, borderRadius: 20, padding: '4px 12px', marginBottom: 12 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#4ade80' : '#15803d', fontFamily: 'Poppins, sans-serif' }}>FREE CONSULTATION</span>
            </div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: isDark ? '#f8fafc' : '#0f172a', marginBottom: 6 }}>
              Get Franchise Details <span style={{ color: isDark ? '#4ade80' : '#16a34a' }}>Instantly</span> 🚀
            </h3>
            <p style={{ fontSize: '0.85rem', color: isDark ? '#cbd5e1' : '#64748b', marginBottom: 20 }}>
              Investment starts at <strong style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>₹13 Lacs</strong>. Expected ROI in 18–20 months.
            </p>
            <form onSubmit={handlePopupSubmit}>
              {[
                { name: 'name', type: 'text', placeholder: 'Your Full Name *', required: true },
                { name: 'phone', type: 'tel', placeholder: 'Mobile Number (10 digits) *', required: true, maxLength: 10 },
                { name: 'email', type: 'email', placeholder: 'Email Address *', required: true },
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
                  className={`lead-popup-input-${isDark ? 'dark' : 'light'}`}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, marginBottom: 12, outline: 'none' }}
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

// ─── Expert Contact Floating Button ─────────────────────────────────────────
function ExpertContactButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openFranchisePopup'));
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Talk to our franchise expert"
        title="Talk to Our Franchise Expert"
        style={{
          position: 'fixed', bottom: 84, right: 20, zIndex: 9998,
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: '#ffffff', border: 'none',
          width: 52, height: 52, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Poppins, sans-serif', cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(37,99,235,0.45)',
          animation: 'expertGlowPulse 2s infinite, expertAttentionWiggle 4s ease-in-out infinite',
        }}
      >
        {/* Pulsing online status dot badge */}
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.4rem' }}>👨‍💼</span>
          <span style={{
            position: 'absolute', top: -2, right: -2,
            width: 10, height: 10, borderRadius: '50%',
            background: '#22c55e', border: '2px solid #ffffff',
            boxShadow: '0 0 8px #22c55e'
          }} />
        </span>
      </button>

      <style>{`
        @keyframes expertGlowPulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7), 0 8px 24px rgba(37, 99, 235, 0.45); }
          70% { box-shadow: 0 0 0 16px rgba(37, 99, 235, 0), 0 12px 32px rgba(37, 99, 235, 0.65); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0), 0 8px 24px rgba(37, 99, 235, 0.45); }
        }
        @keyframes expertAttentionWiggle {
          0%, 80%, 100% { transform: translateY(0) rotate(0deg); }
          85% { transform: translateY(-4px) rotate(-3deg); }
          90% { transform: translateY(-2px) rotate(3deg); }
          95% { transform: translateY(-4px) rotate(-2deg); }
        }
      `}</style>
    </>
  );
}

// ─── Franchise Models Section ────────────────────────────────────────────────
function FranchiseModels() {
  const models = [
    {
      tag: 'Starter',
      title: 'ALPHA MODEL',
      sub: 'Ideal for standard laundry setups in high-density residential areas.',
      investment: '₹13 Lacs+',
      area: '250 Sq.Ft (Minimum)',
      profit: '₹1 Lakh/Month+',
      roi: '18-20 Months',
      featured: false,
      budget: '₹13L - ₹15L (Alpha Model)',
      features: [
        'Complete end to end Store Setup',
        '15Kg Stacker (Washer & Extractor)',
        'Automatic Pressing Setup',
        'Complete Softwash & Spotting Detergents',
        'Staff & Franchise Operations Training',
        'CRM, Mobile App & GMB Setup',
      ],
    },
    {
      tag: 'Most Popular',
      title: 'BETA MODEL',
      sub: 'High capacity laundry setup handling premium wash & fold and steam pressing.',
      investment: '₹15 Lacs+',
      area: '250 Sq.Ft (Minimum)',
      profit: '₹1.5 Lacs/Month+',
      roi: '18-20 Months',
      featured: true,
      budget: '₹15L - ₹20L (Beta Model)',
      features: [
        'Complete end to end Store Setup',
        '15Kg Stacker + 10Kg Stacker',
        'Automatic Steam Pressing Setup',
        'Shoe, Sofa & Carpet Cleaning Kit',
        'Dedicated Relationship Manager',
        'Full Online & Offline Marketing Support',
      ],
    },
    {
      tag: 'Commercial Combo',
      title: 'COMBO MODEL',
      sub: 'Flagship B2B and B2C setup for commercial loads & individual wear.',
      investment: '₹22 Lacs+',
      area: '400 Sq.Ft (Minimum)',
      profit: '₹2 Lacs/Month+',
      roi: '18-20 Months',
      featured: false,
      budget: '₹22L - ₹25L (Combo Model)',
      features: [
        'Complete end to end Store Setup',
        '18Kg Standalone Washer & Dryer for Commercial Loads',
        '10Kg Stacker (Washer & Extractor)',
        'Automatic Steam Pressing Setup',
        'B2B Corporate Lead Generation',
        'CRM Software & Marketing Automation',
      ],
    },
    {
      tag: 'Premium Dry-Clean',
      title: 'HYDRO-CARBON MODEL',
      sub: 'Ultra-premium eco-friendly hydrocarbon dry-cleaning studio setup.',
      investment: '₹35 Lacs+',
      area: '500 Sq.Ft (Minimum)',
      profit: '₹2.5–3.0 Lacs/Month+',
      roi: '18-22 Months',
      featured: false,
      budget: '₹35L+ (Hydro-Carbon Studio)',
      features: [
        '10Kg Hydrocarbon Dry-Clean Machine (99% Recovery)',
        '10Kg Stacker (Washer & Extractor)',
        'Delicate Silk & Leather Care Setup',
        'Complete Eco Solvents & Spotting Kit',
        'Priority Technical & Operational Support',
        'Exclusive Franchise Zone Rights',
      ],
    },
  ];

  return (
    <div className="row g-4">
      {models.map((m, idx) => (
        <div className="col-md-6 col-lg-3" key={idx}>
          <article style={{
            background: '#ffffff',
            border: m.featured ? '2px solid #16a34a' : '1.5px solid #e2e8f0',
            borderRadius: 18, padding: '28px 22px', height: '100%', position: 'relative',
            boxShadow: m.featured ? '0 12px 36px rgba(22,163,74,0.15)' : 'none',
            display: 'flex', flexDirection: 'column',
          }}
            aria-label={`${m.title} - Investment ${m.investment}`}
          >
            {m.featured && (
              <div style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                background: '#16a34a', color: '#fff', fontSize: '0.72rem', fontWeight: 700,
                padding: '4px 16px', borderRadius: 20, letterSpacing: '1px', textTransform: 'uppercase',
              }}>
                MOST POPULAR
              </div>
            )}
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', marginBottom: 4 }}>{m.tag}</div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', marginBottom: 8 }}>{m.title}</h3>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#16a34a', marginBottom: 12 }}>{m.investment}</div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 16 }}>{m.sub}</p>
            <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: '0.82rem' }}>
              <div style={{ marginBottom: 4 }}>📍 <strong>Area:</strong> {m.area}</div>
              <div style={{ marginBottom: 4 }}>💰 <strong>Profit:</strong> {m.profit}</div>
              <div>⏳ <strong>ROI:</strong> {m.roi}</div>
            </div>
            <ul style={{ paddingLeft: 0, listStyle: 'none', fontSize: '0.82rem', marginTop: 'auto', marginBottom: 20 }}>
              {m.features.map((f, i) => (
                <li key={i} style={{ marginBottom: 6, display: 'flex', gap: 6, color: '#475569' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="#franchise-form"
              onClick={(e) => {
                e.preventDefault();
                scrollToFranchiseForm(m.budget, m.title);
              }}
              style={{
                display: 'block', textAlign: 'center',
                background: m.featured ? '#16a34a' : 'transparent',
                color: m.featured ? '#ffffff' : '#16a34a',
                border: m.featured ? 'none' : '1.5px solid #16a34a',
                padding: '10px', borderRadius: 10, fontWeight: 700, textDecoration: 'none',
                fontSize: '0.88rem', fontFamily: 'Poppins, sans-serif', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Enquire About {m.title.split(' ')[0]} Model
            </a>
          </article>
        </div>
      ))}
    </div>
  );
}

// ─── Main export: section-based dispatcher ────────────────────────────────────
export default function LaundryFranchiseInteractive({ section }) {
  if (section === 'slideshow') return <HeroSlideshow />;
  if (section === 'calculator') return <ROICalculator />;
  if (section === 'models') return <FranchiseModels />;
  if (section === 'form') return (
    <>
      <LeadPopup />
      <FranchiseForm />
    </>
  );
  if (section === 'locations') return <LocationsGrid />;
  if (section === 'expertBtn') return <ExpertContactButton />;
  if (section === 'popup') return <LeadPopup />;
  return null;
}

