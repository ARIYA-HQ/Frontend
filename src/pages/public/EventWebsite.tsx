import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockEvents, mockRegistry } from '../../data/mockData';
import { CalendarDaysIcon, MapPinIcon, UserGroupIcon, StarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import PremiumCard from '../../components/ui/PremiumCard';

const EventWebsite = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event] = useState(mockEvents.find(e => e.id === eventId) || mockEvents[0]);
  const [registry] = useState(mockRegistry);

  return (
    <div className="min-h-screen bg-[#F4F6F8] dark:bg-gray-900 font-inter">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#1D2939] text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D0771E] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
              <StarIcon className="w-4 h-4 text-[#D0771E]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Official Event Page</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
              {event.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
              {event.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#rsvp"
                className="w-full sm:w-auto px-8 py-4 bg-[#D0771E] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-1"
              >
                RSVP Now
              </a>
              <a
                href="#details"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div id="details" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#D0771E] text-xs font-black tracking-widest uppercase mb-3">Event Details</h2>
            <p className="text-3xl md:text-4xl font-black tracking-tighter text-[#1D2939] dark:text-white">
              Everything you need to know
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CalendarDaysIcon, title: 'Date & Time', value: `${event.date} at 3:00 PM` },
              { icon: MapPinIcon, title: 'Location', value: event.location },
              { icon: UserGroupIcon, title: 'Guests', value: `${event.guestCount} Attendees` },
              { icon: CheckBadgeIcon, title: 'Dress Code', value: 'Semi-formal' }
            ].map((item, idx) => (
              <PremiumCard key={idx} className="p-8 group hover:border-[#D0771E]/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-[#D0771E] mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">{item.title}</h3>
                <p className="text-lg font-bold text-[#1D2939] dark:text-white">{item.value}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </div>

      {/* Registry Section */}
      <div className="py-20 bg-[#F4F6F8] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#D0771E] text-xs font-black tracking-widest uppercase mb-3">Gift Registry</h2>
            <p className="text-3xl md:text-4xl font-black tracking-tighter text-[#1D2939] dark:text-white mb-6">
              Your presence is our gift
            </p>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {registry.message}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {registry.items.map((item) => (
              <PremiumCard key={item.id} className="group overflow-hidden border-none p-0">
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  {/* Placeholder image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <span className="text-4xl font-black opacity-20">IMAGE</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-black text-[#1D2939]">
                    ${item.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1D2939] dark:text-white mb-2">{item.title}</h3>
                  <a
                    href={item.link || '#'}
                    className="inline-flex items-center text-xs font-black text-[#D0771E] uppercase tracking-widest hover:underline"
                  >
                    View Gift <span className="ml-1">→</span>
                  </a>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </div>

      {/* RSVP Section */}
      <div id="rsvp" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumCard className="p-10 md:p-14 border-[#D0771E]/20 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-800 dark:to-gray-800">
            <div className="text-center mb-12">
              <h2 className="text-[#D0771E] text-xs font-black tracking-widest uppercase mb-3">RSVP</h2>
              <p className="text-3xl md:text-4xl font-black tracking-tighter text-[#1D2939] dark:text-white">
                Will you be joining us?
              </p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-[#D0771E]/20 font-medium text-[#1D2939] dark:text-white transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-[#D0771E]/20 font-medium text-[#1D2939] dark:text-white transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Attending?</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Joyfully Accept', 'Regretfully Decline', 'Unsure'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-500 hover:border-[#D0771E] hover:text-[#D0771E] hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Message to Hosts</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-[#D0771E]/20 font-medium text-[#1D2939] dark:text-white transition-all resize-none"
                  placeholder="Share your excitement..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-5 bg-[#1D2939] dark:bg-white text-white dark:text-[#1D2939] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#D0771E] dark:hover:bg-[#D0771E] dark:hover:text-white transition-all shadow-xl"
              >
                Send RSVP
              </button>
            </form>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default EventWebsite;