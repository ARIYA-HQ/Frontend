import { useState } from 'react';
import { mockBookings, mockReviews, Booking, Review } from '../../../data/mockData';
import BookingDetails from '../../../components/dashboard/vendor/BookingDetails';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ShieldCheckIcon,
  StarIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumTabs from '../../../components/ui/PremiumTabs';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState('Confirmed Bookings');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Confirmed Bookings', 'Pending Bookings', 'Completed Bookings', 'Reviews'];

  const bookingStats = [
    { label: 'This Month Revenue', value: '₦45,000,000', icon: BanknotesIcon },
    { label: 'Total Bookings', value: '1,200', icon: CalendarDaysIcon },
    { label: 'Confirmed Events', value: '1,200', icon: CheckCircleIcon },
    { label: 'Pending Contracts', value: '1,200', icon: DocumentTextIcon }
  ];

  const reviewStats = [
    { label: 'Average Rating', value: '4.8', icon: StarIcon },
    { label: 'Total Reviews', value: '1,200', icon: ChatBubbleLeftIcon },
    { label: 'Pending Responses', value: '1,200', icon: ArrowPathIcon },
    { label: 'Response Rate', value: '95%', icon: CheckCircleIcon }
  ];

  const bookings = mockBookings.filter(b => {
    const clientName = b.clientName || '';
    const eventName = b.eventName || '';
    const matchesSearch = clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eventName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'Confirmed Bookings') return b.status === 'booked';
    if (activeTab === 'Pending Bookings') return b.status === 'quoted' || b.status === 'inquiry';
    if (activeTab === 'Completed Bookings') return b.status === 'completed';
    return false;
  });

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col">
      <PageHeader
        breadcrumb="Dashboard > Operations"
        title="Operations"
        subtitle="Manage your bookings, quotes, and customer reviews"
      />

      <div className="mt-8">
        <PremiumTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setSearchQuery('');
          }}
        />
      </div>

      <div className="mt-10 space-y-10">
        {activeTab === 'Reviews' ? (
          /* REVIEWS VIEW */
          <>
            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviewStats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  icon={<stat.icon className="w-5 h-5" />}
                />
              ))}
            </div>

            {/* Search & Filter */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 max-w-md relative group">
                <input
                  type="text"
                  placeholder="Search Reviews"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-[20px] text-[10px] font-black uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-[#D0771E] transition-all outline-none"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D0771E] transition-colors" />
              </div>
              <Button variant="outline" className="px-8 h-12 rounded-[20px]">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 gap-6">
              {mockReviews.map((review: Review) => (
                <PremiumCard key={review.id} className="p-0 overflow-hidden group">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-[#1D2939] rounded-[20px] flex items-center justify-center text-white text-lg font-black uppercase tracking-tighter">
                          {review.clientName.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-black text-[#1D2939] uppercase tracking-tight group-hover:text-[#D0771E] transition-colors">{review.clientName}</h3>
                          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                            <span className="text-[#D0771E]">Wedding</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>June 15, 2024</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full">
                        2 days ago
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-[#D0771E]' : 'text-gray-100'}`} />
                      ))}
                    </div>

                    <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-4xl mb-8 italic">
                      "{review.comment}"
                    </p>

                    <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                      <div className="flex gap-3">
                        <Button variant="outline" className="px-6 h-10 rounded-full text-[9px]">Respond</Button>
                        <Button variant="ghost" className="px-6 h-10 rounded-full text-[9px]">View Event</Button>
                      </div>
                      {review.response ? (
                        <span className="text-[9px] font-black text-green-500 bg-green-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-green-100">Responded</span>
                      ) : (
                        <span className="text-[9px] font-black text-[#D0771E] bg-orange-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-orange-100">Pending Response</span>
                      )}
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </>
        ) : (
          /* BOOKINGS VIEW */
          <>
            {/* Booking Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bookingStats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  icon={<stat.icon className="w-5 h-5" />}
                />
              ))}
            </div>

            {/* Search & Actions */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-4 flex-1">
                <div className="flex-1 max-w-sm relative group">
                  <input
                    type="text"
                    placeholder="Search Quotes"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-[20px] text-[10px] font-black uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-[#D0771E] transition-all outline-none"
                  />
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D0771E] transition-colors" />
                </div>
                <Button variant="outline" className="px-8 h-12 rounded-[20px]">
                  <FunnelIcon className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button className="px-10 h-12 rounded-[20px] shadow-2xl shadow-orange-200">
                <PlusIcon className="w-5 h-5 mr-2" />
                Create New Quote
              </Button>
            </div>

            {/* Bookings List */}
            <div className="grid grid-cols-1 gap-6">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <PremiumCard
                    key={booking.id}
                    onClick={() => handleBookingClick(booking)}
                    className="p-0 overflow-hidden cursor-pointer group hover:border-[#D0771E] transition-all"
                  >
                    <div className="p-8 relative">
                      {/* Status Badge - Top Right */}
                      <div className="absolute top-8 right-8">
                        <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.status === 'booked' ? 'bg-green-50 text-green-600 border-green-100' :
                          booking.status === 'completed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            'bg-orange-50 text-orange-600 border-orange-100'
                          }`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="flex flex-col gap-8">
                        {/* Identity Section */}
                        <div className="space-y-2">
                          <h3 className="text-xl font-black text-[#1D2939] uppercase tracking-tight group-hover:text-[#D0771E] transition-colors">
                            {booking.eventName}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <span>{booking.clientName}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                            <span className="text-[#D0771E]">{booking.serviceType}</span>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-6 bg-gray-50 rounded-[24px]">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Event Date</p>
                            <p className="text-[11px] font-black text-[#1D2939] uppercase tracking-tight">{booking.eventDate}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Budget</p>
                            <p className="text-xs font-black text-[#D0771E]">{booking.amount ? `₦${booking.amount.toLocaleString()}` : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Reference</p>
                            <p className="text-[11px] font-black text-[#1D2939] uppercase tracking-tight">#BK-{booking.id.slice(0, 8).toUpperCase()}</p>
                          </div>
                        </div>

                        {booking.status === 'booked' && (
                          <div className="flex items-center gap-3 px-6 py-3 bg-green-50 rounded-2xl border border-green-100 w-fit">
                            <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                            <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em]">Funds Secured in Escrow</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumCard>
                ))
              ) : (
                <div className="py-24 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <MagnifyingGlassIcon className="w-8 h-8 text-gray-200" />
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">No bookings found in this category</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <BookingDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default VendorBookings;