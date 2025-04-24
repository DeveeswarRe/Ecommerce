import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, Shield, Star } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import ImageGallery from '../components/ImageGallery';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id, 10)) || null;
      setProduct(foundProduct);
      
      // Reset selections when product changes
      if (foundProduct) {
        setSelectedSize(foundProduct.sizes[0] || '');
        setSelectedColor(foundProduct.colors[0]?.name || '');
        
        // Get related products from the same category
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-6 text-neutral-600">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, quantity);
    }
  };
  
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="bg-white">
      <div className="container-custom py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-neutral-500 hover:text-primary-600">Home</Link>
            </li>
            <li className="text-neutral-400">/</li>
            <li>
              <Link to="/products" className="text-neutral-500 hover:text-primary-600">Products</Link>
            </li>
            <li className="text-neutral-400">/</li>
            <li className="text-neutral-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-accent-600">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    strokeWidth={i < Math.floor(product.rating) ? 0 : 2}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-neutral-500">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {product.originalPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-secondary-600">${product.price.toFixed(2)}</span>
                  <span className="ml-3 text-lg text-neutral-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="ml-3 px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-700 rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-neutral-600 mb-6">{product.description}</p>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Size</span>
                <button className="text-sm text-primary-600 hover:text-primary-700">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-neutral-800 border-neutral-300 hover:border-primary-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <span className="font-medium block mb-2">Color</span>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full border-2 ${
                      selectedColor === color.name 
                        ? 'ring-2 ring-primary-400 border-white' 
                        : 'border-neutral-200'
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
              {selectedColor && (
                <span className="text-sm text-neutral-500 mt-2 block">Selected: {selectedColor}</span>
              )}
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <span className="font-medium block mb-2">Quantity</span>
              <div className="flex items-center border border-neutral-300 rounded-md w-32">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 h-10 text-center border-none focus:ring-0"
                />
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart & Wishlist */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 py-3"
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </button>
              <button
                onClick={toggleWishlist}
                className={`btn flex-1 py-3 ${
                  isWishlisted 
                    ? 'bg-white border border-secondary-600 text-secondary-600 hover:bg-secondary-50' 
                    : 'btn-outline'
                }`}
              >
                <Heart 
                  size={18} 
                  className="mr-2" 
                  fill={isWishlisted ? "currentColor" : "none"} 
                />
                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck size={20} className="text-neutral-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-neutral-900">Free Shipping</h4>
                  <p className="text-sm text-neutral-600">Free standard shipping on orders over $100</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield size={20} className="text-neutral-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-neutral-900">30-Day Returns</h4>
                  <p className="text-sm text-neutral-600">Return or exchange within 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16 border-t border-neutral-200">
          <div className="flex border-b border-neutral-200 mt-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'description' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'features' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'reviews' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-neutral-700 leading-relaxed">{product.description}</p>
                <p className="text-neutral-700 leading-relaxed mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-4 h-4 rounded-full bg-primary-100 text-primary-600 text-xs flex items-center justify-center mr-3 mt-1">
                        ✓
                      </span>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className="text-5xl font-bold text-neutral-900">{product.rating.toFixed(1)}</div>
                    <div className="flex text-accent-600 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                          strokeWidth={i < Math.floor(product.rating) ? 0 : 2}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-neutral-500 mt-1">Based on {product.reviewCount} reviews</div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(star => {
                        // Calculate percentage (this is just sample data)
                        const percentage = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 8 : star === 2 ? 2 : 0;
                        
                        return (
                          <div key={star} className="flex items-center">
                            <div className="w-12 text-sm text-neutral-600">{star} stars</div>
                            <div className="w-full bg-neutral-200 rounded-full h-2 ml-2">
                              <div 
                                className="bg-accent-600 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="w-12 text-xs text-neutral-500 text-right">{percentage}%</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <button className="btn btn-primary">Write a Review</button>
                
                <div className="mt-8 space-y-6">
                  <p className="text-center text-neutral-500">
                    Customer reviews will appear here. <br />
                    Be the first to review this product!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;