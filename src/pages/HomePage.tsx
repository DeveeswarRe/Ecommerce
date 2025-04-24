import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-neutral-100 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-primary-600 font-medium mb-2">NEW ARRIVAL</span>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Summer Collection 2025</h2>
                <p className="text-neutral-600 mb-6 md:pr-12">
                  Our newest collection features lightweight fabrics and vibrant colors perfect for the summer season. 
                  Designed for comfort and style during those warm days.
                </p>
                <div>
                  <button className="btn btn-primary">Explore Collection</button>
                </div>
              </div>
              <div className="aspect-[4/3] md:aspect-auto">
                <img 
                  src="https://images.pexels.com/photos/7172638/pexels-photo-7172638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="Summer collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;