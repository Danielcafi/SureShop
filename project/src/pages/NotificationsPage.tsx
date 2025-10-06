import React from 'react';
import { Bell, CheckCheck, Trash2, ExternalLink } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { Link } from 'react-router-dom';

const typeColors: Record<string, string> = {
  order: 'bg-blue-100 text-blue-800',
  promotion: 'bg-green-100 text-green-800',
  system: 'bg-gray-100 text-gray-800',
  account: 'bg-purple-100 text-purple-800'
};

const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clear } = useNotifications();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="w-7 h-7 text-blue-600" /> Notifications
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <span className="inline-flex items-center gap-2"><CheckCheck className="w-4 h-4" /> Mark all as read</span>
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
          >
            <span className="inline-flex items-center gap-2"><Trash2 className="w-4 h-4" /> Clear</span>
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={`bg-white rounded-xl shadow border ${n.read ? 'border-gray-100' : 'border-blue-200'} p-4 flex items-start justify-between`}>
              <div className="flex items-start gap-4">
                <div className={`mt-1 px-2 py-1 rounded text-xs font-medium ${typeColors[n.type] || 'bg-gray-100 text-gray-800'}`}>{n.type}</div>
                <div>
                  <div className="font-semibold text-gray-900">{n.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{n.message}</div>
                  <div className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                  {n.actionUrl && (
                    <Link to={n.actionUrl} className="inline-flex items-center gap-1 text-sm text-blue-600 mt-2 hover:text-blue-700">
                      View <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
              {!n.read && (
                <button onClick={() => markAsRead(n.id)} className="text-sm text-blue-600 hover:text-blue-700">Mark as read</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
