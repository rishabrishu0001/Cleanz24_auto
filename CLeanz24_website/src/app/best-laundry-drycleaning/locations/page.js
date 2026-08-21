import React, { Suspense } from 'react';
import Locations from '../../../views/laundry/Locations';

export const metadata = {
  title: 'Cleanz24 Laundry Locations Across India | City Store Directory',
  description: 'Find Cleanz24 laundry and dry cleaning studios across Noida, Delhi NCR, Mumbai, Pune, Bangalore, Hyderabad, Jaipur, and 100+ cities in India. Free doorstep pickup & delivery.',
  keywords: [
    'laundry near me',
    'dry cleaning near me',
    'Cleanz24 locations',
    'laundry outlets India',
    'dry cleaner directory',
  ],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.cleanz24.com/best-laundry-drycleaning/locations',
  },
  openGraph: {
    title: 'Cleanz24 Laundry Locations Across India | City Store Directory',
    description: 'Find Cleanz24 laundry and dry cleaning studios across Noida, Delhi NCR, Mumbai, Pune, Bangalore, Hyderabad, and 100+ cities in India.',
    url: 'https://www.cleanz24.com/best-laundry-drycleaning/locations',
    type: 'website',
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: 'https://www.cleanz24.com/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleanz24 Locations Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleanz24 Laundry Locations Across India | City Store Directory',
    description: 'Find Cleanz24 laundry and dry cleaning studios across Noida, Delhi NCR, Mumbai, Pune, Bangalore, and 100+ cities in India.',
    images: ['https://www.cleanz24.com/assets/og-image.jpg'],
  },
};

export default function Page() {
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
        name: 'Locations Directory',
        item: 'https://www.cleanz24.com/best-laundry-drycleaning/locations',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which cities does Cleanz24 operate in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cleanz24 operates in 100+ cities across 17+ states in India including Delhi NCR, Noida, Greater Noida, Gurugram, Mumbai, Pune, Bangalore, Hyderabad, Jaipur, Lucknow, Dehradun, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is doorstep pickup free in all Cleanz24 location cities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Cleanz24 offers free home pickup and delivery service across all active city operational zones.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
        <Locations />
      </Suspense>
    </>
  );
}
