import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
    GlobeAltIcon,
    CameraIcon,
    VideoCameraIcon,
    CakeIcon,
    MusicalNoteIcon,
    SparklesIcon,
    HomeModernIcon,
    TruckIcon
} from '@heroicons/react/24/outline';

const categories = [
    { name: 'All Categories', count: 95, icon: GlobeAltIcon },
    { name: 'Photography', count: 9, icon: CameraIcon },
    { name: 'Videography', count: 9, icon: VideoCameraIcon },
    { name: 'Catering', count: 12, icon: CakeIcon },
    { name: 'MC and DJ', count: 11, icon: MusicalNoteIcon },
    { name: 'Makeup Artist', count: 9, icon: SparklesIcon },
    { name: 'Decor & Design', count: 9, icon: HomeModernIcon },
    { name: 'Cake & Desserts', count: 9, icon: CakeIcon },
    { name: 'Transportation', count: 9, icon: TruckIcon },
    { name: 'Venue', count: 9, icon: HomeModernIcon },
];

interface VendorFilterSidebarProps {
    selectedCategory?: string;
    onSelectCategory?: (category: string) => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
    categoryCounts?: Record<string, number>;
    totalVendors?: number;
}

const VendorFilterSidebar: React.FC<VendorFilterSidebarProps> = ({
    selectedCategory = 'All Categories',
    onSelectCategory,
    searchQuery = '',
    onSearchChange,
    categoryCounts = {},
    totalVendors = 0
}) => {
    return (
        <div className="space-y-8">

            {/* Search Input */}
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-[#8C8C8C]" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="block w-full rounded-lg border-[#D0CDCD] bg-[#FAFAFA] py-2.5 pl-10 text-[#8C8C8C] placeholder:text-[#8C8C8C] focus:ring-1 focus:ring-[#D0771E] focus:border-[#D0771E] sm:text-sm font-['Inter'] font-medium"
                    placeholder="Search Vendor"
                />
            </div>

            {/* Categories List */}
            <div>
                <h3 className="text-[14px] font-semibold text-[#262626] mb-2 font-['Inter']">Categories</h3>
                <nav className="space-y-1">
                    {categories.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => onSelectCategory?.(item.name)}
                            className={`
                                w-full group flex items-center justify-between px-3 py-2.5 text-[14px] font-medium rounded-lg transition-colors font-['Inter']
                                ${selectedCategory === item.name
                                    ? 'bg-[#D0771E]/10 text-[#D0771E]'
                                    : 'text-[#8C8C8C] hover:bg-gray-50 hover:text-gray-900'}
                            `}
                        >
                            <div className="flex items-center">
                                <item.icon
                                    className={`mr-3 h-4 w-4 flex-shrink-0 ${selectedCategory === item.name ? 'text-[#D0771E]' : 'text-[#8C8C8C]'}`}
                                />
                                {item.name}
                            </div>
                            <span className={`text-[14px] ml-auto font-normal ${selectedCategory === item.name ? 'text-[#D0771E]' : 'text-[#8C8C8C]'}`}>
                                {item.name === 'All Categories'
                                    ? totalVendors
                                    : (categoryCounts[item.name] || 0)}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Filters Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-medium text-[#8C8C8C] font-['Inter']">Filters</h3>
                    {/* Filter icon could go here if needed, CSS mentioned 'setting-5' */}
                </div>

                <div className="space-y-4">
                    {/* Budget Range */}
                    <div>
                        <label className="block text-[12px] font-medium text-[#8C8C8C] mb-2 font-['Inter']">Budget Range</label>
                        <div className="bg-[#FAFAFA] border border-[#D0CDCD] rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer">
                            <span className="text-[12px] text-[#8C8C8C] font-['Inter']">Any Budget</span>
                            <span className="text-[#8C8C8C] text-[10px]">▼</span>
                        </div>
                    </div>

                    {/* Distance */}
                    <div>
                        <label className="block text-[12px] font-medium text-[#8C8C8C] mb-2 font-['Inter']">Distance</label>
                        <div className="bg-[#FAFAFA] border border-[#D0CDCD] rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer">
                            <span className="text-[12px] text-[#8C8C8C] font-['Inter']">Any Distance</span>
                            <span className="text-[#8C8C8C] text-[10px]">▼</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorFilterSidebar;
