export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: {
    name: string;
    code: string;
  }[];
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
}