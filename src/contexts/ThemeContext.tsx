import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { storage, STORAGE_KEYS } from '@/utils/storage';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Get saved theme from storage or default to 'light'
    const savedTheme = storage.get<Theme>(STORAGE_KEYS.THEME);
    const initialTheme = savedTheme || 'light';
    
    // Apply theme immediately to prevent flash
    if (typeof document !== 'undefined') {
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
    
    return initialTheme;
  });

  useEffect(() => {
    // Apply theme to document element when theme changes
    // This is a backup to ensure the class is always applied
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Remove both classes first to avoid conflicts
      root.classList.remove('dark', 'light');
      
      if (theme === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }
      
      // Force a reflow to ensure the change is applied
      void root.offsetHeight;
    }
  }, [theme]);

  // Save theme to storage when theme changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      
      // Apply theme immediately to DOM (synchronously)
      if (typeof document !== 'undefined') {
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }
      
      return newTheme;
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};