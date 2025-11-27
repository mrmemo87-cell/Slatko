export type UserRole = 'ADMIN' | 'WORKER' | 'DELIVERY';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  unit: string;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  phone: string;
  balance: number;
  lastVisit?: string;
}

export type OrderStatus = 'PENDING' | 'PREPARED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}

export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  method: 'CASH' | 'BANK_TRANSFER' | 'CHECK';
  date: string;
}

export interface RouteStop {
  id: string;
  clientId: string;
  clientName: string;
  address: string;
  status: 'PENDING' | 'COMPLETED' | 'SKIPPED';
  orderId?: string;
}

export interface Purchase {
  id: string;
  supplier: string;
  date: string;
  total: number;
  status: 'RECEIVED' | 'PENDING';
  items: string; // Simplified for table display
}