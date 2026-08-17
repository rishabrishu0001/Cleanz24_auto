import React from 'react';
import LaundryClientLayout from './LaundryClientLayout';

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
    canonical: 'https://cleanz24.com/best-laundry-drycleaning',
  },
  openGraph: {
    type: 'website',
    title: 'Best Laundry & Dry Cleaning Studio | Cleanz24',
    description: 'Cleanz24 provides eco-friendly dry cleaning, shoe spa, steam ironing, and commercial laundry services across 100+ locations in India.',
    url: 'https://cleanz24.com/best-laundry-drycleaning',
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cleanz24.com/logo_laundry.jpg',
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
    images: ['https://cleanz24.com/logo_laundry.jpg'],
  },
};

export default function LaundryLayout({ children }) {
  return (
    <LaundryClientLayout>
      {children}
    </LaundryClientLayout>
  );
}
