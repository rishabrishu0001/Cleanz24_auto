import React from 'react';
import { notFound } from 'next/navigation';
import { FRANCHISE_CITIES } from '../../../../../data/franchiseCities';
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

const HIGH_VALUE_PHRASES = (cityName) => [
  `Best Dry Cleaning in ${cityName}`,
  `Best Laundry Service in ${cityName}`,
  `Best Shoe Spa in ${cityName}`,
  `Best Sofa Cleaning in ${cityName}`,
  `Top-Rated Clothes Washing in ${cityName}`,
  `Premium Garment Care in ${cityName}`,
  `No.1 Dry Clean Studio in ${cityName}`,
  `Most Popular Laundry in ${cityName}`,
  `Highly Recommended Dry Cleaners in ${cityName}`,
  `Popular Household Cleaning in ${cityName}`,
  `Trusted Laundry Franchise in ${cityName}`,
  `Customer-Favorite Shoe Spa in ${cityName}`,
  `Cleanest Dry Cleaning Process in ${cityName}`,
  `Hygienic Wash & Fold in ${cityName}`,
  `Sanitized Laundry Service in ${cityName}`,
  `Cleanest Upholstery Dry Cleaners in ${cityName}`,
  `Germ-Free Carpet Cleaning in ${cityName}`,
  `Fastest Laundry Delivery in ${cityName}`,
  `Express 24h Dry Cleaning in ${cityName}`,
  `Quick Steam Pressing in ${cityName}`,
  `Fastest Doorstep Pickup in ${cityName}`,
  `Same-Day Ironing Service in ${cityName}`,
  `Affordable Laundry Price in ${cityName}`,
  `Low-Cost Dry Cleaning in ${cityName}`,
  `Budget-Friendly Sofa Wash in ${cityName}`,
  `Value For Money Garment Press in ${cityName}`,
  `Affordable Shoe Spa in ${cityName}`,
  `Top Notch Dry Cleaning in ${cityName}`,
  `Elite Premium Fabric Care in ${cityName}`,
  `Five-Star Rated Dry Cleaners in ${cityName}`,
  `Top Notch Shoe Restoration in ${cityName}`,
  `Premium Luxury Bag Spa in ${cityName}`,
  `High-End Deep Carpet Cleaning in ${cityName}`,
  `Professional Cleaners Near Me in ${cityName}`,
  `Doorstep Laundry Service in ${cityName}`,
  `Online Laundry Booking in ${cityName}`,
  `ISO-Certified Garment Care in ${cityName}`,
  `Eco-Friendly Solvents in ${cityName}`,
  `Skin-Safe Detergents in ${cityName}`,
  `Top Notch Steam Ironing in ${cityName}`,
  `Most Popular Carpet Wash in ${cityName}`,
  `Cleanest Clothes Press in ${cityName}`,
  `Fastest Saree Dry Clean in ${cityName}`,
  `Affordable Suit Dry Cleaning in ${cityName}`
];

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
  const pageDesc = `Looking for the best ${serviceName.toLowerCase()} in ${cityName}, ${stateName}? Cleanz24 offers doorstep delivery, premium fabric care, and ISO-certified cleaning. Book or enquire today!`;
  
  return {
    title: pageTitle,
    description: pageDesc,
    keywords: serviceData.keywords.map(k => `${k} in ${cityName}`).join(', '),
    alternates: {
      canonical: `https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}/${serviceSlug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}/${serviceSlug}`,
      siteName: 'Cleanz24',
      type: 'website',
      images: [
        {
          url: 'https://cleanz24.com/assets/logo3.jpeg',
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
      images: ['https://cleanz24.com/assets/logo3.jpeg']
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

  // Schema Injection
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://cleanz24.com/best-laundry-drycleaning' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Franchise', 'item': 'https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities' },
          { '@type': 'ListItem', 'position': 3, 'name': cityName, 'item': `https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}` },
          { '@type': 'ListItem', 'position': 4, 'name': serviceData.name, 'item': `https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}/${serviceSlug}` }
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
          'image': 'https://cleanz24.com/assets/logo3.jpeg',
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
          padding: 15px;
          border-radius: 8px;
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
        .city-service-label {
          color: #374151;
          transition: color 0.25s ease;
        }
        .laundry-dark .city-service-label {
          color: #cbd5e1;
        }
        .city-service-input {
          background-color: #ffffff;
          border: 1.5px solid #d1d5db;
          color: #1a202c;
          transition: all 0.25s ease;
        }
        .laundry-dark .city-service-input {
          background-color: #0f1623;
          border-color: #334155;
          color: #e2e8f0;
        }
        .city-service-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
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
        .city-service-tag {
          background: rgba(22, 163, 74, 0.08);
          border: 1px solid rgba(22, 163, 74, 0.18);
          color: #15803d;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 99px;
          transition: all 0.2s ease;
          display: inline-block;
        }
        .laundry-dark .city-service-tag {
          background: rgba(74, 222, 128, 0.1);
          border-color: rgba(74, 222, 128, 0.25);
          color: #4ade80;
        }
        .city-service-tag:hover {
          transform: translateY(-2px);
          background: #16a34a;
          color: #ffffff;
          border-color: #16a34a;
        }
      `}</style>

      {/* Hero Section */}
      <section className="city-service-hero">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <nav style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
            <Link href="/best-laundry-drycleaning" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/best-laundry-drycleaning/franchise-opportunities" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: '500' }}>Franchise</Link>
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
            Experience professional, eco-friendly {serviceName.toLowerCase()} at Cleanz24. We combine modern technology, imported solvents, and complimentary home pick-up and delivery services across <strong>{cityName}, {stateName}</strong>.
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
            <a href={`https://wa.me/919138004800?text=Hi%20I%20want%20to%20book%20${encodeURIComponent(serviceName)}%20in%20${encodeURIComponent(cityName)}`} target="_blank" rel="noreferrer" style={{ 
              background: 'transparent', 
              color: '#16a34a', 
              border: '2px solid #16a34a', 
              padding: '12px 30px', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              fontWeight: '700', 
              textDecoration: 'none'
            }}>
              💬 WhatsApp Bookings
            </a>
          </div>
        </div>
      </section>

      {/* 1000+ Words SEO Content Grid */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'flex-start' }}>
            
            {/* Main Content Area */}
            <div style={{ lineHeight: '1.8' }}>
              <h2 className="city-service-title" style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '20px' }}>
                Why Cleanz24 is Rated the No. 1 {serviceName} in {cityName}
              </h2>
              <p style={{ marginBottom: '20px' }}>
                In a fast-paced urban setup like {cityName}, maintaining the life and pristine condition of your clothes, designer shoes, luxury handbags, and home upholstery can be challenging. Airborne pollution, sweat, humidity, and food spillages require prompt, specialized intervention. Using standard detergent soaps and hard tap water leads to premature fiber decay, fading color tones, and rough textures. This is where Cleanz24’s premium <strong>{serviceName.toLowerCase()} in {cityName}</strong> offers unmatched value.
              </p>
              <p style={{ marginBottom: '20px' }}>
                We utilize international standard, custom-formulated cleaning detergents and modern hydrocarbon cleaning chambers that lift dirt particulates off materials without altering fabric composition. Whether you need a standard wash and fold, stain correction, shoe sanitization, or deep carpet dry cleaning, our local team operates with precision. Every garment goes through a 7-stage quality assessment process to ensure you get showroom-clean clothes delivered directly to your doorstep.
              </p>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                Your Local Doorstep Cleaning Experts in {cityName}
              </h3>
              <p style={{ marginBottom: '20px' }}>
                Whether you are searching for the <strong>"best laundry service near me in {cityName}"</strong>, a <strong>"professional dry cleaners in {cityName}"</strong>, a premium <strong>"shoe spa near me"</strong>, or expert <strong>"sofa cleaning services in {cityName}"</strong>, Cleanz24 is your trusted, all-in-one solution. We cater to all major residential and commercial areas of the city, offering high-value packages, quick turnaround times, and 100% digital billing systems.
              </p>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                Our 7-Step Premium Fabric Care Process
              </h3>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Tagging & Inspection:</strong> Each item is recorded, inspected for stains, tears, or loose buttons, and sorted by color and fabric weight.</li>
                <li style={{ marginBottom: '10px' }}><strong>Pre-spotting & Stain Treatment:</strong> We treat food stains, grease spots, and ink marks individually using eco-safe solvents.</li>
                <li style={{ marginBottom: '10px' }}><strong>Customized Cleaning:</strong> Based on the service, fabrics are washed in soft-water chambers or clean-solvent dry cleaning drums.</li>
                <li style={{ marginBottom: '10px' }}><strong>Sanitization & Germ Guard:</strong> Garments are treated with skin-safe disinfectant formulas to ensure hygiene.</li>
                <li style={{ marginBottom: '10px' }}><strong>Vacuum Drying & Airing:</strong> Controlled drying temperatures preserve elastic bonds and prevent fabric shrinkage.</li>
                <li style={{ marginBottom: '10px' }}><strong>Crisp Steam Pressing:</strong> Italian steam pressing machines smooth out wrinkles while raising fiber fluff naturally.</li>
                <li style={{ marginBottom: '10px' }}><strong>Final Packing & Doorstep Delivery:</strong> Wrapped in dust-free eco-plastics and delivered back to your home within 48 hours.</li>
              </ul>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                Comprehensive Cleanings Services Offered in {cityName}
              </h3>
              <p style={{ marginBottom: '20px' }}>
                Our physical franchise hubs in {cityName} are equipped to handle a diverse range of laundry tasks:
              </p>
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

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '40px', marginBottom: '15px' }}>
                Elite Service Standards & Search Tag Directory in {cityName}
              </h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '20px' }}>
                Cleanz24 is widely recognized as the best, cleanest, fastest, and most affordable laundry provider in {cityName}. Here are some of the most popular search terms and professional service standards we support:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '35px' }}>
                {HIGH_VALUE_PHRASES(cityName).map((phrase) => (
                  <span className="city-service-tag" key={phrase}>
                    ✨ {phrase}
                  </span>
                ))}
              </div>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                FAQs about {serviceName} in {cityName}
              </h3>
              <div className="city-service-faq-item">
                <h4 style={{ marginBottom: '6px' }}>Q1. What is the turn-around time for laundry and dry cleaning in {cityName}?</h4>
                <p style={{ fontSize: '0.92rem' }}>Our standard delivery time is 48 hours. We also offer express 24-hour service for urgent garment requests.</p>
              </div>
              <div className="city-service-faq-item">
                <h4 style={{ marginBottom: '6px' }}>Q2. Do you charge extra for pickup and delivery services?</h4>
                <p style={{ fontSize: '0.92rem' }}>No, pickup and doorstep delivery are completely free within our store operational limits in {cityName}.</p>
              </div>
              <div className="city-service-faq-item" style={{ borderBottom: 'none' }}>
                <h4 style={{ marginBottom: '6px' }}>Q3. Are the solvents used safe for baby clothes and sensitive skin?</h4>
                <p style={{ fontSize: '0.92rem' }}>Absolutely. We use dermatologically safe, non-toxic organic solvents and soft water that leave zero toxic chemical residues on garments.</p>
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
