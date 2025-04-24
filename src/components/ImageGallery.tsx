import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState(0);
  
  const nextImage = () => {
    setMainImage((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setMainImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <img
          src={images[mainImage]}
          alt={`${productName} - View ${mainImage + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-md hover:bg-opacity-100 transition-all duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-md hover:bg-opacity-100 transition-all duration-200"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto py-1">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(idx)}
              className={`w-16 h-16 flex-shrink-0 rounded border-2 overflow-hidden ${
                idx === mainImage ? 'border-primary-600' : 'border-transparent'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;