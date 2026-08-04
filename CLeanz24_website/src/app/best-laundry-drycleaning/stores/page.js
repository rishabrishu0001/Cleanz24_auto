import React, { Suspense } from 'react';
import Stores from '../../../views/laundry/Stores';

export const metadata = {
  title: "Find Laundry & Dry Cleaning Studios Near You | Cleanz24 Store Directory",
  description: "Locate 100+ Cleanz24 Premium Laundry & Dry Clean Studios across 17+ states in India. Find address, phone numbers, working hours, and services near you.",
  keywords: ["laundry outlets","dry cleaners locator","laundry studios list","laundry franchise locations"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning/stores",
  },
  openGraph: {
    type: 'website',
    title: "Find Laundry & Dry Cleaning Studios Near You | Cleanz24 Store Directory",
    description: "Locate 100+ Cleanz24 Premium Laundry & Dry Clean Studios across 17+ states in India. Find address, phone numbers, working hours, and services near you.",
    url: "https://cleanz24.com/best-laundry-drycleaning/stores",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Find Laundry & Dry Cleaning Studios Near You | Cleanz24 Store Directory",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Find Laundry & Dry Cleaning Studios Near You | Cleanz24 Store Directory",
    description: "Locate 100+ Cleanz24 Premium Laundry & Dry Clean Studios across 17+ states in India. Find address, phone numbers, working hours, and services near you.",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <Stores  />
    </Suspense>
  );
}
