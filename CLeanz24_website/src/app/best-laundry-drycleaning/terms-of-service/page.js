import React, { Suspense } from 'react';
import TermsOfService from '../../../views/laundry/TermsOfService';

export const metadata = {
  title: "Terms of Service | Cleanz24",
  description: "Cleanz24 Terms of Service — Read the terms and conditions governing garment care, order pickup/delivery, payments, and service usage.",
  keywords: ["laundry terms","Cleanz24 terms","laundry service conditions"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning/terms-of-service",
  },
  openGraph: {
    type: 'website',
    title: "Terms of Service | Cleanz24",
    description: "Cleanz24 Terms of Service — Read the terms and conditions governing garment care, order pickup/delivery, payments, and service usage.",
    url: "https://cleanz24.com/best-laundry-drycleaning/terms-of-service",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Terms of Service | Cleanz24",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Terms of Service | Cleanz24",
    description: "Cleanz24 Terms of Service — Read the terms and conditions governing garment care, order pickup/delivery, payments, and service usage.",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <TermsOfService  />
    </Suspense>
  );
}
