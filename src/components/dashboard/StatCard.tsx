import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    iconBgColor?: string; // e.g. 'bg-purple-600'
    textColor?: string;
    onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    icon,
    iconBgColor = "bg-[#D0771E]/10 dark:bg-[#D0771E]/20",
    textColor = "text-gray-900 dark:text-white",
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white dark:bg-gray-800 rounded-[32px] p-6 sm:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-40 sm:h-48 transition-all duration-500 ${onClick ? 'cursor-pointer hover:shadow-2xl dark:hover:shadow-none hover:-translate-y-1 active:scale-95' : ''}`}
        >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center ${iconBgColor} shadow-xl dark:shadow-none`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-1 sm:mb-1.5">{label}</p>
                <h3 className={`text-2xl sm:text-3xl font-black ${textColor} tracking-tighter leading-none`}>{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;
