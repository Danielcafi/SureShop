import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2 } from 'lucide-react';

const MiniCart = () => {
  const { items, removeItem, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
        <p className="text-gray-500 text-center py-4">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Cart ({items.length} items)</h3>
      </div>
      
      <div className="max-h-60 overflow-y-auto">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="p-3 border-b border-gray-50 flex items-center space-x-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
              <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {items.length > 3 && (
          <div className="p-3 text-center text-sm text-gray-500">
            +{items.length - 3} more items
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">Subtotal:</span>
          <span className="text-lg font-bold text-gray-900">${getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="space-y-2">
          <Link
            to="/cart"
            className="block w-full py-2 px-4 bg-gray-100 text-gray-900 text-center rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            View Cart
          </Link>
          <Link
            to="/checkout"
            className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;