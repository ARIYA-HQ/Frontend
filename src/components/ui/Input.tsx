import React from 'react';
import { Input as AriaInput, type InputProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const input = tv({
  base: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500',
  variants: {
    variant: {
      default: 'border-gray-300',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface InputComponentProps extends InputProps {
  variant?: 'default' | 'error';
}

const Input = ({ variant, className, ...props }: InputComponentProps) => {
  return (
    <AriaInput
      className={(renderProps) => input({ variant, className, ...renderProps })}
      {...props}
    />
  );
};

export { Input, input };