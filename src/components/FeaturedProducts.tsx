import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const FeaturedProducts: React.FC = () => {
  // Get 4 featured products (you could customize this logic)
  const featuredProducts = products
    .filter(product => product.rating >= 4.5)
    .slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">Featured Collection</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Our most popular designs, loved for their exceptional quality and timeless style
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;