import React from 'react';
import LocationDetail from '../../../views/laundry/LocationDetail';
import { FRANCHISE_CITIES } from '../../../data/franchiseCities';

// Force every slug from generateStaticParams to be fully pre-rendered as SSG.
// Without this, Next.js may serve unknown slugs via a shared static shell,
// causing BAILOUT_TO_CLIENT_SIDE_RENDERING for non-pre-rendered paths.
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const citiesList = Array.isArray(FRANCHISE_CITIES) ? FRANCHISE_CITIES : [];
  return citiesList.map((c) => ({
    citySlug: c.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.citySlug || '';
  // Strip known route prefixes before formatting the display name (P2 fix)
  const normalizedSlug = citySlug
    .replace(/^service-in-/, '')
    .replace(/^franchise-in-/, '');
  const formattedCity = normalizedSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const title = `Best Laundry & Dry Cleaning Service in ${formattedCity} | Cleanz24`;
  const description = `Best laundry & dry cleaning service in ${formattedCity}. Free pickup & delivery, eco-safe soft wash, shoe spa, steam ironing & sofa cleaning. Book now — Cleanz24!`;
  const keywords = [
    `laundry service in ${formattedCity}`,
    `dry cleaners in ${formattedCity}`,
    `best dry cleaning ${formattedCity}`,
    `shoe cleaning ${formattedCity}`,
    `steam press ${formattedCity}`,
    `laundry pickup ${formattedCity}`,
    `Cleanz24 ${formattedCity}`,
  ];
  const url = `https://www.cleanz24.com/best-laundry-drycleaning/service-in-${citySlug}`;

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
          url: 'https://www.cleanz24.com/assets/og-image.jpg',
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
      images: ['https://www.cleanz24.com/assets/og-image.jpg'],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.citySlug || '';
  // Strip known route prefixes before formatting the display name (P2 fix)
  const normalizedSlug = citySlug
    .replace(/^service-in-/, '')
    .replace(/^franchise-in-/, '');
  const formattedCity = normalizedSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const url = `https://www.cleanz24.com/best-laundry-drycleaning/service-in-${citySlug}`;

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
      <LocationDetail citySlug={citySlug} />
    </>
  );
}
