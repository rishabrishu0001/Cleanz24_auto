import React, { Suspense } from 'react';
import LaundryBlog from '../../../views/laundry/Blog';

export const metadata = {
  title: "Laundry & Garment Care Guides, Tips & Insights | Cleanz24 Blog",
  description: "Explore laundry tips, eco-friendly dry cleaning guides, garment care secrets, and franchise business investment articles from Cleanz24 experts.",
  keywords: ["laundry tips","fabric care guide","stain removal hacks","dry cleaning blog"],
  robots: 'index, follow',
  alternates: {
    canonical: "https://cleanz24.com/best-laundry-drycleaning/blog",
  },
  openGraph: {
    type: 'website',
    title: "Laundry & Garment Care Guides, Tips & Insights | Cleanz24 Blog",
    description: "Explore laundry tips, eco-friendly dry cleaning guides, garment care secrets, and franchise business investment articles from Cleanz24 experts.",
    url: "https://cleanz24.com/best-laundry-drycleaning/blog",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: "https://cleanz24.com/logo_laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Laundry & Garment Care Guides, Tips & Insights | Cleanz24 Blog",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Laundry & Garment Care Guides, Tips & Insights | Cleanz24 Blog",
    description: "Explore laundry tips, eco-friendly dry cleaning guides, garment care secrets, and franchise business investment articles from Cleanz24 experts.",
    images: ["https://cleanz24.com/logo_laundry.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <LaundryBlog  />
    </Suspense>
  );
}
