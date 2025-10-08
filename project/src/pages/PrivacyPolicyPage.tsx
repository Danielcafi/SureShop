import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Privacy Policy - SureShop"
        description="Learn how SureShop protects your privacy and handles your personal information. Our comprehensive privacy policy explains data collection, usage, and your rights."
        keywords="privacy policy, data protection, personal information, GDPR, privacy rights"
        type="website"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 15, 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At SureShop ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="w-6 h-6 text-blue-600 mr-3" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Name and contact information (email, phone number, address)</li>
                <li>Account credentials and profile information</li>
                <li>Payment and billing information</li>
                <li>Order history and purchase preferences</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <UserCheck className="w-6 h-6 text-blue-600 mr-3" />
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send order confirmations, shipping updates, and delivery notifications</li>
                <li>Improve our website functionality and user experience</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
                <li>Analyze website usage and trends</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 text-blue-600 mr-3" />
                Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in our operations</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> When you have given explicit consent</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
              </p>
              <p className="text-gray-700">
                For more detailed information about our cookie usage, please see our <a href="/cookies" className="text-blue-600 hover:text-blue-800 underline">Cookie Policy</a>.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="w-6 h-6 text-blue-600 mr-3" />
                Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@sureshop.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Business Street, Business City, BC 12345</p>
              </div>
            </section>

            {/* Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
