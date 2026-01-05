import React from 'react';
import { tv } from 'tailwind-variants';

const card = tv({
  base: 'rounded-lg border bg-white dark:bg-gray-800 shadow-sm dark:shadow-none',
  variants: {
    variant: {
      default: 'border-gray-200 dark:border-gray-700',
      elevated: 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md dark:shadow-none'
    },
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md'
  }
});

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
}

const Card = ({ className, variant, padding, ...props }: CardProps) => {
  return (
    <div
      className={card({ variant, padding, className })}
      {...props}
    />
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`} {...props} />
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`} {...props} />
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return (
    <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`} {...props} />
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardContent = ({ className, ...props }: CardContentProps) => {
  return (
    <div className={`pt-0 ${className}`} {...props} />
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };