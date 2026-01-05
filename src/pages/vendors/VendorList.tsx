import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockVendors } from '../../data/mockData';
import { StarIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const VendorList = () => {
  const [vendors] = useState(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories for filter
  const categories = Array.from(new Set(vendors.map(vendor => vendor.category)));

  // Filter vendors based on search and category
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? vendor.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Vendors</h1>
        <p className="mt-1 text-sm text-gray-500">Browse and book vendors for your event</p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Vendors
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-800 font-medium">{vendor.name.charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{vendor.name}</h3>
                  <p className="text-sm text-gray-500">{vendor.category}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 line-clamp-2">{vendor.description}</p>
              </div>
              
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-900">{vendor.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({vendor.reviewCount} reviews)</span>
                </div>
                <div className="ml-4 flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-900">{vendor.priceRange}</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span>{vendor.address}</span>
              </div>
              
              <div className="mt-6">
                <Link
                  to={`/vendors/${vendor.id}`}
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;