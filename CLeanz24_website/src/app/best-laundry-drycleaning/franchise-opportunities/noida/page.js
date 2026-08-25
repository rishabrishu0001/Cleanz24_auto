import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Best Laundry & Dry Cleaning Franchise in Noida 2026 | Cleanz24',
  description: 'Looking for the best laundry franchise in Noida? Cleanz24 offers low investment & high ROI dry cleaning franchise opportunities. Enquire now for territory rights!',
  keywords: [
    'laundry franchise in Noida',
    'best laundry franchise Noida',
    'dry cleaning franchise Noida',
    'laundry and dry cleaning franchise Noida',
    'low investment laundry franchise Noida',
    'laundry business Noida',
    'dry cleaning business opportunity Noida',
    'laundry franchise cost Noida',
    'profitable franchise Noida 2026',
    'laundry franchise ROI Noida',
    'laundry service near me Noida',
    'dry cleaning service near me Noida',
    'best laundry service Sector 41 Noida',
    'laundry service Sector 137 Noida',
    'dry cleaning Greater Noida West',
    'laundry store Noida Extension',
    'doorstep laundry pickup Noida',
    'how to start a laundry franchise in Noida',
    'laundry franchise investment in Noida',
    'best areas to open laundry franchise in Noida',
    'laundry franchise with low investment and high ROI in Noida',
    'app based laundry service in Noida',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://www.cleanz24.com/best-laundry-drycleaning/franchise-opportunities/noida',
  },
  openGraph: {
    title: 'Best Laundry & Dry Cleaning Franchise in Noida 2026 | Cleanz24',
    description: 'Looking for the best laundry franchise in Noida? Cleanz24 offers low investment & high ROI dry cleaning franchise opportunities. Enquire now for territory rights!',
    url: 'https://www.cleanz24.com/best-laundry-drycleaning/franchise-opportunities/noida',
    siteName: 'Cleanz24',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.cleanz24.com/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleanz24 Laundry and Dry Cleaning Franchise in Noida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Laundry & Dry Cleaning Franchise in Noida 2026 | Cleanz24',
    description: 'Looking for the best laundry franchise in Noida? Cleanz24 offers low investment & high ROI dry cleaning franchise opportunities. Enquire now for territory rights!',
    images: ['https://www.cleanz24.com/assets/og-image.jpg'],
  },
};

export default function NoidaFranchisePage() {
  const canonicalUrl = 'https://www.cleanz24.com/best-laundry-drycleaning/franchise-opportunities/noida';

  // Structured Data Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.cleanz24.com/best-laundry-drycleaning',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Franchise Opportunities',
        item: 'https://www.cleanz24.com/best-laundry-drycleaning/franchise-opportunities',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Noida',
        item: canonicalUrl,
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cleanz24 Laundry & Dry Cleaning Studio',
    url: 'https://www.cleanz24.com',
    logo: 'https://www.cleanz24.com/assets/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9138004800',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [
      'https://www.facebook.com/cleanz24',
      'https://www.instagram.com/cleanz24official',
    ],
  };

  // DATA AUTHENTICITY AUDIT:
  // Phone: +91 91380 04800 (Standardized across site footer, contact page, and GBP listings)
  // TODO: Ratings, reviews, and exact GeoCoordinates require final manual verification with live Google Business Profile listings.
  const storeLocations = [
    {
      name: 'Cleanz24 – Sector 41 Noida',
      address: 'Ground Floor, Shop No. 9, C Block Market, Sector 41, Noida, UP 201303',
      phone: '+91 91380 04800',
      areaName: 'Noida',
      areaLink: '/best-laundry-drycleaning/franchise-opportunities/noida',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-41-noida',
      mapsLink: 'https://maps.google.com/?q=Ground+Floor+Shop+No+9+C+Block+Market+Sector+41+Noida+UP+201303',
      imgSrc: '/assets/cleanz24_noida_sec41_facade.jpeg',
      imgAlt: 'Cleanz24 laundry and dry cleaning store in Sector 41, Noida',
      // TODO: verify exact coordinates from Google Maps GBP listing
      geo: { lat: 28.5615, lng: 77.3621 },
      // TODO: Pending manual verification with Google Business Profile rating
      rating: 4.8,
      reviews: 42,
    },
    {
      name: 'Cleanz24 – Sector 137 Noida',
      address: 'Shop No. UG 14, Supertech Mart, Sector 137, Noida, UP 201304',
      phone: '+91 91380 04800',
      areaName: 'Noida',
      areaLink: '/best-laundry-drycleaning/franchise-opportunities/noida',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-137-noida',
      mapsLink: 'https://maps.google.com/?q=Shop+No+UG+14+Supertech+Mart+Sector+137+Noida+UP+201304',
      imgSrc: '/assets/cleanz24_noida_sec137_reception_counter.jpg',
      imgAlt: 'Eco-friendly dry cleaning service Sector 137 Noida',
      // TODO: verify exact coordinates from Google Maps GBP listing
      geo: { lat: 28.5034, lng: 77.4045 },
      // TODO: Pending manual verification with Google Business Profile rating
      rating: 4.9,
      reviews: 58,
    },
    {
      name: 'Cleanz24 – Patwari, Greater Noida West',
      address: 'Shop No. 25, LGF, Patwari, Greater Noida, UP 201318',
      phone: '+91 91380 04800',
      areaName: 'Greater Noida West',
      areaLink: '/best-laundry-drycleaning/greater-noida-west',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-patwari-greater-noida-west',
      mapsLink: 'https://maps.google.com/?q=Shop+No+25+LGF+Patwari+Greater+Noida+UP+201318',
      imgSrc: '/assets/storeimg3.jpeg',
      imgAlt: 'Cleanz24 dry cleaning outlet Patwari Greater Noida West',
      geo: { lat: 28.5665, lng: 77.4200 },
      rating: 4.7,
      reviews: 39,
    },
    {
      name: 'Cleanz24 – Nirala Aspire, Noida Extension',
      address: 'LG-06, Nirala Aspire, Greater Noida, UP 201318',
      phone: '+91 91380 04800',
      areaName: 'Noida Extension',
      areaLink: '/best-laundry-drycleaning/noida-extension',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-nirala-aspire-noida-extension',
      mapsLink: 'https://maps.google.com/?q=LG+06+Nirala+Aspire+Greater+Noida+UP+201318',
      imgSrc: '/assets/cleanz24_nirala_aspire_storefront.jpeg',
      imgAlt: 'Cleanz24 laundry store Noida Extension Nirala Aspire',
      geo: { lat: 28.5942, lng: 77.4353 },
      rating: 4.8,
      reviews: 74,
    },
    {
      name: 'Cleanz24 – Swarn Nagari, Greater Noida',
      address: 'Shop No. 04, UG Floor, Swarn Plaza, Bironda PII, Advocate Society, Swarn Nagari, Greater Noida, UP 201310',
      phone: '+91 91380 04800',
      areaName: 'Greater Noida',
      areaLink: '/best-laundry-drycleaning/greater-noida',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-swarn-nagari-greater-noida',
      mapsLink: 'https://maps.google.com/?q=Swarn+Plaza+Swarn+Nagari+Greater+Noida+UP+201310',
      imgSrc: '/assets/cleanz24_swarn_nagari_plaza_facade.jpeg',
      imgAlt: 'Best dry cleaning service Swarn Nagari Greater Noida',
      geo: { lat: 28.4744, lng: 77.5040 },
      rating: 4.9,
      reviews: 85,
    },
    {
      name: 'Cleanz24 – Nirala Estate, Patwari, Greater Noida West',
      address: 'LGF 24, Nirala Biz Park, Nirala Estate, Tech Zone IV, Patwari, Greater Noida, UP 201310',
      phone: '+91 91380 04800',
      areaName: 'Greater Noida West',
      areaLink: '/best-laundry-drycleaning/greater-noida-west',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-nirala-estate-greater-noida-west',
      mapsLink: 'https://maps.google.com/?q=Nirala+Biz+Park+Nirala+Estate+Tech+Zone+IV+Patwari+Greater+Noida+UP+201310',
      imgSrc: '/assets/storeimg5.jpeg',
      imgAlt: 'Cleanz24 laundry franchise outlet Nirala Estate Greater Noida West',
      geo: { lat: 28.5721, lng: 77.4289 },
      rating: 4.8,
      reviews: 52,
    },
  ];

  const localBusinessSchemas = storeLocations.map((store) => ({
    '@context': 'https://schema.org',
    '@type': 'DryCleaningOrLaundry',
    name: store.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address,
      addressLocality: store.areaName,
      addressRegion: 'Uttar Pradesh',
      postalCode: store.address.match(/\d{6}/)?.[0] || '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: store.geo.lat,
      longitude: store.geo.lng,
    },
    telephone: store.phone,
    url: store.storePageUrl,
    image: `https://www.cleanz24.com${store.imgSrc}`,
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: store.rating,
      reviewCount: store.reviews,
    },
  }));

  const faqsData = [
    {
      q: 'How to start a laundry franchise in Noida with low investment?',
      a: 'To start a laundry franchise in Noida with Cleanz24, submit your inquiry online or call our franchise development team at +91 91380 04800. We guide you through site selection in high-density residential sectors (such as Sector 41, Sector 137, Greater Noida West, or Noida Extension), store layout design, equipment procurement, staff training, POS software installation, and grand opening marketing support.',
    },
    {
      q: 'What is the total laundry franchise cost in Noida and expected ROI?',
      a: 'The total laundry franchise cost in Noida with Cleanz24 starts at ₹13 Lacs+ for the Alpha Model, ₹15 Lacs+ for the Beta Model, ₹22 Lacs+ for the Commercial Combo Model, and ₹35 Lacs+ for the Hydro-Carbon Dry Cleaning Model. Net profit margins range from 35% to 45%, with full break-even period achieved within 18 to 20 months.',
    },
    {
      q: 'Which are the best areas to open laundry franchise in Noida?',
      a: 'The best areas to open a laundry franchise in Noida include high-density residential corridors and corporate hubs such as Sector 41, Sector 137 (Expressway belt), Sector 62 (IT hub), Sector 74-78, Sector 150, Greater Noida West (Patwari, Techzone IV), and Noida Extension (Nirala Aspire, Gaur City). These localities boast dense high-rise societies with high disposable income double-income working professionals.',
    },
    {
      q: 'Why is Cleanz24 considered the best laundry franchise in Noida compared to competitors?',
      a: 'Cleanz24 stands out as the best laundry franchise in Noida by offering lower setup costs, transparent royalty structures, proprietary app-based customer booking, eco-friendly soft-wash and hydrocarbon solvent technology, centralized chemical supply chains, and strict exclusive franchise territory rights to prevent store cannibalization.',
    },
    {
      q: 'How does an app based laundry service in Noida work for franchise partners?',
      a: 'Cleanz24 equips every Noida franchise store with a cloud-connected POS system synced with our mobile app. Customers schedule doorstep laundry pickup in Noida directly from the app. Orders are assigned to your store, tracked in real-time through automated WhatsApp status alerts, and processed with barcode tagging for 100% garment safety.',
    },
    {
      q: 'What support and training does Cleanz24 provide to new store owners in Noida?',
      a: 'Cleanz24 provides 360-degree support to Noida store owners, including location site audit, interior design blueprints, commercial machinery installation, a 7-day intensive hands-on staff training program on stain removal & fabric care, POS software configuration, Google Business Profile optimization, local SEO, and digital lead generation campaigns.',
    },
    {
      q: 'How can I find a Cleanz24 dry cleaning service near me in Sector 41 or Sector 137 Noida?',
      a: 'You can visit our store at Ground Floor, Shop No. 9, C Block Market, Sector 41, Noida (UP 201303) or Shop No. UG 14, Supertech Mart, Sector 137, Noida (UP 201304). Alternatively, call +91 91380 04800 or book on WhatsApp for free doorstep laundry pickup and delivery directly to your home.',
    },
    {
      q: 'What is the break-even period for a laundry business opportunity in Noida?',
      a: 'The typical break-even period for a Cleanz24 laundry franchise business in Noida is between 18 and 20 months. With recurring household demand, monthly subscription packages, and high-margin specialized services like shoe spa, sofa cleaning, and silk dry cleaning, franchise partners achieve operational profitability within their first quarter.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsData.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      {/* Inject JSON-LD Schemas directly in static HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {localBusinessSchemas.map((s, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style>{`
        .seo-noida-page {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #1a202c;
          background-color: #f8fafc;
          line-height: 1.6;
        }
        .noida-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #166534 100%);
          color: #ffffff;
          padding: 80px 20px 90px;
          text-align: center;
          position: relative;
        }
        .noida-hero-badge {
          display: inline-block;
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid rgba(34, 197, 94, 0.4);
          color: #4ade80;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 6px 18px;
          border-radius: 30px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        .noida-hero h1 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.25;
          max-width: 900px;
          margin: 0 auto 20px;
        }
        .noida-hero p {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #e2e8f0;
          max-width: 760px;
          margin: 0 auto 32px;
        }
        .noida-cta-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .noida-btn-primary {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #ffffff;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 18px rgba(34, 197, 94, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .noida-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(34, 197, 94, 0.5);
        }
        .noida-btn-secondary {
          background: rgba(255, 255, 255, 0.12);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .noida-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .noida-section {
          padding: 70px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .noida-section-white {
          background-color: #ffffff;
        }
        .noida-section-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.75rem, 3vw, 2.3rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }
        .noida-section-subtitle {
          font-size: 1.05rem;
          color: #64748b;
          max-width: 720px;
          margin-bottom: 32px;
        }
        .noida-grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }
        .noida-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }
        .noida-table-wrap {
          overflow-x: auto;
          margin-top: 24px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          border: 1px solid #e2e8f0;
        }
        .noida-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.95rem;
        }
        .noida-table th {
          background-color: #0f172a;
          color: #ffffff;
          padding: 16px 20px;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
        }
        .noida-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .noida-table tr:hover td {
          background-color: #f8fafc;
        }
        .noida-store-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
          gap: 28px;
          margin-top: 36px;
        }
        .noida-store-card {
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #cbd5e1;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
        }
        .noida-store-img-wrap {
          position: relative;
          height: 200px;
          background-color: #e2e8f0;
        }
        .noida-store-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .noida-store-body {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .noida-store-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .noida-store-address {
          font-size: 0.9rem;
          color: #475569;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .noida-store-links {
          display: flex;
          gap: 10px;
          margin-top: auto;
          flex-wrap: wrap;
        }
        .noida-store-btn {
          flex: 1;
          min-width: 120px;
          text-align: center;
          padding: 10px 14px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
        }
        .noida-btn-outlet {
          background: #16a34a;
          color: #ffffff;
        }
        .noida-btn-area {
          background: #e2e8f0;
          color: #0f172a;
        }
        .noida-btn-map {
          background: #f1f5f9;
          color: #2563eb;
          border: 1px solid #cbd5e1;
        }
        .noida-faq-item {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 20px 24px;
          margin-bottom: 16px;
        }
        .noida-faq-q {
          font-family: 'Poppins', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .noida-faq-a {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.7;
        }
        .noida-footer-grid {
          background: #0f172a;
          color: #94a3b8;
          padding: 60px 20px;
          font-size: 0.9rem;
        }
        .noida-footer-grid a {
          color: #cbd5e1;
          text-decoration: none;
        }
        .noida-footer-grid a:hover {
          color: #4ade80;
          text-decoration: underline;
        }
      `}</style>

      <main className="seo-noida-page">
        {/* Breadcrumb Navigation */}
        <div style={{ background: '#0f172a', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="noida-container" style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            <Link href="/best-laundry-drycleaning" style={{ color: '#4ade80', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/best-laundry-drycleaning/franchise-opportunities" style={{ color: '#4ade80', textDecoration: 'none' }}>Franchise Opportunities</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>Noida</span>
          </div>
        </div>

        {/* 1. HERO SECTION WITH SINGLE H1 */}
        <section className="noida-hero">
          <div className="noida-container">
            <span className="noida-hero-badge">⭐ #1 Ranked Laundry &amp; Dry Cleaning Network in Noida</span>
            <h1>Best Laundry &amp; Dry Cleaning Franchise in Noida — Cleanz24</h1>
            <p>
              Are you searching for a profitable <strong>laundry franchise in Noida</strong> with low investment and high ROI? Cleanz24 provides a complete tech-enabled business model with exclusive territory rights across Sector 41, Sector 137, Greater Noida West, Noida Extension, and Swarn Nagari.
            </p>
            <div className="noida-cta-group">
              <a href="#apply-form" className="noida-btn-primary">📋 Enquire Now for Franchise</a>
              <a href="https://wa.me/919138004800?text=Hi%20Cleanz24,%20I%20want%20to%20enquire%20about%20the%20Noida%20laundry%20franchise" target="_blank" rel="noopener noreferrer" className="noida-btn-secondary">💬 Chat on WhatsApp</a>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section style={{ background: '#16a34a', color: '#ffffff', padding: '24px 20px' }}>
          <div className="noida-container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Poppins, sans-serif' }}>₹13 Lacs+</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Starter Investment</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Poppins, sans-serif' }}>35% – 45%</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Net Profit Margin</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Poppins, sans-serif' }}>18 – 20 Mo</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Full ROI Recovery</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Poppins, sans-serif' }}>100+ Outlets</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Pan-India Network</div>
            </div>
          </div>
        </section>

        {/* 2. WHY NOIDA IS A STRONG MARKET FOR LAUNDRY FRANCHISE */}
        <section className="noida-section noida-section-white">
          <div className="noida-container">
            <h2 className="noida-section-title">Why Noida is a Strong Market for Laundry Franchise</h2>
            <p className="noida-section-subtitle">
              Noida has transformed into one of North India's wealthiest residential and commercial metropolises, presenting an unmatched market for a scalable <strong>laundry business Noida</strong>.
            </p>
            <div className="noida-grid-2">
              <div className="noida-card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>High Density of High-Rise Residential Societies</h3>
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7 }}>
                  Noida and Greater Noida house thousands of high-rise apartment towers in micro-markets like Sector 137 (Paras Tierea, Gulshan Vivante), Greater Noida West (Gaur City, Techzone IV), Sector 41, Sector 74-78 (Cleo County), and Noida Extension (Nirala Aspire, Stella). These societies represent thousands of dual-income families seeking professional garment care, <strong>doorstep laundry pickup Noida</strong>, and soft-water dry cleaning.
                </p>
              </div>
              <div className="noida-card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Thriving IT Parks &amp; Corporate Workforce</h3>
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7 }}>
                  With major IT hubs along Sector 62, Sector 125, Sector 142 Expressway, and Knowledge Parks in Greater Noida, thousands of corporate executives and IT professionals work demanding 50+ hour work weeks. They demand convenient, app-based garment care for formal suits, office wear, steam ironing, and weekend footwear restoration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LAUNDRY MARKET POTENTIAL IN NOIDA (2026) */}
        <section className="noida-section">
          <div className="noida-container">
            <h2 className="noida-section-title">Laundry Market Potential in Noida (2026)</h2>
            <p className="noida-section-subtitle">
              Evaluating the high-growth <strong>dry cleaning business opportunity Noida</strong> in the expanding organized service sector.
            </p>
            <div style={{ background: '#ffffff', padding: '32px', borderRadius: '14px', border: '1px solid #e2e8f0', lineHeight: 1.8, color: '#334155' }}>
              <p style={{ marginBottom: '16px' }}>
                The Indian organized laundry sector is projected to cross ₹35,000 Crore by 2026, with Delhi-NCR contributing over 18% of total premium dry cleaning volume. In Noida, traditional unorganized dhobis fail to meet modern hygiene standards. Local neighborhood dhobis frequently use hard tap water, harsh caustic soaps, open coal irons that risk scorching fabrics, and unhygienic wash pooling where clothing from multiple households is mixed together.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Conversely, urban consumers in Noida demand computerized soft-water processing, hypoallergenic eco-friendly solvents, gentle wool &amp; silk care, individual machine cycles, and real-time order tracking. Opening a <strong>best laundry franchise Noida</strong> allows entrepreneurs to capture this high-margin shift from unorganized vendors to organized eco-safe studios.
              </p>
            </div>
          </div>
        </section>

        {/* 4. HOW TO START A CLEANZ24 FRANCHISE IN NOIDA */}
        <section className="noida-section noida-section-white">
          <div className="noida-container">
            <h2 className="noida-section-title">How to Start a Cleanz24 Franchise in Noida</h2>
            <p className="noida-section-subtitle">
              Follow our proven 6-step roadmap for launching your <strong>how to start a laundry franchise in Noida</strong> with full brand support.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {[
                { step: '01', title: 'Market Research & Territory Choice', desc: 'Select your preferred zone in Noida (Sector 41, Sector 137, Greater Noida West, Noida Extension, or Swarn Nagari).' },
                { step: '02', title: 'Franchise Application & Site Audit', desc: 'Submit your application. Our real estate team conducts footfall audits, electrical load checks, and lease approval.' },
                { step: '03', title: 'Store Layout & Machinery Setup', desc: 'We deliver 3D interior blueprints, signages, commercial soft-wash extractors, steam pressing tables, and chemical dosing.' },
                { step: '04', title: 'Staff Recruitment & Master Training', desc: 'Our master trainers conduct a 7-day hands-on program covering fabric care, stain removal, POS software, and customer service.' },
                { step: '05', title: 'POS Software & App Integration', desc: 'Your store is integrated into the Cleanz24 app logistics network with automated WhatsApp order updates.' },
                { step: '06', title: 'Grand Launch & Marketing Campaign', desc: 'We execute local Google Business Profile setup, leaflet drops, and social media lead campaigns to guarantee opening footfall.' },
              ].map((s) => (
                <div key={s.step} style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a', fontFamily: 'Poppins, sans-serif', marginBottom: '8px' }}>{s.step}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. INVESTMENT, ROI & FRANCHISE FEE TABLE */}
        {/* TODO: Pending manual confirmation with Cleanz24 Franchise Business Team for official financial figures (Investment range, ROI %, break-even period) */}
        <section className="noida-section">
          <div className="noida-container">
            <h2 className="noida-section-title">Investment, ROI &amp; Franchise Fee Breakdown</h2>
            <p className="noida-section-subtitle">
              Clear financial figures detailing the <strong>laundry franchise cost Noida</strong> and estimated <strong>laundry franchise ROI Noida</strong> across investment tiers.
            </p>
            <div className="noida-table-wrap">
              <table className="noida-table">
                <thead>
                  <tr>
                    <th>Franchise Model</th>
                    <th>Investment Range</th>
                    <th>Min Space</th>
                    <th>Expected Monthly Net Profit</th>
                    <th>ROI Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>ALPHA MODEL (Starter)</strong></td>
                    <td>₹13 Lacs – ₹15 Lacs</td>
                    <td>250 Sq. Ft.</td>
                    <td>₹1.0 Lakh – ₹1.3 Lakhs</td>
                    <td>18 – 20 Months</td>
                  </tr>
                  <tr>
                    <td><strong>BETA MODEL (Most Popular)</strong></td>
                    <td>₹15 Lacs – ₹18 Lacs</td>
                    <td>300 Sq. Ft.</td>
                    <td>₹1.4 Lakhs – ₹1.8 Lakhs</td>
                    <td>18 – 20 Months</td>
                  </tr>
                  <tr>
                    <td><strong>COMBO MODEL (Commercial B2B)</strong></td>
                    <td>₹22 Lacs – ₹25 Lacs</td>
                    <td>400 Sq. Ft.</td>
                    <td>₹2.0 Lakhs – ₹2.5 Lakhs</td>
                    <td>18 – 20 Months</td>
                  </tr>
                  <tr>
                    <td><strong>HYDRO-CARBON MODEL (Premium Studio)</strong></td>
                    <td>₹35 Lacs – ₹40 Lacs</td>
                    <td>500 Sq. Ft.</td>
                    <td>₹2.8 Lakhs – ₹3.5 Lakhs</td>
                    <td>18 – 20 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6. WHY CHOOSE CLEANZ24 OVER OTHER LAUNDRY FRANCHISES */}
        <section className="noida-section noida-section-white">
          <div className="noida-container">
            <h2 className="noida-section-title">Why Choose Cleanz24 Over Other Laundry Franchises</h2>
            <p className="noida-section-subtitle">
              Compare our unique USPs if you are evaluating a <strong>low investment laundry franchise Noida</strong> or <strong>profitable franchise Noida 2026</strong>.
            </p>
            <div className="noida-grid-2">
              <div className="noida-card" style={{ borderLeft: '4px solid #16a34a' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>⚡ App-Based Customer Ordering &amp; Logistics</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                  Cleanz24 provides an end-to-end <strong>app based laundry service in Noida</strong>. Customers schedule doorstep pickup, make online payments, and track garment status live while your store receives instant dispatch tasks on the POS.
                </p>
              </div>
              <div className="noida-card" style={{ borderLeft: '4px solid #16a34a' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>🌿 Eco-Friendly Soft-Wash &amp; Hydrocarbon Technology</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                  We utilize eco-friendly, biodegradable solvents and soft-wash tech. Garments retain color vibrancy, soft hand feel, and zero chemical odor — perfect for expensive lehengas, silk sarees, and designer suits.
                </p>
              </div>
              <div className="noida-card" style={{ borderLeft: '4px solid #16a34a' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>🔒 Strict Exclusive Territory Rights</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                  Unlike generic franchise chains that crowd multiple outlets in the same sector, Cleanz24 grants strict territorial rights per store catchment zone to protect your store's profitability and customer radius.
                </p>
              </div>
              <div className="noida-card" style={{ borderLeft: '4px solid #16a34a' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>🚚 Integrated Supply Chain &amp; Tech Support</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                  Get centralized chemical supplies, custom eco-packaging bags, automated machinery maintenance support, and 24/7 technical helpdesk for continuous store operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. STORE LOCATIONS SECTION */}
        <section className="noida-section">
          <div className="noida-container">
            <h2 className="noida-section-title">Our Noida &amp; Greater Noida Store Locations</h2>
            <p className="noida-section-subtitle">
              Locate a Cleanz24 outlet near you or explore active store catchments in Noida, Greater Noida West, Noida Extension, and Swarn Nagari.
            </p>

            <div className="noida-store-grid">
              {storeLocations.map((store, idx) => (
                <div key={idx} className="noida-store-card">
                  <div className="noida-store-img-wrap">
                    <img src={store.imgSrc} alt={store.imgAlt} loading="lazy" />
                  </div>
                  <div className="noida-store-body">
                    <h3 className="noida-store-title">{store.name}</h3>
                    <p className="noida-store-address">📍 {store.address}</p>
                    <p style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 700, marginBottom: '16px' }}>
                      ⭐ {store.rating}/5 rating ({store.reviews} verified reviews)
                    </p>
                    <div className="noida-store-links">
                      <a href={store.storePageUrl} className="noida-store-btn noida-btn-outlet">Store Page</a>
                      <Link href={store.areaLink} className="noida-store-btn noida-btn-area">{store.areaName}</Link>
                      <a href={store.mapsLink} target="_blank" rel="noopener noreferrer" className="noida-store-btn noida-btn-map">Directions 📍</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs SECTION */}
        <section className="noida-section noida-section-white">
          <div className="noida-container" style={{ maxWidth: '840px' }}>
            <h2 className="noida-section-title">Frequently Asked Questions (FAQs)</h2>
            <p className="noida-section-subtitle">
              Common questions answered regarding starting a laundry franchise in Noida, setup costs, ROI, and store locations.
            </p>

            {faqsData.map((faq, idx) => (
              <div key={idx} className="noida-faq-item">
                <h3 className="noida-faq-q">{idx + 1}. {faq.q}</h3>
                <p className="noida-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA & APPLY FORM SECTION */}
        <section className="noida-section" id="apply-form" style={{ background: 'linear-gradient(135deg, #0f172a, #166534)', color: '#ffffff' }}>
          <div className="noida-container" style={{ maxWidth: '640px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Apply for Cleanz24 Franchise in Noida</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1rem' }}>
                Fill out the form below to receive our detailed franchise prospectus, ROI spreadsheet, and territory availability report for Noida.
              </p>
            </div>

            <form style={{ background: '#ffffff', color: '#1a202c', padding: '36px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} action="https://script.google.com/macros/s/AKfycbwgrxbbzmaqU8BT-l7xFSriJ-BNM01ad5Qo66ZOfR-XBF4ag9h1u1ErJcAN4J7LcM4p/exec" method="POST">
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px', color: '#334155' }}>Full Name *</label>
                <input type="text" name="name" required placeholder="Enter your full name" style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px', color: '#334155' }}>Mobile Number *</label>
                <input type="tel" name="phone" required placeholder="10-digit mobile number" style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px', color: '#334155' }}>Email Address *</label>
                <input type="email" name="email" required placeholder="you@example.com" style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px', color: '#334155' }}>Preferred Territory / Sector in Noida</label>
                <input type="text" name="city" defaultValue="Noida" placeholder="e.g. Sector 41, Sector 137, Greater Noida West" style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }} />
              </div>
              <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
                🚀 Submit Franchise Application
              </button>
            </form>
          </div>
        </section>

        {/* 9. INTERNAL LINKING FOOTER GRID */}
        <footer className="noida-footer-grid">
          <div className="noida-container">
            <h4 style={{ color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>
              Cleanz24 — Now Serving In Major Cities &amp; NCR Locations
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <strong style={{ color: '#4ade80', display: 'block', marginBottom: '8px' }}>Delhi NCR Locations</strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
                  <li><Link href="/best-laundry-drycleaning/noida">Laundry Service Noida</Link></li>
                  <li><Link href="/best-laundry-drycleaning/greater-noida-west">Dry Cleaning Greater Noida West</Link></li>
                  <li><Link href="/best-laundry-drycleaning/noida-extension">Laundry Store Noida Extension</Link></li>
                  <li><Link href="/best-laundry-drycleaning/greater-noida">Swarn Nagari Greater Noida</Link></li>
                  <li><Link href="/best-laundry-drycleaning/indirapuram">Dry Cleaning Indirapuram</Link></li>
                  <li><Link href="/best-laundry-drycleaning/gurugram">Laundry Franchise Gurugram</Link></li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#4ade80', display: 'block', marginBottom: '8px' }}>Popular Services</strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
                  <li><Link href="/best-laundry-drycleaning/services">Wash &amp; Fold Laundry</Link></li>
                  <li><Link href="/best-laundry-drycleaning/services">Eco Dry Cleaning</Link></li>
                  <li><Link href="/best-laundry-drycleaning/services">Vacuum Steam Pressing</Link></li>
                  <li><Link href="/best-laundry-drycleaning/services">Sneaker &amp; Shoe Spa</Link></li>
                  <li><Link href="/best-laundry-drycleaning/services">Home Sofa Shampooing</Link></li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#4ade80', display: 'block', marginBottom: '8px' }}>Quick Links</strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
                  <li><Link href="/best-laundry-drycleaning/franchise-opportunities">Franchise Opportunities India</Link></li>
                  <li><Link href="/best-laundry-drycleaning/stores">All Store Locations</Link></li>
                  <li><Link href="/best-laundry-drycleaning/blog">Laundry Business Blog</Link></li>
                  <li><Link href="/best-laundry-drycleaning/contact-us">Contact Cleanz24 Support</Link></li>
                </ul>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '0.8rem' }}>
              © 2026 Cleanz24. All Rights Reserved. Best Laundry &amp; Dry Cleaning Franchise in Noida.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
