import React, { Suspense } from 'react';
import Membership from '../../../views/car-spa/Membership';

export const metadata = {
  title: "Car Wash Subscription & Membership Plans | Cleanz24",
  description: "Save up to 40% with Cleanz24 Car Spa monthly and annual wash memberships. Unlimited foam washes, interior detailing discounts, and priority booking.",
  keywords: ["car wash membership","detailing discount plans","yearly car spa packages"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/car-spa/membership",
  },
  openGraph: {
    type: 'website',
    title: "Car Wash Subscription & Membership Plans | Cleanz24",
    description: "Save up to 40% with Cleanz24 Car Spa monthly and annual wash memberships. Unlimited foam washes, interior detailing discounts, and priority booking.",
    url: "https://cleanz24.com/car-spa/membership",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_carspa.jpg",
        width: 1200,
        height: 630,
        alt: "Car Wash Subscription & Membership Plans | Cleanz24",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Wash Subscription & Membership Plans | Cleanz24",
    description: "Save up to 40% with Cleanz24 Car Spa monthly and annual wash memberships. Unlimited foam washes, interior detailing discounts, and priority booking.",
    images: ["https://cleanz24.com/logo_carspa.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <Membership  />
    </Suspense>
  );
}
