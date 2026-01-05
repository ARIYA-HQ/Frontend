import { useState } from 'react';
import { Link } from 'react-router-dom';
import VendorCard from '../../components/vendors/VendorCard';
import ComparisonBar from '../../components/vendors/ComparisonBar';
import ComparisonModal from '../../components/vendors/ComparisonModal';
import { MOCK_VENDORS } from '../../data/mockVendors';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';
import { PremiumSearch } from '../../components/ui/PremiumInput';

const Vendors = () => {
    const [activeTab, setActiveTab] = useState('Browse Vendors');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [searchQuery, setSearchQuery] = useState('');
    const [vendors, setVendors] = useState(() => MOCK_VENDORS);

    // Comparison State
    const [selectedVendorIds, setSelectedVendorIds] = useState<number[]>([]);
    const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

    const toggleShortlist = (id: number) => {
        setVendors(prevVendors => prevVendors.map(vendor =>
            vendor.id === id ? { ...vendor, isShortlisted: !vendor.isShortlisted } : vendor
        ));
    };

    const toggleSelection = (e: React.MouseEvent, id: number) => {
        e.preventDefault(); // Prevent Link navigation
        if (selectedVendorIds.includes(id)) {
            setSelectedVendorIds(prev => prev.filter(vId => vId !== id));
        } else {
            if (selectedVendorIds.length >= 3) {
                // Optional: visual feedback that max selection is reached
                alert("You can compare up to 3 vendors at a time.");
                return;
            }
            setSelectedVendorIds(prev => [...prev, id]);
        }
    };

    const filteredVendors = vendors.filter(vendor => {
        // Search Filtering
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                vendor.name.toLowerCase().includes(query) ||
                vendor.location.toLowerCase().includes(query) ||
                vendor.category.toLowerCase().includes(query);
            if (!matchesSearch) return false;
        }

        // Tab Filtering
        if (activeTab === 'My Vendors' && !vendor.isBooked) return false;
        if (activeTab === 'Shortlist' && !vendor.isShortlisted) return false;

        // Category Filtering
        if (selectedCategory !== 'All Categories' && vendor.category !== selectedCategory) return false;

        return true;
    });

    // Calculate specific counts
    const categoryCounts = vendors.reduce((acc, vendor) => {
        acc[vendor.category] = (acc[vendor.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Get actual vendor objects for comparison
    const selectedVendors = vendors.filter(v => selectedVendorIds.includes(v.id));

    return (
        <div className="max-w-[1600px] mx-auto pb-20 relative">
            <div className="w-full px-8">

                {/* Page Header */}
                <PageHeader
                    breadcrumb="Vendor Management"
                    title="Vendors"
                    subtitle="Discover and manage your event vendors"
                    actions={
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700">
                            <span className="text-sm font-black text-[#262626] dark:text-white uppercase tracking-widest">{filteredVendors.length} Vendors Found</span>
                        </div>
                    }
                />

                {/* Tabs */}
                <PremiumTabs
                    tabs={[
                        { id: 'Browse Vendors', label: 'Browse Vendors' },
                        { id: 'My Vendors', label: 'My Vendors' },
                        { id: 'Shortlist', label: 'Shortlist' }
                    ]}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {/* Main Grid Layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Column */}
                    <div className="w-full lg:w-[280px] flex-shrink-0">
                        <div className="sticky top-8">
                            <PremiumCard className="p-4 border-gray-100/50 dark:border-gray-700/50 shadow-none bg-transparent dark:bg-transparent">
                                <div className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4 px-2">Search & Filters</div>
                                <div className="space-y-4">
                                    <PremiumSearch
                                        placeholder="Search vendors..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full"
                                    />

                                    <div className="space-y-2">
                                        <div className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest px-2 mt-6 mb-2">Categories</div>
                                        {Object.entries(categoryCounts).map(([cat, count]) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(selectedCategory === cat ? 'All Categories' : cat)}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs transition-all duration-300
                                                ${selectedCategory === cat
                                                        ? 'bg-[#D0771E] text-white font-black shadow-lg dark:shadow-none transform scale-105'
                                                        : 'text-gray-500 dark:text-gray-400 font-bold hover:bg-white dark:hover:bg-gray-800 hover:shadow-md dark:hover:shadow-none hover:text-gray-900 dark:hover:text-white border border-transparent hover:border-gray-50 dark:hover:border-gray-700'}
                                            `}
                                            >
                                                <span className="uppercase tracking-widest">{cat}</span>
                                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${selectedCategory === cat
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                                                    }`}>{count}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </PremiumCard>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1">
                        {filteredVendors.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredVendors.map((vendor) => (
                                    <Link key={vendor.id} to={`/vendors/${vendor.id}`} className="group block h-full">
                                        <VendorCard
                                            {...vendor}
                                            onToggleShortlist={() => toggleShortlist(vendor.id)}
                                            selectable={true}
                                            isSelected={selectedVendorIds.includes(vendor.id)}
                                            onToggleSelection={(e?: React.MouseEvent) => e && toggleSelection(e, vendor.id)}
                                        />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <PremiumCard className="py-20 text-center flex flex-col items-center justify-center border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none min-h-[400px]">
                                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-4xl">🔍</span>
                                </div>
                                <h3 className="text-xl font-black text-[#101828] dark:text-white uppercase tracking-tight">No vendors found</h3>
                                <p className="text-xs font-bold text-[#667085] dark:text-gray-400 mt-2 uppercase tracking-wide">Try adjusting your filters or browsing all vendors</p>
                            </PremiumCard>
                        )}
                    </div>
                </div>
            </div>

            {/* Comparison Floating Bar */}
            <ComparisonBar
                selectedVendors={selectedVendors}
                onClear={() => setSelectedVendorIds([])}
                onCompare={() => setIsComparisonModalOpen(true)}
            />

            {/* Comparison Modal */}
            <ComparisonModal
                isOpen={isComparisonModalOpen}
                onClose={() => setIsComparisonModalOpen(false)}
                vendors={selectedVendors}
            />
        </div>
    );
};

export default Vendors;
