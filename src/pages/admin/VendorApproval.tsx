import { useState } from 'react';
import { mockVendors } from '../../data/mockData';

const VendorApproval = () => {
  const [vendors, setVendors] = useState(mockVendors);
  
  const pendingVendors = vendors.filter(vendor => vendor.status === 'pending_approval');

  const handleApprove = (vendorId: string) => {
    setVendors(prevVendors => 
      prevVendors.map(vendor => 
        vendor.id === vendorId ? { ...vendor, status: 'active' } : vendor
      )
    );
  };

  const handleReject = (vendorId: string) => {
    setVendors(prevVendors => 
      prevVendors.map(vendor => 
        vendor.id === vendorId ? { ...vendor, status: 'inactive' } : vendor
      )
    );
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-2">Admin &gt; <span className="text-[#D0771E]">Vendor Approval Listing</span></div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Approval</h1>
        <p className="mt-1 text-sm text-gray-500">Review and approve new vendor applications</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {pendingVendors.length > 0 ? (
            pendingVendors.map((vendor) => (
              <li key={vendor.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-800 font-medium">{vendor.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold leading-4 text-yellow-800 bg-yellow-100 rounded-full">
                        Pending
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="mr-6 text-sm text-gray-500">
                        <p>{vendor.description}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 sm:mt-0">
                        <p>Created: {vendor.createdAt}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3 sm:mt-0">
                      <button
                        onClick={() => handleApprove(vendor.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(vendor.id)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>
              <div className="px-4 py-12 text-center">
                <p className="text-sm text-gray-500">No pending vendor approvals</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default VendorApproval;