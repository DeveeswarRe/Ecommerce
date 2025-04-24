import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-neutral-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
          alt="Elegant dress showcase" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      
      <div className="relative container-custom min-h-[85vh] flex flex-col justify-center py-16">
        <div className="max-w-xl md:max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 tracking-tight">
            Elegance in <span className="font-semibold">Every</span> <br />
            <span className="font-semibold text-accent-400">Stitch</span>
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
            Discover our curated collection of premium dresses crafted to perfection. 
            From elegant evening gowns to casual everyday wear.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/products" 
              className="btn btn-primary px-8 py-3"
            >
              Shop Collection
            </Link>
            <Link 
              to="/products?category=evening-gowns" 
              className="btn btn-outline border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3"
            >
              Evening Gowns
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;