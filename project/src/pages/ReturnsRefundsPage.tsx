import React, { useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, AlertCircle, Info, Download, Mail } from 'lucide-react';

const ReturnsRefundsPage = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  const returnSteps = [
    {
      id: 1,
      title: "Check Eligibility",
      description: "Verify your item is eligible for return",
      icon: CheckCircle,
      details: [
        "Item must be in original condition",
        "Original packaging and tags included",
        "Within 30 days of delivery",
        "Not a final sale item"
      ]
    },
    {
      id: 2,
      title: "Initiate Return",
      description: "Start your return process online",
      icon: Package,
      details: [
        "Log into your account",
        "Go to 'Order History'",
        "Select the item to return",
        "Choose return reason"
      ]
    },
    {
      id: 3,
      title: "Print Label",
      description: "Get your prepaid return label",
      icon: Download,
      details: [
        "Download return label",
        "Package item securely",
        "Attach label to package",
        "Keep tracking number"
      ]
    },
    {
      id: 4,
      title: "Ship Item",
      description: "Send your return to us",
      icon: ArrowLeft,
      details: [
        "Drop off at carrier location",
        "Or schedule pickup",
        "Track your return",
        "Wait for confirmation"
      ]
    },
    {
      id: 5,
      title: "Get Refund",
      description: "Receive your refund",
      icon: CheckCircle,
      details: [
        "We inspect returned item",
        "Process refund within 5-7 days",
        "Refund to original payment method",
        "Receive confirmation email"
      ]
    }
  ];

  const returnPolicies = [
    {
      category: "Standard Returns",
      items: [
        "30-day return window from delivery date",
        "Items must be in original condition",
        "Original packaging and tags required",
        "Free return shipping for most items"
      ]
    },
    {
      category: "Electronics",
      items: [
        "15-day return window",
        "Must be in original packaging",
        "All accessories included",
        "No physical damage or water damage"
      ]
    },
    {
      category: "Final Sale Items",
      items: [
        "No returns or exchanges",
        "Clear final sale marking",
        "Includes personalized items",
        "Includes intimate apparel"
      ]
    },
    {
      category: "International Returns",
      items: [
        "30-day return window applies",
        "Customer responsible for return shipping",
        "Must use original packaging",
        "Customs documentation required"
      ]
    }
  ];

  const refundMethods = [
    {
      method: "Credit Card",
      timeframe: "5-7 business days",
      description: "Refunded to your original payment method"
    },
    {
      method: "PayPal",
      timeframe: "3-5 business days",
      description: "Refunded to your PayPal account"
    },
    {
      method: "Store Credit",
      timeframe: "1-2 business days",
      description: "Instant credit to your account"
    },
    {
      method: "Bank Transfer",
      timeframe: "7-10 business days",
      description: "Direct deposit to your bank account"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Returns & Refunds</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Easy returns and fast refunds. We want you to love your purchase.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">30 Days</div>
              <div className="text-gray-600">Return Window</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">Free</div>
              <div className="text-gray-600">Return Shipping</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">5-7 Days</div>
              <div className="text-gray-600">Refund Processing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Return Process Steps */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to return your item and get your refund quickly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {returnSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div 
                  className={`bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transition-all ${
                    selectedStep === step.id ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedStep(step.id)}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    selectedStep === step.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                
                {index < returnSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Step Details */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                {React.createElement(returnSteps[selectedStep - 1].icon, { className: "w-6 h-6 text-blue-600" })}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{returnSteps[selectedStep - 1].title}</h3>
                <p className="text-gray-600">{returnSteps[selectedStep - 1].description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What you need to do:</h4>
                <ul className="space-y-2">
                  {returnSteps[selectedStep - 1].details.map((detail, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h4>
                <p className="text-gray-600 mb-4">
                  If you have questions about this step, our support team is here to help.
                </p>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>Contact Support</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Download Return Label</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Return Policies */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Return Policies</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Different items have different return policies. Make sure you understand the rules before making a return.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {returnPolicies.map((policy, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{policy.category}</h3>
                <ul className="space-y-3">
                  {policy.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Refund Information */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Refund Information</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn about our refund methods and processing times.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refundMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.method}</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">{method.timeframe}</div>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Notes</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Return shipping is free for most items, but some oversized or heavy items may require a return shipping fee.</p>
                  <p>• Refunds are processed to the original payment method used for the purchase.</p>
                  <p>• International returns may take longer to process due to customs clearance.</p>
                  <p>• Damaged or defective items are eligible for immediate replacement or full refund.</p>
                  <p>• Gift purchases can be returned for store credit or exchanged for another item.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Return?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Log into your account to initiate a return or contact our support team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Return Process
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsRefundsPage;
