import React from 'react';
import { notFound } from 'next/navigation';
import { FRANCHISE_CITIES } from '../../../../../data/franchiseCities';
import { storesData } from '../../../../../data';
import CityServiceForm from './CityServiceForm';
import Link from 'next/link';

// Services Metadata Mapping
const SERVICES_MAP = {
  'wash-and-fold': {
    name: 'Wash & Fold Laundry Service',
    icon: '👕',
    keywords: ['laundry service', 'wash and fold laundry', 'premium laundry', 'doorstep laundry', 'best wash & fold'],
    tagline: 'Best-in-class clothes washing with premium detergents & fabric softeners.'
  },
  'dry-cleaning': {
    name: 'Premium Dry Cleaning Service',
    icon: '🥼',
    keywords: ['dry cleaners', 'premium dry cleaning', 'best dry cleaners', 'suit dry clean', 'saree dry cleaning'],
    tagline: 'Expert dry cleaning for delicate fabrics, designer suits, bridal sarees, and woolens.'
  },
  'steam-ironing': {
    name: 'Professional Steam Ironing Service',
    icon: '♨',
    keywords: ['steam press', 'steam ironing near me', 'garment pressing', 'doorstep steam iron', 'wrinkle-free iron'],
    tagline: 'Wrinkle-free, temperature-controlled steam pressing for crisp, pristine garments.'
  },
  'shoe-cleaning': {
    name: 'Sneaker & Shoe Cleaning Spa',
    icon: '👟',
    keywords: ['shoe cleaning', 'shoe spa near me', 'sneaker care', 'leather shoe polish', 'suede restoration'],
    tagline: 'Premium sneaker deep cleaning, leather boot polishing, and suede shoe restoration.'
  },
  'bag-cleaning': {
    name: 'Luxury Handbag & Bag Spa',
    icon: '👜',
    keywords: ['bag cleaning spa', 'luxury handbag restoration', 'purse cleaning', 'leather conditioning', 'bag repair'],
    tagline: 'Professional designer handbag cleaning, stain removal, and leather conditioning.'
  },
  'sofa-and-carpet': {
    name: 'Sofa & Carpet Deep Cleaning Spa',
    icon: '🛋',
    keywords: ['sofa cleaning service', 'carpet cleaning near me', 'deep home cleaning', 'mattress dry cleaning', 'upholstery shampoo'],
    tagline: 'Deep extraction vacuuming, organic upholstery shampooing, and mattress sanitization.'
  }
};

const generateStoreSlug = (name) => {
  const cleanLoc = (name || '')
    .replace(/^Cleanz24\s*-\s*/i, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  return `best-laundry-drycleaning-services-${cleanLoc}`;
};

export async function generateStaticParams() {
  const citiesList = Array.isArray(FRANCHISE_CITIES) ? FRANCHISE_CITIES : [];
  const servicesList = ['wash-and-fold', 'dry-cleaning', 'steam-ironing', 'shoe-cleaning', 'bag-cleaning', 'sofa-and-carpet'];
  const paramsList = [];
  for (const city of citiesList) {
    if (city && city.slug) {
      for (const s of servicesList) {
        paramsList.push({
          citySlug: city.slug,
          serviceSlug: s,
        });
      }
    }
  }
  return paramsList;
}

export async function generateMetadata({ params }) {
  const { citySlug, serviceSlug } = await params;
  const cityData = FRANCHISE_CITIES.find(c => c.slug === citySlug);
  const serviceData = SERVICES_MAP[serviceSlug];

  if (!cityData || !serviceData) {
    return {};
  }

  const cityName = cityData.city;
  const stateName = cityData.state;
  const serviceName = serviceData.name;

  const pageTitle = `${serviceName} in ${cityName} | Best Cleaners in ${stateName} - Cleanz24`;
  const pageDesc = `Looking for ${serviceName.toLowerCase()} in ${cityName}, ${stateName}? Cleanz24 offers premium fabric care, eco-friendly solvents, and doorstep service. Enquire now!`;
  
  return {
    title: pageTitle,
    description: pageDesc,
    keywords: serviceData.keywords.map(k => `${k} in ${cityName}`).join(', '),
    alternates: {
      canonical: `https://www.cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}/${serviceSlug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://www.cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}/${serviceSlug}`,
      siteName: 'Cleanz24',
      type: 'website',
      images: [
        {
          url: 'https://www.cleanz24.com/assets/logo3.jpeg',
          width: 800,
          height: 600,
          alt: 'Cleanz24 Premium Laundry Services'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: ['https://www.cleanz24.com/assets/logo3.jpeg']
    }
  };
}

export default async function CityServicePage({ params }) {
  const { citySlug, serviceSlug } = await params;
  const cityData = FRANCHISE_CITIES.find(c => c.slug === citySlug);
  const serviceData = SERVICES_MAP[serviceSlug];

  if (!cityData || !serviceData) {
    return notFound();
  }

  const cityName = cityData.city;
  const stateName = cityData.state;
  const serviceName = serviceData.name;

  // Real store matching
  const matchingStoresInCity = (storesData || []).filter(s => 
    s && s.city && (
      s.city.toLowerCase() === cityName.toLowerCase() || 
      cityName.toLowerCase().includes(s.city.toLowerCase()) || 
      s.city.toLowerCase().includes(cityName.toLowerCase())
    )
  );

  const matchingStoresInState = matchingStoresInCity.length > 0 
    ? matchingStoresInCity 
    : (storesData || []).filter(s => s && s.state && s.state.toLowerCase() === stateName.toLowerCase()).slice(0, 3);

  // Schema Injection
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.cleanz24.com/best-laundry-drycleaning' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Franchise', 'item': 'https://www.cleanz24.com/best-laundry-drycleaning/franchise-opportunities-in-india' },
          { '@type': 'ListItem', 'position': 3, 'name': cityName, 'item': `https://www.cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}` },
          { '@type': 'ListItem', 'position': 4, 'name': serviceData.name, 'item': `https://www.cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}/${serviceSlug}` }
        ]
      },
      {
        '@type': 'Service',
        'name': `${serviceName} in ${cityName}`,
        'description': `Premium ${serviceName.toLowerCase()} and fabric care services offered by Cleanz24 in ${cityName}, ${stateName}.`,
        'provider': {
          '@type': 'LocalBusiness',
          'name': `Cleanz24 ${cityName}`,
          'telephone': '+919138004800',
          'priceRange': '₹₹',
          'image': 'https://www.cleanz24.com/assets/logo3.jpeg',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': cityName,
            'addressRegion': stateName,
            'addressCountry': 'IN'
          }
        }
      }
    ]
  };

  return (
    <div className="city-service-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        .city-service-wrapper {
          background-color: #f8fafc;
          color: #334155;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          transition: background-color 0.25s ease, color 0.25s ease;
        }
        .laundry-dark .city-service-wrapper {
          background-color: #0f1623;
          color: #cbd5e1;
        }
        .city-service-hero {
          background: linear-gradient(135deg, #f0faf2 0%, #e8f5e9 100%);
          padding: 120px 0 60px;
          border-bottom: 1px solid #e2e8f0;
          transition: all 0.25s ease;
        }
        .laundry-dark .city-service-hero {
          background: linear-gradient(135deg, #0f1623 0%, #1a3a1a 100%);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .city-service-hero h1 {
          color: #0f172a;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-hero h1 {
          color: #ffffff;
        }
        .city-service-hero p {
          color: #475569;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-hero p {
          color: #94a3b8;
        }
        .city-service-title {
          color: #0f172a;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-title {
          color: #ffffff;
        }
        .city-service-card {
          background: #ffffff;
          padding: 18px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.25s ease;
        }
        .laundry-dark .city-service-card {
          background: #1e293b;
          border-color: #334155;
        }
        .city-service-card strong {
          color: #0f172a;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-card strong {
          color: #ffffff;
        }
        .city-service-card p {
          color: #475569;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-card p {
          color: #94a3b8;
        }
        .city-service-faq-item {
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 15px;
          margin-bottom: 15px;
          transition: all 0.25s ease;
        }
        .laundry-dark .city-service-faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .city-service-faq-item h4 {
          color: #0f172a;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-faq-item h4 {
          color: #ffffff;
        }
        .city-service-faq-item p {
          color: #475569;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-faq-item p {
          color: #94a3b8;
        }
        .city-service-sidebar {
          position: sticky;
          top: 120px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.25s ease;
        }
        .laundry-dark .city-service-sidebar {
          background: #1e293b;
          border-color: #334155;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .city-service-sidebar h3 {
          color: #0f172a;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-sidebar h3 {
          color: #ffffff;
        }
        .city-service-sidebar p {
          color: #475569;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-sidebar p {
          color: #94a3b8;
        }
        .city-service-footer {
          padding: 40px 0;
          border-top: 1px solid #e2e8f0;
          background-color: #f1f5f9;
          text-align: center;
          transition: all 0.25s ease;
        }
        .laundry-dark .city-service-footer {
          border-top: 1px solid rgba(255,255,255,0.05);
          background-color: #0a101a;
        }
        .city-service-footer p {
          color: #475569;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-footer p {
          color: #94a3b8;
        }
      `}</style>

      {/* Hero Section */}
      <section className="city-service-hero">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <nav style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
            <Link href="/best-laundry-drycleaning" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/best-laundry-drycleaning/franchise-opportunities-in-india" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: '500' }}>Franchise</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href={`/best-laundry-drycleaning/franchise-opportunities/${citySlug}`} style={{ color: '#16a34a', textDecoration: 'none', fontWeight: '500' }}>{cityName}</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#64748b' }}>{serviceData.name}</span>
          </nav>

          <span style={{ 
            display: 'inline-flex', 
            background: 'rgba(34,197,94,0.15)', 
            border: '1px solid rgba(34,197,94,0.3)', 
            color: '#16a34a', 
            fontSize: '0.8rem', 
            fontWeight: '600', 
            padding: '6px 16px', 
            borderRadius: '99px', 
            marginBottom: '20px',
            textTransform: 'uppercase'
          }}>
            {serviceData.icon} ISO 9001:2015 Certified Care
          </span>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', 
            fontWeight: '900', 
            lineHeight: '1.2', 
            marginBottom: '16px' 
          }}>
            Best <span style={{ color: '#16a34a' }}>{serviceName}</span> in {cityName}
          </h1>
          <p className="city-service-hero-p" style={{ fontSize: '1.1rem', maxWidth: '750px', lineHeight: '1.7', marginBottom: '30px' }}>
            {matchingStoresInCity.length > 0 
              ? `Experience professional, eco-friendly ${serviceName.toLowerCase()} at Cleanz24. Visit our active store studio or enjoy doorstep pick-up & delivery across ${cityName}, ${stateName}.`
              : `Cleanz24 is expanding its premium ${serviceName.toLowerCase()} & franchise network in ${cityName}, ${stateName}. Enquire today for doorstep booking or franchise ownership.`
            }
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#book-now" style={{ 
              background: 'linear-gradient(135deg, #16a34a, #15803d)', 
              color: '#fff', 
              padding: '14px 32px', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              fontWeight: '700', 
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(22,163,74,0.35)'
            }}>
              📋 Book Service / Franchise Inquiry
            </a>
            <a href={`https://wa.me/919138004800?text=Hi%20I%20want%20to%20know%20about%20${encodeURIComponent(serviceName)}%20in%20${encodeURIComponent(cityName)}`} target="_blank" rel="noreferrer" style={{ 
              background: 'transparent', 
              color: '#16a34a', 
              border: '2px solid #16a34a', 
              padding: '12px 30px', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              fontWeight: '700', 
              textDecoration: 'none'
            }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'flex-start' }}>
            
            {/* Main Content Area */}
            <div style={{ lineHeight: '1.8' }}>
              <h2 className="city-service-title" style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '20px' }}>
                Professional {serviceName} in {cityName}, {stateName}
              </h2>
              <p style={{ marginBottom: '20px' }}>
                Maintaining the pristine condition of your wardrobe, designer wear, and home fabrics requires specialized care. Standard laundry washing with hard water and harsh detergents often leads to color fading, fabric weakening, and fiber shrinkage. Cleanz24 provides an ISO-certified, soft-water solution for <strong>{serviceName.toLowerCase()} in {cityName}</strong>.
              </p>
              <p style={{ marginBottom: '20px' }}>
                We utilize international standard, custom-formulated detergents and modern cleaning equipment that gently remove dirt and stains while preserving fabric integrity. Every garment undergoes a multi-stage inspection to ensure high-quality cleaning, press, and hygienic packaging.
              </p>

              {/* Verified Local Stores / Expansion Section */}
              {matchingStoresInCity.length > 0 ? (
                <>
                  <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                    Official Cleanz24 Studios in {cityName}
                  </h3>
                  <p style={{ marginBottom: '20px' }}>
                    Cleanz24 has active studio operations in {cityName}. You can visit our store directly or schedule doorstep pickup:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '30px' }}>
                    {matchingStoresInCity.map(st => (
                      <Link href={`/best-laundry-drycleaning/store/${generateStoreSlug(st.name)}`} key={st.id || st.name} style={{ textDecoration: 'none' }}>
                        <div className="city-service-card" style={{ height: '100%' }}>
                          <strong style={{ color: '#16a34a', display: 'block', fontSize: '0.98rem' }}>📍 {st.name}</strong>
                          <p style={{ fontSize: '0.82rem', marginTop: '6px', color: '#64748b' }}>{st.address}</p>
                          <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600', marginTop: '8px', display: 'inline-block' }}>View Store Details →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                    Franchise & Service Network in {cityName}, {stateName}
                  </h3>
                  <p style={{ marginBottom: '20px' }}>
                    Cleanz24 is actively expanding its premium service footprint across {stateName}. We are currently accepting franchise applications to set up the first Cleanz24 studio hub in {cityName}.
                  </p>
                  {matchingStoresInState.length > 0 && (
                    <>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '12px', fontWeight: '600' }}>
                        Nearby Operating Cleanz24 Studios in {stateName}:
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '30px' }}>
                        {matchingStoresInState.map(st => (
                          <Link href={`/best-laundry-drycleaning/store/${generateStoreSlug(st.name)}`} key={st.id || st.name} style={{ textDecoration: 'none' }}>
                            <div className="city-service-card">
                              <strong style={{ color: '#16a34a', display: 'block', fontSize: '0.92rem' }}>📍 {st.name} ({st.city})</strong>
                              <p style={{ fontSize: '0.8rem', marginTop: '4px', color: '#64748b' }}>{st.address}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                Our 7-Step Quality Fabric Care Process
              </h3>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Tagging & Inspection:</strong> Garments are tagged and inspected for stains, fabric type, and special care requirements.</li>
                <li style={{ marginBottom: '10px' }}><strong>Pre-treatment:</strong> Individual stains are pre-spotted using specialized eco-friendly formulas.</li>
                <li style={{ marginBottom: '10px' }}><strong>Custom Fabric Washing:</strong> Washed using soft water and balanced pH detergents tailored to fabric weight.</li>
                <li style={{ marginBottom: '10px' }}><strong>Hygiene & Sanitization:</strong> Sanitized with skin-safe disinfectant formulas.</li>
                <li style={{ marginBottom: '10px' }}><strong>Controlled Drying:</strong> Temperature-monitored drying to prevent fabric shrinkage or elasticity loss.</li>
                <li style={{ marginBottom: '10px' }}><strong>Precision Steam Pressing:</strong> Italian steam pressing for a smooth, wrinkle-free finish.</li>
                <li style={{ marginBottom: '10px' }}><strong>Packaging & Quality Check:</strong> Final quality audit before protective eco-packaging and doorstep delivery.</li>
              </ul>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                Available Services at Cleanz24 Studios
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div className="city-service-card">
                  <strong>👗 Designer & Ethnic Wear</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Dry cleaning for silk sarees, sherwanis, and luxury woolens.</p>
                </div>
                <div className="city-service-card">
                  <strong>👟 Sneaker & Leather Care</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Deep dirt removal, canvas cleaning, and conditioning.</p>
                </div>
                <div className="city-service-card">
                  <strong>👜 Bag & Leather Goods</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Mold treatment, buckle polishing, and leather nourishment.</p>
                </div>
                <div className="city-service-card">
                  <strong>🛋 Sofa & Carpet Deep Clean</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Industrial steam extraction to remove dust mites and odors.</p>
                </div>
              </div>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                FAQs about {serviceName} in {cityName}
              </h3>
              <div className="city-service-faq-item">
                <h4 style={{ marginBottom: '6px' }}>Q1. What is the standard turn-around time in {cityName}?</h4>
                <p style={{ fontSize: '0.92rem' }}>Our standard delivery turnaround is 48 hours. Express 24-hour service is also available upon request.</p>
              </div>
              <div className="city-service-faq-item">
                <h4 style={{ marginBottom: '6px' }}>Q2. How can I schedule a doorstep pickup in {cityName}?</h4>
                <p style={{ fontSize: '0.92rem' }}>You can fill out the enquiry form on this page or message us directly on WhatsApp at +91 91380 04800.</p>
              </div>
              <div className="city-service-faq-item" style={{ borderBottom: 'none' }}>
                <h4 style={{ marginBottom: '6px' }}>Q3. Are the cleaning products safe for sensitive skin?</h4>
                <p style={{ fontSize: '0.92rem' }}>Yes, we exclusively use dermatologically tested, non-toxic, eco-friendly detergents and soft water.</p>
              </div>
            </div>

            {/* Sticky Form Area */}
            <div className="city-service-sidebar" id="book-now">
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '6px' }}>
                Enquire / Book in {cityName}
              </h3>
              <p className="city-service-sidebar-p" style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
                Fill out the form below to book a pickup or enquire about opening a Cleanz24 laundry franchise in {cityName}.
              </p>
              <CityServiceForm cityName={cityName} serviceName={serviceName} />
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Cities back link */}
      <section className="city-service-footer">
        <p style={{ fontSize: '0.95rem' }}>
          Back to the dedicated <Link href={`/best-laundry-drycleaning/franchise-opportunities/${citySlug}`} style={{ color: '#16a34a', fontWeight: '600', textDecoration: 'none' }}>Cleanz24 {cityName} Franchise Page</Link>
        </p>
      </section>
    </div>
  );
}
