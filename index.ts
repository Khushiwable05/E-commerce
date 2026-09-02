export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  description: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
  archived: boolean;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface Order {
  id: string;
  receiptNo: string;
  date: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  receiptStatus: 'Generated' | 'Pending';
}

export interface Category {
  id: string;
  name: string;
  billboardId: string;
  billboardTitle: string;
  productCount: number;
  createdAt: string;
}

export interface Billboard {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}