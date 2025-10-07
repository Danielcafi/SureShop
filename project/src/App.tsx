import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutPageNew from './pages/CheckoutPageNew';
import AccountPage from './pages/AccountPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import SearchPage from './pages/SearchPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ReturnsRefundsPage from './pages/ReturnsRefundsPage';
import ShippingInfoPage from './pages/ShippingInfoPage';
import SizeGuidePage from './pages/SizeGuidePage';
import TrackOrderPage from './pages/TrackOrderPage';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ChatProvider } from './contexts/ChatContext';
import { initializeStripe } from './services/paymentService';
import GlobalChatModal from './components/GlobalChatModal';
import NotificationsPage from './pages/NotificationsPage';
import ChatBot from './components/ChatBot';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const stripePromise = initializeStripe();

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <NotificationProvider>
              <ChatProvider>
              <Elements stripe={stripePromise}>
              <Router>
                <ScrollToTop />
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main className="pt-20">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductListingPage />} />
                      <Route path="/products/:category" element={<ProductListingPage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/account" element={<AccountPage />} />
                      <Route path="/orders" element={<OrdersPage />} />
                      <Route path="/orders/:id" element={<OrderDetailPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/careers" element={<CareersPage />} />
                      <Route path="/press" element={<PressPage />} />
                      <Route path="/help" element={<HelpCenterPage />} />
                      <Route path="/returns" element={<ReturnsRefundsPage />} />
                      <Route path="/shipping" element={<ShippingInfoPage />} />
                      <Route path="/size-guide" element={<SizeGuidePage />} />
                      <Route path="/track-order" element={<TrackOrderPage />} />
                      <Route path="/notifications" element={<NotificationsPage />} />
                    </Routes>
                  </main>
                  <Footer />
                  <GlobalChatModal />
                  <ChatBot />
                </div>
              </Router>
              </Elements>
              </ChatProvider>
            </NotificationProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;