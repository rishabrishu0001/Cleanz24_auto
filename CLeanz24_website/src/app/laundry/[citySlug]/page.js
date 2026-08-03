import React, { Suspense } from 'react';
import LocationDetail from '../../../views/laundry/LocationDetail';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.citySlug || '';
  const formattedCity = citySlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const title = `Best Dry Cleaners & Laundry Service in ${formattedCity} — Free Doorstep Pickup | Cleanz24`;
  const description = `Find top-rated laundry & eco-friendly dry cleaning in ${formattedCity}. Cleanz24 offers professional garment care, shoe spa, steam press, and free pickup in ${formattedCity}.`;
  const keywords = [
    `laundry in ${formattedCity}`,
    `dry cleaners in ${formattedCity}`,
    `best dry cleaning ${formattedCity}`,
    `shoe cleaning ${formattedCity}`,
    `steam press ${formattedCity}`,
    `laundry pickup ${formattedCity}`,
    `Cleanz24 ${formattedCity}`,
  ];
  const url = `https://cleanz24.com/laundry/${citySlug}`;

  return {
    title,
    description,
    keywords,
    robots: 'index, follow',
    alternates: {
      canonical: url,
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
          url: 'https://cleanz24.com/assets/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Cleanz24 Laundry & Dry Cleaning Studio in ${formattedCity}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://cleanz24.com/assets/og-image.jpg'],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.citySlug || '';
  const formattedCity = citySlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const url = `https://cleanz24.com/laundry/${citySlug}`;

  // Structured Data Schemas for Local SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'DryCleaningOrLaundry',
    name: `Cleanz24 Laundry & Dry Clean Studio - ${formattedCity}`,
    description: `Premium eco-friendly dry cleaning, shoe spa, and laundry service in ${formattedCity} with free doorstep pickup & delivery.`,
    url: url,
    telephone: '+919138004800',
    email: 'happy2helpu@cleanz24.com',
    priceRange: '₹₹',
    image: 'https://cleanz24.com/assets/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: formattedCity,
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: formattedCity,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cleanz24.com/laundry',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: 'https://cleanz24.com/laundry/locations',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: formattedCity,
        item: url,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Does Cleanz24 offer free home pickup and delivery in ${formattedCity}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! Cleanz24 provides free doorstep pickup and delivery for laundry, dry cleaning, and shoe spa services across ${formattedCity}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What laundry services are available at Cleanz24 in ${formattedCity}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Cleanz24 in ${formattedCity} offers eco-friendly garment dry cleaning, steam ironing, shoe and handbag spa, curtain & sofa cleaning, and commercial laundry.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I book a laundry pickup in ${formattedCity}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can schedule a pickup directly through the Cleanz24 website, via WhatsApp at +91 9138004800, or by calling our customer support.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
        <LocationDetail citySlug={citySlug} />
      </Suspense>
    </>
  );
}
