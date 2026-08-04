import React, { Suspense } from 'react';
import LocationDetail from '../../../views/laundry/LocationDetail';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.citySlug || '';
  const formattedCity = citySlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const title = `Best Laundry & Dry Cleaning Service in ${formattedCity} | Cleanz24`;
  // Kept to ≤155 chars for Google snippet. Template: ~143 chars + city name.
  const description = `Best laundry & dry cleaning in ${formattedCity}. Free pickup, eco-safe solvents, shoe spa, steam ironing & sofa cleaning. Book now — Cleanz24!`;
  const keywords = [
    `laundry in ${formattedCity}`,
    `dry cleaners in ${formattedCity}`,
    `best dry cleaning ${formattedCity}`,
    `shoe cleaning ${formattedCity}`,
    `steam press ${formattedCity}`,
    `laundry pickup ${formattedCity}`,
    `Cleanz24 ${formattedCity}`,
  ];
  const url = `https://cleanz24.com/best-laundry-drycleaning/${citySlug}`;

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
  const url = `https://cleanz24.com/best-laundry-drycleaning/${citySlug}`;

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
        // State page not yet live — omitting 'item' URL to avoid broken schema link
        '@type': 'ListItem',
        position: 2,
        name: formattedCity.split(' ')[0], // State/region placeholder
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: formattedCity,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
        <LocationDetail citySlug={citySlug} />
      </Suspense>
    </>
  );
}
