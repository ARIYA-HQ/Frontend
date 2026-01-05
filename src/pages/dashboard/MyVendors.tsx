import { useState } from 'react';
import {
    BuildingStorefrontIcon,
    ChatBubbleLeftEllipsisIcon,
    CheckCircleIcon,
    CreditCardIcon,
    EyeIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';
import { mockBookings, mockVendors } from '../../data/mockData';
import BookingPaymentModal from '../../components/dashboard/planner/BookingPaymentModal';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';
import { PremiumSearch } from '../../components/ui/PremiumInput';

const MyVendors = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'booked'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [localBookings, setLocalBookings] = useState(mockBookings);

    const tabs = [
        { id: 'all', label: 'All Vendors' },
        { id: 'pending', label: 'Pending Quotes' },
        { id: 'booked', label: 'Booked' }
    ];

    const bookings = localBookings.filter(b => {
        const vendor = mockVendors.find(v => v.id === b.vendorId);
        const searchMatch = (vendor?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (b.serviceType || '').toLowerCase().includes(searchQuery.toLowerCase());

        if (!searchMatch) return false;
        if (activeTab === 'pending') return b.status === 'quoted' || b.status === 'inquiry';
        if (activeTab === 'booked') return b.status === 'booked' || b.status === 'completed';
        return true;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'booked': return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800';
            case 'quoted': return 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-800';
            case 'inquiry': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800';
            case 'completed': return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-800';
            default: return 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-600';
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto pb-20">
            <PageHeader
                breadcrumb="My Vendors"
                title="My Vendors"
                subtitle="Manage your vendor relationships and payments"
            />

            {/* Tabs & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 dark:border-gray-700 pb-px">
                <PremiumTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={(id) => setActiveTab(id as any)}
                    className="border-none"
                />

                <div className="flex items-center gap-3 pb-4">
                    <PremiumSearch
                        placeholder="Search vendors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64"
                    />
                    <button className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-xl border border-gray-100 dark:border-gray-700 transition-all">
                        <FunnelIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Vendor List */}
            <div className="grid grid-cols-1 gap-6">
                {bookings.length > 0 ? (
                    bookings.map((booking) => {
                        const vendor = mockVendors.find(v => v.id === booking.vendorId);
                        return (
                            <PremiumCard key={booking.id} hover={true}>
                                <div className="p-8 flex flex-col lg:flex-row lg:items-center gap-8">
                                    {/* Vendor Info */}
                                    <div className="flex-1 flex gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                                            <BuildingStorefrontIcon className="w-8 h-8 text-[#D0771E]" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">{vendor?.name}</h3>
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <p className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">{booking.serviceType}</p>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1.5">
                                                    <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                                    Last interaction: {booking.inquiryDate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Financials */}
                                    <div className="flex flex-col lg:items-end gap-2 lg:px-12 lg:border-l lg:border-r lg:border-gray-50 dark:border-gray-700">
                                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest">Total Quote</p>
                                        <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                                            {booking.amount ? `₦${booking.amount.toLocaleString()}` : 'Pending Quote'}
                                        </div>
                                        {booking.status === 'booked' && (
                                            <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-[10px] font-black uppercase">
                                                <CheckCircleIcon className="w-4 h-4" />
                                                Funds in Escrow
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3">
                                        <button className="flex-1 lg:flex-none px-6 py-4 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                                            <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
                                            Message
                                        </button>
                                        {booking.status === 'quoted' ? (
                                            <button
                                                onClick={() => {
                                                    setSelectedBooking(booking);
                                                    setIsPaymentModalOpen(true);
                                                }}
                                                className="flex-1 lg:flex-none px-8 py-4 bg-[#D0771E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg dark:shadow-none flex items-center justify-center gap-2 transform active:scale-95"
                                            >
                                                <CreditCardIcon className="w-4 h-4" />
                                                Accept & Pay
                                            </button>
                                        ) : (
                                            <button className="flex-1 lg:flex-none px-6 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                                                <EyeIcon className="w-4 h-4" />
                                                View Details
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </PremiumCard>
                        );
                    })
                ) : (
                    <div className="py-32 text-center bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
                        <BuildingStorefrontIcon className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">No vendors found</h3>
                        <p className="text-sm text-gray-500 font-medium max-w-sm mx-auto mt-2">Start your search in the marketplace to find the perfect vendors for your event.</p>
                        <button className="mt-8 px-10 py-4 bg-[#D0771E] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-100">
                            Browse Marketplace
                        </button>
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            <BookingPaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                booking={selectedBooking}
                onSuccess={() => {
                    setLocalBookings(prev => prev.map(b =>
                        b.id === selectedBooking.id ? { ...b, status: 'booked' } : b
                    ));
                    setTimeout(() => setIsPaymentModalOpen(false), 2000);
                }}
            />
        </div>
    );
};

export default MyVendors;
