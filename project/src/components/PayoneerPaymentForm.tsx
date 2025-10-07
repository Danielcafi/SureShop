import React, { useState } from 'react';
import { CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface PayoneerPaymentFormProps {
  amount: number;
  currency?: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

const PayoneerPaymentForm: React.FC<PayoneerPaymentFormProps> = ({
  amount,
  currency = 'USD',
  onSuccess,
  onError,
  disabled = false
}) => {
  const [payoneerId, setPayoneerId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const validatePayoneerId = async (id: string) => {
    setIsValidating(true);
    
    // Simulate API call to validate Payoneer ID
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, you would call Payoneer's API
    const isValid = /^[A-Za-z0-9]{8,20}$/.test(id);
    setIsValidating(false);
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!payoneerId.trim()) {
      onError('Payoneer ID is required');
      return;
    }

    setIsProcessing(true);

    try {
      // Validate Payoneer ID
      const isValid = await validatePayoneerId(payoneerId);
      
      if (!isValid) {
        onError('Invalid Payoneer ID. Please check your credentials.');
        return;
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const transactionId = `payoneer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      onSuccess(transactionId);
      
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Payoneer payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (disabled) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-gray-500">
        Payoneer payment is disabled
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-blue-800">
          <Shield className="w-5 h-5" />
          <span className="font-medium">Secure Payoneer Payment</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Your payment will be processed securely through Payoneer
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payoneer Customer ID
          </label>
          <input
            type="text"
            value={payoneerId}
            onChange={(e) => setPayoneerId(e.target.value.trim())}
            placeholder="Enter your Payoneer ID"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            pattern="[A-Za-z0-9]{8,20}"
            title="8-20 characters, letters and numbers only"
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: 8-20 characters, letters and numbers only
          </p>
        </div>

        <button
          type="submit"
          disabled={!payoneerId.trim() || isProcessing || isValidating}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {isValidating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Validating...</span>
            </>
          ) : isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              <span>Pay ${amount.toFixed(2)} with Payoneer</span>
            </>
          )}
        </button>
      </form>

      <div className="text-xs text-gray-500 text-center">
        <p>By proceeding, you agree to Payoneer's terms of service</p>
      </div>
    </div>
  );
};

export default PayoneerPaymentForm;
