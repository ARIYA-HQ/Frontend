import React from 'react';
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface UrgentActionCardProps {
    title: string;
    subtitle: string;
    variant?: 'warning' | 'danger' | 'info'; // Yellow, Red, or Blue
    onClick?: () => void;
}

const UrgentActionCard: React.FC<UrgentActionCardProps> = ({ title, subtitle, variant = 'warning', onClick }) => {
    const styles = {
        warning: 'bg-orange-50/50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/30',
        danger: 'bg-red-50/50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30',
        info: 'bg-blue-50/50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30',
    };

    const Icon = variant === 'danger' ? ExclamationTriangleIcon : InformationCircleIcon;

    return (
        <div
            onClick={onClick}
            className={`
                relative p-6 rounded-[32px] border transition-all duration-500 group overflow-hidden
                ${styles[variant]}
                ${onClick ? 'cursor-pointer hover:shadow-2xl dark:hover:shadow-none hover:scale-[1.02] active:scale-[0.98]' : ''}
            `}
        >
            <div className="absolute right-4 top-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.12] transition-opacity">
                <Icon className="w-12 h-12" />
            </div>

            <div className="relative z-10 flex flex-col gap-1.5">
                <h4 className={`font-black text-[11px] uppercase tracking-widest ${
                    variant === 'danger' ? 'text-[#1D2939] dark:text-red-200' :
                    variant === 'info' ? 'text-[#1D2939] dark:text-blue-200' :
                    'text-[#1D2939] dark:text-orange-200'
                }`}>{title}</h4>
                <p className="text-[10px] font-bold opacity-60 dark:opacity-80 uppercase tracking-[0.2em] leading-relaxed pr-8">{subtitle}</p>
            </div>
        </div>
    );
};

export default UrgentActionCard;
