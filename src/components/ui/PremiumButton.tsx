import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center rounded-2xl font-bold
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-[#D0771E] text-white hover:bg-[#B8651A] 
      focus:ring-[#D0771E] dark:bg-[#D0771E] dark:hover:bg-[#B8651A]
    `,
    secondary: `
      bg-gray-100 text-gray-900 hover:bg-gray-200 
      focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
    `,
    ghost: `
      text-gray-700 hover:bg-gray-100 
      focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800
    `,
    destructive: `
      bg-red-600 text-white hover:bg-red-700 
      focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700
    `,
    outline: `
      border-2 border-gray-200 bg-transparent hover:bg-gray-50 text-gray-700
      focus:ring-gray-500 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800
    `,
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-2',
    md: 'text-sm px-4 py-3',
    lg: 'text-base px-6 py-4',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" aria-label="Loading" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default PremiumButton;

