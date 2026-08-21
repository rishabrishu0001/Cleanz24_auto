import React, { Suspense } from 'react';
import Services from '../../../views/car-spa/Services';

export const metadata = {
  title: "Car Spa & Detailing Services | Cleanz24 Studio",
  description: "Explore Car Spa services: Foam wash, ceramic coating, paint protection film (PPF), interior deep cleaning, windshield rain repellent, and engine bay detailing.",
  keywords: ["car foam wash","interior car cleaning","paint correction","ceramic coating","car detailing packages"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://www.cleanz24.com/car-spa/services",
  },
  openGraph: {
    type: 'website',
    title: "Car Spa & Detailing Services | Cleanz24 Studio",
    description: "Explore Car Spa services: Foam wash, ceramic coating, paint protection film (PPF), interior deep cleaning, windshield rain repellent, and engine bay detailing.",
    url: "https://www.cleanz24.com/car-spa/services",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://www.cleanz24.com/logo_carspa.jpg",
        width: 1200,
        height: 630,
        alt: "Car Spa & Detailing Services | Cleanz24 Studio",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Spa & Detailing Services | Cleanz24 Studio",
    description: "Explore Car Spa services: Foam wash, ceramic coating, paint protection film (PPF), interior deep cleaning, windshield rain repellent, and engine bay detailing.",
    images: ["https://www.cleanz24.com/logo_carspa.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <Services  />
    </Suspense>
  );
}
