import React, { useState } from 'react';
import { Search, HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  popular: boolean;
}

interface HelpArticle {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  helpful: number;
  notHelpful: number;
}

const HelpCenterPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How do I track my order?",
      answer: "You can track your order by clicking the 'Track Order' link in your order confirmation email, or by visiting our Track Order page and entering your order number and email address. You'll receive real-time updates on your order's status and location.",
      category: "Orders",
      popular: true
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some items like electronics and personal care products may have different return policies. Please check the product page for specific return information.",
      category: "Returns",
      popular: true
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping times vary by location. You can see estimated delivery times during checkout.",
      category: "Shipping",
      popular: true
    },
    {
      id: 4,
      question: "How do I change my password?",
      answer: "To change your password, go to your account settings, click on 'Security', and then 'Change Password'. You'll need to enter your current password and then your new password twice to confirm.",
      category: "Account",
      popular: false
    },
    {
      id: 5,
      question: "Do you ship internationally?",
      answer: "Yes! We ship to over 150 countries worldwide. International shipping costs and delivery times vary by location. You can see available shipping options during checkout.",
      category: "Shipping",
      popular: true
    },
    {
      id: 6,
      question: "How do I cancel an order?",
      answer: "You can cancel an order within 1 hour of placing it if it hasn't been processed yet. Go to your order history, find the order, and click 'Cancel Order'. If the order has already been processed, you'll need to return it instead.",
      category: "Orders",
      popular: false
    },
    {
      id: 7,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely with bank-level encryption.",
      category: "Payment",
      popular: true
    },
    {
      id: 8,
      question: "How do I contact customer service?",
      answer: "You can contact us through our live chat (available 24/7), email at support@shoppro.com, or phone at +1 (555) 123-4567. Our support team typically responds within 2 hours.",
      category: "Support",
      popular: true
    }
  ];

  const helpArticles: HelpArticle[] = [
    {
      id: 1,
      title: "Getting Started: Your First Order",
      category: "Getting Started",
      summary: "Learn how to place your first order, create an account, and navigate our platform.",
      content: "Full article content...",
      helpful: 245,
      notHelpful: 12
    },
    {
      id: 2,
      title: "Understanding Shipping Options",
      category: "Shipping",
      summary: "Complete guide to our shipping options, delivery times, and international shipping.",
      content: "Full article content...",
      helpful: 189,
      notHelpful: 8
    },
    {
      id: 3,
      title: "Managing Your Account",
      category: "Account",
      summary: "How to update your profile, manage addresses, and change account settings.",
      content: "Full article content...",
      helpful: 156,
      notHelpful: 5
    },
    {
      id: 4,
      title: "Returns and Refunds Guide",
      category: "Returns",
      summary: "Step-by-step process for returning items and getting refunds.",
      content: "Full article content...",
      helpful: 203,
      notHelpful: 15
    },
    {
      id: 5,
      title: "Payment Methods and Security",
      category: "Payment",
      summary: "Information about accepted payment methods and security measures.",
      content: "Full article content...",
      helpful: 178,
      notHelpful: 7
    },
    {
      id: 6,
      title: "Mobile App Features",
      category: "Mobile",
      summary: "Discover all the features available in our mobile app.",
      content: "Full article content...",
      helpful: 134,
      notHelpful: 9
    }
  ];

  const categories = ['all', 'Orders', 'Returns', 'Shipping', 'Account', 'Payment', 'Support', 'Getting Started', 'Mobile'];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Help Center</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Find answers to your questions and get the support you need.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Contact Options */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>Live Chat</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                <Phone className="w-5 h-5" />
                <span>Call Us</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h2>
            <p className="text-lg text-gray-600">Choose a category to find relevant help articles and FAQs</p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.slice(1).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular FAQs */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to the most common questions</p>
          </div>
          
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-gray-50 rounded-lg">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {faq.popular && (
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Help Articles */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Help Articles</h2>
            <p className="text-lg text-gray-600">Detailed guides and tutorials to help you get the most out of ShopPro</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <span>👍</span>
                      <span>{article.helpful}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>👎</span>
                      <span>{article.notHelpful}</span>
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                    <span>Read Article</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you 24/7. Get in touch with us through your preferred method.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-blue-100 mb-4">Get instant help from our support team</p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Chat
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                <p className="text-blue-100 mb-4">Call us at +1 (555) 123-4567</p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Call Now
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-blue-100 mb-4">Send us an email at support@shoppro.com</p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
