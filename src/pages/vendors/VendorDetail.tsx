import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronRightIcon,
  StarIcon,
  MapPinIcon,
  CheckBadgeIcon,
  ShareIcon
} from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import GetQuoteModal from '../../components/vendors/GetQuoteModal';
import { MOCK_VENDORS } from '../../data/mockVendors';
import PageHeader from '../../components/ui/PageHeader';
import PremiumTabs from '../../components/ui/PremiumTabs';
import PremiumCard from '../../components/ui/PremiumCard';
import { DemoDataService } from '../../services/DemoDataService';

const VendorDetail = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Find vendor from mock data
  const currentVendor = MOCK_VENDORS.find(v => v.id === Number(vendorId));

  // Default fallback if not found (or loading state could go here)
  if (!currentVendor) {
    return <div className="min-h-screen flex items-center justify-center">Vendor not found</div>;
  }

  // Merge dynamic data with static template for rich details
  const vendor = {
    ...currentVendor,
    priceStart: currentVendor.price, // Map price to priceStart
    description: "The Sunset Strings Quartet provides elegant live music for weddings, corporate events, and private parties. Our repertoire spans from classical favorites to modern pop arrangements, ensuring a perfect atmosphere for your special day.",
    services: [
      { name: "Ceremony Performance", price: "₦250,000" },
      { name: "Cocktail Hour", price: "₦200,000" },
      { name: "Reception Package (3 Hours)", price: "₦700,000" }
    ],
    // Use the vendor's main image plus some generic ones for the gallery
    images: [
      currentVendor.image,
      "https://images.unsplash.com/photo-1516280440614-6697288d5d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514525253440-b39345208668?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  };

  const handleMessageVendor = () => {
    DemoDataService.createConversation(vendor.name, `Hi ${vendor.name}, I'm interested in your services for my event.`);
    navigate('/messages');
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-20">
      <div className="w-full px-8">

        {/* Page Header */}
        <PageHeader
          breadcrumb="Vendors"
          title={vendor.name}
          subtitle="Details and booking information"
          actions={
            <div className="flex items-center gap-3">
              <button className="h-[48px] px-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
                <ShareIcon className="w-4 h-4" />
                Share
              </button>
              <button className="h-[48px] px-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
                <HeartOutline className="w-4 h-4" />
                Save
              </button>
            </div>
          }
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-80 md:h-[400px] mb-10">
          <div className="md:col-span-2 relative h-full rounded-3xl overflow-hidden shadow-sm dark:shadow-none group">
            <img src={vendor.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-400 flex items-center shadow-lg dark:shadow-none transform group-hover:scale-105 transition-all">
              <span className="w-2 h-2 rounded-full bg-green-500/80 dark:bg-green-400 mr-2 animate-pulse"></span>
              Available
            </div>
          </div>
          <div className="flex flex-col gap-4 h-full">
            <div className="relative h-1/2 rounded-3xl overflow-hidden shadow-sm dark:shadow-none group">
              <img src={vendor.images[1]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="relative h-1/2 rounded-3xl overflow-hidden shadow-sm dark:shadow-none group cursor-pointer">
              <img src={vendor.images[2]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center hover:bg-black/50 dark:hover:bg-black/70 transition-colors">
                <span className="text-white font-black uppercase tracking-widest text-xs border border-white/30 dark:border-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">+5 Photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column: Vendor Info */}
          <div className="flex-1 space-y-8">

            {/* Header Info */}
            <PremiumCard className="p-8">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-[#D0771E] border border-orange-100 dark:border-orange-800 rounded-lg text-[9px] font-black uppercase tracking-widest">Musicians</span>
                    <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-600 rounded-lg text-[9px] font-black uppercase tracking-widest">Strings</span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-[#D0771E]" />
                      <span className="font-bold text-gray-700 dark:text-white">{vendor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-md border border-yellow-100 dark:border-yellow-800">
                        <StarIcon className="w-3.5 h-3.5 text-[#E8B716]" />
                        <span className="font-black text-[#E8B716] text-xs">{vendor.rating}</span>
                      </div>
                      <span className="font-medium text-gray-400 dark:text-gray-400">({vendor.reviews} Reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </PremiumCard>

            {/* Tabs & Content */}
            <div className="space-y-6">
              <PremiumTabs
                tabs={[
                  { id: 'Overview', label: 'Overview' },
                  { id: 'Services', label: 'Services' },
                  { id: 'Reviews', label: 'Reviews' },
                  { id: 'Gallery', label: 'Gallery' },
                  { id: 'Availability', label: 'Availability' }
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />

              <PremiumCard className="p-8 min-h-[400px]">
                {/* OVERVIEW TAB */}
                {activeTab === 'Overview' && (
                  <div className="space-y-10">
                    {/* About */}
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4">About the Vendor</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        Elegant Events Co. is Jakarta's premier event planning company with over 10 years of experience creating extraordinary celebrations. We specialize in luxury weddings, corporate events, and milestone celebrations that reflect our clients' unique vision and style. Our dedicated team of creative professionals works closely with you from concept to completion, ensuring every detail is perfectly executed.
                      </p>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Wedding', 'Corporate Events', 'Conferences', 'Birthday Parties', 'Product Launch'].map((item) => (
                          <span key={item} className="px-4 py-2 bg-[#FDF2E9] dark:bg-orange-900/20 text-[#D0771E] rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#FADEC9] dark:border-orange-800/30">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Facts */}
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-6">Quick Facts</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <div className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-3">
                          <span className="text-xs font-bold text-gray-400 dark:text-gray-400">Established</span>
                          <span className="font-black text-gray-900 dark:text-white text-sm">2013</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-3">
                          <span className="text-xs font-bold text-gray-400 dark:text-gray-400">Team Size</span>
                          <span className="font-black text-gray-900 dark:text-white text-sm">15 - 20</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-3">
                          <span className="text-xs font-bold text-gray-400 dark:text-gray-400">Events Completed</span>
                          <span className="font-black text-gray-900 dark:text-white text-sm">500+</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-3">
                          <span className="text-xs font-bold text-gray-400 dark:text-gray-400">Response Time</span>
                          <span className="font-black text-gray-900 dark:text-white text-sm">2hrs</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 dark:border-gray-700 pb-3 md:col-span-2">
                          <span className="text-xs font-bold text-gray-400 dark:text-gray-400">Languages</span>
                          <span className="font-black text-gray-900 dark:text-white text-sm">English, Yoruba, French</span>
                        </div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4">Certifications</h3>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3 p-4 border border-gray-50 dark:border-gray-700 rounded-2xl hover:border-gray-100 dark:hover:border-gray-600 transition-colors">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#D0771E]">
                            <CheckBadgeIcon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Certified Event Planning Professional (CEPP)</span>
                        </li>
                        <li className="flex items-center gap-3 p-4 border border-gray-50 dark:border-gray-700 rounded-2xl hover:border-gray-100 dark:hover:border-gray-600 transition-colors">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#D0771E]">
                            <CheckBadgeIcon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">International Association of Event Planners Member</span>
                        </li>
                        <li className="flex items-center gap-3 p-4 border border-gray-50 dark:border-gray-700 rounded-2xl hover:border-gray-100 dark:hover:border-gray-600 transition-colors">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#D0771E]">
                            <CheckBadgeIcon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Jakarta Tourism Board Certified</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* SERVICES TAB */}
                {activeTab === 'Services' && (
                  <div className="space-y-10">
                    {/* Services Offered */}
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4">Services Offered</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                        {[
                          'Full Event Planning', 'Venue Selection', 'Vendor Coordination', 'Timeline Management',
                          'Day-of Coordination', 'Decor & Styling', 'Catering Management',
                          'Photography Coordination', 'Entertainment Booking', 'Transportation'
                        ].map((service) => (
                          <div key={service} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-[#D0771E] transition-colors"></span>
                            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Packages & Pricing */}
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-6">Packages & Pricing</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Basic Package */}
                        <div className="border border-gray-100 bg-white rounded-3xl p-6 hover:shadow-xl hover:shadow-gray-100 transition-all flex flex-col h-full">
                          <div className="mb-4">
                            <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Basic Package</h4>
                            <div className="text-2xl font-black text-[#D0771E] mt-2 tracking-tight">₦600,000</div>
                          </div>
                          <p className="text-xs text-gray-500 font-medium mb-6">Basic plan for up to 100 guests including essential coordination.</p>
                          <div className="space-y-3 mb-6 flex-1">
                            {['Initial consultation', 'Venue selection', 'Basic vendor coordination', 'Timeline creation'].map((feat, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                <CheckBadgeIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {feat}
                              </div>
                            ))}
                          </div>
                          <button className="w-full py-3 bg-gray-50 text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">View Details</button>
                        </div>

                        {/* Premium Package */}
                        <div className="border border-orange-200 bg-gradient-to-b from-[#FFF8F3] to-white rounded-3xl p-6 relative shadow-lg shadow-orange-100/50 flex flex-col h-full">
                          <div className="absolute -top-3 left-6 bg-[#262626] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">Most Popular</div>
                          <div className="mb-4 mt-2">
                            <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Premium Package</h4>
                            <div className="text-2xl font-black text-[#D0771E] mt-2 tracking-tight">₦800,000</div>
                          </div>
                          <p className="text-xs text-gray-500 font-medium mb-6">Comprehensive plan for up to 300 guests with full service.</p>
                          <div className="space-y-3 mb-6 flex-1">
                            {['All Basic features', 'Full vendor coordination', 'Unlimited support', 'Day-of coordination (12h)', 'Decor consultation'].map((feat, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                <CheckBadgeIcon className="w-4 h-4 text-[#D0771E] flex-shrink-0" />
                                {feat}
                              </div>
                            ))}
                          </div>
                          <button className="w-full py-3 bg-[#D0771E] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200/50">Select Package</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* REVIEWS TAB - Styled */}
                {activeTab === 'Reviews' && (
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Customer Reviews</h3>
                      <button className="text-[#D0771E] dark:text-orange-300 text-xs font-black uppercase tracking-widest hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D0771E] focus-visible:ring-offset-gray-900 rounded">
                        Write a review
                      </button>
                    </div>
                    <div className="space-y-8">
                      {[
                        { name: "Peace & Michael", type: "Wedding", time: "2 weeks ago", text: "Elegant Events made our dream wedding come true! Their attention to detail and professionalism was outstanding.", rating: 5 },
                        { name: "Credbevy Tech", type: "Corporate", time: "1 month ago", text: "Exceptional service for our annual company gala. The team was professional, creative, and delivered beyond expectations.", rating: 5 },
                        { name: "Lisa Chen", type: "Birthday", time: "2 months ago", text: "Great coordination despite the short notice. The team handled everything flawlessly.", rating: 4 },
                      ].map((review, idx) => (
                        <div key={idx} className="border-b border-gray-50 dark:border-gray-800 pb-8 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-black text-gray-500 dark:text-gray-300">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-black text-sm text-gray-900 dark:text-white">{review.name}</h4>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide font-bold">
                                  <span>{review.type}</span>
                                  <span>•</span>
                                  <span>{review.time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'text-[#E8B716]' : 'text-gray-200 dark:text-gray-700'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium pl-13">
                            {review.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AVAILABILITY TAB */}
                {activeTab === 'Availability' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-[#D0771E] uppercase tracking-tight">2025</h3>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400 transform rotate-90" />
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors"><ChevronRightIcon className="w-4 h-4 text-gray-600 transform rotate-180" /></button>
                        <button className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors"><ChevronRightIcon className="w-4 h-4 text-gray-600" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {['January 2025', 'February 2025'].map((month, idx) => (
                        <div key={month} className="border border-gray-100 dark:border-gray-700 rounded-3xl p-6 hover:shadow-lg dark:hover:shadow-none transition-all duration-300">
                          <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-wide text-sm">
                            {month}
                          </h4>
                          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                              <div key={d}>{d}</div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                            {/* Simple placeholder calendar logic */}
                            {[...Array(idx === 0 ? 3 : 0)].map((_, i) => <div key={`empty-${i}`}></div>)}
                            {[...Array(31)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto transition-all duration-300
                                ${i === 15 || i === 20
                                    ? 'bg-gray-50 text-gray-300 dark:bg-gray-800 dark:text-gray-500 decoration-gray-300 cursor-not-allowed'
                                    : 'hover:bg-[#D0771E] hover:text-white cursor-pointer text-gray-700 dark:text-gray-200'
                                  }`}
                              >
                                {i + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GALLERY TAB */}
                {activeTab === 'Gallery' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vendor.images.map((img, i) => (
                      <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                        <img
                          src={img}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          alt={`Gallery ${i}`}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                    <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </div>
                )}
              </PremiumCard>
            </div>

          </div>

          {/* Right Sidebar: Booking Action */}
          <div className="w-full lg:w-[360px] flex-shrink-0 space-y-6">
            <PremiumCard className="p-6 border-orange-100 shadow-xl shadow-orange-100/20 bg-gradient-to-br from-white to-orange-50/30">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">Available Now</span>
                <div className="flex gap-2">
                  {/* Actions removed for cleaner card */}
                </div>
              </div>
              <div className="mb-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Starting From</p>
                <div className="flex items-baseline gap-1">
                  <h2 className="text-3xl font-black text-[#D0771E] tracking-tight">₦600,000</h2>
                  <span className="text-xs font-bold text-gray-400">/ event</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold mt-2">Prices vary based on package and customization.</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full bg-[#262626] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-gray-200 transform active:scale-95"
                >
                  Get Free Quote
                </button>
                <button
                  onClick={handleMessageVendor}
                  className="w-full border border-gray-200 text-gray-600 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all hover:border-gray-300"
                >
                  Message Vendor
                </button>
              </div>
            </PremiumCard>

            {/* Trust & Safety */}
            <PremiumCard className="p-6">
              <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-50 dark:border-gray-800 pb-4">
                Trust & Safety
              </h3>
              <div className="space-y-4">
                {[
                  { icon: CheckBadgeIcon, text: "Identity Verified" },
                  { icon: CheckBadgeIcon, text: "Secure Payment" },
                  { icon: CheckBadgeIcon, text: "Industry Certified" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-300 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>

        </div>

        {/* Modal */}
        <GetQuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          vendorName={vendor.name}
        />
      </div>
    </div>
  );
};

export default VendorDetail;