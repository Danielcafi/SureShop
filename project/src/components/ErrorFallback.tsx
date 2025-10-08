import React from 'react';
import { AlertCircle, RefreshCw, Home, Wifi, WifiOff } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  type?: 'network' | 'server' | 'not-found' | 'generic';
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHome?: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  type = 'generic',
  title,
  message,
  showRetry = true,
  showHome = true
}) => {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: <WifiOff className="w-8 h-8 text-orange-600" />,
          title: title || 'Connection Problem',
          message: message || 'Please check your internet connection and try again.',
          bgColor: 'bg-orange-100'
        };
      case 'server':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
          title: title || 'Server Error',
          message: message || 'Our servers are experiencing issues. Please try again later.',
          bgColor: 'bg-red-100'
        };
      case 'not-found':
        return {
          icon: <AlertCircle className="w-8 h-8 text-blue-600" />,
          title: title || 'Page Not Found',
          message: message || 'The page you\'re looking for doesn\'t exist.',
          bgColor: 'bg-blue-100'
        };
      default:
        return {
          icon: <AlertCircle className="w-8 h-8 text-gray-600" />,
          title: title || 'Something went wrong',
          message: message || 'An unexpected error occurred. Please try again.',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
          {config.icon}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {config.title}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {config.message}
        </p>
        
        {error && process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
              Error Details (Development)
            </summary>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono text-gray-600 overflow-auto">
              <div className="mb-2">
                <strong>Error:</strong> {error.message}
              </div>
              <div>
                <strong>Stack:</strong>
                <pre className="whitespace-pre-wrap mt-1">
                  {error.stack}
                </pre>
              </div>
            </div>
          </details>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          {showRetry && resetError && (
            <button
              onClick={resetError}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}
          
          {showHome && (
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
