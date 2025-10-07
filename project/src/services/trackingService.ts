import { getApiUrl } from './contactService';

export interface TrackingEvent {
  id: number;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

export interface OrderItem {
  id: number;
  productId: number;
  product: {
    id: number;
    name: string;
    imageUrl: string;
  };
  quantity: number;
  price: number;
}

export interface TrackedOrder {
  id: number;
  orderNumber: string;
  email: string;
  status: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  total: number;
  shippingAddress: string;
  billingAddress: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  trackingEvents: TrackingEvent[];
}

export interface TrackOrderResponse {
  success: boolean;
  order?: TrackedOrder;
  message?: string;
}

export const trackOrderByNumberAndEmail = async (
  orderNumber: string,
  email: string
): Promise<TrackOrderResponse> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const order = await response.json();
      return {
        success: true,
        order: order
      };
    } else if (response.status === 404) {
      return {
        success: false,
        message: 'No order found with that order number and email address. Please check your information and try again.'
      };
    } else {
      return {
        success: false,
        message: 'An error occurred while tracking your order. Please try again.'
      };
    }
  } catch (error) {
    console.error('Error tracking order:', error);
    return {
      success: false,
      message: 'Unable to connect to the server. Please check your internet connection and try again.'
    };
  }
};

export const trackOrderByTrackingNumber = async (
  trackingNumber: string
): Promise<TrackOrderResponse> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/orders/track?trackingNumber=${encodeURIComponent(trackingNumber)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const order = await response.json();
      return {
        success: true,
        order: order
      };
    } else if (response.status === 404) {
      return {
        success: false,
        message: 'No order found with that tracking number. Please check the number and try again.'
      };
    } else {
      return {
        success: false,
        message: 'An error occurred while tracking your order. Please try again.'
      };
    }
  } catch (error) {
    console.error('Error tracking order:', error);
    return {
      success: false,
      message: 'Unable to connect to the server. Please check your internet connection and try again.'
    };
  }
};
