import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext';
import chatSupportIcon from '../assets/images/icons/chat-support.png';

const GlobalChatModal: React.FC = () => {
  const { isOpen, closeChat, messages, sendMessage, isConnecting } = useChat();
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={chatSupportIcon} 
              alt="Chat Support" 
              className="w-16 h-16 object-contain"
            />
            <h3 className="text-lg font-semibold">Live Chat</h3>
          </div>
          <button onClick={closeChat} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="text-sm text-gray-500 mb-3">
          {isConnecting ? 'Connecting to an agent…' : 'You are connected.'}
        </div>

        <div className="border border-gray-200 rounded-lg h-64 overflow-y-auto p-3 mb-3 bg-gray-50">
          {messages.length === 0 && (
            <div className="text-gray-400 text-sm h-full flex items-center justify-center">Starting chat…</div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`mb-2 flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage(input);
                setInput('');
              }
            }}
            placeholder="Type your message…"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button onClick={() => { sendMessage(input); setInput(''); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Send</button>
        </div>
      </div>
    </div>
  );
};

export default GlobalChatModal;


