import { useState } from 'react';
import {
    ShoppingBagIcon,
    PlusIcon,
    BanknotesIcon,
    AdjustmentsHorizontalIcon,
    TruckIcon,
    UserGroupIcon,
    XMarkIcon,
    LinkIcon,
} from '@heroicons/react/24/outline';
import RegistryItemCard from '../../components/registry/RegistryItemCard';
import { useCart } from '../../contexts/CartContext';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import StatCard from '../../components/dashboard/StatCard';
import PremiumCard from '../../components/ui/PremiumCard';
import { PremiumSearch } from '../../components/ui/PremiumInput';

const Registry = () => {
    const [activeTab, setActiveTab] = useState('My Registry');
    const [isAddGiftModalOpen, setIsAddGiftModalOpen] = useState(false);
    const [subModal, setSubModal] = useState<'LinkRegistry' | 'ExternalStore' | 'CashFund' | 'EditGift' | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Gifts');
    const [copyStatus, setCopyStatus] = useState<string | null>(null);
    const { cart, addToCart } = useCart();

    // Helper for formatting price
    const formatPrice = (price: number) => {
        return '₦' + price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    };

    // Initial Data converted to State
    const [giftItems, setGiftItems] = useState([
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop',
            brand: 'KitchenAid',
            title: 'Signature Round Dutch Oven Service for 1',
            unitPrice: 700000,
            priority: 'High' as const,
            status: 'Available' as const,
            quantity: 1,
            category: 'Kitchen',
            colors: ['#D9D9D9', '#262626', '#D0771E'],
            selectedColor: '#D9D9D9'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2670&auto=format&fit=crop',
            brand: 'KitchenAid',
            title: 'Signature Round Dutch Oven Service for 1',
            unitPrice: 700000,
            priority: 'Low' as const,
            status: 'Purchased' as const,
            quantity: 2,
            category: 'Kitchen',
            colors: ['#F4F6F8', '#262626'],
            selectedColor: '#F4F6F8'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1627581786523-286c4f74d027?q=80&w=2576&auto=format&fit=crop',
            brand: 'KitchenAid',
            title: 'Signature Round Dutch Oven Service for 1',
            unitPrice: 700000,
            priority: 'High' as const,
            status: 'Purchased' as const,
            quantity: 1,
            category: 'Dining',
            colors: ['#262626'],
            selectedColor: '#262626'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1583568770732-ddb56247738f?q=80&w=2574&auto=format&fit=crop',
            brand: 'KitchenAid',
            title: 'Signature Round Dutch Oven Service for 1',
            unitPrice: 700000,
            priority: 'Medium' as const,
            status: 'Available' as const,
            quantity: 1,
            category: 'Dining',
            colors: ['#D9D9D9', '#D0771E'],
            selectedColor: '#D9D9D9'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1584269666718-d989f6356eb9?q=80&w=2670&auto=format&fit=crop',
            brand: 'KitchenAid',
            title: 'Signature Round Dutch Oven Service for 1',
            unitPrice: 700000,
            priority: 'High' as const,
            status: 'Available' as const,
            quantity: 1,
            category: 'Bedroom',
            colors: ['#D9D9D9'],
            selectedColor: '#D9D9D9'
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=2609&auto=format&fit=crop',
            brand: 'KitchenAid',
            title: 'Signature Round Dutch Oven Service for 1',
            unitPrice: 700000,
            priority: 'High' as const,
            status: 'Available' as const,
            quantity: 1,
            category: 'Home Decor',
            colors: ['#D9D9D9', '#262626'],
            selectedColor: '#D9D9D9'
        },
    ]);

    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Derived Data
    const filteredItems = giftItems.filter(item => {
        const matchesCategory = activeCategory === 'All Gifts' || item.category === activeCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Mock Data
    const categories = [
        { name: 'All Gifts', count: giftItems.length, icon: 'Grid' },
        { name: 'Dining', count: giftItems.filter(i => i.category === 'Dining').length, icon: 'Utensils' },
        { name: 'Kitchen', count: giftItems.filter(i => i.category === 'Kitchen').length, icon: 'Home' },
        { name: 'Bedroom', count: giftItems.filter(i => i.category === 'Bedroom').length, icon: 'Bed' },
        { name: 'Bath', count: giftItems.filter(i => i.category === 'Bath').length, icon: 'Bath' },
        { name: 'Home Decor', count: giftItems.filter(i => i.category === 'Home Decor').length, icon: 'Home' },
        { name: 'Electronics', count: 0, icon: 'Chip' },
        { name: 'Cash Gifts', count: 0, icon: 'Wallet' },
    ];

    const stats = [
        { label: 'Total Gifts', value: giftItems.length.toLocaleString(), color: 'text-[#D0771E]' },
        { label: 'Total Purchased', value: giftItems.filter(i => i.status === 'Purchased').length.toLocaleString(), color: 'text-[#D0771E]' },
        { label: 'Total Value', value: formatPrice(giftItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0)), color: 'text-[#D0771E]' },
    ];

    const cashFunds = [
        { title: 'Honeymoon Resort', price: '₦700,000.0', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2670&auto=format&fit=crop' },
        { title: 'Vacation Centre', price: '₦700,000.0', image: 'https://images.unsplash.com/photo-1544207936-3b6b1076f272?q=80&w=2672&auto=format&fit=crop' },
        { title: 'Couple Spa Session', price: '₦700,000.0', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af93?q=80&w=2670&auto=format&fit=crop' },
        { title: 'Jetski Rental for Two', price: '₦700,000.0', image: 'https://images.unsplash.com/photo-1627581786523-286c4f74d027?q=80&w=2576&auto=format&fit=crop' },
    ];

    const openSubModal = (type: 'LinkRegistry' | 'ExternalStore' | 'CashFund') => {
        setIsAddGiftModalOpen(false);
        setSubModal(type);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText('https://ariya.com/registry/maria-john');
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus(null), 2000);
    };

    const handleDeleteGift = (id: number) => {
        setGiftItems(prev => prev.filter(item => item.id !== id));
        setSubModal(null);
    };

    const handleUpdateGift = (id: number, updates: any) => {
        setGiftItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
        setSubModal(null);
    };

    const handleAddGift = (newGift: any) => {
        setGiftItems(prev => [...prev, {
            ...newGift,
            id: Date.now(),
            colors: ['#D9D9D9', '#262626'],
            selectedColor: '#D9D9D9'
        }]);
        setSubModal(null);
    };

    const handleAddToCart = (item: any) => {
        addToCart(item);
        setCopyStatus('Added to cart!');
        setTimeout(() => setCopyStatus(null), 2000);
        setSubModal(null);
    };

    return (
        <div className="max-w-[1600px] mx-auto pb-20">
            <div className="w-full px-8">

                {/* Page Header */}
                <PageHeader
                    breadcrumb="Guest Management"
                    title="Registry"
                    subtitle="Curate your perfect gift collection"
                    actions={
                        cart.length > 0 ? (
                            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                                <ShoppingBagIcon className="w-5 h-5 text-[#D0771E]" />
                                <span className="text-sm font-black text-[#262626] uppercase tracking-widest">{cart.length} in Cart</span>
                            </div>
                        ) : undefined
                    }
                />

                {/* Tabs */}
                <PremiumTabs
                    tabs={[
                        { id: 'My Registry', label: 'My Registry' },
                        { id: 'Manage Registry', label: 'Manage Registry' },
                        { id: 'Registry Tracker', label: 'Registry Tracker' },
                        { id: 'Registry Settings', label: 'Registry Settings' }
                    ]}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                        <StatCard
                            key={i}
                            label={stat.label}
                            value={stat.value}
                            icon={<ShoppingBagIcon className="w-5 h-5" />}
                            iconBgColor="bg-orange-50"
                            textColor={stat.color}
                        />
                    ))}
                    {/* Share Registry Card */}
                    <PremiumCard className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-100/50 flex flex-col justify-center h-48">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Share Registry</span>
                            {copyStatus && <span className="text-[9px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">{copyStatus}</span>}
                        </div>
                        <div
                            onClick={handleCopyLink}
                            className="bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg hover:shadow-orange-100/50 transition-all border border-orange-200/30"
                        >
                            <span className="text-xs font-black text-[#D0771E] truncate uppercase tracking-widest">Ariya.com/registry</span>
                            <div className="w-8 h-8 rounded-lg bg-orange-100/50 flex items-center justify-center group-hover:bg-[#D0771E] transition-colors">
                                <LinkIcon className="w-4 h-4 text-[#D0771E] group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </PremiumCard>
                </div>

                {/* Content Tabs */}
                {activeTab === 'My Registry' && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="w-full lg:w-[280px] flex-shrink-0">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-4">Categories</div>
                            <div className="space-y-2">
                                {categories.map((cat, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-xs transition-all duration-300
                                        ${activeCategory === cat.name
                                                ? 'bg-[#D0771E] text-white font-black shadow-xl shadow-orange-100 transform scale-105'
                                                : 'text-gray-500 font-bold hover:bg-white hover:shadow-lg hover:shadow-gray-100 hover:text-gray-900'}
                                    `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 ${activeCategory === cat.name ? 'text-white' : 'text-gray-400'}`}>
                                                {i === 0 && <AdjustmentsHorizontalIcon />}
                                                {i === 1 && <ShoppingBagIcon />}
                                                {i === 2 && <ShoppingBagIcon />}
                                                {i === 3 && <ShoppingBagIcon />}
                                                {i === 4 && <ShoppingBagIcon />}
                                                {i === 5 && <ShoppingBagIcon />}
                                                {i === 6 && <ShoppingBagIcon />}
                                                {i === 7 && <BanknotesIcon />}
                                            </div>
                                            <span className="uppercase tracking-widest">{cat.name}</span>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${activeCategory === cat.name
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-100 text-gray-400'
                                            }`}>{cat.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="flex flex-wrap gap-4 mb-8 items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 flex-1">
                                    <PremiumSearch
                                        placeholder="Search gifts..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full max-w-md"
                                    />
                                    <button className="h-[48px] px-6 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-2 border border-gray-100">
                                        <AdjustmentsHorizontalIcon className="w-4 h-4" />
                                        Filter
                                    </button>
                                </div>
                                <button
                                    onClick={() => setIsAddGiftModalOpen(true)}
                                    className="h-[48px] px-8 bg-[#262626] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-gray-200 flex items-center gap-2 transform active:scale-95"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Add Gift
                                </button>
                            </div>

                            {/* Items */}
                            {filteredItems.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setSubModal('EditGift');
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <RegistryItemCard
                                                {...item}
                                                price={formatPrice(item.unitPrice * item.quantity)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                                    <div className="text-gray-400 mb-2">No gifts found matching your criteria</div>
                                    <button onClick={() => { setSearchQuery(''); setActiveCategory('All Gifts'); }} className="text-[#D0771E] font-bold text-sm">Clear all filters</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Registry Tracker Tab */}
                {activeTab === 'Registry Tracker' && (
                    <div className="space-y-4 w-full">
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <PremiumCard key={i} className="p-6 flex flex-col sm:flex-row sm:items-center gap-6 group hover:border-[#D0771E]/30 transition-all border border-gray-100/50">
                                <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 relative">
                                    <img src="https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop" alt="Gift" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100">
                                                Purchased
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                20 mins ago
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-sm text-gray-900 leading-snug">
                                            Gift received from <span className="font-black text-[#D0771E]">Adewale Adewusi</span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-base">Signature Round Dutch Oven Service for 1</h4>
                                        <div className="text-xs font-bold text-gray-500">₦700,000.0</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
                                    <button className="px-6 py-3 bg-[#262626] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-gray-200">
                                        Send Thank You
                                    </button>
                                </div>
                            </PremiumCard>
                        ))}
                    </div>
                )}

                {/* Registry Settings Tab */}
                {activeTab === 'Registry Settings' && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <PremiumCard className="w-full lg:w-72 flex-shrink-0 h-fit p-4 flex flex-col gap-2 bg-white/50 backdrop-blur-sm border-gray-100">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-2">Registry Settings</div>
                            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs bg-[#FFF8F1] text-[#D0771E] font-black uppercase tracking-widest shadow-sm border border-[#FADEC9]">
                                <TruckIcon className="w-4 h-4" />
                                Shipping Address
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs text-gray-500 hover:text-gray-900 font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                                <BanknotesIcon className="w-4 h-4" />
                                Payment Info
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs text-gray-500 hover:text-gray-900 font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                                <UserGroupIcon className="w-4 h-4" />
                                Add Partner
                            </button>
                        </PremiumCard>

                        <PremiumCard hover={false} className="flex-1 p-10 border-gray-100 shadow-xl shadow-gray-100/50">
                            <div className="mb-8">
                                <h2 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Registry Shipping Address</h2>
                                <p className="text-xs text-gray-500 font-bold max-w-lg">Please provide the address where you'd like your wedding gifts to be shipped. We'll ensure everything arrives safely.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">First Name</label>
                                    <input type="text" placeholder="Enter name" className="w-full rounded-xl border-gray-100 bg-gray-50 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold text-gray-900 py-3.5 px-4 placeholder:font-normal" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">Last Name</label>
                                    <input type="text" placeholder="Enter name" className="w-full rounded-xl border-gray-100 bg-gray-50 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold text-gray-900 py-3.5 px-4 placeholder:font-normal" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">Street Address</label>
                                    <input type="text" placeholder="Enter address" className="w-full rounded-xl border-gray-100 bg-gray-50 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold text-gray-900 py-3.5 px-4 placeholder:font-normal" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">House Number</label>
                                    <input type="text" placeholder="No." className="w-full rounded-xl border-gray-100 bg-gray-50 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold text-gray-900 py-3.5 px-4 placeholder:font-normal" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">Country</label>
                                    <select className="w-full rounded-xl border-gray-100 bg-gray-50 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold text-gray-900 py-3.5 px-4 appearance-none">
                                        <option>Nigeria</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">State</label>
                                    <select className="w-full rounded-xl border-gray-100 bg-gray-50 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold text-gray-900 py-3.5 px-4 appearance-none">
                                        <option>Lagos</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">City</label>
                                    <input type="text" placeholder="Enter City" className="w-full rounded-xl border-gray-100 bg-gray-50 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold text-gray-900 py-3.5 px-4 placeholder:font-normal" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">Zip Code</label>
                                    <input type="text" placeholder="Enter Zip Code" className="w-full rounded-xl border-gray-100 bg-gray-50 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold text-gray-900 py-3.5 px-4 placeholder:font-normal" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">Phone Number</label>
                                    <input type="text" placeholder="Enter Phone Number" className="w-full rounded-xl border-gray-100 bg-gray-50 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-sm font-bold text-gray-900 py-3.5 px-4 placeholder:font-normal" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-gray-50">
                                <button className="px-8 py-4 bg-[#D0771E] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 hover:scale-105 transform active:scale-95">
                                    Save Changes
                                </button>
                            </div>
                        </PremiumCard>
                    </div>
                )}
            </div>

            {/* Edit Gift Modal / Sideover */}
            {subModal === 'EditGift' && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSubModal(null)}></div>

                    {/* Panel */}
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Edit Gift</h2>
                            <button onClick={() => setSubModal(null)} className="text-gray-400 hover:text-gray-500">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="rounded-xl overflow-hidden mb-6 relative group">
                            <img src={selectedItem?.image} alt="Product" className="w-full h-64 object-cover" />
                            <button
                                onClick={() => {
                                    const newUrl = prompt('Enter new image URL:', selectedItem?.image);
                                    if (newUrl) setSelectedItem({ ...selectedItem, image: newUrl });
                                }}
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-bold text-[#D0771E] flex items-center gap-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <PlusIcon className="w-3 h-3" />
                                Edit Image
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="text-xs text-gray-500 font-medium mb-1">{selectedItem?.brand}</div>
                            <div className="font-bold text-gray-900 text-lg mb-2">{selectedItem?.title}</div>
                            <div className="flex items-center gap-2">
                                {selectedItem?.colors?.map((color: string) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedItem({ ...selectedItem, selectedColor: color })}
                                        className={`w-6 h-6 rounded-full border-2 transition-all ${selectedItem.selectedColor === color ? 'border-[#D0771E] scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <div className="text-xl font-bold text-gray-900">{formatPrice(selectedItem?.unitPrice * selectedItem?.quantity)}</div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSelectedItem({ ...selectedItem, quantity: Math.max(1, selectedItem.quantity - 1) })}
                                    className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center font-bold text-lg hover:bg-gray-50 bg-white"
                                >
                                    -
                                </button>
                                <div className="w-12 h-10 border border-gray-200 rounded-lg flex items-center justify-center font-bold text-sm bg-gray-50">
                                    {selectedItem?.quantity}
                                </div>
                                <button
                                    onClick={() => setSelectedItem({ ...selectedItem, quantity: selectedItem.quantity + 1 })}
                                    className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center font-bold text-lg hover:bg-gray-50 bg-white"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => handleDeleteGift(selectedItem?.id)}
                            className="flex items-center gap-2 text-red-500 text-xs font-bold mb-8 hover:text-red-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Remove Gift
                        </button>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-900 mb-2">Gift Status</label>
                                <select
                                    value={selectedItem?.status}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                                    className="w-full rounded-lg border-gray-200 text-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-gray-600 py-3"
                                >
                                    <option value="Purchased">Purchased</option>
                                    <option value="Available">Available</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-900 mb-2">Order Of Importance</label>
                                <select
                                    value={selectedItem?.priority}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, priority: e.target.value })}
                                    className="w-full rounded-lg border-gray-200 text-sm focus:border-[#D0771E] focus:ring-[#D0771E] text-gray-600 py-3"
                                >
                                    <option value="High">HIGH</option>
                                    <option value="Medium">MEDIUM</option>
                                    <option value="Low">LOW</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-900 mb-2">Note To Guests (optional)</label>
                                <input
                                    type="text"
                                    placeholder="Enter Guest Name"
                                    value={selectedItem?.note || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, note: e.target.value })}
                                    className="w-full rounded-lg border-gray-200 text-sm focus:border-[#D0771E] focus:ring-[#D0771E] py-3"
                                />
                            </div>

                            <button
                                onClick={() => handleUpdateGift(selectedItem?.id, {
                                    status: selectedItem.status,
                                    priority: selectedItem.priority,
                                    note: selectedItem.note,
                                    image: selectedItem.image,
                                    quantity: selectedItem.quantity,
                                    selectedColor: selectedItem.selectedColor
                                })}
                                className="w-full bg-[#D0771E] text-white py-3 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors mt-4 shadow-sm shadow-orange-900/20"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => handleAddToCart(selectedItem)}
                                className="w-full bg-white text-[#D0771E] border border-[#D0771E] py-3 rounded-lg font-bold text-sm hover:bg-orange-50 transition-colors mt-2"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Gift Options Modal */}
            {isAddGiftModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                        <button onClick={() => setIsAddGiftModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                            <XMarkIcon className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold text-gray-900 mb-6">Ai Event Planner</h2>

                        <div className="space-y-4">
                            <button onClick={() => openSubModal('LinkRegistry')} className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-[#FFF8F1] hover:border-[#FDE68A] transition-all text-left group">
                                <div className="p-2 bg-orange-100 rounded-lg text-[#D0771E]">
                                    <LinkIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-[#D0771E]">Link Another Registry</div>
                                    <div className="text-xs text-gray-500">Link registry from another website</div>
                                </div>
                            </button>
                            <button onClick={() => openSubModal('ExternalStore')} className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-[#FFF8F1] hover:border-[#FDE68A] transition-all text-left group">
                                <div className="p-2 bg-orange-100 rounded-lg text-[#D0771E]">
                                    <ShoppingBagIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-[#D0771E]">Add From Another Store</div>
                                    <div className="text-xs text-gray-500">Copy and Paste link product link</div>
                                </div>
                            </button>
                            <button onClick={() => openSubModal('CashFund')} className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-[#FFF8F1] hover:border-[#FDE68A] transition-all text-left group">
                                <div className="p-2 bg-orange-100 rounded-lg text-[#D0771E]">
                                    <BanknotesIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-[#D0771E]">Add Cash Gift</div>
                                    <div className="text-xs text-gray-500">Add Cash Gift for anything</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Link Registry Modal Content Panel */}
            {subModal === 'LinkRegistry' && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSubModal(null)}></div>

                    {/* Panel */}
                    <div className="relative w-full max-w-[400px] md:max-w-[480px] bg-white h-full shadow-2xl p-[32px] overflow-y-auto">
                        <div className="flex justify-between items-center mb-[40px]">
                            <h2 className="text-[18px] md:text-[20px] font-bold text-[#262626]">Link Another Registry</h2>
                            <button onClick={() => setSubModal(null)} className="p-1 bg-gray-50 rounded-full text-[#8C8C8C] hover:text-[#262626] transition-colors">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-[24px]">
                            <div>
                                <label className="block text-[14px] font-bold text-[#262626] mb-[8px]">Select Registry</label>
                                <div className="relative">
                                    <select className="w-full bg-white border border-[#F0F0F0] rounded-[8px] px-[16px] py-[14px] text-[14px] text-[#262626] appearance-none focus:outline-none focus:ring-1 focus:ring-[#D0771E] focus:border-[#D0771E]">
                                        <option>Wedding</option>
                                        <option>Baby Shower</option>
                                        <option>Birthday</option>
                                    </select>
                                    <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none text-[#8C8C8C]">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[14px] font-bold text-[#262626] mb-[8px]">Enter Registry Link</label>
                                <input
                                    type="text"
                                    placeholder="1,500"
                                    className="w-full bg-white border border-[#F0F0F0] rounded-[8px] px-[16px] py-[14px] text-[14px] text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#D0771E] focus:border-[#D0771E] placeholder-[#BFBFBF]"
                                />
                            </div>

                            <div className="pt-[16px]">
                                <button
                                    onClick={() => handleAddGift({
                                        brand: 'External',
                                        title: 'Linked Registry Item',
                                        unitPrice: 250000,
                                        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2670&auto=format&fit=crop',
                                        priority: 'Medium',
                                        status: 'Available',
                                        quantity: 1,
                                        category: 'All Gifts'
                                    })}
                                    className="w-full bg-[#D0771E] text-white py-[16px] rounded-[8px] font-bold text-[14px] hover:bg-[#b06519] transition-all shadow-sm active:scale-[0.98]"
                                >
                                    Add Registry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* External Store Modal Content Panel */}
            {subModal === 'ExternalStore' && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSubModal(null)}></div>

                    {/* Panel */}
                    <div className="relative w-full max-w-[400px] md:max-w-[480px] bg-white h-full shadow-2xl p-[32px] overflow-y-auto">
                        <div className="flex justify-between items-center mb-[40px]">
                            <h2 className="text-[18px] md:text-[20px] font-bold text-[#262626]">From Another Store</h2>
                            <button onClick={() => setSubModal(null)} className="p-1 bg-gray-50 rounded-full text-[#8C8C8C] hover:text-[#262626] transition-colors">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-[24px]">
                            <div>
                                <label className="block text-[14px] font-bold text-[#262626] mb-[8px]">Enter Gift URL</label>
                                <input
                                    type="text"
                                    placeholder="1,500"
                                    className="w-full bg-white border border-[#F0F0F0] rounded-[8px] px-[16px] py-[14px] text-[14px] text-[#262626] focus:outline-none focus:ring-1 focus:ring-[#D0771E] focus:border-[#D0771E] placeholder-[#BFBFBF]"
                                />
                            </div>

                            <div className="pt-[16px]">
                                <button
                                    onClick={() => handleAddGift({
                                        brand: 'Custom Store',
                                        title: 'New Product Item',
                                        unitPrice: 150000,
                                        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2670&auto=format&fit=crop',
                                        priority: 'Low',
                                        status: 'Available',
                                        quantity: 1,
                                        category: 'All Gifts'
                                    })}
                                    className="w-full bg-[#D0771E] text-white py-[16px] rounded-[8px] font-bold text-[14px] hover:bg-[#b06519] transition-all shadow-sm active:scale-[0.98]"
                                >
                                    Add Gift
                                </button>
                            </div>

                            <p className="text-[12px] text-[#8C8C8C] font-normal leading-relaxed text-center px-4">
                                Find the gift, then copy and paste the URL below to add straight to your Ariya registry.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Cash Fund Modal Content Panel */}
            {subModal === 'CashFund' && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSubModal(null)}></div>

                    {/* Panel */}
                    <div className="relative w-full max-w-[1200px] bg-white h-full shadow-2xl p-[32px] overflow-y-auto">
                        <div className="flex justify-between items-center mb-[40px]">
                            <h2 className="text-[20px] font-bold text-[#262626]">Cash Fund</h2>
                            <button onClick={() => setSubModal(null)} className="p-1 bg-gray-50 rounded-full text-[#8C8C8C] hover:text-[#262626] transition-colors">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="text-center mb-[48px]">
                            <h3 className="text-[16px] md:text-[18px] font-bold text-[#262626] uppercase mb-[8px]">HONEYMOON AND CASH FUNDS</h3>
                            <p className="text-[14px] text-[#8C8C8C] max-w-[600px] mx-auto leading-relaxed">
                                Create a cash fund for anything and any amount. We make it easy with direct deposit
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[24px]">
                            {/* Create Custom */}
                            <button className="bg-[#F9F9F9] rounded-[8px] aspect-square flex flex-col items-center justify-center border-none hover:bg-orange-50 transition-all group">
                                <div className="w-[48px] h-[48px] rounded-full bg-[#262626] flex items-center justify-center text-white mb-[12px] group-hover:bg-[#D0771E] transition-colors">
                                    <PlusIcon className="w-6 h-6" />
                                </div>
                                <span className="text-[12px] font-bold text-[#262626] px-4 text-center">Create your own cash fund</span>
                            </button>

                            {/* Fund Options (Mocking data to match the screenshot's density) */}
                            {[...cashFunds, ...cashFunds, ...cashFunds, ...cashFunds, ...cashFunds].map((fund, i) => (
                                <div key={i} className="flex flex-col group cursor-pointer">
                                    <div className="aspect-square rounded-[8px] overflow-hidden mb-[12px] relative bg-gray-100">
                                        <img src={fund.image} alt={fund.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="text-[10px] text-[#8C8C8C] font-semibold mb-[4px] uppercase tracking-wide">Cash Fund</div>
                                    <div className="text-[12px] font-bold text-[#262626] mb-[2px]">{fund.title}</div>
                                    <div className="text-[12px] font-bold text-[#262626]">{fund.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Registry;
