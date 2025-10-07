import React, { useState } from 'react';
import { Search, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Phone, Mail, RefreshCw } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { trackOrderByNumberAndEmail, trackOrderByTrackingNumber, TrackedOrder } from '../services/trackingService';

interface TrackingEvent {
  id: number;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchMethod, setSearchMethod] = useState('order');
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { openChat } = useChat();


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setHasSearched(true);
    
    try {
      let result;
      
      if (searchMethod === 'order') {
        // Search by order number and email
        if (!orderNumber.trim() || !email.trim()) {
          setError('Please enter both order number and email address.');
          setIsLoading(false);
          return;
        }
        
        result = await trackOrderByNumberAndEmail(orderNumber.trim(), email.trim());
      } else {
        // Search by tracking number
        if (!trackingNumber.trim()) {
          setError('Please enter a tracking number.');
          setIsLoading(false);
          return;
        }
        
        result = await trackOrderByTrackingNumber(trackingNumber.trim());
      }
      
      if (result.success && result.order) {
        setOrder(result.order);
        setError('');
      } else {
        setError(result.message || 'An error occurred while tracking your order.');
        setOrder(null);
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      setError('An unexpected error occurred. Please try again.');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in transit':
        return 'text-blue-600 bg-blue-100';
      case 'out for delivery':
        return 'text-purple-600 bg-purple-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return CheckCircle;
      case 'in transit':
        return Truck;
      case 'out for delivery':
        return Package;
      case 'processing':
        return Clock;
      default:
        return Package;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Track Your Order</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Get real-time updates on your order status and delivery progress.
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Track Your Package</h2>
              <p className="text-gray-600">Enter your order information to get tracking details</p>
            </div>

            {/* Search Method Tabs */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <button
                onClick={() => setSearchMethod('order')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  searchMethod === 'order'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Order Number
              </button>
              <button
                onClick={() => setSearchMethod('tracking')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  searchMethod === 'tracking'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tracking Number
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              {searchMethod === 'order' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Order Number *
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., SP-2024-001234"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Must match the email used when placing the order
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Number *
                  </label>
                  <input
                    type="text"
                    id="trackingNumber"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 1Z999AA1234567890"
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}


              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* No Orders Found */}
      {hasSearched && !order && !isLoading && (
        <div className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any orders matching your search criteria. Please check your information and try again.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  <strong>Need help?</strong> Contact our support team for assistance.
                </p>
                <button 
                  onClick={openChat}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details */}
      {order && (
        <div className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-medium">{order.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    {order.trackingNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tracking Number:</span>
                        <span className="font-medium text-blue-600">{order.trackingNumber}</span>
                      </div>
                    )}
                    {order.estimatedDelivery && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Delivery:</span>
                        <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                      </div>
                    )}
                    {order.carrier && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Carrier:</span>
                        <span className="font-medium">{order.carrier}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Items</h3>
                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img
                          src={item.product.imageUrl || 'https://via.placeholder.com/48'}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{item.product.name}</div>
                          <div className="text-gray-500 text-sm">Qty: {item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h3>
                  
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                    
                    <div className="space-y-8">
                      {order.trackingEvents.map((event, index) => {
                        const StatusIcon = getStatusIcon(event.status);
                        const isCompleted = event.isCompleted;
                        
                        return (
                          <div key={event.id} className="relative flex items-start space-x-4">
                            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                              isCompleted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                              <StatusIcon className="w-6 h-6" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className={`text-lg font-semibold ${
                                  isCompleted ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                  {event.status}
                                </h4>
                                {event.timestamp && (
                                  <span className="text-sm text-gray-500">
                                    {new Date(event.timestamp).toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <p className={`mb-2 ${
                                isCompleted ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {event.description}
                              </p>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Can't find your order or having trouble tracking? We're here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak with our support team</p>
              <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us your questions</p>
              <p className="text-green-600 font-medium">support@shoppro.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with us instantly</p>
              <button 
                className="text-purple-600 font-medium hover:underline" 
                onClick={openChat}
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
