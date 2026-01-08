import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { UIProvider } from './contexts/UIContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { EntitlementProvider } from './contexts/EntitlementContext';
import ErrorBoundary from './components/ErrorBoundary';
import { authService } from './services/authService';
import AppRoutes from './routes/AppRoutes';
import './App.css';

// Component to handle subdomain routing
function SubdomainRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hostname = window.location.hostname;
    // Extract subdomain (assuming format like 'subdomain.ariya.com')
    const parts = hostname.split('.');

    // Ignore GitHub Pages domains
    if (hostname.includes('github.io')) {
      return;
    }

    // Only process if we have a subdomain (more than 2 parts, like 'vendor.ariya.com')
    if (parts.length >= 3) {
      const subdomain = parts[0];

      // Only redirect if we're on the root path and have a recognized subdomain
      if (location.pathname === '/' || location.pathname === '/dashboard') {
        switch (subdomain) {
          case 'vendor':
            navigate('/dashboard/vendor');
            break;
          case 'planner':
            // Navigate to planner dashboard (default dashboard)
            navigate('/dashboard');
            break;
          case 'pro':
            // Navigate to professional planner dashboard
            // Professional planners use the same dashboard as personal planners
            // but may have access to additional features like reports, proposals, team management
            navigate('/dashboard');
            break;
          default:
            // If subdomain is not recognized, do nothing and let the default routes handle it
            break;
        }
      }
    }
  }, [navigate, location.pathname]);

  return null;
}

// Component to set up auth service navigation callback
function AuthSetup() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set logout callback to use React Router navigation
    authService.setLogoutCallback(() => {
      navigate('/auth/login');
    });
  }, [navigate]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UIProvider>
          <EntitlementProvider>
            <NotificationProvider>
              <CartProvider>
                {/* Repository: ARIYA-HQ/Frontend */}
                <Router basename={process.env.NODE_ENV === 'production' ? '/Frontend' : '/'}>
                  <AuthSetup />
                  <SubdomainRouter />
                  <div className="App">
                    <AppRoutes />
                  </div>
                </Router>
              </CartProvider>
            </NotificationProvider>
          </EntitlementProvider>
        </UIProvider>
      </ThemeProvider >
    </ErrorBoundary >
  );
}

export default App;
