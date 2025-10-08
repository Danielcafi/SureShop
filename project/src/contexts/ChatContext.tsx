import React, { createContext, useContext, useState } from 'react';

interface ChatMessage {
  sender: 'agent' | 'user';
  text: string;
  at: number;
}

interface ChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  isConnecting: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setIsConnecting(true);
      setTimeout(() => {
        setMessages([{ sender: 'agent', text: 'Hi! 👋 How can we help you today?', at: Date.now() }]);
        setIsConnecting(false);
      }, 400);
    }
  };

  const closeChat = () => setIsOpen(false);

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to SureShop! I'm here to help you with any questions about our products, orders, or services. How can I assist you today?";
    }
    
    // Website information
    if (lowerMessage.includes('what') && lowerMessage.includes('website') || lowerMessage.includes('about') && lowerMessage.includes('store')) {
      return "SureShop is your premier e-commerce destination! We offer a wide range of products including electronics, fashion, home & garden, sports, books, and health & beauty items. We're committed to providing quality products with excellent customer service.";
    }
    
    // Product categories
    if (lowerMessage.includes('categories') || lowerMessage.includes('products') || lowerMessage.includes('what do you sell')) {
      return "We offer products in these categories: Electronics, Fashion, Home & Garden, Sports, Books, and Health & Beauty. You can browse by category on our homepage or use the search function to find specific items.";
    }
    
    // Electronics
    if (lowerMessage.includes('electronics') || lowerMessage.includes('laptop') || lowerMessage.includes('phone') || lowerMessage.includes('headphones')) {
      return "We have a great selection of electronics including laptops, smartphones, headphones, and more! Our electronics come from top brands like Apple, Samsung, and Sony. Check out our Electronics category for the latest deals.";
    }
    
    // Fashion
    if (lowerMessage.includes('fashion') || lowerMessage.includes('clothes') || lowerMessage.includes('clothing') || lowerMessage.includes('dress')) {
      return "Our Fashion section features trendy clothing, accessories, and footwear for men, women, and children. We have everything from casual wear to formal attire, plus size guides to help you find the perfect fit.";
    }
    
    // Shipping and delivery
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('how long') || lowerMessage.includes('when will')) {
      return "We offer FREE shipping on orders over $50! Standard delivery takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee. You can track your order using your order number or email address.";
    }
    
    // Returns and refunds
    if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('exchange')) {
      return "Our return policy allows returns within 30 days of purchase. Items must be in original condition with tags attached. We offer free return shipping and will process refunds within 3-5 business days. Would you like me to help you start a return?";
    }
    
    // Payment methods
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('card') || lowerMessage.includes('paypal')) {
      return "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Payoneer. All payments are processed securely with 256-bit SSL encryption. Your payment information is never stored on our servers.";
    }
    
    // Account and login
    if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
      return "You can create a free account to track orders, save favorites, and get exclusive deals. Click 'Login' in the top right corner to sign in or create a new account. It only takes a minute!";
    }
    
    // Size guide
    if (lowerMessage.includes('size') || lowerMessage.includes('sizing') || lowerMessage.includes('fit') || lowerMessage.includes('measurement')) {
      return "We have detailed size guides for all our clothing and footwear! Visit our Size Guide page for comprehensive sizing charts. You can also contact our support team for personalized sizing assistance.";
    }
    
    // Customer service
    if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('phone')) {
      return "Our customer support team is available 24/7! You can reach us via this chat, email at support@sureshop.com, or phone at +1 (555) 123-4567. We typically respond within 2 hours.";
    }
    
    // Order tracking
    if (lowerMessage.includes('track') || lowerMessage.includes('order') || lowerMessage.includes('where is') || lowerMessage.includes('status')) {
      return "You can track your order using your order number and email address on our Track Order page. You'll receive tracking updates via email and SMS. Need help finding your order number?";
    }
    
    // Discounts and deals
    if (lowerMessage.includes('discount') || lowerMessage.includes('sale') || lowerMessage.includes('deal') || lowerMessage.includes('coupon') || lowerMessage.includes('promo')) {
      return "We regularly offer discounts and special deals! Subscribe to our newsletter for exclusive offers, check our homepage for current sales, and follow us on social media for flash deals. New customers get 10% off their first order!";
    }
    
    // Security and privacy
    if (lowerMessage.includes('secure') || lowerMessage.includes('privacy') || lowerMessage.includes('safe') || lowerMessage.includes('data')) {
      return "Your security is our priority! We use 256-bit SSL encryption for all transactions, never store your payment information, and are GDPR compliant. Check our Privacy Policy for detailed information about how we protect your data.";
    }
    
    // Mobile app
    if (lowerMessage.includes('app') || lowerMessage.includes('mobile') || lowerMessage.includes('download')) {
      return "Our mobile app is coming soon! In the meantime, our website is fully optimized for mobile devices. You can add our site to your home screen for an app-like experience.";
    }
    
    // International shipping
    if (lowerMessage.includes('international') || lowerMessage.includes('country') || lowerMessage.includes('abroad') || lowerMessage.includes('overseas')) {
      return "We currently ship to the United States, Canada, and select European countries. International shipping rates vary by destination. Contact us for specific shipping information to your country.";
    }
    
    // Gift cards
    if (lowerMessage.includes('gift') || lowerMessage.includes('present') || lowerMessage.includes('card')) {
      return "Gift cards are coming soon! You'll be able to purchase digital gift cards in various denominations. Sign up for our newsletter to be notified when gift cards become available.";
    }
    
    // Reviews and ratings
    if (lowerMessage.includes('review') || lowerMessage.includes('rating') || lowerMessage.includes('feedback')) {
      return "We value customer feedback! You can leave reviews and ratings for products you've purchased. All reviews are verified to ensure authenticity. Your feedback helps other customers make informed decisions.";
    }
    
    // Default response for unclear questions
    return "I'm here to help! Could you be more specific about what you need assistance with? I can help with orders, products, shipping, returns, payments, or any other questions about SureShop.";
  };

  const sendMessage = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages(prev => [...prev, { sender: 'user', text: clean, at: Date.now() }]);
    setTimeout(() => {
      const botResponse = getBotResponse(clean);
      setMessages(prev => [...prev, { sender: 'agent', text: botResponse, at: Date.now() }]);
    }, 900);
  };

  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat, messages, sendMessage, isConnecting }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
};


