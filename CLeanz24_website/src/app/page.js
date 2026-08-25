import React from 'react';
import LandingPage from '../views/LandingPage';

export const metadata = {
  title: "Cleanz24 — India’s Leading Premium Laundry & Car Spa Studio",
  description: "Cleanz24 offers professional garment dry cleaning, shoe spa, steam press, and master car spa detailing services across 100+ studios in India.",
  keywords: ["laundry franchise India","dry cleaning studio","shoe cleaning","steam ironing","premium laundry","Cleanz24","car spa studio","ceramic coating","PPF","laundry near me"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://www.cleanz24.com",
  },
  openGraph: {
    type: 'website',
    title: "Cleanz24 — India’s Leading Premium Laundry & Car Spa Studio",
    description: "Cleanz24 offers professional garment dry cleaning, shoe spa, steam press, and master car spa detailing services across 100+ studios in India.",
    url: "https://www.cleanz24.com",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://www.cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Cleanz24 — India’s Leading Premium Laundry & Car Spa Studio",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cleanz24 — India’s Leading Premium Laundry & Car Spa Studio",
    description: "Cleanz24 offers professional garment dry cleaning, shoe spa, steam press, and master car spa detailing services across 100+ studios in India.",
    images: ["https://www.cleanz24.com/logo_laundry.jpg"],
  },
};

export default function HomePage() {
  return <LandingPage />;
}
