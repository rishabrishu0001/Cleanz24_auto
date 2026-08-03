'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FRANCHISE_CITIES } from './FranchiseCityPage';
import { GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL } from '../../config';
import storeimg1 from '../../assets/storeimg1.jpeg';
import storeimg2 from '../../assets/storeimg2.jpeg';
import storeimg3 from '../../assets/storeimg3.jpeg';
import storeimg4 from '../../assets/storeimg4.jpeg';
import storeimg5 from '../../assets/storeimg5.jpeg';
import storeimg6 from '../../assets/storeimg6.jpeg';
import storeimg7 from '../../assets/storeimg7.jpeg';

/* ─── Dynamic Styles ─────────────────────────────────────────────── */
const getStyles = (dark) => `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Lora:wght@600;700&display=swap');

  .lf-page {
    font-family: 'Inter', sans-serif;
    color: ${dark ? '#e2e8f0' : '#2D3748'};
    background: ${dark ? '#0f1623' : '#fff'};
    transition: background 0.4s, color 0.4s;
  }

  /* ── HERO ── */
  .lf-hero {
    background: ${dark ? '#111827' : '#f0faf2'};
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 120px 0 60px;
    position: relative;
    overflow: hidden;
    transition: background 0.4s;
  }
  .lf-hero::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='${dark ? '0.06' : '0.04'}'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    pointer-events: none;
  }
  .lf-hero-title-black {
    font-family: 'Poppins', sans-serif;
    font-size: 3.8rem;
    font-weight: 800;
    color: ${dark ? '#f1f5f9' : '#111'};
    line-height: 1.1;
    margin-bottom: 4px;
    transition: color 0.4s;
  }
  .lf-hero-title-green {
    font-family: 'Poppins', sans-serif;
    font-size: 3.6rem;
    font-weight: 800;
    color: ${dark ? '#4ade80' : '#1a7a2e'};
    line-height: 1.2;
    display: inline-block;
    position: relative;
    transition: color 0.4s;
  }
  .lf-squiggle {
    position: absolute;
    bottom: -18px;
    left: 0;
    width: 100%;
    height: 22px;
  }
  .lf-form { margin-top: 48px; }
  .lf-form label {
    display: block;
    font-weight: 600;
    font-size: 0.88rem;
    color: ${dark ? '#cbd5e1' : '#1A202C'};
    margin-bottom: 6px;
    transition: color 0.4s;
  }
  .lf-form label span { color: #e53e3e; }
  .lf-form input {
    width: 100%;
    border: 1px solid ${dark ? '#334155' : '#CBD5E0'};
    border-radius: 4px;
    padding: 10px 14px;
    font-size: 0.95rem;
    color: ${dark ? '#e2e8f0' : '#2D3748'};
    background: ${dark ? '#1e293b' : '#fff'};
    outline: none;
    transition: border-color 0.2s, background 0.4s, color 0.4s;
    margin-bottom: 18px;
  }
  .lf-form input:focus { border-color: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.15); }
  .lf-form input::placeholder { color: ${dark ? '#ffffff' : '#A0AEC0'}; }
  .lf-btn-submit {
    background: ${dark ? '#16a34a' : '#1a5caf'};
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 12px 40px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .lf-btn-submit:hover { background: ${dark ? '#15803d' : '#154d9b'}; transform: translateY(-1px); }
  .lf-btn-submit:disabled {
    background: ${dark ? '#1e3a24' : '#6b8fb7'};
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  /* ── STATS BAR ── */
  .lf-stats-bar {
    background: ${dark ? '#166534' : '#1a7a2e'};
    padding: 32px 0;
  }
  .lf-stat-item { text-align: center; color: #fff; }
  .lf-stat-number { font-family: 'Poppins', sans-serif; font-size: 2.4rem; font-weight: 800; line-height: 1; }
  .lf-stat-label { font-size: 0.82rem; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.85; margin-top: 4px; }

  /* ── SECTION STYLES ── */
  .lf-section { padding: 72px 0; }
  .lf-section-alt { background: ${dark ? '#161f2e' : '#f8fafb'}; transition: background 0.4s; }
  .lf-section-green { background: ${dark ? '#0d1f14' : '#f0faf2'}; transition: background 0.4s; }
  .lf-section-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: ${dark ? '#f1f5f9' : '#1A202C'};
    margin-bottom: 8px;
    transition: color 0.4s;
  }
  .lf-section-title span { color: ${dark ? '#4ade80' : '#1a7a2e'}; }
  .lf-section-subtitle {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ${dark ? '#4ade80' : '#1a7a2e'};
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
  }
  .lf-divider {
    width: 60px; height: 4px;
    background: #22c55e;
    border-radius: 2px;
    margin: 12px 0 28px;
  }

  /* ── WHY CARDS ── */
  .lf-why-card {
    text-align: center;
    padding: 28px 20px;
    border-radius: 12px;
    background: ${dark ? '#1e293b' : '#fff'};
    box-shadow: 0 2px 16px rgba(0,0,0,${dark ? '0.3' : '0.06'});
    height: 100%;
    transition: transform 0.2s, box-shadow 0.2s, background 0.4s;
  }
  .lf-why-card:hover { transform: translateY(-6px); box-shadow: 0 8px 32px rgba(34,197,94,${dark ? '0.2' : '0.12'}); }
  .lf-why-icon {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: ${dark ? 'rgba(34,197,94,0.15)' : '#e6f9ec'};
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 18px;
    font-size: 2rem;
  }
  .lf-why-card h4 { font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 700; color: ${dark ? '#f1f5f9' : '#1A202C'}; margin-bottom: 8px; transition: color 0.4s; }
  .lf-why-card p { font-size: 0.88rem; color: ${dark ? '#94a3b8' : '#718096'}; line-height: 1.6; margin: 0; }

  /* ── FRANCHISE MODELS ── */
  .lf-model-card {
    border: 1.5px solid ${dark ? '#1e3a2f' : '#e2e8f0'};
    border-radius: 14px;
    padding: 32px 28px;
    background: ${dark ? '#1e293b' : '#fff'};
    height: 100%;
    transition: all 0.2s;
    position: relative;
  }
  .lf-model-card:hover { border-color: #22c55e; box-shadow: 0 8px 30px rgba(34,197,94,${dark ? '0.2' : '0.1'}); }
  .lf-model-card.featured { border-color: ${dark ? '#4ade80' : '#1a7a2e'}; background: ${dark ? '#0d2214' : '#f0faf2'}; }
  .lf-model-badge {
    position: absolute;
    top: -14px; left: 50%;
    transform: translateX(-50%);
    background: ${dark ? '#16a34a' : '#1a7a2e'};
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 4px 18px;
    border-radius: 20px;
    text-transform: uppercase;
  }
  .lf-model-tag {
    display: inline-block;
    background: ${dark ? 'rgba(34,197,94,0.15)' : '#e6f9ec'};
    color: ${dark ? '#4ade80' : '#1a7a2e'};
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 1px; padding: 4px 12px;
    border-radius: 4px; text-transform: uppercase; margin-bottom: 12px;
  }
  .lf-model-title { font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 800; color: ${dark ? '#f1f5f9' : '#1A202C'}; margin-bottom: 4px; }
  .lf-model-sub { font-size: 0.85rem; color: ${dark ? '#94a3b8' : '#718096'}; margin-bottom: 20px; }
  .lf-model-stat { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}; font-size: 0.9rem; }
  .lf-model-stat:last-of-type { border-bottom: none; }
  .lf-model-stat-label { color: ${dark ? '#94a3b8' : '#718096'}; font-weight: 500; }
  .lf-model-stat-value { font-weight: 700; color: ${dark ? '#4ade80' : '#1a7a2e'}; font-size: 1.05rem; }
  .lf-model-features { list-style: none; padding: 0; margin: 20px 0; }
  .lf-model-features li { padding: 6px 0; font-size: 0.88rem; color: ${dark ? '#cbd5e1' : '#4A5568'}; display: flex; align-items: center; gap: 8px; }
  .lf-model-features li::before { content: '✓'; color: #22c55e; font-weight: 700; font-size: 1rem; flex-shrink: 0; }
  .lf-model-btn {
    display: block; width: 100%; text-align: center;
    padding: 12px; border-radius: 8px;
    font-weight: 600; font-size: 0.9rem;
    border: 2px solid ${dark ? '#4ade80' : '#1a7a2e'};
    color: ${dark ? '#4ade80' : '#1a7a2e'};
    background: transparent; cursor: pointer;
    transition: all 0.2s; margin-top: auto; text-decoration: none;
  }
  .lf-model-btn:hover, .lf-model-btn.primary {
    background: ${dark ? '#16a34a' : '#1a7a2e'};
    color: #fff;
    border-color: ${dark ? '#16a34a' : '#1a7a2e'};
  }

  /* ── METRIC CARDS ── */
  .lf-metric-card {
    background: ${dark ? '#1e293b' : '#fff'};
    border-radius: 12px; padding: 28px 20px;
    text-align: center;
    box-shadow: 0 2px 12px rgba(0,0,0,${dark ? '0.3' : '0.06'});
    height: 100%;
    transition: background 0.4s;
  }
  .lf-metric-icon { font-size: 2.2rem; margin-bottom: 10px; }
  .lf-metric-value { font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 800; color: ${dark ? '#4ade80' : '#1a7a2e'}; line-height: 1; }
  .lf-metric-label { font-size: 0.82rem; color: ${dark ? '#94a3b8' : '#718096'}; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }

  /* ── TIMELINE (centre line, alternating cards) ── */
  .lf-timeline { position: relative; max-width: 1000px; margin: 0 auto; }

  /* The vertical line runs down the exact centre */
  .lf-timeline::before {
    content: '';
    position: absolute;
    left: 50%; top: 0; bottom: 0;
    transform: translateX(-50%);
    width: 3px;
    background: linear-gradient(to bottom, #22c55e, #1a7a2e);
    border-radius: 2px;
  }

  /* Each row of the timeline */
  .lf-timeline-step {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 48px;
    position: relative;
    width: 100%;
  }

  /* The card itself */
  .lf-timeline-content {
    background: ${dark ? '#1e293b' : '#fff'};
    border-radius: 14px;
    padding: 22px 26px;
    box-shadow: 0 4px 18px rgba(0,0,0,${dark ? '0.3' : '0.07'});
    width: 42%;
    transition: background 0.4s, box-shadow 0.2s;
    border: 1px solid ${dark ? '#1e3a5f' : '#e2e8f0'};
    position: relative;
  }
  .lf-timeline-content:hover {
    box-shadow: 0 8px 28px rgba(34,197,94,${dark ? '0.2' : '0.12'});
    border-color: #22c55e;
  }

  /* Card tail arrow pointing toward the centre circle */
  .lf-timeline-content.lf-right::before {
    content: '';
    position: absolute;
    right: -10px; top: 50%;
    transform: translateY(-50%);
    border: 10px solid transparent;
    border-left-color: ${dark ? '#1e293b' : '#fff'};
  }
  .lf-timeline-content.lf-left::before {
    content: '';
    position: absolute;
    left: -10px; top: 50%;
    transform: translateY(-50%);
    border: 10px solid transparent;
    border-right-color: ${dark ? '#1e293b' : '#fff'};
  }

  /* The circle number sits perfectly in the centre */
  .lf-timeline-num {
    width: 64px; height: 64px; min-width: 64px;
    border-radius: 50%;
    background: ${dark ? '#166534' : '#1a7a2e'};
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Poppins', sans-serif; font-size: 1.2rem; font-weight: 800;
    z-index: 2;
    box-shadow: 0 0 0 6px ${dark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.15)'}, 0 4px 16px rgba(26,122,46,0.35);
    flex-shrink: 0;
    margin: 0 20px;
  }

  /* Gap placeholder on the empty side */
  .lf-timeline-spacer { width: 42%; }

  .lf-timeline-content h4 { font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 700; color: ${dark ? '#f1f5f9' : '#1A202C'}; margin-bottom: 6px; }
  .lf-timeline-content p { font-size: 0.87rem; color: ${dark ? '#94a3b8' : '#718096'}; margin: 0; line-height: 1.6; }
  .lf-timeline-step-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 1.5px; color: #22c55e; font-weight: 700; margin-bottom: 4px; }

  /* Mobile: revert to single-column */
  @media (max-width: 767px) {
    .lf-timeline::before { left: 24px; transform: none; }
    .lf-timeline-step { flex-direction: row !important; justify-content: flex-start; }
    .lf-timeline-content, .lf-timeline-content.lf-right, .lf-timeline-content.lf-left { width: auto; flex: 1; }
    .lf-timeline-content.lf-right::before, .lf-timeline-content.lf-left::before { display: none; }
    .lf-timeline-spacer { display: none; }
    .lf-timeline-num { margin: 0 16px 0 0; width: 48px; height: 48px; min-width: 48px; font-size: 1rem; }
  }

  /* ── ADVANTAGE CARDS ── */
  .lf-advantage-card {
    border-left: 4px solid #22c55e;
    background: ${dark ? '#1e293b' : '#fff'};
    border-radius: 0 10px 10px 0;
    padding: 20px 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,${dark ? '0.3' : '0.05'});
    height: 100%;
    transition: background 0.4s;
  }
  .lf-advantage-card h5 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1rem; color: ${dark ? '#f1f5f9' : '#1A202C'}; margin-bottom: 8px; }
  .lf-advantage-card p { font-size: 0.87rem; color: ${dark ? '#94a3b8' : '#718096'}; margin: 0; line-height: 1.6; }

  /* ── PARTNER LOGOS ── */
  .lf-partner-logo {
    background: ${dark ? '#1e293b' : '#fff'};
    border: 1px solid ${dark ? '#334155' : '#e2e8f0'};
    border-radius: 8px; padding: 20px 28px;
    display: flex; align-items: center; justify-content: center;
    height: 80px;
    transition: box-shadow 0.2s, background 0.4s;
  }
  .lf-partner-logo:hover { box-shadow: 0 4px 16px rgba(34,197,94,0.15); border-color: #22c55e; }
  .lf-partner-logo span { font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 700; color: ${dark ? '#94a3b8' : '#4A5568'}; }

  /* ── TESTIMONIALS ── */
  .lf-testimonial-card {
    background: ${dark ? '#1e293b' : '#fff'};
    border-radius: 14px; padding: 28px;
    box-shadow: 0 2px 16px rgba(0,0,0,${dark ? '0.3' : '0.07'});
    height: 100%; border-top: 4px solid #22c55e;
    transition: background 0.4s;
  }
  .lf-testimonial-avatar {
    width: 48px; height: 48px; border-radius: 50%;
    background: ${dark ? '#166534' : '#1a7a2e'};
    color: #fff; display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 1.1rem; flex-shrink: 0;
  }
  .lf-testimonial-quote { font-size: 0.9rem; color: ${dark ? '#94a3b8' : '#4A5568'}; line-height: 1.7; font-style: italic; margin: 16px 0; }
  .lf-verified { display: inline-block; background: ${dark ? 'rgba(34,197,94,0.15)' : '#e6f9ec'}; color: ${dark ? '#4ade80' : '#1a7a2e'}; font-size: 0.7rem; font-weight: 700; padding: 2px 10px; border-radius: 20px; }
  .lf-testimonial-divider { border-top: 1px solid ${dark ? '#334155' : '#e2e8f0'}; }

  /* ── MEDIA ITEMS ── */
  .lf-media-item { font-family: 'Poppins', sans-serif; font-size: 1.1rem; font-weight: 700; color: ${dark ? '#64748b' : '#718096'}; }

  /* ── LOCATION PILLS ── */
  .lf-location-pill {
    background: ${dark ? '#1e293b' : '#fff'};
    border: 1.5px solid ${dark ? '#334155' : '#e2e8f0'};
    border-radius: 8px; padding: 18px 16px;
    text-align: center;
    font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 0.95rem;
    color: ${dark ? '#e2e8f0' : '#1A202C'};
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .lf-location-pill:hover { border-color: #22c55e; color: ${dark ? '#4ade80' : '#1a7a2e'}; background: ${dark ? '#0d2214' : '#f0faf2'}; }

  /* ── CTA ── */
  .lf-cta {
    background: ${dark ? 'linear-gradient(135deg, #14532d 0%, #052e16 100%)' : 'linear-gradient(135deg, #1a7a2e 0%, #0f5520 100%)'};
    padding: 72px 0; color: #fff; text-align: center;
  }
  .lf-cta h2 { font-family: 'Poppins', sans-serif; font-size: 2.2rem; font-weight: 800; margin-bottom: 12px; }
  .lf-cta p { font-size: 1.05rem; opacity: 0.9; max-width: 560px; margin: 0 auto 32px; }
  .lf-cta-btn {
    display: inline-block; background: #fff; color: #1a7a2e;
    font-weight: 700; font-size: 1rem; padding: 14px 40px;
    border-radius: 8px; text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .lf-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); color: #1a7a2e; }
  .lf-cta-btn-outline {
    display: inline-block; border: 2px solid #fff; color: #fff;
    font-weight: 700; font-size: 1rem; padding: 12px 36px;
    border-radius: 8px; text-decoration: none;
    transition: background 0.2s;
  }
  .lf-cta-btn-outline:hover { background: rgba(255,255,255,0.1); color: #fff; }

  /* ── SUCCESS BOX ── */
  .lf-success-box {
    background: ${dark ? 'rgba(34,197,94,0.1)' : '#f0faf2'};
    border: 1.5px solid ${dark ? '#166534' : '#22c55e'};
    border-radius: 12px; padding: 28px 24px; margin-top: 48px;
  }

  @media (max-width: 767px) {
    .lf-hero-title-black, .lf-hero-title-green { font-size: 2.5rem; }
    .lf-section { padding: 48px 0; }
    .lf-cta h2 { font-size: 1.6rem; }
    .lf-timeline::before { left: 28px; }
    .lf-timeline-num { width: 56px; height: 56px; min-width: 56px; font-size: 1.1rem; }
  }
`;

/* ─── Hero Slideshow Component ──────────────────────────────────── */
const storeImages = [
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
    <div style={{ position: 'relative', width: '100%', height: '460px', borderRadius: 18, overflow: 'hidden', boxShadow: `0 12px 48px rgba(0,0,0,${dark ? '0.45' : '0.18'})` }}>
      {storeImages.map((src, i) => (
        <img
          key={i}
          src={src?.src || src}
          alt={`Cleanz24 Store ${i + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 18,
            opacity: activeIdx === i ? 1 : 0,
            transform: activeIdx === i ? 'scale(1.03)' : 'scale(1)',
            transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
            zIndex: activeIdx === i ? 2 : 1,
          }}
        />
      ))}
      {/* Gradient overlay at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '80px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)',
        zIndex: 3,
        borderRadius: '0 0 18px 18px',
      }} />
      {/* Dots */}
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
            onClick={() => setActiveIdx(i)}
            style={{
              width: activeIdx === i ? 22 : 8,
              height: 8,
              borderRadius: 4,
              background: activeIdx === i ? '#22c55e' : 'rgba(255,255,255,0.55)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.35s ease, background 0.3s',
              outline: 'none',
            }}
          />
        ))}
      </div>
      {/* Store count badge */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(26,122,46,0.92)',
        color: '#fff',
        borderRadius: 8,
        padding: '6px 14px',
        fontSize: '0.78rem',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.5px',
        zIndex: 4,
        backdropFilter: 'blur(4px)',
      }}>
        📍 100+ Stores
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────── */
function LaundryFrenchise() {
  // Get isDarkMode from the LaundryLayout via Outlet context
  const { isDarkMode } = (() => ({ isDarkMode: false, toggleTheme: () => {} }))() || {};
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [countryEmoji, setCountryEmoji] = useState('🇮🇳');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Lead Popup State
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [popupData, setPopupData] = useState({ name: '', phone: '', email: '', city: '' });
  const [popupSubmitting, setPopupSubmitting] = useState(false);
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const [popupError, setPopupError] = useState('');

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('lf_popup_seen');
    // Agar URL mein hash hai (#models etc.) toh popup skip karo
    if (alreadySeen || window.location.hash) return;
    const timer = setTimeout(() => setShowLeadPopup(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showLeadPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showLeadPopup]);

  // ── Hash Scroll Fix: scroll to #section after page renders ──
  const pathname = usePathname() || ''; const location = { pathname, state: {} };
  useEffect(() => {
    if (location.hash) {
      // Popup band karo aur overflow reset karo
      setShowLeadPopup(false);
      document.body.style.overflow = '';

      const id = location.hash.replace('#', '');
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < 15) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      // Thoda wait karo taaki page fully render ho
      setTimeout(() => tryScroll(), 300);
    }
  }, [location]);

  const closeLeadPopup = () => {
    sessionStorage.setItem('lf_popup_seen', '1');
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
    if (!popupData.name.trim() || !popupData.phone.trim() || !popupData.city.trim() || !popupData.email.trim()) {
      setPopupError('Please fill all fields.');
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
        date: dateStr, Date: dateStr, timestamp: dateStr, Timestamp: dateStr,
        datetime: dateStr, dateTime: dateStr, createdAt: dateStr, created_at: dateStr,
        time: dateStr, Time: dateStr,
        name: popupData.name,
        mobile: `'+91 ${popupData.phone}`,
        email: popupData.email,
        city: popupData.city,
        modelType: 'Popup Lead'
      };
      await fetch('https://script.google.com/macros/s/AKfycbwgrxbbzmaqU8BT-l7xFSriJ-BNM01ad5Qo66ZOfR-XBF4ag9h1u1ErJcAN4J7LcM4p/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { 'send_to': 'AW-16562330559/Ly9XCOC_iLQaEL-3xNk9' });
        window.gtag('event', 'laundry_franchise_lead', {
          'event_category': 'Franchise',
          'event_label': 'Laundry Franchise Popup Submission'
        });
      }
      setPopupSubmitted(true);
      sessionStorage.setItem('lf_popup_seen', '1');
      // Pre-fill & auto-submit main form state so it shows "Already Submitted"
      setFormData(prev => ({ ...prev, name: popupData.name, phone: popupData.phone, email: popupData.email, city: popupData.city }));
      setSubmitted(true);
      setTimeout(() => setShowLeadPopup(false), 3000);
    } catch (err) {
      console.error('Popup form error:', err);
      setPopupError('Something went wrong. Please try again.');
    } finally {
      setPopupSubmitting(false);
    }
  };
  const countries = [
    { code: '+91', emoji: '🇮🇳', name: 'India' },
    { code: '+1', emoji: '🇺🇸', name: 'United States' },
    { code: '+1', emoji: '🇨🇦', name: 'Canada' },
    { code: '+44', emoji: '🇬🇧', name: 'United Kingdom' },
    { code: '+971', emoji: '🇦🇪', name: 'United Arab Emirates' },
    { code: '+61', emoji: '🇦🇺', name: 'Australia' },
    { code: '+65', emoji: '🇸🇬', name: 'Singapore' },
    { code: '+966', emoji: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+974', emoji: '🇶🇦', name: 'Qatar' },
    { code: '+968', emoji: '🇴🇲', name: 'Oman' },
    { code: '+973', emoji: '🇧🇭', name: 'Bahrain' },
    { code: '+965', emoji: '🇰🇼', name: 'Kuwait' },
    { code: '+49', emoji: '🇩🇪', name: 'Germany' },
    { code: '+33', emoji: '🇫🇷', name: 'France' },
    { code: '+60', emoji: '🇲🇾', name: 'Malaysia' },
    { code: '+81', emoji: '🇯🇵', name: 'Japan' },
    { code: '+64', emoji: '🇳🇿', name: 'New Zealand' },
    { code: '+977', emoji: '🇳🇵', name: 'Nepal' },
    { code: '+880', emoji: '🇧🇩', name: 'Bangladesh' },
    { code: '+94', emoji: '🇱🇰', name: 'Sri Lanka' },
    { code: '+27', emoji: '🇿🇦', name: 'South Africa' },
  ];

  const mediaMentions = [
    {
      name: 'The Times of India',
      icon: '📰',
      color: '#1f3a60',
      shadowColor: 'rgba(31, 58, 96, 0.15)',
      gradient: 'linear-gradient(135deg, #1f3a60 0%, #0f172a 100%)',
      font: "'Playfair Display', serif"
    },
    {
      name: 'Hindustan Times',
      icon: '💙',
      color: '#007cc2',
      shadowColor: 'rgba(0, 124, 194, 0.15)',
      gradient: 'linear-gradient(135deg, #007cc2 0%, #005580 100%)',
      font: "'Inter', sans-serif"
    },
    {
      name: 'Dainik Bhaskar',
      icon: '☀️',
      color: '#f05123',
      shadowColor: 'rgba(240, 81, 35, 0.15)',
      gradient: 'linear-gradient(135deg, #ff9900 0%, #f05123 100%)',
      font: "'Poppins', sans-serif"
    },
    {
      name: 'Economic Times',
      icon: '📈',
      color: '#e31b23',
      shadowColor: 'rgba(227, 27, 35, 0.15)',
      gradient: 'linear-gradient(135deg, #e31b23 0%, #801015 100%)',
      font: "'Lora', serif"
    },
    {
      name: 'NDTV',
      icon: '📺',
      color: '#ff0000',
      shadowColor: 'rgba(255, 0, 0, 0.15)',
      gradient: 'linear-gradient(135deg, #ff0000 0%, #b30000 100%)',
      font: "'Poppins', sans-serif",
      letterSpacing: '1px'
    }
  ];

  const brandPartners = [
    {
      name: 'Alliance Laundry Systems',
      url: 'https://alliancelaundry.com',
      color: '#00549f',
      shadowColor: 'rgba(0, 84, 159, 0.15)',
      gradient: 'linear-gradient(135deg, #00549f 0%, #002b4d 100%)'
    },
    {
      name: 'LG Electronics',
      url: 'https://www.lg.com',
      color: '#a50034',
      shadowColor: 'rgba(165, 0, 52, 0.15)',
      gradient: 'linear-gradient(135deg, #a50034 0%, #7a0026 100%)'
    },
    {
      name: 'Speed Queen',
      url: 'https://speedqueen.com',
      color: '#e51937',
      shadowColor: 'rgba(229, 25, 55, 0.15)',
      gradient: 'linear-gradient(135deg, #e51937 0%, #111111 100%)'
    },
    {
      name: 'Fabcare',
      url: 'https://fabcare.com',
      color: '#00b4d8',
      shadowColor: 'rgba(0, 180, 216, 0.15)',
      gradient: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)'
    },
    {
      name: 'Reckitt Benckiser',
      url: 'https://www.reckitt.com',
      color: '#8300e5',
      shadowColor: 'rgba(131, 0, 229, 0.15)',
      gradient: 'linear-gradient(135deg, #8300e5 0%, #4c0080 100%)'
    },
    {
      name: 'Samsung',
      url: 'https://www.samsung.com',
      color: '#1428a0',
      shadowColor: 'rgba(20, 40, 160, 0.15)',
      gradient: 'linear-gradient(135deg, #1428a0 0%, #0c1860 100%)'
    }
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      setFormData(prev => ({ ...prev, [id]: value.replace(/\D/g, '') }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', phone: '', email: '', city: '' });
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const dateStr = new Date().toISOString().split('T')[0];
      const payload = {
        date: dateStr,
        Date: dateStr,
        timestamp: dateStr,
        Timestamp: dateStr,
        datetime: dateStr,
        dateTime: dateStr,
        createdAt: dateStr,
        created_at: dateStr,
        time: dateStr,
        Time: dateStr,
        name: formData.name,
        mobile: `'${countryCode} ${formData.phone}`,
        email: formData.email,
        city: formData.city,
        modelType: 'General Inquiry'
      };

      await fetch('https://script.google.com/macros/s/AKfycbwgrxbbzmaqU8BT-l7xFSriJ-BNM01ad5Qo66ZOfR-XBF4ag9h1u1ErJcAN4J7LcM4p/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload)
      });

      // Google Ads: Franchise form signup conversion
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-16562330559/Ly9XCOC_iLQaEL-3xNk9'
        });
      }

      // Trigger Google Tag conversion event if present
      if (window.gtag) {
        window.gtag('event', 'laundry_franchise_lead', {
          'event_category': 'Franchise',
          'event_label': 'Laundry Franchise Submission'
        });
      }
    } catch (err) {
      console.error('Error submitting franchise inquiry:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const dark = !!isDarkMode;

  const whyReasons = [
    { icon: '📈', title: 'Growing Demand', desc: 'Laundry services are a necessity, ensuring consistent demand regardless of economic fluctuations.' },
    { icon: '💰', title: 'Low Investment, High Returns', desc: 'Proven business models allow for significant returns with manageable investment costs.' },
    { icon: '🏷️', title: 'Established Brand Recognition', desc: 'Operating under a trusted name with a built-in customer base gives you a head-start.' },
    { icon: '⚙️', title: 'Streamlined Operations', desc: 'Franchise support includes training, supply chain management, and marketing expertise.' },
    { icon: '🚀', title: 'Scalability', desc: 'Easy to expand and replicate in multiple locations as your business grows.' },
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
        'Complete Chemicals (Softwash, Shoe, Sofa and Carpet Cleaning, Laundry & Spotting)',
        'Standard Packing Materials',
        'Staff Support',
        'Online and Offline Marketing Support',
        'Training of All Staffs and Franchise',
        'Software, App and GMB Support'
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
        '15Kg Stacker (Washer & Extractor)',
        '10Kg Stacker (Washer & Extractor)',
        'Automatic Pressing Setup',
        'Complete Chemicals (Softwash, Shoe, Sofa and Carpet Cleaning, Laundry & Spotting)',
        'Standard Packing Materials',
        'Staff Support',
        'Online and Offline Marketing Support',
        'Training of All Staffs and Franchise',
        'Software, App and GMB Support'
      ],
      featured: true,
    },
    {
      tag: 'Commercial Combo',
      title: 'COMBO MODEL',
      sub: 'Flagship B2B and B2C setup for handling both commercial loads & individual wear.',
      investment: '₹22 Lacs+',
      area: '400 Sq.Ft (Minimum)',
      profit: '2 Lacs/Month+',
      roi: '18-20 Months',
      features: [
        'Complete end to end Store Setup',
        '18Kg Standalone Washer for B2B and B2C Load.',
        '18Kg Standalone Dryer for B2B and B2C Load.',
        '10Kg Stacker (Washer & Extractor)',
        'Automatic Pressing Setup',
        'Complete Chemicals (Softwash, Shoe, Sofa and Carpet Cleaning, Laundry & Spotting)',
        'Standard Packing Materials',
        'Staff Support',
        'Online and Offline Marketing Support',
        'Training of All Staffs and Franchise',
        'Software, App and GMB Support'
      ],
      featured: false,
    },
    {
      tag: 'Premium Dry-Clean',
      title: 'HYDRO-CARBON MODEL',
      sub: 'Ultra-premium model featuring modern eco dry-cleaning and stackers.',
      investment: '₹29 Lacs+',
      area: '500 Sq.Ft (Minimum)',
      profit: '2.5 Lacs/Month+',
      roi: '18-20 Months',
      features: [
        'Complete end to end Store Setup',
        '10 Kg Hydro-Cabon Machine with Dry to Dry Process (99% Recovery)',
        '10Kg Stacker (Washer & Extractor)',
        'Automatic Pressing Setup',
        'Complete Chemicals (Hydrocarbon oil, Softwash, Shoe, Sofa and Carpet Cleaning, Laundry & Spotting)',
        'Standard Packing Materials',
        'Staff Support',
        'Online and Offline Marketing Support',
        'Training of All Staffs and Franchise',
        'Software, App and GMB Support'
      ],
      featured: false,
    }
  ];

  const metrics = [
    { icon: '🏪', value: '100+', label: 'Franchise Locations' },
    { icon: '🌍', value: '21', label: 'States Covered' },
    { icon: '😊', value: '2 Lakhs+', label: 'Happy Customers' },
    { icon: '📅', value: '50+', label: 'Years Cumulative Experience' },
  ];

  const timelineSteps = [
    { step: '01', label: 'First Step', title: 'Submit Your Application', desc: 'Fill out the inquiry form expressing your interest. Provide your basic information and preferred location.' },
    { step: '02', label: 'Second Step', title: 'Initial Discussion', desc: 'Engage in a detailed discussion with the Cleanz24 team to understand the franchise model, expectations, and requirements.' },
    { step: '03', label: 'Third Step', title: 'Location Finalization', desc: 'Work with our team to identify and finalize a suitable location through site visits and market analysis.' },
    { step: '04', label: 'Fourth Step', title: 'Agreement Signing', desc: 'Sign the franchise agreement to officially become part of the Cleanz24 family.' },
    { step: '05', label: 'Fifth Step', title: 'Training & Setup', desc: 'Receive comprehensive training on operations, equipment handling, customer service, and business management.' },
    { step: '06', label: 'Sixth Step', title: 'Grand Opening', desc: 'Celebrate your Cleanz24 franchise launch with a ribbon-cutting ceremony and start building your customer base!' },
  ];

  const testimonials = [
    { initials: 'RK', name: 'Rajesh Kumar', city: 'Gurugram, Haryana', model: 'Beta Model', milestone: '₹1.8L/month', quote: 'I opened my Cleanz24 franchise 8 months ago and we\'re already doing great business. The brand recognition gave us a head-start that competitors simply don\'t have.' },
    { initials: 'PS', name: 'Priya Sharma', city: 'New Delhi', model: 'Alpha Model', milestone: '₹90K/month', quote: 'Coming from a regular job, I was nervous about running my own business. Cleanz24\'s training and support made it incredibly smooth. ROI within 16 months!' },
    { initials: 'AM', name: 'Amit Mehta', city: 'Visakhapatnam, AP', model: 'Combo Model', milestone: '₹2.7L/month', quote: 'The Combo Model was the best investment decision of my life. Cleanz24\'s CRM dashboard and automated billing makes managing the store effortless.' },
    { initials: 'SS', name: 'Sanjay Singhania', city: 'Jaipur, Rajasthan', model: 'Beta Model', milestone: '₹2.1L/month', quote: 'The technical training academy and standard operational guidelines made setup straightforward. We are now the leading laundry service in our area.' },
    { initials: 'MN', name: 'Meera Nair', city: 'Bengaluru, Karnataka', model: 'Alpha Model', milestone: '₹1.1L/month', quote: 'Cleanz24\'s eco-friendly washing solutions and CRM system saved us hours on manual billing and attracted premium eco-conscious customers.' },
    { initials: 'RJ', name: 'Rohan Joshi', city: 'Pune, Maharashtra', model: 'Hydro-Carbon Model', milestone: '₹3.4L/month', quote: 'Investing in the Hydro-Carbon Model was key for our luxury fabric dry-cleaning segment. The 99% oil recovery rate keeps operational costs low.' },
    { initials: 'KR', name: 'Kavita Reddy', city: 'Hyderabad, Telangana', model: 'Combo Model', milestone: '₹2.9L/month', quote: 'Opening a franchise in Kokapet has been highly lucrative. The operations team guided us through the entire setup, and local marketing support was phenomenal.' },
    { initials: 'VS', name: 'Vivek Saxena', city: 'Lucknow, UP', model: 'Beta Model', milestone: '₹1.9L/month', quote: 'The tech suite provided by Cleanz24 is exceptional. Our customers love the automated status updates and WhatsApp alerts, which makes operations highly streamlined.' },
    { initials: 'ND', name: 'Neha Deshmukh', city: 'Mumbai, Maharashtra', model: 'Alpha Model', milestone: '₹1.3L/month', quote: 'Excellent hand-holding from site selection to the grand opening. The demand for premium dry cleaning in Pimpri-Chinchwad has exceeded all our expectations.' },
    { initials: 'RT', name: 'Rajesh Tripathi', city: 'Patna, Bihar', model: 'Combo Model', milestone: '₹2.5L/month', quote: 'Unparalleled supply chain support for detergents and chemicals. The training programs enabled our staff to deliver consistent, top-tier quality from day one.' }
  ];

  const advantages = [
    { title: 'The Lineage', desc: 'Being India\'s elite laundry and home care network, Cleanz24 brings decades of service experience, premium formulations, and state-of-the-art store blueprints.' },
    { title: 'Obsession with Quality', desc: 'We believe every garment needs to be treated with utmost care. Our eco-friendly detergents and professional equipment ensures superior results.' },
    { title: 'The Experience', desc: 'Blending experience with innovation and technology, our methods go beyond presentation to superior fabric protection and long-term customer relationships.' },
    { title: 'CRM & Tech Support', desc: 'Automated mobile bookings, customer billing analytics, and targeted digital lead generation through our proprietary CRM platform.' },
    { title: 'Marketing Support', desc: 'Local brand launch campaigns, digital lead streams, and targeted marketing strategies are all handled by our centralized marketing team.' },
    { title: 'Supply Chain', desc: 'Direct centralized supply of eco-friendly detergents, active foam solutions, and premium fabric care products directly to your store.' },
  ];

  const [successStoryIndex, setSuccessStoryIndex] = useState(0);
  const [successVisibleCards, setSuccessVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSuccessVisibleCards(1);
      } else if (window.innerWidth < 992) {
        setSuccessVisibleCards(2);
      } else {
        setSuccessVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = testimonials.length - successVisibleCards;
    if (successStoryIndex > maxIndex) {
      setSuccessStoryIndex(Math.max(0, maxIndex));
    }
  }, [successVisibleCards]);

  // Google Ads: Franchise Page view conversion — fires on page load
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16562330559/IThJCPHEmaIaEL-3xNk9',
        'value': 1.0,
        'currency': 'INR'
      });
    }
  }, []);

  return (
    <div className="lf-page">

            <style>{getStyles(dark)}</style>

      {/* ── LEAD CAPTURE POPUP ── */}
      {showLeadPopup && (
        <div
          id="lf-lead-popup-overlay"
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.72)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backdropFilter: 'blur(4px)',
            animation: 'lfPopupFadeIn 0.35s ease'
          }}
        >
          <style>{`
            @keyframes lfPopupFadeIn { from { opacity:0; } to { opacity:1; } }
            @keyframes lfPopupSlideUp { from { opacity:0; transform: translateY(40px) scale(0.96); } to { opacity:1; transform: translateY(0) scale(1); } }
            #lf-lead-popup-box { animation: lfPopupSlideUp 0.4s cubic-bezier(.22,.68,0,1.3); }
            .lf-popup-input {
              width: 100%;
              padding: 12px 16px;
              border-radius: 10px;
              border: 1.5px solid ${dark ? '#334155' : '#d1fae5'};
              background: ${dark ? '#1e2d3d' : '#f0fdf4'};
              color: ${dark ? '#e2e8f0' : '#1a202c'};
              font-size: 0.95rem;
              font-family: 'Inter', sans-serif;
              outline: none;
              transition: border-color 0.2s, box-shadow 0.2s;
              margin-bottom: 14px;
            }
            .lf-popup-input:focus {
              border-color: #22c55e;
              box-shadow: 0 0 0 3px rgba(34,197,94,0.18);
            }
            .lf-popup-input::placeholder { color: ${dark ? '#64748b' : '#9ca3af'}; }
            .lf-popup-btn {
              width: 100%;
              padding: 13px;
              border-radius: 10px;
              border: none;
              background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
              color: #fff;
              font-size: 1rem;
              font-weight: 700;
              font-family: 'Poppins', sans-serif;
              cursor: pointer;
              letter-spacing: 0.3px;
              transition: opacity 0.2s, transform 0.15s;
            }
            .lf-popup-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
            .lf-popup-btn:disabled { opacity: 0.65; cursor: not-allowed; }
          `}</style>

          <div
            id="lf-lead-popup-box"
            style={{
              background: dark ? '#0f1b2d' : '#ffffff',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '440px',
              padding: '36px 32px 28px',
              position: 'relative',
              boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
              border: `1.5px solid ${dark ? '#1e3a2f' : '#bbf7d0'}`,
            }}
          >
            {/* Close button */}
            <button
              onClick={closeLeadPopup}
              aria-label="Close"
              style={{
                position: 'absolute', top: 14, right: 16,
                background: 'none', border: 'none',
                fontSize: '1.5rem', cursor: 'pointer',
                color: dark ? '#94a3b8' : '#64748b',
                lineHeight: 1, padding: '4px 8px',
                borderRadius: 6,
                transition: 'color 0.2s'
              }}
            >✕</button>

            {popupSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
                <div style={{
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                  fontSize: '1.25rem', color: '#16a34a', marginBottom: 8
                }}>Thank You!</div>
                <div style={{ color: dark ? '#94a3b8' : '#6b7280', fontSize: '0.92rem' }}>
                  Our team will contact you within 24 hours.
                </div>
              </div>
            ) : (
              <>
                {/* Badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: '#dcfce7', borderRadius: 20,
                  padding: '4px 12px', marginBottom: 16
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', letterSpacing: '0.5px', fontFamily: 'Poppins, sans-serif' }}>FREE CONSULTATION</span>
                </div>

                <div style={{
                  fontFamily: 'Poppins, sans-serif', fontWeight: 800,
                  fontSize: '1.45rem', color: dark ? '#f1f5f9' : '#111827',
                  lineHeight: 1.25, marginBottom: 6
                }}>Get Franchise Details
                  <span style={{ color: '#22c55e' }}> Instantly</span> 🚀
                </div>
                <div style={{
                  fontSize: '0.85rem', color: dark ? '#94a3b8' : '#6b7280',
                  marginBottom: 24, fontFamily: 'Inter, sans-serif'
                }}>
                  Investment starts at <strong style={{ color: dark ? '#4ade80' : '#15803d' }}>₹13 Lacs</strong>. ROI in 18–20 months.
                </div>

                <form onSubmit={handlePopupSubmit} noValidate>
                  <input
                    className="lf-popup-input"
                    type="text"
                    name="name"
                    placeholder="Your Full Name *"
                    value={popupData.name}
                    onChange={handlePopupChange}
                    autoFocus
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{
                      background: dark ? '#1e2d3d' : '#f0fdf4',
                      border: `1.5px solid ${dark ? '#334155' : '#d1fae5'}`,
                      borderRadius: 10, padding: '12px 14px',
                      fontSize: '0.95rem', fontWeight: 600,
                      color: dark ? '#e2e8f0' : '#374151',
                      whiteSpace: 'nowrap', flexShrink: 0
                    }}>🇮🇳 +91</span>
                    <input
                      className="lf-popup-input"
                      style={{ marginBottom: 0, flex: 1 }}
                      type="tel"
                      name="phone"
                      placeholder="WhatsApp Number *"
                      value={popupData.phone}
                      onChange={handlePopupChange}
                      maxLength={10}
                      inputMode="numeric"
                    />
                  </div>
                                    <input
                    className="lf-popup-input"
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={popupData.email}
                    onChange={handlePopupChange}
                  />
<input
                    className="lf-popup-input"
                    type="text"
                    name="city"
                    placeholder="Your City *"
                    value={popupData.city}
                    onChange={handlePopupChange}
                  />
                  {popupError && (
                    <div style={{ color: '#dc2626', fontSize: '0.82rem', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>
                      ⚠️ {popupError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="lf-popup-btn"
                    disabled={popupSubmitting}
                    id="lf-popup-submit-btn"
                  >
                    {popupSubmitting ? 'Submitting...' : '🚀 Get Free Franchise Details'}
                  </button>
                </form>

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 16, marginTop: 16, flexWrap: 'wrap'
                }}>
                  {['100+ Locations', '21 States', '50+ Years Cumulative Exp.'].map(t => (
                    <span key={t} style={{
                      fontSize: '0.72rem', color: dark ? '#64748b' : '#9ca3af',
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontFamily: 'Inter, sans-serif'
                    }}>✅ {t}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="lf-hero" id="hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="lf-hero-title-black">Join Cleanz24</div>
              <div style={{ position: 'relative', marginBottom: '32px' }}>
                <div className="lf-hero-title-green">
                  Laundry & Dry<br />Cleaning Franchise
                  <svg className="lf-squiggle" viewBox="0 0 400 22" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0,11 Q20,3 40,11 T80,11 T120,11 T160,11 T200,11 T240,11 T280,11 T320,11 T360,11 T400,11"
                      stroke="#FFE000" strokeWidth="7" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              <div id="form">
                {submitted ? (
                  <div className="lf-success-box">
                    <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
                    <h4 style={{ fontFamily: 'Poppins', fontWeight: 700, color: dark ? '#4ade80' : '#1a7a2e', marginBottom: 8 }}>Application Received!</h4>
                    <p style={{ color: dark ? '#94a3b8' : '#4A5568', marginBottom: 4, fontSize: '0.92rem' }}>
                      Thank you, <strong>{formData.name}</strong>! Our team will call you at <strong>+91 {formData.phone}</strong> within 24 hours.
                    </p>
                    {popupSubmitted && (
                      <p style={{ color: dark ? '#64748b' : '#9ca3af', fontSize: '0.8rem', marginBottom: 16, fontStyle: 'italic' }}>
                        ℹ️ Already submitted via quick form above. Want to add more details?
                      </p>
                    )}
                    <button onClick={handleResetForm}
                      style={{ background: 'none', border: `1.5px solid ${dark ? '#4ade80' : '#22c55e'}`, color: dark ? '#4ade80' : '#1a7a2e', padding: '8px 24px', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="lf-form" style={{ marginTop: '24px' }}>
                  <label htmlFor="name">Name <span>*</span></label>
                  <input id="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                  <label htmlFor="phone">Phone Number <span>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '80px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        color: dark ? '#e2e8f0' : '#1e293b',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        zIndex: 10,
                        cursor: 'pointer',
                        paddingLeft: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '4px'
                      }}
                    >
                      <span>{countryEmoji} {countryCode}</span>
                      <span style={{ fontSize: '0.65rem', color: '#64748b' }}>▼</span>
                    </button>
                    {dropdownOpen && (
                      <>
                        <div 
                          onClick={() => setDropdownOpen(false)} 
                          style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            zIndex: 99,
                            background: 'transparent'
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            zIndex: 100,
                            background: dark ? '#1e293b' : '#ffffff',
                            border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            width: '120px',
                            maxHeight: '180px',
                            overflowY: 'auto',
                            marginTop: '4px'
                          }}
                        >
                          {countries.map((c, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setCountryCode(c.code);
                                setCountryEmoji(c.emoji);
                                setDropdownOpen(false);
                              }}
                              style={{
                                padding: '8px 12px',
                                fontSize: '0.9rem',
                                color: dark ? '#e2e8f0' : '#1e293b',
                                cursor: 'pointer',
                                background: countryCode === c.code && countryEmoji === c.emoji ? dark ? 'rgba(255,255,255,0.12)' : '#f1f5f9' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'background 0.2s'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.06)' : '#f8fafc'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = countryCode === c.code && countryEmoji === c.emoji ? dark ? 'rgba(255,255,255,0.12)' : '#f1f5f9' : 'transparent'; }}
                            >
                              <span>{c.emoji}</span>
                              <span>{c.code}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <input id="phone" type="tel" placeholder="Enter a valid phone number" value={formData.phone} onChange={handleChange} style={{ paddingLeft: '88px', marginBottom: 0 }} required />
                  </div>
                  <label htmlFor="email">Email <span>*</span></label>
                  <input id="email" type="email" placeholder="Enter a valid email id" value={formData.email} onChange={handleChange} required />
                  <label htmlFor="city">City <span>*</span></label>
                  <input id="city" type="text" placeholder="Enter your city" value={formData.city} onChange={handleChange} required />
                  <button type="submit" className="lf-btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
              </div>
            </div>

            {/* Right: Animated Image Slideshow */}
            <div className="col-lg-6 d-none d-lg-block">
              <HeroSlideshow dark={dark} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="lf-stats-bar" id="stats">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {metrics.map((m, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="lf-stat-item">
                  <div style={{ fontSize: '2rem', marginBottom: 4 }}>{m.icon}</div>
                  <div className="lf-stat-number">{m.value}</div>
                  <div className="lf-stat-label">{m.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="lf-section lf-section-alt" id="why-franchise">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">THE OPPORTUNITY</span>
            <h2 className="lf-section-title">Why Choose a <span>Laundry & Dry Cleaning Franchise?</span></h2>
            <div className="lf-divider mx-auto"></div>
          </div>
          <div className="row g-4 justify-content-center">
            {whyReasons.map((r, i) => (
              <div className="col-sm-6 col-md-4 col-lg-2" key={i} style={{ minWidth: 180 }}>
                <div className="lf-why-card">
                  <div className="lf-why-icon">{r.icon}</div>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <a href="#inquiry" className="lf-btn-submit" style={{ textDecoration: 'none', padding: '12px 36px', borderRadius: 8, fontSize: '0.95rem' }}>Contact Us to Know More ›</a>
          </div>
        </div>
      </section>

      {/* ── FRANCHISE MODELS ── */}
      <section className="lf-section" id="models">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">INVESTMENT OPTIONS</span>
            <h2 className="lf-section-title">Our <span>Franchise Model</span></h2>
            <div className="lf-divider mx-auto"></div>
            <p style={{ color: dark ? '#94a3b8' : '#718096', maxWidth: 560, margin: '0 auto', fontSize: '0.95rem' }}>
              Choose from our pre-configured studio setups optimized for your budget, location, and business ambition.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {models.map((m, i) => (
              <div className="col-lg-3 col-md-6" key={i} id={`franchise-model-${m.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                <div className={`lf-model-card d-flex flex-column ${m.featured ? 'featured' : ''}`}>
                  {m.featured && <div className="lf-model-badge">MOST POPULAR</div>}
                  <div className="lf-model-tag">{m.tag}</div>
                  <div className="lf-model-title">{m.title}</div>
                  <div className="lf-model-sub">{m.sub}</div>
                  <div className="lf-model-stat"><span className="lf-model-stat-label">💰 Investment</span><span className="lf-model-stat-value">{m.investment}</span></div>
                  <div className="lf-model-stat"><span className="lf-model-stat-label">📐 Area Required</span><span className="lf-model-stat-value">{m.area}</span></div>
                  <div className="lf-model-stat"><span className="lf-model-stat-label">📈 Monthly Profit</span><span className="lf-model-stat-value">{m.profit}</span></div>
                  <div className="lf-model-stat"><span className="lf-model-stat-label">⏱️ ROI Period</span><span className="lf-model-stat-value">{m.roi}</span></div>
                  <ul className="lf-model-features mt-3">{m.features.map((f, fi) => <li key={fi}>{f}</li>)}</ul>
                  <a href="#inquiry" className={`lf-model-btn mt-auto ${m.featured ? 'primary' : ''}`}>
                    Enquire About {m.title}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Key Metrics Row */}
          <div className="row g-4 mt-5 justify-content-center">
            {[
              { icon: '📊', value: '1.5–3 Lac', label: 'Earn profit up to' },
              { icon: '📐', value: '250–600 sqft', label: 'Area Required' },
              { icon: '💵', value: '13–30 Lacs', label: 'Total Investment' },
              { icon: '⏳', value: '18–20 Months', label: 'ROI Period' },
              { icon: '📍', value: 'Highstreet', label: 'Premium Locations' },
            ].map((item, i) => (
              <div className="col-6 col-md-4 col-lg-2" key={i}>
                <div className="lf-metric-card">
                  <div className="lf-metric-icon">{item.icon}</div>
                  <div className="lf-metric-value" style={{ fontSize: '1.1rem' }}>{item.value}</div>
                  <div className="lf-metric-label">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CLEANZ24 ── */}
      <section className="lf-section lf-section-green" id="why-cleanz24">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <span className="lf-section-subtitle">THE BRAND ADVANTAGE</span>
              <h2 className="lf-section-title">Invest in Your Own <span>Cleanz24 Franchise</span></h2>
              <div className="lf-divider"></div>
              <p style={{ color: dark ? '#94a3b8' : '#718096', lineHeight: 1.7, marginBottom: 28, fontSize: '0.95rem' }}>
                Join the Cleanz24 family and start your own franchise with a trusted brand in laundry and cleaning services. Complete end-to-end support from store setup to daily operations.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a href="#inquiry" className="lf-btn-submit" style={{ textDecoration: 'none', padding: '11px 28px', borderRadius: 8, fontSize: '0.88rem' }}>ALPHA MODEL ›</a>
                <a href="#inquiry" className="lf-btn-submit" style={{ textDecoration: 'none', padding: '11px 28px', borderRadius: 8, fontSize: '0.88rem', background: dark ? '#15803d' : '#0f5520' }}>BETA MODEL ›</a>
                <a href="#inquiry" className="lf-btn-submit" style={{ textDecoration: 'none', padding: '11px 28px', borderRadius: 8, fontSize: '0.88rem', background: dark ? '#14532d' : '#0a3d18' }}>COMBO MODEL ›</a>
                <a href="#inquiry" className="lf-btn-submit" style={{ textDecoration: 'none', padding: '11px 28px', borderRadius: 8, fontSize: '0.88rem', background: dark ? '#1e3a2f' : '#22c55e' }}>HYDRO-CARBON MODEL ›</a>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {advantages.map((a, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="lf-advantage-card">
                      <h5>{a.title}</h5>
                      <p>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS TIMELINE ── */}
      <section className="lf-section" id="process">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">THE PROCESS</span>
            <h2 className="lf-section-title">Steps to Owning a <span>Cleanz24 Franchise</span></h2>
            <div className="lf-divider mx-auto"></div>
          </div>
          <div className="lf-timeline">
            {timelineSteps.map((step, i) => {
              const isRight = i % 2 === 0; // even = card on RIGHT, odd = card on LEFT
              return (
                <div className="lf-timeline-step" key={i}>
                  {isRight ? (
                    // Card RIGHT: spacer | circle | card
                    <>
                      <div className="lf-timeline-spacer d-none d-md-block" />
                      <div className="lf-timeline-num">{step.step}</div>
                      <div className="lf-timeline-content lf-left">
                        <div className="lf-timeline-step-label">{step.label}</div>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </>
                  ) : (
                    // Card LEFT: card | circle | spacer
                    <>
                      <div className="lf-timeline-content lf-right">
                        <div className="lf-timeline-step-label">{step.label}</div>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                      <div className="lf-timeline-num">{step.step}</div>
                      <div className="lf-timeline-spacer d-none d-md-block" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center mt-4">
            <a href="#inquiry" className="lf-btn-submit" style={{ textDecoration: 'none', padding: '12px 40px', borderRadius: 8 }}>Start My Franchise Journey ›</a>
          </div>
        </div>
      </section>

      {/* ── BRAND PARTNERS ── */}
      <section className="lf-section lf-section-alt" id="partners">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">TRUSTED PARTNERSHIPS</span>
            <h2 className="lf-section-title">Our <span>Brand Partners</span></h2>
            <div className="lf-divider mx-auto"></div>
          </div>
          <div className="row g-4 justify-content-center align-items-center">
            {brandPartners.map((partner, i) => (
              <div className="col-6 col-md-4 col-lg-2" key={i}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lf-partner-logo text-decoration-none"
                  style={{
                    background: dark ? 'rgba(30, 41, 59, 0.7)' : '#fff',
                    border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    height: '84px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                    e.currentTarget.style.borderColor = partner.color;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${partner.shadowColor}`;
                    const textSpan = e.currentTarget.querySelector('span');
                    if (textSpan) {
                      textSpan.style.background = partner.gradient;
                      textSpan.style.WebkitBackgroundClip = 'text';
                      textSpan.style.WebkitTextFillColor = 'transparent';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = dark ? '#334155' : '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                    const textSpan = e.currentTarget.querySelector('span');
                    if (textSpan) {
                      textSpan.style.background = 'none';
                      textSpan.style.WebkitBackgroundClip = 'initial';
                      textSpan.style.WebkitTextFillColor = dark ? '#cbd5e1' : '#4A5568';
                    }
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: '800',
                      fontSize: '0.98rem',
                      textAlign: 'center',
                      color: dark ? '#cbd5e1' : '#4A5568',
                      transition: 'all 0.2s ease',
                      padding: '0 10px'
                    }}
                  >
                    {partner.name}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lf-section" id="testimonials">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">INVESTOR SUCCESS</span>
            <h2 className="lf-section-title">Success Stories from Our <span>Pan-India Network</span></h2>
            <div className="lf-divider mx-auto"></div>
          </div>
          <div className="d-flex justify-content-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => setSuccessStoryIndex(prev => Math.max(0, prev - 1))}
              disabled={successStoryIndex === 0}
              className="btn rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '44px',
                height: '44px',
                padding: 0,
                opacity: successStoryIndex === 0 ? 0.3 : 1,
                cursor: successStoryIndex === 0 ? 'not-allowed' : 'pointer',
                border: `1.5px solid ${dark ? '#4ade80' : '#1a7a2e'}`,
                color: dark ? '#4ade80' : '#1a7a2e',
                background: 'transparent',
                transition: 'all 0.2s ease',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
              onMouseEnter={(e) => { if (successStoryIndex !== 0) { e.currentTarget.style.background = dark ? '#4ade80' : '#1a7a2e'; e.currentTarget.style.color = dark ? '#1e293b' : '#fff'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = dark ? '#4ade80' : '#1a7a2e'; }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setSuccessStoryIndex(prev => Math.min(testimonials.length - successVisibleCards, prev + 1))}
              disabled={successStoryIndex >= testimonials.length - successVisibleCards}
              className="btn rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '44px',
                height: '44px',
                padding: 0,
                opacity: successStoryIndex >= testimonials.length - successVisibleCards ? 0.3 : 1,
                cursor: successStoryIndex >= testimonials.length - successVisibleCards ? 'not-allowed' : 'pointer',
                border: `1.5px solid ${dark ? '#4ade80' : '#1a7a2e'}`,
                color: dark ? '#4ade80' : '#1a7a2e',
                background: 'transparent',
                transition: 'all 0.2s ease',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
              onMouseEnter={(e) => { if (successStoryIndex < testimonials.length - successVisibleCards) { e.currentTarget.style.background = dark ? '#4ade80' : '#1a7a2e'; e.currentTarget.style.color = dark ? '#1e293b' : '#fff'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = dark ? '#4ade80' : '#1a7a2e'; }}
            >
              →
            </button>
          </div>

          <div style={{ overflow: 'hidden', width: '100%', padding: '10px 0' }}>
            <div
              style={{
                display: 'flex',
                gap: '24px',
                transform: `translateX(calc(-${successStoryIndex} * (100% + 24px) / ${successVisibleCards}))`,
                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                width: '100%'
              }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={{
                    flex: `0 0 calc((100% - (${successVisibleCards} - 1) * 24px) / ${successVisibleCards})`,
                    width: `calc((100% - (${successVisibleCards} - 1) * 24px) / ${successVisibleCards})`
                  }}
                >
                  <div className="lf-testimonial-card d-flex flex-column h-100" style={{ margin: 0 }}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="lf-testimonial-avatar">{t.initials}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: dark ? '#f1f5f9' : '#1A202C' }}>{t.name}</div>
                        <div style={{ fontSize: '0.78rem', color: dark ? '#94a3b8' : '#718096' }}>{t.city}</div>
                        <span className="lf-verified">✓ VERIFIED OWNER</span>
                      </div>
                    </div>
                    <p className="lf-testimonial-quote">"{t.quote}"</p>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3 lf-testimonial-divider">
                      <span style={{ fontSize: '0.8rem', color: dark ? '#94a3b8' : '#718096', fontWeight: 600 }}>{t.model}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: dark ? '#4ade80' : '#1a7a2e' }}>{t.milestone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2 mt-4">
            {Array.from({ length: testimonials.length - successVisibleCards + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSuccessStoryIndex(idx)}
                style={{
                  width: successStoryIndex === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: successStoryIndex === idx ? (dark ? '#4ade80' : '#1a7a2e') : (dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'),
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  outline: 'none'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDIA MENTIONS ── */}
      <section className="lf-section lf-section-alt" id="media">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">IN THE NEWS</span>
            <h2 className="lf-section-title">Media <span>Mentions</span></h2>
            <div className="lf-divider mx-auto"></div>
            <p style={{ color: dark ? '#94a3b8' : '#718096', fontSize: '0.9rem' }}>Cleanz24 has been spotlighted on major news outlets.</p>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
            {mediaMentions.map((m, i) => (
              <div
                key={i}
                style={{
                  background: dark ? 'rgba(30, 41, 59, 0.7)' : '#fff',
                  border: `1.5px solid ${dark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  padding: '14px 26px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transform: 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = m.color;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${m.shadowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = dark ? '#334155' : '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{m.icon}</span>
                <span
                  style={{
                    fontFamily: m.font,
                    fontWeight: m.font.includes('Playfair') || m.font.includes('Lora') ? '800' : '900',
                    fontSize: '1.1rem',
                    background: m.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: m.letterSpacing || 'normal'
                  }}
                >
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section className="lf-section lf-section-green" id="locations">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">WE ARE EXPANDING</span>
            <h2 className="lf-section-title">Cleanz24: Franchise Locations <span>Across India</span></h2>
            <p className="text-muted">Click any city below to view dedicated franchise details, ROI blueprint & local market data:</p>
            <div className="lf-divider mx-auto"></div>
          </div>
          <div className="lf-cities-scroll-container" style={{
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '20px 16px',
            borderRadius: '16px',
            background: dark ? 'rgba(15, 22, 35, 0.6)' : 'rgba(248, 250, 252, 0.8)',
            border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div className="row g-3 justify-content-center">
              {FRANCHISE_CITIES && FRANCHISE_CITIES.map((item, i) => (
                <div className="col-6 col-md-3 col-lg-2" key={i}>
                  <Link href={`/laundry/franchise/${item.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="lf-location-pill" style={{ cursor: 'pointer', transition: 'all 0.2s', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={`${item.city}, ${item.state}`}>
                      📍 {item.city}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lf-cta" id="inquiry">
        <div className="container">
          <h2>Ready to Start Your Franchise?</h2>
          <p>Join 100+ successful franchise owners across India. Get your personalized location analysis and investment blueprint today!</p>
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">
            <a href={`https://wa.me/919138004800?text=Hi, I'm interested in a Cleanz24 Laundry Franchise. Please send me details.`}
              target="_blank" rel="noreferrer" className="lf-cta-btn">
              📱 WhatsApp Us Now
            </a>
            <a href="tel:+919138004800" className="lf-cta-btn-outline">📞 Call: +91 91380 04800</a>
            <a href="/cleanz24_franchise_brochure.pdf" download="cleanz24_franchise_brochure.pdf" className="lf-cta-btn" style={{ background: '#22c55e', borderColor: '#22c55e' }}>
              📥 Download Brochure
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}

export default LaundryFrenchise;
