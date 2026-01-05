import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import PremiumCard from '../../components/ui/PremiumCard';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  clientName: string;
  eventDate: string;
  rating: number;
}

const PortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 'port-1',
      title: 'Elegant Garden Wedding',
      description: 'Outdoor garden wedding for 150 guests with floral arrangements and custom lighting',
      category: 'Wedding',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863555?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1470&auto=format&fit=crop'
      ],
      clientName: 'Johnson Family',
      eventDate: '2023-06-15',
      rating: 5
    },
    {
      id: 'port-2',
      title: 'Corporate Tech Conference',
      description: '3-day technology conference with 500 attendees and networking sessions',
      category: 'Corporate',
      images: [
        'https://images.unsplash.com/photo-1521737711867-e3b97375f7b7?q=80&w=1486&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop'
      ],
      clientName: 'TechCorp',
      eventDate: '2023-09-10',
      rating: 4.8
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleDelete = (id: string) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-full flex flex-col gap-10">
      <PageHeader
        breadcrumb="Portfolio"
        title="Portfolio Management"
        subtitle="Showcase your previous work to attract potential clients."
      />

      <div className="flex justify-between items-center">
        <div></div> {/* Spacer */}
        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          className="bg-[#D0771E] hover:bg-[#b86619] text-white h-14 rounded-2xl px-8 text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-orange-100 flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Portfolio Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <PremiumCard key={item.id} className="overflow-hidden group">
            <div className="relative">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-1.5 text-xs font-black uppercase tracking-widest">
                {item.category}
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-black text-[#1D2939] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 font-black">{item.clientName} • {item.eventDate}</p>
                </div>
                <div className="flex items-center bg-yellow-500/10 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-black text-yellow-600">{item.rating}</span>
                  <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              <p className="text-gray-600 mb-6 text-sm font-black">{item.description}</p>

              <div className="flex justify-between">
                <button className="text-[#D0771E] hover:text-[#b86619] text-sm font-black flex items-center group">
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-black flex items-center group"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </PremiumCard>
        ))}
      </div>

      {/* Add Portfolio Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                <h3 className="text-xl font-black text-[#1D2939] text-[13px] uppercase tracking-[0.2em]">Add Portfolio Item</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-[#D0771E] transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Title</label>
                  <input
                    type="text"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] focus:border-transparent text-sm font-bold placeholder:text-gray-400"
                    placeholder="Enter portfolio item title"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] focus:border-transparent text-sm font-bold placeholder:text-gray-400"
                    placeholder="Describe the event and your role"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Category</label>
                    <select className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] focus:border-transparent text-sm font-bold">
                      <option>Wedding</option>
                      <option>Corporate</option>
                      <option>Birthday</option>
                      <option>Conference</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Client Name</label>
                    <input
                      type="text"
                      className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] focus:border-transparent text-sm font-bold placeholder:text-gray-400"
                      placeholder="Client name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Event Date</label>
                  <input
                    type="date"
                    className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D0771E] focus:border-transparent text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Images</label>
                  <div className="mt-3 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-[#D0771E]/30 transition-colors">
                    <div className="space-y-4">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <label className="relative cursor-pointer bg-[#D0771E] text-white rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#b86619] transition-colors">
                          <span>Upload files</span>
                          <input type="file" multiple className="sr-only" />
                        </label>
                        <p className="text-sm text-gray-500 font-black">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-400 font-black uppercase tracking-widest">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 h-14 rounded-2xl px-8 text-[11px] font-black uppercase tracking-[0.25em]"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="bg-[#D0771E] hover:bg-[#b86619] text-white h-14 rounded-2xl px-8 text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-orange-100"
                  >
                    Add to Portfolio
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;