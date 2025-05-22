
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}
