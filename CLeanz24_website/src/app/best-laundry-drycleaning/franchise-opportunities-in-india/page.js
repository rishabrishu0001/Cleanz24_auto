import React, { Suspense } from 'react';
import LaundryFranchise from '../../../views/laundry/LaundryFrenchise';

export const metadata = {
  title: "Best Laundry Franchise Business in India | Cleanz24 Studio",
  description: "Start a highly profitable Cleanz24 Laundry & Dry Clean Studio franchise in India. Complete store setup, modern machinery, branding & full operational support. Enquire now!",
  keywords: [
    "best laundry franchise in India",
    "laundry franchise in India",
    "best laundry franchise business in India",
    "laundry and dry cleaning franchise in India",
    "best dry cleaning franchise in India",
    "laundry franchise opportunity in India",
    "profitable laundry franchise in India",
    "laundry business franchise in India",
    "laundry franchise cost in India",
    "laundry franchise investment in India",
    "Cleanz24 franchise"
  ],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities-in-india",
  },
  openGraph: {
    type: 'website',
    title: "Best Laundry Franchise Business in India | Cleanz24 Studio",
    description: "Start a highly profitable Cleanz24 Laundry & Dry Clean Studio franchise in India. Complete store setup, modern machinery, branding & full operational support. Enquire now!",
    url: "https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities-in-india",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Best Laundry Franchise Business in India | Cleanz24 Studio",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best Laundry Franchise Business in India | Cleanz24 Studio",
    description: "Start a highly profitable Cleanz24 Laundry & Dry Clean Studio franchise in India. Complete store setup, modern machinery, branding & full operational support. Enquire now!",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
  },
};

export default function Page() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cleanz24',
    url: 'https://cleanz24.com',
    logo: 'https://cleanz24.com/logo_laundry.jpg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9138004800',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cleanz24.com/best-laundry-drycleaning',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Best Laundry Franchise in India',
        item: 'https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities-in-india',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the minimum investment required to start a Cleanz24 laundry franchise in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Minimum investment starts at ₹13 Lakhs for the Alpha Model (250 sq.ft minimum area), which includes end-to-end store setup, machinery, chemical supply, branding, and training.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the expected ROI and break-even period for a Cleanz24 franchise?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Operating break-even is typically achieved within 3 to 6 months, while full capital investment ROI is achieved in 18 to 20 months.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Cleanz24 provide staff training and site selection assistance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Cleanz24 provides complete site selection intelligence based on footfall and demographic data, along with 7 days of comprehensive operational and technical staff training.',
        },
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Laundry & Dry Cleaning Franchise Business Opportunity',
    provider: {
      '@type': 'Organization',
      name: 'Cleanz24',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleanz24 Franchise Business Models',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Alpha Franchise Model',
            description: 'Entry-level studio setup for laundry and pressing (Investment starting ₹13 Lakhs)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Beta Franchise Model',
            description: 'High-capacity laundry & dry cleaning setup',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Combo Commercial Model',
            description: 'B2B & B2C commercial laundry setup',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hydro-Carbon Model',
            description: 'Ultra-premium eco-friendly hydrocarbon dry cleaning',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
        <LaundryFranchise />
      </Suspense>
    </>
  );
}

