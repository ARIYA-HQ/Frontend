import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

interface PremiumEmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

export const PremiumEmptyState: React.FC<PremiumEmptyStateProps> = ({
    title,
    description,
    actionLabel,
    onAction,
    icon
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in-95 duration-700">
            <div className="w-20 h-20 rounded-[32px] bg-[#F3F0EB]/50 dark:bg-gray-800 flex items-center justify-center text-[#D0771E] mb-8 shadow-inner">
                {icon || <SparklesIcon className="w-10 h-10" />}
            </div>
            <h3 className="text-2xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-4">{title}</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium uppercase tracking-widest">{description}</p>
            {actionLabel && onAction && (
                <Button
                    onClick={onAction}
                    className="h-14 px-10 rounded-2xl bg-[#D0771E] text-white shadow-xl shadow-orange-100 dark:shadow-none"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};
