import React from 'react';
import LaundryClientLayout from './LaundryClientLayout';

export const metadata = {
  title: 'Best Laundry & Dry Cleaning Studio | Cleanz24',
  description: 'Cleanz24 provides eco-friendly dry cleaning, shoe spa, steam ironing, and commercial laundry services across 100+ locations in India.',
  alternates: {
    canonical: 'https://cleanz24.com/best-laundry-drycleaning',
  },
};

export default function LaundryLayout({ children }) {
  return (
    <LaundryClientLayout>
      {children}
    </LaundryClientLayout>
  );
}
