import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { categories, sizes, colors } from '../data/products';

interface CategoryFilterProps {
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: string[];
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  selectedSizes,
  selectedColors,
  priceRange,
  onCategoryChange,
  onSizeChange,
  onColorChange,
  onPriceChange,
  onClearFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    sizes: true,
    colors: true,
    price: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={onClearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear All
        </button>
      </div>

      {/* Categories Section */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium pb-2 border-b border-neutral-200"
          onClick={() => toggleSection('categories')}
        >
          Categories
          {expandedSections.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.categories && (
          <div className="mt-3 space-y-2">
            {categories.map(category => (
              <label key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => onCategoryChange(category.id)}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-neutral-600">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium pb-2 border-b border-neutral-200"
          onClick={() => toggleSection('price')}
        >
          Price Range
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.price && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">${priceRange[0]}</span>
              <span className="text-sm text-neutral-600">${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={500}
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex mt-3 gap-2">
              <input
                type="number"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
                className="w-1/2 px-2 py-1 border border-neutral-300 rounded-md text-sm"
              />
              <input
                type="number"
                min={priceRange[0]}
                max={500}
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                className="w-1/2 px-2 py-1 border border-neutral-300 rounded-md text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Sizes Section */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium pb-2 border-b border-neutral-200"
          onClick={() => toggleSection('sizes')}
        >
          Sizes
          {expandedSections.sizes ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.sizes && (
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => onSizeChange(size)}
                className={`px-3 py-1 border rounded-md text-sm ${
                  selectedSizes.includes(size)
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Colors Section */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium pb-2 border-b border-neutral-200"
          onClick={() => toggleSection('colors')}
        >
          Colors
          {expandedSections.colors ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.colors && (
          <div className="mt-3 flex flex-wrap gap-3">
            {colors.map(color => (
              <button
                key={color.name}
                onClick={() => onColorChange(color.name)}
                className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                  selectedColors.includes(color.name) 
                    ? 'border-neutral-800 ring-2 ring-primary-300' 
                    : 'border-neutral-300'
                }`}
                style={{ backgroundColor: color.code }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              >
                {selectedColors.includes(color.name) && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;