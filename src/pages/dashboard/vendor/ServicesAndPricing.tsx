import { useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const ServicesAndPricing = () => {
  // Mock services data
  const [services] = useState([
    { id: 1, name: 'Premium Wedding Package', category: 'Wedding Planning', price: 1500, description: 'Full wedding planning including venue selection, vendor management, and day-of coordination.' },
    { id: 2, name: 'Basic Wedding Package', category: 'Wedding Planning', price: 800, description: 'Essential coordination for your big day, starting 1 month before the wedding.' },
    { id: 3, name: 'Corporate Event Setup', category: 'Corporate Events', price: 1200, description: 'Professional setup and management for corporate seminars and galas.' },
    { id: 4, name: 'Birthday Party Setup', category: 'Party Planning', price: 500, description: 'Themed birthday party coordination including decor and entertainment.' }
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 uppercase">SERVICES & PRICING</h1>
        <p className="mt-1 text-sm text-gray-500 font-medium">Manage your service offerings and pricing</p>
      </div>

      <div className="flex justify-end mb-8">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-[10px] font-bold uppercase tracking-widest rounded-xl text-white bg-[#D0771E] shadow-lg shadow-orange-100/50 hover:scale-[1.02] active:scale-95 transition-all">
          <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 group hover:border-[#D0771E]/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 uppercase group-hover:text-[#D0771E] transition-colors">{service.name}</h3>
                <p className="mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{service.category}</p>
                <p className="mt-4 text-sm font-medium text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">${service.price}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">/ service</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Form */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mt-10">
        <h3 className="text-lg font-bold text-gray-900 uppercase mb-8">Add New Service</h3>

        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="serviceName" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                className="block w-full border border-gray-100 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] text-xs font-bold bg-gray-50/30"
                placeholder="e.g., Basic Wedding Package"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Category
              </label>
              <select
                id="category"
                className="block w-full border border-gray-100 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] text-xs font-bold bg-gray-50/30"
              >
                <option>Wedding Planning</option>
                <option>Party Planning</option>
                <option>Corporate Events</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="block w-full border border-gray-100 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] text-xs font-bold bg-gray-50/30"
              placeholder="Describe what's included in this service..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Price (₦)
              </label>
              <input
                type="number"
                id="price"
                className="block w-full border border-gray-100 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] text-xs font-bold bg-gray-50/30"
                placeholder="0.00"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-4 bg-[#D0771E] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-orange-100/50 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Create Service
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicesAndPricing;