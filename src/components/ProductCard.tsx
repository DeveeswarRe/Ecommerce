import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card group card h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="block overflow-hidden relative">
        {/* Product Image */}
        <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
          
        {/* Discount Badge */}
        {product.originalPrice && (
          <span className="absolute top-2 left-2 bg-secondary-600 text-white px-2 py-1 text-xs font-medium rounded">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}
          
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-neutral-100 transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            fill={isWishlisted ? "#BE185D" : "none"} 
            className={isWishlisted ? "text-secondary-600" : "text-neutral-600"} 
          />
        </button>
          
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Quick Add to Cart
          </button>
        </div>
      </Link>
        
      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-neutral-800 mb-1 transition-colors hover:text-primary-600">
          <Link to={`/products/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-neutral-500 mb-2">{product.category}</p>
          
        {/* Price */}
        <div className="mt-auto flex items-center">
          {product.originalPrice ? (
            <>
              <span className="font-semibold text-secondary-600">${product.price.toFixed(2)}</span>
              <span className="ml-2 text-sm text-neutral-500 line-through">${product.originalPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          )}
          
          {/* Rating Stars */}
          <div className="ml-auto flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'text-accent-600'
                      : 'text-neutral-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-neutral-500 ml-1.5">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;