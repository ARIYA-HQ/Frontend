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
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
            <div className="bg-black/90 dark:bg-white/95 backdrop-blur-xl text-white dark:text-black rounded-3xl p-3 pl-6 pr-3 shadow-2xl dark:shadow-none border border-white/10 dark:border-gray-200 flex items-center gap-8 min-w-[320px] max-w-[90vw]">

                <div className="flex items-center gap-4">
                    <span className="text-sm font-black uppercase tracking-widest whitespace-nowrap">
                        <span className="text-[#D0771E]">{selectedVendors.length}</span> / 3 Selected
                    </span>

                    <div className="h-8 w-[1px] bg-white/20 dark:bg-black/10 mx-2"></div>

                    {/* Mini Thumbnails */}
                    <div className="flex items-center -space-x-3">
                        {selectedVendors.map((vendor) => (
                            <div key={vendor.id} className="relative group">
                                <img
                                    src={vendor.image}
                                    alt={vendor.name}
                                    className="w-10 h-10 rounded-full border-2 border-black dark:border-white object-cover"
                                />
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] font-bold rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {vendor.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    <button
                        onClick={onClear}
                        className="p-2 text-white/50 dark:text-black/50 hover:text-white dark:hover:text-black transition-colors rounded-full hover:bg-white/10 dark:hover:bg-black/5"
                        aria-label="Clear selection"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>

                    <button
                        onClick={onCompare}
                        disabled={selectedVendors.length < 2}
                        className={`
                            px-6 py-3 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all
                            ${selectedVendors.length < 2
                                ? 'bg-gray-700 dark:bg-gray-200 text-gray-400 cursor-not-allowed'
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
