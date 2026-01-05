import { useState } from 'react';
import type { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import Header from '../ui/Header';
import Breadcrumbs from '../ui/Breadcrumbs';

interface AppShellProps {
  children?: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine user role based on current route for both navigation and dashboard name
  const getUserRole = () => {
    // Prioritize route-based detection for both navigation and dashboard name
    if (location.pathname.includes('/dashboard/vendor')) {
      return 'vendor';
    } else if (location.pathname.includes('/dashboard/professional-planner')) {
      return 'professional_event_planner';
    } else if (location.pathname.includes('/admin')) {
      return 'admin';
    } else if (location.pathname.includes('/dashboard')) {
      return 'planner';
    } else {
      // For other routes, determine based on path
      if (location.pathname.includes('/events')) {
        return 'planner'; // Events dashboard for planners
      } else if (location.pathname.includes('/vendors')) {
        return 'planner'; // Vendors dashboard for planners
      } else if (location.pathname.includes('/guests')) {
        return 'planner'; // Guests dashboard for planners
      } else if (location.pathname.includes('/budget')) {
        return 'planner'; // Budget dashboard for planners
      } else {
        // Fallback to stored user data if no route match
        try {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            return user.role;
          }
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
        }
        return 'planner'; // default to planner
      }
    }
  };

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
      </div>
    </>
  );
};

export default AppShell;