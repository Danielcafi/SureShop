import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type NotificationType = 'order' | 'promotion' | 'system' | 'account';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string; // ISO string
  read: boolean;
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clear: () => void;
}

const STORAGE_KEY = 'ecommerce_notifications';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as AppNotification[];
    } catch {}
    // Seed with a few demo notifications
    return [
      {
        id: 'n1',
        title: 'Order Shipped',
        message: 'Your recent order #1023 is on the way! Track its progress.',
        type: 'order',
        createdAt: new Date().toISOString(),
        read: false,
        actionUrl: '/orders/1023'
      },
      {
        id: 'n2',
        title: 'Limited-time offer',
        message: 'Get 15% off electronics this weekend only.',
        type: 'promotion',
        createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
        read: false
      },
      {
        id: 'n3',
        title: 'Welcome to ShopPro',
        message: 'Thanks for joining! Explore new arrivals and exclusive deals.',
        type: 'system',
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        read: true
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const addNotification: NotificationContextType['addNotification'] = (n) => {
    setNotifications(prev => [
      {
        id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        read: false,
        ...n
      },
      ...prev
    ]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clear = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clear }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
