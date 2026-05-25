import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  servicesData, 
  pricingPackagesData,
  processStepsData,
  faqsData
} from '../data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import carWashFoam from '../assets/car_wash_foam.png';
import carWashInterior from '../assets/car_wash_interior.png';
import carWashSpray from '../assets/car_wash_spray.png';
import carWashWheel from '../assets/car_wash_wheel.png';
import carWashRinse from '../assets/car_wash_rinse.png';
import carWashFoamStep2 from '../assets/car_wash_foam_step2.jpg';
import carWashBucket from '../assets/car_wash_bucket.png';
import carWashDry from '../assets/after_detailing.png';
import { Link } from 'react-router-dom';
import '../App.css';

// 1. SERVICES PAGE COMPONENT
function Services({ isDarkMode, toggleTheme }) {
  const [selectedVehicleType, setSelectedVehicleType] = useState('sedan');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary-custom bg-carbon" style={{ overflowX: 'hidden' }}>
      
      {/* NAVBAR */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* HERO SECTION */}
      <section className="hero-section position-relative text-center overflow-hidden" style={{ backgroundImage: 'none', backgroundColor: '#000', minHeight: '600px' }}>
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
          <source src="/service_video.mp4" type="video/mp4" />
        </video>

        {/* Global Dark Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
          <motion.p variants={fadeUpVariant} className="lead text-white mb-5 mx-auto" style={{ maxWidth: '650px', fontSize: '1.15rem' }}>
            Experience eco-friendly active foam washing, deep interior vacuuming, and premium ceramic wax protective coats.
          </motion.p>
        </motion.div>
      </section>

      {/* SIGNATURE SERVICES */}
      <section id="services" className="py-5" style={{ backgroundColor: isDarkMode ? '#111' : 'var(--bg-section-alt)' }}>
        <div className="container text-center py-5">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
            SIGNATURE SERVICES
          </motion.span>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="display-5 fw-bold mb-3 text-heading">OUR WORKSHOPS CAPABILITIES</motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            className="text-muted-custom mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Providing premium eco foam wash, deep vacuuming, and ceramic spray protective layers.
          </motion.p>

          <motion.div className="row g-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {servicesData.map((srv, idx) => {
              const srvImages = [carWashFoam, carWashInterior, carWashSpray];
              return (
                <motion.div className="col-md-4" key={idx} variants={fadeUpVariant}>
                  <div className="card h-100 premium-card overflow-hidden">
                    <div className="position-relative" style={{ height: '220px', overflow: 'hidden' }}>
                      <img 
                        src={srvImages[idx]} 
                        alt={srv.title} 
                        className="w-100 h-100 object-fit-cover srv-img" 
                        style={{ transition: 'transform 0.4s ease' }}
                      />
                      <div className="position-absolute top-0 start-0 m-3 card-icon-wrapper" style={{ width: '45px', height: '45px', margin: 0 }}>
                        {srv.icon}
                      </div>
                    </div>
                    <div className="card-body p-4 text-start">
                      <h3 className="card-title fw-bold h5 mb-3 text-heading">{srv.title}</h3>
                      <p className="card-text text-muted-custom mb-0" style={{ fontSize: '0.92rem', lineHeight: '1.7' }}>
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* THE 6-STEP SCRATCH-FREE WASH CYCLE */}
      <section id="process" className="py-5 bg-primary-custom border-top" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5">
          <motion.div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
              THE PROCESS
            </span>
            <h2 className="display-5 fw-bold mb-3 text-heading">THE 6-STEP SCRATCH-FREE WASH CYCLE</h2>
            <p className="lead text-muted-custom" style={{ fontSize: '1.05rem' }}>
              Every vehicle transitions through our meticulous sequence engineered for a thorough, scratch-free clean and high-gloss seal.
            </p>
          </motion.div>

          <motion.div className="row g-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {processStepsData.map((step, idx) => (
              <motion.div className="col-md-4" key={idx} variants={fadeUpVariant}>
                <div className="p-4 h-100 process-card position-relative overflow-hidden" style={{ border: '1px solid var(--card-border)', background: 'var(--secondary-bg)' }}>
                  <div className="watermark-number">{step.num}</div>
                  <h4 className="fw-bold h5 position-relative z-1 mb-3 text-heading">{step.title}</h4>
                  <p className="text-muted-custom mb-0 position-relative z-1" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* HIGH-PRESSURE PRE-RINSE SPOTLIGHT */}
          <div className="row g-5 align-items-center mt-5 pt-4 border-top" style={{ borderColor: 'var(--card-border)' }}>
            <div className="col-lg-7 order-lg-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="shadow-lg border border-secondary border-opacity-20 rounded-0"
                style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}
              >
                <video 
                  src="/video_1.mp4" 
                  className="w-100 h-100 d-block"
                  style={{ objectFit: 'cover' }}
                  autoPlay loop muted playsInline
                />
              </motion.div>
            </div>
            <div className="col-lg-5 order-lg-1 text-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                  STEP 01 CLOSE-UP
                </span>
                <h3 className="display-6 fw-bold text-heading mb-3">HIGH-PRESSURE PRE-RINSE</h3>
                <p className="text-muted-custom mb-4" style={{ lineHeight: '1.8' }}>
                  Before any hand contact is made, our technicians use 150-bar commercial pressure spray jets to strip away heavy mud, loose sand, salt, and abrasive surface debris. This crucial pre-rinse step ensures that abrasive grit does not get dragged across the clear coat during the sponge wash phase, preventing swirls and scratches from ever forming.
                </p>
                <div className="d-flex gap-3">
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">150-Bar Jets</h4>
                    <p className="small text-muted-custom mb-0">High-efficiency water pressure that blasts away stubborn grime safely.</p>
                  </div>
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">Scratch Prevention</h4>
                    <p className="small text-muted-custom mb-0">Eliminates surface grit before hand contact wash begins.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ACTIVE SNOW FOAM BATH SPOTLIGHT */}
          <div className="row g-5 align-items-center mt-5 pt-4 border-top" style={{ borderColor: 'var(--card-border)' }}>
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="shadow-lg border border-secondary border-opacity-20 rounded-0"
                style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}
              >
                <video 
                  src="/video_2.mp4" 
                  className="w-100 h-100 d-block"
                  style={{ objectFit: 'cover' }}
                  autoPlay loop muted playsInline
                />
              </motion.div>
            </div>
            <div className="col-lg-5 text-start">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                  STEP 02 CLOSE-UP
                </span>
                <h3 className="display-6 fw-bold text-heading mb-3">ACTIVE SNOW FOAM BATH</h3>
                <p className="text-muted-custom mb-4" style={{ lineHeight: '1.8' }}>
                  Using advanced air-injection foam lances, our technicians blanket the vehicle in a thick layer of pH-neutral snow foam. This dense clinging foam stays on the paintwork to encapsulate, loosen, and safely dissolve traffic film, stubborn road grime, and fine dust particles before any hand contact is made.
                </p>
                <div className="d-flex gap-3">
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">Clinging Chemistry</h4>
                    <p className="small text-muted-custom mb-0">High-dwell active foam encapsulates grit safely.</p>
                  </div>
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">pH-Neutral Formula</h4>
                    <p className="small text-muted-custom mb-0">Will not strip existing waxes or ceramic coatings.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* TWO-BUCKET MITT WASH SPOTLIGHT */}
          <div className="row g-5 align-items-center mt-5 pt-4 border-top" style={{ borderColor: 'var(--card-border)' }}>
            <div className="col-lg-7 order-lg-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="shadow-lg border border-secondary border-opacity-20 rounded-0"
                style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}
              >
                <video 
                  src="/video_3.mp4" 
                  className="w-100 h-100 d-block"
                  style={{ objectFit: 'cover' }}
                  autoPlay loop muted playsInline
                />
              </motion.div>
            </div>
            <div className="col-lg-5 order-lg-1 text-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                  STEP 03 CLOSE-UP
                </span>
                <h3 className="display-6 fw-bold text-heading mb-3">TWO-BUCKET MITT WASH</h3>
                <p className="text-muted-custom mb-4" style={{ lineHeight: '1.8' }}>
                  To guarantee a completely scratch-free experience, our crew uses the professional two-bucket method. One bucket contains premium pH-neutral shampoo, while the other holds clean rinse water. Both buckets are equipped with grit guards to trap dirt particles at the bottom, ensuring our lambskin wash mitts never drag abrasive grit across your car's paintwork.
                </p>
                <div className="d-flex gap-3">
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">Grit Guards</h4>
                    <p className="small text-muted-custom mb-0">Traps dirt at the bottom of the buckets to prevent wash swirls.</p>
                  </div>
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">Lambskin Mitts</h4>
                    <p className="small text-muted-custom mb-0">Ultra-soft high-pile fibers that lift and encapsulate grit safely.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* WHEEL DETAILING SPOTLIGHT */}
          <div className="row g-5 align-items-center mt-5 pt-4 border-top" style={{ borderColor: 'var(--card-border)' }}>
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="shadow-lg border border-secondary border-opacity-20 rounded-0"
                style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}
              >
                <video 
                  src="/video_4.mp4" 
                  className="w-100 h-100 d-block"
                  style={{ objectFit: 'cover' }}
                  autoPlay loop muted playsInline
                />
              </motion.div>
            </div>
            <div className="col-lg-5 text-start">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                  STEP 04 CLOSE-UP
                </span>
                <h3 className="display-6 fw-bold text-heading mb-3">ALLOY WHEEL & RIM DEEP CLEANING</h3>
                <p className="text-muted-custom mb-4" style={{ lineHeight: '1.8' }}>
                  Road grime and metallic brake dust bond to alloy wheels at high temperatures. Our specialized process utilizes acid-free active cleaning foam that turns purple as it binds and dissolves metallic iron contaminants. Using soft microfiber detailing brushes, our technicians carefully agitate and deep clean all spokes, barrels, and brake calipers before a final high-pressure water spray rinse.
                </p>
                <div className="d-flex gap-3">
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">Iron Decontaminant</h4>
                    <p className="small text-muted-custom mb-0">Neutralizes corrosive brake dust safe for clear coats.</p>
                  </div>
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">Barrel Agitation</h4>
                    <p className="small text-muted-custom mb-0">Reaches deep into the wheel barrels for thorough soil removal.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* INTERIOR DEEP VACUUM SPOTLIGHT */}
          <div className="row g-5 align-items-center mt-5 pt-4 border-top" style={{ borderColor: 'var(--card-border)' }}>
            <div className="col-lg-7 order-lg-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="shadow-lg border border-secondary border-opacity-20 rounded-0"
                style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}
              >
                <video 
                  src="/video_5.mp4" 
                  className="w-100 h-100 d-block"
                  style={{ objectFit: 'cover' }}
                  autoPlay loop muted playsInline
                />
              </motion.div>
            </div>
            <div className="col-lg-5 order-lg-1 text-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                  STEP 05 CLOSE-UP
                </span>
                <h3 className="display-6 fw-bold text-heading mb-3">INTERIOR DEEP VACUUM</h3>
                <p className="text-muted-custom mb-4" style={{ lineHeight: '1.8' }}>
                  Our cabin detailing starts with high-power suction vacuuming targeting all floor mats, footwells, seats, boot spaces, and hard-to-reach seat creases. Technicians clean dust, dirt, crumbs, and debris from your cabin before disinfecting all consoles, door panels, and polishing inner glass surfaces to a streak-free clarity.
                </p>
                <div className="d-flex gap-3">
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">High-Suction Lift</h4>
                    <p className="small text-muted-custom mb-0">Removes embedded sand and allergens from carpets and seat fabric.</p>
                  </div>
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">Glass & Console Polish</h4>
                    <p className="small text-muted-custom mb-0">Streak-free glass cleaning and high-grade plastic dressing protection.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* MICROFIBER DRY & SEAL SPOTLIGHT */}
          <div className="row g-5 align-items-center mt-5 pt-4 border-top" style={{ borderColor: 'var(--card-border)' }}>
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="shadow-lg border border-secondary border-opacity-20 rounded-0"
                style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}
              >
                <video 
                  src="/video_3.mp4" 
                  className="w-100 h-100 d-block"
                  style={{ objectFit: 'cover' }}
                  autoPlay loop muted playsInline
                />
              </motion.div>
            </div>
            <div className="col-lg-5 text-start">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-uppercase text-brand-primary fw-bold small mb-2 d-block tracking-widest" style={{ letterSpacing: '3px' }}>
                  STEP 06 CLOSE-UP
                </span>
                <h3 className="display-6 fw-bold text-heading mb-3">MICROFIBER DRY & SEAL</h3>
                <p className="text-muted-custom mb-4" style={{ lineHeight: '1.8' }}>
                  To conclude the process, we blow dry all panel gaps, door hinges, and mirrors with filtered high-speed air. The remaining water droplets are dried using plush, high-GSM microfiber towels. Finally, a premium SiO2-infused ceramic spray sealant is applied and buffed to lock in a hydrophobic barrier that repels water and delivers a glassy, mirror-like reflection.
                </p>
                <div className="d-flex gap-3">
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">Hydrophobic Barrier</h4>
                    <p className="small text-muted-custom mb-0">SiO2 spray sealant locks out dust and repels rain for weeks.</p>
                  </div>
                  <div className="p-3 bg-secondary-custom border" style={{ borderColor: 'var(--card-border)', flex: 1 }}>
                    <h4 className="h6 fw-bold text-heading mb-1">Streak-Free Finish</h4>
                    <p className="small text-muted-custom mb-0">High-GSM towel drying avoids towel scratches or water stains.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PRICING SECTION */}
      <section id="pricing" className="py-5 bg-secondary-custom border-top border-bottom" style={{ borderColor: 'var(--card-border)' }}>
        <div className="container py-5 text-center">
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
            className="text-muted-custom mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Our pricing is optimized according to car class sizes. Choose your category to view packages.
          </motion.p>

          {/* Pricing Tabs */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <div className="pricing-tabs">
              {Object.keys(pricingPackagesData).map((type) => (
                <button
                  key={type}
                  className={`pricing-tab-btn ${selectedVehicleType === type ? 'active' : ''}`}
                  onClick={() => setSelectedVehicleType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Pricing Cards Grid */}
          <motion.div 
            className="row g-4" 
            layout
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {pricingPackagesData[selectedVehicleType].map((pkg, idx) => (
              <motion.div className="col-lg-3 col-md-6" key={idx} variants={fadeUpVariant} layout>
                <div className={`card package-card p-4 h-100 d-flex flex-column ${pkg.name.includes('Ceramic Shield') ? 'highlighted' : ''}`}>
                  <h3 className="fw-bold h5 text-heading mb-1 text-start">{pkg.name}</h3>
                  <span className="text-uppercase tracking-widest text-muted-custom text-start small mb-3" style={{ fontSize: '0.72rem', letterSpacing: '1.5px', display: 'block' }}>
                    {pkg.layers} / {pkg.warranty}
                  </span>
                  <hr className="my-2 border-secondary" style={{ opacity: 0.1 }} />
                  <div className="package-price text-start mb-3">{pkg.price}</div>
                  <ul className="package-service-list text-start mb-4">
                    {pkg.services.map((srv, sIdx) => (
                      <li key={sIdx}>{srv}</li>
                    ))}
                  </ul>
                  <Link to="/book" className="btn btn-glow w-100 py-3 mt-auto text-decoration-none text-center">
                    Book Package
                  </Link>
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
              Clear answers regarding water scaling, ceramic prep treatments, and valet transit safety.
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
          <Link to="/book" className="btn btn-glow btn-lg rounded-0 px-5 py-3 fw-bold">
            Book Appointment Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING ACTION BUTTONS */}
      <div className="floating-actions">
        <a href="https://wa.me/919138004800" target="_blank" rel="noreferrer" className="fab fab-whatsapp" aria-label="WhatsApp">
          <svg viewBox="0 0 32 32" width="36" height="36" fill="currentColor">
            <path d="M16 2.5C8.5 2.5 2.5 8.5 2.5 16c0 2.4.6 4.7 1.8 6.7L2.5 29.5l7-1.8c2 .1 4.1 1.8 6.5 1.8 7.5 0 13.5-6 13.5-13.5S23.5 2.5 16 2.5zm0 22.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4C5.5 18.2 5 16.1 5 14c0-6.1 5-11 11-11s11 4.9 11 11-4.9 11-11 11zm6-7.8c-.3-.2-2-.1-2.3-.8-.3-.7-.3-1.3-.4-1.4-.2-.2-.5-.2-.8 0-.3.3-1.3 1.3-1.5 1.5-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-1-1-1.3-1.3-1.5-1.5-.2-.2 0-.3.1-.4.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.4-1-.5-1.4-.1-.4-.2-.3-.3-.3h-.3c-.1 0-.3 0-.5.2-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4 1.7.8 2.3.9 3.1.8.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.6-.4z" />
          </svg>
        </a>
        <a href="tel:+919138004800" className="fab fab-phone" aria-label="Call Us">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Services;
