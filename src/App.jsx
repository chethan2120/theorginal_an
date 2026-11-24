import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import SpicesPage from './pages/SpicesPage';
import DryFruitsPage from './pages/DryFruitsPage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import FaqPage from './pages/FaqPage';
import { ShippingPolicyPage, ReturnsPolicyPage, PrivacyPolicyPage, TermsPage } from './pages/PolicyPages';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <NotificationProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#1A202C]">
              {/* Luxury Navigation Bar */}
              <Navbar />

              {/* Main Page Body */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/spices" element={<SpicesPage />} />
                  <Route path="/dry-fruits" element={<DryFruitsPage />} />
                  <Route path="/collections" element={<CollectionsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/faqs" element={<FaqPage />} />
                  <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                  <Route path="/returns-policy" element={<ReturnsPolicyPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  {/* Catch-all 404 */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>

              {/* Global Cart Slide-Over Drawer */}
              <CartDrawer />

              {/* Brand Footer */}
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </NotificationProvider>
  );
}
