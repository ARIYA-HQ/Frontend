import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockEvents } from '../../data/mockData';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';

const RSVPPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event] = useState(mockEvents.find(e => e.id === eventId) || mockEvents[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    plusOnes: 0,
    message: '',
    dietaryRestrictions: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'plusOnes' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the RSVP via an API
    console.log('RSVP submitted:', formData);
    alert('Thank you for your RSVP! We look forward to seeing you at the event.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-indigo-600 py-6 px-4 sm:px-6">
            <h1 className="text-2xl font-bold text-white">RSVP to {event.title}</h1>
            <p className="mt-1 text-indigo-200">Please respond by {new Date(event.date).toLocaleDateString()}</p>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900">Event Details</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <CalendarDaysIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">{event.location}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="attending" className="block text-sm font-medium text-gray-700">
                  Will you be attending?
                </label>
                <div className="mt-1">
                  <select
                    id="attending"
                    name="attending"
                    value={formData.attending}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3 pr-10 appearance-none bg-white"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes, I'll be there!</option>
                    <option value="no">Sorry, I can't make it</option>
                    <option value="maybe">I'm not sure yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="plusOnes" className="block text-sm font-medium text-gray-700">
                  Plus Ones
                </label>
                <div className="mt-1">
                  <select
                    id="plusOnes"
                    name="plusOnes"
                    value={formData.plusOnes}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3 pr-10 appearance-none bg-white"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">
                  Dietary Restrictions (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="dietaryRestrictions"
                    id="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3"
                    placeholder="Vegetarian, Gluten-free, etc."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#D0771E] focus:ring-[#D0771E] sm:text-sm py-2 pl-3 resize-none"
                    placeholder="Leave a message for the hosts..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit RSVP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPPage;