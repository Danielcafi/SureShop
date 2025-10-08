import React from 'react';
import { Cookie, Settings, Eye, Shield, BarChart3, Target } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Cookie Policy - SureShop"
        description="Learn about how SureShop uses cookies and similar technologies to enhance your browsing experience, improve our services, and provide personalized content."
        keywords="cookie policy, cookies, tracking, privacy, data collection, website analytics"
        type="website"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cookie className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This policy explains how we use cookies and similar technologies on our website to provide you with the best possible experience.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 15, 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            
            {/* What Are Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Cookie className="w-6 h-6 text-orange-600 mr-3" />
                What Are Cookies?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cookies help us understand how you use our website, remember your preferences, and provide you with a personalized experience. They also help us improve our services and show you relevant content and advertisements.
              </p>
            </section>

            {/* Types of Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="w-6 h-6 text-orange-600 mr-3" />
                Types of Cookies We Use
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Essential Cookies */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                    Essential Cookies
                  </h3>
                  <p className="text-blue-800 text-sm mb-3">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Authentication and login</li>
                    <li>• Shopping cart functionality</li>
                    <li>• Security and fraud prevention</li>
                    <li>• Basic website navigation</li>
                  </ul>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                    <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
                    Analytics Cookies
                  </h3>
                  <p className="text-green-800 text-sm mb-3">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Page views and user behavior</li>
                    <li>• Website performance metrics</li>
                    <li>• Error tracking and debugging</li>
                    <li>• Traffic source analysis</li>
                  </ul>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 text-purple-600 mr-2" />
                    Marketing Cookies
                  </h3>
                  <p className="text-purple-800 text-sm mb-3">
                    These cookies are used to deliver relevant advertisements and marketing content.
                  </p>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Personalized advertisements</li>
                    <li>• Social media integration</li>
                    <li>• Email marketing campaigns</li>
                    <li>• Retargeting and remarketing</li>
                  </ul>
                </div>

                {/* Functional Cookies */}
                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center">
                    <Eye className="w-5 h-5 text-amber-600 mr-2" />
                    Functional Cookies
                  </h3>
                  <p className="text-amber-800 text-sm mb-3">
                    These cookies enhance your experience by remembering your preferences.
                  </p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Language and region settings</li>
                    <li>• User preferences and settings</li>
                    <li>• Accessibility options</li>
                    <li>• Customized content delivery</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Specific Cookies We Use */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specific Cookies We Use</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Cookie Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Purpose</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Duration</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">session_id</td>
                      <td className="border border-gray-300 px-4 py-2">Maintains your session while browsing</td>
                      <td className="border border-gray-300 px-4 py-2">Session</td>
                      <td className="border border-gray-300 px-4 py-2">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">cart_items</td>
                      <td className="border border-gray-300 px-4 py-2">Remembers items in your shopping cart</td>
                      <td className="border border-gray-300 px-4 py-2">30 days</td>
                      <td className="border border-gray-300 px-4 py-2">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">user_preferences</td>
                      <td className="border border-gray-300 px-4 py-2">Stores your display preferences</td>
                      <td className="border border-gray-300 px-4 py-2">1 year</td>
                      <td className="border border-gray-300 px-4 py-2">Functional</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">_ga</td>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics tracking</td>
                      <td className="border border-gray-300 px-4 py-2">2 years</td>
                      <td className="border border-gray-300 px-4 py-2">Analytics</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">_fbp</td>
                      <td className="border border-gray-300 px-4 py-2">Facebook Pixel tracking</td>
                      <td className="border border-gray-300 px-4 py-2">90 days</td>
                      <td className="border border-gray-300 px-4 py-2">Marketing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                We also use third-party services that may set cookies on your device. These include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google Analytics:</strong> Helps us understand website traffic and user behavior</li>
                <li><strong>Facebook Pixel:</strong> Enables us to show relevant ads on Facebook and Instagram</li>
                <li><strong>Payment Processors:</strong> Secure payment processing (Stripe, PayPal)</li>
                <li><strong>Social Media:</strong> Social sharing and login functionality</li>
                <li><strong>Customer Support:</strong> Live chat and support tools</li>
              </ul>
            </section>

            {/* Cookie Management */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Cookie Consent Banner</h3>
                <p className="text-blue-800 mb-4">
                  When you first visit our website, you'll see a cookie consent banner. You can choose which types of cookies to accept or decline.
                </p>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Essential cookies cannot be disabled as they are necessary for the website to function properly.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                You can also control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>View and delete cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies</li>
                <li>Receive notifications when cookies are set</li>
              </ul>

              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Browser-Specific Instructions:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>
            </section>

            {/* Impact of Disabling Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
              <p className="text-gray-700 mb-4">
                If you choose to disable cookies, please be aware that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Some website features may not work properly</li>
                <li>You may need to re-enter information more frequently</li>
                <li>Your shopping cart may not persist between sessions</li>
                <li>Personalized content and recommendations may not be available</li>
                <li>We may not be able to provide optimal customer support</li>
              </ul>
            </section>

            {/* Updates to Cookie Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Cookie Policy</h2>
              <p className="text-gray-700">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@sureshop.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Business Street, Business City, BC 12345</p>
              </div>
            </section>

            {/* Cookie Settings Button */}
            <section className="mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-3">Manage Your Cookie Preferences</h3>
                <p className="mb-4">You can change your cookie settings at any time</p>
                <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Cookie Settings
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
