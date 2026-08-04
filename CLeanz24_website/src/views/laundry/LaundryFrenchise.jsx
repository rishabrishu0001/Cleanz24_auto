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
  storeimg1,
  storeimg2,
  storeimg3,
  storeimg4,
  storeimg5,
  storeimg6,
  storeimg7
];

/* ─── Hero Image Slideshow Component ────────────────────────────── */
function HeroSlideshow({ dark }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % storeImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(280px, 45vh, 460px)',
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: `0 16px 48px rgba(0,0,0,${dark ? '0.5' : '0.15'})`,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`
    }}>
      {storeImages.map((src, i) => (
        <img
          key={i}
          src={typeof src === 'string' ? src : (src?.src || '')}
          alt={`Cleanz24 Store ${i + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 20,
            opacity: activeIdx === i ? 1 : 0,
            transform: activeIdx === i ? 'scale(1.03)' : 'scale(1)',
            transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
            zIndex: activeIdx === i ? 2 : 1,
          }}
        />
      ))}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '90px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        zIndex: 3,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 7,
        zIndex: 4,
      }}>
        {storeImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActiveIdx(i)}
            style={{
              width: activeIdx === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: activeIdx === i ? '#22c55e' : 'rgba(255,255,255,0.6)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.35s ease, background 0.3s',
              outline: 'none',
            }}
          />
        ))}
      </div>
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(22, 101, 52, 0.95)',
        color: '#fff',
        borderRadius: 30,
        padding: '6px 16px',
        fontSize: '0.8rem',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.5px',
        zIndex: 4,
        backdropFilter: 'blur(6px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        📍 100+ Stores Across India
      </div>
    </div>
  );
}

/* ─── Main Franchise Page Component ─────────────────────────────── */
function LaundryFrenchise() {
  const { isDarkMode } = (() => ({ isDarkMode: false, toggleTheme: () => { } }))() || {};
  const dark = !!isDarkMode;

  // Final Form State (Section 8)
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', budget: '₹13L - ₹15L (Alpha Model)' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ROI Calculator State (Section 3)
  const [calcTier, setCalcTier] = useState('tier1'); // 'tier1', 'tier2', 'tier3'
  const [calcModel, setCalcModel] = useState('beta'); // 'alpha', 'beta', 'combo', 'hydro'

  // Exact Business Metrics Matrix
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

  const activeCalcData = CALCULATOR_DATA[calcTier]?.[calcModel] || CALCULATOR_DATA.tier1.beta;

  // Lead Popup State (20s timer preserved)
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [popupData, setPopupData] = useState({ name: '', phone: '', email: '', city: '' });
  const [popupSubmitting, setPopupSubmitting] = useState(false);
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const [popupError, setPopupError] = useState('');

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  // 20-second Popup Trigger with SSR Safety
  useEffect(() => {
    let alreadySeen = false;
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        alreadySeen = window.sessionStorage.getItem('lf_popup_seen');
      }
    } catch (e) { }
    if (alreadySeen || (typeof window !== 'undefined' && window.location && window.location.hash)) return;
    const timer = setTimeout(() => setShowLeadPopup(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (showLeadPopup) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [showLeadPopup]);

  // Hash Scroll Fix (Uses pathname string dependency to prevent re-render loop)
  const pathname = usePathname() || '';
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location && window.location.hash) {
      setShowLeadPopup(false);
      if (typeof document !== 'undefined') document.body.style.overflow = '';
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [pathname]);

  // Google Ads conversion tracking on page view
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16562330559/IThJCPHEmaIaEL-3xNk9',
        'value': 1.0,
        'currency': 'INR'
      });
    }
  }, []);

  const closeLeadPopup = () => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('lf_popup_seen', '1');
      }
    } catch (e) { }
    setShowLeadPopup(false);
  };

  const handlePopupChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setPopupData(prev => ({ ...prev, phone: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setPopupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    if (popupSubmitting) return;
    if (!popupData.name.trim() || !popupData.phone.trim() || !popupData.city.trim()) {
      setPopupError('Please fill all required fields.');
      return;
    }
    if (popupData.phone.length < 10) {
      setPopupError('Enter a valid 10-digit phone number.');
      return;
    }
    setPopupError('');
    setPopupSubmitting(true);
    try {
      const dateStr = new Date().toISOString().split('T')[0];
      const payload = {
        date: dateStr, Date: dateStr, timestamp: dateStr,
        name: popupData.name,
        mobile: `'+91 ${popupData.phone}`,
        email: popupData.email || 'N/A',
        city: popupData.city,
        modelType: 'Franchise Popup Lead'
      };
      await fetch(GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { 'send_to': 'AW-16562330559/Ly9XCOC_iLQaEL-3xNk9' });
        window.gtag('event', 'laundry_franchise_lead', {
          'event_category': 'Franchise',
          'event_label': 'Franchise Popup Submission'
        });
      }
      setPopupSubmitted(true);
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('lf_popup_seen', '1');
        }
      } catch (e) { }
      setTimeout(() => setShowLeadPopup(false), 2500);
    } catch (err) {
      console.error('Popup error:', err);
      setPopupError('Something went wrong. Please try again.');
    } finally {
      setPopupSubmitting(false);
    }
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      setFormData(prev => ({ ...prev, [id]: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const dateStr = new Date().toISOString().split('T')[0];
      const payload = {
        date: dateStr, Date: dateStr, timestamp: dateStr,
        name: formData.name,
        mobile: `'+91 ${formData.phone}`,
        city: formData.city,
        budget: formData.budget,
        modelType: 'Main Franchise Form'
      };
      await fetch(GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { 'send_to': 'AW-16562330559/Ly9XCOC_iLQaEL-3xNk9' });
        window.gtag('event', 'laundry_franchise_lead', {
          'event_category': 'Franchise',
          'event_label': 'Main Form Submission'
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Data Collections
  const mediaMentions = [
    { name: 'The Times of India', icon: '📰', gradient: 'linear-gradient(135deg, #1f3a60 0%, #0f172a 100%)' },
    { name: 'Hindustan Times', icon: '💙', gradient: 'linear-gradient(135deg, #007cc2 0%, #005580 100%)' },
    { name: 'Dainik Bhaskar', icon: '☀️', gradient: 'linear-gradient(135deg, #ff9900 0%, #f05123 100%)' },
    { name: 'Economic Times', icon: '📈', gradient: 'linear-gradient(135deg, #e31b23 0%, #801015 100%)' },
    { name: 'NDTV', icon: '📺', gradient: 'linear-gradient(135deg, #ff0000 0%, #b30000 100%)' }
  ];

  const brandPartners = [
    { name: 'Alliance Laundry Systems', url: 'https://alliancelaundry.com' },
    { name: 'LG Electronics', url: 'https://www.lg.com' },
    { name: 'Speed Queen', url: 'https://speedqueen.com' },
    { name: 'Fabcare', url: 'https://fabcare.com' },
    { name: 'Reckitt Benckiser', url: 'https://www.reckitt.com' },
    { name: 'Samsung', url: 'https://www.samsung.com' }
  ];

  const models = [
    {
      tag: 'Starter',
      title: 'ALPHA MODEL',
      sub: 'Ideal for standard laundry setups in high-density residential areas.',
      investment: '₹13 Lacs+',
      area: '250 Sq.Ft (Minimum)',
      profit: '1 Lakh/Month+',
      roi: '18-20 Months',
      features: [
        'Complete end to end Store Setup',
        '15Kg Stacker (Washer & Extractor)',
        'Automatic Pressing Setup',
        'Complete Softwash & Spotting Detergents',
        'Staff & Franchise Operations Training',
        'CRM, Mobile App & GMB Setup'
      ],
      featured: false,
    },
    {
      tag: 'Most Popular',
      title: 'BETA MODEL',
      sub: 'High capacity laundry setup handling premium wash & fold and steam pressing.',
      investment: '₹15 Lacs+',
      area: '250 Sq.Ft (Minimum)',
      profit: '1.5 Lacs/Month+',
      roi: '18-20 Months',
      features: [
        'Complete end to end Store Setup',
        '15Kg Stacker + 10Kg Stacker',
        'Automatic Steam Pressing Setup',
        'Shoe, Sofa & Carpet Cleaning Kit',
        'Dedicated Relationship Manager',
        'Full Online & Offline Marketing Support'
      ],
      featured: true,
    },
    {
      tag: 'Commercial Combo',
      title: 'COMBO MODEL',
      sub: 'Flagship B2B and B2C setup for commercial loads & individual wear.',
      investment: '₹22 Lacs+',
      area: '400 Sq.Ft (Minimum)',
      profit: '2 Lacs/Month+',
      roi: '18-20 Months',
      features: [
        'Complete end to end Store Setup',
        '18Kg Standalone Washer & Dryer for Commercial Loads',
        '10Kg Stacker (Washer & Extractor)',
        'Automatic Steam Pressing Setup',
        'B2B Corporate Lead Generation',
        'CRM Software & Marketing Automation'
      ],
      featured: false,
    },
    {
      tag: 'Premium Dry-Clean',
      title: 'HYDRO-CARBON MODEL',
      sub: 'Ultra-premium eco-friendly hydrocarbon dry-cleaning studio setup.',
      investment: '₹35 Lacs+',
      area: '500 Sq.Ft (Minimum)',
      profit: '2.5 - 3.0 Lacs/Month+',
      roi: '18-22 Months',
      features: [
        '10Kg Hydrocarbon Dry-Clean Machine (99% Recovery)',
        '10Kg Stacker (Washer & Extractor)',
        'Delicate Silk & Leather Care Setup',
        'Complete Eco Solvents & Spotting Kit',
        'Priority Technical & Operational Support',
        'Exclusive Franchise Zone Rights'
      ],
      featured: false,
    }
  ];

  const whyUsCards = [
    { icon: '💰', title: 'Low Investment & High ROI', desc: 'Proven business models starting from ₹13L with 60-80% annual return on investment.' },
    { icon: '📱', title: 'Proprietary Tech & CRM', desc: 'Automated order tracking, customer WhatsApp alerts, staff POS, and billing analytics.' },
    { icon: '🌿', title: 'Eco-Friendly Solvents', desc: 'Hypoallergenic softwash detergents safe for delicate silk sarees, suits, and luxury wear.' },
    { icon: '🚗', title: 'Doorstep Pickup Model', desc: 'App-based pickup & delivery logistics extending your customer reach beyond physical location.' },
    { icon: '🤝', title: 'Dedicated Manager', desc: 'Personal relationship manager for day-to-day operational guidance, marketing, and staff training.' },
    { icon: '📊', title: 'Proven Unit Economics', desc: '100+ operational outlets across India delivering predictable monthly cashflows.' }
  ];

  const supportPillars = [
    { step: '01', title: 'Site Selection & Analysis', desc: 'Demographic research, footfall estimation & final location approval.' },
    { step: '02', title: 'Store Setup & Equipment', desc: 'Turnkey interior design, machinery installation & eco chemical supply.' },
    { step: '03', title: 'Staff Training & Onboarding', desc: 'Hands-on operational training for garment care, steam press & customer service.' },
    { step: '04', title: 'Marketing & Grand Launch', desc: 'Local launch campaigns, Google My Business optimization & digital lead streams.' },
    { step: '05', title: 'Ongoing Operations Support', desc: 'Continuous CRM software updates, supply chain refill & regular audit support.' }
  ];

  const faqs = [
    { q: 'What is the minimum investment required to start a Cleanz24 franchise?', a: 'Investment starts at ₹13 Lakhs for the Alpha Model (250 sq.ft minimum area), which includes end-to-end store setup, machinery, chemical supply, branding, and training.' },
    { q: 'What is the expected break-even time for a Cleanz24 store?', a: 'Based on data across our 100+ stores, operating break-even is achieved within 3 to 6 months, while full investment ROI is typically achieved in 18 to 20 months.' },
    { q: 'Does Cleanz24 help in site selection and store setup?', a: 'Yes! Our real estate and location intelligence team evaluates demographic data, catchment footfall, and competitor density before approving any location.' },
    { q: 'What training is provided to the franchise owner and staff?', a: 'We provide comprehensive 7-day training covering laundry operations, garment fabric care, spot removal techniques, POS software usage, and customer relation skills.' },
    { q: 'What are the royalty and CRM software charges?', a: 'We maintain a highly competitive flat royalty structure designed to maximize store profit margins. Complete details are shared during initial consultation.' },
    { q: 'How long does it take to launch a store from agreement signing?', a: 'The typical timeline from signing the franchise agreement to grand opening is 30 to 45 days.' }
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: dark ? '#0f172a' : '#ffffff', color: dark ? '#e2e8f0' : '#1e293b' }}>

      {/* ── PERSISTENT POPUP MODAL (20s delay) ── */}
      {showLeadPopup && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16, backdropFilter: 'blur(6px)'
          }}
        >
          <div style={{
            background: dark ? '#1e293b' : '#ffffff',
            borderRadius: 20,
            maxWidth: 480,
            width: '100%',
            padding: 32,
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`
          }}>
            <button
              onClick={closeLeadPopup}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(0,0,0,0.06)', border: 'none',
                borderRadius: '50%', width: 32, height: 32,
                cursor: 'pointer', fontSize: 18, color: '#64748b'
              }}
            >✕</button>

            {popupSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#16a34a', marginBottom: 8 }}>Details Received!</h3>
                <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '0.9rem' }}>Our franchise team will connect with you shortly.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'inline-block', background: '#dcfce7', borderRadius: 20, padding: '4px 12px', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', fontFamily: 'Poppins, sans-serif' }}>FREE CONSULTATION</span>
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: dark ? '#f8fafc' : '#0f172a', marginBottom: 6 }}>
                  Get Franchise Details <span style={{ color: '#16a34a' }}>Instantly</span> 🚀
                </h3>
                <p style={{ fontSize: '0.85rem', color: dark ? '#94a3b8' : '#64748b', marginBottom: 20 }}>
                  Investment starts at <strong>₹13 Lacs</strong>. Expected ROI in 18–20 months.
                </p>

                <form onSubmit={handlePopupSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name *"
                    value={popupData.name}
                    onChange={handlePopupChange}
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 10,
                      border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                      background: dark ? '#0f172a' : '#f8fafc',
                      color: dark ? '#f8fafc' : '#0f172a', marginBottom: 12, outline: 'none'
                    }}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number (10 digits) *"
                    value={popupData.phone}
                    onChange={handlePopupChange}
                    maxLength={10}
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 10,
                      border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                      background: dark ? '#0f172a' : '#f8fafc',
                      color: dark ? '#f8fafc' : '#0f172a', marginBottom: 12, outline: 'none'
                    }}
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Your City *"
                    value={popupData.city}
                    onChange={handlePopupChange}
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 10,
                      border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                      background: dark ? '#0f172a' : '#f8fafc',
                      color: dark ? '#f8fafc' : '#0f172a', marginBottom: 16, outline: 'none'
                    }}
                    required
                  />
                  {popupError && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: 10 }}>⚠️ {popupError}</div>}
                  <button
                    type="submit"
                    disabled={popupSubmitting}
                    style={{
                      width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                      background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                      color: '#fff', fontWeight: 700, fontFamily: 'Poppins, sans-serif',
                      cursor: 'pointer', boxShadow: '0 4px 16px rgba(22,163,74,0.3)'
                    }}
                  >
                    {popupSubmitting ? 'Submitting...' : '🚀 Get Free Franchise Report'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════ SECTION 1: HERO ══════════════════ */}
      <section style={{
        background: dark ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 'linear-gradient(135deg, #f0fdf4 0%, #e6f4ea 100%)',
        padding: '100px 0 70px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              {/* Trust Badge Header */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: dark ? 'rgba(34,197,94,0.15)' : '#dcfce7', border: '1px solid #86efac', padding: '6px 16px', borderRadius: 30, marginBottom: 20 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#15803d', letterSpacing: '0.5px', textTransform: 'uppercase' }}>⭐ PROVEN BUSINESS MODEL</span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 800,
                fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.15,
                color: dark ? '#f8fafc' : '#0f172a', marginBottom: 20
              }}>
                Start Your Own <span style={{ color: '#16a34a' }}>Cleanz24 Franchise</span> — 100+ Stores, Fast ROI
              </h1>

              {/* Subheadline: 1-line trust stat */}
              <p style={{
                fontSize: 'clamp(15px, 1.8vw, 18px)', fontWeight: 600,
                color: dark ? '#94a3b8' : '#475569', marginBottom: 28, lineHeight: 1.5
              }}>
                🏆 100+ Franchise Stores &nbsp;|&nbsp; 🌍 21+ States &nbsp;|&nbsp; 😊 2,00,000+ Happy Customers
              </p>

              {/* Trust badges row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ background: dark ? '#1e293b' : '#ffffff', padding: '8px 16px', borderRadius: 10, border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, fontSize: '0.85rem', fontWeight: 600, color: dark ? '#f8fafc' : '#1e293b' }}>
                  🗓️ Est. 2018
                </div>
                <div style={{ background: dark ? '#1e293b' : '#ffffff', padding: '8px 16px', borderRadius: 10, border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, fontSize: '0.85rem', fontWeight: 600, color: '#d97706' }}>
                  ★ 4.8 / 5 Rating
                </div>
                <div style={{ background: dark ? '#1e293b' : '#ffffff', padding: '8px 16px', borderRadius: 10, border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, fontSize: '0.85rem', fontWeight: 600, color: dark ? '#f8fafc' : '#1e293b' }}>
                  📰 Featured in TOI & NDTV
                </div>
              </div>

              {/* Primary CTA (Scrolls to Calculator/Snapshot) */}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a
                  href="#calculator"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    color: '#fff', textDecoration: 'none', padding: '16px 36px',
                    borderRadius: 12, fontWeight: 700, fontSize: '1.05rem',
                    fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 24px rgba(22,163,74,0.3)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Explore Franchise Opportunity ↓
                </a>
              </div>
            </div>

            {/* Right: Responsive Store Slideshow */}
            <div className="col-lg-6">
              <HeroSlideshow dark={dark} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 2: INVESTMENT & PROFIT SNAPSHOT ══════════════════ */}
      <section id="snapshot" style={{ padding: '70px 0', background: dark ? '#0f172a' : '#ffffff', borderBottom: `1px solid ${dark ? '#1e293b' : '#f1f5f9'}` }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>TRANSPARENT UNIT ECONOMICS</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: dark ? '#f8fafc' : '#0f172a', marginTop: 6 }}>
              Investment &amp; Profit <span style={{ color: '#16a34a' }}>Snapshot</span>
            </h2>
            <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '0.95rem', maxWidth: 600, margin: '8px auto 0' }}>
              Honest business metrics validated across 100+ operating studios across India.
            </p>
          </div>

          <div className="row g-4">
            {/* Stat Card 1 */}
            <div className="col-6 col-lg-3">
              <div style={{
                background: dark ? '#1e293b' : '#f8fafc', border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                borderRadius: 16, padding: '28px 20px', textAlign: 'center', height: '100%',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)', transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>💼</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: dark ? '#94a3b8' : '#64748b', letterSpacing: '1px', marginBottom: 6 }}>Total Investment</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#16a34a' }}>₹13L – ₹35L</div>
                <div style={{ fontSize: '0.78rem', color: dark ? '#64748b' : '#94a3b8', marginTop: 4 }}>Turnkey Store Setup</div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="col-6 col-lg-3">
              <div style={{
                background: dark ? '#1e293b' : '#f8fafc', border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                borderRadius: 16, padding: '28px 20px', textAlign: 'center', height: '100%',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)', transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>📈</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: dark ? '#94a3b8' : '#64748b', letterSpacing: '1px', marginBottom: 6 }}>Monthly Profit</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#2563eb' }}>₹1.0L – ₹3.5L+</div>
                <div style={{ fontSize: '0.78rem', color: dark ? '#64748b' : '#94a3b8', marginTop: 4 }}>Predictable Cashflow</div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="col-6 col-lg-3">
              <div style={{
                background: dark ? '#1e293b' : '#f8fafc', border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                borderRadius: 16, padding: '28px 20px', textAlign: 'center', height: '100%',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)', transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>🎯</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: dark ? '#94a3b8' : '#64748b', letterSpacing: '1px', marginBottom: 6 }}>Annual ROI</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#7c3aed' }}>60% – 80%</div>
                <div style={{ fontSize: '0.78rem', color: dark ? '#64748b' : '#94a3b8', marginTop: 4 }}>High Capital Efficiency</div>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="col-6 col-lg-3">
              <div style={{
                background: dark ? '#1e293b' : '#f8fafc', border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                borderRadius: 16, padding: '28px 20px', textAlign: 'center', height: '100%',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)', transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>⏳</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: dark ? '#94a3b8' : '#64748b', letterSpacing: '1px', marginBottom: 6 }}>Break-even Period</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#d97706' }}>18 – 20 Mo</div>
                <div style={{ fontSize: '0.78rem', color: dark ? '#64748b' : '#94a3b8', marginTop: 4 }}>Full Investment Payback</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 3: INTERACTIVE ROI CALCULATOR ══════════════════ */}
      <section id="calculator" style={{ padding: '80px 0', background: dark ? '#161f2e' : '#f0faf2' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>INTERACTIVE WIDGET</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: dark ? '#f8fafc' : '#0f172a', marginTop: 6 }}>
              Calculate Your Estimated <span style={{ color: '#16a34a' }}>Franchise Returns</span>
            </h2>
            <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '0.95rem', maxWidth: 600, margin: '8px auto 0' }}>
              Select your city tier and franchise model to view exact projected revenue, annual profit &amp; payback period.
            </p>
          </div>

          <div style={{
            maxWidth: 860, margin: '0 auto', background: dark ? '#1e293b' : '#ffffff',
            borderRadius: 24, padding: '36px 28px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
            border: `1.5px solid ${dark ? '#334155' : '#d1fae5'}`
          }}>
            <div className="row g-4 align-items-center">
              {/* Inputs */}
              <div className="col-lg-6">
                <label style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 8, display: 'block' }}>1. Select Location / City Tier</label>
                <select
                  value={calcTier}
                  onChange={(e) => setCalcTier(e.target.value)}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 12,
                    border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                    background: dark ? '#0f172a' : '#f8fafc', color: dark ? '#f8fafc' : '#0f172a',
                    fontWeight: 600, fontSize: '0.92rem', outline: 'none', marginBottom: 20
                  }}
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
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setCalcModel(m.id)}
                      style={{
                        padding: '12px 10px', borderRadius: 10,
                        border: calcModel === m.id ? '2px solid #16a34a' : `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                        background: calcModel === m.id ? (dark ? 'rgba(22,163,74,0.2)' : '#ecfdf5') : (dark ? '#0f172a' : '#f8fafc'),
                        color: calcModel === m.id ? '#16a34a' : (dark ? '#cbd5e1' : '#334155'),
                        fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'center',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div>{m.label}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.85, marginTop: 2 }}>{m.inv}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Calculation Output */}
              <div className="col-lg-6">
                <div style={{
                  background: dark ? 'linear-gradient(135deg, #0f172a 0%, #1e2d3d 100%)' : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  borderRadius: 20, padding: 24, border: '1.5px solid #86efac'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>
                    🎯 ESTIMATED METRICS: {activeCalcData.name.toUpperCase()} ({activeCalcData.investment})
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Monthly Revenue:</span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#16a34a' }}>{activeCalcData.revenue} / mo</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Annual Net Profit:</span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#2563eb' }}>{activeCalcData.profit} / yr</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Payback Period:</span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#d97706' }}>{activeCalcData.payback}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft CTA */}
            <div style={{ textAlignment: 'center', textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: `1px solid ${dark ? '#334155' : '#f1f5f9'}` }}>
              <a
                href="#franchise-form"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#0f172a', color: '#ffffff', textDecoration: 'none',
                  padding: '14px 32px', borderRadius: 12, fontWeight: 700,
                  fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem'
                }}
              >
                Get Your Personalized Franchise Report →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 4: WHY CLEANZ24 (DIFFERENTIATION) ══════════════════ */}
      <section id="why-us" style={{ padding: '80px 0', background: dark ? '#0f172a' : '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>THE COMPETITIVE EDGE</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: dark ? '#f8fafc' : '#0f172a', marginTop: 6 }}>
              Why Invest in <span style={{ color: '#16a34a' }}>Cleanz24?</span>
            </h2>

            {/* Unorganized Industry Stat Callout */}
            <div style={{
              display: 'inline-block', background: dark ? '#1e293b' : '#fef3c7',
              border: '1px solid #fde047', borderRadius: 12, padding: '10px 24px',
              marginTop: 12, color: dark ? '#fef08a' : '#854d0e', fontWeight: 600, fontSize: '0.9rem'
            }}>
              💡 <strong>96% of India's laundry sector is unorganized</strong> — Cleanz24 brings a standardized, tech-enabled brand model.
            </div>
          </div>

          <div className="row g-4">
            {whyUsCards.map((card, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div style={{
                  background: dark ? '#1e293b' : '#f8fafc', border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: 16, padding: '28px 24px', height: '100%',
                  transition: 'transform 0.2s, borderColor 0.2s'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>{card.icon}</div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: dark ? '#f8fafc' : '#0f172a', marginBottom: 8 }}>{card.title}</h4>
                  <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FRANCHISE MODELS ══════════════════ */}
      <section id="models" style={{ padding: '80px 0', background: dark ? '#161f2e' : '#f8fafb' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>INVESTMENT OPTIONS</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: dark ? '#f8fafc' : '#0f172a', marginTop: 6 }}>
              Choose Your <span style={{ color: '#16a34a' }}>Franchise Model</span>
            </h2>
            <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '0.95rem', maxWidth: 560, margin: '8px auto 0' }}>
              Pre-configured studio setups optimized for your budget, location, and business ambition.
            </p>
          </div>

          <div className="row g-4">
            {models.map((m, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div style={{
                  background: dark ? '#1e293b' : '#ffffff',
                  border: m.featured ? '2px solid #16a34a' : `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: 18, padding: '28px 22px', height: '100%', position: 'relative',
                  boxShadow: m.featured ? '0 12px 36px rgba(22,163,74,0.15)' : 'none',
                  display: 'flex', flexDirection: 'column'
                }}>
                  {m.featured && (
                    <div style={{
                      position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                      background: '#16a34a', color: '#fff', fontSize: '0.72rem', fontWeight: 700,
                      padding: '4px 16px', borderRadius: 20, letterSpacing: '1px', textTransform: 'uppercase'
                    }}>
                      MOST POPULAR
                    </div>
                  )}

                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', marginBottom: 4 }}>{m.tag}</div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: dark ? '#f8fafc' : '#0f172a', marginBottom: 8 }}>{m.title}</h3>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#16a34a', marginBottom: 12 }}>{m.investment}</div>
                  <p style={{ fontSize: '0.85rem', color: dark ? '#94a3b8' : '#64748b', marginBottom: 16, flexGrow: 0 }}>{m.sub}</p>

                  <div style={{ background: dark ? '#0f172a' : '#f8fafc', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: '0.82rem' }}>
                    <div style={{ marginBottom: 4 }}>📍 <strong>Area:</strong> {m.area}</div>
                    <div style={{ marginBottom: 4 }}>💰 <strong>Profit:</strong> {m.profit}</div>
                    <div>⏳ <strong>ROI:</strong> {m.roi}</div>
                  </div>

                  <ul style={{ paddingLeft: 0, listStyle: 'none', fontSize: '0.82rem', marginTop: 'auto', marginBottom: 20 }}>
                    {m.features.map((f, i) => (
                      <li key={i} style={{ marginBottom: 6, display: 'flex', gap: 6, color: dark ? '#cbd5e1' : '#475569' }}>
                        <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#franchise-form"
                    style={{
                      display: 'block', textAlignment: 'center', textAlign: 'center',
                      background: m.featured ? '#16a34a' : 'transparent',
                      color: m.featured ? '#ffffff' : (dark ? '#4ade80' : '#16a34a'),
                      border: m.featured ? 'none' : `1.5px solid ${dark ? '#4ade80' : '#16a34a'}`,
                      padding: '10px', borderRadius: 10, fontWeight: 700, textDecoration: 'none',
                      fontSize: '0.88rem', fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Select {m.title.split(' ')[0]} Model
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 5: FULL SUPPORT PILLARS ══════════════════ */}
      <section id="support" style={{ padding: '80px 0', background: dark ? '#0f172a' : '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>END-TO-END HANDHOLDING</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: dark ? '#f8fafc' : '#0f172a', marginTop: 6 }}>
              Full 5-Pillar <span style={{ color: '#16a34a' }}>Franchise Support</span>
            </h2>
            <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '0.95rem', maxWidth: 600, margin: '8px auto 0' }}>
              We guide you from initial site selection to daily operating excellence.
            </p>
          </div>

          <div className="row g-4">
            {supportPillars.map((p, idx) => (
              <div className="col-md-4 col-lg" key={idx}>
                <div style={{
                  background: dark ? '#1e293b' : '#f8fafc', border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: 16, padding: '24px 18px', height: '100%', position: 'relative'
                }}>
                  <div style={{
                    display: 'inline-block', background: '#16a34a', color: '#fff',
                    fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '0.8rem',
                    padding: '2px 10px', borderRadius: 12, marginBottom: 12
                  }}>
                    STEP {p.step}
                  </div>
                  <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: dark ? '#f8fafc' : '#0f172a', marginBottom: 8 }}>{p.title}</h4>
                  <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 6: SUCCESS STORIES (Hidden until verified) ══════════════════ */}
      {/* 
      <section id="testimonials" style={{ padding: '80px 0', background: dark ? '#161f2e' : '#f0faf2' }}>
        <div className="container text-center">
          <h2>Franchisee Success Stories</h2>
          <p>Real franchisee stories will be displayed here once verified.</p>
        </div>
      </section>
      */}

      {/* ══════════════════ BRAND PARTNERS ══════════════════ */}
      <section id="partners" style={{ padding: '60px 0', background: dark ? '#161f2e' : '#f8fafb', borderTop: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
        <div className="container">
          <div className="text-center mb-4">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>GLOBAL ALLIANCES</span>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: dark ? '#f8fafc' : '#0f172a', marginTop: 4 }}>Our Brand Partners</h3>
          </div>
          <div className="row g-3 justify-content-center align-items-center">
            {brandPartners.map((partner, i) => (
              <div className="col-6 col-md-4 col-lg-2" key={i}>
                <div style={{
                  background: dark ? '#1e293b' : '#ffffff', border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: 12, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 10, textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', color: dark ? '#cbd5e1' : '#475569'
                }}>
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ MEDIA MENTIONS ══════════════════ */}
      <section id="media" style={{ padding: '60px 0', background: dark ? '#0f172a' : '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-4">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>IN THE NEWS</span>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: dark ? '#f8fafc' : '#0f172a', marginTop: 4 }}>Media Mentions</h3>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {mediaMentions.map((m, i) => (
              <div key={i} style={{
                background: dark ? '#1e293b' : '#f8fafc', border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                borderRadius: 12, padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700
              }}>
                <span>{m.icon}</span>
                <span style={{ background: m.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 7: FAQs (5-6 INVESTMENT FOCUS) ══════════════════ */}
      <section id="faqs" style={{ padding: '80px 0', background: dark ? '#161f2e' : '#f0faf2' }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div className="text-center mb-5">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>GOT QUESTIONS?</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: dark ? '#f8fafc' : '#0f172a', marginTop: 6 }}>
              Franchise <span style={{ color: '#16a34a' }}>FAQs</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: dark ? '#1e293b' : '#ffffff', border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: 14, overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: '100%', padding: '18px 24px', textAlign: 'left',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem',
                    color: dark ? '#f8fafc' : '#0f172a'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.2rem', color: '#16a34a' }}>{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 24px 20px', color: dark ? '#94a3b8' : '#64748b', fontSize: '0.92rem', lineHeight: 1.6, borderTop: `1px solid ${dark ? '#334155' : '#f1f5f9'}`, paddingTop: 14 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 8: FINAL FORM (CONVERSION POINT) ══════════════════ */}
      <section id="franchise-form" style={{ padding: '90px 0', background: dark ? '#0f172a' : '#ffffff' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div style={{
            background: dark ? '#1e293b' : '#ffffff',
            borderRadius: 24, padding: '40px 32px',
            border: `2px solid ${dark ? '#334155' : '#86efac'}`,
            boxShadow: '0 16px 48px rgba(0,0,0,0.08)'
          }}>

            {/* Reassurance Banner */}
            <div style={{
              background: '#dcfce7', borderRadius: 12, padding: '10px 16px',
              textAlign: 'center', marginBottom: 24, color: '#15803d',
              fontWeight: 700, fontSize: '0.88rem'
            }}>
              📞 Our franchise team will call you within 24 hours
            </div>

            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: dark ? '#f8fafc' : '#0f172a', marginBottom: 6 }}>
                Apply for Cleanz24 <span style={{ color: '#16a34a' }}>Franchise</span>
              </h2>
              <p style={{ fontSize: '0.9rem', color: dark ? '#94a3b8' : '#64748b' }}>
                Fill out 4 minimal fields to receive the official franchise deck &amp; financial blueprint.
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 14 }}>✅</div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: '#16a34a', marginBottom: 8 }}>Application Submitted!</h3>
                <p style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '0.95rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Our franchise expansion manager will contact you at <strong>+91 {formData.phone}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFinalSubmit}>
                {/* Field 1: Name */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 6, display: 'block', color: dark ? '#cbd5e1' : '#334155' }}>1. Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Ramesh Sharma"
                    value={formData.name}
                    onChange={handleFormChange}
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: 12,
                      border: `1.5px solid ${dark ? '#334155' : '#cbd5e1'}`,
                      background: dark ? '#0f172a' : '#f8fafc',
                      color: dark ? '#f8fafc' : '#0f172a', fontSize: '0.95rem', outline: 'none'
                    }}
                    required
                  />
                </div>

                {/* Field 2: Mobile Number */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 6, display: 'block', color: dark ? '#cbd5e1' : '#334155' }}>2. Mobile Number (10 Digits) *</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span style={{
                      background: dark ? '#0f172a' : '#e2e8f0', border: `1.5px solid ${dark ? '#334155' : '#cbd5e1'}`,
                      borderRadius: 12, padding: '14px 16px', fontWeight: 700, fontSize: '0.95rem',
                      display: 'flex', alignItems: 'center'
                    }}>🇮🇳 +91</span>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleFormChange}
                      maxLength={10}
                      style={{
                        width: '100%', padding: '14px 16px', borderRadius: 12,
                        border: `1.5px solid ${dark ? '#334155' : '#cbd5e1'}`,
                        background: dark ? '#0f172a' : '#f8fafc',
                        color: dark ? '#f8fafc' : '#0f172a', fontSize: '0.95rem', outline: 'none'
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Field 3: City */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 6, display: 'block', color: dark ? '#cbd5e1' : '#334155' }}>3. Target City / Area *</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="e.g. Noida / Gurugram / Pune"
                    value={formData.city}
                    onChange={handleFormChange}
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: 12,
                      border: `1.5px solid ${dark ? '#334155' : '#cbd5e1'}`,
                      background: dark ? '#0f172a' : '#f8fafc',
                      color: dark ? '#f8fafc' : '#0f172a', fontSize: '0.95rem', outline: 'none'
                    }}
                    required
                  />
                </div>

                {/* Field 4: Investment Budget */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 6, display: 'block', color: dark ? '#cbd5e1' : '#334155' }}>4. Investment Budget Range *</label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={handleFormChange}
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: 12,
                      border: `1.5px solid ${dark ? '#334155' : '#cbd5e1'}`,
                      background: dark ? '#0f172a' : '#f8fafc',
                      color: dark ? '#f8fafc' : '#0f172a', fontSize: '0.95rem', outline: 'none'
                    }}
                  >
                    <option>₹13L - ₹15L (Alpha Model)</option>
                    <option>₹15L - ₹20L (Beta Model)</option>
                    <option>₹20L - ₹25L (Combo Model)</option>
                    <option>₹25L+ (Hydro-Carbon Studio)</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%', padding: '16px', borderRadius: 12, border: 'none',
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    color: '#ffffff', fontWeight: 800, fontSize: '1.05rem',
                    fontFamily: 'Poppins, sans-serif', cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(22,163,74,0.3)', transition: 'transform 0.2s'
                  }}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Talk to Franchise Team →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════ LOCATIONS GRID ══════════════════ */}
      <section id="locations" style={{ padding: '60px 0', background: dark ? '#161f2e' : '#f8fafb', borderTop: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
        <div className="container">
          <div className="text-center mb-4">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>PAN-INDIA NETWORK</span>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: dark ? '#f8fafc' : '#0f172a', marginTop: 4 }}>Franchise Locations Across India</h3>
          </div>
          <div style={{
            maxHeight: 340, overflowY: 'auto', padding: '20px 16px', borderRadius: 16,
            background: dark ? 'rgba(15, 22, 35, 0.6)' : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`
          }}>
            <div className="row g-2 justify-content-center">
              {FRANCHISE_CITIES && FRANCHISE_CITIES.map((item, i) => (
                <div className="col-6 col-md-3 col-lg-2" key={i}>
                  <Link href={`/best-laundry-drycleaning/franchise-opportunities/${item.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '8px 12px', borderRadius: 8, background: dark ? '#1e293b' : '#f1f5f9',
                      fontSize: '0.82rem', color: dark ? '#cbd5e1' : '#334155', fontWeight: 600,
                      textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }} title={`${item.city}, ${item.state}`}>
                      📍 {item.city}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ PERSISTENT STICKY WHATSAPP BAR (MOBILE & DESKTOP) ══════════════════ */}
      <a
        href="https://wa.me/919138004800?text=Hi%2C%20I%20am%20interested%20in%20a%20Cleanz24%20Laundry%20Franchise.%20Please%20send%20details."
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
          background: '#25d366', color: '#ffffff', textDecoration: 'none',
          padding: '12px 20px', borderRadius: 30, fontWeight: 700, fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 8px 24px rgba(37,211,102,0.4)', fontFamily: 'Poppins, sans-serif'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>💬</span> Chat with Franchise Team
      </a>

    </div>
  );
}

export default LaundryFrenchise;
