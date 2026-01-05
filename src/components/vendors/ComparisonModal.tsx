import React from 'react';
import { XMarkIcon, CheckIcon, MapPinIcon, UserGroupIcon, StarIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import PremiumCard from '../ui/PremiumCard';

interface Vendor {
    id: number;
    image: string;
    name: string;
    category: string;
    location: string;
    guests: string;
    price: string;
    rating: number;
    reviews: number;
    available?: boolean;
}

interface ComparisonModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendors: Vendor[];
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, vendors }) => {
    if (!isOpen) return null;

    // Comparison attributes configuration
    const attributes = [
        {
            label: 'Location',
            icon: MapPinIcon,
            render: (v: Vendor) => v.location
        },
        {
            label: 'Capacity',
            icon: UserGroupIcon,
            render: (v: Vendor) => v.guests
        },
        {
            label: 'Price Range',
            icon: BanknotesIcon,
            render: (v: Vendor) => v.price
        },
        {
            label: 'Rating',
            icon: StarIcon,
            render: (v: Vendor) => (
                <div className="flex items-center gap-1">
                    <span className="font-bold text-[#D0771E]">{v.rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-xs">({v.reviews} reviews)</span>
                </div>
            )
        },
        {
            label: 'Availability',
            icon: CheckIcon,
            render: (v: Vendor) => (
                v.available ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-wider border border-green-100 dark:border-green-800">
                        Available
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-wider border border-red-100 dark:border-red-800">
                        Booked
                    </span>
                )
            )
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-12">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 z-10">
                    <div>
                        <h2 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter italic">Vendor Comparison</h2>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Side by side evaluation</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Comparison Grid */}
                <div className="flex-1 overflow-auto p-8">
                    <div className="grid gap-8" style={{ gridTemplateColumns: `auto repeat(${vendors.length}, 1fr)` }}>

                        {/* Legend Column */}
                        <div className="space-y-12 py-32 lg:pt-48">
                            {attributes.map((attr, idx) => (
                                <div key={idx} className="h-16 flex items-center gap-3 text-gray-400 dark:text-gray-500">
                                    <attr.icon className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase tracking-widest hidden lg:block">{attr.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Vendor Columns */}
                        {vendors.map((vendor) => (
                            <PremiumCard key={vendor.id} className="h-full flex flex-col border-gray-100 dark:border-gray-800 shadow-none dark:shadow-none hover:border-[#D0771E]/30 transition-colors">
                                <div className="text-center mb-8">
                                    <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden shadow-lg dark:shadow-none">
                                        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest mb-2">{vendor.category}</div>
                                    <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-tight leading-none mb-4">{vendor.name}</h3>
                                    <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:opacity-80 transition-opacity">
                                        Contact
                                    </button>
                                </div>

                                <div className="space-y-12">
                                    {attributes.map((attr, idx) => (
                                        <div key={idx} className="h-16 flex items-center justify-center border-t border-gray-50 dark:border-gray-800/50">
                                            <div className="text-sm font-bold text-black dark:text-white">
                                                {attr.render(vendor)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PremiumCard>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonModal;
