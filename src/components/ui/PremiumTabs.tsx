import React from 'react';

interface Tab {
    id: string;
    label: string;
}

interface PremiumTabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
    className?: string;
}

const PremiumTabs: React.FC<PremiumTabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
    return (
        <div className={`flex gap-10 border-b border-gray-100 dark:border-gray-700 pb-px ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`pb-4 text-[13px] font-black uppercase tracking-wider relative transition-all ${activeTab === tab.id 
                        ? 'text-[#D0771E]' 
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#D0771E] rounded-t-full shadow-[0_-2px_8px_rgba(208,119,30,0.3)] dark:shadow-none animation-slide-in"></div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default PremiumTabs;
