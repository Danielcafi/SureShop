import React, { useState } from 'react';
import { Ruler, Shirt, Footprints, Watch, ArrowRight, Download, Info } from 'lucide-react';

const SizeGuidePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('clothing');
  const [selectedGender, setSelectedGender] = useState('unisex');

  const categories = [
    { id: 'clothing', name: 'Clothing', icon: Shirt },
    { id: 'shoes', name: 'Shoes', icon: Footprints },
    { id: 'accessories', name: 'Accessories', icon: Watch }
  ];

  const clothingSizes = {
    unisex: {
      name: 'Unisex Clothing',
      measurements: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      chest: ['32-34"', '34-36"', '36-38"', '38-40"', '40-42"', '42-44"', '44-46"'],
      waist: ['28-30"', '30-32"', '32-34"', '34-36"', '36-38"', '38-40"', '40-42"'],
      length: ['26"', '27"', '28"', '29"', '30"', '31"', '32"']
    },
    women: {
      name: "Women's Clothing",
      measurements: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      chest: ['32-34"', '34-36"', '36-38"', '38-40"', '40-42"', '42-44"'],
      waist: ['24-26"', '26-28"', '28-30"', '30-32"', '32-34"', '34-36"'],
      length: ['24"', '25"', '26"', '27"', '28"', '29"']
    },
    men: {
      name: "Men's Clothing",
      measurements: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      chest: ['34-36"', '36-38"', '38-40"', '40-42"', '42-44"', '44-46"', '46-48"'],
      waist: ['28-30"', '30-32"', '32-34"', '34-36"', '36-38"', '38-40"', '40-42"'],
      length: ['28"', '29"', '30"', '31"', '32"', '33"', '34"']
    }
  };

  const shoeSizes = {
    women: {
      name: "Women's Shoes",
      us: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
      uk: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'],
      eu: ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41'],
      cm: ['22.5', '23', '23.5', '24', '24.5', '25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5']
    },
    men: {
      name: "Men's Shoes",
      us: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'],
      uk: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
      eu: ['40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '45.5', '46'],
      cm: ['25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30', '30.5', '31']
    }
  };

  const accessorySizes = {
    watches: {
      name: 'Watches',
      sizes: ['Small (6-7")', 'Medium (7-8")', 'Large (8-9")', 'Extra Large (9-10")'],
      description: 'Measure your wrist circumference to find the right size'
    },
    rings: {
      name: 'Rings',
      sizes: ['4', '5', '6', '7', '8', '9', '10', '11', '12'],
      description: 'Measure the inside diameter of your finger'
    },
    hats: {
      name: 'Hats',
      sizes: ['XS (6 1/2")', 'S (6 3/4")', 'M (7")', 'L (7 1/4")', 'XL (7 1/2")', 'XXL (7 3/4")'],
      description: 'Measure the circumference of your head'
    }
  };

  const measuringTips = [
    {
      title: "How to Measure Your Chest",
      steps: [
        "Stand straight with arms at your sides",
        "Wrap the measuring tape around the fullest part of your chest",
        "Keep the tape parallel to the ground",
        "Don't pull the tape too tight or too loose"
      ]
    },
    {
      title: "How to Measure Your Waist",
      steps: [
        "Stand straight and relax your stomach",
        "Wrap the measuring tape around your natural waistline",
        "This is usually the narrowest part of your torso",
        "Keep the tape parallel to the ground"
      ]
    },
    {
      title: "How to Measure Your Inseam",
      steps: [
        "Stand straight with your legs slightly apart",
        "Measure from your crotch to the bottom of your ankle",
        "Or measure a pair of pants that fit you well",
        "Measure from the crotch seam to the hem"
      ]
    },
    {
      title: "How to Measure Your Foot",
      steps: [
        "Place your foot on a piece of paper",
        "Trace around your foot with a pencil",
        "Measure the length from heel to toe",
        "Measure the width at the widest part"
      ]
    }
  ];

  const renderClothingTable = () => {
    const currentSizes = clothingSizes[selectedGender as keyof typeof clothingSizes];
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chest</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Length</th>
            </tr>
          </thead>
          <tbody>
            {currentSizes.measurements.map((size, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">{size}</td>
                <td className="border border-gray-300 px-4 py-3">{currentSizes.chest[index]}</td>
                <td className="border border-gray-300 px-4 py-3">{currentSizes.waist[index]}</td>
                <td className="border border-gray-300 px-4 py-3">{currentSizes.length[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderShoeTable = () => {
    const currentSizes = shoeSizes[selectedGender as keyof typeof shoeSizes];
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">US</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">UK</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">EU</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">CM</th>
            </tr>
          </thead>
          <tbody>
            {currentSizes.us.map((size, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">{size}</td>
                <td className="border border-gray-300 px-4 py-3">{currentSizes.uk[index]}</td>
                <td className="border border-gray-300 px-4 py-3">{currentSizes.eu[index]}</td>
                <td className="border border-gray-300 px-4 py-3">{currentSizes.cm[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAccessoryTable = () => {
    const accessories = Object.values(accessorySizes);
    
    return (
      <div className="space-y-8">
        {accessories.map((accessory, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{accessory.name}</h3>
            <p className="text-gray-600 mb-4">{accessory.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {accessory.sizes.map((size, sizeIndex) => (
                <div key={sizeIndex} className="bg-gray-50 rounded-lg p-3 text-center">
                  <span className="text-sm font-medium text-gray-900">{size}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Size Guide</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Find the perfect fit with our comprehensive size charts and measuring guides.
            </p>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gender Selection for Clothing and Shoes */}
      {(selectedCategory === 'clothing' || selectedCategory === 'shoes') && (
        <div className="py-4 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {selectedCategory === 'clothing' ? (
                <>
                  <button
                    onClick={() => setSelectedGender('unisex')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedGender === 'unisex' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    Unisex
                  </button>
                  <button
                    onClick={() => setSelectedGender('women')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedGender === 'women' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    Women's
                  </button>
                  <button
                    onClick={() => setSelectedGender('men')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedGender === 'men' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    Men's
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedGender('women')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedGender === 'women' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    Women's
                  </button>
                  <button
                    onClick={() => setSelectedGender('men')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedGender === 'men' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    Men's
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Size Charts */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'clothing' && clothingSizes[selectedGender as keyof typeof clothingSizes].name}
                {selectedCategory === 'shoes' && shoeSizes[selectedGender as keyof typeof shoeSizes].name}
                {selectedCategory === 'accessories' && 'Accessories'}
              </h2>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Guide</span>
              </button>
            </div>
            
            {selectedCategory === 'clothing' && renderClothingTable()}
            {selectedCategory === 'shoes' && renderShoeTable()}
            {selectedCategory === 'accessories' && renderAccessoryTable()}
          </div>
        </div>
      </div>

      {/* Measuring Tips */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Measure</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these step-by-step guides to get accurate measurements for the perfect fit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {measuringTips.map((tip, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Ruler className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                </div>
                <ol className="space-y-2">
                  {tip.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-3 text-gray-600">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Size Guide Tips */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4 mb-6">
                <Info className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Size Guide Tips</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Measure yourself wearing the undergarments you plan to wear</li>
                    <li>• Use a flexible measuring tape for accurate results</li>
                    <li>• Don't pull the tape too tight or too loose</li>
                    <li>• If you're between sizes, we recommend sizing up</li>
                    <li>• Different brands may have slightly different sizing</li>
                    <li>• Check the product description for specific fit notes</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4 mb-6">
                <ArrowRight className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Still Unsure?</h3>
                  <p className="text-gray-600 mb-4">
                    If you're still not sure about your size, our customer service team is here to help.
                  </p>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      <span>Contact Support</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="w-full flex items-center space-x-3 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <span>Live Chat</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Now that you know your size, find the perfect items in our collection.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
