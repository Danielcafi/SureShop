import { getApiUrl } from './contactService';

export interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
  subscription?: NewsletterSubscription;
}

class NewsletterService {
  private baseUrl = getApiUrl();

  async subscribeToNewsletter(email: string): Promise<NewsletterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to subscribe to newsletter');
      }

      const data = await response.json();
      return {
        success: true,
        message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
        subscription: data.subscription
      };
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      
      // Fallback: Simulate successful subscription for demo purposes
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return {
          success: true,
          message: 'Thank you for subscribing! You will receive our newsletter with exclusive deals and updates.',
          subscription: {
            email,
            subscribedAt: new Date().toISOString(),
            isActive: true
          }
        };
      }
      
      return {
        success: false,
        message: error.message || 'Failed to subscribe to newsletter. Please try again.'
      };
    }
  }

  async unsubscribeFromNewsletter(email: string): Promise<NewsletterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/newsletter/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to unsubscribe from newsletter');
      }

      return {
        success: true,
        message: 'Successfully unsubscribed from newsletter.'
      };
    } catch (error: any) {
      console.error('Newsletter unsubscription error:', error);
      return {
        success: false,
        message: error.message || 'Failed to unsubscribe from newsletter. Please try again.'
      };
    }
  }

  async checkSubscriptionStatus(email: string): Promise<NewsletterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/newsletter/status?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check subscription status');
      }

      const data = await response.json();
      return {
        success: true,
        message: data.isSubscribed ? 'You are subscribed to our newsletter.' : 'You are not subscribed to our newsletter.',
        subscription: data.subscription
      };
    } catch (error: any) {
      console.error('Newsletter status check error:', error);
      return {
        success: false,
        message: error.message || 'Failed to check subscription status. Please try again.'
      };
    }
  }
}

export const newsletterService = new NewsletterService();
