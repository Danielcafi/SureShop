import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import chatSupportIcon from '../assets/images/icons/chat-support.png';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm here to help you. What can I assist you with today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: getBotResponse(inputMessage),
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return "Our return policy allows returns within 30 days of purchase. Would you like me to help you start a return?";
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days. Need help tracking an order?";
    } else if (lowerMessage.includes('size') || lowerMessage.includes('sizing')) {
      return "I can help you with sizing! What product are you looking at? We have detailed size guides for all our items.";
    } else {
      return "I understand you're looking for help. Can you please provide more details so I can assist you better?";
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-2 shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-bounce"
      >
        <img 
          src={chatSupportIcon} 
          alt="Chat Support" 
          className="w-24 h-24 object-contain"
        />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src={chatSupportIcon} 
            alt="Chat Support" 
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="font-semibold">Customer Support</h3>
            <p className="text-xs text-blue-100">We're online now</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-blue-100 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;