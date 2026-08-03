import React, { Suspense } from 'react';
import Book from '../../../views/car-spa/Book';

export const metadata = {
  title: "Book Car Spa Wash & Detailing Online | Cleanz24",
  description: "Book your car wash, ceramic coating, or detailing session online with Cleanz24. Pick your vehicle type, service package, and nearest studio.",
  keywords: ["schedule car wash","book detailing appointment","online car spa booking"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/car-spa/book",
  },
  openGraph: {
    type: 'website',
    title: "Book Car Spa Wash & Detailing Online | Cleanz24",
    description: "Book your car wash, ceramic coating, or detailing session online with Cleanz24. Pick your vehicle type, service package, and nearest studio.",
    url: "https://cleanz24.com/car-spa/book",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_carspa.jpg",
        width: 1200,
        height: 630,
        alt: "Book Car Spa Wash & Detailing Online | Cleanz24",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Book Car Spa Wash & Detailing Online | Cleanz24",
    description: "Book your car wash, ceramic coating, or detailing session online with Cleanz24. Pick your vehicle type, service package, and nearest studio.",
    images: ["https://cleanz24.com/logo_carspa.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <Book  />
    </Suspense>
  );
}
