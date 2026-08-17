import React, { Suspense } from 'react';
import Link from 'next/link';
import LaundryFranchiseInteractive from '../../../views/laundry/LaundryFranchiseInteractive';

// ─── ISR: Revalidate every 24 hours ────────────────────────────────────────
export const revalidate = 86400;

// ─── SEO Metadata ──────────────────────────────────────────────────────────
export const metadata = {
  title: "Best Laundry Franchise in India 2025 | Cleanz24 Studio — ₹13L Investment",
  description: "Start a profitable Cleanz24 laundry franchise in India. Investment from ₹13 Lakhs, 18–20 month ROI. 100+ stores across 21 states. Free consultation — apply now!",
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities-in-india",
  },
  openGraph: {
    type: 'website',
    title: "Best Laundry Franchise in India 2025 | Cleanz24 Studio",
    description: "Start a profitable Cleanz24 laundry franchise in India. Investment from ₹13 Lakhs, 18–20 month ROI. 100+ stores across 21 states.",
    url: "https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities-in-india",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Cleanz24 — Best Laundry Franchise in India, Investment starting ₹13 Lakhs",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best Laundry Franchise in India 2025 | Cleanz24 Studio",
    description: "Start a profitable Cleanz24 laundry franchise in India. Investment from ₹13 Lakhs, 18–20 month ROI. 100+ stores across 21 states.",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
  },
};

// ─── JSON-LD Schema ─────────────────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cleanz24',
  url: 'https://cleanz24.com',
  logo: 'https://cleanz24.com/logo_laundry.jpg',
  description: "India's fastest-growing laundry and dry cleaning franchise chain with 100+ operational stores across 21+ states.",
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9138004800',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  sameAs: [
    'https://www.instagram.com/cleanz24india/',
    'https://www.facebook.com/share/1D2QDyaHBG/?mibextid=wwXIfr',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cleanz24.com/best-laundry-drycleaning' },
    { '@type': 'ListItem', position: 2, name: 'Best Laundry Franchise in India', item: 'https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities-in-india' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the minimum investment required to start a Cleanz24 laundry franchise in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Investment starts at ₹13 Lakhs for the Alpha Model (250 sq.ft minimum area), which includes end-to-end store setup, machinery, chemical supply, branding, and training.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the expected ROI and break-even period for a Cleanz24 franchise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Operating break-even is typically achieved within 3 to 6 months, while full capital investment ROI is achieved in 18 to 20 months.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Cleanz24 provide staff training and site selection assistance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Cleanz24 provides complete site selection intelligence based on footfall and demographic data, along with 7 days of comprehensive operational and technical staff training.',
      },
    },
    {
      '@type': 'Question',
      name: 'What training is provided to the franchise owner and staff?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cleanz24 provides comprehensive 7-day training covering laundry operations, garment fabric care, spot removal techniques, POS software usage, and customer relation skills.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the royalty and CRM software charges for a Cleanz24 franchise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cleanz24 maintains a highly competitive flat royalty structure designed to maximize store profit margins. Complete details including royalty percentage and CRM charges are shared during the initial consultation call.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to launch a Cleanz24 store after signing the franchise agreement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The typical timeline from signing the franchise agreement to grand opening is 30 to 45 days, including store setup, equipment installation, staff training, and marketing launch.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Laundry & Dry Cleaning Franchise Business Opportunity',
  provider: { '@type': 'Organization', name: 'Cleanz24', url: 'https://cleanz24.com' },
  areaServed: { '@type': 'Country', name: 'India' },
  offers: [
    { '@type': 'Offer', name: 'Alpha Franchise Model', description: 'Entry-level studio setup for laundry and pressing. Investment starting ₹13 Lakhs. Minimum area 250 sq.ft.' },
    { '@type': 'Offer', name: 'Beta Franchise Model', description: 'High-capacity laundry & dry cleaning setup. Investment starting ₹15 Lakhs. Monthly profit ₹1.5 Lacs+.' },
    { '@type': 'Offer', name: 'Combo Commercial Model', description: 'B2B & B2C commercial laundry setup. Investment starting ₹22 Lakhs. Minimum area 400 sq.ft.' },
    { '@type': 'Offer', name: 'Hydro-Carbon Model', description: 'Ultra-premium eco-friendly hydrocarbon dry cleaning studio. Investment starting ₹35 Lakhs.' },
  ],
};

// ─── Static data (server-rendered, no JS needed) ───────────────────────────
const MODELS = [
  {
    tag: 'Starter',
    title: 'ALPHA MODEL',
    sub: 'Ideal for standard laundry setups in high-density residential areas.',
    investment: '₹13 Lacs+',
    area: '250 Sq.Ft (Minimum)',
    profit: '₹1 Lakh/Month+',
    roi: '18-20 Months',
    featured: false,
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

const WHY_US = [
  { icon: '💰', title: 'Low Investment & High ROI', desc: 'Proven business models starting from ₹13L with 60-80% annual return on investment across 100+ operational outlets.' },
  { icon: '📱', title: 'Proprietary Tech & CRM', desc: 'Automated order tracking, customer WhatsApp alerts, staff POS system, and billing analytics — all included.' },
  { icon: '🌿', title: 'Eco-Friendly Solvents', desc: 'Hypoallergenic softwash detergents safe for delicate silk sarees, suits, and luxury wear.' },
  { icon: '🚗', title: 'Doorstep Pickup Model', desc: 'App-based pickup & delivery logistics extending your customer reach beyond physical location.' },
  { icon: '🤝', title: 'Dedicated Relationship Manager', desc: 'Personal relationship manager for day-to-day operational guidance, marketing, and staff training.' },
  { icon: '📊', title: 'Proven Unit Economics', desc: '100+ operational outlets across India delivering predictable monthly cashflows.' },
];

const SUPPORT_PILLARS = [
  { step: '01', title: 'Site Selection & Analysis', desc: 'Demographic research, footfall estimation & final location approval to maximize your store potential.' },
  { step: '02', title: 'Store Setup & Equipment', desc: 'Turnkey interior design, machinery installation & eco chemical supply — everything ready before launch.' },
  { step: '03', title: 'Staff Training & Onboarding', desc: 'Hands-on 7-day operational training for garment care, steam press & customer service excellence.' },
  { step: '04', title: 'Marketing & Grand Launch', desc: 'Local launch campaigns, Google My Business optimization & digital lead streams setup.' },
  { step: '05', title: 'Ongoing Operations Support', desc: 'Continuous CRM software updates, supply chain refill & regular audit support post-launch.' },
];

const FAQS = [
  {
    q: 'What is the minimum investment required to start a Cleanz24 franchise?',
    a: 'Investment starts at ₹13 Lakhs for the Alpha Model (250 sq.ft minimum area), which includes end-to-end store setup, machinery, chemical supply, branding, and training.',
  },
  {
    q: 'What is the expected break-even time for a Cleanz24 store?',
    a: 'Based on data across our 100+ stores, operating break-even is achieved within 3 to 6 months, while full investment ROI is typically achieved in 18 to 20 months.',
  },
  {
    q: 'Does Cleanz24 help in site selection and store setup?',
    a: 'Yes! Our real estate and location intelligence team evaluates demographic data, catchment footfall, and competitor density before approving any location.',
  },
  {
    q: 'What training is provided to the franchise owner and staff?',
    a: 'We provide comprehensive 7-day training covering laundry operations, garment fabric care, spot removal techniques, POS software usage, and customer relation skills.',
  },
  {
    q: 'What are the royalty and CRM software charges?',
    a: 'We maintain a highly competitive flat royalty structure designed to maximize store profit margins. Complete details are shared during initial consultation.',
  },
  {
    q: 'How long does it take to launch a store from agreement signing?',
    a: 'The typical timeline from signing the franchise agreement to grand opening is 30 to 45 days, including store setup, equipment installation, staff training, and grand opening marketing.',
  },
];

const BRAND_PARTNERS = [
  'Alliance Laundry Systems', 'LG Electronics', 'Speed Queen', 'Fabcare', 'Reckitt Benckiser', 'Samsung',
];

const MEDIA_MENTIONS = [
  'The Times of India', 'Hindustan Times', 'Dainik Bhaskar', 'Economic Times', 'NDTV',
];

// ─── Page Component (Server Component — no 'use client') ───────────────────
export default function Page() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div style={{ fontFamily: "'Inter', sans-serif", background: '#ffffff', color: '#1e293b' }}>

        {/* ══ SECTION 1: HERO (Static — crawlers ko seedha milega) ══ */}
        <section
          style={{
            backgroundImage: 'url("/assets/store_hero.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '100px 0 70px',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="Cleanz24 Franchise Hero Section"
        >
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 24,
                  padding: '32px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                }}>
                  {/* Trust Badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dcfce7', border: '1px solid #86efac', padding: '6px 16px', borderRadius: 30, marginBottom: 20 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#15803d', letterSpacing: '0.5px', textTransform: 'uppercase' }}>⭐ BEST LAUNDRY FRANCHISE IN INDIA</span>
                  </div>

                  {/* H1 — Primary keyword target */}
                  <h1 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(28px, 4.5vw, 48px)',
                    lineHeight: 1.2,
                    color: '#0f172a',
                    marginBottom: 20,
                  }}>
                    Best Laundry Franchise in India — Start Your{' '}
                    <span style={{ color: '#16a34a' }}>Cleanz24 Franchise</span>
                  </h1>

                  <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', fontWeight: 600, color: '#475569', marginBottom: 28, lineHeight: 1.5 }}>
                    🚀 Fastest Growing Laundry Chain in India &nbsp;|&nbsp; 🏆 100+ Stores &nbsp;|&nbsp; 🌍 21+ States &nbsp;|&nbsp; 😊 2,00,000+ Happy Customers
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
                    <div style={{ background: '#ffffff', padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                      🗓️ Est. 2025
                    </div>
                    <div style={{ background: '#ffffff', padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 600, color: '#d97706' }}>
                      ★ 4.8 / 5 Rating
                    </div>
                    <div style={{ background: '#ffffff', padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                      📰 Featured in TOI & NDTV
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <a
                      href="#franchise-form"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                        color: '#fff', textDecoration: 'none', padding: '16px 36px',
                        borderRadius: 12, fontWeight: 700, fontSize: '1.05rem',
                        fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 24px rgba(22,163,74,0.3)',
                      }}
                    >
                      Get Free Franchise Details →
                    </a>
                    <a
                      href="https://wa.me/919138004800?text=Hi%2C%20I%20am%20interested%20in%20a%20Cleanz24%20Laundry%20Franchise.%20Please%20send%20details."
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        background: '#25d366', color: '#fff', textDecoration: 'none',
                        padding: '16px 24px', borderRadius: 12, fontWeight: 700, fontSize: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                      aria-label="Chat with Cleanz24 franchise team on WhatsApp"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Right side — interactive slideshow loads client-side */}
              <div className="col-lg-6">
                <Suspense fallback={
                  <div style={{ height: 400, borderRadius: 20, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                    Loading store images...
                  </div>
                }>
                  <LaundryFranchiseInteractive section="slideshow" />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SECTION 2: INVESTMENT SNAPSHOT (Static) ══ */}
        <section id="snapshot" style={{ padding: '70px 0', background: '#ffffff', borderBottom: '1px solid #f1f5f9' }} aria-label="Investment and ROI Snapshot">
          <div className="container">
            <div className="text-center mb-5">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>TRANSPARENT UNIT ECONOMICS</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#0f172a', marginTop: 6 }}>
                Investment & Profit <span style={{ color: '#16a34a' }}>Snapshot</span>
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: 600, margin: '8px auto 0' }}>
                Honest business metrics validated across 100+ operating Cleanz24 studios across India.
              </p>
            </div>
            <div className="row g-4">
              {[
                { icon: '💼', label: 'Total Investment', value: '₹13L – ₹35L', sub: 'Turnkey Store Setup', color: '#16a34a' },
                { icon: '📈', label: 'Monthly Profit', value: '₹1.0L – ₹3.5L+', sub: 'Predictable Cashflow', color: '#2563eb' },
                { icon: '🎯', label: 'Annual ROI', value: '60% – 80%', sub: 'High Capital Efficiency', color: '#7c3aed' },
                { icon: '⏳', label: 'Break-even Period', value: '18 – 20 Mo', sub: 'Full Investment Payback', color: '#d97706' },
              ].map((stat, i) => (
                <div className="col-6 col-lg-3" key={i}>
                  <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '28px 20px', textAlign: 'center', height: '100%' }}>
                    <div style={{ fontSize: '2.2rem', marginBottom: 12 }} role="img" aria-label={stat.label}>{stat.icon}</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px', marginBottom: 6 }}>{stat.label}</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(18px, 2.5vw, 26px)', color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 4 }}>{stat.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SECTION 3: ROI CALCULATOR (Interactive — client-side) ══ */}
        <section id="calculator" style={{ padding: '80px 0', background: '#f0faf2' }} aria-label="Franchise ROI Calculator">
          <div className="container">
            <div className="text-center mb-5">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>INTERACTIVE WIDGET</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#0f172a', marginTop: 6 }}>
                Calculate Your Estimated <span style={{ color: '#16a34a' }}>Franchise Returns</span>
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: 600, margin: '8px auto 0' }}>
                Select your city tier and franchise model to view exact projected revenue, annual profit & payback period.
              </p>
            </div>
            <Suspense fallback={
              <div style={{ maxWidth: 860, margin: '0 auto', background: '#ffffff', borderRadius: 24, padding: '36px 28px', border: '1.5px solid #d1fae5', textAlign: 'center', color: '#64748b' }}>
                Loading ROI Calculator...
              </div>
            }>
              <LaundryFranchiseInteractive section="calculator" />
            </Suspense>
          </div>
        </section>

        {/* ══ SECTION 4: WHY CLEANZ24 (Static) ══ */}
        <section id="why-us" style={{ padding: '80px 0', background: '#ffffff' }} aria-label="Why Invest in Cleanz24 Franchise">
          <div className="container">
            <div className="text-center mb-5">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>THE COMPETITIVE EDGE</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#0f172a', marginTop: 6 }}>
                Why Invest in <span style={{ color: '#16a34a' }}>Cleanz24?</span>
              </h2>
              <div style={{ display: 'inline-block', background: '#fef3c7', border: '1px solid #fde047', borderRadius: 12, padding: '10px 24px', marginTop: 12, color: '#854d0e', fontWeight: 600, fontSize: '0.9rem' }}>
                💡 <strong>96% of India's laundry sector is unorganized</strong> — Cleanz24 brings a standardized, tech-enabled brand model.
              </div>
            </div>
            <div className="row g-4">
              {WHY_US.map((card, idx) => (
                <div className="col-md-6 col-lg-4" key={idx}>
                  <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '28px 24px', height: '100%' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 14 }} role="img" aria-label={card.title}>{card.icon}</div>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', marginBottom: 8 }}>{card.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SECTION 5: FRANCHISE MODELS (Static) ══ */}
        <section id="models" style={{ padding: '80px 0', background: '#f8fafb' }} aria-label="Cleanz24 Franchise Models and Investment Options">
          <div className="container">
            <div className="text-center mb-5">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>INVESTMENT OPTIONS</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#0f172a', marginTop: 6 }}>
                Choose Your <span style={{ color: '#16a34a' }}>Franchise Model</span>
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: 560, margin: '8px auto 0' }}>
                Pre-configured laundry studio setups optimized for your budget, location, and business ambition. All models include complete store setup, machinery, branding, and training.
              </p>
            </div>
            <div className="row g-4">
              {MODELS.map((m, idx) => (
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
                      style={{
                        display: 'block', textAlign: 'center',
                        background: m.featured ? '#16a34a' : 'transparent',
                        color: m.featured ? '#ffffff' : '#16a34a',
                        border: m.featured ? 'none' : '1.5px solid #16a34a',
                        padding: '10px', borderRadius: 10, fontWeight: 700, textDecoration: 'none',
                        fontSize: '0.88rem', fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      Enquire About {m.title.split(' ')[0]} Model
                    </a>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SECTION 6: SUPPORT PILLARS (Static) ══ */}
        <section id="support" style={{ padding: '80px 0', background: '#ffffff' }} aria-label="Cleanz24 Franchise Support System">
          <div className="container">
            <div className="text-center mb-5">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>END-TO-END HANDHOLDING</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#0f172a', marginTop: 6 }}>
                Full 5-Pillar <span style={{ color: '#16a34a' }}>Franchise Support</span>
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: 600, margin: '8px auto 0' }}>
                We guide you from initial site selection to daily operating excellence — with a dedicated relationship manager at every step.
              </p>
            </div>
            <div className="row g-4">
              {SUPPORT_PILLARS.map((p, idx) => (
                <div className="col-md-4 col-lg" key={idx}>
                  <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '24px 18px', height: '100%' }}>
                    <div style={{ display: 'inline-block', background: '#16a34a', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '0.8rem', padding: '2px 10px', borderRadius: 12, marginBottom: 12 }}>
                      STEP {p.step}
                    </div>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BRAND PARTNERS (Static) ══ */}
        <section id="partners" style={{ padding: '60px 0', background: '#f8fafb', borderTop: '1px solid #e2e8f0' }} aria-label="Cleanz24 Brand Partners and Equipment Suppliers">
          <div className="container">
            <div className="text-center mb-4">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>GLOBAL ALLIANCES</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#0f172a', marginTop: 4 }}>Our Brand Partners</h2>
            </div>
            <div className="row g-3 justify-content-center align-items-center">
              {BRAND_PARTNERS.map((name, i) => (
                <div className="col-6 col-md-4 col-lg-2" key={i}>
                  <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 12, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, textAlign: 'center', fontWeight: 700, fontSize: '0.82rem', color: '#475569' }}>
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MEDIA MENTIONS (Static) ══ */}
        <section id="media" style={{ padding: '60px 0', background: '#ffffff' }} aria-label="Cleanz24 Media Coverage and Press Mentions">
          <div className="container">
            <div className="text-center mb-4">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>IN THE NEWS</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#0f172a', marginTop: 4 }}>Media Mentions</h2>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {MEDIA_MENTIONS.map((name, i) => (
                <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '12px 24px', fontWeight: 700, fontSize: '0.9rem', color: '#334155' }}>
                  📰 {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SECTION 7: FAQs (Static — visible to crawlers + interactive accordion loads client-side) ══ */}
        <section id="faqs" style={{ padding: '80px 0', background: '#f0faf2' }} aria-label="Frequently Asked Questions about Cleanz24 Franchise">
          <div className="container" style={{ maxWidth: 840 }}>
            <div className="text-center mb-5">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>GOT QUESTIONS?</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#0f172a', marginTop: 6 }}>
                Franchise <span style={{ color: '#16a34a' }}>FAQs</span>
              </h2>
            </div>

            {/* Static FAQ content — visible to Google/AI crawlers without JS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {FAQS.map((faq, idx) => (
                <details key={idx} style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
                  <summary style={{
                    padding: '18px 24px', cursor: 'pointer',
                    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#0f172a',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none',
                  }}>
                    {faq.q}
                    <span style={{ fontSize: '1.2rem', color: '#16a34a', marginLeft: 16, flexShrink: 0 }}>+</span>
                  </summary>
                  <div style={{ padding: '0 24px 20px', paddingTop: 14, color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, borderTop: '1px solid #f1f5f9' }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            {/* Internal link to related content */}
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Want to explore franchise locations?{' '}
                <Link href="/best-laundry-drycleaning/stores" style={{ color: '#16a34a', fontWeight: 700 }}>
                  View All Cleanz24 Stores →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ══ SECTION 8: FRANCHISE FORM (Interactive — client-side) ══ */}
        <section id="franchise-form" style={{ padding: '90px 0', background: '#ffffff' }} aria-label="Apply for Cleanz24 Franchise">
          <div className="container" style={{ maxWidth: 640 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>FREE CONSULTATION</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#0f172a', marginTop: 10, marginBottom: 6 }}>
                Apply for Cleanz24 <span style={{ color: '#16a34a' }}>Franchise</span>
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Investment starts at <strong>₹13 Lacs</strong>. Our franchise team will call you within 24 hours.
              </p>
            </div>
            <Suspense fallback={
              <div style={{ background: '#f8fafc', borderRadius: 24, padding: '40px 32px', border: '2px solid #86efac', textAlign: 'center', color: '#64748b' }}>
                Loading franchise application form...
              </div>
            }>
              <LaundryFranchiseInteractive section="form" />
            </Suspense>
          </div>
        </section>

        {/* ══ LOCATIONS GRID (Static — internal links help SEO cluster) ══ */}
        <section id="locations" style={{ padding: '60px 0', background: '#f8fafb', borderTop: '1px solid #e2e8f0' }} aria-label="Cleanz24 Franchise Locations Across India">
          <div className="container">
            <div className="text-center mb-4">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>PAN-INDIA NETWORK</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#0f172a', marginTop: 4 }}>
                Cleanz24 Franchise Locations Across India
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 8 }}>
                Explore franchise opportunities city-wise — operational stores and new territory availability.
              </p>
            </div>
            <Suspense fallback={<div style={{ height: 200, background: '#f1f5f9', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Loading locations...</div>}>
              <LaundryFranchiseInteractive section="locations" />
            </Suspense>
          </div>
        </section>

        {/* Sticky WhatsApp CTA */}
        <a
          href="https://wa.me/919138004800?text=Hi%2C%20I%20am%20interested%20in%20a%20Cleanz24%20Laundry%20Franchise.%20Please%20send%20details."
          target="_blank"
          rel="noreferrer"
          style={{
            position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
            background: '#25d366', color: '#ffffff', textDecoration: 'none',
            padding: '12px 20px', borderRadius: 30, fontWeight: 700, fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 8px 24px rgba(37,211,102,0.4)', fontFamily: 'Poppins, sans-serif',
          }}
          aria-label="Chat with Cleanz24 franchise team on WhatsApp"
        >
          <span style={{ fontSize: '1.2rem' }}>💬</span> Chat with Franchise Team
        </a>

      </div>
    </>
  );
}
