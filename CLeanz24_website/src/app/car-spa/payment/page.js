import React, { Suspense } from 'react';
import Payment from '../../../views/car-spa/Payment';

export const metadata = {
  title: "Secure Online Payment | Cleanz24 Car Spa",
  description: "Complete your booking payment securely for Cleanz24 Car Spa services via UPI, Credit/Debit cards, or NetBanking.",
  keywords: ["car wash payment","book car detailing online","Cleanz24 checkout"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/car-spa/payment",
  },
  openGraph: {
    type: 'website',
    title: "Secure Online Payment | Cleanz24 Car Spa",
    description: "Complete your booking payment securely for Cleanz24 Car Spa services via UPI, Credit/Debit cards, or NetBanking.",
    url: "https://cleanz24.com/car-spa/payment",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_carspa.jpg",
        width: 1200,
        height: 630,
        alt: "Secure Online Payment | Cleanz24 Car Spa",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Secure Online Payment | Cleanz24 Car Spa",
    description: "Complete your booking payment securely for Cleanz24 Car Spa services via UPI, Credit/Debit cards, or NetBanking.",
    images: ["https://cleanz24.com/logo_carspa.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <Payment  />
    </Suspense>
  );
}
