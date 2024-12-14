import React, { useState } from 'react';
import { Bell, AlertTriangle, Calendar, Package, X, Filter, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'health-alert' | 'appointment' | 'order';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  action?: {
    label: string;
    handler: () => void;
  };
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'health-alert',
      title: 'COVID-19 Vaccination Drive',
      message: 'New vaccination center opened in your area. Book your slot now.',
      timestamp: new Date(),
      isRead: false,
      priority: 'high',
      action: {
        label: 'Book Slot',
        handler: () => console.log('Booking slot...')
      }
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Dr. Sarah Johnson - General Checkup tomorrow at 10:00 AM',
      timestamp: new Date(),
      isRead: false,
      priority: 'medium',
      action: {
        label: 'View Details',
        handler: () => console.log('Viewing appointment...')
      }
    },
    {
      id: '3',
      type: 'order',
      title: 'Order Delivered',
      message: 'Your medicine order #12345 has been delivered',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'health-alert' | 'appointment' | 'order'>('all');
  const [isOpen, setIsOpen] = useState(false);

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'health-alert':
        return AlertTriangle;
      case 'appointment':
        return Calendar;
      case 'order':
        return Package;
      default:
        return Bell;
    }
  };

  const getTypeBadgeColor = (type: Notification['type']) => {
    switch (type) {
      case 'health-alert':
        return 'bg-red-100 text-red-800';
      case 'appointment':
        return 'bg-blue-100 text-blue-800';
      case 'order':
        return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-500';
      case 'medium':
        return 'border-yellow-500';
      case 'low':
        return 'border-gray-300';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'all'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'unread'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('health-alert')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'health-alert'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Health Alerts
              </button>
              <button
                onClick={() => setFilter('appointment')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'appointment'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Appointments
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p>No notifications to show</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredNotifications.map((notification) => {
                  const Icon = getTypeIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      } border-l-4 ${getPriorityColor(notification.priority)}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full ${getTypeBadgeColor(notification.type)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-500">
                              {notification.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {notification.message}
                          </p>
                          {notification.action && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                notification.action?.handler();
                              }}
                              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                              {notification.action.label}
                            </button>
                          )}
                        </div>
                        {!notification.isRead && (
                          <div className="ml-3">
                            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {unreadCount > 0 && (
            <div className="p-4 border-t">
              <button
                onClick={markAllAsRead}
                className="flex items-center justify-center w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 