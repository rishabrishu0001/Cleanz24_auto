import React, { Suspense } from 'react';
import CarSpaHome from '../../views/car-spa/CarSpaHome';

export const metadata = {
  title: "Cleanz24 Car Spa Studio | Premium Car Detailing & Wash",
  description: "Book professional car foam wash, interior vacuuming, engine bay degreasing, ceramic coating, and PPF at Cleanz24 Car Spa Studios.",
  keywords: ["car detailing near me","best car wash","ceramic coating price","paint protection film","PPF installers","car spa studio"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://www.cleanz24.com/car-spa",
  },
  openGraph: {
    type: 'website',
    title: "Cleanz24 Car Spa Studio | Premium Car Detailing & Wash",
    description: "Book professional car foam wash, interior vacuuming, engine bay degreasing, ceramic coating, and PPF at Cleanz24 Car Spa Studios.",
    url: "https://www.cleanz24.com/car-spa",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://www.cleanz24.com/logo_carspa.jpg",
        width: 1200,
        height: 630,
        alt: "Cleanz24 Car Spa Studio | Premium Car Detailing & Wash",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cleanz24 Car Spa Studio | Premium Car Detailing & Wash",
    description: "Book professional car foam wash, interior vacuuming, engine bay degreasing, ceramic coating, and PPF at Cleanz24 Car Spa Studios.",
    images: ["https://www.cleanz24.com/logo_carspa.jpg"],
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
      item: 'https://www.cleanz24.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Car Spa Studio',
      item: 'https://www.cleanz24.com/car-spa',
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cleanz24 Premium Car Spa & Auto Detailing',
  description: 'Premium foam wash, interior deep cleaning, ceramic coating, PPF and full paint restoration services.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Cleanz24 Car Spa Studio',
    image: 'https://www.cleanz24.com/logo_carspa.jpg',
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
        <CarSpaHome  />
      </Suspense>
    </>
  );
}
