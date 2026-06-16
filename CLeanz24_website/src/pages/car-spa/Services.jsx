import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  servicesData, 
  pricingPackagesData,
  faqsData
} from '../../data';
import carWashFoam from '../../assets/car_wash_foam.png';
import carWashInterior from '../../assets/car_wash_interior.png';
import carWashPageSpray from '../../assets/car_wash_spray.png';
import serviceVideo from '../../assets/service_video.mp4';

import { Link } from 'react-router-dom';
import '../../styles/carSpa.css';
import SEOMeta from '../../components/SEOMeta';

// 1. SERVICES PAGE COMPONENT
function Services({ isDarkMode, toggleTheme }) {
  const [selectedVehicleType, setSelectedVehicleType] = useState('sedan');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      <SEOMeta
        title="Car Detailing Services & Wash Packages"
        description="Explore the best detailing packages including Crystal Shield, Velvet Touch, Pearl Radiance, and Platinum Revival. Find the perfect treatment size and pricing for your car class."
        canonical="https://cleanz24.com/car-spa/services"
      />
      {/* NAVBAR */}
      {/* HERO SECTION */}
      <section className="hero-section position-relative text-center overflow-hidden" style={{ backgroundImage: 'none', backgroundColor: '#000', minHeight: '55vh', display: 'flex', alignItems: 'center' }}>
        {/* Cinematic Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src={serviceVideo} type="video/mp4" />
        </video>

        {/* Global Dark Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.72)',
            zIndex: 1
          }}
        />

        <motion.div
          className="container mt-5 position-relative z-2"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeUpVariant} className="text-uppercase tracking-widest text-brand-primary fw-bold small mb-3 d-block" style={{ letterSpacing: '4px' }}>
            DEVIATE FROM ORDINARY
          </motion.span>
          <motion.h1 variants={fadeUpVariant} className="display-1 fw-black mb-4 text-gradient" style={{ lineHeight: '1.1', fontWeight: 900 }}>
            SERVICES & CAPABILITIES
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="lead text-white mb-5 mx-auto" style={{ maxWidth: '650px', fontSize: '1.1rem', opacity: 0.95 }}>
            Experience eco-friendly active foam washing, deep interior vacuuming, and premium ceramic wax protective coats.
          </motion.p>
        </motion.div>
      </section>




      {/* EXTERIOR PRESSURE WASHING — FEATURED SERVICE SPOTLIGHT */}
      <section id="exterior-pressure-washing" className="py-5 bg-primary-custom" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="container py-5">

          {/* Section Label */}
          <motion.div
            className="text-center mb-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUpVariant} className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '4px', color: 'var(--brand-primary)' }}>
              SERVICE 01
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="display-5 fw-bold mb-3 text-heading">
              EXTERIOR PRESSURE WASHING
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-custom mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Give your car a fresh, clean, and showroom-like appearance with our professional high-pressure cleaning technology.
            </motion.p>
          </motion.div>

          {/* Main Split: Description left, Highlights right */}
          <div className="row g-5 align-items-start mb-5">
            
            {/* Left: full description */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-4 p-lg-5 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'linear-gradient(135deg, var(--brand-primary), #00c853)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0
                    }}>🚿</div>
                    <div>
                      <h3 className="fw-bold text-heading mb-0 h5">Cleanz24 – The Car Spa Studio</h3>
                      <span className="text-muted-custom small">Advanced High-Pressure Cleaning Technology</span>
                    </div>
                  </div>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Give your car a fresh, clean, and showroom-like appearance with our professional Exterior Pressure Washing Service. At <strong className="text-heading">Cleanz24 – The Car Spa Studio</strong>, we use advanced high-pressure cleaning technology to remove tough dirt, mud, dust, road grime, and harmful contaminants from your vehicle's exterior safely and effectively.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Our trained experts ensure deep cleaning of every corner including wheels, tyres, bumpers, side panels, and underbody areas without damaging the paint surface. Using premium-quality shampoos and modern equipment, we restore the shine and cleanliness your car deserves.
                  </p>

                  {/* Coverage Areas */}
                  <div className="mt-4">
                    <h4 className="text-heading fw-bold h6 mb-3 text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.78rem', color: 'var(--brand-primary)' }}>
                      COVERAGE AREAS
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {['Wheels & Tyres', 'Bumpers', 'Side Panels', 'Underbody', 'Roof & Hood', 'Door Gaps', 'Grille & Vents'].map((area, i) => (
                        <span key={i} style={{
                          padding: '5px 14px',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-primary)',
                          borderRadius: '2px'
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: benefit highlights + stats */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="d-flex flex-column gap-3"
              >
                {/* Headline */}
                <h4 className="text-heading fw-bold h5 mb-1">Key Benefits</h4>

                {/* Benefit Cards */}
                {[
                  { icon: '💧', title: 'Removes Stubborn Dirt & Road Deposits', desc: 'High-pressure jets blast away mud, grime, salt, and road film that ordinary washing can\'t touch.' },
                  { icon: '🦠', title: 'Improves Overall Vehicle Hygiene', desc: 'Contaminants and allergens clinging to your exterior are fully removed for a healthier car environment.' },
                  { icon: '✨', title: 'Gives a Fresh & Premium Finish', desc: 'Post-wash your car looks showroom-fresh with a clean, bright, and revitalized exterior appearance.' },
                  { icon: '🚗', title: 'Enhances Vehicle Appearance', desc: 'A clean exterior significantly improves your car\'s visual appeal and preserves long-term resale value.' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="d-flex align-items-start gap-3 p-3"
                    style={{
                      background: 'var(--secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{benefit.icon}</span>
                    <div>
                      <h5 className="fw-bold text-heading mb-1" style={{ fontSize: '0.9rem' }}>{benefit.title}</h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <a
                  href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20book%20an%20Exterior%20Pressure%20Washing%20service%20at%20Cleanz24."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glow w-100 py-3 mt-2 fw-bold text-decoration-none text-center"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                >
                  🚿 Book Exterior Pressure Wash
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="row g-3 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: '💦', stat: '150 BAR', label: 'Pressure Rating' },
              { icon: '🧼', stat: 'pH Neutral', label: 'Shampoo Formula' },
              { icon: '🛡️', stat: 'Paint Safe', label: 'Zero Surface Damage' },
              { icon: '⏱️', stat: '30–45 Min', label: 'Service Duration' }
            ].map((item, i) => (
              <motion.div key={i} className="col-6 col-md-3" variants={fadeUpVariant}>
                <div className="p-4 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="fw-black text-heading" style={{ fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.stat}</div>
                  <div className="text-muted-custom small">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* INTERIOR VACUUM CLEANING — SERVICE SPOTLIGHT */}
      <section id="interior-vacuum-cleaning" className="py-5" style={{ backgroundColor: 'var(--bg-section-alt)', borderTop: '1px solid var(--card-border)' }}>
        <div className="container py-5">

          {/* Section Label */}
          <motion.div
            className="text-center mb-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUpVariant} className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '4px', color: 'var(--brand-primary)' }}>
              SERVICE 02
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="display-5 fw-bold mb-3 text-heading">
              INTERIOR VACUUM CLEANING
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-custom mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Experience a clean, fresh, and comfortable driving environment with our premium Interior Vacuum Cleaning Service.
            </motion.p>
          </motion.div>

          {/* Main Split: Highlights left, Description right */}
          <div className="row g-5 align-items-start mb-5">

            {/* Left: benefit highlights */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="d-flex flex-column gap-3"
              >
                <h4 className="text-heading fw-bold h5 mb-1">Key Benefits</h4>

                {[
                  { icon: '🌬️', title: 'Removes Dust, Dirt & Allergens', desc: 'High-suction vacuuming lifts embedded dust, food particles, pet hair, and allergens from every surface inside your car.' },
                  { icon: '💨', title: 'Improves Cabin Air Quality', desc: 'Eliminating dust and hidden debris from vents, seats and carpets results in cleaner, fresher air for every journey.' },
                  { icon: '🛋️', title: 'Enhances Driving Comfort', desc: 'A spotlessly clean interior creates a more enjoyable, premium driving experience and a well-maintained appearance.' },
                  { icon: '🛡️', title: 'Protects Interior Surfaces', desc: 'Careful professional cleaning preserves the quality and longevity of your fabric, leather, and plastic surfaces.' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="d-flex align-items-start gap-3 p-3"
                    style={{
                      background: 'var(--secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{benefit.icon}</span>
                    <div>
                      <h5 className="fw-bold text-heading mb-1" style={{ fontSize: '0.9rem' }}>{benefit.title}</h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <a
                  href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20book%20an%20Interior%20Vacuum%20Cleaning%20service%20at%20Cleanz24."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glow w-100 py-3 mt-2 fw-bold text-decoration-none text-center"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                >
                  🌬️ Book Interior Vacuum Cleaning
                </a>
              </motion.div>
            </div>

            {/* Right: full description */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-4 p-lg-5 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'linear-gradient(135deg, var(--brand-primary), #00c853)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0
                    }}>🌬️</div>
                    <div>
                      <h3 className="fw-bold text-heading mb-0 h5">Cleanz24 – The Car Spa Studio</h3>
                      <span className="text-muted-custom small">Advanced High-Suction Vacuum Equipment</span>
                    </div>
                  </div>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Your car's interior collects dust, dirt, food particles, pet hair, bacteria, and hidden debris every day, which can affect cleanliness, hygiene, and overall comfort. Our professional vacuum cleaning service is designed to deeply clean every corner of your vehicle and restore a neat, fresh, and premium cabin experience.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    At <strong className="text-heading">Cleanz24</strong>, we use advanced high-suction vacuum equipment and professional cleaning techniques to remove unwanted dust and particles from seats, carpets, floor mats, boot space, air vents, door panels, and hard-to-reach areas. Our trained experts ensure detailed cleaning with care and precision, helping maintain the freshness and beauty of your car's interior.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    We focus on delivering a hygienic and dust-free environment that enhances driving comfort and gives your vehicle a well-maintained appearance. Whether it is daily dust buildup or deep interior dirt, our vacuum cleaning process provides effective results while protecting your vehicle's interior surfaces.
                  </p>

                  {/* Cleaned Areas */}
                  <div className="mt-4">
                    <h4 className="text-heading fw-bold h6 mb-3 text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.78rem', color: 'var(--brand-primary)' }}>
                      AREAS CLEANED
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {['Seats', 'Carpets', 'Floor Mats', 'Boot Space', 'Air Vents', 'Door Panels', 'Dashboard', 'Hard-to-Reach Areas'].map((area, i) => (
                        <span key={i} style={{
                          padding: '5px 14px',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-primary)',
                          borderRadius: '2px'
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="row g-3 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: '🌬️', stat: 'High-Suction', label: 'Vacuum Power' },
              { icon: '🧹', stat: '360°', label: 'Interior Coverage' },
              { icon: '🦠', stat: 'Allergen-Free', label: 'Cabin Result' },
              { icon: '⏱️', stat: '45–60 Min', label: 'Service Duration' }
            ].map((item, i) => (
              <motion.div key={i} className="col-6 col-md-3" variants={fadeUpVariant}>
                <div className="p-4 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="fw-black text-heading" style={{ fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.stat}</div>
                  <div className="text-muted-custom small">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ENGINE CLEANING — SERVICE SPOTLIGHT */}
      <section id="engine-cleaning" className="py-5 bg-primary-custom" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="container py-5">

          {/* Section Label */}
          <motion.div
            className="text-center mb-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUpVariant} className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '4px', color: 'var(--brand-primary)' }}>
              SERVICE 03
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="display-5 fw-bold mb-3 text-heading">
              ENGINE STEAM BATH CLEANING
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-custom mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Maintain the performance, cleanliness, and overall health of your vehicle with our professional Engine Cleaning Service.
            </motion.p>
          </motion.div>

          {/* Main Split: Description left, Highlights right */}
          <div className="row g-5 align-items-start mb-5">

            {/* Left: full description */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-4 p-lg-5 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'linear-gradient(135deg, var(--brand-primary), #00c853)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0
                    }}>⚙️</div>
                    <div>
                      <h3 className="fw-bold text-heading mb-0 h5">Cleanz24 – The Car Spa Studio</h3>
                      <span className="text-muted-custom small">Safe & Professional Engine Bay Cleaning</span>
                    </div>
                  </div>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    The engine area often collects heavy dust, grease, oil stains, mud, and dirt over time, which can affect the appearance and efficiency of your vehicle. Our advanced engine cleaning process helps remove unwanted buildup and keeps the engine bay clean, fresh, and well-maintained.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    At <strong className="text-heading">Cleanz24</strong>, we use safe cleaning methods, premium-quality products, and professional equipment to carefully clean the engine compartment without causing damage to sensitive components. Our trained experts ensure proper care while removing grease, dirt deposits, and harmful contaminants from engine surfaces, covers, corners, and surrounding areas.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    A clean engine not only improves the appearance of your vehicle but also helps in easier maintenance and inspection. Regular engine cleaning can help identify oil leaks, worn-out parts, and other issues at an early stage, supporting better vehicle care and long-term performance.
                  </p>

                  {/* Areas Cleaned */}
                  <div className="mt-4">
                    <h4 className="text-heading fw-bold h6 mb-3 text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.78rem', color: 'var(--brand-primary)' }}>
                      AREAS CLEANED
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {['Engine Block', 'Engine Cover', 'Bay Corners', 'Hoses & Pipes', 'Battery Area', 'Surrounding Panels', 'Grease Deposits'].map((area, i) => (
                        <span key={i} style={{
                          padding: '5px 14px',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-primary)',
                          borderRadius: '2px'
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: benefit highlights */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="d-flex flex-column gap-3"
              >
                <h4 className="text-heading fw-bold h5 mb-1">Key Benefits</h4>

                {[
                  { icon: '✨', title: 'Enhances Engine Bay Appearance', desc: 'A professionally cleaned engine bay looks impressive and adds to the overall premium look of your vehicle.' },
                  { icon: '🔍', title: 'Supports Better Maintenance Inspection', desc: 'A clean engine makes it easier to spot oil leaks, worn parts, and issues early — saving costly repairs.' },
                  { icon: '🚗', title: 'Improves Overall Vehicle Presentation', desc: 'From bonnet to boot, a spotless engine bay completes the full professional detailing appearance of your car.' },
                  { icon: '🛡️', title: 'Safe for Sensitive Components', desc: 'Our technicians carefully protect electronics and delicate parts throughout the entire cleaning process.' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="d-flex align-items-start gap-3 p-3"
                    style={{
                      background: 'var(--secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{benefit.icon}</span>
                    <div>
                      <h5 className="fw-bold text-heading mb-1" style={{ fontSize: '0.9rem' }}>{benefit.title}</h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <a
                  href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20book%20an%20Engine%20Cleaning%20service%20at%20Cleanz24."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glow w-100 py-3 mt-2 fw-bold text-decoration-none text-center"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                >
                  ⚙️ Book Engine Cleaning
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="row g-3 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: '⚙️', stat: 'Component Safe', label: 'Cleaning Method' },
              { icon: '🧴', stat: 'Premium', label: 'Products Used' },
              { icon: '🔍', stat: 'Early Detection', label: 'Leak & Wear Spotting' },
              { icon: '⏱️', stat: '60–90 Min', label: 'Service Duration' }
            ].map((item, i) => (
              <motion.div key={i} className="col-6 col-md-3" variants={fadeUpVariant}>
                <div className="p-4 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="fw-black text-heading" style={{ fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.stat}</div>
                  <div className="text-muted-custom small">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* AC CLEANING — SERVICE SPOTLIGHT */}
      <section id="ac-cleaning" className="py-5" style={{ backgroundColor: 'var(--bg-section-alt)', borderTop: '1px solid var(--card-border)' }}>
        <div className="container py-5">

          {/* Section Label */}
          <motion.div
            className="text-center mb-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUpVariant} className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '4px', color: 'var(--brand-primary)' }}>
              SERVICE 04
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="display-5 fw-bold mb-3 text-heading">
              AC CLEANING
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-custom mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Enjoy fresh, cool, and hygienic air inside your vehicle with our professional AC Cleaning Service.
            </motion.p>
          </motion.div>

          {/* Main Split: Highlights left, Description right */}
          <div className="row g-5 align-items-start mb-5">

            {/* Left: benefit highlights */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="d-flex flex-column gap-3"
              >
                <h4 className="text-heading fw-bold h5 mb-1">Key Benefits</h4>

                {[
                  { icon: '🌬️', title: 'Improves AC Cooling Performance', desc: 'Removes dust and debris buildup to allow maximum, ice-cold airflow and optimal cooling efficiency.' },
                  { icon: '🍃', title: 'Keeps Interior Fresh & Clean', desc: 'Eliminates mold, bacteria, and stale odors at the source for a fresh, pleasant cabin scent.' },
                  { icon: '🛡️', title: 'Professional & Safe Process', desc: 'Uses professional-grade equipment and safe cleaning solutions to sanitize vents without component damage.' },
                  { icon: '🦠', title: 'Enhances Air Hygiene & Comfort', desc: 'Clears airborne allergens and germs from air ducts, ensuring healthy breathing air for passengers.' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="d-flex align-items-start gap-3 p-3"
                    style={{
                      background: 'var(--secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{benefit.icon}</span>
                    <div>
                      <h5 className="fw-bold text-heading mb-1" style={{ fontSize: '0.9rem' }}>{benefit.title}</h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <a
                  href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20book%20an%20AC%20Cleaning%20service%20at%20Cleanz24."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glow w-100 py-3 mt-2 fw-bold text-decoration-none text-center"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                >
                  🌬️ Book AC Cleaning
                </a>
              </motion.div>
            </div>

            {/* Right: full description */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-4 p-lg-5 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'linear-gradient(135deg, var(--brand-primary), #00c853)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0
                    }}>❄️</div>
                    <div>
                      <h3 className="fw-bold text-heading mb-0 h5">Cleanz24 – The Car Spa Studio</h3>
                      <span className="text-muted-custom small">Deep AC Vent & Filter Sanitization</span>
                    </div>
                  </div>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Enjoy fresh, cool, and hygienic air inside your vehicle with our professional AC Cleaning Service at <strong className="text-heading">Cleanz24 – The Car Spa Studio</strong>. Over time, your car's air conditioning system collects dust, bacteria, dirt, mold, and unwanted odors that can affect cooling performance and cabin air quality.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Our advanced AC cleaning process is designed to deeply clean the AC system and restore freshness, comfort, and healthy airflow inside your vehicle. At <strong className="text-heading">Cleanz24</strong>, we use professional-grade equipment and safe cleaning solutions to clean AC vents, filters, ducts, and airflow channels carefully and effectively.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Our trained experts remove accumulated dust, germs, and unpleasant smells from the AC system, helping improve cooling efficiency and creating a cleaner driving environment. Regular AC cleaning not only enhances cooling performance but also helps maintain interior hygiene and provides a more comfortable driving experience for you and your passengers.
                  </p>

                  {/* Cleaned Areas */}
                  <div className="mt-4">
                    <h4 className="text-heading fw-bold h6 mb-3 text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.78rem', color: 'var(--brand-primary)' }}>
                      AREAS CLEANED
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {['AC Vents', 'AC Cabin Filter', 'Airflow Channels', 'Evaporator Core', 'Blower Fan', 'Duct System', 'Condenser Fins'].map((area, i) => (
                        <span key={i} style={{
                          padding: '5px 14px',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-primary)',
                          borderRadius: '2px'
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="row g-3 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: '🦠', stat: 'Allergen-Free', label: 'Air Quality Output' },
              { icon: '❄️', stat: 'Max Cooling', label: 'Efficiency Rebound' },
              { icon: '🧼', stat: 'Non-Toxic', label: 'Safe Cleaning Agents' },
              { icon: '⏱️', stat: '45–60 Min', label: 'Service Duration' }
            ].map((item, i) => (
              <motion.div key={i} className="col-6 col-md-3" variants={fadeUpVariant}>
                <div className="p-4 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="fw-black text-heading" style={{ fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.stat}</div>
                  <div className="text-muted-custom small">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* INTERIOR SANITIZATION — SERVICE SPOTLIGHT */}
      <section id="interior-sanitization" className="py-5 bg-primary-custom" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="container py-5">

          {/* Section Label */}
          <motion.div
            className="text-center mb-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUpVariant} className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '4px', color: 'var(--brand-primary)' }}>
              SERVICE 05
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="display-5 fw-bold mb-3 text-heading">
              INTERIOR SANITIZATION
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-custom mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Protect your car’s interior with our professional, advanced germ and allergen elimination sanitization service.
            </motion.p>
          </motion.div>

          {/* Main Split: Description left, Highlights right */}
          <div className="row g-5 align-items-start mb-5">

            {/* Left: full description */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-4 p-lg-5 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'linear-gradient(135deg, var(--brand-primary), #00c853)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0
                    }}>🛡️</div>
                    <div>
                      <h3 className="fw-bold text-heading mb-0 h5">Cleanz24 – The Car Spa Studio</h3>
                      <span className="text-muted-custom small">Advanced Pathogen & Germ Elimination</span>
                    </div>
                  </div>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Protect your car’s interior with our professional Interior Sanitization Service at <strong className="text-heading">Cleanz24 – The Car Spa Studio</strong>. Daily use of your vehicle can lead to the buildup of germs, bacteria, dust, allergens, and unpleasant odors inside the cabin.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Our advanced sanitization process helps create a clean, fresh, and hygienic environment for a safer and more comfortable driving experience. At <strong className="text-heading">Cleanz24</strong>, we use premium-quality sanitizing solutions and modern techniques to disinfect high-touch surfaces such as seats, dashboard, steering wheel, door panels, gear area, AC vents, and other interior sections.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Our trained professionals ensure deep cleaning and sanitization while maintaining the safety and quality of your vehicle’s interior materials. Interior sanitization helps improve cabin hygiene, eliminates unwanted odors, and provides a fresh atmosphere for you and your passengers during every drive.
                  </p>

                  {/* Sanitized Areas */}
                  <div className="mt-4">
                    <h4 className="text-heading fw-bold h6 mb-3 text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.78rem', color: 'var(--brand-primary)' }}>
                      HIGH-TOUCH AREAS DISINFECTED
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {['Seats', 'Dashboard', 'Steering Wheel', 'Door Panels', 'Gear Area', 'AC Vents', 'Seatbelts & Buckles', 'Door Handles'].map((area, i) => (
                        <span key={i} style={{
                          padding: '5px 14px',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-primary)',
                          borderRadius: '2px'
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: benefit highlights */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="d-flex flex-column gap-3"
              >
                <h4 className="text-heading fw-bold h5 mb-1">Key Benefits</h4>

                {[
                  { icon: '🦠', title: 'Removes Germs, Bacteria & Allergens', desc: 'Neutralizes harmful microorganisms and allergens on all surfaces to secure a healthy cabin environment.' },
                  { icon: '🍃', title: 'Eliminates Unpleasant Odors', desc: 'Uproots stubborn smells from food, pets, and moisture, replacing them with a crisp, neutral freshness.' },
                  { icon: '✨', title: 'Enhances Overall Interior Cleanliness', desc: 'Restores an immaculate look and feel to your cabin, complementing your detailed exterior.' },
                  { icon: '🛡️', title: 'Safe for Premium Materials', desc: 'Uses medical-grade, non-corrosive sanitizers safe for delicate leather, vinyl, and trim fabrics.' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="d-flex align-items-start gap-3 p-3"
                    style={{
                      background: 'var(--secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{benefit.icon}</span>
                    <div>
                      <h5 className="fw-bold text-heading mb-1" style={{ fontSize: '0.9rem' }}>{benefit.title}</h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <a
                  href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20book%20an%20Interior%20Sanitization%20service%20at%20Cleanz24."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glow w-100 py-3 mt-2 fw-bold text-decoration-none text-center"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                >
                  🛡️ Book Interior Sanitization
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="row g-3 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: '🦠', stat: '99.9%', label: 'Germ Elimination' },
              { icon: '🧴', stat: 'Medical Grade', label: 'Disinfectant Base' },
              { icon: '🛡️', stat: 'Surface Safe', label: 'Zero Fade Promise' },
              { icon: '⏱️', stat: '30–45 Min', label: 'Service Duration' }
            ].map((item, i) => (
              <motion.div key={i} className="col-6 col-md-3" variants={fadeUpVariant}>
                <div className="p-4 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="fw-black text-heading" style={{ fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.stat}</div>
                  <div className="text-muted-custom small">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* STEAM CLEANING — SERVICE SPOTLIGHT */}
      <section id="steam-cleaning" className="py-5" style={{ backgroundColor: 'var(--bg-section-alt)', borderTop: '1px solid var(--card-border)' }}>
        <div className="container py-5">

          {/* Section Label */}
          <motion.div
            className="text-center mb-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUpVariant} className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '4px', color: 'var(--brand-primary)' }}>
              SERVICE 06
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="display-5 fw-bold mb-3 text-heading">
              STEAM CLEANING
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-custom mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Experience deep and hygienic cleaning with our premium high-temperature thermal steam sanitization service.
            </motion.p>
          </motion.div>

          {/* Main Split: Highlights left, Description right */}
          <div className="row g-5 align-items-start mb-5">

            {/* Left: benefit highlights */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="d-flex flex-column gap-3"
              >
                <h4 className="text-heading fw-bold h5 mb-1">Key Benefits</h4>

                {[
                  { icon: '🦠', title: 'Removes Germs, Bacteria & Allergens', desc: 'Kills 99.9% of harmful bacteria, dust mites, and pathogens naturally using high-temperature steam.' },
                  { icon: '🌬️', title: 'Improves Cabin Hygiene & Freshness', desc: 'Deep-cleans upholstery pores and vents, vaporizing bad odors and leaving a pure, healthy scent.' },
                  { icon: '🌱', title: 'Eco-Friendly & Chemical-Safe', desc: 'Utilizes thermal energy without harsh chemical agents, making it completely safe for kids and pets.' },
                  { icon: '🛡️', title: 'Zero Surface Damage', desc: 'Gentle on delicate upholstery, leather, headliners, and trim while penetrating deep dirt layers.' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="d-flex align-items-start gap-3 p-3"
                    style={{
                      background: 'var(--secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{benefit.icon}</span>
                    <div>
                      <h5 className="fw-bold text-heading mb-1" style={{ fontSize: '0.9rem' }}>{benefit.title}</h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <a
                  href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20book%20a%20Steam%20Cleaning%20service%20at%20Cleanz24."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glow w-100 py-3 mt-2 fw-bold text-decoration-none text-center"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                >
                  💨 Book Steam Cleaning
                </a>
              </motion.div>
            </div>

            {/* Right: full description */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-4 p-lg-5 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'linear-gradient(135deg, var(--brand-primary), #00c853)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0
                    }}>💨</div>
                    <div>
                      <h3 className="fw-bold text-heading mb-0 h5">Cleanz24 – The Car Spa Studio</h3>
                      <span className="text-muted-custom small">High-Temperature Thermal Sanitization</span>
                    </div>
                  </div>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Experience deep and hygienic cleaning with our premium Steam Cleaning Service at <strong className="text-heading">Cleanz24 – The Car Spa Studio</strong>. Our advanced steam cleaning process uses high-temperature steam technology to remove stubborn dirt, bacteria, germs, stains, and unwanted odors from your vehicle’s interior and hard-to-reach areas without causing damage to surfaces.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    At <strong className="text-heading">Cleanz24</strong>, we focus on delivering a safe, eco-friendly, and highly effective cleaning solution that refreshes your vehicle while maintaining interior hygiene and cleanliness. Steam cleaning helps sanitize seats, carpets, floor mats, dashboard areas, door panels, AC vents, and other interior surfaces by breaking down dirt and killing harmful bacteria naturally.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Our trained professionals use modern steam cleaning equipment and premium techniques to ensure deep cleaning with precision and care. This process not only improves cleanliness but also creates a fresh, healthy, and comfortable cabin environment for every drive.
                  </p>

                  {/* Cleaned Areas */}
                  <div className="mt-4">
                    <h4 className="text-heading fw-bold h6 mb-3 text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.78rem', color: 'var(--brand-primary)' }}>
                      AREAS STEAM DISINFECTED
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {['Seats', 'Carpets', 'Floor Mats', 'Dashboard Area', 'Door Panels', 'AC Vents', 'Cup Holders', 'Headliner'].map((area, i) => (
                        <span key={i} style={{
                          padding: '5px 14px',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-primary)',
                          borderRadius: '2px'
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="row g-3 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: '🌡️', stat: '140°C', label: 'Steam Temperature' },
              { icon: '🌱', stat: 'Eco-Friendly', label: 'Chemical-Free' },
              { icon: '💨', stat: 'Deep Clean', label: 'Pathogens Neutralized' },
              { icon: '⏱️', stat: '45–60 Min', label: 'Service Duration' }
            ].map((item, i) => (
              <motion.div key={i} className="col-6 col-md-3" variants={fadeUpVariant}>
                <div className="p-4 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="fw-black text-heading" style={{ fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.stat}</div>
                  <div className="text-muted-custom small">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* CAR POLISHING — SERVICE SPOTLIGHT */}
      <section id="car-polishing" className="py-5 bg-primary-custom" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="container py-5">

          {/* Section Label */}
          <motion.div
            className="text-center mb-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUpVariant} className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '4px', color: 'var(--brand-primary)' }}>
              SERVICE 07
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="display-5 fw-bold mb-3 text-heading">
              CAR POLISHING
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-custom mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Restore the shine, smoothness, and premium finish of your vehicle with our professional paint correction service.
            </motion.p>
          </motion.div>

          {/* Main Split: Description left, Highlights right */}
          <div className="row g-5 align-items-start mb-5">

            {/* Left: full description */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-4 p-lg-5 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'linear-gradient(135deg, var(--brand-primary), #00c853)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0
                    }}>✨</div>
                    <div>
                      <h3 className="fw-bold text-heading mb-0 h5">Cleanz24 – The Car Spa Studio</h3>
                      <span className="text-muted-custom small">Advanced Paint Correction & Restoration</span>
                    </div>
                  </div>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Restore the shine, smoothness, and premium finish of your vehicle with our professional Car Polishing Service at <strong className="text-heading">Cleanz24 – The Car Spa Studio</strong>. Over time, your car’s paint surface can lose its original gloss due to dust, sunlight, pollution, water spots, minor scratches, and everyday wear.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Our advanced polishing process helps revive the paintwork and brings back a deep, glossy, showroom-like shine. At <strong className="text-heading">Cleanz24</strong>, we use high-quality polishing compounds, professional machines, and expert techniques to carefully enhance your vehicle’s exterior finish.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Our trained detailing professionals work on removing dullness, oxidation, light swirl marks, and minor surface imperfections while improving paint clarity and smoothness. Car polishing not only enhances the appearance of your vehicle but also helps maintain the value and beauty of the paint surface for a longer time. We ensure every vehicle receives detailed attention and a premium finishing touch for an outstanding look.
                  </p>

                  {/* Areas Treated */}
                  <div className="mt-4">
                    <h4 className="text-heading fw-bold h6 mb-3 text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.78rem', color: 'var(--brand-primary)' }}>
                      PAINT TREATMENT AREAS
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {['Paint Panels', 'Clear Coat Layer', 'Hood & Roof', 'Side Fenders', 'Trunk Lid', 'Door Panels', 'Bumpers'].map((area, i) => (
                        <span key={i} style={{
                          padding: '5px 14px',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-primary)',
                          borderRadius: '2px'
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: benefit highlights */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="d-flex flex-column gap-3"
              >
                <h4 className="text-heading fw-bold h5 mb-1">Key Benefits</h4>

                {[
                  { icon: '✨', title: 'Restores Deep Gloss & Shine', desc: 'Revives the paint color depth and brings out an outstanding mirror-like glass reflection.' },
                  { icon: '☀️', title: 'Removes Dullness & Oxidation', desc: 'Clears weathered paint layers and oxidation caused by harsh UV rays and pollutants.' },
                  { icon: '🚗', title: 'Gives Showroom-Like Finish', desc: 'Erase light swirl marks, water spots, and minor surface blemishes for a clean, premium look.' },
                  { icon: '🛡️', title: 'Improves Paint Smoothness', desc: 'Leaves a perfectly flat, clean surface ready for sealants, waxes, or ceramic coatings.' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="d-flex align-items-start gap-3 p-3"
                    style={{
                      background: 'var(--secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{benefit.icon}</span>
                    <div>
                      <h5 className="fw-bold text-heading mb-1" style={{ fontSize: '0.9rem' }}>{benefit.title}</h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <a
                  href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20book%20a%20Car%20Polishing%20service%20at%20Cleanz24."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glow w-100 py-3 mt-2 fw-bold text-decoration-none text-center"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                >
                  ✨ Book Car Polishing
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="row g-3 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: '💿', stat: 'Dual-Action', label: 'Polishing Method' },
              { icon: '🧴', stat: 'SiO2 Micro', label: 'Compound Base' },
              { icon: '✨', stat: 'Mirror Gloss', label: 'Clarity Rating' },
              { icon: '⏱️', stat: '2–3 Hours', label: 'Service Duration' }
            ].map((item, i) => (
              <motion.div key={i} className="col-6 col-md-3" variants={fadeUpVariant}>
                <div className="p-4 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="fw-black text-heading" style={{ fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.stat}</div>
                  <div className="text-muted-custom small">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* CERAMIC COATING — SERVICE SPOTLIGHT */}
      <section id="ceramic-coating" className="py-5" style={{ backgroundColor: 'var(--bg-section-alt)', borderTop: '1px solid var(--card-border)' }}>
        <div className="container py-5">

          {/* Section Label */}
          <motion.div
            className="text-center mb-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUpVariant} className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '4px', color: 'var(--brand-primary)' }}>
              SERVICE 08
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="display-5 fw-bold mb-3 text-heading">
              CERAMIC COATING
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-custom mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Protect your vehicle with long-lasting shine and premium paint protection through our professional Ceramic Coating Service.
            </motion.p>
          </motion.div>

          {/* Main Split: Highlights left, Description right */}
          <div className="row g-5 align-items-start mb-5">

            {/* Left: benefit highlights */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="d-flex flex-column gap-3"
              >
                <h4 className="text-heading fw-bold h5 mb-1">Key Benefits</h4>

                {[
                  { icon: '🛡️', title: 'Provides Long-Term Paint Protection', desc: 'Creates a semi-permanent ceramic glass barrier shielding your clear coat from scratches and contaminants.' },
                  { icon: '☀️', title: 'Protects Against UV Rays & Oxidation', desc: 'Prevents paint color fading and sun damage by absorbing and blocking harmful ultraviolet rays.' },
                  { icon: '💦', title: 'Repels Water, Dust & Dirt', desc: 'Advanced hydrophobic properties make water bead and roll off, making washing effortless.' },
                  { icon: '✨', title: 'Enhances Gloss & Resale Value', desc: 'Drastically increases reflection depth, color richness, and preserves your vehicle\'s market value.' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="d-flex align-items-start gap-3 p-3"
                    style={{
                      background: 'var(--secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{benefit.icon}</span>
                    <div>
                      <h5 className="fw-bold text-heading mb-1" style={{ fontSize: '0.9rem' }}>{benefit.title}</h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <a
                  href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20book%20a%20Ceramic%20Coating%20service%20at%20Cleanz24."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glow w-100 py-3 mt-2 fw-bold text-decoration-none text-center"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                >
                  💎 Book Ceramic Coating
                </a>
              </motion.div>
            </div>

            {/* Right: full description */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-4 p-lg-5 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'linear-gradient(135deg, var(--brand-primary), #00c853)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0
                    }}>💎</div>
                    <div>
                      <h3 className="fw-bold text-heading mb-0 h5">Cleanz24 – The Car Spa Studio</h3>
                      <span className="text-muted-custom small">Ultra-Gloss Nano SiO2 Protective Coating</span>
                    </div>
                  </div>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Protect your vehicle with long-lasting shine and premium paint protection through our professional Ceramic Coating Service at <strong className="text-heading">Cleanz24 – The Car Spa Studio</strong>. Our advanced ceramic coating treatment creates a strong protective layer over your car’s paint surface, helping safeguard it from dust, dirt, UV rays, water spots, minor scratches, oxidation, and environmental contaminants.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    At <strong className="text-heading">Cleanz24</strong>, we use high-quality ceramic coating products and professional application techniques to deliver a deep glossy finish with superior paint protection. The coating bonds with the vehicle’s paint surface, creating a smooth hydrophobic layer that repels water, reduces dirt accumulation, and keeps your car cleaner for a longer time.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Our trained detailing experts ensure precise surface preparation and professional coating application to enhance shine, color depth, and overall appearance. Ceramic coating not only improves the beauty of your vehicle but also helps maintain its premium finish and resale value.
                  </p>

                  {/* Cleaned Areas */}
                  <div className="mt-4">
                    <h4 className="text-heading fw-bold h6 mb-3 text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.78rem', color: 'var(--brand-primary)' }}>
                      TREATMENT AREAS
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {['Body Panels', 'Alloy Wheels', 'Windshield & Glass', 'Exterior Trim', 'Headlights & Taillights', 'Chrome Accents'].map((area, i) => (
                        <span key={i} style={{
                          padding: '5px 14px',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-primary)',
                          borderRadius: '2px'
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="row g-3 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: '💎', stat: '10H Hardness', label: 'Scratch Resistance' },
              { icon: '📅', stat: '3–5 Years', label: 'Warranty Period' },
              { icon: '💦', stat: 'Hydrophobic', label: 'Super Bead Surface' },
              { icon: '⏱️', stat: '24–48 Hours', label: 'Curing Duration' }
            ].map((item, i) => (
              <motion.div key={i} className="col-6 col-md-3" variants={fadeUpVariant}>
                <div className="p-4 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="fw-black text-heading" style={{ fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.stat}</div>
                  <div className="text-muted-custom small">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* PPF COATING — SERVICE SPOTLIGHT */}
      <section id="ppf-coating" className="py-5 bg-primary-custom" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="container py-5">

          {/* Section Label */}
          <motion.div
            className="text-center mb-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.span variants={fadeUpVariant} className="text-uppercase fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '4px', color: 'var(--brand-primary)' }}>
              SERVICE 09
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="display-5 fw-bold mb-3 text-heading">
              PPF COATING
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-muted-custom mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Give your vehicle the ultimate protection with our premium, high-quality Paint Protection Film (PPF) Service.
            </motion.p>
          </motion.div>

          {/* Main Split: Description left, Highlights right */}
          <div className="row g-5 align-items-start mb-5">

            {/* Left: full description */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-4 p-lg-5 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'linear-gradient(135deg, var(--brand-primary), #00c853)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', flexShrink: 0
                    }}>🛡️</div>
                    <div>
                      <h3 className="fw-bold text-heading mb-0 h5">Cleanz24 – The Car Spa Studio</h3>
                      <span className="text-muted-custom small">Invisible Self-Healing Paint Protection Film</span>
                    </div>
                  </div>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    Give your vehicle the ultimate protection with our premium PPF Coating Service at <strong className="text-heading">Cleanz24 – The Car Spa Studio</strong>. Paint Protection Film (PPF) is a high-quality transparent protective layer applied over your car’s paint surface to protect it from scratches, stone chips, road debris, swirl marks, stains, UV rays, and environmental damage while maintaining the original beauty of the vehicle.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    At <strong className="text-heading">Cleanz24</strong>, we use advanced-grade Paint Protection Films and professional installation techniques to ensure a smooth, bubble-free, and long-lasting finish. Our trained experts carefully apply the film on painted surfaces, providing invisible protection without affecting the original color or shine of the vehicle.
                  </p>
                  <p className="text-muted-custom mb-4" style={{ lineHeight: '1.9', fontSize: '1rem' }}>
                    PPF coating acts as a durable shield for your car’s exterior and helps maintain a fresh, glossy, and showroom-like appearance for years. It is one of the best solutions for protecting luxury, premium, and daily-use vehicles from everyday damage and paint wear.
                  </p>

                  {/* Areas Protected */}
                  <div className="mt-4">
                    <h4 className="text-heading fw-bold h6 mb-3 text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.78rem', color: 'var(--brand-primary)' }}>
                      COVERAGE FOCUS AREAS
                    </h4>
                    <div className="d-flex flex-wrap gap-2">
                      {['Front Bumper', 'Hood Panels', 'Side Fenders', 'Wing Mirrors', 'Door Edges', 'Door Cups', 'A-Pillars', 'Full Vehicle Cover'].map((area, i) => (
                        <span key={i} style={{
                          padding: '5px 14px',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-primary)',
                          borderRadius: '2px'
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: benefit highlights */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="d-flex flex-column gap-3"
              >
                <h4 className="text-heading fw-bold h5 mb-1">Key Benefits</h4>

                {[
                  { icon: '🛡️', title: 'Protects Against Scratches & Stone Chips', desc: 'Robust physical defense layer that absorbs impacts from pebbles, gravel, and minor scratches.' },
                  { icon: '✨', title: 'Enhances Gloss & Vehicle Appearance', desc: 'Invisible transparency preserves factory paint shine while giving it a deep, wet-look reflection.' },
                  { icon: '☀️', title: 'Protects from UV Rays & Oxidation', desc: 'Blocks sunlight and chemicals to prevent paint fading, discoloration, yellowing, or chemical spots.' },
                  { icon: '🔄', title: 'Self-Healing Technology', desc: 'Elastomeric polymers allow minor swirl marks and scratches to disappear when exposed to sun heat.' }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="d-flex align-items-start gap-3 p-3"
                    style={{
                      background: 'var(--secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{benefit.icon}</span>
                    <div>
                      <h5 className="fw-bold text-heading mb-1" style={{ fontSize: '0.9rem' }}>{benefit.title}</h5>
                      <p className="text-muted-custom mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <a
                  href="https://wa.me/919138004800?text=Hi%2C%20I'd%20like%20to%20book%20a%20PPF%20Coating%20service%20at%20Cleanz24."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glow w-100 py-3 mt-2 fw-bold text-decoration-none text-center"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                >
                  🛡️ Book PPF Coating
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="row g-3 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { icon: '🛡️', stat: 'TPU Base', label: 'Self-Healing Material' },
              { icon: '📅', stat: '5–7 Years', label: 'Warranty Period' },
              { icon: '📏', stat: '180 Microns', label: 'Film Thickness' },
              { icon: '⏱️', stat: '2–3 Days', label: 'Installation Duration' }
            ].map((item, i) => (
              <motion.div key={i} className="col-6 col-md-3" variants={fadeUpVariant}>
                <div className="p-4 h-100" style={{
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '2px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div className="fw-black text-heading" style={{ fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.stat}</div>
                  <div className="text-muted-custom small">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* SERVICE FAQs ACCORDION */}
      <section className="py-5 bg-primary-custom border-top border-bottom" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <motion.div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
              QUESTIONS
            </span>
            <h2 className="display-5 fw-bold mb-3 text-heading">FREQUENTLY ASKED QUESTIONS</h2>
            <p className="lead text-muted-custom" style={{ fontSize: '1.05rem' }}>
              Clear answers regarding water scaling, prep treatments, and valet transit safety.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="mx-auto" style={{ maxWidth: '800px' }}>
            {faqsData.map((item, index) => {
              const isDropdownOpen = openFaqIndex === index;
              return (
                <div className="faq-dropdown-item py-3 border-bottom animate-faq" key={index} style={{ borderColor: 'var(--card-border)' }}>
                  <div className="faq-dropdown-header d-flex align-items-center" onClick={() => toggleFaq(index)} style={{ cursor: 'pointer' }}>
                    <span className={`faq-arrow-icon ${isDropdownOpen ? 'arrow-rotated' : ''}`} style={{ transition: 'transform 0.3s ease', fontSize: '1.4rem', marginRight: '10px' }}>›</span>
                    <h3 className="fw-bold text-heading h6 mb-0 text-start">{item.q}</h3>
                  </div>
                  <div className={`faq-dropdown-body ${isDropdownOpen ? 'body-open' : ''}`}>
                    <div className="text-muted-custom ps-4 text-sm mt-2 text-start" style={{ lineHeight: '1.6' }}>{item.a}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FINAL BOOK NOW BANNER */}
      <section className="py-5 bg-secondary-custom text-center">
        <div className="container py-4">
          <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
            GET STARTED
          </span>
          <h2 className="display-5 fw-bold text-heading mb-4">READY FOR THE ULTIMATE SHINE?</h2>
          <p className="text-muted-custom mb-5 mx-auto" style={{ maxWidth: '600px', lineHeight: '1.8' }}>
            Schedule your professional active foam wash today. We provide safe valet pickup and delivery.
          </p>
          <Link to="/car-spa/book" className="btn btn-glow btn-lg rounded-pill px-5 py-3 fw-bold text-decoration-none">
            Book Appointment Now
          </Link>
        </div>
      </section>    </div>
  );
}

export default Services;
