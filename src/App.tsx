import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { UIProvider } from './contexts/UIContext';
import { CartProvider } from './contexts/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import { authService } from './services/authService';
import AppRoutes from './routes/AppRoutes';
import './App.css';

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
          <CartProvider>
            <Router>
              <AuthSetup />
              <div className="App">
                <AppRoutes />
              </div>
            </Router>
          </CartProvider>
        </UIProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
