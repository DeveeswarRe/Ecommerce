import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import ProductSort from '../components/ProductSort';
import { products } from '../data/products';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category');

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.some(cat => 
          product.category.toLowerCase() === cat.replace(/-/g, ' ').toLowerCase()
        )
      );
    }
    
    // Apply size filter
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => selectedColors.includes(color.name))
      );
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming newer products have higher IDs, which is often the case
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      // 'featured' is default, keep original order
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategories, selectedSizes, selectedColors, priceRange, sortOption]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Handle size change
  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  // Handle color change
  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  // Handle price range change
  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
  };

  return (
    <div className="bg-neutral-50 pb-16">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-10">
          <h1 className="text-3xl font-semibold mb-2">All Products</h1>
          <p className="text-neutral-600">
            Explore our collection of beautiful dresses for every occasion
          </p>
        </div>
      </div>

      <div className="container-custom pt-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full flex items-center justify-center p-3 border border-neutral-300 rounded-md bg-white"
          >
            <Filter size={18} className="mr-2" />
            <span>Filter Products</span>
          </button>
        </div>

        {/* Product Grid with Sidebar */}
        <div className="flex flex-col lg:flex-row">
          {/* Filters Sidebar */}
          <aside 
            className={`w-full lg:w-64 lg:mr-8 ${isMobileFilterOpen ? 'block' : 'hidden'} lg:block`}
          >
            <CategoryFilter
              selectedCategories={selectedCategories}
              selectedSizes={selectedSizes}
              selectedColors={selectedColors}
              priceRange={priceRange}
              onCategoryChange={handleCategoryChange}
              onSizeChange={handleSizeChange}
              onColorChange={handleColorChange}
              onPriceChange={handlePriceChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductSort 
              sortOption={sortOption} 
              onSortChange={setSortOption} 
              productsCount={filteredProducts.length}
            />

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No products found</h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your filters or browse our categories
                </p>
                <button 
                  onClick={handleClearFilters}
                  className="btn btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;