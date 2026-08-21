import React, { Suspense } from 'react';
import CarSpaStores from '../../../views/car-spa/Stores';

export const metadata = {
  title: "Find Car Spa & Detailing Studios Near You | Cleanz24",
  description: "Locate Cleanz24 Car Spa Studios near you for professional car washing, ceramic coating, and interior detailing.",
  keywords: ["car detailing studio near me","car wash outlet","PPF shop near me","Cleanz24 car spa locator"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://www.cleanz24.com/car-spa/stores",
  },
  openGraph: {
    type: 'website',
    title: "Find Car Spa & Detailing Studios Near You | Cleanz24",
    description: "Locate Cleanz24 Car Spa Studios near you for professional car washing, ceramic coating, and interior detailing.",
    url: "https://www.cleanz24.com/car-spa/stores",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://www.cleanz24.com/logo_carspa.jpg",
        width: 1200,
        height: 630,
        alt: "Find Car Spa & Detailing Studios Near You | Cleanz24",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Find Car Spa & Detailing Studios Near You | Cleanz24",
    description: "Locate Cleanz24 Car Spa Studios near you for professional car washing, ceramic coating, and interior detailing.",
    images: ["https://www.cleanz24.com/logo_carspa.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <CarSpaStores  />
    </Suspense>
  );
}
