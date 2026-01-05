import { useState } from 'react';
import {
  CalendarDaysIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const Availability = () => {
  // Mock availability data
  const [availability] = useState([
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', status: 'available' },
    { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', status: 'available' },
    { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', status: 'available' },
    { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', status: 'available' },
    { id: 5, day: 'Friday', startTime: '09:00', endTime: '17:00', status: 'available' },
    { id: 6, day: 'Saturday', startTime: '10:00', endTime: '15:00', status: 'available' },
    { id: 7, day: 'Sunday', startTime: '-', endTime: '-', status: 'unavailable' }
  ]);

  // Mock blocked dates
  const [blockedDates] = useState([
    { id: 1, date: '2023-11-25', reason: 'Public Holiday' },
    { id: 2, date: '2023-12-25', reason: 'Christmas Day' },
    { id: 3, date: '2024-01-01', reason: 'New Year Day' }
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 uppercase">AVAILABILITY</h1>
        <p className="mt-1 text-sm text-gray-500 font-medium">Set your working hours and blocked dates</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Weekly Schedule */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gray-900 uppercase">Weekly Schedule</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#D0771E] hover:underline">
              Bulk Edit
            </button>
          </div>

          <div className="space-y-6">
            {availability.map((day) => (
              <div key={day.id} className="flex items-center justify-between group">
                <div className="flex items-center">
                  <span className="w-24 text-xs font-bold text-gray-900 uppercase tracking-wider">{day.day}</span>
                  <span className="mx-4 text-gray-200">|</span>
                  <span className="text-xs font-bold text-gray-500">
                    {day.startTime} - {day.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${day.status === 'available'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                    }`}>
                    {day.status === 'available' ? 'Available' : 'Unavailable'}
                  </span>
                  <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blocked Dates */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gray-900 uppercase">Blocked Dates</h3>
            <button className="inline-flex items-center px-4 py-2 border border-gray-100 text-[10px] font-bold uppercase tracking-widest rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm">
              <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
              Add Date
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {blockedDates.map((date) => (
              <div key={date.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-transparent hover:border-gray-100 transition-all">
                <div className="flex items-center">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-4" />
                  <div>
                    <span className="block text-xs font-bold text-gray-900">{date.date}</span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{date.reason}</span>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-red-500 transition-colors">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-6">Add Blocked Date</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="date"
                className="block w-full border border-gray-100 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] text-xs font-bold bg-gray-50/30"
              />
              <input
                type="text"
                placeholder="Reason for blocking..."
                className="block w-full border border-gray-100 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] text-xs font-bold bg-gray-50/30"
              />
            </div>
            <button className="w-full py-4 bg-[#D0771E] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-orange-100/50 hover:scale-[1.02] active:scale-95 transition-all">
              Block this Date
            </button>
          </div>
        </div>
      </div>

      {/* Availability Rules */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mt-8">
        <h3 className="text-lg font-bold text-gray-900 uppercase mb-8">Availability Rules</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Minimum Notice</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">How far in advance to book</p>
            </div>
            <select className="block w-full bg-gray-50/50 border border-gray-100 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] text-xs font-bold">
              <option>1 week</option>
              <option>2 weeks</option>
              <option>1 month</option>
              <option>2 months</option>
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Booking Window</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Availability timeframe</p>
            </div>
            <select className="block w-full bg-gray-50/50 border border-gray-100 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] text-xs font-bold">
              <option>3 months</option>
              <option>6 months</option>
              <option>1 year</option>
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Concurrent Events</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Events you can handle</p>
            </div>
            <select className="block w-full bg-gray-50/50 border border-gray-100 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] text-xs font-bold">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>Unlimited</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;