import { Client, Order, Product, RouteStop, User, Purchase } from "./types";

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', role: 'ADMIN', email: 'admin@slatko.com' },
  { id: '2', name: 'Worker John', role: 'WORKER', email: 'john@slatko.com' },
  { id: '3', name: 'Driver Mike', role: 'DELIVERY', email: 'mike@slatko.com' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Premium Coffee Beans', sku: 'CB-001', price: 15.50, stock: 120, category: 'Raw Material', unit: 'kg' },
  { id: 'p2', name: 'Paper Cups (12oz)', sku: 'PC-12', price: 0.10, stock: 5000, category: 'Supplies', unit: 'pcs' },
  { id: 'p3', name: 'Caramel Syrup', sku: 'SY-CAR', price: 8.00, stock: 45, category: 'Syrup', unit: 'bottle' },
  { id: 'p4', name: 'Vanilla Syrup', sku: 'SY-VAN', price: 8.00, stock: 30, category: 'Syrup', unit: 'bottle' },
  { id: 'p5', name: 'Chocolate Powder', sku: 'PO-CHOC', price: 12.00, stock: 8, category: 'Raw Material', unit: 'kg' }, // Low stock
  { id: 'p6', name: 'Flour Type 500', sku: 'RM-FL', price: 1.20, stock: 500, category: 'Raw Material', unit: 'kg' },
  { id: 'p7', name: 'Sugar', sku: 'RM-SU', price: 1.50, stock: 12, category: 'Raw Material', unit: 'kg' }, // Low stock
];

export const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'Sunrise Café', address: '123 Market St', phone: '555-0101', balance: 150.00, lastVisit: '2023-10-25' },
  { id: 'c2', name: 'Bean There Done That', address: '456 Coffee Ln', phone: '555-0102', balance: 0.00, lastVisit: '2023-10-26' },
  { id: 'c3', name: 'The Daily Grind', address: '789 Brew Ave', phone: '555-0103', balance: -50.00, lastVisit: '2023-10-24' },
  { id: 'c4', name: 'Espresso Yourself', address: '321 Latte Blvd', phone: '555-0104', balance: 320.00, lastVisit: '2023-10-20' },
  { id: 'c5', name: 'Steamy Mugs', address: '654 Mocha Rd', phone: '555-0105', balance: 45.50, lastVisit: '2023-10-22' },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1', clientId: 'c1', clientName: 'Sunrise Café', date: '2023-10-26', status: 'PENDING', total: 155.00,
    items: [{ productId: 'p1', productName: 'Premium Coffee Beans', quantity: 10, price: 15.50 }]
  },
  {
    id: 'o2', clientId: 'c2', clientName: 'Bean There Done That', date: '2023-10-26', status: 'PREPARED', total: 40.00,
    items: [{ productId: 'p3', productName: 'Caramel Syrup', quantity: 5, price: 8.00 }]
  },
  {
    id: 'o3', clientId: 'c3', clientName: 'The Daily Grind', date: '2023-10-25', status: 'DELIVERED', total: 100.00,
    items: [{ productId: 'p2', productName: 'Paper Cups (12oz)', quantity: 1000, price: 0.10 }]
  }
];

export const MOCK_PURCHASES: Purchase[] = [
  { id: 'pu1', supplier: 'Metro Cash & Carry', date: '2023-10-26', total: 1200.50, status: 'RECEIVED', items: 'Flour, Sugar, Milk' },
  { id: 'pu2', supplier: 'Coffee Importers Ltd', date: '2023-10-25', total: 4500.00, status: 'PENDING', items: 'Green Coffee Beans' },
];

export const MOCK_ROUTE: RouteStop[] = [
  { id: 'r1', clientId: 'c1', clientName: 'Sunrise Café', address: '123 Market St', status: 'PENDING', orderId: 'o1' },
  { id: 'r2', clientId: 'c2', clientName: 'Bean There Done That', address: '456 Coffee Ln', status: 'PENDING', orderId: 'o2' },
  { id: 'r3', clientId: 'c3', clientName: 'The Daily Grind', address: '789 Brew Ave', status: 'COMPLETED' },
];

export const MONTHLY_SALES_DATA = [
  { name: 'Jan', sales: 4000, returns: 240 },
  { name: 'Feb', sales: 3000, returns: 139 },
  { name: 'Mar', sales: 2000, returns: 980 },
  { name: 'Apr', sales: 2780, returns: 390 },
  { name: 'May', sales: 1890, returns: 480 },
  { name: 'Jun', sales: 2390, returns: 380 },
  { name: 'Jul', sales: 3490, returns: 430 },
];