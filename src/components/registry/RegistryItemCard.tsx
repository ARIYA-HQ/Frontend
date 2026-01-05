import React from 'react';

interface RegistryItemProps {
    image: string;
    brand: string;
    title: string;
    price: string;
    priority?: 'High' | 'Medium' | 'Low';
    status?: 'Available' | 'Purchased' | 'Reserved';
    quantity: number;
}

const RegistryItemCard: React.FC<RegistryItemProps> = ({
    image,
    brand,
    title,
    price,
    priority = 'Medium',
    status = 'Available',
    quantity
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 group hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300">
            {/* Image Container */}
            <div className="relative h-[240px] bg-gray-50 dark:bg-gray-700 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay dots for carousel effect (mock) */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 p-2 bg-black/10 backdrop-blur-sm rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-sm"></div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-widest">{brand}</div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 min-h-[40px]">{title}</h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <span className={`
                        text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border
                        ${priority === 'High'
                            ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                            : priority === 'Low' || priority === 'Medium'
                                ? 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800'
                                : 'bg-gray-50 text-gray-500 border-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}
                    `}>
                        {priority?.toUpperCase()} PRIORITY
                    </span>
                    <span className={`
                        text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border
                        ${status === 'Available'
                            ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                            : status === 'Purchased'
                                ? 'bg-gray-50 text-gray-500 border-gray-100 line-through dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600'
                                : 'bg-gray-50 text-gray-500 border-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}
                    `}>
                        {status?.toUpperCase()}
                    </span>
                </div>

                <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-50 dark:border-gray-700">
                    <div className="font-black text-gray-900 dark:text-white text-lg tracking-tight">{price}</div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                        Qty: <span className="text-gray-900 dark:text-white">{quantity}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistryItemCard;
