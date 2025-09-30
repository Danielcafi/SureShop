import React, { useState } from 'react';
import { MapPin, Clock, Users, ArrowRight, Search, Filter, Briefcase, Heart, Zap, Globe } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  salary?: string;
}

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      experience: "3-5 years",
      description: "We're looking for a talented Senior Frontend Developer to join our engineering team and help build amazing user experiences.",
      requirements: [
        "3+ years of experience with React, TypeScript, and modern frontend frameworks",
        "Strong understanding of responsive design and cross-browser compatibility",
        "Experience with state management libraries (Redux, Zustand, etc.)",
        "Knowledge of testing frameworks (Jest, React Testing Library)",
        "Experience with CI/CD pipelines and deployment processes"
      ],
      benefits: [
        "Competitive salary and equity",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
        "Unlimited PTO"
      ],
      posted: "2024-01-15",
      salary: "$120,000 - $160,000"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "4-6 years",
      description: "Join our product team to drive the vision and strategy for our e-commerce platform, working closely with engineering and design teams.",
      requirements: [
        "4+ years of product management experience in tech companies",
        "Strong analytical and problem-solving skills",
        "Experience with user research and data analysis",
        "Excellent communication and collaboration skills",
        "Experience with agile development methodologies"
      ],
      benefits: [
        "Competitive salary and equity",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
        "Unlimited PTO"
      ],
      posted: "2024-01-12",
      salary: "$130,000 - $180,000"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      description: "We're seeking a creative UX Designer to help shape the future of our user experience and create intuitive, beautiful interfaces.",
      requirements: [
        "2+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or Adobe Creative Suite",
        "Strong portfolio demonstrating user-centered design",
        "Experience with user research and usability testing",
        "Knowledge of design systems and component libraries"
      ],
      benefits: [
        "Competitive salary and equity",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
        "Unlimited PTO"
      ],
      posted: "2024-01-10",
      salary: "$90,000 - $130,000"
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      experience: "3-5 years",
      description: "Help us leverage data to improve our platform and create better experiences for our customers through machine learning and analytics.",
      requirements: [
        "3+ years of experience in data science or machine learning",
        "Proficiency in Python, R, or similar programming languages",
        "Experience with machine learning frameworks (TensorFlow, PyTorch, scikit-learn)",
        "Strong statistical and mathematical background",
        "Experience with big data tools (Spark, Hadoop, etc.)"
      ],
      benefits: [
        "Competitive salary and equity",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
        "Unlimited PTO"
      ],
      posted: "2024-01-08",
      salary: "$110,000 - $150,000"
    },
    {
      id: 5,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Chicago, IL",
      type: "Full-time",
      experience: "2-3 years",
      description: "Join our marketing team to help grow our brand and reach new customers through creative campaigns and strategic initiatives.",
      requirements: [
        "2+ years of marketing experience, preferably in e-commerce",
        "Experience with digital marketing channels (SEO, SEM, social media)",
        "Strong analytical and creative thinking skills",
        "Experience with marketing automation tools",
        "Excellent written and verbal communication skills"
      ],
      benefits: [
        "Competitive salary and equity",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
        "Unlimited PTO"
      ],
      posted: "2024-01-05",
      salary: "$60,000 - $80,000"
    },
    {
      id: 6,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      description: "Help our customers succeed by providing exceptional support and building strong relationships with our user community.",
      requirements: [
        "2+ years of customer success or account management experience",
        "Excellent communication and interpersonal skills",
        "Experience with CRM systems and customer support tools",
        "Strong problem-solving and analytical abilities",
        "Passion for helping customers achieve their goals"
      ],
      benefits: [
        "Competitive salary and equity",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
        "Unlimited PTO"
      ],
      posted: "2024-01-03",
      salary: "$70,000 - $95,000"
    }
  ];

  const departments = ['all', 'Engineering', 'Product', 'Design', 'Marketing', 'Customer Success'];
  const locations = ['all', 'New York, NY', 'San Francisco, CA', 'Chicago, IL', 'Remote'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Be part of a dynamic team that's revolutionizing e-commerce and creating amazing experiences for millions of customers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work at ShopPro?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're building the future of e-commerce, and we need talented people like you to help us get there.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Great Culture</h3>
              <p className="text-gray-600">
                Collaborative, inclusive environment where everyone's voice matters.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Growth</h3>
              <p className="text-gray-600">
                Rapidly expanding company with endless opportunities for advancement.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Impact</h3>
              <p className="text-gray-600">
                Make a difference for millions of customers around the world.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Great Benefits</h3>
              <p className="text-gray-600">
                Competitive compensation, health insurance, and professional development.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.slice(1).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Open Positions</h2>
            <p className="text-gray-600">{filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found</p>
          </div>
          
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                      {job.salary && (
                        <div className="text-green-600 font-medium">
                          {job.salary}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                          {req.split(':')[0]}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="text-gray-500 text-sm">
                          +{job.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
            </div>
          )}
        </div>
      </div>

      {/* Company Culture */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We believe in creating an environment where everyone can thrive, grow, and make a meaningful impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborative</h3>
              <p className="text-gray-300">
                We work together as one team, sharing knowledge and supporting each other's growth.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovative</h3>
              <p className="text-gray-300">
                We encourage creative thinking and embrace new ideas that push boundaries.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusive</h3>
              <p className="text-gray-300">
                We celebrate diversity and create an environment where everyone belongs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Submit Your Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
