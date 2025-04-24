import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const CategorySection: React.FC = () => {
  const featuredCategories = [
    {
      id: "evening-gowns",
      name: "Evening Gowns",
      image: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      description: "Elegant and sophisticated gowns for special occasions"
    },
    {
      id: "casual",
      name: "Casual Wear",
      image: "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      description: "Comfortable and stylish pieces for everyday elegance"
    },
    {
      id: "business",
      name: "Business Attire",
      image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      description: "Professional and polished designs for the workplace"
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">Shop by Category</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our collection of carefully curated dresses for every occasion and style preference
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-white text-opacity-90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products" className="btn btn-outline hover:border-primary-600 hover:text-primary-600">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;