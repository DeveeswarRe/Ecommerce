import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductSortProps {
  sortOption: string;
  onSortChange: (option: string) => void;
  productsCount: number;
}

const ProductSort: React.FC<ProductSortProps> = ({ sortOption, onSortChange, productsCount }) => {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-neutral-200 mb-6">
      <div className="text-neutral-600 mb-3 sm:mb-0">
        Showing <span className="font-medium text-neutral-900">{productsCount}</span> results
      </div>
      
      <div className="relative">
        <div className="flex items-center">
          <span className="mr-2 text-neutral-600">Sort by:</span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-neutral-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-600">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSort;