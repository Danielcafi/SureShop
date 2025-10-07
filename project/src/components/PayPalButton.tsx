import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { PAYMENT_CONFIG } from '../config/payment';

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency = 'USD',
  onSuccess,
  onError,
  disabled = false
}) => {
  const paypalOptions = {
    clientId: PAYMENT_CONFIG.paypal.clientId,
    currency: currency,
    intent: PAYMENT_CONFIG.paypal.intent,
    environment: PAYMENT_CONFIG.paypal.environment
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2)
          }
        }
      ]
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      onSuccess(details.id);
    });
  };

  // Handle PayPal payment errors
  const handlePayPalError = (err: any) => {
    onError(err.message || 'PayPal payment failed');
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="w-full">
        {disabled ? (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-gray-500">
            PayPal payment is disabled
          </div>
        ) : (
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={handlePayPalError}
            style={{
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'paypal'
            }}
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;