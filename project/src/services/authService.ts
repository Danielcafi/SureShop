export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
  preferences: UserPreferences;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
}

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  language: string;
  currency: string;
  theme: 'light' | 'dark';
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptTerms: boolean;
  newsletter?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}

class AuthService {
  private currentUser: User | null = null;
  private token: string | null = null;
  private readonly TOKEN_KEY = 'ecommerce_token';
  private readonly USER_KEY = 'ecommerce_user';

  constructor() {
    this.loadAuthFromStorage();
  }

  // Load authentication data from localStorage
  private loadAuthFromStorage(): void {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userData = localStorage.getItem(this.USER_KEY);
      
      if (token && userData) {
        this.token = token;
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error loading auth from storage:', error);
      this.clearAuth();
    }
  }

  // Save authentication data to localStorage
  private saveAuthToStorage(user: User, token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving auth to storage:', error);
    }
  }

  // Clear authentication data
  private clearAuth(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (!data.email || !data.password || !data.firstName || !data.lastName) {
      throw new Error('All required fields must be filled');
    }

    if (data.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (!data.acceptTerms) {
      throw new Error('You must accept the terms and conditions');
    }

    // Create mock user
    const user: User = {
      id: `user_${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      isEmailVerified: false,
      createdAt: new Date(),
      preferences: {
        newsletter: data.newsletter || false,
        smsNotifications: false,
        emailNotifications: true,
        language: 'en',
        currency: 'USD',
        theme: 'light'
      },
      addresses: [],
      paymentMethods: []
    };

    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const refreshToken = `refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.currentUser = user;
    this.token = token;
    this.saveAuthToStorage(user, token);

    return { user, token, refreshToken };
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      const user: User = {
        id: 'demo_user',
        email: credentials.email,
        firstName: 'Demo',
        lastName: 'User',
        isEmailVerified: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        lastLoginAt: new Date(),
        preferences: {
          newsletter: true,
          smsNotifications: false,
          emailNotifications: true,
          language: 'en',
          currency: 'USD',
          theme: 'light'
        },
        addresses: [
          {
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
          }
        ],
        paymentMethods: []
      };

      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const refreshToken = `refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      this.currentUser = user;
      this.token = token;
      this.saveAuthToStorage(user, token);

      return { user, token, refreshToken };
    }

    throw new Error('Invalid email or password');
  }

  // Logout user
  logout(): void {
    this.clearAuth();
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.token !== null;
  }

  // Get authentication token
  getToken(): string | null {
    return this.token;
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    this.currentUser = { ...this.currentUser, ...updates };
    this.saveAuthToStorage(this.currentUser, this.token!);

    return this.currentUser;
  }

  // Update user preferences
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
    this.saveAuthToStorage(this.currentUser, this.token!);

    return this.currentUser;
  }

  // Add address
  async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    const newAddress: Address = {
      ...address,
      id: `addr_${Date.now()}`
    };

    this.currentUser.addresses.push(newAddress);
    this.saveAuthToStorage(this.currentUser, this.token!);

    return newAddress;
  }

  // Update address
  async updateAddress(addressId: string, updates: Partial<Address>): Promise<Address> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    const addressIndex = this.currentUser.addresses.findIndex(addr => addr.id === addressId);
    if (addressIndex === -1) {
      throw new Error('Address not found');
    }

    this.currentUser.addresses[addressIndex] = {
      ...this.currentUser.addresses[addressIndex],
      ...updates
    };

    this.saveAuthToStorage(this.currentUser, this.token!);

    return this.currentUser.addresses[addressIndex];
  }

  // Remove address
  async removeAddress(addressId: string): Promise<boolean> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    const initialLength = this.currentUser.addresses.length;
    this.currentUser.addresses = this.currentUser.addresses.filter(addr => addr.id !== addressId);
    
    if (this.currentUser.addresses.length !== initialLength) {
      this.saveAuthToStorage(this.currentUser, this.token!);
      return true;
    }
    return false;
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would send an email
    console.log(`Password reset requested for: ${email}`);
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would validate the token and update the password
    console.log(`Password reset with token: ${token}`);
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    if (!this.currentUser) {
      throw new Error('User not authenticated');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would validate the current password and update it
    console.log('Password changed successfully');
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (this.currentUser) {
      this.currentUser.isEmailVerified = true;
      this.saveAuthToStorage(this.currentUser, this.token!);
    }
  }

  // Get user's full name
  getFullName(): string {
    if (!this.currentUser) return '';
    return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
  }

  // Get user's initials
  getInitials(): string {
    if (!this.currentUser) return '';
    return `${this.currentUser.firstName[0]}${this.currentUser.lastName[0]}`.toUpperCase();
  }
}

export const authService = new AuthService();
