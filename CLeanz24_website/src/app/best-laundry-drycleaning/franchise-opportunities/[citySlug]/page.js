import React, { Suspense } from 'react';
import FranchiseCityPage from '../../../../views/laundry/FranchiseCityPage';
import { FRANCHISE_CITIES } from '../../../../data/franchiseCities';

export async function generateStaticParams() {
  const citiesList = Array.isArray(FRANCHISE_CITIES) ? FRANCHISE_CITIES : [];
  return citiesList.map((c) => ({
    citySlug: c.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.citySlug;
  const citiesList = Array.isArray(FRANCHISE_CITIES) ? FRANCHISE_CITIES : [];
  const item = citiesList.find((c) => c && c.slug === citySlug);

  const cityName = item ? item.city : (citySlug ? citySlug.replace(/-/g, ' ').toUpperCase() : 'India');
  const stateName = item ? item.state : 'India';

  const title = `Best Laundry & Dry Cleaning Franchise in ${cityName}, ${stateName} | Cleanz24 Studio`;
  const description = `Start a highly profitable Cleanz24 Laundry & Dry Cleaning Franchise in ${cityName}, ${stateName}. Complete store setup, modern machinery, branding & operational support. Enquire now!`;
  const url = `https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}`;

  return {
    title,
    description,
    keywords: [
      `laundry franchise in ${cityName}`,
      `dry cleaning franchise ${cityName}`,
      `best franchise opportunity in ${cityName}`,
      `profitable business in ${cityName}`,
      `laundry service near me ${cityName}`,
      `best laundry service ${cityName}`,
      `dry cleaning service near me ${cityName}`,
      `Cleanz24 franchise ${cityName}`,
      `low investment franchise ${cityName}`,
      `laundry business ${cityName}`,
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
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
          url: 'https://cleanz24.com/assets/store_hero.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://cleanz24.com/assets/store_hero.jpg'],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.citySlug || '';
  return <FranchiseCityPage citySlug={citySlug} />;
}
