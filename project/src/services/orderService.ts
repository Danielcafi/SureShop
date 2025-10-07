import { Product } from '../data/products';
import { Address } from './authService';

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'payoneer';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface CreateOrderData {
  items: Omit<OrderItem, 'id' | 'product'>[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  notes?: string;
  discountCode?: string;
}

export interface OrderSummary {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: Date;
}

export interface OrderTracking {
  orderId: string;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  updates: TrackingUpdate[];
}

export interface TrackingUpdate {
  status: OrderStatus;
  timestamp: Date;
  location?: string;
  description: string;
}

class OrderService {
  private orders: Order[] = [];
  private readonly ORDERS_STORAGE_KEY = 'ecommerce_orders';

  constructor() {
    this.loadOrdersFromStorage();
    this.initializeMockOrders();
  }

  // Load orders from localStorage
  private loadOrdersFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.ORDERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.orders = parsed.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
          deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : undefined
        }));
      }
    } catch (error) {
      console.error('Error loading orders from storage:', error);
      this.orders = [];
    }
  }

  // Save orders to localStorage
  private saveOrdersToStorage(): void {
    try {
      localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(this.orders));
    } catch (error) {
      console.error('Error saving orders to storage:', error);
    }
  }

  // Initialize mock orders for demo
  private initializeMockOrders(): void {
    if (this.orders.length === 0) {
      // Add some mock orders for demo purposes
      const mockOrders: Order[] = [
        {
          id: 'order_1',
          orderNumber: 'ORD-2024-001',
          userId: 'demo_user',
          status: 'delivered',
          items: [
            {
              id: 'item_1',
              product: {
                id: 1,
                name: 'Apple MacBook Pro 16-inch',
                price: 2499.99,
                image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400'
              } as Product,
              quantity: 1,
              price: 2499.99
            }
          ],
          subtotal: 2499.99,
          tax: 199.99,
          shipping: 0,
          total: 2699.98,
          shippingAddress: {
            id: 'addr_1',
            type: 'shipping',
            firstName: 'Demo',
            lastName: 'User',
            address1: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'US',
            isDefault: true
          },
          billingAddress: {
            id: 'addr_1',
            type: 'billing',
            firstName: 'Demo',
            lastName: 'User',
            address1: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'US',
            isDefault: true
          },
          paymentMethod: {
            type: 'card',
            last4: '4242',
            brand: 'Visa'
          },
          trackingNumber: '1Z999AA1234567890',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
      ];

      this.orders = mockOrders;
      this.saveOrdersToStorage();
    }
  }

  // Create new order
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const orderNumber = `ORD-${new Date().getFullYear()}-${String(this.orders.length + 1).padStart(3, '0')}`;
    const orderId = `order_${Date.now()}`;

    // Calculate totals
    const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal >= 100 ? 0 : 10;
    const discount = 0; // Would be calculated based on discount code
    const total = subtotal + tax + shipping - discount;

    const order: Order = {
      id: orderId,
      orderNumber,
      userId: 'current_user', // Would come from auth context
      status: 'pending',
      items: orderData.items.map(item => ({
        ...item,
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      })),
      subtotal,
      tax,
      shipping,
      discount: discount > 0 ? discount : undefined,
      total,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      paymentMethod: orderData.paymentMethod,
      notes: orderData.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    };

    this.orders.unshift(order); // Add to beginning of array
    this.saveOrdersToStorage();

    return order;
  }

  // Get orders for user
  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orders.filter(order => order.userId === userId);
  }

  // Get single order
  async getOrder(orderId: string): Promise<Order | null> {
    return this.orders.find(order => order.id === orderId) || null;
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      
      if (status === 'delivered') {
        order.deliveredAt = new Date();
      }
      
      this.saveOrdersToStorage();
      return order;
    }
    return null;
  }

  // Add tracking number
  async addTrackingNumber(orderId: string, trackingNumber: string): Promise<Order | null> {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.trackingNumber = trackingNumber;
      order.status = 'shipped';
      order.updatedAt = new Date();
      this.saveOrdersToStorage();
      return order;
    }
    return null;
  }

  // Cancel order
  async cancelOrder(orderId: string, reason?: string): Promise<Order | null> {
    const order = this.orders.find(order => order.id === orderId);
    if (order && ['pending', 'confirmed'].includes(order.status)) {
      order.status = 'cancelled';
      order.updatedAt = new Date();
      if (reason) {
        order.notes = (order.notes || '') + `\nCancellation reason: ${reason}`;
      }
      this.saveOrdersToStorage();
      return order;
    }
    return null;
  }

  // Get order tracking
  async getOrderTracking(orderId: string): Promise<OrderTracking | null> {
    const order = this.orders.find(order => order.id === orderId);
    if (!order) return null;

    const updates: TrackingUpdate[] = [
      {
        status: 'pending',
        timestamp: order.createdAt,
        description: 'Order placed'
      }
    ];

    if (order.status !== 'pending') {
      updates.push({
        status: 'confirmed',
        timestamp: new Date(order.createdAt.getTime() + 30 * 60 * 1000), // 30 minutes later
        description: 'Order confirmed'
      });
    }

    if (['processing', 'shipped', 'delivered'].includes(order.status)) {
      updates.push({
        status: 'processing',
        timestamp: new Date(order.createdAt.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
        description: 'Order is being processed'
      });
    }

    if (['shipped', 'delivered'].includes(order.status)) {
      updates.push({
        status: 'shipped',
        timestamp: new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000), // 1 day later
        location: 'Distribution Center',
        description: 'Order shipped'
      });
    }

    if (order.status === 'delivered') {
      updates.push({
        status: 'delivered',
        timestamp: order.deliveredAt || new Date(),
        location: 'Delivered',
        description: 'Order delivered'
      });
    }

    return {
      orderId: order.id,
      status: order.status,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery,
      updates
    };
  }

  // Get order summary for user
  async getOrderSummary(userId: string): Promise<OrderSummary> {
    const userOrders = this.orders.filter(order => order.userId === userId);
    
    const totalOrders = userOrders.length;
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
    const lastOrderDate = userOrders.length > 0 ? 
      new Date(Math.max(...userOrders.map(order => order.createdAt.getTime()))) : 
      undefined;

    return {
      totalOrders,
      totalSpent,
      averageOrderValue,
      lastOrderDate
    };
  }

  // Get order statistics
  getOrderStats(): {
    totalOrders: number;
    pendingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
  } {
    const totalOrders = this.orders.length;
    const pendingOrders = this.orders.filter(order => order.status === 'pending').length;
    const shippedOrders = this.orders.filter(order => order.status === 'shipped').length;
    const deliveredOrders = this.orders.filter(order => order.status === 'delivered').length;
    const cancelledOrders = this.orders.filter(order => order.status === 'cancelled').length;
    const totalRevenue = this.orders
      .filter(order => !['cancelled', 'refunded'].includes(order.status))
      .reduce((sum, order) => sum + order.total, 0);

    return {
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue
    };
  }

  // Search orders
  async searchOrders(query: string, userId?: string): Promise<Order[]> {
    let filteredOrders = this.orders;

    if (userId) {
      filteredOrders = filteredOrders.filter(order => order.userId === userId);
    }

    if (query) {
      const searchTerm = query.toLowerCase();
      filteredOrders = filteredOrders.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm) ||
        order.items.some(item => 
          item.product.name.toLowerCase().includes(searchTerm)
        )
      );
    }

    return filteredOrders;
  }
}

export const orderService = new OrderService();
