import React from 'react';
import LaundryClientLayout from '../best-laundry-drycleaning/LaundryClientLayout';

export default function Layout({ children }) {
  return (
    <LaundryClientLayout>
      {children}
    </LaundryClientLayout>
  );
}
