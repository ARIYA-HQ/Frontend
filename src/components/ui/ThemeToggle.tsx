import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    toggleTheme();
  };

  if (!mounted) {
    return (
      <div className="p-2 rounded-full">
        <div className="h-5 w-5" />
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D0771E] transition-colors relative z-50"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type="button"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      ) : (
        <SunIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
};

export default ThemeToggle;