import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import SEOMeta from '../../components/SEOMeta';
import laundryImg3 from '../../assets/laundry_img3.png';
import laundryStorefront from '../../assets/laundry_storefront.png';
import laundryStorefront2 from '../../assets/laundry_storefront2.png';

/* ─── Dynamic Styles ─────────────────────────────────────────────── */
const getStyles = (dark) => `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

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
  .lf-form input::placeholder { color: ${dark ? '#64748b' : '#A0AEC0'}; }
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

/* ─── Component ─────────────────────────────────────────────────── */
function LaundryFrenchise() {
  // Get isDarkMode from the LaundryLayout via Outlet context
  const { isDarkMode } = useOutletContext() || {};
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
      tag: 'Starter', title: 'ALPHA – BASIC',
      sub: 'Ideal for compact high-footfall spaces in tier-2 and tier-3 cities.',
      investment: '₹10 - ₹12 Lacs', area: '200 - 400 sqft', profit: '₹60K - ₹1L/mo', roi: '18-20 months',
      features: ['Store Setup & Branding', 'Basic Equipment Provided', 'Staff Training Included', 'Local Marketing Support'],
      featured: false,
    },
    {
      tag: 'Most Popular', title: 'CLASSIC MODEL',
      sub: 'Our standard studio handling heavy loads, steam ironing & dry-cleaning.',
      investment: '₹15 - ₹18 Lacs', area: '400 - 800 sqft', profit: '₹1.5 - ₹2L/mo', roi: '14-16 months',
      features: ['Advanced Dry-Cleaning Machines', 'Steam Ironing Setup', 'Local Marketing Support', 'CRM Dashboard Access'],
      featured: true,
    },
    {
      tag: 'Premium', title: 'COMBO – PREMIUM',
      sub: 'Flagship mega workspace for high-speed washing and specialized fabric care.',
      investment: '₹25+ Lacs', area: '1000+ sqft', profit: '₹2.5 - ₹3L/mo', roi: '12-14 months',
      features: ['Full Industrial Setup', 'Shoe & Bag Cleaning Module', 'Dedicated Manager Training', 'Mega City & Commercial Tie-ups'],
      featured: false,
    },
  ];

  const metrics = [
    { icon: '🏪', value: '100+', label: 'Franchise Locations' },
    { icon: '🌍', value: '21', label: 'States Covered' },
    { icon: '😊', value: '50K+', label: 'Happy Customers' },
    { icon: '📅', value: '8+', label: 'Years Experience' },
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
    { initials: 'RK', name: 'Rajesh Kumar', city: 'Gurugram, Haryana', model: 'Classic Model', milestone: '₹1.8L/month', quote: 'I opened my Cleanz24 franchise 8 months ago and we\'re already doing great business. The brand recognition gave us a head-start that competitors simply don\'t have.' },
    { initials: 'PS', name: 'Priya Sharma', city: 'New Delhi', model: 'Alpha - Basic', milestone: '₹90K/month', quote: 'Coming from a regular job, I was nervous about running my own business. Cleanz24\'s training and support made it incredibly smooth. ROI within 16 months!' },
    { initials: 'AM', name: 'Amit Mehta', city: 'Visakhapatnam, AP', model: 'Combo Premium', milestone: '₹2.7L/month', quote: 'The Combo Premium model was the best investment decision of my life. Cleanz24\'s CRM dashboard and automated billing makes managing the store effortless.' },
  ];

  const advantages = [
    { title: 'The Lineage', desc: 'Being India\'s elite laundry and home care network, Cleanz24 brings decades of service experience, premium formulations, and state-of-the-art store blueprints.' },
    { title: 'Obsession with Quality', desc: 'We believe every garment needs to be treated with utmost care. Our eco-friendly detergents and professional equipment ensures superior results.' },
    { title: 'The Experience', desc: 'Blending experience with innovation and technology, our methods go beyond presentation to superior fabric protection and long-term customer relationships.' },
    { title: 'CRM & Tech Support', desc: 'Automated mobile bookings, customer billing analytics, and targeted digital lead generation through our proprietary CRM platform.' },
    { title: 'Marketing Support', desc: 'Local brand launch campaigns, digital lead streams, and targeted marketing strategies are all handled by our centralized marketing team.' },
    { title: 'Supply Chain', desc: 'Direct centralized supply of eco-friendly detergents, active foam solutions, and premium fabric care products directly to your store.' },
  ];

  return (
    <div className="lf-page">
      <SEOMeta
        title="Laundry & Dry Cleaning Franchise Opportunities"
        description="Partner with Cleanz24. Open a highly profitable laundry & dry cleaning franchise in India. Full operations training, supply chain access, and CRM support."
        canonical="https://cleanz24.com/laundry/franchise"
      />
      <style>{getStyles(dark)}</style>


      {/* ── HERO ── */}
      <section className="lf-hero">
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

              {submitted ? (
                <div className="lf-success-box">
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
                  <h4 style={{ fontFamily: 'Poppins', fontWeight: 700, color: dark ? '#4ade80' : '#1a7a2e', marginBottom: 8 }}>Application Received!</h4>
                  <p style={{ color: dark ? '#94a3b8' : '#4A5568', marginBottom: 16, fontSize: '0.92rem' }}>
                    Thank you, <strong>{formData.name}</strong>! Our team will call you at <strong>{formData.phone}</strong> within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)}
                    style={{ background: 'none', border: `1.5px solid ${dark ? '#4ade80' : '#22c55e'}`, color: dark ? '#4ade80' : '#1a7a2e', padding: '8px 24px', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="lf-form">
                  <label htmlFor="name">Name <span>*</span></label>
                  <input id="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                  <label htmlFor="phone">Phone Number <span>*</span></label>
                  <input id="phone" type="tel" placeholder="Enter a valid phone number" value={formData.phone} onChange={handleChange} required />
                  <label htmlFor="email">Email <span>*</span></label>
                  <input id="email" type="email" placeholder="Enter a valid email id" value={formData.email} onChange={handleChange} required />
                  <label htmlFor="city">City <span>*</span></label>
                  <input id="city" type="text" placeholder="Enter your city" value={formData.city} onChange={handleChange} required />
                  <button type="submit" className="lf-btn-submit">Submit</button>
                </form>
              )}
            </div>

            {/* Right: Images */}
            <div className="col-lg-6 d-none d-lg-block">
              <div className="row g-3">
                <div className="col-5">
                  <img src={laundryImg3} alt="Cleanz24 Store Interior"
                    style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center', borderRadius: 14, boxShadow: `0 8px 32px rgba(0,0,0,${dark ? '0.4' : '0.15'})` }} />
                </div>
                <div className="col-7 d-flex flex-column gap-3">
                  <img src={laundryStorefront} alt="Cleanz24 Store 1"
                    style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'center', borderRadius: 14, boxShadow: `0 8px 32px rgba(0,0,0,${dark ? '0.4' : '0.15'})` }} />
                  <img src={laundryStorefront2} alt="Cleanz24 Store 2"
                    style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'center', borderRadius: 14, boxShadow: `0 8px 32px rgba(0,0,0,${dark ? '0.4' : '0.15'})` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="lf-stats-bar">
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
      <section className="lf-section lf-section-alt">
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
              <div className="col-lg-4 col-md-6" key={i}>
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
                    Enquire About {m.title.split('–')[0].trim()} Model
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
              { icon: '💵', value: '11–20 Lacs', label: 'Total Investment' },
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
      <section className="lf-section lf-section-green">
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
                <a href="#inquiry" className="lf-btn-submit" style={{ textDecoration: 'none', padding: '11px 28px', borderRadius: 8, fontSize: '0.88rem' }}>ALPHA – BASIC ›</a>
                <a href="#inquiry" className="lf-btn-submit" style={{ textDecoration: 'none', padding: '11px 28px', borderRadius: 8, fontSize: '0.88rem', background: dark ? '#15803d' : '#0f5520' }}>CLASSIC MODEL ›</a>
                <a href="#inquiry" className="lf-btn-submit" style={{ textDecoration: 'none', padding: '11px 28px', borderRadius: 8, fontSize: '0.88rem', background: dark ? '#14532d' : '#0a3d18' }}>COMBO PREMIUM ›</a>
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
      <section className="lf-section">
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
      <section className="lf-section lf-section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">TRUSTED PARTNERSHIPS</span>
            <h2 className="lf-section-title">Our <span>Brand Partners</span></h2>
            <div className="lf-divider mx-auto"></div>
          </div>
          <div className="row g-4 justify-content-center align-items-center">
            {['Alliance Laundry Systems', 'LG Electronics', 'Speed Queen', 'Fabcare', 'Reckitt Benckiser', 'Samsung'].map((partner, i) => (
              <div className="col-6 col-md-4 col-lg-2" key={i}>
                <div className="lf-partner-logo"><span>{partner}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lf-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">INVESTOR SUCCESS</span>
            <h2 className="lf-section-title">Success Stories from Our <span>Pan-India Network</span></h2>
            <div className="lf-divider mx-auto"></div>
          </div>
          <div className="row g-4 justify-content-center">
            {testimonials.map((t, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div className="lf-testimonial-card d-flex flex-column">
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
      </section>

      {/* ── MEDIA MENTIONS ── */}
      <section className="lf-section lf-section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">IN THE NEWS</span>
            <h2 className="lf-section-title">Media <span>Mentions</span></h2>
            <div className="lf-divider mx-auto"></div>
            <p style={{ color: dark ? '#94a3b8' : '#718096', fontSize: '0.9rem' }}>Cleanz24 has been spotlighted on major news outlets.</p>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-5">
            {['The Times of India', 'Hindustan Times', 'Dainik Bhaskar', 'Economic Times', 'NDTV'].map((m, i) => (
              <div key={i} className="lf-media-item">{m}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section className="lf-section lf-section-green">
        <div className="container">
          <div className="text-center mb-5">
            <span className="lf-section-subtitle">WE ARE EXPANDING</span>
            <h2 className="lf-section-title">Cleanz24: India's Largest <span>Laundry & Dry Clean Stores</span></h2>
            <div className="lf-divider mx-auto"></div>
          </div>
          <div className="row g-3 justify-content-center">
            {['Gurugram', 'New Delhi', 'Bhilwara', 'Visakhapatnam', 'Jatani', 'Jeypore', 'Chandigarh', 'Jaipur', 'Mumbai', 'Hyderabad', 'Bengaluru', 'Pune'].map((city, i) => (
              <div className="col-6 col-md-3 col-lg-2" key={i}>
                <div className="lf-location-pill">📍 {city}</div>
              </div>
            ))}
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
          </div>
        </div>
      </section>


    </div>
  );
}

export default LaundryFrenchise;
