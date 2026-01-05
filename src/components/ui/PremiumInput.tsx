import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    error?: boolean;
    errorMessage?: string;
}

export const PremiumInput: React.FC<PremiumInputProps> = ({ 
    label, 
    icon, 
    className = '', 
    error = false,
    errorMessage,
    id,
    ...props 
}) => {
    const inputId = id || `premium-input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
        <div className="space-y-2 w-full">
            {label && (
                <label 
                    htmlFor={inputId}
                    className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                        aria-hidden="true"
                    >
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    className={`
                        w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 text-xs font-bold 
                        text-gray-900 dark:text-white
                        placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-bold
                        focus:ring-2 focus:ring-[#D0771E] dark:focus:ring-[#D0771E] 
                        focus:bg-white dark:focus:bg-gray-700 
                        transition-all
                        ${error ? 'ring-2 ring-red-500 dark:ring-red-500' : ''}
                        ${icon ? 'pl-12' : 'pl-4'}
                        ${className}
                    `}
                    aria-invalid={error}
                    aria-describedby={error && errorMessage ? `${inputId}-error` : undefined}
                    {...props}
                />
            </div>
            {error && errorMessage && (
                <p 
                    id={`${inputId}-error`}
                    className="text-xs text-red-600 dark:text-red-400 ml-1"
                    role="alert"
                >
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export const PremiumSearch: React.FC<PremiumInputProps> = (props) => {
    return (
        <PremiumInput
            icon={<MagnifyingGlassIcon className="w-4 h-4" aria-hidden="true" />}
            aria-label={props['aria-label'] || 'Search'}
            {...props}
        />
    );
};
