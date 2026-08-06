import React, { Suspense } from 'react';
import LaundryFranchise from '../../../views/laundry/LaundryFrenchise';

export const metadata = {
  title: "Best Laundry Franchise Opportunity in India 2026 | Cleanz24 Franchise",
  description: "Start a highly profitable Cleanz24 Laundry & Dry Clean Studio franchise in India. Low investment starting from ₹13 Lakhs, high ROI, complete setup & technical support.",
  keywords: ["laundry franchise cost", "dry cleaning franchise India", "franchise business opportunity", "Cleanz24 franchise", "best laundry franchise in India", "fastest growing laundry and drycleaning chain in India"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities-in-india",
  },
  openGraph: {
    type: 'website',
    title: "Best Laundry Franchise Opportunity in India 2026 | Cleanz24 Franchise",
    description: "Start a highly profitable Cleanz24 Laundry & Dry Clean Studio franchise in India. Low investment starting from ₹13 Lakhs, high ROI, complete setup & technical support.",
    url: "https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities-in-india",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Best Laundry Franchise Opportunity in India 2026 | Cleanz24 Franchise",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best Laundry Franchise Opportunity in India 2026 | Cleanz24 Franchise",
    description: "Start a highly profitable Cleanz24 Laundry & Dry Clean Studio franchise in India. Low investment starting from ₹13 Lakhs, high ROI, complete setup & technical support.",
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

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Laundry & Dry Cleaning Franchise',
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
      name: 'Cleanz24 Franchise Models',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Alpha Franchise Model',
            description: 'Entry-level studio setup for laundry and pressing',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
        <LaundryFranchise />
      </Suspense>
    </>
  );
}
