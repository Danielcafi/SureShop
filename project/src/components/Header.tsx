import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, Mic, Bell } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotifications } from '../contexts/NotificationContext';
import MiniCart from './MiniCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const { unreadCount } = useNotifications();
  const searchRef = useRef<HTMLInputElement>(null);

  const totalCartItems = getTotalItems();
  const totalWishlistItems = wishlistItems.length;

  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Health & Beauty'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchActive(false);
    }
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    }
  };

  useEffect(() => {
    if (isSearchActive && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchActive]);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ShopPro</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6 ml-8">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap px-2 py-1 rounded-md hover:bg-gray-50"
              >
                {category}
              </Link>
            ))}
          </nav>

          {/* Tablet Navigation - Show fewer categories */}
          <nav className="hidden lg:flex xl:hidden items-center space-x-4 ml-6">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category}
                to={`/products/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap px-2 py-1 rounded-md hover:bg-gray-50"
              >
                {category}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-6 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-16 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <button
                type="button"
                onClick={startVoiceSearch}
                className={`absolute right-10 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                  isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Mobile Search */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsSearchActive(true)}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <button
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => navigate('/notifications')}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onMouseEnter={() => setShowMiniCart(true)}
              onMouseLeave={() => setShowMiniCart(false)}
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
              {showMiniCart && <MiniCart />}
            </button>

            {/* Account */}
            <Link
              to={isAuthenticated ? "/account" : "/login"}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
              {isAuthenticated && (
                <span className="hidden lg:block text-sm font-medium">{user?.name}</span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                  className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-center font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Mobile Search Overlay */}
        {isSearchActive && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={startVoiceSearch}
                className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                  isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsSearchActive(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Loyalty Points Banner */}
      {isAuthenticated && user && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-1 px-4 text-center text-sm">
          Welcome back, {user.name}! You have {user.loyaltyPoints} points ({user.tier} tier)
        </div>
      )}
    </header>
  );
};

export default Header;