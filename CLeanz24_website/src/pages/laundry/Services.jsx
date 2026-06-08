import React, { useEffect } from 'react';
import { Link, useOutletContext, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOMeta from '../../components/SEOMeta';

// Import icons/images
import srvLaundryImg from '../../assets/service_laundry.png';
import srvDryImg from '../../assets/service_dry.png';
import srvHomeImg from '../../assets/service_home.png';
import srvIronImg from '../../assets/service_iron.png';
import srvShoeImg from '../../assets/service_shoe.png';

// Framer motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Services() {
  const { isDarkMode } = useOutletContext() || {};
  const dark = !!isDarkMode;
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const servicesList = [
    {
      id: 'laundry',
      title: 'Premium Laundry',
      subtitle: 'Wash & Fold / Wash & Steam Iron',
      description: 'Hygienic daily washing using soft water and eco-friendly detergents.',
      longDesc: 'Our everyday laundry service is designed to keep your clothes clean and fresh without any effort. We separate your garments by color and fabric type, wash them with premium pH-neutral detergents, and tumble-dry them gently. Your clothes are returned neatly folded or crisp-pressed and ready to wear.',
      icon: srvLaundryImg,
      highlights: [
        'Individual machine cycles per customer (no mixing)',
        'Eco-friendly German liquid detergents',
        'Optional fabric softeners and hygienic sanitizers',
        'Returned in premium breathable protective packaging'
      ],
      pricing: 'Starts at ₹99 / kg',
      bestFor: 'T-shirts, shirts, casual trousers, bedsheets, towels, and daily wear.',
      color: '#3b82f6', // Blue
      bgGradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
      darkBgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #07284b 100%)'
    },
    {
      id: 'dry-cleaning',
      title: 'Eco-Friendly Dry Cleaning',
      subtitle: 'Solvent-based deep cleaning',
      description: 'Gentle, solvent-based deep cleaning for delicate fabrics, designer garments, and formal wear.',
      longDesc: 'We handle your premium designer outfits, suits, silks, and heavy woolens with extreme care. Our dry cleaning process uses eco-friendly, non-toxic hydrocarbon solvents that dissolve oils and stains without shrinking fibers, stripping dyes, or destroying delicate embellishments.',
      icon: srvDryImg,
      highlights: [
        'Fabric diagnostics and care label analysis',
        'State-of-the-art hydrocarbon dry cleaning machines',
        'Preserves delicate trims, sequins, and designer detailing',
        'Zero chemical odor or fabric stiffening'
      ],
      pricing: 'Starts at ₹199 / piece',
      bestFor: 'Suits, blazers, silk sarees, designer gowns, lehengas, and heavy winter coats.',
      color: '#10b981', // Emerald
      bgGradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      darkBgGradient: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)'
    },
    {
      id: 'steam-ironing',
      title: 'Steam Ironing',
      subtitle: 'Professional Steam Pressing',
      description: 'Professional vertical and vacuum steam ironing to give your clothes a crease-free, showroom finish.',
      longDesc: 'Ironing at home can scorch fabrics and leave shiny press-marks. Our high-velocity steam pressing utilizes vacuum suction and moisture-controlled dry steam to relax fabric fibers instantly. This delivers a crisp, wrinkle-free finish that keeps its form longer.',
      icon: srvIronImg,
      highlights: [
        'Vacuum-suction ironing boards to prevent double creases',
        'Temperature-calibrated professional steam irons',
        'Ideal for delicate fabrics that cannot tolerate direct dry heat',
        'Returned on hangers to preserve shape and alignment'
      ],
      pricing: 'Starts at ₹15 / piece',
      bestFor: 'Formal shirts, suits, linen trousers, uniforms, and premium kurtas.',
      color: '#f59e0b', // Amber
      bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      darkBgGradient: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)'
    },
    {
      id: 'shoe-cleaning',
      title: 'Shoe & Handbag Spa',
      subtitle: 'Restoration & Conditioning',
      description: 'Restoration, conditioning, and sanitization services for high-end sneakers, boots, and bags.',
      longDesc: 'Do not throw away dirty or faded shoes. Our shoe spa technicians perform meticulous hand-cleaning, deep stain extraction, and leather/suede conditioning. We remove mud, salt-marks, and deep grime, restoring original colors and structures.',
      icon: srvShoeImg,
      highlights: [
        'Material-specific cleaning brushes and solutions',
        'Deep suede/nubuck revival and texturizing',
        'UV sanitization to destroy bacteria and odors',
        'Waterproofing and nano-shield coating protection'
      ],
      pricing: 'Starts at ₹299 / pair',
      bestFor: 'Premium leather sneakers, suede boots, designer handbags, and travel luggage.',
      color: '#8b5cf6', // Violet
      bgGradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
      darkBgGradient: 'linear-gradient(135deg, #4c1d95 0%, #2e1065 100%)'
    },
    {
      id: 'home-cleaning',
      title: 'Home Furnishings',
      subtitle: 'Deep extraction washing',
      description: 'Deep extraction washing and sanitization for heavy home linens, curtains, sofas, and carpets.',
      longDesc: 'Dust mites, pet dander, and allergens build up inside home furnishings over time. We provide deep injection-extraction cleaning and high-temperature steam sanitization to safely clean and deodorize heavy household fabrics.',
      icon: srvHomeImg,
      highlights: [
        'High-pressure steam sanitization (kills 99.9% bacteria)',
        'Stain-lifter vacuum extraction for carpets and sofas',
        'Deep-cleaning for heavy blankets, duvets, and comforters',
        'Curtain cleaning with optional shrinkage protection'
      ],
      pricing: 'Starts at ₹149 / item',
      bestFor: 'Heavy blankets, curtains, carpets, sofa cushions, quilts, and mattress protectors.',
      color: '#ec4899', // Pink
      bgGradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
      darkBgGradient: 'linear-gradient(135deg, #831843 0%, #500724 100%)'
    }
  ];

  return (
    <div className="services-page-new" style={{ background: dark ? '#0a0f1d' : '#f8fafc', color: dark ? '#e2e8f0' : '#1e293b', overflowX: 'hidden' }}>
      <SEOMeta
        title="Premium Laundry & Dry Cleaning Services | Cleanz24"
        description="Experience world-class laundry, dry cleaning, steam ironing, shoe spa, and carpet cleaning services with Cleanz24. Free pickup & delivery."
        keywords="premium laundry, dry cleaning services, steam ironing, shoe spa, Cleanz24"
      />

      {/* ── STUNNING HERO SECTION ── */}
      <section className="position-relative overflow-hidden pt-5 pb-5" style={{ background: dark ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' : 'linear-gradient(135deg, #e0e7ff 0%, #ffffff 100%)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        {/* Decorative Background Elements */}
        <div className="position-absolute rounded-circle" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(255,255,255,0) 70%)', top: '-10%', right: '-5%' }}></div>
        <div className="position-absolute rounded-circle" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0) 70%)', bottom: '-10%', left: '-5%' }}></div>
        
        {/* Floating Bubbles */}
        <div className="bubble-container position-absolute w-100 h-100 top-0 start-0" style={{ pointerEvents: 'none', zIndex: 1, opacity: 0.6 }}>
           <div className="bubble bubble-1" style={{ width: '40px', height: '40px', left: '10%' }}></div>
           <div className="bubble bubble-2" style={{ width: '20px', height: '20px', left: '80%', animationDelay: '1s' }}></div>
           <div className="bubble bubble-3" style={{ width: '30px', height: '30px', left: '50%', animationDelay: '2s' }}></div>
           <div className="bubble bubble-4" style={{ width: '50px', height: '50px', left: '30%', animationDelay: '1.5s' }}></div>
        </div>

        <div className="container position-relative z-3 text-center mt-5 pt-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <span className="badge px-3 py-2 rounded-pill mb-3" style={{ background: dark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.1)', color: dark ? '#a5b4fc' : '#4338ca', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Expert Garment Care
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="display-3 fw-black mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, color: dark ? '#f8fafc' : '#0f172a', letterSpacing: '-1px' }}>
              We Clean. <span style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>You Shine.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="lead mx-auto mb-5" style={{ maxWidth: '700px', color: dark ? '#cbd5e1' : '#475569', fontSize: '1.2rem', lineHeight: 1.6 }}>
              Experience the pinnacle of fabric care. From everyday wear to delicate designer pieces, our state-of-the-art facilities and eco-friendly solvents ensure your wardrobe stays pristine.
            </motion.p>
            <motion.div variants={fadeInUp} className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="#services-list" className="btn btn-lg px-5 py-3 rounded-pill fw-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)', border: 'none', transition: 'transform 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-3px)'} onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}>
                Explore Services ↓
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── QUICK STATS / TRUST BAR ── */}
      <section className="py-4 position-relative" style={{ background: dark ? '#1e293b' : '#ffffff', borderBottom: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, zIndex: 10, marginTop: '-1px' }}>
        <div className="container">
          <div className="row g-4 justify-content-center text-center">
            {[
              { icon: '🌿', text: 'Eco-Friendly Solvents' },
              { icon: '🔬', text: 'Fabric Diagnostics' },
              { icon: '🚚', text: 'Free Doorstep Pickup' },
              { icon: '⏱️', text: '48Hr Express Delivery' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="col-6 col-md-3 d-flex flex-column align-items-center justify-content-center"
              >
                <div className="mb-2 fs-3">{stat.icon}</div>
                <div className="fw-semibold" style={{ fontSize: '0.9rem', color: dark ? '#94a3b8' : '#475569' }}>{stat.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN SERVICES LIST ── */}
      <section id="services-list" className="py-5 my-4">
        <div className="container">
          <div className="d-flex flex-column gap-5">
            {servicesList.map((service, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={service.id} 
                  id={service.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className="row align-items-stretch g-0 rounded-5 overflow-hidden shadow-sm"
                  style={{ 
                    background: dark ? '#1e293b' : '#ffffff',
                    border: `1px solid ${dark ? '#334155' : '#f1f5f9'}`,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = dark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                  }}
                >
                  {/* Image Side */}
                  <motion.div 
                    variants={isEven ? slideInLeft : slideInRight}
                    className={`col-lg-5 p-5 d-flex flex-column align-items-center justify-content-center position-relative ${isEven ? 'order-lg-1' : 'order-lg-2'}`}
                    style={{ background: dark ? service.darkBgGradient : service.bgGradient }}
                  >
                    {/* Decorative blurred circle */}
                    <div className="position-absolute top-50 start-50 translate-middle rounded-circle" style={{ width: '80%', paddingBottom: '80%', background: 'rgba(255,255,255,0.2)', filter: 'blur(40px)', zIndex: 0 }}></div>
                    
                    <img 
                      src={service.icon} 
                      alt={service.title} 
                      className="img-fluid position-relative z-1 mb-4" 
                      style={{ maxWidth: '180px', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))', transition: 'transform 0.5s ease' }} 
                      onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.08)'}
                      onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}
                    />
                    <div className="position-relative z-1 text-center">
                      <div className="badge px-4 py-2 rounded-pill fw-bold shadow-sm" style={{ background: '#ffffff', color: service.color, fontSize: '1rem' }}>
                        {service.pricing}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div 
                    variants={isEven ? slideInRight : slideInLeft}
                    className={`col-lg-7 p-4 p-md-5 d-flex flex-column justify-content-center ${isEven ? 'order-lg-2' : 'order-lg-1'}`}
                  >
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <span className="fw-bold text-uppercase tracking-wider" style={{ color: service.color, fontSize: '0.8rem', letterSpacing: '1.5px' }}>
                        {service.subtitle}
                      </span>
                    </div>
                    <h2 className="fw-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '2.2rem', color: dark ? '#f8fafc' : '#0f172a' }}>
                      {service.title}
                    </h2>
                    <p className="lead mb-4" style={{ color: dark ? '#cbd5e1' : '#475569', fontSize: '1.1rem', lineHeight: 1.6 }}>
                      {service.description}
                    </p>
                    <p className="mb-4" style={{ color: dark ? '#94a3b8' : '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>
                      {service.longDesc}
                    </p>

                    <div className="row g-4 mb-4">
                      <div className="col-md-7">
                        <h5 className="fw-bold mb-3" style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: dark ? '#f8fafc' : '#1e293b' }}>Key Benefits</h5>
                        <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                          {service.highlights.map((hl, i) => (
                            <li key={i} className="d-flex align-items-start gap-2">
                              <span style={{ color: service.color, marginTop: '2px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              </span>
                              <span style={{ fontSize: '0.9rem', color: dark ? '#cbd5e1' : '#475569' }}>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-5">
                        <div className="h-100 p-4 rounded-4" style={{ background: dark ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: `1px dashed ${dark ? '#334155' : '#cbd5e1'}` }}>
                          <h5 className="fw-bold mb-2" style={{ fontSize: '0.9rem', color: dark ? '#f8fafc' : '#1e293b' }}>👗 Best For:</h5>
                          <p className="mb-0" style={{ fontSize: '0.85rem', color: dark ? '#94a3b8' : '#64748b', lineHeight: 1.6 }}>
                            {service.bestFor}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto d-flex gap-3 flex-wrap pt-2">
                      <Link to="/laundry/contact-us" className="btn px-4 py-2.5 rounded-pill fw-bold shadow-sm" style={{ background: service.color, color: '#fff', border: 'none' }}>
                        Book Service
                      </Link>
                      <a href={`https://wa.me/919138004800?text=${encodeURIComponent(`Hi, I'm interested in booking the ${service.title} service.`)}`} target="_blank" rel="noreferrer" className="btn px-4 py-2.5 rounded-pill fw-bold" style={{ background: 'transparent', border: `2px solid ${service.color}`, color: service.color }}>
                        Ask a Question
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PREMIUM PROMISE BANNER ── */}
      <section className="py-5 position-relative overflow-hidden" style={{ background: dark ? '#0f172a' : '#1e293b', color: '#fff' }}>
        <div className="container py-4 text-center position-relative z-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="mb-4">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>The Cleanz24 Promise</h2>
            <p className="lead mx-auto mb-5 text-white-50" style={{ maxWidth: '800px' }}>
              We treat every garment like a masterpiece. If you are not completely satisfied with our cleaning quality, we will re-process your item absolutely free of charge. Your satisfaction is woven into our fabric.
            </p>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <span className="bg-success rounded-circle p-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                <span className="fw-semibold">100% Quality Guarantee</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="bg-success rounded-circle p-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                <span className="fw-semibold">No Hidden Charges</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="bg-success rounded-circle p-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                <span className="fw-semibold">On-Time Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ELEGANT FAQ SECTION ── */}
      <section className="py-5" style={{ background: dark ? '#0a0f1d' : '#f8fafc' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-5">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-3">FAQ</span>
                <h2 className="fw-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '2.5rem', color: dark ? '#f8fafc' : '#0f172a' }}>Got Questions?</h2>
                <p className="text-muted">Everything you need to know about our services and process.</p>
              </motion.div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion accordion-flush custom-accordion" id="servicesFaq">
                {[
                  { q: 'How do I separate my laundry for pickup?', a: 'You do not have to worry! Our delivery agents will collect your clothes as they are. At our processing facilities, our diagnostic experts inspect and separate all items based on color, fabric type, and recommended care tag requirements before washing.' },
                  { q: 'What kind of detergents do you use?', a: 'We use high-grade, pH-balanced German liquid detergents and organic dry cleaning solvents. Our formulations are non-toxic, gentle on delicate fibers, skin-safe, and completely hypoallergenic.' },
                  { q: 'Is there a minimum order value for free pickup?', a: 'Yes, free doorstep pickup and delivery is available for all laundry and dry cleaning orders above ₹300. For orders below this amount, a small nominal convenience fee of ₹50 is applied.' },
                  { q: 'What is your turnaround time?', a: 'Our standard turnaround time is 48 hours. However, if you require urgent service, we offer same-day express delivery for pick-ups completed in the morning slots.' }
                ].map((faq, fIdx) => (
                  <motion.div 
                    key={fIdx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: fIdx * 0.1 }}
                    className="accordion-item mb-3 rounded-4 overflow-hidden border-0 shadow-sm" 
                    style={{ background: dark ? '#1e293b' : '#ffffff' }}
                  >
                    <h2 className="accordion-header" id={`flush-heading-${fIdx}`}>
                      <button 
                        className={`accordion-button collapsed fw-bold px-4 py-4 ${dark ? 'text-white bg-transparent' : 'text-dark bg-transparent'}`}
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target={`#flush-collapse-${fIdx}`} 
                        aria-expanded="false" 
                        aria-controls={`flush-collapse-${fIdx}`}
                        style={{ boxShadow: 'none', fontSize: '1.05rem' }}
                      >
                        {faq.q}
                      </button>
                    </h2>
                    <div 
                      id={`flush-collapse-${fIdx}`} 
                      className="accordion-collapse collapse" 
                      aria-labelledby={`flush-heading-${fIdx}`} 
                      data-bs-parent="#servicesFaq"
                    >
                      <div className="accordion-body px-4 pb-4 pt-0 text-muted" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
                        {faq.a}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-5 position-relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)', backgroundSize: '200% 200%', animation: 'gradientMove 10s ease infinite', zIndex: 0 }}></div>
        <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'rgba(0,0,0,0.3)', zIndex: 1 }}></div>
        
        <div className="container py-5 position-relative z-2 text-center text-white">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Ready for Spotless Perfection?</h2>
            <p className="lead mb-5 mx-auto opacity-75" style={{ maxWidth: '600px' }}>
              Join thousands of satisfied customers who trust Cleanz24 with their wardrobe. Schedule your first pickup today and enjoy up to 20% off.
            </p>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <Link to="/laundry/contact-us" className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold text-primary shadow-lg" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}>
                Schedule Free Pickup
              </Link>
              <a href="tel:+919138004800" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg" style={{ transition: 'background 0.3s' }} onMouseEnter={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.1)'}} onMouseLeave={(e)=>{e.currentTarget.style.background='transparent'}}>
                📞 Call +91 91380 04800
              </a>
            </div>
          </motion.div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .accordion-button:not(.collapsed) {
            color: #3b82f6 !important;
            box-shadow: none !important;
          }
          .accordion-button::after {
            filter: ${dark ? 'invert(1)' : 'none'};
          }
          .accordion-button:not(.collapsed)::after {
            filter: none;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%233b82f6'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
          }
        `}} />
      </section>
    </div>
  );
}
