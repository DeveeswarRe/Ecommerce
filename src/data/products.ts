import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Serene Evening Gown",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760",
      "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760"
    ],
    category: "Evening Gowns",
    tags: ["formal", "elegant", "special occasion"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Blue", code: "#1a237e" },
      { name: "Ruby Red", code: "#b71c1c" },
      { name: "Emerald", code: "#1b5e20" }
    ],
    description: "A stunning floor-length evening gown designed with elegant draping and a fitted bodice. Perfect for galas, weddings, and formal events.",
    features: [
      "Floor-length silhouette",
      "Fitted bodice with gentle draping",
      "Concealed back zipper",
      "Lined for comfort",
      "Made from premium silk blend"
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true
  },
  {
    id: 2,
    name: "Floral Sundress",
    price: 89.99,
    images: [
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760",
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760"
    ],
    category: "Casual",
    tags: ["summer", "floral", "casual"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Blush Pink", code: "#f8bbd0" },
      { name: "Light Blue", code: "#bbdefb" }
    ],
    description: "A lovely floral sundress perfect for summer days. Features a flattering A-line cut and adjustable straps.",
    features: [
      "A-line silhouette",
      "Adjustable straps",
      "Side pockets",
      "100% cotton",
      "Machine washable"
    ],
    rating: 4.6,
    reviewCount: 87,
    inStock: true
  },
  {
    id: 3,
    name: "Tailored Business Dress",
    price: 159.99,
    images: [
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760",
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760"
    ],
    category: "Business",
    tags: ["office", "professional", "workwear"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", code: "#212121" },
      { name: "Navy", code: "#0d47a1" },
      { name: "Charcoal", code: "#424242" }
    ],
    description: "A sophisticated tailored dress for the professional woman. Designed with a sleek silhouette and comfortable stretch fabric.",
    features: [
      "Knee-length",
      "Tailored fit",
      "Back vent for ease of movement",
      "Stretch polyester blend",
      "Fully lined"
    ],
    rating: 4.5,
    reviewCount: 62,
    inStock: true
  },
  {
    id: 4,
    name: "Bohemian Maxi Dress",
    price: 129.99,
    originalPrice: 159.99,
    images: [
      "https://images.pexels.com/photos/5560019/pexels-photo-5560019.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/5560019/pexels-photo-5560019.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760",
      "https://images.pexels.com/photos/5560019/pexels-photo-5560019.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760"
    ],
    category: "Bohemian",
    tags: ["boho", "summer", "vacation"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Terracotta", code: "#bf360c" },
      { name: "Sage Green", code: "#7cb342" }
    ],
    description: "An effortlessly stylish bohemian maxi dress with intricate embroidery details and a flowing silhouette.",
    features: [
      "Floor-length maxi cut",
      "Embroidered details",
      "Adjustable tie waist",
      "V-neckline",
      "100% rayon, light and breathable"
    ],
    rating: 4.7,
    reviewCount: 93,
    inStock: true
  },
  {
    id: 5,
    name: "Little Black Dress",
    price: 139.99,
    images: [
      "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760",
      "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760"
    ],
    category: "Cocktail",
    tags: ["classic", "versatile", "evening"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", code: "#000000" }
    ],
    description: "The perfect little black dress for any occasion. Features a classic silhouette with a modern twist.",
    features: [
      "Above-knee length",
      "Fitted waist",
      "Bateau neckline",
      "Hidden back zipper",
      "Polyester blend with slight stretch"
    ],
    rating: 4.9,
    reviewCount: 215,
    inStock: true
  },
  {
    id: 6,
    name: "Summer Wrap Dress",
    price: 79.99,
    images: [
      "https://images.pexels.com/photos/7172638/pexels-photo-7172638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/7172638/pexels-photo-7172638.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760",
      "https://images.pexels.com/photos/7172638/pexels-photo-7172638.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760"
    ],
    category: "Casual",
    tags: ["summer", "wrap", "daytime"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Coral", code: "#ff7043" },
      { name: "Mint", code: "#80cbc4" },
      { name: "Lavender", code: "#b39ddb" }
    ],
    description: "A flattering wrap dress perfect for summer days. Features a self-tie belt and flowing skirt.",
    features: [
      "True wrap style",
      "Adjustable tie closure",
      "V-neckline",
      "Knee length",
      "Lightweight viscose fabric"
    ],
    rating: 4.4,
    reviewCount: 68,
    inStock: true
  },
  {
    id: 7,
    name: "Sequin Cocktail Dress",
    price: 199.99,
    images: [
      "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760",
      "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760"
    ],
    category: "Cocktail",
    tags: ["party", "glam", "evening"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Gold", code: "#ffd700" },
      { name: "Silver", code: "#c0c0c0" },
      { name: "Rose Gold", code: "#b76e79" }
    ],
    description: "Make a statement in this dazzling sequin cocktail dress. Perfect for parties and special events.",
    features: [
      "Mini length",
      "Fitted silhouette",
      "Full sequin embellishment",
      "Concealed back zipper",
      "Fully lined"
    ],
    rating: 4.7,
    reviewCount: 104,
    inStock: true
  },
  {
    id: 8,
    name: "Linen Shirt Dress",
    price: 109.99,
    images: [
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760",
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=450&w=760"
    ],
    category: "Casual",
    tags: ["summer", "linen", "relaxed"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", code: "#ffffff" },
      { name: "Sand", code: "#e0cda9" },
      { name: "Sky Blue", code: "#87ceeb" }
    ],
    description: "A comfortable and stylish linen shirt dress, perfect for warm weather and casual outings.",
    features: [
      "Relaxed fit",
      "Button-down front",
      "Collared neckline",
      "Roll-up sleeves with button tabs",
      "100% linen"
    ],
    rating: 4.5,
    reviewCount: 76,
    inStock: true
  }
];

export const categories = [
  { id: "evening-gowns", name: "Evening Gowns" },
  { id: "casual", name: "Casual" },
  { id: "business", name: "Business" },
  { id: "bohemian", name: "Bohemian" },
  { id: "cocktail", name: "Cocktail" }
];

export const sizes = ["XS", "S", "M", "L", "XL"];

export const colors = [
  { name: "Black", code: "#000000" },
  { name: "White", code: "#ffffff" },
  { name: "Red", code: "#f44336" },
  { name: "Blue", code: "#2196f3" },
  { name: "Green", code: "#4caf50" },
  { name: "Yellow", code: "#ffeb3b" },
  { name: "Purple", code: "#9c27b0" },
  { name: "Pink", code: "#e91e63" },
  { name: "Brown", code: "#795548" },
  { name: "Gray", code: "#9e9e9e" }
];