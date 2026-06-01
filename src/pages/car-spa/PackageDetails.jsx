import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/carSpa.css';

const packagesList = [
  {
    id: 'crystal-shield',
    badge: 'Entry Level',
    name: 'CRYSTAL SHIELD',
    tagline: 'Your first step to perfection',
    desc: 'Basic wash, polish & paint protection',
    services: [
      'Foam Wash',
      'Pre-Wash',
      'Underbody Wash',
      'Car Perfume Spray',
      'Laying paper mats',
      'All Tyre Polishing',
      'Tyre & Arches Cleaning',
      'Exterior Plastic Parts Polishing',
      'All 4 Wheels / Alloys Cleaning',
      'Liquid wax Sprayed on Car\'s Body',
      'Engine Degreasing with Steam Wash',
      'All foot mats will be washed & vacuumed',
      'Full Car vacuumed including seats & boot',
      'AC Duct Cleaning & Sanitization using steam',
      'Chemical spraying to make the windshield scratch resistant',
      'All 4 Doors & Dashboard, Cleaned and Polished from inside'
    ],
    idealFor: 'Daily use cars, monthly maintenance',
    duration: '1.5 - 2 Hours',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #060d09 0%, #0d0d0d 100%)'
  },
  {
    id: 'velvet-touch',
    badge: 'Mid Range',
    name: 'VELVET TOUCH',
    tagline: 'Feel the difference inside and out',
    desc: 'Interior detailing, vacuuming & upholstery care',
    services: [
      'Interior Vacuuming',
      'Deep Cleaning the Interior Dash, Center Console and Door Panels',
      'Interior Dressing (Glossy Finish / Satin Finish)',
      'Roof Cleaning',
      'Upholstery and Carpet Cleaning',
      'Steam Cleaning and Feeding of Leather Seats',
      'Leather Waxing',
      'Steam Cleaning and Sanitization of Car',
      'AC Vents Cleaning',
      'Seat Belt Cleaning',
      'Boot Cleaning',
      'Glass Cleaning from inside'
    ],
    idealFor: 'Family cars, weekly refresh',
    duration: '2.5 - 3 Hours',
    icon: '🛋️',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #060d09 100%)'
  },
  {
    id: 'pearl-radiance',
    badge: 'Premium',
    name: 'PEARL RADIANCE',
    tagline: 'Deep clean. Deep shine.',
    desc: 'Deep cleaning, paint correction & ceramic coating',
    services: [
      'Deep foam exterior wash',
      'Paint decontamination',
      'Machine polish & paint correction',
      'Ceramic coating application',
      'Interior deep clean',
      'Odour elimination treatment',
      'Tyre & rim detailing'
    ],
    inheritsServices: ['crystal-shield', 'velvet-touch'],
    idealFor: 'Cars before resale, premium sedans & SUVs',
    duration: '4 - 5 Hours',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #060d09 0%, #0d0d0d 100%)'
  },
  {
    id: 'obsidian-elite',
    badge: 'Top Tier',
    name: 'OBSIDIAN ELITE',
    tagline: 'Engineered for the obsessed',
    desc: 'Engine bay cleaning, headlight restoration & UV protection',
    services: [
      'Full exterior & interior detailing',
      'Engine bay degreasing & cleaning',
      'Headlight restoration',
      'UV paint protection coating',
      'Leather conditioning',
      'Water spot removal',
      'Chrome & trim polishing',
      'Underbody rinse'
    ],
    idealFor: 'Luxury cars, SUVs, sports cars',
    duration: '6 - 7 Hours',
    icon: '💎',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #060d09 100%)'
  },
  {
    id: 'platinum-revival',
    badge: 'Ultimate',
    name: 'PLATINUM REVIVAL',
    tagline: 'Total rebirth. Zero compromise.',
    desc: 'Full paint, interior & mechanical exterior overhaul',
    services: [
      'Full body paint correction',
      'Nano ceramic coat (5 year protection)',
      'Complete interior overhaul',
      'Engine bay full restoration',
      'Headlight & taillight restoration',
      'Scratch & swirl mark removal',
      'Leather deep conditioning',
      'Odour bomb treatment',
      'Full mechanical exterior overhaul',
      'Before & after photography'
    ],
    idealFor: 'Heavily used cars, pre-sale restoration, classic & luxury vehicles',
    duration: '1 - 2 Days',
    icon: '👑',
    gradient: 'linear-gradient(135deg, #060d09 0%, #0d0d0d 100%)'
  }
];

function InheritedServicesAccordion({ title, services }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="accordion-item mb-3" 
      style={{ 
        background: 'var(--card-bg)', 
        border: '1px solid var(--card-border)', 
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-100 py-3 px-4 d-flex justify-content-between align-items-center bg-transparent border-0 text-heading fw-bold text-uppercase"
        style={{ outline: 'none', cursor: 'pointer', textAlign: 'left', letterSpacing: '1px', fontSize: '0.95rem' }}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-block', fontSize: '0.8rem', color: 'var(--primary-color)' }}
        >
          ▼
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-4 pb-4 border-top border-secondary border-opacity-10 pt-3">
          <div className="row g-2">
            {services.map((item, idx) => (
              <div key={idx} className="col-md-6 col-12 d-flex align-items-center gap-2 py-1">
                <span className="premium-check-circle" style={{ width: '22px', height: '22px', fontSize: '0.75rem' }}>✓</span>
                <span className="text-main" style={{ fontSize: '0.9rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PackageDetails() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  
  // Find current package data
  const pkg = packagesList.find(p => p.id === packageId);

  // Scroll to top when this details page is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [packageId]);

  if (!pkg) {
    return (
      <div className="d-flex flex-column min-vh-100 align-items-center justify-content-center text-center py-5 bg-primary-custom text-white">
        <h2 className="mb-4">Package Not Found</h2>
        <p className="text-muted-custom mb-4">The selected treatment package could not be resolved.</p>
        <Link to="/car-spa" className="btn btn-glow px-4 py-2">Back to Car Spa</Link>
      </div>
    );
  }

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      
      {/* Cinematic Hero Spotlight */}
      <section className="position-relative text-center overflow-hidden d-flex align-items-center justify-content-center" style={{ minHeight: '60vh', background: '#000' }}>
        {/* Animated Background Mesh */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(rgba(0, 255, 136, 0.04) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: 0.8,
            zIndex: 1
          }}
        />

        {/* Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60vw', height: '60vw',
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 60%)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />

        {/* Subtle Diagonal Lines */}
        <div className="carbon-mesh-overlay position-absolute w-100 h-100 top-0 start-0 opacity-20" style={{ zIndex: 0 }} />

        <div className="container position-relative z-2 py-5 mt-5">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeUpVariant} className="badge mb-3" style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)', color: '#00ff88', border: '1px solid rgba(0, 255, 136, 0.3)', fontSize: '0.85rem', padding: '6px 16px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              {pkg.badge}
            </motion.span>
            
            <motion.div variants={fadeUpVariant} className="d-flex align-items-center justify-content-center gap-3 mb-2 flex-wrap">
              <span className="fs-1">{pkg.icon}</span>
              <h1 className="display-3 fw-black mb-0" style={{ fontWeight: 900, fontFamily: "'Oswald', sans-serif", backgroundImage: 'linear-gradient(135deg, var(--primary-color) 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {pkg.name}
              </h1>
            </motion.div>

            <motion.p variants={fadeUpVariant} className="lead mx-auto mb-4" style={{ maxWidth: '650px', fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
              "{pkg.tagline}"
            </motion.p>

            <motion.p variants={fadeUpVariant} className="text-white opacity-75 fs-5 mx-auto mb-4" style={{ maxWidth: '600px', lineHeight: '1.7' }}>
              {pkg.desc}
            </motion.p>

            <motion.div variants={fadeUpVariant} className="d-flex justify-content-center gap-3 flex-wrap mt-3">
              <Link to="/car-spa" className="btn btn-outline-secondary px-4 py-2 text-white text-decoration-none">
                ← Back to Car Spa
              </Link>
              <Link to={`/car-spa/book?package=${encodeURIComponent(pkg.name)}`} className="btn btn-glow px-4 py-2 text-decoration-none">
                Book This Package
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Package Details Details Panel */}
      <section className="py-5 pkg-details-section">
        <div className="container py-4">
          
          {/* Section 1: Specifications Tiles */}
          <div className="row g-4 mb-5">
            <div className="col-md-4 col-12">
              <div className="spec-tile text-center">
                <span className="spec-icon">📊</span>
                <div className="small text-muted-custom text-uppercase tracking-wider mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                  Treatment Level
                </div>
                <h4 className="fw-bold text-heading mb-0">{pkg.badge}</h4>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="spec-tile text-center">
                <span className="spec-icon">⏱️</span>
                <div className="small text-muted-custom text-uppercase tracking-wider mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                  Required Duration
                </div>
                <h4 className="fw-bold text-heading mb-0">{pkg.duration}</h4>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="spec-tile text-center">
                <span className="spec-icon">🚗</span>
                <div className="small text-muted-custom text-uppercase tracking-wider mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                  Ideal Suitability
                </div>
                <h4 className="fw-bold text-heading mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.4' }}>{pkg.idealFor}</h4>
              </div>
            </div>
          </div>

          {/* Section 2: Booking CTAs */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 col-12 text-center">
              <div className="p-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                <h4 className="fw-bold text-heading mb-3 text-uppercase">Ready to transform your car?</h4>
                <p className="text-muted-custom mb-4">Book this package online or chat with our experts to customize your detailing package.</p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                  <Link to={`/car-spa/book?package=${encodeURIComponent(pkg.name)}`} className="btn btn-online-premium px-5 py-3 text-uppercase text-decoration-none d-flex align-items-center justify-content-center gap-2">
                    <span>📅 Book Online Now</span>
                  </Link>
                  <a 
                    href={`https://wa.me/919138004800?text=Hi%2C%20I'm%20interested%20in%20booking%20the%20${encodeURIComponent(pkg.name)}%20package.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp-premium px-5 py-3 text-uppercase text-decoration-none d-flex align-items-center justify-content-center gap-2"
                  >
                    <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
                      <path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16c0 2.4.6 4.7 1.8 6.7L2.5 29.5l7-1.8c2 .1 4.1 1.8 6.5 1.8 7.5 0 13.5-6 13.5-13.5S23.5 2.5 16 2.5zm0 22.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4C5.5 18.2 5 16.1 5 14c0-6.1 5-11 11-11s11 4.9 11 11-4.9 11-11 11zm6-7.8c-.3-.2-2-.1-2.3-.8-.3-.7-.3-1.3-.4-1.4-.2-.2-.5-.2-.8 0-.3.3-1.3 1.3-1.5 1.5-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-1-1-1.3-1.3-1.5-1.5-.2-.2 0-.3.1-.4.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.4-1-.5-1.4-.1-.4-.2-.3-.3-.3h-.3c-.1 0-.3 0-.5.2-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4 1.7.8 2.3.9 3.1.8.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.6-.4z" />
                    </svg>
                    <span>WhatsApp Detailing Expert</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Included Services Grid */}
          <div className="border-top border-secondary border-opacity-10 pt-5">
            <div className="text-center mb-5">
              <span className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px', color: 'var(--primary-color)' }}>
                WHAT'S INCLUDED
              </span>
              <h2 className="display-6 fw-bold text-heading mb-3">Included Treatments & Services</h2>
              <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px' }}>
                Our professional detailing team works meticulously to ensure that every task in this list is completed to the highest showroom standards.
              </p>
            </div>

            <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3 mb-5">
              {pkg.services.map((service, index) => (
                <div key={index} className="col">
                  <div className="service-mini-card">
                    <span className="premium-check-circle">✓</span>
                    <div>
                      <div className="fw-bold text-heading fs-6">{service}</div>
                      <div className="text-muted-custom small mt-1" style={{ fontSize: '0.8rem' }}>Showroom standard execution</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Inherited Services Accordions */}
            {pkg.inheritsServices && pkg.inheritsServices.length > 0 && (
              <div className="mt-5 pt-4">
                <h3 className="fw-bold h5 text-heading mb-4 text-uppercase text-center" style={{ letterSpacing: '1px' }}>
                  Additional Services Inherited in {pkg.name}
                </h3>
                <div className="d-flex flex-column gap-2 mx-auto" style={{ maxWidth: '850px' }}>
                  {pkg.inheritsServices.map((inheritedId) => {
                    const parentPkg = packagesList.find(p => p.id === inheritedId);
                    if (!parentPkg) return null;
                    return (
                      <InheritedServicesAccordion 
                        key={inheritedId} 
                        title={`All Services From The ( ${parentPkg.name} )`} 
                        services={parentPkg.services} 
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
