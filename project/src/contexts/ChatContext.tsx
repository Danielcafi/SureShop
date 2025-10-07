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

  const sendMessage = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages(prev => [...prev, { sender: 'user', text: clean, at: Date.now() }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'agent', text: 'Thanks! An agent will respond shortly.', at: Date.now() }]);
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


