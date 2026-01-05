import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CalendarDaysIcon, MapPinIcon, UserGroupIcon, CurrencyDollarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import PageHeader from '../../components/ui/PageHeader';
import PremiumCard from '../../components/ui/PremiumCard';

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    eventDate: '',
    location: '',
    occasion: '',
    guestCount: '',
    budget: '',
    status: 'planning'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard with the data
    navigate('/events/ai-dashboard', { state: { eventData: formData } });
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-20">
      <div className="w-full px-8">
        {/* Header */}
        <PageHeader
          breadcrumb="Events"
          title="Create New Event"
          subtitle="Start planning your next unforgettable celebration"
          actions={
            <button
              onClick={() => navigate('/events')}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Events
            </button>
          }
        />

        <div className="max-w-3xl mx-auto mt-8">
          <PremiumCard className="p-12">
            <div className="text-center mb-10">
              <span className="inline-block p-4 rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#D0771E] mb-4">
                <SparklesIcon className="w-8 h-8" />
              </span>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Event Details</h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tell us about your event and our AI will help you plan it perfectly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Event Name */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Event Name</label>
                  <input
                    type="text"
                    name="eventName"
                    placeholder="e.g. Tosin & John's Wedding"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-4 text-sm font-bold dark:text-white focus:border-[#D0771E] focus:ring-[#D0771E] transition-shadow placeholder-gray-300 dark:placeholder-gray-500"
                  />
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-4 text-sm font-bold dark:text-white focus:border-[#D0771E] focus:ring-[#D0771E] transition-shadow"
                  >
                    <option value="">Select Occasion</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="anniversary">Anniversary</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Event Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <CalendarDaysIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white pl-11 p-4 text-sm font-bold focus:border-[#D0771E] focus:ring-[#D0771E] transition-shadow"
                    />
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Guest Count</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserGroupIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="number"
                      name="guestCount"
                      placeholder="e.g. 150"
                      value={formData.guestCount}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white pl-11 p-4 text-sm font-bold focus:border-[#D0771E] focus:ring-[#D0771E] transition-shadow placeholder-gray-300 dark:placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Estimated Budget</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="number"
                      name="budget"
                      placeholder="e.g. 10000000"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white pl-11 p-4 text-sm font-bold focus:border-[#D0771E] focus:ring-[#D0771E] transition-shadow placeholder-gray-300 dark:placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Eko Hotels & Suites, Lagos"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white pl-11 p-4 text-sm font-bold focus:border-[#D0771E] focus:ring-[#D0771E] transition-shadow placeholder-gray-300 dark:placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-2">Event Vision</label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Describe your dream event..."
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white p-4 text-sm font-bold focus:border-[#D0771E] focus:ring-[#D0771E] transition-shadow placeholder-gray-300 dark:placeholder-gray-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#262626] dark:bg-gray-800 text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black dark:hover:bg-gray-700 transition-all shadow-lg dark:shadow-none hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Create Event Plan
                </button>
              </div>
            </form>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;