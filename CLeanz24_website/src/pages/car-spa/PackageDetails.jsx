import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/carSpa.css';

const packagesList = [
  {
    id: 'crystal-shield',
    badge: 'Entry Level',
    name: 'CRYSTAL SHIELD',
    tagline: 'Your first step to perfection',
    desc: 'Basic wash, polish & paint protection',
    prices: {
      'hatchback': { regular: '750', member: '500' },
      'sedan': { regular: '800', member: '550' },
      'suv & luxury': { regular: '850', member: '600' }
    },
    services: [
      'Pre-Wash',
      'Foam Wash',
      'Underbody Wash',
      'Car Perfume Spray',
      'Laying paper mats',
      'All Tyre Polishing',
      'Tyre & Arches Cleaning',
      'All 4 Wheels / Alloys Cleaning',
      'All foot mats will be washed & vacuumed',
      'Full Car vacuumed including seats & boot',
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
    prices: {
      'hatchback': { regular: '1,800', member: '1,500' },
      'sedan': { regular: '2,200', member: '1,800' },
      'suv & luxury': { regular: '2,500', member: '2,000' }
    },
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
    duration: '2 Hours',
    icon: '🛋️',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #060d09 100%)'
  },
  {
    id: 'pearl-radiance',
    badge: 'Premium',
    name: 'PEARL RADIANCE',
    tagline: 'Deep clean. Deep shine.',
    desc: 'Deep cleaning, paint correction & ceramic coating',
    prices: {
      'hatchback': { regular: '2400', member: '1800' },
      'sedan': { regular: '2800', member: '2000' },
      'suv & luxury': { regular: '3000', member: '2200' }
    },
    services: [],
    inheritsServices: ['crystal-shield', 'velvet-touch'],
    idealFor: 'Cars before resale, premium sedans & SUVs',
    duration: '4 - 5 Hours',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #060d09 0%, #0d0d0d 100%)'
  },
  {
    id: 'platinum-revival',
    badge: 'Ultimate',
    name: 'PLATINUM REVIVAL',
    tagline: 'Engineered for the obsessed',
    desc: 'Engine bay cleaning, headlight restoration & UV protection',
    prices: {
      'hatchback': { regular: '3800', member: '3000' },
      'sedan': { regular: '4300', member: '3200' },
      'suv & luxury': { regular: '4800', member: '3400' }
    },
    services: [
      'Antibacterial Cleaning',
      'AC Deodorization'
    ],
    inheritsServices: ['pearl-radiance'],
    idealFor: 'Luxury cars, SUVs, sports cars',
    duration: '6 - 7 Hours',
    icon: '💎',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #060d09 100%)'
  }
];

const getAllServices = (pkg) => {
  let all = [...(pkg.services || [])];
  if (pkg.inheritsServices) {
    pkg.inheritsServices.forEach(depId => {
      const depPkg = packagesList.find(p => p.id === depId);
      if (depPkg) {
        all = [...all, ...getAllServices(depPkg)];
      }
    });
  }
  return [...new Set(all)];
};

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
  const { isDarkMode } = useOutletContext() || {};
  const navigate = useNavigate();
  const [selectedVehicleType, setSelectedVehicleType] = useState('hatchback');
  
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
    <div className={`d-flex flex-column min-vh-100 ${isDarkMode ? 'bg-primary-custom bg-carbon text-white' : 'bg-white text-dark'}`} style={{ overflowX: 'hidden' }}>
      
      {/* Cinematic Hero Spotlight */}
      <section 
        className="position-relative text-center overflow-hidden d-flex align-items-center justify-content-center" 
        style={{ 
          minHeight: '60vh', 
          background: isDarkMode ? '#000000' : 'linear-gradient(180deg, #ffffff 0%, #f3faf5 100%)',
          borderBottom: isDarkMode ? 'none' : '1px solid #edf2f7'
        }}
      >
        {/* Animated Background Mesh */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: isDarkMode 
              ? 'radial-gradient(rgba(0, 255, 136, 0.04) 1px, transparent 1px)' 
              : 'radial-gradient(rgba(0, 201, 109, 0.08) 1px, transparent 1px)',
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
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 60%)' 
              : 'radial-gradient(circle, rgba(0, 201, 109, 0.12) 0%, transparent 60%)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />

        {/* Subtle Diagonal Lines */}
        <div className={`carbon-mesh-overlay position-absolute w-100 h-100 top-0 start-0 ${isDarkMode ? 'opacity-20' : 'd-none'}`} style={{ zIndex: 0 }} />

        <div className="container position-relative z-2 py-5 mt-5">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeUpVariant} className="badge mb-3" style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)', color: '#00ff88', border: '1px solid rgba(0, 255, 136, 0.3)', fontSize: '0.85rem', padding: '6px 16px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              {pkg.badge}
            </motion.span>
            
            <motion.div variants={fadeUpVariant} className="d-flex align-items-center justify-content-center gap-3 mb-2 flex-wrap">
              <span className="fs-1">{pkg.icon}</span>
              <h1 className="display-3 fw-black mb-0" style={{ fontWeight: 900, fontFamily: "'Oswald', sans-serif", backgroundImage: isDarkMode ? 'linear-gradient(135deg, var(--primary-color) 0%, #ffffff 100%)' : 'linear-gradient(135deg, var(--primary-color) 0%, #08140B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {pkg.name}
              </h1>
            </motion.div>

            <motion.p variants={fadeUpVariant} className="lead mx-auto mb-4" style={{ maxWidth: '650px', fontSize: '1.25rem', color: isDarkMode ? 'rgba(255,255,255,0.7)' : '#4B6355', fontStyle: 'italic' }}>
              "{pkg.tagline}"
            </motion.p>

            <motion.p variants={fadeUpVariant} className="fs-5 mx-auto mb-4" style={{ maxWidth: '600px', lineHeight: '1.7', color: isDarkMode ? 'rgba(255,255,255,0.75)' : '#1a202c' }}>
              {pkg.desc}
            </motion.p>

            <motion.div variants={fadeUpVariant} className="d-flex justify-content-center gap-3 flex-wrap mt-3">
              <Link 
                to="/car-spa" 
                className="btn px-4 py-2 text-decoration-none"
                style={{ 
                  background: 'transparent',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.23)',
                  color: isDarkMode ? '#ffffff' : '#08140B',
                  fontWeight: 600
                }}
              >
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

            {pkg.services && pkg.services.length > 0 && (!pkg.inheritsServices || pkg.inheritsServices.length === 0) && (
              <div className="row g-3 row-cols-1 row-cols-md-2 row-cols-lg-3 mb-5 px-3">
                {pkg.services.map((service, index) => (
                  <div key={index} className="col">
                    <div className="d-flex align-items-center gap-2" style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="text-brand-primary fw-bold">✓</span>
                      <span className="text-heading small m-0 fw-medium" style={{ lineHeight: '1.2' }}>{service}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Inherited Services Accordions */}
            {pkg.inheritsServices && pkg.inheritsServices.length > 0 && (
              <div className="mt-4">
                <h3 className="fw-bold h5 text-heading mb-4 text-uppercase text-center" style={{ letterSpacing: '1px' }}>
                  Services Included in {pkg.name}
                </h3>
                <div className="d-flex flex-column gap-2 mx-auto" style={{ maxWidth: '850px' }}>
                  {/* Render direct services as an accordion if there are any */}
                  {pkg.services && pkg.services.length > 0 && (
                    <InheritedServicesAccordion 
                      key="direct-services"
                      title={`Unique to ${pkg.name}`}
                      services={pkg.services}
                    />
                  )}

                  {pkg.inheritsServices.map((inheritedId) => {
                    const parentPkg = packagesList.find(p => p.id === inheritedId);
                    if (!parentPkg) return null;
                    return (
                      <InheritedServicesAccordion 
                        key={inheritedId} 
                        title={`All Services From The ( ${parentPkg.name} )`} 
                        services={getAllServices(parentPkg)} 
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* INTERACTIVE PRICING SECTION */}
          <div className="text-center mt-5 mb-5 border-top border-secondary border-opacity-10 pt-5">
            <motion.span
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
              className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
              PRICING MATRIX
            </motion.span>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
              className="display-5 fw-bold mb-3 text-heading">SELECT VEHICLE CATEGORY</motion.h2>
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
              className="text-muted-custom mx-auto mb-4" style={{ maxWidth: '600px' }}>
              Our pricing is optimized according to car class sizes. Choose your category to view packages.
            </motion.p>

            {/* Pricing Tabs */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <div className="pricing-tabs">
                {['hatchback', 'sedan', 'suv & luxury'].map((type) => (
                  <button
                    key={type}
                    className={`pricing-tab-btn text-uppercase ${selectedVehicleType === type ? 'active' : ''}`}
                    onClick={() => setSelectedVehicleType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Custom Pricing Display based on Selected Vehicle Type */}
            <motion.div 
              className="row justify-content-center mt-5 text-start" 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            >
              <div className="col-lg-8 col-12">
                <div className="card package-card p-0 overflow-hidden" style={{ border: '1px solid var(--primary-color)', background: 'var(--card-bg)', borderRadius: '12px' }}>
                  <div className="bg-dark text-white py-3 text-center text-uppercase fw-bold tracking-widest" style={{ letterSpacing: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {selectedVehicleType === 'suv & luxury' ? 'HIGH END SUVs & LUXURY' : selectedVehicleType}
                  </div>
                  
                  <div className="d-flex flex-column flex-sm-row text-center">
                    {/* Regular Price */}
                    <div className="flex-fill p-4 border-end border-secondary border-opacity-25" style={{ backgroundColor: 'rgba(255,0,0,0.05)' }}>
                      <div className="text-muted-custom small text-uppercase tracking-widest mb-2" style={{ letterSpacing: '1.5px' }}>REGULAR PRICE</div>
                      <div className="display-5 fw-bold text-heading mb-0">
                        ₹{pkg.prices?.[selectedVehicleType]?.regular || '---'}
                      </div>
                    </div>

                    {/* Membership Price */}
                    <div className="flex-fill p-4" style={{ backgroundColor: 'rgba(0, 201, 109, 0.08)' }}>
                      <div className="small text-uppercase tracking-widest mb-2" style={{ letterSpacing: '1.5px', color: 'var(--primary-color)' }}>MEMBERSHIP PRICE</div>
                      <div className="display-5 fw-bold mb-0" style={{ color: 'var(--primary-color)' }}>
                        ₹{pkg.prices?.[selectedVehicleType]?.member || '---'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
