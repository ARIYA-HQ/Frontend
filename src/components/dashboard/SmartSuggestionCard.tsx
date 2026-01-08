import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface SmartSuggestionCardProps {
    title: string;
    subtitle: string;
    priority: 'High' | 'Medium' | 'Low';
    onClick?: () => void;
}

const SmartSuggestionCard: React.FC<SmartSuggestionCardProps> = ({ title, subtitle, priority, onClick }) => {
    const priorityStyles = {
        High: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 border-red-100 dark:border-red-800',
        Medium: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 border-orange-100 dark:border-orange-800',
        Low: 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-600',
    };

    return (
        <div
            onClick={onClick}
            className={`bg-white dark:bg-gray-800 rounded-[32px] p-6 sm:p-8 border border-gray-100 dark:border-gray-700 transition-all duration-500 group relative overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-2xl dark:hover:shadow-none hover:scale-[1.02] active:scale-[0.98]' : ''}`}
        >
            <div className="absolute right-4 top-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.12] transition-opacity">
                <SparklesIcon className="w-12 h-12" />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
                <div className="space-y-1 sm:space-y-2">
                    <h4 className="text-[#1D2939] dark:text-white font-black text-[10px] sm:text-[11px] uppercase tracking-widest leading-relaxed group-hover:text-[#D0771E] transition-colors">{title}</h4>
                    <p className="text-gray-400 dark:text-gray-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] max-w-[200px] sm:max-w-[240px] leading-relaxed">{subtitle}</p>
                </div>
                <span className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-sm dark:shadow-none ${priorityStyles[priority]}`}>
                    {priority}
                </span>
            </div>
        </div>
    );
};

export default SmartSuggestionCard;
