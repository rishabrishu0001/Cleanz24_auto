import React, { Suspense } from 'react';
import CarSpaBlog from '../../../views/car-spa/CarSpaBlog';

export const metadata = {
  title: "Car Detailing & Maintenance Guides | Cleanz24 Car Spa Blog",
  description: "Learn car care tips, ceramic coating vs PPF comparisons, interior deep cleaning advice, and vehicle maintenance guides from Cleanz24 auto detailing experts.",
  keywords: ["car care tips","ceramic coating guide","PPF maintenance","car detailing blog"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://www.cleanz24.com/car-spa/blog",
  },
  openGraph: {
    type: 'website',
    title: "Car Detailing & Maintenance Guides | Cleanz24 Car Spa Blog",
    description: "Learn car care tips, ceramic coating vs PPF comparisons, interior deep cleaning advice, and vehicle maintenance guides from Cleanz24 auto detailing experts.",
    url: "https://www.cleanz24.com/car-spa/blog",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://www.cleanz24.com/logo_carspa.jpg",
        width: 1200,
        height: 630,
        alt: "Car Detailing & Maintenance Guides | Cleanz24 Car Spa Blog",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Detailing & Maintenance Guides | Cleanz24 Car Spa Blog",
    description: "Learn car care tips, ceramic coating vs PPF comparisons, interior deep cleaning advice, and vehicle maintenance guides from Cleanz24 auto detailing experts.",
    images: ["https://www.cleanz24.com/logo_carspa.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <CarSpaBlog  />
    </Suspense>
  );
}
