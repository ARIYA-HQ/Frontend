import React from 'react';
import { XMarkIcon, ScaleIcon } from '@heroicons/react/24/outline';

interface Vendor {
    id: number;
    image: string;
    name: string;
    category: string;
}

interface ComparisonBarProps {
    selectedVendors: Vendor[];
    onClear: () => void;
    onCompare: () => void;
}

const ComparisonBar: React.FC<ComparisonBarProps> = ({ selectedVendors, onClear, onCompare }) => {
    if (selectedVendors.length === 0) return null;

    return (
        <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up w-[calc(100%-2rem)] sm:w-auto">
            <div className="bg-black/95 dark:bg-white/95 backdrop-blur-xl text-white dark:text-black rounded-3xl p-2 sm:p-3 pl-4 sm:pl-6 shadow-2xl dark:shadow-none border border-white/10 dark:border-gray-200 flex flex-col sm:flex-row items-center gap-3 sm:gap-8 mx-auto">
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-[10px] sm:text-sm font-black uppercase tracking-widest whitespace-nowrap">
                        <span className="text-[#D0771E]">{selectedVendors.length}</span> / 3 Selected
                    </span>

                    <div className="h-6 sm:h-8 w-[1px] bg-white/20 dark:bg-black/10 mx-1 sm:mx-2"></div>

                    {/* Mini Thumbnails */}
                    <div className="flex items-center -space-x-3">
                        {selectedVendors.map((vendor) => (
                            <div key={vendor.id} className="relative group">
                                <img
                                    src={vendor.image}
                                    alt={vendor.name}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black dark:border-white object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                        onClick={onClear}
                        className="p-2 text-white/50 dark:text-black/50 hover:text-white dark:hover:text-black transition-colors rounded-full"
                        aria-label="Clear selection"
                    >
                        <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <button
                        onClick={onCompare}
                        disabled={selectedVendors.length < 2}
                        className={`
                            px-4 sm:px-6 py-2 sm:py-3 rounded-2xl flex-1 sm:flex-none flex items-center justify-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all
                            ${selectedVendors.length < 2
                                ? 'bg-gray-800 dark:bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-[#D0771E] text-white hover:bg-[#B8651A] hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20 dark:shadow-none'}
                        `}
                    >
                        <ScaleIcon className="w-4 h-4" />
                        Compare
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComparisonBar;
