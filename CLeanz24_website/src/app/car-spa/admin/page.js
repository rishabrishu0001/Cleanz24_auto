import React from 'react';
import AdminLogin from '../../../views/car-spa/AdminLogin';

export const metadata = {
  title: 'Car Spa Admin Login | Cleanz24',
  description: 'Admin Portal Login for Cleanz24 Car Spa Management',
  robots: { index: false, follow: false },
};

export default function CarSpaAdminLoginPage() {
  return <AdminLogin />;
}
