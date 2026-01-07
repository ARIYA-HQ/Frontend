import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import Header from '../ui/Header';
import { authService } from '../../services/authService';
import AriyaCopilot from '../ui/AriyaCopilot';
import { useNotifications } from '../../contexts/NotificationContext';

interface AppShellProps {
  children?: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine user role - prioritize stored user data, then route-based detection
  const getUserRole = () => {
    // First, try to get user role from authService (source of truth)
    const currentUser = authService.getCurrentUser();

    // For vendor routes, always return vendor
    if (location.pathname.includes('/dashboard/vendor')) {
      return 'vendor';
    }

    // For admin routes, always return admin
    if (location.pathname.includes('/admin')) {
      return 'admin';
    }

    // If we have user data, use their actual role (personal_planner or professional_event_planner)
    if (currentUser?.role) {
      return currentUser.role;
    }

    // Fallback: determine based on route patterns
    // Planner routes (both personal and professional use same routes)
    if (location.pathname.includes('/dashboard') ||
      location.pathname.includes('/events') ||
      location.pathname.includes('/vendors') ||
      location.pathname.includes('/guests') ||
      location.pathname.includes('/budget') ||
      location.pathname.includes('/website') ||
      location.pathname.includes('/designs') ||
      location.pathname.includes('/registry') ||
      location.pathname.includes('/messages') ||
      location.pathname.includes('/settings') ||
      location.pathname.includes('/clients') ||
      location.pathname.includes('/report') ||
      location.pathname.includes('/proposals') ||
      location.pathname.includes('/team')) {
      // Default to personal_planner if no user data
      return 'personal_planner';
    }

    return 'personal_planner'; // default
  };

  const { addNotification } = useNotifications();

  // Simulate incoming notifications
  useEffect(() => {
    const notifyTimer = setTimeout(() => {
      addNotification({
        title: 'New Lead: Sarah & David',
        message: 'A new inquiry has been received for their December Wedding.',
        type: 'success',
        link: '/dashboard/vendor/inquiries'
      });
    }, 10000); // 10 seconds after load

    const conflictTimer = setTimeout(() => {
      addNotification({
        title: 'Seating Conflict Detected',
        message: 'Guest "Phoenix Baker" has a dietary restriction at Table 4.',
        type: 'warning',
        link: '/dashboard/seating'
      });
    }, 25000); // 25 seconds after load

    return () => {
      clearTimeout(notifyTimer);
      clearTimeout(conflictTimer);
    };
  }, []);

  const userRole = getUserRole();

  return (
    <>
      <div>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRole={userRole}
        />

        <div className="lg:pl-72 min-h-screen bg-[#F4F6F8] dark:bg-gray-900 transition-colors">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {children || <Outlet />}
            </div>
          </main>
        </div>
        <AriyaCopilot />
      </div>
    </>
  );
};

export default AppShell;