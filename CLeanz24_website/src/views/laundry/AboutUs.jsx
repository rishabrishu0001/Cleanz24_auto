import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import aboutBg from '../../assets/about_bg.jpg';

const features = [
  { title: 'Expert Care', desc: 'Skilled professionals who treat every fabric with precision and expertise.', icon: '⭐' },
  { title: '24/7 Convenience', desc: 'Service designed to fit your busy lifestyle — pickup and delivery on your schedule.', icon: '🕒' },
  { title: 'Eco-Friendly Cleaning', desc: 'Safe, certified solutions that protect both your clothes and the planet.', icon: '🌱' },
  { title: 'On-Time Delivery', desc: 'Fresh, clean clothes when you need them — never a delay.', icon: '🚚' },
  { title: 'Customer-First Approach', desc: 'Your satisfaction is always our top priority, every single order.', icon: '❤️' },
  { title: 'Pan India Presence', desc: '100+ stores across 17+ states, bringing premium laundry closer to you.', icon: '🇮🇳' },
];

const stats = [
  { value: '100+', label: 'Stores Pan India' },
  { value: '17+', label: 'States Covered' },
  { value: '2L+', label: 'Happy Customers' },
  { value: '50+', label: 'Years Cumulative Experience' },
];

const milestones = [
  { year: '2014', event: 'Cleanz24 founded — first store launched in Delhi NCR' },
  { year: '2016', event: 'Franchise model introduced; expanded to 10+ cities' },
  { year: '2019', event: 'Crossed 50 stores; launched eco-friendly German cleaning solutions' },
  { year: '2021', event: 'ISO 9001:2015 accreditation achieved; shoe laundry service added' },
  { year: '2023', event: 'Launched Car Spa vertical; crossed 1 lakh happy customers' },
  { year: '2025', event: '100+ stores across 17+ states; 2 lakh+ customers served' },
];

export default function AboutUs() {
  return (
    <div>
      
      {/* ── HERO BANNER ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0a2218 0%, #1a7a2e 55%, #1e9934 100%)',
          padding: '90px 0 70px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.07,
          backgroundImage: 'radial-gradient(circle at 25% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 75% 25%, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center text-white">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.15)', borderRadius: '50px',
              padding: '6px 18px', fontSize: '0.78rem', fontWeight: 600,
              letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px',
              backdropFilter: 'blur(8px)',
            }}>
              🌿 Our Story
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.5px' }}>
              About Cleanz24
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.88, maxWidth: '580px', margin: '0 auto 28px', lineHeight: 1.7 }}>
              Fresh, Clean, and Always Reliable — India's fastest-growing laundry & dry-cleaning franchise network.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/laundry/contact-us"
                style={{
                  background: '#fff', color: '#1a7a2e', padding: '12px 28px', borderRadius: '50px',
                  fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.5px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}>
                📱 Get In Touch
              </Link>
              <Link href="/laundry/franchise"
                style={{
                  background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '12px 28px', borderRadius: '50px',
                  fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(8px)',
                }}>
                🤝 Start a Franchise
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e8f5eb' }}>
        <div className="container py-4">
          <div className="row text-center g-3">
            {stats.map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <div style={{ padding: '16px 8px' }}>
                  <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#1a7a2e', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#666', marginTop: '6px', fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="section-subtitle">Fresh, Clean, and Always Reliable</span>
              <h2 className="section-title mt-2 mb-4" style={{ lineHeight: 1.3 }}>
                At Cleanz24, we make clothing care{' '}
                <span>simple, reliable, and stress-free.</span>
              </h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                From daily laundry to delicate dry-cleaning, we handle every garment with expert attention and care.
                Our mission is to keep your clothes looking fresh, spotless, and perfectly maintained — so you can
                feel confident every day.
              </p>
              <p className="text-muted mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                With advanced cleaning techniques, eco-friendly German solutions, and a commitment to customer satisfaction,
                we ensure your wardrobe is always in safe hands. Whether it's everyday wear, office outfits, or special
                occasion attire — your garment is our priority.
              </p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#1a7a2e', fontWeight: 600 }}>
                  <span style={{ fontSize: '1.1rem' }}>✅</span> ISO 9001:2015 Accredited
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#1a7a2e', fontWeight: 600 }}>
                  <span style={{ fontSize: '1.1rem' }}>✅</span> German Eco-Friendly Solutions
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative" style={{ borderRadius: 20, overflow: 'hidden', height: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                <Image src={aboutBg} alt="About Cleanz24" fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,122,46,0.15)' }} />
                {/* Badge overlay */}
                <div style={{
                  position: 'absolute', bottom: 20, left: 20, right: 20,
                  background: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: '14px 18px',
                  backdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  <div style={{ fontSize: '2rem' }}>🏆</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a2e1a' }}>India's #1 Laundry Franchise</div>
                    <div style={{ fontSize: '0.78rem', color: '#555' }}>Trusted by 2 Lakh+ customers across India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-padding why-choose-us-section">
        <div className="container">
          <div className="text-center mb-5 mx-auto" style={{ maxWidth: 700 }}>
            <span className="section-subtitle">Why Choose Us</span>
            <h2 className="section-title mt-2">What Makes Us <span>Stand Out</span></h2>
            <p className="text-muted mt-3">
              At Cleanz24, we go beyond just laundry and dry-cleaning — we deliver care, convenience, and quality you can trust.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {features.map((feature, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="why-choose-us-card p-4 text-center h-100 shadow-sm" style={{ borderRadius: 16 }}>
                  <div className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{ width: 64, height: 64, background: '#f0faf2', borderRadius: '50%', fontSize: '28px' }}>
                    {feature.icon}
                  </div>
                  <h4 className="h5 fw-bold mb-3">{feature.title}</h4>
                  <p className="mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY / MILESTONES ── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5 mx-auto" style={{ maxWidth: 600 }}>
            <span className="section-subtitle">Our Journey</span>
            <h2 className="section-title mt-2">A Decade of <span>Excellence</span></h2>
            <p className="text-muted mt-3">From a single store to India's leading laundry franchise network.</p>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(180deg, #1a7a2e, #aee8bc)',
              transform: 'translateX(-50%)',
            }} />
            {milestones.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                marginBottom: '32px',
                gap: '24px',
              }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <div style={{
                    background: '#fff', borderRadius: 12, padding: '14px 18px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid #e8f5eb',
                    display: 'inline-block', maxWidth: '260px',
                  }}>
                    <div style={{ fontWeight: 700, color: '#1a7a2e', fontSize: '0.88rem', marginBottom: '4px' }}>{m.year}</div>
                    <div style={{ fontSize: '0.88rem', color: '#444', lineHeight: 1.5 }}>{m.event}</div>
                  </div>
                </div>
                {/* Dot */}
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: '#1a7a2e', border: '3px solid #fff',
                  boxShadow: '0 0 0 3px #1a7a2e',
                  flexShrink: 0, zIndex: 1,
                }} />
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMITMENT ── */}
      <section className="section-padding bg-white text-center">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: 800 }}>
            <h2 className="section-title mb-4">Where Care Meets <span>Commitment</span></h2>
            <p className="text-muted lead mb-0" style={{ lineHeight: 1.8 }}>
              At Cleanz24, we're committed to giving your clothes the care they deserve. Every garment we handle is treated
              with attention, expertise, and respect — because we know your wardrobe is more than just fabric, it's a part
              of your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-5 text-center" style={{ background: 'linear-gradient(135deg, #1a7a2e 0%, #0f5520 100%)' }}>
        <div className="container py-4">
          <h2 className="text-white fw-bold mb-3">
            Your Trusted Partner for Premium Laundry and Dry-Cleaning, Now Near You
          </h2>
          <p className="mb-5 fst-italic" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 680, margin: '0 auto 32px', lineHeight: 1.8 }}>
            "Cleanz24 – Expert Laundry &amp; Dry Cleaning Services Near You. Fast, eco-friendly, and professionally done."
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="btn-primary-custom btn-white-bg px-5 py-3 fs-5"
              style={{ justifyContent: 'center' }}>
              📱 Schedule Your Free Pickup
            </a>
            <Link href="/laundry/franchise" className="btn-primary-custom px-5 py-3 fs-5"
              style={{ justifyContent: 'center', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.5)' }}>
              🤝 Own a Franchise
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
