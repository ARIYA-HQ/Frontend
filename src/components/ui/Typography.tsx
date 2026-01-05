import React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | HTMLDivElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'body' | 'small' | 'caption';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'error' | 'success';
  align?: 'left' | 'center' | 'right' | 'justify';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  color = 'default', 
  align = 'left', 
  as = 'p', 
  className, 
  ...props 
}) => {
  const Component = as as keyof JSX.IntrinsicElements;

  // Simple mapping for typography classes
  const variantClasses = {
    h1: 'text-5xl font-bold leading-tight',
    h2: 'text-4xl font-bold leading-tight',
    h3: 'text-3xl font-bold leading-snug',
    h4: 'text-2xl font-semibold leading-snug',
    h5: 'text-xl font-semibold leading-normal',
    h6: 'text-lg font-semibold leading-normal',
    body: 'text-base font-normal leading-relaxed',
    small: 'text-sm font-normal leading-normal',
    caption: 'text-xs font-medium leading-tight',
  };

  const colorClasses = {
    default: 'text-gray-900 dark:text-white',
    primary: 'text-[#D0771E]',
    secondary: 'text-gray-600 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    error: 'text-red-600 dark:text-red-400',
    success: 'text-green-600 dark:text-green-400',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const combinedClasses = [
    variantClasses[variant],
    colorClasses[color],
    alignClasses[align],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={combinedClasses}
      {...props}
    />
  );
};

export { Typography };