import { useState } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumCard from '../../../components/ui/PremiumCard';
import { PremiumSearch } from '../../../components/ui/PremiumInput';
import { Button } from '../../../components/ui/Button';
import {
  PlusIcon,
  CurrencyDollarIcon,
  PencilSquareIcon,
  TrashIcon,
  TagIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { MOCK_SERVICES } from '../../../data/mockServices';
import type { Service } from '../../../data/mockServices';
import ServiceModal from '../../../components/services/ServiceModal';

const ServicesAndPricing = () => {
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Derived Data
  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  // Filter Logic
  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Stats Logic
  const totalServices = services.length;
  const avgPrice = services.length > 0
    ? services.reduce((acc, curr) => acc + curr.price, 0) / services.length
    : 0;

  // Handlers
  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this service?')) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSave = (serviceData: Partial<Service>) => {
    if (editingService) {
      setServices(prev => prev.map(s =>
        s.id === editingService.id ? { ...s, ...serviceData } as Service : s
      ));
    } else {
      const newService: Service = {
        ...serviceData,
        id: `serv-${Date.now()}`,
        active: true,
        image: 'bg-gray-100 text-gray-600' // Default styling
      } as Service;
      setServices(prev => [newService, ...prev]);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-20 h-full flex flex-col">
      <div className="w-full px-8 flex-1 flex flex-col">
        <PageHeader
          breadcrumb="Vendor Dashboard"
          title="Services & Pricing"
          subtitle="Manage your service offerings and packages"
          actions={
            <Button
              variant="primary"
              onClick={handleAdd}
              className="bg-[#D0771E] hover:bg-[#b86619] text-white h-12 rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 dark:shadow-none flex items-center gap-2 transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              Add Service
            </Button>
          }
        />

        <div className="flex flex-col lg:flex-row gap-8 flex-1">
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0 space-y-8">
            <div className="sticky top-8 space-y-6">
              {/* Search */}
              <PremiumCard className="p-4 border-gray-100/50 dark:border-gray-700/50 shadow-none bg-transparent dark:bg-transparent">
                <div className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4 px-2">Filter</div>
                <PremiumSearch
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </PremiumCard>

              {/* Categories */}
              <PremiumCard className="p-2 border-gray-100 dark:border-gray-800">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 px-4 pt-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex justify-between items-center ${selectedCategory === cat
                        ? 'bg-[#D0771E]/10 text-[#D0771E]'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                    >
                      {cat}
                      {selectedCategory === cat && <CheckIcon className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </PremiumCard>

              {/* Stats */}
              <PremiumCard className="p-6 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Overview</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600">
                        <TagIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">{totalServices}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                        <CurrencyDollarIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Avg Price</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">${Math.round(avgPrice).toLocaleString()}</span>
                  </div>
                </div>
              </PremiumCard>
            </div>
          </div>

          {/* Services Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredServices.map(service => (
                <PremiumCard
                  key={service.id}
                  className="p-8 group hover:border-[#D0771E]/30 transition-all flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-[10px] font-black uppercase tracking-wider text-gray-500">
                          {service.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2 group-hover:text-[#D0771E] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(service); }}
                        className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-gray-400 hover:text-[#D0771E] transition-colors"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(service.id, e)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-auto space-y-6">
                    <div className="space-y-2">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D0771E]/40" />
                          {feature}
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <div className="text-[10px] font-black text-gray-300 uppercase pl-3.5">
                          + {service.features.length - 3} more features
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                        ${service.price.toLocaleString()}
                      </span>
                      {service.price > 0 && (
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Starting At
                        </span>
                      )}
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        service={editingService}
      />
    </div>
  );
};

export default ServicesAndPricing;