import React, { Suspense } from 'react';
import LaundryFranchise from '../../../views/laundry/LaundryFrenchise';

export const metadata = {
  title: "Best Laundry Franchise Opportunity in India 2026 | Cleanz24 Franchise",
  description: "Start a highly profitable Cleanz24 Laundry & Dry Clean Studio franchise in India. Low investment starting from ₹13 Lakhs, high ROI, complete setup & technical support.",
  keywords: ["laundry franchise cost","dry cleaning franchise India","franchise business opportunity","Cleanz24 franchise"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities",
  },
  openGraph: {
    type: 'website',
    title: "Best Laundry Franchise Opportunity in India 2026 | Cleanz24 Franchise",
    description: "Start a highly profitable Cleanz24 Laundry & Dry Clean Studio franchise in India. Low investment starting from ₹13 Lakhs, high ROI, complete setup & technical support.",
    url: "https://cleanz24.com/best-laundry-drycleaning/franchise-opportunities",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Best Laundry Franchise Opportunity in India 2026 | Cleanz24 Franchise",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best Laundry Franchise Opportunity in India 2026 | Cleanz24 Franchise",
    description: "Start a highly profitable Cleanz24 Laundry & Dry Clean Studio franchise in India. Low investment starting from ₹13 Lakhs, high ROI, complete setup & technical support.",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <LaundryFranchise  />
    </Suspense>
  );
}
