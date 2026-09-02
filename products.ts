import { Product, Category, Billboard } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Classic Oxford Tailored Shirt",
    category: "Shirts",
    price: 1499,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Crafted from 100% breathable organic combed cotton with a refined button-down collar and mother-of-pearl buttons. Tailored for comfort and everyday versatility.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Crisp White", "Navy Blue", "Black", "Olive Green"],
    featured: true,
    archived: false,
    inStock: true
  },
  {
    id: "prod-2",
    name: "Slim-Fit Selvedge Denim Jeans",
    category: "Jeans",
    price: 1899,
    originalPrice: 2999,
    rating: 4.9,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
    description: "13.5oz authentic Japanese selvedge denim with 2% elastane for subtle flex. Classic 5-pocket styling with copper rivets and chain-stitched hems.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Indigo Blue", "Washed Black"],
    featured: true,
    archived: false,
    inStock: true
  },
  {
    id: "prod-3",
    name: "Minimalist Chronograph Watch",
    category: "Watches",
    price: 3499,
    originalPrice: 4999,
    rating: 4.9,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    description: "Surgical grade 316L stainless steel casing with sapphire crystal glass, Japanese quartz movement, and interchangeable top-grain Italian leather strap.",
    sizes: ["40mm", "42mm"],
    colors: ["Classic Black", "Silver White", "Rose Gold"],
    featured: true,
    archived: false,
    inStock: true
  },
  {
    id: "prod-4",
    name: "Classic Low-Top Leather Sneakers",
    category: "Footwear",
    price: 2799,
    originalPrice: 3999,
    rating: 4.7,
    reviewsCount: 114,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted full-grain calfskin leather upper with vulcanized rubber cupsole and memory foam cushioned insole for all-day urban comfort.",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Clean White", "All Black"],
    featured: true,
    archived: false,
    inStock: true
  },
  {
    id: "prod-5",
    name: "Premium Nappa Leather Bomber Jacket",
    category: "Jackets",
    price: 4999,
    originalPrice: 7999,
    rating: 5.0,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description: "Supple sheepskin nappa leather with ribbed wool collar, antique brass YKK zip hardware, and quilted satin interior lining.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Midnight Black", "Cognac Brown"],
    featured: true,
    archived: false,
    inStock: true
  },
  {
    id: "prod-6",
    name: "Urban Canvas & Leather Backpack",
    category: "Bags",
    price: 1699,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 62,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description: "Water-resistant 18oz waxed cotton canvas with reinforced leather trim, padded 15-inch laptop compartment, and ergonomic shoulder straps.",
    sizes: ["20 Liters"],
    colors: ["Olive Green", "Charcoal Gray"],
    featured: true,
    archived: false,
    inStock: true
  },
  {
    id: "prod-7",
    name: "Heavyweight Oversized Cotton T-Shirt",
    category: "T-Shirts",
    price: 899,
    originalPrice: 1499,
    rating: 4.6,
    reviewsCount: 180,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    description: "240 GSM single-jersey combed cotton with a relaxed drop-shoulder cut, reinforced ribbed crew collar, and pre-shrunk finish.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Chalk White", "Sage Green"],
    featured: true,
    archived: false,
    inStock: true
  },
  {
    id: "prod-8",
    name: "Polarized Aviator Sunglasses",
    category: "Accessories",
    price: 1299,
    originalPrice: 1999,
    rating: 4.7,
    reviewsCount: 53,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    description: "Ultralight corrosion-resistant titanium frame with UV400 polarized scratch-resistant lenses for superior glare protection.",
    sizes: ["Standard 58mm"],
    colors: ["Gold/Green", "Gunmetal/Black"],
    featured: true,
    archived: false,
    inStock: true
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Men", billboardId: "bill-1", billboardTitle: "Summer Collection 2026", productCount: 18, createdAt: "01 Jan 2026" },
  { id: "cat-2", name: "Women", billboardId: "bill-2", billboardTitle: "Urban Chic Lookbook", productCount: 24, createdAt: "01 Jan 2026" },
  { id: "cat-3", name: "Footwear", billboardId: "bill-1", billboardTitle: "Sneakerhead Drop", productCount: 12, createdAt: "15 Jan 2026" },
  { id: "cat-4", name: "Accessories", billboardId: "bill-2", billboardTitle: "Everyday Carry Essentials", productCount: 16, createdAt: "20 Jan 2026" },
  { id: "cat-5", name: "Bags", billboardId: "bill-1", billboardTitle: "Travel & Backpacks", productCount: 9, createdAt: "25 Jan 2026" },
  { id: "cat-6", name: "Watches", billboardId: "bill-2", billboardTitle: "Luxury Chronographs", productCount: 14, createdAt: "02 Feb 2026" },
];

export const INITIAL_BILLBOARDS: Billboard[] = [
  {
    id: "bill-1",
    title: "SUMMER COLLECTION 2026",
    subtitle: "Modern essentials for effortless living and summer comfort.",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
    status: "Active",
    createdAt: "01 Jan 2026"
  },
  {
    id: "bill-2",
    title: "URBAN STREETWEAR FEST",
    subtitle: "High-density weave jackets and limited edition apparel drops.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
    status: "Inactive",
    createdAt: "10 Feb 2026"
  }
];