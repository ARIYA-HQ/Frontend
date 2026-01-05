import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ExpandableSection from '../../components/ui/ExpandableSection';
import { mockEvents, mockGuests, mockBudget } from '../../data/mockData';
import {
  CalendarDaysIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  PencilIcon,
  UserPlusIcon,
  ShoppingBagIcon,
  ArrowLeftIcon,
  MapPinIcon,
  SparklesIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event] = useState(mockEvents.find(e => e.id === eventId) || mockEvents[0]);
  const [guests] = useState(mockGuests.filter(g => g.eventId === eventId));
  const [budget] = useState(mockBudget);

  // Calculate budget stats
  const totalAllocated = budget.items.reduce((sum, item) => sum + item.allocatedAmount, 0);
  const totalSpent = budget.items.reduce((sum, item) => sum + item.spentAmount, 0);
  const remainingBudget = budget.totalBudget - totalSpent;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1600px] mx-auto px-6 pt-12">
        {/* Header Section */}
        <button
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          Collections
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-black bg-black text-white px-3 py-1 uppercase tracking-[0.2em]">Confirmed</span>
              <span className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.2em]">{event.eventType}</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-black uppercase tracking-tighter italic mb-6 leading-none">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              <div className="flex items-center gap-2"><CalendarDaysIcon className="w-4 h-4" /> {event.date}</div>
              <div className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" /> {event.location}</div>
              <div className="flex items-center gap-2"><UserGroupIcon className="w-4 h-4" /> {event.guestCount} Guests</div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D0771E] transition-all rounded-xl shadow-xl shadow-gray-200">
              Edit Manifest
            </button>
            <button className="px-8 py-4 bg-white border-2 border-black text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all rounded-xl">
              Share Concept
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Details & Guests */}
          <div className="lg:col-span-8 space-y-20">
            {/* Narrative */}
            <section>
              <h2 className="text-[10px] font-black text-black uppercase tracking-[0.3em] mb-8 border-b-2 border-black pb-2 inline-block">The Narrative</h2>
              <p className="text-2xl font-medium text-gray-800 leading-relaxed max-w-3xl lowercase first-letter:uppercase">
                {event.description || "A meticulously curated celebration blending contemporary elegance with timeless traditions. Every element designed to evoke emotion and create lasting memories for all guests."}
              </p>
            </section>

            {/* Guest List Management */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-[10px] font-black text-black uppercase tracking-[0.3em] border-b-2 border-black pb-2">Guest Relations</h2>
                <button
                  onClick={() => navigate('/guests')}
                  className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.2em] hover:text-black transition-colors"
                >
                  Launch Full Guest Suite →
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Capacity</div>
                  <div className="text-3xl font-black text-black">{event.guestCount}</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Confirmed</div>
                  <div className="text-3xl font-black text-green-600">{guests.filter(g => g.rsvpStatus === 'confirmed').length}</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pending</div>
                  <div className="text-3xl font-black text-orange-400">{guests.filter(g => g.rsvpStatus === 'pending').length}</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Declined</div>
                  <div className="text-3xl font-black text-red-400">{guests.filter(g => g.rsvpStatus === 'declined').length}</div>
                </div>
              </div>

              <div className="overflow-hidden border border-gray-100 rounded-3xl bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-8 py-4 text-left text-[10px] font-black text-black uppercase tracking-widest">Guest</th>
                      <th scope="col" className="px-8 py-4 text-left text-[10px] font-black text-black uppercase tracking-widest">Response</th>
                      <th scope="col" className="px-8 py-4 text-left text-[10px] font-black text-black uppercase tracking-widest">Plus Ones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-50">
                    {guests.slice(0, 5).map((guest) => (
                      <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="text-sm font-bold text-black">{guest.name}</div>
                          <div className="text-[10px] text-gray-400 font-medium">{guest.email}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${guest.rsvpStatus === 'confirmed' ? 'bg-green-50 text-green-600' :
                            guest.rsvpStatus === 'declined' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                            }`}>
                            {guest.rsvpStatus}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-gray-600">
                          {guest.plusOnes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column: Financials & Quick Actions */}
          <div className="lg:col-span-4 space-y-12">
            {/* Financial Allocation */}
            <section className="bg-black text-white p-10 rounded-[3rem] shadow-2xl shadow-orange-100 border-4 border-[#D0771E]">
              <h2 className="text-[10px] font-black text-[#D0771E] uppercase tracking-[0.3em] mb-8">Financial Allocation</h2>
              <div className="space-y-8">
                <div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Authorized</div>
                  <div className="text-4xl font-black italic tracking-tighter">${budget.totalBudget.toLocaleString()}</div>
                </div>
                <div className="h-0.5 bg-gray-900 w-full" />
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Utilized</div>
                    <div className="text-xl font-black">${totalSpent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Available</div>
                    <div className="text-xl font-black text-[#D0771E]">${remainingBudget.toLocaleString()}</div>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                    <span>Progressive Spend</span>
                    <span>{Math.round((totalSpent / budget.totalBudget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-1">
                    <div
                      className="bg-[#D0771E] h-1 rounded-full shadow-[0_0_10px_rgba(208,119,30,0.5)] transition-all duration-1000"
                      style={{ width: `${(totalSpent / budget.totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/budget')}
                  className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] border border-[#D0771E] text-[#D0771E] hover:bg-[#D0771E] hover:text-white transition-all rounded-xl"
                >
                  Enter Financial Portal
                </button>
              </div>
            </section>

            {/* Concept Suite */}
            <section className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
              <h2 className="text-[10px] font-black text-black uppercase tracking-[0.3em] mb-8">Concept Suite</h2>
              <div className="grid grid-cols-1 gap-4">
                <button onClick={() => navigate('/website')} className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all border border-transparent hover:border-orange-100 group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#D0771E] group-hover:bg-[#D0771E] group-hover:text-white transition-colors">
                    <SparklesIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase tracking-widest text-black">Website Design</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">92% Complete</div>
                  </div>
                </button>
                <button onClick={() => navigate('/vendors')} className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all border border-transparent hover:border-orange-100 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ShoppingBagIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase tracking-widest text-black">Vendor Network</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">12 Booked</div>
                  </div>
                </button>
                <button onClick={() => navigate('/tasks')} className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all border border-transparent hover:border-orange-100 group">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase tracking-widest text-black">Operational Timeline</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">4 Urgent</div>
                  </div>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;