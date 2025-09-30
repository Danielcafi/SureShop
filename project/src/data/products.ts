export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  isNew: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  discount?: number;
  weight: string;
  dimensions: string;
  color: string;
  size?: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Apple MacBook Pro 16-inch",
    description: "The most powerful MacBook Pro ever. With the M2 Max chip, it delivers exceptional performance for professional workflows.",
    price: 2499.99,
    originalPrice: 2799.99,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    stock: 15,
    rating: 4.8,
    reviewCount: 324,
    tags: ["laptop", "macbook", "professional", "m2", "max"],
    features: [
      "M2 Max chip with 12-core CPU",
      "38-core GPU",
      "32GB unified memory",
      "1TB SSD storage",
      "Liquid Retina XDR display",
      "1080p FaceTime HD camera"
    ],
    specifications: {
      "Processor": "Apple M2 Max",
      "Memory": "32GB unified memory",
      "Storage": "1TB SSD",
      "Display": "16.2-inch Liquid Retina XDR",
      "Graphics": "38-core GPU",
      "Camera": "1080p FaceTime HD",
      "Battery": "Up to 22 hours"
    },
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    discount: 11,
    weight: "2.15 kg",
    dimensions: "35.57 x 24.81 x 1.68 cm",
    color: "Space Gray",
    sku: "MBP16-M2MAX-32-1TB",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Premium sound quality and all-day comfort.",
    price: 399.99,
    originalPrice: 449.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    category: "Electronics",
    subcategory: "Audio",
    brand: "Sony",
    stock: 45,
    rating: 4.7,
    reviewCount: 892,
    tags: ["headphones", "noise-canceling", "wireless", "premium"],
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Quick charge (3 min = 3 hours)",
      "Touch sensor controls",
      "Speak-to-Chat technology",
      "Multipoint connection"
    ],
    specifications: {
      "Driver": "30mm dynamic",
      "Frequency Response": "4Hz - 40kHz",
      "Battery Life": "30 hours",
      "Charging": "USB-C",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "250g"
    },
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    discount: 11,
    weight: "250g",
    dimensions: "26.5 x 20.5 x 7.5 cm",
    color: "Black",
    sku: "WH1000XM5-BLK",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    description: "The Air Max 270 delivers visible cushioning under every step. Designed for all-day comfort and style.",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    category: "Fashion",
    subcategory: "Shoes",
    brand: "Nike",
    stock: 78,
    rating: 4.5,
    reviewCount: 156,
    tags: ["sneakers", "running", "comfort", "athletic"],
    features: [
      "Max Air unit in heel",
      "Mesh upper for breathability",
      "Rubber outsole for traction",
      "Lightweight design",
      "All-day comfort"
    ],
    specifications: {
      "Upper": "Mesh and synthetic",
      "Midsole": "Max Air unit",
      "Outsole": "Rubber",
      "Weight": "320g (size 9)",
      "Drop": "8mm"
    },
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    discount: 17,
    weight: "320g",
    dimensions: "32 x 24 x 12 cm",
    color: "White/Black",
    size: "US 9",
    sku: "AIR270-WHT-BLK-9",
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z"
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    description: "The ultimate smartphone with AI-powered features, 200MP camera, and S Pen. Experience the future of mobile technology.",
    price: 1199.99,
    originalPrice: 1299.99,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/788945/pexels-photo-788945.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    category: "Electronics",
    subcategory: "Phones",
    brand: "Samsung",
    stock: 23,
    rating: 4.6,
    reviewCount: 567,
    tags: ["smartphone", "camera", "AI", "S-Pen"],
    features: [
      "200MP main camera",
      "S Pen included",
      "AI-powered features",
      "Titanium build",
      "6.8-inch Dynamic AMOLED display",
      "5000mAh battery"
    ],
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "200MP + 50MP + 10MP + 12MP",
      "Battery": "5000mAh",
      "OS": "Android 14"
    },
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    discount: 8,
    weight: "232g",
    dimensions: "16.2 x 7.9 x 0.9 cm",
    color: "Titanium Black",
    sku: "S24U-256-TB",
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z"
  },
  {
    id: 5,
    name: "Levi's 501 Original Jeans",
    description: "The original blue jean. Classic 501 fit with straight leg and button fly. Made from 100% cotton denim.",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    category: "Fashion",
    subcategory: "Clothing",
    brand: "Levi's",
    stock: 120,
    rating: 4.4,
    reviewCount: 234,
    tags: ["jeans", "denim", "classic", "cotton"],
    features: [
      "100% cotton denim",
      "Classic 501 fit",
      "Straight leg",
      "Button fly",
      "Five-pocket styling",
      "Iconic red tab"
    ],
    specifications: {
      "Material": "100% Cotton",
      "Fit": "501 Original",
      "Rise": "Mid-rise",
      "Leg": "Straight",
      "Closure": "Button fly",
      "Pockets": "5-pocket styling"
    },
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    discount: 18,
    weight: "600g",
    dimensions: "Various sizes",
    color: "Blue",
    size: "32x32",
    sku: "501-BLU-32-32",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z"
  },
  {
    id: 6,
    name: "Dyson V15 Detect Vacuum",
    description: "Powerful cordless vacuum with laser dust detection. Reveals microscopic dust for a deeper clean.",
    price: 649.99,
    originalPrice: 749.99,
    image: "https://images.pexels.com/photos/4107267/pexels-photo-4107267.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/4107267/pexels-photo-4107267.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    category: "Home",
    subcategory: "Appliances",
    brand: "Dyson",
    stock: 12,
    rating: 4.9,
    reviewCount: 89,
    tags: ["vacuum", "cordless", "laser", "detection"],
    features: [
      "Laser dust detection",
      "60-minute runtime",
      "Powerful suction",
      "HEPA filtration",
      "LCD display",
      "Multiple attachments"
    ],
    specifications: {
      "Runtime": "60 minutes",
      "Suction": "230 AW",
      "Filtration": "HEPA",
      "Weight": "3.0 kg",
      "Charging": "4.5 hours",
      "Display": "LCD"
    },
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    discount: 13,
    weight: "3.0 kg",
    dimensions: "25.1 x 11.2 x 103.2 cm",
    color: "Yellow",
    sku: "V15-DETECT-YEL",
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-02-05T00:00:00Z"
  }
];

export const categories = [
  { name: "Electronics", slug: "electronics", count: 156, icon: "📱" },
  { name: "Fashion", slug: "fashion", count: 234, icon: "👗" },
  { name: "Home & Garden", slug: "home-garden", count: 89, icon: "🏠" },
  { name: "Sports", slug: "sports", count: 67, icon: "⚽" },
  { name: "Books", slug: "books", count: 445, icon: "📚" },
  { name: "Health & Beauty", slug: "health-beauty", count: 123, icon: "💄" },
  { name: "Toys & Games", slug: "toys-games", count: 78, icon: "🎮" },
  { name: "Automotive", slug: "automotive", count: 45, icon: "🚗" }
];

export const brands = [
  { name: "Apple", count: 23 },
  { name: "Samsung", count: 45 },
  { name: "Sony", count: 34 },
  { name: "Nike", count: 67 },
  { name: "Adidas", count: 56 },
  { name: "Levi's", count: 89 },
  { name: "Dyson", count: 12 },
  { name: "LG", count: 23 }
];
