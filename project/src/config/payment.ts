// Payment configuration for real integrations
export const PAYMENT_CONFIG = {
  // PayPal Configuration
  paypal: {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb', // sandbox client ID
    currency: 'USD',
    intent: 'capture' as const,
    environment: import.meta.env.VITE_PAYPAL_ENVIRONMENT || 'sandbox' as 'sandbox' | 'production'
  },
  
  // Stripe Configuration
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...',
    currency: 'usd',
    country: 'US'
  },
  
  // Payoneer Configuration
  payoneer: {
    partnerId: import.meta.env.VITE_PAYONEER_PARTNER_ID || '',
    environment: import.meta.env.VITE_PAYONEER_ENVIRONMENT || 'sandbox' as 'sandbox' | 'production'
  }
};

// Payment method types
export type PaymentMethodType = 'card' | 'paypal' | 'payoneer';

// Payment result interface
export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  paymentMethod: PaymentMethodType;
}
