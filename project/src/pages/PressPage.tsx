import React, { useState } from 'react';
import { Calendar, Download, ExternalLink, FileText, Image, Video, ArrowRight } from 'lucide-react';

interface PressRelease {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
  category: string;
  attachments: string[];
}

interface MediaKit {
  id: number;
  name: string;
  type: string;
  size: string;
  description: string;
}

const PressPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pressReleases: PressRelease[] = [
    {
      id: 1,
      title: "ShopPro Announces $50M Series B Funding Round",
      date: "2024-01-15",
      summary: "Leading e-commerce platform secures significant investment to accelerate global expansion and product development.",
      content: "Full press release content...",
      category: "Funding",
      attachments: ["press-release.pdf", "company-fact-sheet.pdf"]
    },
    {
      id: 2,
      title: "ShopPro Launches AI-Powered Shopping Assistant",
      date: "2024-01-10",
      summary: "New AI technology helps customers find products faster and make better purchasing decisions.",
      content: "Full press release content...",
      category: "Product",
      attachments: ["product-screenshots.zip", "demo-video.mp4"]
    },
    {
      id: 3,
      title: "ShopPro Partners with Major Retail Brands",
      date: "2024-01-05",
      summary: "Strategic partnerships bring exclusive products and enhanced shopping experiences to customers.",
      content: "Full press release content...",
      category: "Partnerships",
      attachments: ["partnership-announcement.pdf"]
    },
    {
      id: 4,
      title: "ShopPro Expands to European Markets",
      date: "2023-12-20",
      summary: "Company announces expansion into 15 new European countries with localized shopping experiences.",
      content: "Full press release content...",
      category: "Expansion",
      attachments: ["expansion-map.pdf", "market-analysis.pdf"]
    },
    {
      id: 5,
      title: "ShopPro Recognized as Top E-commerce Platform",
      date: "2023-12-10",
      summary: "Industry awards recognize ShopPro's innovation and customer satisfaction achievements.",
      content: "Full press release content...",
      category: "Awards",
      attachments: ["award-certificate.pdf", "recognition-letter.pdf"]
    }
  ];

  const mediaKit: MediaKit[] = [
    {
      id: 1,
      name: "Company Logo Pack",
      type: "ZIP",
      size: "2.5 MB",
      description: "High-resolution logos in various formats (PNG, SVG, EPS)"
    },
    {
      id: 2,
      name: "Brand Guidelines",
      type: "PDF",
      size: "5.2 MB",
      description: "Complete brand identity guidelines and usage instructions"
    },
    {
      id: 3,
      name: "Product Screenshots",
      type: "ZIP",
      size: "8.1 MB",
      description: "High-quality screenshots of our platform and mobile app"
    },
    {
      id: 4,
      name: "Team Photos",
      type: "ZIP",
      size: "12.3 MB",
      description: "Professional headshots of our leadership team"
    },
    {
      id: 5,
      name: "Company Fact Sheet",
      type: "PDF",
      size: "1.8 MB",
      description: "Key statistics, milestones, and company information"
    }
  ];

  const categories = ['all', 'Funding', 'Product', 'Partnerships', 'Expansion', 'Awards'];

  const filteredReleases = pressReleases.filter(release => 
    selectedCategory === 'all' || release.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Press & Media</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and media resources from ShopPro.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Contact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              For media inquiries, press releases, or interview requests, please contact our press team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Press Inquiries</h3>
              <p className="text-gray-600 mb-2">press@shoppro.com</p>
              <p className="text-sm text-gray-500">For media questions and interviews</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Media Assets</h3>
              <p className="text-gray-600 mb-2">media@shoppro.com</p>
              <p className="text-sm text-gray-500">For logos, images, and brand materials</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Content</h3>
              <p className="text-gray-600 mb-2">video@shoppro.com</p>
              <p className="text-sm text-gray-500">For video assets and b-roll footage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Press Releases */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Press Releases</h2>
              <p className="text-lg text-gray-600">Latest news and announcements from ShopPro</p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-8">
            {filteredReleases.map((release) => (
              <div key={release.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {release.category}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(release.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{release.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{release.summary}</p>
                    
                    {release.attachments.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Attachments:</h4>
                        <div className="flex flex-wrap gap-2">
                          {release.attachments.map((attachment, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                              {attachment}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 lg:ml-6 mt-4 lg:mt-0">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Kit */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Kit</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Download high-quality assets, logos, and brand materials for your coverage of ShopPro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaKit.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.type} • {item.size}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Coverage */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Coverage</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See what the media is saying about ShopPro and our impact on the e-commerce industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">TC</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">TechCrunch</div>
                  <div className="text-sm text-gray-500">January 15, 2024</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                "ShopPro Raises $50M to Accelerate Global Expansion"
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                The e-commerce platform plans to use the funding to expand into new markets and enhance its AI capabilities.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                <span>Read Article</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">FT</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Financial Times</div>
                  <div className="text-sm text-gray-500">January 10, 2024</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                "AI-Powered Shopping: The Future of E-commerce"
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                ShopPro's new AI assistant is changing how customers discover and purchase products online.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                <span>Read Article</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">WSJ</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Wall Street Journal</div>
                  <div className="text-sm text-gray-500">January 5, 2024</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                "E-commerce Platform Expands European Presence"
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                ShopPro announces strategic partnerships to bring its services to 15 new European markets.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                <span>Read Article</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact our press team for additional resources, interview requests, or media inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:press@shoppro.com" 
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Press Team
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              General Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;
