import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../services/productService';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  showQuickActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showQuickActions = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      addItem({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="product-image group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="badge-new">New</span>
            )}
            {product.isFeatured && (
              <span className="badge-featured">Featured</span>
            )}
            {product.isOnSale && product.discount && (
              <span className="badge-sale">-{product.discount}%</span>
            )}
          </div>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className={`absolute top-2 right-2 flex flex-col gap-1 transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist(product.id.toString())
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
                title={isInWishlist(product.id.toString()) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleAddToCart}
                disabled={isLoading || product.stock === 0}
                className="p-2 bg-white text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add to cart"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
              </button>
            </div>
          )}

          {/* Stock Status */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{product.brand}</span>
            <div className="flex items-center">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="product-title">{product.name}</h3>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <span className="product-price">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="product-price-original">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            {product.stock > 0 && (
              <span className="text-xs text-green-600 font-medium">
                {product.stock} in stock
              </span>
            )}
          </div>

          {/* Features Preview */}
          {product.features.length > 0 && (
            <div className="mt-2">
              <ul className="text-xs text-gray-600 space-y-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
