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

// ─── Laundry Section ───────────────────────────────────────────
import LaundryLayout from './pages/laundry/LaundryLayout';
import LaundryHome from './pages/laundry/LaundryHome';
import About from './pages/laundry/About';
import LaundryServices from './pages/laundry/LaundryServices';
import DryCleaning from './pages/laundry/DryCleaning';
import HomeCleaning from './pages/laundry/HomeCleaning';
import SteamIroning from './pages/laundry/SteamIroning';
import ShoeCleaning from './pages/laundry/ShoeCleaning';
import LaundryFranchise from './pages/laundry/Franchise';
import Stores from './pages/laundry/Stores';
import Contact from './pages/laundry/Contact';
import Placeholder from './pages/laundry/Placeholder';

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
        <Route path="franchise" element={<CarSpaFranchise />} />
      </Route>

      {/* ── Laundry Section ── */}
      <Route path="/laundry" element={<LaundryLayout />}>
        <Route index element={<LaundryHome />} />
        <Route path="about-us" element={<About />} />
        <Route path="services" element={<LaundryServices />} />
        <Route path="dry-cleaning" element={<DryCleaning />} />
        <Route path="home-cleaning" element={<HomeCleaning />} />
        <Route path="steam-ironing" element={<SteamIroning />} />
        <Route path="shoe-cleaning" element={<ShoeCleaning />} />
        <Route path="franchise" element={<LaundryFranchise />} />
        <Route path="stores" element={<Stores />} />
        <Route path="blog" element={<Placeholder title="Blog" />} />
        <Route path="contact-us" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;