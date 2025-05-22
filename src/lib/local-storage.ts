
import { Product, CartItem } from '@/types';

// Local storage keys
export const PRODUCTS_STORAGE_KEY = 'machzaulmart_products';
export const CART_STORAGE_KEY = 'machzaulmart_cart';
export const ORDERS_STORAGE_KEY = 'machzaulmart_orders';

// Product functions
export function getProducts(): Product[] {
  const products = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  return products ? JSON.parse(products) : [];
}

export function setProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

export function seedProducts(): void {
  if (getProducts().length === 0) {
    setProducts([
      {
        id: '1',
        name: 'Stylish Headphones',
        description: 'Premium wireless headphones with noise cancellation.',
        price: 249.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        stock: 15
      },
      {
        id: '2',
        name: 'Smart Watch',
        description: 'Track your fitness and receive notifications on the go.',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        stock: 10
      },
      {
        id: '3',
        name: 'Minimalist Desk Lamp',
        description: 'Modern desk lamp with adjustable brightness.',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
        stock: 25
      },
      {
        id: '4',
        name: 'Organic Coffee Beans',
        description: 'Ethically sourced premium coffee beans.',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e',
        stock: 30
      },
      {
        id: '5',
        name: 'Leather Wallet',
        description: 'Handcrafted genuine leather wallet with RFID protection.',
        price: 45.99,
        imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
        stock: 18
      },
      {
        id: '6',
        name: 'Ceramic Plant Pot',
        description: 'Minimalist design perfect for succulents and small plants.',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
        stock: 22
      },
    ]);
  }
}

// Cart functions
export function getCart(): CartItem[] {
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function setCart(cart: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product, quantity: number = 1): CartItem[] {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  setCart(cart);
  return cart;
}

export function updateCartItemQuantity(productId: string, quantity: number): CartItem[] {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.product.id === productId);

  if (itemIndex >= 0) {
    if (quantity > 0) {
      cart[itemIndex].quantity = quantity;
    } else {
      cart.splice(itemIndex, 1);
    }
  }

  setCart(cart);
  return cart;
}

export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart().filter(item => item.product.id !== productId);
  setCart(cart);
  return cart;
}

export function clearCart(): void {
  setCart([]);
}

// Order functions
export function getOrders() {
  const orders = localStorage.getItem(ORDERS_STORAGE_KEY);
  return orders ? JSON.parse(orders) : [];
}

export function setOrders(orders: any[]) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function addOrder(order: any) {
  const orders = getOrders();
  orders.push(order);
  setOrders(orders);
  return order;
}

export function getOrderById(id: string) {
  const orders = getOrders();
  return orders.find((order: any) => order.id === id);
}
