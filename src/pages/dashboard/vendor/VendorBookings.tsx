import { useState } from 'react';
import type { Booking, Review } from '../../../data/mockData';
import { mockBookings, mockReviews } from '../../../data/mockData';
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
  CheckCircleIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumTabs from '../../../components/ui/PremiumTabs';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';
import CreateQuoteModal from '../../../components/vendors/CreateQuoteModal';
import ReviewResponseModal from '../../../components/vendors/ReviewResponseModal';

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState('Confirmed Bookings');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const tabs = [
    { id: 'Confirmed Bookings', label: 'Confirmed Bookings' },
    { id: 'Pending Bookings', label: 'Pending Bookings' },
    { id: 'Completed Bookings', label: 'Completed Bookings' },
    { id: 'Reviews', label: 'Reviews' }
  ];

  const bookingStats = [
    { label: 'This Month Revenue', value: '₦45,000,000', icon: BanknotesIcon, bgColor: 'bg-[#1D2939]' },
    { label: 'Total Bookings', value: '1,200', icon: CalendarDaysIcon, bgColor: 'bg-[#D0771E]' },
    { label: 'Confirmed Events', value: '1,200', icon: CheckCircleIcon, bgColor: 'bg-green-600' },
    { label: 'Pending Contracts', value: '1,200', icon: DocumentTextIcon, bgColor: 'bg-orange-500' }
  ];

  const reviewStats = [
    { label: 'Average Rating', value: '4.8', icon: StarIcon, bgColor: 'bg-[#D0771E]' },
    { label: 'Total Reviews', value: '1,200', icon: ChatBubbleLeftIcon, bgColor: 'bg-[#1D2939]' },
    { label: 'Pending Responses', value: '1,200', icon: ArrowPathIcon, bgColor: 'bg-orange-500' },
    { label: 'Response Rate', value: '95%', icon: CheckCircleIcon, bgColor: 'bg-green-600' }
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

  const handleRespondClick = (review: any) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10">
      <PageHeader
        breadcrumb="Operations"
        title="Operations"
        subtitle="Manage your bookings, quotes, and customer reviews"
      />

      <div className="border-b border-gray-100 dark:border-gray-800 pb-2">
        <PremiumTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setSearchQuery('');
          }}
        />
      </div>

      <div className="space-y-10">
        {activeTab === 'Reviews' ? (
          /* REVIEWS VIEW */
          <div className="animate-fade-in space-y-10">
            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviewStats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  icon={<stat.icon className="w-5 h-5" />}
                  iconBgColor={stat.bgColor}
                  textColor="text-gray-900 dark:text-white"
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
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-[20px] text-[10px] font-black uppercase tracking-widest focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-50 dark:focus:ring-orange-900/10 focus:border-[#D0771E] dark:text-white transition-all outline-none"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D0771E] transition-colors" />
              </div>
              <Button variant="outline" className="px-8 h-12 rounded-[20px] border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 gap-6">
              {mockReviews.map((review: Review) => (
                <PremiumCard key={review.id} className="p-0 overflow-hidden group border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-[#1D2939] dark:bg-gray-800 rounded-[20px] flex items-center justify-center text-white text-lg font-black uppercase tracking-tighter">
                          {review.clientName.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-tight group-hover:text-[#D0771E] transition-colors">{review.clientName}</h3>
                          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                            <span className="text-[#D0771E]">Wedding</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                            <span>June 15, 2024</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full">
                        2 days ago
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-[#D0771E]' : 'text-gray-100 dark:text-gray-700'}`} />
                      ))}
                    </div>

                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-4xl mb-8 italic">
                      "{review.comment}"
                    </p>

                    <div className="flex items-center justify-between pt-8 border-t border-gray-50 dark:border-gray-800">
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => handleRespondClick(review)}
                          className="px-6 h-10 rounded-full text-[9px] border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          Respond
                        </Button>
                        <Button
                          variant="ghost"
                          className="px-6 h-10 rounded-full text-[9px] text-gray-500 dark:text-gray-400 hover:text-[#1D2939] dark:hover:text-white"
                        >
                          View Event
                        </Button>
                      </div>
                      {review.response ? (
                        <span className="text-[9px] font-black text-green-500 bg-green-50 dark:bg-green-900/20 px-4 py-1.5 rounded-full uppercase tracking-widest border border-green-100 dark:border-green-800">Responded</span>
                      ) : (
                        <span className="text-[9px] font-black text-[#D0771E] bg-orange-50 dark:bg-orange-900/20 px-4 py-1.5 rounded-full uppercase tracking-widest border border-orange-100 dark:border-orange-800">Pending Response</span>
                      )}
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        ) : (
          /* BOOKINGS VIEW */
          <div className="animate-fade-in space-y-10">
            {/* Booking Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bookingStats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  icon={<stat.icon className="w-5 h-5" />}
                  iconBgColor={stat.bgColor}
                  textColor="text-gray-900 dark:text-white"
                />
              ))}
            </div>

            {/* Search, Filter & View Toggle */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-4 flex-1">
                <div className="flex-1 max-w-sm relative group">
                  <input
                    type="text"
                    placeholder="Search Quotes"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-[20px] text-[10px] font-black uppercase tracking-widest focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-50 dark:focus:ring-orange-900/10 focus:border-[#D0771E] dark:text-white transition-all outline-none"
                  />
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D0771E] transition-colors" />
                </div>
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-[#D0771E] shadow-sm dark:shadow-none' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Squares2X2Icon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-[#D0771E] shadow-sm dark:shadow-none' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <ListBulletIcon className="w-4 h-4" />
                  </button>
                </div>
                <Button variant="outline" className="px-8 h-12 rounded-[20px] border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  <FunnelIcon className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-10 h-12 rounded-[20px] shadow-2xl shadow-orange-200 dark:shadow-none bg-[#D0771E] text-white"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                New Quote
              </Button>
            </div>

            {/* Bookings List */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1' : 'grid-cols-1'}`}>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <PremiumCard
                    key={booking.id}
                    onClick={() => handleBookingClick(booking)}
                    className={`${viewMode === 'grid' ? 'p-6' : 'p-4'} overflow-hidden cursor-pointer group hover:border-[#D0771E] transition-all border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900`}
                  >
                    {viewMode === 'grid' ? (
                      <div className="relative">
                        {/* Status Badge - Top Right */}
                        <div className="absolute top-0 right-0">
                          <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${booking.status === 'booked' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800' :
                            booking.status === 'completed' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800' :
                              'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-800'
                            }`}>
                            {booking.status}
                          </span>
                        </div>

                        <div className="flex flex-col gap-6">
                          {/* Identity Section */}
                          <div className="space-y-1">
                            <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight group-hover:text-[#D0771E] transition-colors">
                              {booking.eventName}
                            </h3>
                            <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                              <span>{booking.clientName}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700"></span>
                              <span className="text-[#D0771E]">{booking.serviceType}</span>
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <div>
                              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Event Date</p>
                              <p className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-tight">{booking.eventDate}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Budget</p>
                              <p className="text-sm font-black text-[#D0771E]">{booking.amount ? `₦${booking.amount.toLocaleString()}` : 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Reference</p>
                              <p className="text-sm font-black text-[#1D2939] dark:text-white uppercase tracking-tight">#BK-{booking.id.slice(0, 8).toUpperCase()}</p>
                            </div>
                          </div>

                          {booking.status === 'booked' && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 w-fit">
                              <ShieldCheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                              <span className="text-[9px] font-black text-green-700 dark:text-green-300 uppercase tracking-[0.2em]">Funds Secured</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* List View Layout */
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6 flex-1 min-w-0">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${booking.status === 'booked' ? 'bg-green-500' : 'bg-[#D0771E]'}`}></div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xs font-black text-[#1D2939] dark:text-white truncate uppercase tracking-tight">
                              {booking.eventName}
                            </h3>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate">{booking.clientName} • {booking.eventDate}</p>
                          </div>
                          <div className="hidden lg:block w-32 shrink-0">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Budget</p>
                            <p className="text-[10px] font-black text-[#1D2939] dark:text-white">{booking.amount ? `₦${booking.amount.toLocaleString()}` : 'N/A'}</p>
                          </div>
                          <div className="hidden xl:block flex-1 min-w-0 max-w-xs">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Service</p>
                            <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 truncate uppercase">{booking.serviceType}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm dark:shadow-none ${booking.status === 'booked' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800' :
                              booking.status === 'completed' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800' :
                                'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-100 dark:border-orange-800'
                              }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            variant="outline"
                            className="h-8 w-8 p-0 rounded-lg border-gray-100 dark:border-gray-700 text-gray-400 hover:text-[#D0771E]"
                          >
                            <ChatBubbleLeftIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            className="h-8 px-4 rounded-lg bg-[#1D2939] dark:bg-gray-700 text-white text-[8px] font-black uppercase tracking-widest hover:bg-black"
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    )}
                  </PremiumCard>
                ))
              ) : (
                <div className="py-24 text-center bg-gray-50 dark:bg-gray-800 rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-700">
                  <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm dark:shadow-none">
                    <MagnifyingGlassIcon className="w-8 h-8 text-gray-200 dark:text-gray-500" />
                  </div>
                  <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">No bookings found in this category</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <BookingDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        booking={selectedBooking}
      />

      <CreateQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <ReviewResponseModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        review={selectedReview}
      />
    </div >
  );
};

export default VendorBookings;