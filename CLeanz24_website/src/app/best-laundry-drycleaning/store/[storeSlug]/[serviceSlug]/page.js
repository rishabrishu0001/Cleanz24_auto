import React from 'react';
import { notFound } from 'next/navigation';
import { storesData } from '../../../../../data';
import StoreServiceForm from './StoreServiceForm';
import Link from 'next/link';

const SERVICES_MAP = {
  'wash-and-fold': {
    name: 'Wash & Fold Laundry Service',
    icon: '🧺',
    keywords: ['wash and fold laundry', 'laundry service near me', 'wash & fold clothes', 'doorstep laundry pickup', 'local laundry shop'],
    tagline: 'Professional machine washing, delicate tumble drying, and neat folding.'
  },
  'dry-cleaning': {
    name: 'Premium Dry Cleaning Service',
    icon: '👔',
    keywords: ['professional dry cleaning', 'best dry cleaners near me', 'saree dry cleaning', 'suit dry cleaners', 'woolens dry cleaning'],
    tagline: 'Expert stain removal, organic eco-safe solvents, and crisp hanger finishing.'
  },
  'shoe-cleaning': {
    name: 'Professional Shoe Cleaning & Restoration',
    icon: '👟',
    keywords: ['shoe dry cleaning', 'sneaker spa near me', 'leather shoe cleaning', 'canvas shoe wash', 'shoe cleaning service'],
    tagline: 'Deep stain removal, fabric revitalization, and protective coating.'
  },
  'leather-cleaning': {
    name: 'Luxury Leather Bag & Jacket Care',
    icon: '🧥',
    keywords: ['leather jacket dry clean', 'handbag restoration spa', 'purse cleaning near me', 'leather conditioning', 'suede cleaning'],
    tagline: 'Delicate hand cleaning, mold treatment, and leather re-hydration.'
  },
  'curtain-cleaning': {
    name: 'Premium Curtain Dry Cleaning',
    icon: '🛁',
    keywords: ['curtain dry cleaners', 'drape washing service', 'velvet curtain clean', 'blinds cleaning', 'home linen dry cleaning'],
    tagline: 'Deep extraction cleaning, sanitization, and crease-free finish.'
  },
  'carpet-cleaning': {
    name: 'Deep Sofa & Carpet Cleaning Spa',
    icon: '🛋',
    keywords: ['sofa shampooing service', 'carpet dry cleaning near me', 'mattress vacuuming', 'upholstery clean', 'home deep cleaning'],
    tagline: 'Deep pressure extraction, antibacterial sanitization, and odor removal.'
  }
};

const HIGH_VALUE_PHRASES = (storeName, cityName) => [
  `Best Dry Cleaning at ${storeName}`,
  `Best Laundry Service near ${storeName}`,
  `Best Shoe Spa in ${storeName}`,
  `Best Sofa Cleaning at ${storeName}`,
  `Top-Rated Clothes Washing in ${cityName}`,
  `Premium Garment Care at ${storeName}`,
  `No.1 Dry Clean Studio in ${cityName}`,
  `Most Popular Laundry near ${storeName}`,
  `Highly Recommended Dry Cleaners in ${cityName}`,
  `Popular Household Cleaning at ${storeName}`,
  `Trusted Laundry Service near ${storeName}`,
  `Customer-Favorite Shoe Spa in ${cityName}`,
  `Cleanest Dry Cleaning Process at ${storeName}`,
  `Hygienic Wash & Fold in ${cityName}`,
  `Sanitized Laundry Service at ${storeName}`,
  `Cleanest Upholstery Dry Cleaners in ${cityName}`,
  `Germ-Free Carpet Cleaning at ${storeName}`,
  `Fastest Laundry Delivery near ${storeName}`,
  `Express 24h Dry Cleaning at ${storeName}`,
  `Quick Steam Pressing in ${cityName}`,
  `Fastest Doorstep Pickup near ${storeName}`,
  `Same-Day Ironing Service at ${storeName}`,
  `Affordable Laundry Price in ${cityName}`,
  `Low-Cost Dry Cleaning at ${storeName}`,
  `Budget-Friendly Sofa Wash in ${cityName}`,
  `Value For Money Garment Press at ${storeName}`,
  `Affordable Shoe Spa in ${cityName}`,
  `Top Notch Dry Cleaning at ${storeName}`,
  `Elite Premium Fabric Care in ${cityName}`,
  `Five-Star Rated Dry Cleaners at ${storeName}`,
  `Top Notch Shoe Restoration in ${cityName}`,
  `Premium Luxury Bag Spa at ${storeName}`,
  `High-End Deep Carpet Cleaning in ${cityName}`,
  `Professional Cleaners near ${storeName}`,
  `Doorstep Laundry Service at ${storeName}`,
  `Online Laundry Booking in ${cityName}`,
  `ISO-Certified Garment Care at ${storeName}`,
  `Eco-Friendly Solvents in ${cityName}`,
  `Skin-Safe Detergents at ${storeName}`,
  `Top Notch Steam Ironing near ${storeName}`,
  `Most Popular Carpet Wash in ${cityName}`,
  `Cleanest Clothes Press at ${storeName}`,
  `Fastest Saree Dry Clean in ${cityName}`,
  `Affordable Suit Dry Cleaning at ${storeName}`
];

const generateStoreSlug = (name) => {
  const cleanLoc = name
    .replace(/^Cleanz24\s*-\s*/i, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  return `best-laundry-drycleaning-services-${cleanLoc}`;
};

const getShortSlug = (name) =>
  name
    .replace(/^Cleanz24\s*-\s*/i, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { storeSlug, serviceSlug } = resolvedParams;
  
  const store = storesData.find(
    (s) =>
      generateStoreSlug(s.name) === storeSlug ||
      getShortSlug(s.name) === storeSlug
  );
  const serviceData = SERVICES_MAP[serviceSlug];

  if (!store || !serviceData) {
    return {};
  }

  const storeName = store.name;
  const cityName = store.city || 'India';
  const serviceName = serviceData.name;

  const title = `Best ${serviceName} in ${storeName}, ${cityName} | Cleanz24 Studio`;
  const description = `Get professional, top-notch ${serviceName.toLowerCase()} at Cleanz24 ${storeName}, ${cityName}. Located at ${store.address || cityName}. Low rates, fast 24-48h delivery, and free doorstep pickup.`;
  const url = `https://cleanz24.com/best-laundry-drycleaning/store/${storeSlug}/${serviceSlug}`;

  return {
    title,
    description,
    keywords: [
      ...serviceData.keywords.map(k => `${k} in ${cityName}`),
      `${serviceName.toLowerCase()} ${storeName}`,
      `best dry cleaners ${storeName}`,
      `laundry service near ${storeName}`
    ],
    robots: 'index, follow',
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Cleanz24',
      locale: 'en_IN',
      images: [
        {
          url: store.image || 'https://cleanz24.com/logo_laundry.jpg',
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [store.image || 'https://cleanz24.com/logo_laundry.jpg']
    }
  };
}

export default async function StoreServicePage({ params }) {
  const resolvedParams = await params;
  const { storeSlug, serviceSlug } = resolvedParams;

  const store = storesData.find(
    (s) =>
      generateStoreSlug(s.name) === storeSlug ||
      getShortSlug(s.name) === storeSlug
  );
  const serviceData = SERVICES_MAP[serviceSlug];

  if (!store || !serviceData) {
    notFound();
  }

  const storeName = store.name;
  const cityName = store.city || 'India';
  const stateName = store.state || 'India';
  const serviceName = serviceData.name;

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://cleanz24.com/best-laundry-drycleaning'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Stores',
            item: 'https://cleanz24.com/best-laundry-drycleaning/stores'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: storeName,
            item: `https://cleanz24.com/best-laundry-drycleaning/store/${storeSlug}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: serviceName,
            item: `https://cleanz24.com/best-laundry-drycleaning/store/${storeSlug}/${serviceSlug}`
          }
        ]
      },
      {
        '@type': 'Service',
        'name': `${serviceName} at ${storeName}`,
        'provider': {
          '@type': 'LocalBusiness',
          'name': storeName,
          'telephone': store.phone || '+919138004800',
          'priceRange': '₹₹',
          'image': store.image || 'https://cleanz24.com/logo_laundry.jpg',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': store.address || '',
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
            <Link href="/best-laundry-drycleaning/stores" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: '500' }}>Stores</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href={`/best-laundry-drycleaning/store/${storeSlug}`} style={{ color: '#16a34a', textDecoration: 'none', fontWeight: '500' }}>{storeName}</Link>
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
            Best <span style={{ color: '#16a34a' }}>{serviceData.name}</span> in {storeName}
          </h1>
          <p className="city-service-hero-p" style={{ fontSize: '1.1rem', maxWidth: '750px', lineHeight: '1.7', marginBottom: '30px' }}>
            Experience professional, eco-friendly laundry care at Cleanz24 {storeName}. We combine modern German machinery, imported cleaning solvents, and free doorstep pick-up and delivery services across <strong>{cityName}, {stateName}</strong>.
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
              📋 Book Service / Store Enquiry
            </a>
            <a href={`https://wa.me/919138004800?text=Hi%20I%20want%20to%20book%20${encodeURIComponent(serviceData.name)}%20at%20${encodeURIComponent(storeName)}`} target="_blank" rel="noreferrer" style={{ 
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
                Why Cleanz24 is Rated the No. 1 {serviceData.name} in {cityName}
              </h2>
              <p style={{ marginBottom: '20px' }}>
                Maintaining the pristine condition and lifespan of your high-value garments, designer shoes, luxury purses, and home linens requires specialized treatment. Standard washing detergents and hard municipal water can damage delicate fabric fibers, bleed dyes, and leave clothes looking faded and worn out. This is why Cleanz24’s premium <strong>{serviceData.name.toLowerCase()} in {storeName}</strong> offers the absolute best solution.
              </p>
              <p style={{ marginBottom: '20px' }}>
                At our dedicated store outlet at <strong>{store.address || cityName}</strong>, we use international-grade, dermatologically tested cleaning agents and state-of-the-art hydrocarbon cleaning machines. Whether you need deep carpet dry cleaning, shoe restoration, delicate silk saree washing, or premium steam ironing, our local store team handles everything with extreme care. Every item undergoes a rigorous 7-stage quality inspection before packaging, ensuring you get showroom-crisp garments delivered right back to your door.
              </p>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                Your Local Doorstep Cleaning Experts in {cityName}
              </h3>
              <p style={{ marginBottom: '20px' }}>
                Whether you are searching for the <strong>"best laundry service near me in ${cityName}"</strong>, a <strong>"professional dry cleaners in ${cityName}"</strong>, a premium <strong>"shoe spa near me"</strong>, or expert <strong>"sofa cleaning services in ${cityName}"</strong>, Cleanz24 at {storeName} is your trusted, all-in-one local solution. We cater to all surrounding neighborhoods and blocks, offering affordable packages, rapid turnaround times, and 100% digital contactless billing systems.
              </p>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                Our 7-Step Premium Fabric Care Process
              </h3>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Tagging & Detailed Inspection:</strong> Every garment is barcoded, examined for pre-existing stains or minor tears, and sorted by fabric weight and color group.</li>
                <li style={{ marginBottom: '10px' }}><strong>Pre-spotting Stain Treatment:</strong> Stubborn grease spots, ink stains, and collar grime are treated individually using safe, organic solvents.</li>
                <li style={{ marginBottom: '10px' }}><strong>Customized Eco-Friendly Wash:</strong> Fabrics are processed using soft-water washing cycles or zero-residual dry cleaning drums.</li>
                <li style={{ marginBottom: '10px' }}><strong>Sanitization & Deodorization:</strong> Skin-friendly antibacterial treatments are applied to eliminate microscopic dust mites and odors.</li>
                <li style={{ marginBottom: '10px' }}><strong>Controlled Tumble Drying:</strong> Soft-heat drying chambers preserve fiber elasticity and prevent fabric shrinkage.</li>
                <li style={{ marginBottom: '10px' }}><strong>Crisp Italian Steam Ironing:</strong> Heavy-duty industrial steam irons smooth out folds while restoring the original texture and fluff of the garments.</li>
                <li style={{ marginBottom: '10px' }}><strong>Eco-Friendly Packaging & Delivery:</strong> Finished garments are wrapped in breathable dust-proof packaging and delivered directly back to your home.</li>
              </ul>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                Comprehensive Cleanings Services Offered
              </h3>
              <p style={{ marginBottom: '20px' }}>
                Our physical store hub at {storeName} is equipped to handle a diverse range of laundry tasks:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div className="city-service-card">
                  <strong>👗 Designer &amp; Ethnic Wear</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Dry cleaning for premium silk sarees, sherwanis, and woolens.</p>
                </div>
                <div className="city-service-card">
                  <strong>👟 Sneaker &amp; Leather Care</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Deep dirt removal, canvas washing, and premium conditioning.</p>
                </div>
                <div className="city-service-card">
                  <strong>👜 Bag &amp; Leather Goods</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Mold treatment, metal buckle polishing, and leather nourishment.</p>
                </div>
                <div className="city-service-card">
                  <strong>🛋 Sofa &amp; Carpet Deep Clean</strong>
                  <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Industrial steam extraction to remove deep-seated dust mites and grease.</p>
                </div>
              </div>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '40px', marginBottom: '15px' }}>
                Elite Service Standards &amp; Search Tag Directory in {cityName}
              </h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '20px' }}>
                Cleanz24 is widely recognized as the best, cleanest, fastest, and most affordable laundry provider near {storeName}. Here are some of the most popular search terms and professional service standards we support:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '35px' }}>
                {HIGH_VALUE_PHRASES(storeName, cityName).map((phrase) => (
                  <span className="city-service-tag" key={phrase}>
                    ✨ {phrase}
                  </span>
                ))}
              </div>

              <h3 className="city-service-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>
                FAQs about {serviceData.name} at {storeName}
              </h3>
              <div className="city-service-faq-item">
                <h4 style={{ marginBottom: '6px' }}>Q1. What is the turn-around time for laundry and dry cleaning at {storeName}?</h4>
                <p style={{ fontSize: '0.92rem' }}>Our standard delivery time is 48 hours. We also offer express 24-hour service for urgent garment requests.</p>
              </div>
              <div className="city-service-faq-item">
                <h4 style={{ marginBottom: '6px' }}>Q2. Do you charge extra for pickup and delivery services?</h4>
                <p style={{ fontSize: '0.92rem' }}>No, pickup and doorstep delivery are completely free within our store operational limits around {storeName}.</p>
              </div>
              <div className="city-service-faq-item" style={{ borderBottom: 'none' }}>
                <h4 style={{ marginBottom: '6px' }}>Q3. Are the solvents used safe for baby clothes and sensitive skin?</h4>
                <p style={{ fontSize: '0.92rem' }}>Absolutely. We use dermatologically safe, non-toxic organic solvents and soft water that leave zero toxic chemical residues on garments.</p>
              </div>
            </div>

            {/* Sticky Form Area */}
            <div className="city-service-sidebar" id="book-now">
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '6px' }}>
                Enquire / Book at {storeName}
              </h3>
              <p className="city-service-sidebar-p" style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
                Fill out the form below to book a pickup or enquire about opening a Cleanz24 laundry franchise store.
              </p>
              <StoreServiceForm storeName={storeName} cityName={cityName} serviceName={serviceData.name} />
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Cities back link */}
      <section className="city-service-footer">
        <p style={{ fontSize: '0.95rem' }}>
          Back to the dedicated <Link href={`/best-laundry-drycleaning/store/${storeSlug}`} style={{ color: '#16a34a', fontWeight: '600', textDecoration: 'none' }}>Cleanz24 {storeName} Page</Link>
        </p>
      </section>
    </div>
  );
}
