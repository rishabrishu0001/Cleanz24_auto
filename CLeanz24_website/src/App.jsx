import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

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
import CarSpaStores from './pages/car-spa/Stores';
// ─── Laundry Section ───────────────────────────────────────────
import LaundryLayout from './pages/laundry/LaundryLayout';
import LaundryHome from './pages/laundry/LaundryHome';
import LaundryServices from './pages/laundry/Services';
import ServiceDetailPage from './pages/laundry/ServiceDetailPage';
import LaundryFranchise from './pages/laundry/LaundryFrenchise';
import FranchiseCityPage from './pages/laundry/FranchiseCityPage';
import Stores from './pages/laundry/Stores';
import Contact from './pages/laundry/Contact';
import LaundryBlog from './pages/laundry/Blog';
import Locations from './pages/laundry/Locations';
import LocationDetail from './pages/laundry/LocationDetail';
import StoreDetail from './pages/laundry/StoreDetail';
import PrivacyPolicy from './pages/laundry/PrivacyPolicy';
import TermsOfService from './pages/laundry/TermsOfService';

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

  // Intercept clicks on links pointing to the current page to scroll to top smoothly
  useEffect(() => {
    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      try {
        const url = new URL(anchor.href, window.location.href);
        if (
          url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          !url.hash
        ) {
          const startPosition = window.pageYOffset;
          const duration = 800; // ms for a nice, rich smooth scroll
          let start = null;

          const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

          window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            
            window.scrollTo(0, startPosition * (1 - easeInOutCubic(progress)));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              window.scrollTo(0, 0);
            }
          });
        }
      } catch (_err) {
        // Ignore parsing errors for custom protocols like javascript: or mailto:
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

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
        <Route path="stores" element={<CarSpaStores />} />
      </Route>

      {/* ── Admin (outside CarSpaLayout, no header/footer) ── */}
      <Route path="/car-spa/admin" element={<AdminLogin />} />
      <Route path="/car-spa/admin/dashboard" element={
        <AdminRoute><AdminDashboard /></AdminRoute>
      } />

      {/* ── Locations & Store Central Directory ── */}
      <Route element={<LaundryLayout />}>
        <Route path="/locations" element={<Locations />} />
        <Route path="/store/:storeSlug" element={<StoreDetail />} />
      </Route>

      {/* ── Laundry Section ── */}
      <Route path="/laundry" element={<LaundryLayout />}>
        <Route index element={<LaundryHome />} />
        <Route path="services" element={<LaundryServices />} />
        <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
        <Route path="franchise" element={<LaundryFranchise />} />
        <Route path="franchise/:citySlug" element={<FranchiseCityPage />} />
        <Route path="stores" element={<Stores />} />
        <Route path="blog" element={<LaundryBlog />} />
        <Route path="blog/:slug" element={<LaundryBlog />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="about-us" element={<Navigate to="/laundry/services" replace />} />
        <Route path="store/:storeSlug" element={<StoreDetail />} />
        <Route path=":citySlug" element={<LocationDetail />} />
      </Route>

      {/* ── Top-Level Short Link & Legacy Sitelink Redirects ── */}
      <Route path="/stores" element={<Navigate to="/laundry/stores" replace />} />
      <Route path="/franchise" element={<Navigate to="/laundry/franchise" replace />} />
      <Route path="/best-laundry-franchise" element={<Navigate to="/laundry/franchise" replace />} />
      <Route path="/laundry-franchise" element={<Navigate to="/laundry/franchise" replace />} />
      <Route path="/car-spa-franchise" element={<Navigate to="/car-spa/franchise" replace />} />

      {/* ── Service-Specific Sitelinks & Legacy SEO URLs ── */}
      <Route path="/shoe-cleaning*" element={<Navigate to="/laundry/services/shoe-handbag-spa" replace />} />
      <Route path="/shoe-spa*" element={<Navigate to="/laundry/services/shoe-handbag-spa" replace />} />
      <Route path="/sneaker-cleaning*" element={<Navigate to="/laundry/services/shoe-handbag-spa" replace />} />
      <Route path="/bag-cleaning*" element={<Navigate to="/laundry/services/shoe-handbag-spa" replace />} />
      <Route path="/leather-care*" element={<Navigate to="/laundry/services/shoe-handbag-spa" replace />} />
      <Route path="/leather-cleaning*" element={<Navigate to="/laundry/services/shoe-handbag-spa" replace />} />

      <Route path="/steam-ironing*" element={<Navigate to="/laundry/services/steam-ironing" replace />} />
      <Route path="/steam-press*" element={<Navigate to="/laundry/services/steam-ironing" replace />} />
      <Route path="/ironing*" element={<Navigate to="/laundry/services/steam-ironing" replace />} />
      <Route path="/wash-and-iron*" element={<Navigate to="/laundry/services/steam-ironing" replace />} />

      <Route path="/dry-cleaning*" element={<Navigate to="/laundry/services/eco-friendly-dry-cleaning" replace />} />
      <Route path="/drycleaning*" element={<Navigate to="/laundry/services/eco-friendly-dry-cleaning" replace />} />
      <Route path="/dry-cleaner*" element={<Navigate to="/laundry/services/eco-friendly-dry-cleaning" replace />} />
      <Route path="/suit-cleaning*" element={<Navigate to="/laundry/services/eco-friendly-dry-cleaning" replace />} />
      <Route path="/saree-cleaning*" element={<Navigate to="/laundry/services/eco-friendly-dry-cleaning" replace />} />

      <Route path="/carpet-cleaning*" element={<Navigate to="/laundry/services/home-furnishing-cleaning" replace />} />
      <Route path="/curtain-cleaning*" element={<Navigate to="/laundry/services/home-furnishing-cleaning" replace />} />
      <Route path="/sofa-cleaning*" element={<Navigate to="/laundry/services/home-furnishing-cleaning" replace />} />
      <Route path="/blanket-cleaning*" element={<Navigate to="/laundry/services/home-furnishing-cleaning" replace />} />

      <Route path="/wash-and-fold*" element={<Navigate to="/laundry/services/premium-laundry" replace />} />

      <Route path="/commercial-cleaning-services-for-offices-retail-and-business*" element={<Navigate to="/laundry/services/commercial-laundry" replace />} />
      <Route path="/commercial-cleaning*" element={<Navigate to="/laundry/services/commercial-laundry" replace />} />
      <Route path="/contact-us" element={<Navigate to="/laundry/contact-us" replace />} />
      <Route path="/contact" element={<Navigate to="/laundry/contact-us" replace />} />
      <Route path="/services" element={<Navigate to="/laundry/services" replace />} />
      <Route path="/laundry-services" element={<Navigate to="/laundry/services" replace />} />
      <Route path="/best-laundry-drycleaning*" element={<Navigate to="/laundry/services" replace />} />
      <Route path="/best-laundry-and-dry-cleaning*" element={<Navigate to="/laundry/services" replace />} />
      <Route path="/carspa" element={<Navigate to="/car-spa" replace />} />
      <Route path="/car-spa-services" element={<Navigate to="/car-spa/services" replace />} />
      <Route path="/car-spa-book" element={<Navigate to="/car-spa/book" replace />} />
      <Route path="/book" element={<Navigate to="/car-spa/book" replace />} />
      <Route path="/blog" element={<Navigate to="/laundry/blog" replace />} />
      <Route path="/blog/:slug" element={<Navigate to="/laundry/blog" replace />} />
      <Route path="/about" element={<Navigate to="/laundry/services" replace />} />
      <Route path="/about-us" element={<Navigate to="/laundry/services" replace />} />
      <Route path="/privacy-policy" element={<Navigate to="/laundry/privacy-policy" replace />} />
      <Route path="/terms-of-service" element={<Navigate to="/laundry/terms-of-service" replace />} />

      {/* ── Wildcard Catch-All Fallback (prevents broken/blank 404 pages) ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;