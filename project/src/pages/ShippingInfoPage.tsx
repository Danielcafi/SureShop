import React, { useState } from 'react';
import { Truck, Clock, MapPin, Package, Shield, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ShippingInfoPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('US');

  const shippingOptions = [
    {
      name: "Standard Shipping",
      description: "Regular delivery service",
      timeframe: "3-5 business days",
      cost: "Free on orders over $50",
      icon: Truck,
      features: [
        "Trackable package",
        "Delivery confirmation",
        "Standard insurance"
      ]
    },
    {
      name: "Express Shipping",
      description: "Faster delivery service",
      timeframe: "1-2 business days",
      cost: "$9.99",
      icon: Clock,
      features: [
        "Priority handling",
        "Real-time tracking",
        "Enhanced insurance",
        "Weekend delivery available"
      ]
    },
    {
      name: "Overnight Shipping",
      description: "Next business day delivery",
      timeframe: "Next business day",
      cost: "$19.99",
      icon: Package,
      features: [
        "Guaranteed next-day delivery",
        "Priority processing",
        "Full insurance coverage",
        "Saturday delivery available"
      ]
    },
    {
      name: "International Shipping",
      description: "Worldwide delivery",
      timeframe: "5-15 business days",
      cost: "Varies by location",
      icon: MapPin,
      features: [
        "Global delivery network",
        "Customs handling",
        "International tracking",
        "Duty and tax calculation"
      ]
    }
  ];

  const shippingZones = [
    {
      zone: "Zone 1 - Domestic",
      countries: ["United States", "Canada"],
      timeframe: "1-5 business days",
      cost: "Free on orders over $50"
    },
    {
      zone: "Zone 2 - Europe",
      countries: ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands"],
      timeframe: "5-10 business days",
      cost: "$15.99 - $25.99"
    },
    {
      zone: "Zone 3 - Asia Pacific",
      countries: ["Australia", "Japan", "South Korea", "Singapore", "Hong Kong"],
      timeframe: "7-12 business days",
      cost: "$20.99 - $35.99"
    },
    {
      zone: "Zone 4 - Rest of World",
      countries: ["Brazil", "India", "South Africa", "Mexico"],
      timeframe: "10-15 business days",
      cost: "$25.99 - $45.99"
    }
  ];

  const deliveryMethods = [
    {
      name: "Home Delivery",
      description: "Delivered to your doorstep",
      icon: Package,
      features: [
        "Signature required for orders over $100",
        "Safe drop-off available",
        "Delivery confirmation",
        "Photo proof of delivery"
      ]
    },
    {
      name: "Pickup Points",
      description: "Collect from convenient locations",
      icon: MapPin,
      features: [
        "Thousands of pickup locations",
        "Extended pickup hours",
        "Secure storage",
        "SMS notifications"
      ]
    },
    {
      name: "Locker Delivery",
      description: "Delivered to secure lockers",
      icon: Shield,
      features: [
        "24/7 access",
        "Secure storage",
        "Mobile app access",
        "Multiple size options"
      ]
    }
  ];

  const trackingInfo = [
    {
      status: "Order Placed",
      description: "Your order has been received and is being processed",
      timeframe: "Immediately",
      icon: CheckCircle
    },
    {
      status: "Processing",
      description: "Your items are being prepared for shipment",
      timeframe: "1-2 business days",
      icon: Package
    },
    {
      status: "Shipped",
      description: "Your package is on its way to you",
      timeframe: "3-5 business days",
      icon: Truck
    },
    {
      status: "Out for Delivery",
      description: "Your package is out for delivery today",
      timeframe: "Same day",
      icon: Clock
    },
    {
      status: "Delivered",
      description: "Your package has been delivered",
      timeframe: "Completed",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Shipping Information</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Fast, reliable shipping options to get your orders delivered quickly and safely.
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Options */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Options</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the shipping method that works best for you. All orders are processed and shipped within 1-2 business days.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {shippingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.name}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{option.timeframe}</div>
                  <div className="text-lg font-medium text-gray-900">{option.cost}</div>
                </div>
                
                <ul className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* International Shipping */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">International Shipping</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We ship to over 150 countries worldwide. Shipping costs and delivery times vary by location.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingZones.map((zone, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{zone.zone}</h3>
                <div className="space-y-2 mb-4">
                  {zone.countries.map((country, countryIndex) => (
                    <div key={countryIndex} className="text-sm text-gray-600">• {country}</div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-500 mb-1">Delivery Time</div>
                  <div className="font-medium text-gray-900 mb-2">{zone.timeframe}</div>
                  <div className="text-sm text-gray-500 mb-1">Shipping Cost</div>
                  <div className="font-medium text-blue-600">{zone.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Methods */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Delivery Methods</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose how you want to receive your packages. We offer multiple delivery options to suit your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <method.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.name}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                
                <ul className="space-y-3 text-left">
                  {method.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Tracking */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Tracking</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Track your order from processing to delivery. You'll receive updates at every step of the journey.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              <div className="space-y-8">
                {trackingInfo.map((step, index) => (
                  <div key={index} className="relative flex items-start space-x-6">
                    <div className="relative z-10 w-16 h-16 bg-white rounded-full border-4 border-blue-600 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{step.status}</h3>
                        <span className="text-sm text-gray-500">{step.timeframe}</span>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4 mb-6">
                <Info className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Policies</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Orders are processed Monday through Friday</li>
                    <li>• Same-day processing for orders placed before 2 PM EST</li>
                    <li>• Weekend and holiday orders ship the next business day</li>
                    <li>• Free shipping on orders over $50 (domestic)</li>
                    <li>• International orders may be subject to customs duties</li>
                    <li>• We cannot ship to PO boxes for some delivery methods</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4 mb-6">
                <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Notes</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Delivery times are estimates and may vary</li>
                    <li>• Weather and carrier delays may affect delivery</li>
                    <li>• Someone must be available to receive the package</li>
                    <li>• We're not responsible for packages left unattended</li>
                    <li>• Contact us immediately if your package is damaged</li>
                    <li>• Tracking information is provided for all shipments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Place Your Order?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Choose your shipping options during checkout and track your order every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Shopping
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoPage;
