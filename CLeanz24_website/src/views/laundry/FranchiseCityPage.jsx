'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL } from "../../config";

import { FRANCHISE_CITIES, HIGH_VALUE_KEYWORDS } from "../../data/franchiseCities";
export { FRANCHISE_CITIES, HIGH_VALUE_KEYWORDS };

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
  storeimg7
];

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



const STATS = [
  { value: "100+", label: "Active Stores" },
  { value: "21", label: "States Covered" },
  { value: "35-45%", label: "Profit Margin" },
  { value: "18-20 mo", label: "ROI Recovery" },
];

const WHY_CLEANZ24 = [
  { icon: "📈", title: "Most Profitable Business Model", desc: "Cleanz24 franchise delivers 35-45% net margins — one of the highest in the service franchise sector. Proven across 100+ stores." },
  { icon: "🏆", title: "Best Laundry Franchise Opportunity", desc: "India's premium laundry & dry cleaning franchise. 5-star rated, tech-enabled, and built for rapid scale." },
  { icon: "💰", title: "Low Investment, High Return", desc: "Start with just ₹13 Lacs+. Get complete store setup, branding, training, supply chain, and digital marketing from Day 1." },
  { icon: "🤝", title: "Complete Business Support", desc: "From site selection to daily operations, our franchise team is with you. No experience required." },
  { icon: "🌐", title: "Digital & SEO Marketing Included", desc: "Every franchise gets a dedicated local Google listing, social media handle, and city page on Cleanz24.com." },
  { icon: "📦", title: "Proven & Scalable Franchise Model", desc: "Replicate our proven business system. Multi-unit options available. Partners earning ₹2-5 Lakh per month." },
];

const SERVICES = [
  { icon: "👕", name: "Wash & Fold", slug: "wash-and-fold", desc: "Best-in-class clothes washing with premium detergents" },
  { icon: "🥼", name: "Dry Cleaning", slug: "dry-cleaning", desc: "Expert dry cleaning for delicate fabrics, suits & sarees" },
  { icon: "♨", name: "Steam Ironing", slug: "steam-ironing", desc: "Professional steam pressing for crisp, wrinkle-free clothes" },
  { icon: "👟", name: "Shoe Cleaning", slug: "shoe-cleaning", desc: "Premium sneaker & leather shoe spa & restoration" },
  { icon: "👜", name: "Bag Cleaning", slug: "bag-cleaning", desc: "Luxury leather bag & handbag cleaning service" },
  { icon: "🛋", name: "Sofa & Carpet", slug: "sofa-and-carpet", desc: "Deep cleaning for sofas, carpets & curtains at home" },
];

const INVESTMENT = [
  { tier: "ALPHA MODEL", investment: "₹13 Lacs+", area: "250 Sq.Ft (Minimum)", revenue: "₹1 Lakh/Month+", roi: "18-20 Months", badge: "Starter" },
  { tier: "BETA MODEL", investment: "₹15 Lacs+", area: "250 Sq.Ft (Minimum)", revenue: "₹1.5 Lacs/Month+", roi: "18-20 Months", badge: "Most Popular" },
  { tier: "COMBO MODEL", investment: "₹22 Lacs+", area: "400 Sq.Ft (Minimum)", revenue: "₹2 Lacs/Month+", roi: "18-20 Months", badge: "Commercial Combo" },
  { tier: "HYDRO-CARBON MODEL", investment: "₹35 Lacs+", area: "500 Sq.Ft (Minimum)", revenue: "₹2.5 Lacs/Month+", roi: "18-20 Months", badge: "Premium Dry-Clean" },
];

const PAGE_CSS = (dark) => `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
  .fcp-page { font-family:'Inter',sans-serif; color:${dark?"#e2e8f0":"#1a202c"}; background:${dark?"#0f1623":"#fff"}; }
  .fcp-hero { background: url('/assets/store_hero.jpg') center/cover no-repeat; padding:100px 0 70px; position:relative; overflow:hidden; }
  .fcp-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(22,163,74,0.15); border:1px solid rgba(22,163,74,0.4); color:#15803d; font-size:0.8rem; font-weight:600; padding:6px 16px; border-radius:99px; margin-bottom:20px; letter-spacing:0.05em; text-transform:uppercase; }
  .fcp-city-name { font-family:'Poppins',sans-serif; font-size:clamp(2.2rem,5vw,3.8rem); font-weight:900; color:${dark?"#f1f5f9":"#0f172a"}; line-height:1.1; margin-bottom:8px; }
  .fcp-city-highlight { color:#16a34a; }
  .fcp-hero-sub { font-size:1.1rem; color:${dark?"#94a3b8":"#334155"}; max-width:560px; margin:16px 0 32px; line-height:1.7; }
  .fcp-hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
  .fcp-btn-primary { background:linear-gradient(135deg,#16a34a,#15803d); color:#fff; border:none; border-radius:8px; padding:14px 32px; font-size:1rem; font-weight:700; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all 0.2s; box-shadow:0 4px 20px rgba(22,163,74,0.35); }
  .fcp-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(22,163,74,0.45); }
  .fcp-btn-secondary { background:transparent; color:${dark?"#4ade80":"#16a34a"}; border:2px solid ${dark?"#4ade80":"#16a34a"}; border-radius:8px; padding:14px 32px; font-size:1rem; font-weight:700; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all 0.2s; }
  .fcp-btn-secondary:hover { background:${dark?"rgba(74,222,128,0.1)":"rgba(22,163,74,0.08)"}; }
  .fcp-stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:20px; margin:48px 0 0; }
  .fcp-stat { background:${dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.8)"}; border:1px solid ${dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.06)"}; border-radius:12px; padding:20px; text-align:center; backdrop-filter:blur(10px); }
  .fcp-stat-val { font-family:'Poppins',sans-serif; font-size:1.8rem; font-weight:800; color:${dark?"#4ade80":"#16a34a"}; }
  .fcp-stat-label { font-size:0.8rem; color:${dark?"#94a3b8":"#6b7280"}; margin-top:4px; font-weight:500; }
  .fcp-section { padding:70px 0; }
  .fcp-section-alt { background:${dark?"#111827":"#f9fafb"}; }
  .fcp-section-title { font-family:'Poppins',sans-serif; font-size:clamp(1.6rem,3.5vw,2.4rem); font-weight:800; color:${dark?"#f1f5f9":"#111"}; margin-bottom:12px; }
  .fcp-section-sub { color:${dark?"#94a3b8":"#6b7280"}; font-size:1rem; max-width:540px; }
  .fcp-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; margin-top:40px; }
  .fcp-card { background:${dark?"#1e293b":"#fff"}; border:1px solid ${dark?"#334155":"#e5e7eb"}; border-radius:16px; padding:28px; transition:all 0.25s; }
  .fcp-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,${dark?"0.3":"0.1"}); border-color:${dark?"#4ade80":"#16a34a"}; }
  .fcp-card-icon { font-size:2rem; margin-bottom:14px; }
  .fcp-card-title { font-family:'Poppins',sans-serif; font-size:1.05rem; font-weight:700; color:${dark?"#f1f5f9":"#111"}; margin-bottom:8px; }
  .fcp-card-desc { font-size:0.9rem; color:${dark?"#94a3b8":"#6b7280"}; line-height:1.6; }
  .fcp-service-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:18px; margin-top:36px; }
  .fcp-service-card { background:${dark?"#1e293b":"#fff"}; border:1px solid ${dark?"#334155":"#e5e7eb"}; border-radius:12px; padding:22px; text-align:center; transition: all 0.25s ease-in-out; }
  .fcp-service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,${dark?"0.35":"0.08"}); border-color: ${dark?"#4ade80":"#16a34a"}; }
  .fcp-service-icon { font-size:2.2rem; margin-bottom:10px; }
  .fcp-service-name { font-weight:700; color:${dark?"#f1f5f9":"#111"}; font-size:0.95rem; margin-bottom:6px; }
  .fcp-service-desc { font-size:0.82rem; color:${dark?"#94a3b8":"#6b7280"}; }
  .fcp-invest-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:24px; margin-top:40px; }
  .fcp-invest-card { background:${dark?"#1e293b":"#fff"}; border:2px solid ${dark?"#334155":"#e5e7eb"}; border-radius:16px; padding:30px; position:relative; }
  .fcp-invest-card.popular { border-color:#16a34a; }
  .fcp-invest-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,#16a34a,#15803d); color:#fff; font-size:0.75rem; font-weight:700; padding:4px 16px; border-radius:99px; white-space:nowrap; }
  .fcp-invest-tier { font-family:'Poppins',sans-serif; font-size:1.1rem; font-weight:700; color:${dark?"#f1f5f9":"#111"}; margin-bottom:12px; }
  .fcp-invest-amount { font-size:1.6rem; font-weight:800; color:${dark?"#4ade80":"#16a34a"}; margin-bottom:6px; }
  .fcp-invest-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid ${dark?"#334155":"#f3f4f6"}; font-size:0.88rem; }
  .fcp-invest-row:last-child { border-bottom:none; }
  .fcp-invest-label { color:${dark?"#94a3b8":"#6b7280"}; }
  .fcp-invest-val { font-weight:600; color:${dark?"#e2e8f0":"#1a202c"}; }
  .fcp-form-wrap { background:${dark?"#1e293b":"#fff"}; border:1px solid ${dark?"#334155":"#e5e7eb"}; border-radius:20px; padding:40px; max-width:560px; }
  .fcp-form-title { font-family:'Poppins',sans-serif; font-size:1.5rem; font-weight:800; color:${dark?"#f1f5f9":"#111"}; margin-bottom:6px; }
  .fcp-form-sub { color:${dark?"#94a3b8":"#6b7280"}; font-size:0.9rem; margin-bottom:28px; }
  .fcp-form label { display:block; font-weight:600; font-size:0.85rem; color:${dark?"#cbd5e1":"#374151"}; margin-bottom:6px; }
  .fcp-form input,.fcp-form select { width:100%; border:1.5px solid ${dark?"#334155":"#d1d5db"}; border-radius:8px; padding:11px 14px; font-size:0.95rem; color:${dark?"#e2e8f0":"#1a202c"}; background:${dark?"#0f1623":"#f9fafb"}; outline:none; margin-bottom:18px; box-sizing:border-box; transition:border-color 0.2s; }
  .fcp-form input:focus,.fcp-form select:focus { border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,0.15); }
  .fcp-form input::placeholder { color:${dark?"#64748b":"#9ca3af"}; }
  .fcp-keywords { display:flex; flex-wrap:wrap; gap:10px; margin-top:32px; }
  .fcp-keyword { background:${dark?"rgba(34,197,94,0.1)":"rgba(34,197,94,0.08)"}; border:1px solid ${dark?"rgba(34,197,94,0.25)":"rgba(34,197,94,0.3)"}; color:${dark?"#4ade80":"#15803d"}; font-size:0.8rem; font-weight:600; padding:5px 14px; border-radius:99px; }
  .fcp-breadcrumb { display:flex; align-items:center; gap:8px; font-size:0.85rem; color:${dark?"#94a3b8":"#475569"}; margin-bottom:24px; flex-wrap:wrap; }
  .fcp-breadcrumb a { color:${dark?"#4ade80":"#16a34a"}; text-decoration:none; }
  .fcp-breadcrumb a:hover { text-decoration:underline; }
  .fcp-success { text-align:center; padding:40px 20px; }
  .fcp-success-icon { font-size:3rem; margin-bottom:12px; }
  .fcp-success-title { font-family:'Poppins',sans-serif; font-size:1.4rem; font-weight:700; color:${dark?"#4ade80":"#16a34a"}; margin-bottom:8px; }
  .fcp-success-text { color:${dark?"#94a3b8":"#6b7280"}; font-size:0.95rem; }
  @media(max-width:768px) {
    .fcp-hero { padding:60px 0 40px; }
    .fcp-hero-glass { padding:24px 20px !important; border-radius:20px !important; }
    .fcp-city-name { font-size:1.8rem !important; }
    .fcp-hero-sub { font-size:0.92rem !important; margin:10px 0 20px !important; }
    .fcp-badge { font-size:0.7rem !important; padding:4px 12px !important; }
    .fcp-btn-primary, .fcp-btn-secondary { padding:11px 18px !important; font-size:0.88rem !important; }
    .fcp-stats { grid-template-columns:repeat(2,1fr); gap:12px; margin:30px 0 0; }
    .fcp-stat { padding:14px 10px; }
    .fcp-stat-val { font-size:1.4rem; }
    .fcp-form-wrap { padding:24px; }
    .fcp-section { padding:40px 0; }
  }
`;

export default function FranchiseCityPage() {
  const { citySlug } = (useParams() || {});
  const ctx = (typeof useOutletContext === "function" ? (() => ({ isDarkMode: false, toggleTheme: () => {} }))() : null) || {};
  const dark = ctx.darkMode ?? false;
  const cityData = FRANCHISE_CITIES.find((c) => c.slug === citySlug);
  const cityName = cityData ? cityData.city : "Your City";
  const stateName = cityData ? cityData.state : "India";

  const [form, setForm] = useState({ name: "", phone: "", email: "", model: "ALPHA MODEL" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const dateStr = new Date().toISOString().split("T")[0];
      const payload = {
        date: dateStr, Date: dateStr, timestamp: dateStr, Timestamp: dateStr,
        name: form.name, Name: form.name,
        mobile: "'+91 " + form.phone, phone: "'+91 " + form.phone, Phone: "'+91 " + form.phone, Mobile: "'+91 " + form.phone,
        email: form.email, Email: form.email,
        city: cityName, City: cityName, Location: cityName,
        modelType: form.model + " (Franchise City Page)", Model: form.model, Investment: form.model,
        source: "Franchise City Page - " + cityName, Source: "Franchise City Page - " + cityName
      };

      await fetch("https://script.google.com/macros/s/AKfycbwgrxbbzmaqU8BT-l7xFSriJ-BNM01ad5Qo66ZOfR-XBF4ag9h1u1ErJcAN4J7LcM4p/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      });

      if (typeof window !== "undefined") {
        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", { send_to: "AW-16562330559/Ly9XCOC_iLQaEL-3xNk9" });
          window.gtag("event", "laundry_franchise_lead", { event_category: "Franchise", event_label: "Franchise City Page Submission - " + cityName });
        }
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting city franchise form:", err);
      // Even in no-cors or network glitch, show success to user
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const canonicalUrl = "https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities/" + citySlug;
  const pageTitle = "Best Laundry & Dry Cleaning Franchise in " + cityName + " | Cleanz24";
  const pageDesc = "Start the most profitable laundry & dry cleaning franchise in " + cityName + ", " + stateName + ". Investment starting ₹13 Lacs+, high profit margins, 100+ stores network. Enquire now!";
  const pageKeywords = ["laundry franchise in " + cityName, "dry cleaning franchise " + cityName, "best franchise opportunity in " + cityName, "profitable business in " + cityName, "laundry service near me " + cityName, "best laundry service " + cityName, "dry cleaning service near me " + cityName, "best business model " + cityName, "low investment franchise " + cityName, "Cleanz24 franchise " + cityName, ...HIGH_VALUE_KEYWORDS].join(", ");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "LocalBusiness", name: "Cleanz24 Laundry & Dry Cleaning - " + cityName, description: pageDesc, url: canonicalUrl, telephone: "+919138004800", address: { "@type": "PostalAddress", addressLocality: cityName, addressRegion: stateName, addressCountry: "IN" }, priceRange: "₹₹", aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "500" } },
      { "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: "How much does a Cleanz24 franchise cost in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "A Cleanz24 franchise in " + cityName + " starts at ₹13 Lacs+ for the Alpha Model, ₹15 Lacs+ for Beta Model, ₹22 Lacs+ for Combo Model, and ₹35 Lacs+ for Hydro-Carbon Model." } },
        { "@type": "Question", name: "Is laundry franchise the best profitable business in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "Yes! Cleanz24 franchise delivers 35-45% net profit margins in " + cityName + ". Franchise partners earn ₹1-2.5 Lacs+ per month with full brand & CRM support." } },
        { "@type": "Question", name: "What is the best franchise opportunity in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "Cleanz24 is India's leading laundry & dry cleaning franchise with 100+ stores across 21 states. Proven ROI in 18-20 months." } },
        { "@type": "Question", name: "Where can I find the best dry cleaning service near me in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "Cleanz24 is the best laundry & dry cleaning service near you in " + cityName + ". Call +91 91380 04800 for store details & franchise opportunities." } },
      ]},
    ],
  };

  const waLink = "https://wa.me/919138004800?text=Hi%20I%20want%20to%20know%20about%20Cleanz24%20franchise%20in%20" + encodeURIComponent(cityName);

  return (
    <div className="fcp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <style>{PAGE_CSS(dark)}</style>
      
      {/* HERO */}
      <section className="fcp-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div
                className="fcp-hero-glass"
                style={{
                  background: dark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.90)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: 24,
                  padding: '32px',
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                }}
              >
                <nav className="fcp-breadcrumb" aria-label="breadcrumb">
                  <Link href="/best-laundry-drycleaning">Home</Link><span>›</span>
                  <Link href="/franchise-opportunities-in-india">Franchise</Link><span>›</span>
                  <span style={{ color: dark ? '#94a3b8' : '#475569' }}>{cityName}</span>
                </nav>
                <span className="fcp-badge">🚀 100+ Stores Network — Franchise in {cityName}</span>
                <h1 className="fcp-city-name">Best Laundry & Dry Cleaning<br /><span className="fcp-city-highlight">Franchise in {cityName}</span></h1>
                <p className="fcp-hero-sub">Join India's most profitable laundry franchise network (100+ Stores) in <strong>{cityName}, {stateName}</strong>. Investment starting ₹13 Lacs+ · High returns · Full support · 18-20 Mo ROI.</p>
                <div className="fcp-hero-btns">
                  <a href="#apply-now" className="fcp-btn-primary">📋 Apply for Franchise</a>
                  <a href={waLink} target="_blank" rel="noreferrer" className="fcp-btn-secondary">💬 WhatsApp Us</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <HeroSlideshow dark={dark} />
            </div>
          </div>
          <div className="fcp-stats">{STATS.map((s) => (<div className="fcp-stat" key={s.label}><div className="fcp-stat-val">{s.value}</div><div className="fcp-stat-label">{s.label}</div></div>))}</div>
        </div>
      </section>



      {/* WHY CLEANZ24 */}
      <section className="fcp-section">
        <div className="container">
          <h2 className="fcp-section-title">Why Cleanz24 is the <span style={{ color: dark ? "#4ade80" : "#16a34a" }}>Best Franchise in {cityName}</span>?</h2>
          <p className="fcp-section-sub">Best profitable business model · Most successful franchise idea · High retention business opportunity</p>
          <div className="fcp-cards">{WHY_CLEANZ24.map((c) => (<div className="fcp-card" key={c.title}><div className="fcp-card-icon">{c.icon}</div><div className="fcp-card-title">{c.title}</div><div className="fcp-card-desc">{c.desc}</div></div>))}</div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="fcp-section fcp-section-alt">
        <div className="container">
          <h2 className="fcp-section-title">Best Laundry & Dry Cleaning Services Near You in {cityName}</h2>
          <p className="fcp-section-sub">Your franchise store will offer all premium laundry, dry cleaning & car spa services in {cityName}</p>
          <div className="fcp-service-cards">
            {SERVICES.map((s) => (
              <Link href={`/best-laundry-drycleaning/franchise-opportunities/${citySlug}/${s.slug}`} key={s.name} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="fcp-service-card">
                  <div className="fcp-service-icon">{s.icon}</div>
                  <div className="fcp-service-name">{s.name}</div>
                  <div className="fcp-service-desc">{s.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT MODELS - EXACT MATCH WITH MAIN FRANCHISE PAGE */}
      <section className="fcp-section">
        <div className="container">
          <h2 className="fcp-section-title">Franchise Models & Investment in {cityName}</h2>
          <p className="fcp-section-sub">Exact investment models & pricing structure for opening a store in {cityName}</p>
          <div className="fcp-invest-cards">
            {INVESTMENT.map((inv) => (
              <div className={"fcp-invest-card" + (inv.badge === "Most Popular" ? " popular" : "")} key={inv.tier}>
                {inv.badge ? <span className="fcp-invest-badge">{inv.badge}</span> : null}
                <div className="fcp-invest-tier">{inv.tier}</div>
                <div className="fcp-invest-amount">{inv.investment}</div>
                <div className="fcp-invest-row"><span className="fcp-invest-label">Area Required</span><span className="fcp-invest-val">{inv.area}</span></div>
                <div className="fcp-invest-row"><span className="fcp-invest-label">Net Profit</span><span className="fcp-invest-val">{inv.revenue}</span></div>
                <div className="fcp-invest-row"><span className="fcp-invest-label">ROI Recovery</span><span className="fcp-invest-val">{inv.roi}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM & APPLY */}
      <section className="fcp-section fcp-section-alt" id="apply-now">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "flex-start" }}>
            <div>
              <h2 className="fcp-section-title">Start Your <span style={{ color: dark ? "#4ade80" : "#16a34a" }}>Franchise in {cityName}</span> Today</h2>
              <p style={{ color: dark ? "#94a3b8" : "#6b7280", fontSize: "1rem", lineHeight: 1.7, marginBottom: "24px" }}>Take the first step towards owning the most profitable business in {cityName}. Our team will call you within 24 hours with a complete franchise kit.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>{["✅ Free franchise consultation call", "✅ Detailed ROI & profit model", "✅ Site selection & store setup support", "✅ Complete staff training & marketing kit", "✅ Exclusive area rights in " + cityName].map((p) => (<div key={p} style={{ fontSize: "0.92rem", color: dark ? "#cbd5e1" : "#374151", fontWeight: 500 }}>{p}</div>))}</div>
              <div className="fcp-keywords">{["Laundry Franchise " + cityName, "Dry Cleaning Franchise " + cityName, "Best Business " + cityName, "Low Investment High Returns", "Profitable Franchise Model", "Service Near Me " + cityName].map((k) => (<span className="fcp-keyword" key={k}>{k}</span>))}</div>
            </div>

            <div className="fcp-form-wrap" id="franchise-form">
              {submitted ? (
                <div className="fcp-success">
                  <div className="fcp-success-icon">🎉</div>
                  <div className="fcp-success-title">Enquiry Received!</div>
                  <div className="fcp-success-text">
                    Thank you! Our franchise team will call you within 24 hours regarding your enquiry for <strong>{cityName}</strong>.<br /><br />
                    You can also WhatsApp us directly at <strong>+91 91380 04800</strong>.
                  </div>
                </div>
              ) : (
                <>
                  <div className="fcp-form-title">Franchise Enquiry — {cityName}</div>
                  <div className="fcp-form-sub">Fill the form to get your FREE franchise brochure & ROI report for {cityName}</div>
                  <form className="fcp-form" onSubmit={handleSubmit}>
                    <label>Full Name <span style={{ color: "#e53e3e" }}>*</span></label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />

                    <label>Phone Number <span style={{ color: "#e53e3e" }}>*</span></label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" required />

                    <label>Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />

                    <label>Select Franchise Model</label>
                    <select name="model" value={form.model} onChange={handleChange}>
                      <option value="ALPHA MODEL">ALPHA MODEL — ₹13 Lacs+ (Starter)</option>
                      <option value="BETA MODEL">BETA MODEL — ₹15 Lacs+ (Most Popular)</option>
                      <option value="COMBO MODEL">COMBO MODEL — ₹22 Lacs+ (Commercial)</option>
                      <option value="HYDRO-CARBON MODEL">HYDRO-CARBON MODEL — ₹35 Lacs+ (Premium)</option>
                    </select>

                    {error ? <p style={{ color: "#e53e3e", fontSize: "0.88rem", marginBottom: "12px" }}>{error}</p> : null}

                    <button type="submit" className="fcp-btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={submitting}>
                      {submitting ? "⏳ Submitting..." : "🚀 Apply for " + cityName + " Franchise"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 1000+ WORDS SEO ARTICLE GUIDE FOR CITY FRANCHISE */}
      <section className="fcp-section" style={{ background: dark ? '#0f1623' : '#ffffff', borderTop: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
        <div className="container" style={{ maxWidth: '1000px', lineHeight: '1.8' }}>
          <h2 className="fcp-section-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '20px' }}>
            Complete Guide: Opening a Profitable <span style={{ color: dark ? '#4ade80' : '#16a34a' }}>Cleanz24 Franchise in {cityName}</span>
          </h2>
          <p style={{ fontSize: '1rem', color: dark ? '#cbd5e1' : '#475569', marginBottom: '24px' }}>
            Starting a business in <strong>{cityName}, {stateName}</strong> requires choosing an industry with consistent consumer demand, predictable cashflows, and high net profit margins. Among various retail and service business models, the laundry and dry cleaning sector stands out as one of the most resilient, recession-proof, and lucrative opportunities in India today. As urban lifestyles in {cityName} accelerate, working professionals, families, and commercial establishments increasingly outsource their garment care, sneaker spa, and home upholstery cleaning needs to professional studios.
          </p>
          <p style={{ fontSize: '1rem', color: dark ? '#cbd5e1' : '#475569', marginBottom: '24px' }}>
            Cleanz24 is India's leading tech-enabled laundry and dry cleaning franchise network, boasting over <strong>100+ active stores across 21+ states</strong>. By bringing modern European hydrocarbon cleaning technology, automated POS billing software, and doorstep pickup-and-delivery logistics to {cityName}, Cleanz24 empowers franchise partners to launch a turnkey business with fast ROI (18-20 months) and healthy 35-45% net profit margins.
          </p>

          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: dark ? '#f1f5f9' : '#0f172a', marginTop: '36px', marginBottom: '16px' }}>
            1. Why {cityName} is the Ideal Market for a Premium Laundry Studio
          </h3>
          <p style={{ fontSize: '0.98rem', color: dark ? '#94a3b8' : '#475569', marginBottom: '20px' }}>
            The demand for organized laundry and eco-friendly dry cleaning in {cityName} has grown rapidly over the past few years. Traditional unorganized local dhobis often use harsh chemical detergents, hard tap water, and unhygienic wash methods that lead to fabric damage, color bleeding, and shrinkage. High-income households, corporate employees, and fashion-conscious residents in {cityName} are actively seeking organized alternatives that offer fabric safety, hygienic soft-water processing, and doorstep convenience.
          </p>
          <p style={{ fontSize: '0.98rem', color: dark ? '#94a3b8' : '#475569', marginBottom: '24px' }}>
            Furthermore, real estate development and residential township expansion in {cityName} create dense customer catchments within a 3 to 5 km radius of a Cleanz24 studio. By offering services ranging from daily wash & fold to silk saree dry cleaning, suit pressing, sneaker spa, luxury bag restoration, and sofa shampooing, a single Cleanz24 outlet in {cityName} addresses multiple recurring revenue streams under one roof.
          </p>

          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: dark ? '#f1f5f9' : '#0f172a', marginTop: '36px', marginBottom: '16px' }}>
            2. Comprehensive Turnkey Support Provided by Cleanz24 in {cityName}
          </h3>
          <p style={{ fontSize: '0.98rem', color: dark ? '#94a3b8' : '#475569', marginBottom: '20px' }}>
            When you sign up for a Cleanz24 franchise in {cityName}, you receive end-to-end operational, technical, and marketing backing from our core expansion team:
          </p>
          <ul style={{ paddingLeft: '24px', color: dark ? '#cbd5e1' : '#334155', marginBottom: '28px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Location Intelligence & Site Approval:</strong> Our real estate research team analyzes footfall density, competitor presence, and neighborhood demographics in {cityName} to approve the optimal store location.</li>
            <li style={{ marginBottom: '12px' }}><strong>Turnkey Interior Design & Equipment Setup:</strong> We manage store layout design, branding signages, commercial laundry machinery installation, steam pressing tables, and chemical dosing setups.</li>
            <li style={{ marginBottom: '12px' }}><strong>Staff Recruitment & Master Training:</strong> Our master trainers conduct a rigorous 7-day hands-on training program for your store operators on fabric classification, stain removal, machine operation, and customer service.</li>
            <li style={{ marginBottom: '12px' }}><strong>Proprietary POS & App Logistics:</strong> Access our cloud-based POS billing software, customer mobile app, automatic WhatsApp order status alerts, and daily sales analytics dashboard.</li>
            <li style={{ marginBottom: '12px' }}><strong>Digital Marketing & Local SEO Dominance:</strong> We set up your store's Google Business Profile, run targeted meta campaigns, and publish custom localized SEO pages to drive high-intent leads in {cityName} from Day 1.</li>
          </ul>

          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: dark ? '#f1f5f9' : '#0f172a', marginTop: '36px', marginBottom: '16px' }}>
            3. Versatile Franchise Investment Models Tailored for {cityName}
          </h3>
          <p style={{ fontSize: '0.98rem', color: dark ? '#94a3b8' : '#475569', marginBottom: '20px' }}>
            To suit different budget capabilities and commercial spaces in {cityName}, Cleanz24 offers four structured investment tiers:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div style={{ background: dark ? '#1e293b' : '#f8fafc', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, borderRadius: '14px', padding: '20px' }}>
              <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '1.1rem', marginBottom: '6px' }}>ALPHA MODEL (₹13 Lacs+)</div>
              <p style={{ fontSize: '0.88rem', color: dark ? '#94a3b8' : '#64748b', margin: 0 }}>Ideal for residential neighborhoods (250 sq.ft min area). Equipped with 15kg washer-extractor stackers, steam press tables, and soft-water detergents. Generates ₹1L+ monthly profit.</p>
            </div>
            <div style={{ background: dark ? '#1e293b' : '#f8fafc', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, borderRadius: '14px', padding: '20px' }}>
              <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '1.1rem', marginBottom: '6px' }}>BETA MODEL (₹15 Lacs+)</div>
              <p style={{ fontSize: '0.88rem', color: dark ? '#94a3b8' : '#64748b', margin: 0 }}>Our most popular model for high-density areas in {cityName}. Includes extra washer stackers, sneaker spa kit, and full digital marketing. Generates ₹1.5L+ monthly profit.</p>
            </div>
            <div style={{ background: dark ? '#1e293b' : '#f8fafc', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, borderRadius: '14px', padding: '20px' }}>
              <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '1.1rem', marginBottom: '6px' }}>COMBO MODEL (₹22 Lacs+)</div>
              <p style={{ fontSize: '0.88rem', color: dark ? '#94a3b8' : '#64748b', margin: 0 }}>Commercial setup handling bulk B2B orders (hotels, hostels, corporate) plus retail B2C. Features 18kg standalone machines. Generates ₹2L+ monthly profit.</p>
            </div>
            <div style={{ background: dark ? '#1e293b' : '#f8fafc', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, borderRadius: '14px', padding: '20px' }}>
              <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '1.1rem', marginBottom: '6px' }}>HYDRO-CARBON MODEL (₹35 Lacs+)</div>
              <p style={{ fontSize: '0.88rem', color: dark ? '#94a3b8' : '#64748b', margin: 0 }}>Ultra-premium studio with eco-friendly hydrocarbon dry cleaning machinery for delicate silks, leather jackets, and luxury wear. Generates ₹2.5L+ monthly profit.</p>
            </div>
          </div>

          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: dark ? '#f1f5f9' : '#0f172a', marginTop: '36px', marginBottom: '16px' }}>
            4. Step-by-Step Path to Launch Your Studio in {cityName}
          </h3>
          <p style={{ fontSize: '0.98rem', color: dark ? '#94a3b8' : '#475569', marginBottom: '20px' }}>
            Launching your Cleanz24 studio in {cityName} follows a streamlined, fast-track 30 to 45-day roadmap:
          </p>
          <ol style={{ paddingLeft: '24px', color: dark ? '#cbd5e1' : '#334155', marginBottom: '28px' }}>
            <li style={{ marginBottom: '10px' }}><strong>Initial Consultation & Application:</strong> Fill out the inquiry form above to receive the detailed brochure and schedule a call with our franchise manager.</li>
            <li style={{ marginBottom: '10px' }}><strong>Franchise Agreement & Zone Reservation:</strong> Lock in your target territory in {cityName} with exclusive territorial rights.</li>
            <li style={{ marginBottom: '10px' }}><strong>Site Finalization & Interior Fit-Out:</strong> Our team assists in landlord negotiations, store blueprint design, electrical wiring, plumbing, and signage installation.</li>
            <li style={{ marginBottom: '10px' }}><strong>Machinery Delivery & Staff Onboarding:</strong> Commercial machines are installed and calibrated, while your staff undergoes comprehensive training.</li>
            <li style={{ marginBottom: '10px' }}><strong>Grand Opening Campaign:</strong> We launch local digital campaigns, flyer distributions, and inaugural discount offers to ensure strong opening day footfall in {cityName}.</li>
          </ol>

          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: dark ? '#f1f5f9' : '#0f172a', marginTop: '36px', marginBottom: '16px' }}>
            5. Frequently Searched Franchise & Service Topics in {cityName}
          </h3>
          <p style={{ fontSize: '0.98rem', color: dark ? '#94a3b8' : '#475569', marginBottom: '20px' }}>
            As a franchise owner in {cityName}, your studio will automatically rank for and serve popular local searches such as <em>"best laundry franchise in {cityName}"</em>, <em>"dry cleaning business opportunity in {cityName}"</em>, <em>"low investment high return franchise near me"</em>, <em>"doorstep laundry delivery in {cityName}"</em>, and <em>"sneaker shoe spa in {cityName}"</em>.
          </p>
          <p style={{ fontSize: '0.98rem', color: dark ? '#94a3b8' : '#475569', marginBottom: '12px' }}>
            Ready to build a stable, scalable, and highly profitable business in <strong>{cityName}, {stateName}</strong>? Submit your inquiry form today or contact our franchise team at <strong>+91 91380 04800</strong> to get started.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="fcp-section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <h2 className="fcp-section-title">FAQs — Cleanz24 Franchise in {cityName}</h2>
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { q: "How much does a Cleanz24 franchise cost in " + cityName + "?", a: "A Cleanz24 franchise in " + cityName + " starts at ₹13 Lacs+ for Alpha Model, ₹15 Lacs+ for Beta Model, ₹22 Lacs+ for Combo Model, and ₹35 Lacs+ for Hydro-Carbon Model." },
              { q: "Is laundry franchise the best profitable business in " + cityName + "?", a: "Yes! Laundry is a recession-proof business. Cleanz24 franchise delivers 35-45% net profit margins in " + cityName + ". Partners earn ₹1-2.5 Lacs+ per month." },
              { q: "Where can I find the best dry cleaning service near me in " + cityName + "?", a: "Cleanz24 is the best dry cleaning & laundry service near you in " + cityName + ". Call +91 91380 04800 or WhatsApp for store details." },
              { q: "What support does Cleanz24 provide to franchise partners in " + cityName + "?", a: "Full support: site selection, store setup, staff training, tech & CRM platform, marketing & SEO, supply chain, and dedicated franchise manager for " + cityName + "." },
              { q: "What is the ROI timeline for a Cleanz24 franchise in " + cityName + "?", a: "Typical ROI recovery is 18-20 months across all models in " + cityName + "." },
            ].map((faq) => (<div key={faq.q} style={{ background: dark ? "#1e293b" : "#f9fafb", border: "1px solid " + (dark ? "#334155" : "#e5e7eb"), borderRadius: "12px", padding: "20px 24px" }}><div style={{ fontWeight: 700, color: dark ? "#f1f5f9" : "#111", marginBottom: "8px", fontSize: "0.95rem" }}>❓ {faq.q}</div><div style={{ color: dark ? "#94a3b8" : "#6b7280", fontSize: "0.9rem", lineHeight: 1.6 }}>{faq.a}</div></div>))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ background: "linear-gradient(135deg, #15803d, #166534)", padding: "56px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>Ready to Start Your Cleanz24 Franchise in {cityName}?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "28px", fontSize: "1rem" }}>Join India's fastest growing laundry & dry cleaning franchise (100+ Stores). Best profitable business opportunity in {cityName}.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#apply-now" className="fcp-btn-primary" style={{ background: "#fff", color: "#16a34a" }}>📋 Apply Now — {cityName}</a>
            <a href="tel:+919138004800" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.7)", borderRadius: "8px", padding: "14px 28px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>📞 Call +91 91380 04800</a>
          </div>
        </div>
      </section>
    </div>
  );
}
