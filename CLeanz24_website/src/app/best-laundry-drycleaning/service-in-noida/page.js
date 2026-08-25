import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Best Laundry & Dry Cleaning Service in Noida | Free Pickup | Cleanz24',
  description: 'Top-rated laundry & dry cleaning service in Noida (Sector 41, Sector 137, Greater Noida West, Noida Extension). Free doorstep pickup & delivery, eco-safe dry cleaning, steam ironing & shoe spa. Book now — Cleanz24!',
  keywords: [
    'best laundry service in Noida',
    'dry cleaners in Noida',
    'laundry service near me Noida',
    'dry cleaning service near me Noida',
    'best laundry service Sector 41 Noida',
    'laundry service Sector 137 Noida',
    'dry cleaning Greater Noida West',
    'laundry store Noida Extension',
    'doorstep laundry pickup Noida',
    'steam press Noida',
    'shoe spa Noida',
    'sofa cleaning Noida',
    'Cleanz24 Noida',
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
    canonical: 'https://www.cleanz24.com/best-laundry-drycleaning/service-in-noida',
  },
  openGraph: {
    title: 'Best Laundry & Dry Cleaning Service in Noida | Free Pickup | Cleanz24',
    description: 'Top-rated laundry & dry cleaning service in Noida (Sector 41, Sector 137, Greater Noida West, Noida Extension). Free doorstep pickup & delivery, eco-safe dry cleaning, steam ironing & shoe spa. Book now!',
    url: 'https://www.cleanz24.com/best-laundry-drycleaning/service-in-noida',
    siteName: 'Cleanz24',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.cleanz24.com/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleanz24 Laundry & Dry Cleaning Studio in Noida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Laundry & Dry Cleaning Service in Noida | Free Pickup | Cleanz24',
    description: 'Top-rated laundry & dry cleaning service in Noida (Sector 41, Sector 137, Greater Noida West, Noida Extension). Free doorstep pickup & delivery. Book now!',
    images: ['https://www.cleanz24.com/assets/og-image.jpg'],
  },
};

export default function NoidaServicePage() {
  const canonicalUrl = 'https://www.cleanz24.com/best-laundry-drycleaning/service-in-noida';

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
        name: 'Locations',
        item: 'https://www.cleanz24.com/best-laundry-drycleaning/locations',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Noida',
        item: canonicalUrl,
      },
    ],
  };

  const storeLocations = [
    {
      name: 'Cleanz24 – Sector 41 Noida',
      address: 'Ground Floor, Shop No. 9, C Block Market, Sector 41, Noida, UP 201303',
      phone: '+91 91380 04800',
      whatsapp: '919138004800',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-41-noida',
      imgSrc: '/assets/cleanz24_noida_sec41_facade.jpeg',
      imgAlt: 'Cleanz24 laundry and dry cleaning store in Sector 41, Noida',
      rating: 4.8,
      reviews: 42,
    },
    {
      name: 'Cleanz24 – Sector 137 Noida',
      address: 'Shop No. UG 14, Supertech Mart, Sector 137, Noida, UP 201304',
      phone: '+91 91380 04800',
      whatsapp: '919138004800',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-137-noida',
      imgSrc: '/assets/cleanz24_noida_sec137_reception_counter.jpg',
      imgAlt: 'Eco-friendly dry cleaning service Sector 137 Noida',
      rating: 4.9,
      reviews: 58,
    },
    {
      name: 'Cleanz24 – Patwari, Greater Noida West',
      address: 'Shop No. 25, LGF, Patwari, Greater Noida, UP 201318',
      phone: '+91 91380 04800',
      whatsapp: '919138004800',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-patwari-greater-noida-west',
      imgSrc: '/assets/storeimg3.jpeg',
      imgAlt: 'Cleanz24 dry cleaning outlet Patwari Greater Noida West',
      rating: 4.7,
      reviews: 39,
    },
    {
      name: 'Cleanz24 – Nirala Aspire, Noida Extension',
      address: 'LG-06, Nirala Aspire, Greater Noida, UP 201318',
      phone: '+91 91380 04800',
      whatsapp: '919138004800',
      storePageUrl: 'https://www.cleanz24.com/best-laundry-drycleaning/store/best-laundry-drycleaning-services-nirala-aspire-noida-extension',
      imgSrc: '/assets/cleanz24_nirala_aspire_storefront.jpeg',
      imgAlt: 'Cleanz24 laundry store Noida Extension Nirala Aspire',
      rating: 4.8,
      reviews: 74,
    },
  ];

  const localBusinessSchemas = storeLocations.map((store) => ({
    '@context': 'https://schema.org',
    '@type': 'DryCleaningOrLaundry',
    name: store.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address,
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    telephone: store.phone,
    url: store.storePageUrl,
    image: `https://www.cleanz24.com${store.imgSrc}`,
    priceRange: '₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: store.rating,
      reviewCount: store.reviews,
    },
  }));

  const serviceFaqs = [
    {
      q: 'Does Cleanz24 provide free doorstep laundry pickup & delivery in Noida?',
      a: 'Yes! Cleanz24 offers 100% free doorstep pickup and delivery across Noida including Sector 41, Sector 137, Greater Noida West, Noida Extension, Sector 62, and surrounding residential societies.',
    },
    {
      q: 'What is the turnaround time for dry cleaning in Noida?',
      a: 'Our standard dry cleaning turnaround time in Noida is 48 to 72 hours. Express 24-hour delivery options are also available upon request.',
    },
    {
      q: 'Are your cleaning solvents safe for delicate silk sarees and lehengas?',
      a: 'Yes, Cleanz24 uses eco-friendly, soft-wash and hydrocarbon solvents that preserve delicate fabric textures, embroidery, and colors without any harsh chemical odor.',
    },
    {
      q: 'How do I book a laundry pickup in Noida?',
      a: 'You can book a free pickup instantly by WhatsApping us at +91 91380 04800 or calling our customer helpline.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: serviceFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {localBusinessSchemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style>{`
        .noida-svc-page {
          font-family: 'Inter', system-ui, sans-serif;
          color: #1a202c;
          background: #f8fafc;
          line-height: 1.6;
        }
        .noida-svc-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0284c7 100%);
          color: #ffffff;
          padding: 80px 20px 90px;
          text-align: center;
        }
        .noida-svc-hero h1 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.25;
          margin-bottom: 20px;
        }
        .noida-svc-hero p {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #e0f2fe;
          max-width: 760px;
          margin: 0 auto 32px;
        }
        .noida-svc-btn-wa {
          background: #22c55e;
          color: #ffffff;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 30px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);
        }
        .noida-svc-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .noida-svc-section {
          padding: 60px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .noida-svc-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.75rem, 3vw, 2.3rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }
        .noida-svc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }
        .noida-svc-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
      `}</style>

      <main className="noida-svc-page">
        {/* Breadcrumb */}
        <div style={{ background: '#0f172a', padding: '16px 20px', color: '#94a3b8', fontSize: '0.85rem' }}>
          <div className="noida-svc-container">
            <Link href="/best-laundry-drycleaning" style={{ color: '#38bdf8', textDecoration: 'none' }}>Home</Link> ›{' '}
            <Link href="/best-laundry-drycleaning/locations" style={{ color: '#38bdf8', textDecoration: 'none' }}>Locations</Link> ›{' '}
            <span style={{ color: '#ffffff', fontWeight: 600 }}>Noida</span>
          </div>
        </div>

        {/* Hero */}
        <section className="noida-svc-hero">
          <div className="noida-svc-container">
            <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              🧺 Premium Garment Care in Noida
            </span>
            <h1>Best Laundry &amp; Dry Cleaning Service in Noida</h1>
            <p>
              Free doorstep pickup &amp; delivery across Sector 41, Sector 137, Greater Noida West, and Noida Extension. Eco-safe dry cleaning, steam press, shoe spa &amp; sofa shampooing.
            </p>
            <div>
              <a
                href="https://wa.me/919138004800?text=Hi%20Cleanz24,%20I%20want%20to%20book%20a%20laundry%20pickup%20in%20Noida"
                target="_blank"
                rel="noopener noreferrer"
                className="noida-svc-btn-wa"
              >
                💬 Book Pickup on WhatsApp (+91 91380 04800)
              </a>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="noida-svc-section" style={{ background: '#ffffff' }}>
          <div className="noida-svc-container">
            <h2 className="noida-svc-title">Our Garment Care Services in Noida</h2>
            <div className="noida-svc-grid">
              <div className="noida-svc-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0284c7', marginBottom: '8px' }}>👕 Wash &amp; Fold Laundry</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Everyday laundry washed in soft water with eco-friendly detergent and hygienically dried.</p>
              </div>
              <div className="noida-svc-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0284c7', marginBottom: '8px' }}>🥼 Eco Dry Cleaning</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Hydrocarbon dry cleaning for suits, lehengas, silk sarees &amp; sherwanis without chemical odor.</p>
              </div>
              <div className="noida-svc-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0284c7', marginBottom: '8px' }}>♨ Vacuum Steam Pressing</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Crisp, wrinkle-free shirts &amp; formals pressed on Italian vacuum steam tables.</p>
              </div>
              <div className="noida-svc-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0284c7', marginBottom: '8px' }}>👟 Sneaker &amp; Shoe Spa</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Deep cleaning, deodorizing, and restoration for sneakers, suede, and leather footwear.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stores Section */}
        <section className="noida-svc-section">
          <div className="noida-svc-container">
            <h2 className="noida-svc-title">Cleanz24 Stores Serving Noida</h2>
            <div className="noida-svc-grid">
              {storeLocations.map((store, i) => (
                <div key={i} className="noida-svc-card">
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>{store.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px' }}>📍 {store.address}</p>
                  <a href={store.storePageUrl} style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 700, textDecoration: 'none' }}>View Store Details →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Franchise CTA cross-link */}
        <section className="noida-svc-section" style={{ background: '#f0f9ff', textAlign: 'center' }}>
          <div className="noida-svc-container">
            <h2 className="noida-svc-title">Looking to Start a Business in Noida?</h2>
            <p style={{ color: '#475569', marginBottom: '24px' }}>
              Explore Cleanz24 Franchise Opportunities in Noida. Investment starting ₹13 Lacs+ with high net profit margins.
            </p>
            <Link
              href="/best-laundry-drycleaning/franchise-opportunities/noida"
              style={{ background: '#0f172a', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}
            >
              🚀 View Noida Franchise Opportunities
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
