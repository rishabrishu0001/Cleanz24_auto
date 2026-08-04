import React, { Suspense } from 'react';
import FranchiseCityPage from '../../../../views/laundry/FranchiseCityPage';
import { FRANCHISE_CITIES } from '../../../../data/franchiseCities';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.citySlug;
  const citiesList = Array.isArray(FRANCHISE_CITIES) ? FRANCHISE_CITIES : [];
  const item = citiesList.find((c) => c && c.slug === citySlug);

  const cityName = item ? item.city : (citySlug ? citySlug.replace(/-/g, ' ').toUpperCase() : 'India');
  const stateName = item ? item.state : 'India';

  const title = `Best Laundry Franchise in ${cityName}, ${stateName} | Cleanz24 Studio`;
  const description = `Own a successful Cleanz24 Premium Laundry & Dry Cleaning Franchise in ${cityName}, ${stateName}. Low investment, high returns, and full setup assistance.`;
  const url = `https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities/${citySlug}`;

  return {
    title,
    description,
    keywords: [
      `laundry franchise in ${cityName}`,
      `dry cleaning franchise ${cityName}`,
      `Cleanz24 franchise ${cityName}`,
      `laundry business opportunity ${cityName}`,
    ],
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
          url: 'https://cleanz24.com/logo_laundry.jpg',
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
      images: ['https://cleanz24.com/logo_laundry.jpg'],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <FranchiseCityPage citySlug={resolvedParams?.citySlug} />
    </Suspense>
  );
}
