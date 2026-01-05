import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon, StarIcon, UserGroupIcon, BanknotesIcon } from '@heroicons/react/24/solid';

interface VendorCardProps {
    id?: number;
    image: string;
    name: string;
    location: string;
    available?: boolean;
    guests: string;
    price: string;
    rating: number;
    reviews: number;
    isShortlisted?: boolean;
    onToggleShortlist?: () => void;
    selectable?: boolean;
    isSelected?: boolean;
    onToggleSelection?: (e: React.MouseEvent) => void;
}

const VendorCard: React.FC<VendorCardProps> = ({
    image,
    name,
    location,
    available = true,
    guests,
    price,
    rating,
    reviews,
    isShortlisted,
    onToggleShortlist,
    selectable = false,
    isSelected = false,
    onToggleSelection
}) => {
    return (
        <div
            className={`w-full h-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden group transition-all duration-300 flex flex-col border 
            ${isSelected ? 'border-[#D0771E] ring-2 ring-[#D0771E] ring-offset-2 dark:ring-offset-gray-900' : 'border-gray-100 dark:border-gray-700'} 
            hover:shadow-xl dark:hover:shadow-none cursor-pointer`}
            onClick={selectable ? onToggleSelection : undefined}
        >
            {/* Image Section */}
            <div className="relative h-[240px] w-full overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Selection Overlay */}
                {selectable && (
                    <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-[#D0771E]/20' : 'group-hover:bg-black/10'}`}>
                        <div className={`absolute top-4 left-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#D0771E] border-[#D0771E]' : 'bg-white/80 border-gray-400'}`}>
                            {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                    </div>
                )}

                {/* Available Badge - Hide when in selection mode for cleaner UI if desired, or keep it. Keeping it for now but adjusting z-index if needed */}
                {!selectable && available && (
                    <div className="absolute top-4 left-4 bg-green-50/90 dark:bg-green-900/30 backdrop-blur-sm text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm dark:shadow-none">
                        Available
                    </div>
                )}

                {/* Heart Icon */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleShortlist?.();
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 backdrop-blur-md active:scale-90 shadow-sm dark:shadow-none
                        ${isShortlisted
                            ? 'bg-white dark:bg-gray-800 text-red-500 shadow-red-100 dark:shadow-none'
                            : 'bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-red-500'}`}
                >
                    {isShortlisted ? (
                        <SolidHeartIcon className="w-5 h-5 animate-[bounce_0.3s_ease-in-out_1]" />
                    ) : (
                        <HeartIcon className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D0771E]"></span>
                        {location}
                    </p>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight group-hover:text-[#D0771E] transition-colors line-clamp-1">{name}</h3>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                    {/* Left Column: Guests and Price */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center text-gray-900 dark:text-white text-xs font-bold whitespace-nowrap gap-2">
                            <UserGroupIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            <span>{guests}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-900 dark:text-white font-bold whitespace-nowrap gap-2">
                            <BanknotesIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            <span>From {price}</span>
                        </div>
                    </div>

                    {/* Right Column: Rating */}
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg border border-orange-100 dark:border-orange-800">
                            <StarIcon className="w-3.5 h-3.5 text-[#D0771E]" />
                            <span className="text-xs font-black text-[#D0771E]">{rating.toFixed(1)}</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">{reviews} Reviews</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorCard;
