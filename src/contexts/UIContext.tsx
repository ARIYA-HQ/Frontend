import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Notification {
    id?: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}

interface UIContextType {
    addNotification: (notification: Notification) => void;
    removeNotification: (id: string) => void;
    notifications: Notification[];
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Notification) => {
        const id = notification.id || Math.random().toString(36).substring(7);
        const newNotification = { ...notification, id };
        setNotifications(prev => [...prev, newNotification]);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 3000);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <UIContext.Provider value={{ addNotification, removeNotification, notifications }}>
            {children}
            {/* Notification Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-slide-in-right ${notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'error' ? 'bg-red-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' :
                                    'bg-blue-500'
                            }`}
                    >
                        {notification.message}
                    </div>
                ))}
            </div>
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
