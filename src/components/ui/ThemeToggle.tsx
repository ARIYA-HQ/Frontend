import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
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