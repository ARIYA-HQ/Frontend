import { useState } from 'react';
import { 
  CalendarDaysIcon, 
  UserGroupIcon, 
  ShoppingBagIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { mockVendors, mockEvents, mockBookings } from '../../data/mockData';

const AdminDashboard = () => {
  const [vendors] = useState(mockVendors);
  const [events] = useState(mockEvents);
  const [bookings] = useState(mockBookings);

  // Get stats
  const pendingVendors = vendors.filter(vendor => vendor.status === 'pending_approval');
  const activeVendors = vendors.filter(vendor => vendor.status === 'active');
  const totalEvents = events.length;
  const totalBookings = bookings.length;

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage platform operations and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-none">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex-1 ml-5 w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Vendors</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">{vendors.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-none">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarDaysIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex-1 ml-5 w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending Vendors</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingVendors.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-none">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingBagIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex-1 ml-5 w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Events</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">{totalEvents}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-none">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex-1 ml-5 w-0">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Bookings</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">{totalBookings}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Vendors */}
        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-none">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Pending Vendor Approvals</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Vendors awaiting approval</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {pendingVendors.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {pendingVendors.map((vendor) => (
                  <li key={vendor.id} className="py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                          <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{vendor.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{vendor.category}</div>
                      </div>
                      <div className="ml-auto">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold leading-4 text-yellow-800 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                          Pending
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No pending vendor approvals.</p>
            )}
          </div>
        </div>

        {/* Active Vendors */}
        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-none">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Active Vendors</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Currently active vendors on the platform</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {activeVendors.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {activeVendors.slice(0, 5).map((vendor) => (
                  <li key={vendor.id} className="py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{vendor.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{vendor.category}</div>
                      </div>
                      <div className="ml-auto">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold leading-4 text-green-800 dark:text-green-400 bg-green-100 dark:bg-green-900/20 rounded-full">
                          Active
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No active vendors on the platform.</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-none lg:col-span-2">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Recent Activity</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Latest events and bookings on the platform</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.slice(0, 3).map((event) => (
                <li key={event.id} className="py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <CalendarDaysIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Event created on {event.createdAt}</div>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold leading-4 text-blue-800 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        {event.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
              {bookings.slice(0, 2).map((booking) => (
                <li key={booking.id} className="py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                        <ShoppingBagIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">New Booking</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Booking status: {booking.status}</div>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold leading-4 text-purple-800 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;