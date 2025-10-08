import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import { AuthProvider } from '../contexts/AuthContext';
import { WishlistProvider } from '../contexts/WishlistContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { ChatProvider } from '../contexts/ChatContext';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

// Mock window.URL.createObjectURL
Object.defineProperty(window.URL, 'createObjectURL', {
  value: jest.fn(() => 'mocked-url'),
  writable: true
});

// Mock window.URL.revokeObjectURL
Object.defineProperty(window.URL, 'revokeObjectURL', {
  value: jest.fn(),
  writable: true
});

// All providers wrapper
const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <NotificationProvider>
              <ChatProvider>
                {children}
              </ChatProvider>
            </NotificationProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

// Custom render function
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Test data factories
export const createMockProduct = (overrides = {}) => ({
  id: 1,
  name: 'Test Product',
  price: 99.99,
  originalPrice: 149.99,
  image: 'https://example.com/image.jpg',
  description: 'Test product description',
  category: 'electronics',
  rating: 4.5,
  reviews: 100,
  inStock: true,
  ...overrides
});

export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  loyaltyPoints: 100,
  tier: 'bronze' as const,
  ...overrides
});

export const createMockOrder = (overrides = {}) => ({
  id: 1,
  orderNumber: 'SP-2024-000001',
  email: 'test@example.com',
  total: 199.98,
  status: 'pending',
  shippingAddress: '123 Test St, Test City, TC 12345',
  billingAddress: '123 Test St, Test City, TC 12345',
  createdAt: '2024-01-15T10:00:00Z',
  orderItems: [
    {
      id: 1,
      productId: 1,
      quantity: 2,
      price: 99.99,
      product: createMockProduct()
    }
  ],
  ...overrides
});

// Mock API responses
export const mockApiResponses = {
  products: {
    success: [createMockProduct(), createMockProduct({ id: 2, name: 'Test Product 2' })],
    error: { message: 'Failed to fetch products' }
  },
  orders: {
    success: [createMockOrder()],
    error: { message: 'Failed to fetch orders' }
  },
  user: {
    success: createMockUser(),
    error: { message: 'Authentication failed' }
  }
};

// Utility functions for tests
export const waitForLoadingToFinish = () => 
  new Promise(resolve => setTimeout(resolve, 0));

export const mockFetch = (response: any, ok = true) => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok,
    json: () => Promise.resolve(response),
    status: ok ? 200 : 400,
    statusText: ok ? 'OK' : 'Bad Request'
  });
};

export const mockFetchError = (message = 'Network error') => {
  (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(message));
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };
