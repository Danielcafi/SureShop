import { Product, mockProducts, categories, brands } from '../data/products';

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  tags?: string[];
  search?: string;
}

export interface SortOption {
  field: 'name' | 'price' | 'rating' | 'createdAt' | 'popularity';
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

class ProductService {
  private products: Product[] = mockProducts;

  // Get all products with optional filters
  async getProducts(
    filters: ProductFilters = {},
    sort: SortOption = { field: 'createdAt', direction: 'desc' },
    pagination: PaginationOptions = { page: 1, limit: 12 }
  ): Promise<ProductSearchResult> {
    let filteredProducts = [...this.products];

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.subcategory) {
      filteredProducts = filteredProducts.filter(p => 
        p.subcategory.toLowerCase() === filters.subcategory!.toLowerCase()
      );
    }

    if (filters.brand) {
      filteredProducts = filteredProducts.filter(p => 
        p.brand.toLowerCase() === filters.brand!.toLowerCase()
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.rating !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.rating >= filters.rating!);
    }

    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(p => p.stock > 0);
    }

    if (filters.isNew) {
      filteredProducts = filteredProducts.filter(p => p.isNew);
    }

    if (filters.isFeatured) {
      filteredProducts = filteredProducts.filter(p => p.isFeatured);
    }

    if (filters.isOnSale) {
      filteredProducts = filteredProducts.filter(p => p.isOnSale);
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredProducts = filteredProducts.filter(p => 
        filters.tags!.some(tag => p.tags.includes(tag))
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sort.field) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'popularity':
          aValue = a.reviewCount;
          bValue = b.reviewCount;
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }

      if (sort.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / pagination.limit);
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total,
      page: pagination.page,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1
    };
  }

  // Get single product by ID
  async getProduct(id: number): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  // Get related products
  async getRelatedProducts(productId: number, limit: number = 4): Promise<Product[]> {
    const product = await this.getProduct(productId);
    if (!product) return [];

    return this.products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit);
  }

  // Get featured products
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    return this.products
      .filter(p => p.isFeatured)
      .slice(0, limit);
  }

  // Get new products
  async getNewProducts(limit: number = 8): Promise<Product[]> {
    return this.products
      .filter(p => p.isNew)
      .slice(0, limit);
  }

  // Get products on sale
  async getSaleProducts(limit: number = 8): Promise<Product[]> {
    return this.products
      .filter(p => p.isOnSale)
      .slice(0, limit);
  }

  // Get categories
  async getCategories() {
    return categories;
  }

  // Get brands
  async getBrands() {
    return brands;
  }

  // Search products
  async searchProducts(query: string, limit: number = 10): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return this.products
      .filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
      .slice(0, limit);
  }

  // Get product suggestions based on viewing history
  async getProductSuggestions(viewedProductIds: number[], limit: number = 6): Promise<Product[]> {
    const viewedProducts = viewedProductIds
      .map(id => this.products.find(p => p.id === id))
      .filter(Boolean) as Product[];

    if (viewedProducts.length === 0) {
      return this.products.slice(0, limit);
    }

    // Get products from same categories
    const categories = viewedProducts.map(p => p.category);
    const brands = viewedProducts.map(p => p.brand);

    return this.products
      .filter(p => 
        !viewedProductIds.includes(p.id) && (
          categories.includes(p.category) ||
          brands.includes(p.brand)
        )
      )
      .slice(0, limit);
  }

  // Get price range for filters
  async getPriceRange(): Promise<{ min: number; max: number }> {
    const prices = this.products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  // Get popular tags
  async getPopularTags(limit: number = 20): Promise<string[]> {
    const tagCounts: Record<string, number> = {};
    
    this.products.forEach(product => {
      product.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([tag]) => tag);
  }
}

export const productService = new ProductService();
