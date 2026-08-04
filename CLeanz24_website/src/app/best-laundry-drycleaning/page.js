import React, { Suspense } from 'react';
import LaundryHome from '../../views/laundry/LaundryHome';

export const metadata = {
  title: "Cleanz24 Laundry — Premium Garment Dry Clean & Steam Press Studio",
  description: "India’s leading laundry studio chain offering eco-friendly garment dry cleaning, shoe spa, steam press, and home pickup services.",
  keywords: ["laundry near me","dry cleaners near me","best dry cleaning","steam iron","shoe cleaning service","Cleanz24 laundry"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning",
  },
  openGraph: {
    type: 'website',
    title: "Cleanz24 Laundry — Premium Garment Dry Clean & Steam Press Studio",
    description: "India’s leading laundry studio chain offering eco-friendly garment dry cleaning, shoe spa, steam press, and home pickup services.",
    url: "https://cleanz24.com/best-laundry-drycleaning",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Cleanz24 Laundry — Premium Garment Dry Clean & Steam Press Studio",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cleanz24 Laundry — Premium Garment Dry Clean & Steam Press Studio",
    description: "India’s leading laundry studio chain offering eco-friendly garment dry cleaning, shoe spa, steam press, and home pickup services.",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
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
      item: 'https://cleanz24.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Laundry Services',
      item: 'https://cleanz24.com/best-laundry-drycleaning',
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cleanz24 Premium Laundry & Dry Cleaning',
  description: 'Organic dry cleaning, laundry wash & fold, steam press, and shoe/bag detailing with free doorstep pickup.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Cleanz24',
    image: 'https://cleanz24.com/logo_laundry.jpg',
    telephone: '+919138004800',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
        <LaundryHome  />
      </Suspense>
    </>
  );
}
