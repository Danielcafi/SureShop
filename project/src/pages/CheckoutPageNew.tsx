import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { authService, Address } from '../services/authService';
import { cartService, CartSummary, ShippingOption } from '../services/cartService';
import { Product } from '../data/products';
import { orderService } from '../services/orderService';
import LoadingSpinner from '../components/LoadingSpinner';
import { CreditCard, MapPin, Lock } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const cartContext = useCart();
  
  // Add safety check for cart context
  if (!cartContext) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return <CheckoutContent cartContext={cartContext} navigate={navigate} />;
};

interface CheckoutContentProps {
  cartContext: ReturnType<typeof useCart>;
  navigate: (path: string) => void;
}

const CheckoutContent: React.FC<CheckoutContentProps> = ({ cartContext, navigate }) => {
  const { items: cartItems, clearCart } = cartContext;
  
  // All hooks must be called at the top level
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping] = useState<string>('standard');
  
  const [shippingAddress, setShippingAddress] = useState<Address>({
    id: '',
    type: 'shipping',
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    isDefault: false
  });
  
  const [billingAddress, setBillingAddress] = useState<Address>({
    id: '',
    type: 'billing',
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    isDefault: false
  });
  
  const [useSameAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState({
    type: 'card' as 'card' | 'paypal' | 'payoneer',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: ''
  });
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'>('unknown');
  const [paymentErrors, setPaymentErrors] = useState<{ [k: string]: string }>({});
  
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);

  const loadCheckoutData = useCallback(async () => {
    try {
      // Create cart summary from context items instead of service
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.08; // 8% tax
      const shipping = subtotal >= 100 ? 0 : 10; // Free shipping over $100
      const total = subtotal + tax + shipping;
      
      const summary: CartSummary = {
        items: cartItems.map(item => ({
          id: item.id,
          product: {
            id: parseInt(item.id),
            name: item.name,
            price: item.price,
            image: item.image,
            images: [item.image],
            stock: 100,
            category: 'general',
            subcategory: 'general',
            brand: 'Generic',
            description: '',
            rating: 4.5,
            reviews: 0,
            reviewCount: 0,
            isNew: false,
            isFeatured: false,
            tags: [],
            colors: [],
            sizes: [],
            weight: 0,
            dimensions: { length: 0, width: 0, height: 0 },
            sku: item.id,
            barcode: '',
            warranty: '',
            returnPolicy: '',
            shippingInfo: '',
            availability: 'in-stock',
            features: [],
            specifications: {},
            isOnSale: false,
            color: '',
            material: '',
            style: ''
          } as unknown as Product,
          quantity: item.quantity,
          selectedSize: item.variant,
          selectedColor: undefined,
          addedAt: new Date()
        })),
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        tax,
        shipping,
        total
      };
      
      setCartSummary(summary);
      
      const shippingOptions = cartService.getShippingOptions();
      setShippingOptions(shippingOptions);
      
      // Load user's saved addresses if logged in
      const currentUser = authService.getCurrentUser();
      if (currentUser && currentUser.addresses.length > 0) {
        const defaultShipping = currentUser.addresses.find(addr => 
          addr.type === 'shipping' && addr.isDefault
        );
        const defaultBilling = currentUser.addresses.find(addr => 
          addr.type === 'billing' && addr.isDefault
        );
        
        if (defaultShipping) {
          setShippingAddress(defaultShipping);
        }
        if (defaultBilling) {
          setBillingAddress(defaultBilling);
        }
      }
    } catch {
      setError('Failed to load checkout data');
    }
  }, [cartItems]);

  // Payment validation helpers
  const luhnCheck = (value: string) => {
    const digits = value.replace(/\s+/g, '');
    if (!/^\d{12,19}$/.test(digits)) return false;
    let sum = 0; let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits.charAt(i), 10);
      if (shouldDouble) { digit *= 2; if (digit > 9) digit -= 9; }
      sum += digit; shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const detectBrand = (num: string): typeof cardBrand => {
    const n = num.replace(/\s+/g, '');
    if (/^4\d{12,18}$/.test(n)) return 'visa';
    if (/^(5[1-5]\d{14}|2(2[2-9]|[3-6]\d|7[01])\d{12})$/.test(n)) return 'mastercard';
    if (/^3[47]\d{13}$/.test(n)) return 'amex';
    if (/^6(?:011|5\d{2})\d{12}$/.test(n)) return 'discover';
    return 'unknown';
  };

  const isValidExpiry = (mm: string, yy: string) => {
    if (!/^\d{2}$/.test(mm) || !/^\d{4}$/.test(yy)) return false;
    const month = parseInt(mm, 10);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const exp = new Date(parseInt(yy, 10), month - 1, 1);
    exp.setMonth(exp.getMonth() + 1);
    return exp > now;
  };

  const isValidCvv = (cvv: string, brand: typeof cardBrand) => {
    if (!/^\d{3,4}$/.test(cvv)) return false;
    return brand === 'amex' ? cvv.length === 4 : cvv.length === 3;
  };

  useEffect(() => {
    // Wait for cart items to load
    if (!cartItems || !Array.isArray(cartItems)) {
      return;
    }
    
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    
    setIsInitializing(false);
    loadCheckoutData();
  }, [cartItems, navigate, loadCheckoutData]);

  const handleAddressChange = (type: 'shipping' | 'billing', field: string, value: string) => {
    if (type === 'shipping') {
      setShippingAddress(prev => ({ ...prev, [field]: value }));
    } else {
      setBillingAddress(prev => ({ ...prev, [field]: value }));
    }
  };

  // If you later add a checkbox to toggle billing == shipping,
  // you can call setUseSameAddress and optionally copy the address.

  const applyDiscountCode = () => {
    if (!discountCode.trim() || !cartItems) return;
    
    // Calculate discount manually
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    
    // Simple discount logic
    if (discountCode.toUpperCase() === 'WELCOME10' && subtotal >= 50) {
      discount = subtotal * 0.1; // 10% off
    } else if (discountCode.toUpperCase() === 'SAVE20' && subtotal >= 100) {
      discount = subtotal * 0.2; // 20% off
    } else if (discountCode.toUpperCase() === 'FREESHIP' && subtotal >= 50) {
      discount = 10; // $10 off (free shipping)
    } else {
      setError('Invalid discount code');
      return;
    }
    
    if (discount > 0) {
      setAppliedDiscount({
        code: discountCode,
        amount: discount
      });
      
      // Recalculate cart summary with discount
      const tax = subtotal * 0.08;
      const shipping = subtotal >= 100 ? 0 : 10;
      const total = subtotal + tax + shipping - discount;
      
      setCartSummary(prev => prev ? {
        ...prev,
        discount,
        discountCode: discountCode,
        total
      } : null);
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setAppliedDiscount(null);
    
    // Recalculate cart summary without discount
    if (cartItems) {
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.08;
      const shipping = subtotal >= 100 ? 0 : 10;
      const total = subtotal + tax + shipping;
      
      setCartSummary(prev => prev ? {
        ...prev,
        discount: undefined,
        discountCode: undefined,
        total
      } : null);
    }
  };

  const handlePlaceOrder = async () => {
    if (!cartSummary) return;
    
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address1 || 
          !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
        throw new Error('Please fill in all shipping address fields');
      }
      
      if (!useSameAddress && (!billingAddress.firstName || !billingAddress.lastName || 
          !billingAddress.address1 || !billingAddress.city || !billingAddress.state || 
          !billingAddress.zipCode)) {
        throw new Error('Please fill in all billing address fields');
      }
      
      if (paymentMethod.type === 'card') {
        const errors: { [k: string]: string } = {};
        const brand = detectBrand(paymentMethod.cardNumber);
        setCardBrand(brand);
        if (!paymentMethod.nameOnCard.trim()) errors.nameOnCard = 'Name on card is required';
        if (!luhnCheck(paymentMethod.cardNumber)) errors.cardNumber = 'Invalid card number';
        if (!isValidExpiry(paymentMethod.expiryMonth, paymentMethod.expiryYear)) errors.expiry = 'Invalid expiry date';
        if (!isValidCvv(paymentMethod.cvv, brand)) errors.cvv = brand === 'amex' ? 'CVV must be 4 digits for Amex' : 'CVV must be 3 digits';
        if (Object.keys(errors).length > 0) {
          setPaymentErrors(errors);
          throw new Error('Please correct the highlighted payment fields');
        }
      }

      // Create order
      const orderData = {
        items: cartSummary.items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
        })),
        shippingAddress: useSameAddress ? shippingAddress : billingAddress,
        billingAddress: useSameAddress ? shippingAddress : billingAddress,
        paymentMethod: paymentMethod.type === 'card' ? {
          type: paymentMethod.type,
          last4: paymentMethod.cardNumber.slice(-4),
          brand: cardBrand === 'unknown' ? 'Card' : cardBrand,
          expiryMonth: parseInt(paymentMethod.expiryMonth),
          expiryYear: parseInt(paymentMethod.expiryYear)
        } : {
          type: (paymentMethod.type === 'paypal' ? 'paypal' : 'payoneer') as 'paypal' | 'payoneer',
          last4: undefined,
          brand: paymentMethod.type === 'paypal' ? 'PayPal' : 'Payoneer',
          expiryMonth: undefined,
          expiryYear: undefined
        },
        notes: `Shipping: ${shippingOptions.find(s => s.id === selectedShipping)?.name}`
      };

      const order = await orderService.createOrder(orderData);
      
      // Clear cart
      clearCart();
      
      // Redirect to order confirmation
      navigate(`/orders/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Show loading while initializing or if cart is empty
  if (isInitializing || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">
              {!cartItems || !Array.isArray(cartItems) ? 'Loading cart...' : 
               cartItems.length === 0 ? 'Cart is empty...' : 
               'Loading checkout...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!cartSummary) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order securely</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, label: 'Shipping', icon: MapPin },
              { step: 2, label: 'Payment', icon: CreditCard },
              { step: 3, label: 'Review', icon: Lock }
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {label}
                </span>
                {step < 3 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Shipping Address */}
            {currentStep === 1 && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        value={shippingAddress.firstName}
                        onChange={(e) => handleAddressChange('shipping', 'firstName', e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        value={shippingAddress.lastName}
                        onChange={(e) => handleAddressChange('shipping', 'lastName', e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      value={shippingAddress.address1}
                      onChange={(e) => handleAddressChange('shipping', 'address1', e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => handleAddressChange('shipping', 'city', e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) => handleAddressChange('shipping', 'state', e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        value={shippingAddress.zipCode}
                        onChange={(e) => handleAddressChange('shipping', 'zipCode', e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="btn btn-primary"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
                </div>
                <div className="card-body">
                  <div className="mb-4 flex space-x-2">
                    {(['card','paypal','payoneer'] as const).map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(prev => ({ ...prev, type: method }))}
                        className={`px-3 py-2 rounded-md text-sm border ${paymentMethod.type === method ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                      >
                        {method === 'card' ? 'Credit/Debit Card' : method === 'paypal' ? 'PayPal' : 'Payoneer'}
                      </button>
                    ))}
                  </div>

                  {paymentMethod.type === 'card' ? (
                  <div className="space-y-4">
                  <div className="mb-4">
                    <label className="form-label">Name on Card</label>
                    <input
                      type="text"
                      value={paymentMethod.nameOnCard}
                      onChange={(e) => setPaymentMethod(prev => ({ ...prev, nameOnCard: e.target.value }))}
                      className="form-input"
                      required
                    />
                    {paymentErrors.nameOnCard && <p className="text-sm text-red-600 mt-1">{paymentErrors.nameOnCard}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      value={paymentMethod.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                        setPaymentMethod(prev => ({ ...prev, cardNumber: value }));
                        setCardBrand(detectBrand(value));
                      }}
                      className="form-input"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <div className="text-xs text-gray-500 mt-1">Detected: {cardBrand !== 'unknown' ? cardBrand.toUpperCase() : 'Unknown'}</div>
                    {paymentErrors.cardNumber && <p className="text-sm text-red-600 mt-1">{paymentErrors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="form-label">Expiry Month</label>
                      <select
                        value={paymentMethod.expiryMonth}
                        onChange={(e) => setPaymentMethod(prev => ({ ...prev, expiryMonth: e.target.value }))}
                        className="form-select"
                        required
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Expiry Year</label>
                      <select
                        value={paymentMethod.expiryYear}
                        onChange={(e) => setPaymentMethod(prev => ({ ...prev, expiryYear: e.target.value }))}
                        className="form-select"
                        required
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={String(new Date().getFullYear() + i)}>
                            {new Date().getFullYear() + i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        value={paymentMethod.cvv}
                        onChange={(e) => setPaymentMethod(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, cardBrand === 'amex' ? 4 : 3) }))}
                        className="form-input"
                        placeholder={cardBrand === 'amex' ? '1234' : '123'}
                        required
                      />
                      {paymentErrors.expiry && <p className="text-sm text-red-600 mt-1">{paymentErrors.expiry}</p>}
                      {paymentErrors.cvv && <p className="text-sm text-red-600 mt-1">{paymentErrors.cvv}</p>}
                    </div>
                  </div>
                  </div>
                  ) : (
                    <div className="mb-4 p-4 border border-blue-200 rounded-md bg-blue-50 text-blue-800">
                      You selected {paymentMethod.type === 'paypal' ? 'PayPal' : 'Payoneer'}. In production, you'll be redirected to the provider to complete payment securely.
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="btn btn-outline"
                    >
                      Back to Shipping
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="btn btn-primary"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="card">
                  <div className="card-header">
                    <h2 className="text-lg font-semibold text-gray-900">Review Your Order</h2>
                  </div>
                  <div className="card-body">
                    <div className="space-y-4">
                      {cartSummary.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × {formatPrice(item.product.price)}
                            </p>
                            {item.selectedSize && (
                              <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                            )}
                            {item.selectedColor && (
                              <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">
                              {formatPrice(item.product.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn btn-outline"
                  >
                    Back to Payment
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="btn btn-primary btn-lg"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <LoadingSpinner size="sm" className="mr-2" />
                        Processing...
                      </div>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(cartSummary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(cartSummary.tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {cartSummary.shipping === 0 ? 'Free' : formatPrice(cartSummary.shipping)}
                    </span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedDiscount.code})</span>
                      <span className="font-medium">-{formatPrice(appliedDiscount.amount)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(cartSummary.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discount Code */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Discount Code</h2>
              </div>
              <div className="card-body">
                {appliedDiscount ? (
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium">
                      {appliedDiscount.code} applied
                    </span>
                    <button
                      onClick={removeDiscountCode}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 form-input"
                    />
                    <button
                      onClick={applyDiscountCode}
                      className="btn btn-outline btn-sm"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Security */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Secure Checkout</p>
                    <p className="text-xs text-gray-600">Your payment information is encrypted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
