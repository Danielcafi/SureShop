import React from 'react';
import { FileText, Scale, Shield, CreditCard, AlertTriangle, Users } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Terms of Service - SureShop"
        description="Read SureShop's Terms of Service to understand your rights and responsibilities when using our e-commerce platform. Learn about our policies, user agreements, and service terms."
        keywords="terms of service, user agreement, terms and conditions, legal terms, e-commerce terms"
        type="website"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By using SureShop, you agree to be bound by these terms.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 15, 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Scale className="w-6 h-6 text-green-600 mr-3" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using SureShop ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Description of Service */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                SureShop is an e-commerce platform that provides:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Online shopping for various products and services</li>
                <li>Secure payment processing</li>
                <li>Order management and tracking</li>
                <li>Customer support and assistance</li>
                <li>Account management and profile services</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                3. User Accounts
              </h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must be at least 18 years old to create an account</li>
                <li>One person or entity may not maintain multiple accounts</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Security</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>You are responsible for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
              </ul>
            </section>

            {/* Product Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Product Information and Pricing</h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li>We strive to provide accurate product descriptions, images, and pricing</li>
                <li>Prices are subject to change without notice</li>
                <li>Product availability is not guaranteed</li>
                <li>We reserve the right to limit quantities and refuse orders</li>
                <li>All prices are in USD unless otherwise specified</li>
              </ul>
            </section>

            {/* Orders and Payment */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-6 h-6 text-green-600 mr-3" />
                5. Orders and Payment
              </h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Order Processing</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>All orders are subject to acceptance and availability</li>
                <li>We reserve the right to refuse or cancel orders at our discretion</li>
                <li>Order confirmation does not guarantee product availability</li>
                <li>We may require additional verification for certain orders</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Terms</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Payment is due at the time of order placement</li>
                <li>We accept major credit cards, PayPal, and other specified payment methods</li>
                <li>All payments are processed securely through encrypted connections</li>
                <li>Refunds are subject to our return policy</li>
              </ul>
            </section>

            {/* Shipping and Delivery */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Shipping and Delivery</h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Shipping times are estimates and not guaranteed</li>
                <li>Risk of loss transfers to you upon delivery</li>
                <li>You are responsible for providing accurate shipping addresses</li>
                <li>We are not liable for delays caused by shipping carriers</li>
                <li>International shipping may be subject to customs duties and taxes</li>
              </ul>
            </section>

            {/* Returns and Refunds */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Returns and Refunds</h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Returns must be initiated within 30 days of delivery</li>
                <li>Items must be in original condition with tags attached</li>
                <li>Certain items may not be eligible for return</li>
                <li>Refunds will be processed to the original payment method</li>
                <li>Return shipping costs may apply</li>
              </ul>
            </section>

            {/* Prohibited Uses */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                8. Prohibited Uses
              </h2>
              <p className="text-gray-700 mb-4">You may not use our service:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
                <li>To interfere with or circumvent the security features of the service</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">
                The service and its original content, features, and functionality are and will remain the exclusive property of SureShop and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>You may not reproduce, distribute, modify, or create derivative works</li>
                <li>You may not reverse engineer, disassemble, or decompile the service</li>
                <li>All trademarks and logos are the property of their respective owners</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall SureShop, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-700">
                You agree to defend, indemnify, and hold harmless SureShop and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="text-gray-700">
                If you wish to terminate your account, you may simply discontinue using the service.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@sureshop.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Business Street, Business City, BC 12345</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
