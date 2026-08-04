import React from 'react';
import AdminDashboard from '../../../../views/car-spa/AdminDashboard';

export const metadata = {
  title: 'Car Spa Admin Dashboard | Cleanz24',
  description: 'Admin Dashboard for Cleanz24 Car Spa Management',
  robots: { index: false, follow: false },
};

export default function CarSpaAdminDashboardPage() {
  return <AdminDashboard />;
}
