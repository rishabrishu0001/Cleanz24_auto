import React from 'react';
import CarSpaClientLayout from './CarSpaClientLayout';

export const metadata = {
  title: 'Cleanz24 Car Spa Studio | Master Auto Detailing, Ceramic Coating & PPF',
  description: 'Experience India’s finest Car Spa Studio by Cleanz24. Premium foam wash, interior deep cleaning, 9H ceramic coating, paint protection film (PPF), and paint restoration.',
  alternates: {
    canonical: 'https://cleanz24.com/car-spa',
  },
};

export default function CarSpaLayout({ children }) {
  return (
    <CarSpaClientLayout>
      {children}
    </CarSpaClientLayout>
  );
}
