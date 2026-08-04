import React, { Suspense } from 'react';
import Services from '../../../views/laundry/Services';

export const metadata = {
  title: "Laundry & Dry Cleaning Services | Cleanz24",
  description: "Explore Cleanz24 services: Eco-friendly dry cleaning, premium laundry wash & fold, steam ironing, shoe & handbag spa, home furnishing, and commercial laundry.",
  keywords: ["dry cleaning services","steam ironing service","shoe cleaning","bag cleaning","premium laundry wash"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning/services",
  },
  openGraph: {
    type: 'website',
    title: "Laundry & Dry Cleaning Services | Cleanz24",
    description: "Explore Cleanz24 services: Eco-friendly dry cleaning, premium laundry wash & fold, steam ironing, shoe & handbag spa, home furnishing, and commercial laundry.",
    url: "https://cleanz24.com/best-laundry-drycleaning/services",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Laundry & Dry Cleaning Services | Cleanz24",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Laundry & Dry Cleaning Services | Cleanz24",
    description: "Explore Cleanz24 services: Eco-friendly dry cleaning, premium laundry wash & fold, steam ironing, shoe & handbag spa, home furnishing, and commercial laundry.",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <Services  />
    </Suspense>
  );
}
