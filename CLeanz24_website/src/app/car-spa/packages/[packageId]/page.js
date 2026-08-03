import React, { Suspense } from 'react';
import PackageDetails from '../../../../views/car-spa/PackageDetails';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const packageId = resolvedParams?.packageId;
  const packageName = packageId ? packageId.replace(/-/g, ' ').toUpperCase() : 'Car Spa Package';

  const title = `${packageName} Detailing Package | Cleanz24 Car Spa Studio`;
  const description = `Discover ${packageName} detailing service inclusions, pricing, duration, and warranty options at Cleanz24 Car Spa Studio.`;
  const url = `https://cleanz24.com/car-spa/packages/${packageId}`;

  return {
    title,
    description,
    keywords: [
      `${packageName} package`,
      'car wash package',
      'car spa detailing packages',
      'paint correction price',
      'Cleanz24 car spa',
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
          url: 'https://cleanz24.com/logo_carspa.jpg',
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
      images: ['https://cleanz24.com/logo_carspa.jpg'],
    },
  };
}

export default async function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <PackageDetails  />
    </Suspense>
  );
}
