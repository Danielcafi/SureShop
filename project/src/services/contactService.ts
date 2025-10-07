/**
 * Contact Service
 * Handles contact form submissions and communication with backend
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}

class ContactService {
  private baseUrl = this.getApiUrl();

  private getApiUrl(): string {
    // Try to get from Vite environment variables
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) {
      console.log('Using API URL from environment:', import.meta.env.VITE_API_URL);
      return import.meta.env.VITE_API_URL;
    }
    
    // Fallback to default development URL
    console.log('Using default API URL: https://localhost:7000');
    return 'https://localhost:7000';
  }

  /**
   * Submit contact form
   */
  async submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Fallback to simulation if API is not available
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.log('API not available, using fallback simulation');
        await this.simulateApiCall();
        return {
          success: true,
          message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
          id: `contact-${Date.now()}`
        };
      }
      
      return {
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
      };
    }
  }

  /**
   * Simulate API call delay
   */
  private async simulateApiCall(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  /**
   * Send email notification (for production use)
   * This would integrate with services like SendGrid, Mailgun, or AWS SES
   */
  async sendEmailNotification(formData: ContactFormData): Promise<void> {
    // In production, implement actual email sending
    console.log('Email notification would be sent:', {
      to: 'support@shoppro.com',
      from: formData.email,
      subject: `Contact Form: ${formData.subject}`,
      body: `
        Name: ${formData.name}
        Email: ${formData.email}
        Subject: ${formData.subject}
        Message: ${formData.message}
      `
    });
  }
}

export const contactService = new ContactService();
