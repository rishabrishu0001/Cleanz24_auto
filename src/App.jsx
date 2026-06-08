import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// ─── Landing Page ──────────────────────────────────────────────
import LandingPage from './pages/LandingPage';

// ─── Car Spa Section ───────────────────────────────────────────
import CarSpaLayout from './pages/car-spa/CarSpaLayout';
import CarSpaHome from './pages/car-spa/CarSpaHome';
import Services from './pages/car-spa/Services';
import Book from './pages/car-spa/Book';
import CarSpaFranchise from './pages/car-spa/Franchise';
import PackageDetails from './pages/car-spa/PackageDetails';
import Membership from './pages/car-spa/Membership';
import Payment from './pages/car-spa/Payment';
import AdminLogin from './pages/car-spa/AdminLogin';
import AdminDashboard from './pages/car-spa/AdminDashboard';
import AdminRoute from './pages/car-spa/AdminRoute';
import CarSpaBlog from './pages/car-spa/CarSpaBlog';
// ─── Laundry Section ───────────────────────────────────────────
import LaundryLayout from './pages/laundry/LaundryLayout';
import LaundryHome from './pages/laundry/LaundryHome';
import LaundryServices from './pages/laundry/Services';



import LaundryFranchise from './pages/laundry/LaundryFrenchise';
import Stores from './pages/laundry/Stores';
import Contact from './pages/laundry/Contact';
import LaundryBlog from './pages/laundry/Blog';
import Locations from './pages/laundry/Locations';
import LocationDetail from './pages/laundry/LocationDetail';

/**
 * App — Central Router Configuration
 *
 * Route structure:
 *   /                → LandingPage (no header/footer, split-screen animation)
 *   /car-spa         → CarSpaLayout > CarSpaHome  (dark theme)
 *   /car-spa/...     → CarSpaLayout > respective page
 *   /laundry         → LaundryLayout > LaundryHome  (white/blue theme)
 *   /laundry/...     → LaundryLayout > respective page
 */
function App() {
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* ── Landing Page ── */}
      <Route path="/" element={<LandingPage />} />

      {/* ── Car Spa Section ── */}
      <Route path="/car-spa" element={<CarSpaLayout />}>
        <Route index element={<CarSpaHome />} />
        <Route path="services" element={<Services />} />
        <Route path="packages/:packageId" element={<PackageDetails />} />
        <Route path="book" element={<Book />} />
        <Route path="membership" element={<Membership />} />
        <Route path="payment" element={<Payment />} />
        <Route path="franchise" element={<CarSpaFranchise />} />
        <Route path="blog" element={<CarSpaBlog />} />
        <Route path="blog/:slug" element={<CarSpaBlog />} />
      </Route>

      {/* ── Admin (outside CarSpaLayout, no header/footer) ── */}
      <Route path="/car-spa/admin" element={<AdminLogin />} />
      <Route path="/car-spa/admin/dashboard" element={
        <AdminRoute><AdminDashboard /></AdminRoute>
      } />

      {/* ── Locations Central Directory ── */}
      <Route element={<LaundryLayout />}>
        <Route path="/locations" element={<Locations />} />
      </Route>

      {/* ── Laundry Section ── */}
      <Route path="/laundry" element={<LaundryLayout />}>
        <Route index element={<LaundryHome />} />
        <Route path="services" element={<LaundryServices />} />
        <Route path="franchise" element={<LaundryFranchise />} />
        <Route path="stores" element={<Stores />} />
        <Route path="blog" element={<LaundryBlog />} />
        <Route path="blog/:slug" element={<LaundryBlog />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path=":citySlug" element={<LocationDetail />} />
      </Route>
    </Routes>
  );
}

export default App;