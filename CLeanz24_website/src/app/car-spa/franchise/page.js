import React, { Suspense } from 'react';
import CarSpaFranchise from '../../../views/car-spa/Franchise';

export const metadata = {
  title: "Car Spa Studio Franchise Opportunity in India | Cleanz24",
  description: "Invest in a lucrative Cleanz24 Car Spa & Auto Detailing franchise in India. High gross margins, complete machinery support, and marketing guidance.",
  keywords: ["car spa franchise India","car detailing franchise cost","automotive business opportunity"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/car-spa/franchise",
  },
  openGraph: {
    type: 'website',
    title: "Car Spa Studio Franchise Opportunity in India | Cleanz24",
    description: "Invest in a lucrative Cleanz24 Car Spa & Auto Detailing franchise in India. High gross margins, complete machinery support, and marketing guidance.",
    url: "https://cleanz24.com/car-spa/franchise",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_carspa.jpg",
        width: 1200,
        height: 630,
        alt: "Car Spa Studio Franchise Opportunity in India | Cleanz24",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Spa Studio Franchise Opportunity in India | Cleanz24",
    description: "Invest in a lucrative Cleanz24 Car Spa & Auto Detailing franchise in India. High gross margins, complete machinery support, and marketing guidance.",
    images: ["https://cleanz24.com/logo_carspa.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <CarSpaFranchise  />
    </Suspense>
  );
}
