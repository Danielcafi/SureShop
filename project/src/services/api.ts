const API_BASE_URL = 'https://localhost:7000/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  userId: string;
  createdAt: string;
}

export interface Order {
  id: number;
  userId: string;
  total: number;
  status: string;
  shippingAddress: string;
  billingAddress: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Products
  async getProducts(category?: string): Promise<Product[]> {
    const endpoint = category ? `/products?category=${encodeURIComponent(category)}` : '/products';
    return this.request<Product[]>(endpoint);
  }

  async getProduct(id: number): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  // Cart
  async getCartItems(userId: string): Promise<CartItem[]> {
    return this.request<CartItem[]>(`/cart/${userId}`);
  }

  async addToCart(cartItem: Omit<CartItem, 'id' | 'createdAt'>): Promise<CartItem> {
    return this.request<CartItem>('/cart', {
      method: 'POST',
      body: JSON.stringify(cartItem),
    });
  }

  async updateCartItem(id: number, cartItem: CartItem): Promise<void> {
    await this.request(`/cart/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cartItem),
    });
  }

  async removeFromCart(id: number): Promise<void> {
    await this.request(`/cart/${id}`, {
      method: 'DELETE',
    });
  }

  async clearCart(userId: string): Promise<void> {
    await this.request(`/cart/clear/${userId}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async getOrders(userId: string): Promise<Order[]> {
    return this.request<Order[]>(`/orders/${userId}`);
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }
}

export const apiService = new ApiService();
