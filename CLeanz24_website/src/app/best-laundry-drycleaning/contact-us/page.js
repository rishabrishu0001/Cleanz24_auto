import React, { Suspense } from 'react';
import Contact from '../../../views/laundry/Contact';

export const metadata = {
  title: "Contact Cleanz24 | Customer Support & Inquiry",
  description: "Get in touch with Cleanz24 team for laundry orders, customer support, feedback, or franchise partnerships. Call +91-9138004800 or email happy2helpu@cleanz24.com.",
  keywords: ["contact laundry","laundry customer support","Cleanz24 phone number","dry cleaner email"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning/contact-us",
  },
  openGraph: {
    type: 'website',
    title: "Contact Cleanz24 | Customer Support & Inquiry",
    description: "Get in touch with Cleanz24 team for laundry orders, customer support, feedback, or franchise partnerships. Call +91-9138004800 or email happy2helpu@cleanz24.com.",
    url: "https://cleanz24.com/best-laundry-drycleaning/contact-us",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Cleanz24 | Customer Support & Inquiry",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Cleanz24 | Customer Support & Inquiry",
    description: "Get in touch with Cleanz24 team for laundry orders, customer support, feedback, or franchise partnerships. Call +91-9138004800 or email happy2helpu@cleanz24.com.",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <Contact />
    </Suspense>
  );
}
