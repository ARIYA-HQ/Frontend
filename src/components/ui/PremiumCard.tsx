import React from 'react';

export interface PremiumCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ 
    children, 
    className = '', 
    onClick, 
    hover = true,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props 
}) => {
    return (
        <div
            onClick={onClick}
            role={role || (onClick ? 'button' : undefined)}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            } : undefined}
            className={`
                bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 
                shadow-sm dark:shadow-none transition-all overflow-hidden
                ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D0771E] focus:ring-offset-2' : ''}
                ${hover ? 'hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1' : ''}
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
};

export default PremiumCard;
