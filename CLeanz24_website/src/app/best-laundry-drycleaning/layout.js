import React from 'react';
import Header from '../../views/laundry/components/LaundryHeader';
import Footer from '../../views/laundry/components/LaundryFooter';
import '../../styles/laundry.css';

export const metadata = {
  title: 'Best Laundry & Dry Cleaning Studio | Cleanz24',
  description: 'Cleanz24 provides eco-friendly dry cleaning, shoe spa, steam ironing, and commercial laundry services across 100+ locations in India.',
  keywords: [
    'laundry near me',
    'dry cleaners near me',
    'best dry cleaning',
    'steam iron',
    'shoe cleaning service',
    'Cleanz24 laundry',
  ],
  alternates: {
    canonical: 'https://www.cleanz24.com/best-laundry-drycleaning',
  },
  openGraph: {
    type: 'website',
    title: 'Best Laundry & Dry Cleaning Studio | Cleanz24',
    description: 'Cleanz24 provides eco-friendly dry cleaning, shoe spa, steam ironing, and commercial laundry services across 100+ locations in India.',
    url: 'https://www.cleanz24.com/best-laundry-drycleaning',
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: 'https://www.cleanz24.com/logo_laundry.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleanz24 — Best Laundry & Dry Cleaning Studio in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Laundry & Dry Cleaning Studio | Cleanz24',
    description: 'Cleanz24 provides eco-friendly dry cleaning, shoe spa, steam ironing, and commercial laundry services across 100+ locations in India.',
    images: ['https://www.cleanz24.com/logo_laundry.jpg'],
  },
};

export default function LaundryLayout({ children }) {
  return (
    <div className="laundry-app d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
