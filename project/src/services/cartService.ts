import { Product } from '../data/products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  addedAt: Date;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  discount?: number;
  discountCode?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  isFree: boolean;
}

export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  isActive: boolean;
  expiresAt?: Date;
}

class CartService {
  private cartItems: CartItem[] = [];
  private readonly CART_STORAGE_KEY = 'ecommerce_cart';
  private readonly TAX_RATE = 0.08; // 8% tax
  private readonly FREE_SHIPPING_THRESHOLD = 100;

  constructor() {
    this.loadCartFromStorage();
  }

  // Load cart from localStorage
  private loadCartFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.cartItems = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      this.cartItems = [];
    }
  }

  // Save cart to localStorage
  private saveCartToStorage(): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  // Add item to cart
  addItem(
    product: Product, 
    quantity: number = 1, 
    selectedSize?: string, 
    selectedColor?: string
  ): CartItem {
    const existingItem = this.cartItems.find(item => 
      item.product.id === product.id &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        product,
        quantity,
        selectedSize,
        selectedColor,
        addedAt: new Date()
      };
      this.cartItems.push(newItem);
    }

    this.saveCartToStorage();
    return existingItem || this.cartItems[this.cartItems.length - 1];
  }

  // Remove item from cart
  removeItem(itemId: string): boolean {
    const initialLength = this.cartItems.length;
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    
    if (this.cartItems.length !== initialLength) {
      this.saveCartToStorage();
      return true;
    }
    return false;
  }

  // Update item quantity
  updateQuantity(itemId: string, quantity: number): boolean {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      if (quantity <= 0) {
        return this.removeItem(itemId);
      }
      item.quantity = quantity;
      this.saveCartToStorage();
      return true;
    }
    return false;
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItems = [];
    this.saveCartToStorage();
  }

  // Get cart items
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  // Get cart summary
  getCartSummary(discountCode?: string): CartSummary {
    const subtotal = this.cartItems.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );

    const tax = subtotal * this.TAX_RATE;
    const shipping = subtotal >= this.FREE_SHIPPING_THRESHOLD ? 0 : 10;
    
    let discount = 0;
    let appliedDiscountCode: string | undefined;

    if (discountCode) {
      const discountInfo = this.applyDiscountCode(discountCode, subtotal);
      if (discountInfo) {
        discount = discountInfo.discount;
        appliedDiscountCode = discountCode;
      }
    }

    const total = subtotal + tax + shipping - discount;

    return {
      items: this.cartItems,
      totalItems: this.cartItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      tax,
      shipping,
      total,
      discount: discount > 0 ? discount : undefined,
      discountCode: appliedDiscountCode
    };
  }

  // Apply discount code
  private applyDiscountCode(code: string, subtotal: number): { discount: number } | null {
    const discountCodes: DiscountCode[] = [
      {
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        minOrderAmount: 50,
        isActive: true
      },
      {
        code: 'SAVE20',
        type: 'percentage',
        value: 20,
        minOrderAmount: 100,
        isActive: true
      },
      {
        code: 'FREESHIP',
        type: 'fixed',
        value: 10,
        minOrderAmount: 50,
        isActive: true
      }
    ];

    const discountCode = discountCodes.find(dc => 
      dc.code.toUpperCase() === code.toUpperCase() && 
      dc.isActive &&
      (!dc.minOrderAmount || subtotal >= dc.minOrderAmount)
    );

    if (!discountCode) return null;

    let discount = 0;
    if (discountCode.type === 'percentage') {
      discount = (subtotal * discountCode.value) / 100;
      if (discountCode.maxDiscount) {
        discount = Math.min(discount, discountCode.maxDiscount);
      }
    } else {
      discount = discountCode.value;
    }

    return { discount };
  }

  // Get shipping options
  getShippingOptions(): ShippingOption[] {
    return [
      {
        id: 'standard',
        name: 'Standard Shipping',
        description: '5-7 business days',
        price: 0,
        estimatedDays: '5-7',
        isFree: true
      },
      {
        id: 'express',
        name: 'Express Shipping',
        description: '2-3 business days',
        price: 15,
        estimatedDays: '2-3',
        isFree: false
      },
      {
        id: 'overnight',
        name: 'Overnight Shipping',
        description: 'Next business day',
        price: 25,
        estimatedDays: '1',
        isFree: false
      }
    ];
  }

  // Check if cart is empty
  isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  // Get item count
  getItemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Check if product is in cart
  isInCart(productId: number, selectedSize?: string, selectedColor?: string): boolean {
    return this.cartItems.some(item => 
      item.product.id === productId &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    );
  }

  // Get item quantity in cart
  getItemQuantity(productId: number, selectedSize?: string, selectedColor?: string): number {
    const item = this.cartItems.find(item => 
      item.product.id === productId &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    );
    return item ? item.quantity : 0;
  }

  // Validate cart (check stock, prices, etc.)
  validateCart(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    this.cartItems.forEach(item => {
      if (item.quantity > item.product.stock) {
        errors.push(`${item.product.name} - Only ${item.product.stock} available in stock`);
      }
      if (item.product.stock === 0) {
        errors.push(`${item.product.name} - Out of stock`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Get cart persistence info
  getCartInfo(): { itemCount: number; lastUpdated: Date | null } {
    return {
      itemCount: this.getItemCount(),
      lastUpdated: this.cartItems.length > 0 ? 
        new Date(Math.max(...this.cartItems.map(item => item.addedAt.getTime()))) : 
        null
    };
  }
}

export const cartService = new CartService();
