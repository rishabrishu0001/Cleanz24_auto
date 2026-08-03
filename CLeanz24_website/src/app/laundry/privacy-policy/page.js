import React, { Suspense } from 'react';
import PrivacyPolicy from '../../../views/laundry/PrivacyPolicy';

export const metadata = {
  title: "Privacy Policy | Cleanz24",
  description: "Cleanz24 Privacy Policy — Learn how we collect, use, protect, and safeguard your personal information when using our laundry & car spa services.",
  keywords: ["privacy policy","Cleanz24 privacy","data protection policy"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/laundry/privacy-policy",
  },
  openGraph: {
    type: 'website',
    title: "Privacy Policy | Cleanz24",
    description: "Cleanz24 Privacy Policy — Learn how we collect, use, protect, and safeguard your personal information when using our laundry & car spa services.",
    url: "https://cleanz24.com/laundry/privacy-policy",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy | Cleanz24",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Privacy Policy | Cleanz24",
    description: "Cleanz24 Privacy Policy — Learn how we collect, use, protect, and safeguard your personal information when using our laundry & car spa services.",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <PrivacyPolicy  />
    </Suspense>
  );
}
