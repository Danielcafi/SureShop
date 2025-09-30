import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService, Product, ProductFilters, SortOption } from '../services/productService';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ChevronDown, Filter, Grid, List } from 'lucide-react';

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { category } = useParams();
  
  const [filters, setFilters] = useState<ProductFilters>({
    category: category || undefined,
    minPrice: undefined,
    maxPrice: undefined,
    rating: undefined,
    inStock: false,
    isNew: false,
    isFeatured: false,
    isOnSale: false
  });
  
  const [sort, setSort] = useState<SortOption>({
    field: 'createdAt',
    direction: 'desc'
  });

  useEffect(() => {
    fetchProducts();
  }, [filters, sort, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await productService.getProducts(
        filters,
        sort,
        { page: currentPage, limit: 12 }
      );
      
      setProducts(result.products);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: category || undefined,
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      inStock: false,
      isNew: false,
      isFeatured: false,
      isOnSale: false
    });
    setCurrentPage(1);
  };

  const sortOptions = [
    { value: 'createdAt-desc', label: 'Newest First' },
    { value: 'createdAt-asc', label: 'Oldest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category ? `${category} Products` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {total} product{total !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn btn-outline btn-sm flex items-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                <div className="card">
                  <div className="card-header">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Filters</h3>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  <div className="card-body space-y-6">
                    {/* Price Range */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                      <div className="space-y-2">
                        <input
                          type="number"
                          placeholder="Min Price"
                          value={filters.minPrice || ''}
                          onChange={(e) => handleFilterChange({ 
                            minPrice: e.target.value ? Number(e.target.value) : undefined 
                          })}
                          className="form-input"
                        />
                        <input
                          type="number"
                          placeholder="Max Price"
                          value={filters.maxPrice || ''}
                          onChange={(e) => handleFilterChange({ 
                            maxPrice: e.target.value ? Number(e.target.value) : undefined 
                          })}
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <label key={rating} className="flex items-center">
                            <input
                              type="radio"
                              name="rating"
                              value={rating}
                              checked={filters.rating === rating}
                              onChange={(e) => handleFilterChange({ 
                                rating: e.target.checked ? rating : undefined 
                              })}
                              className="mr-2"
                            />
                            <span className="text-sm">{rating}+ stars</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Filters */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Filters</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.inStock || false}
                            onChange={(e) => handleFilterChange({ inStock: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm">In Stock Only</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.isNew || false}
                            onChange={(e) => handleFilterChange({ isNew: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm">New Products</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.isFeatured || false}
                            onChange={(e) => handleFilterChange({ isFeatured: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm">Featured</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.isOnSale || false}
                            onChange={(e) => handleFilterChange({ isOnSale: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm">On Sale</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <select
                  value={`${sort.field}-${sort.direction}`}
                  onChange={(e) => {
                    const [field, direction] = e.target.value.split('-');
                    handleSortChange({ field: field as any, direction: direction as any });
                  }}
                  className="form-select"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="hidden lg:flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`${
                  viewMode === 'grid' 
                    ? 'product-grid' 
                    : 'space-y-4'
                }`}>
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      showQuickActions={true}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn btn-outline btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-8 h-8 rounded text-sm font-medium ${
                                currentPage === page
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="btn btn-outline btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
