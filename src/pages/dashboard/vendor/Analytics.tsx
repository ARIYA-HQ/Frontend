import { useState } from 'react';
import {
  ChartBarIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const Analytics = () => {
  // Mock analytics data
  const [analyticsData] = useState({
    views: { current: 12450, change: 12.5 },
    inquiries: { current: 156, change: 8.2 },
    conversionRate: { current: 3.2, change: -1.5 },
    revenue: { current: 4520000, change: 15.8 }
  });

  const monthlyData = [
    { month: 'Jan', views: 800, inquiries: 30 },
    { month: 'Feb', views: 950, inquiries: 35 },
    { month: 'Mar', views: 1100, inquiries: 42 },
    { month: 'Apr', views: 1050, inquiries: 38 },
    { month: 'May', views: 1200, inquiries: 45 },
    { month: 'Jun', views: 1350, inquiries: 48 },
    { month: 'Jul', views: 1250, inquiries: 44 }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 uppercase">ANALYTICS</h1>
        <p className="mt-1 text-sm text-gray-500 font-medium">Track your business performance and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Profile Views', value: analyticsData.views.current.toLocaleString(), change: analyticsData.views.change, icon: EyeIcon, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: 'Inquiries', value: analyticsData.inquiries.current, change: analyticsData.inquiries.change, icon: ChatBubbleLeftRightIcon, color: 'text-orange-600', bgColor: 'bg-orange-50' },
          { label: 'Conversion Rate', value: `${analyticsData.conversionRate.current}%`, change: analyticsData.conversionRate.change, icon: ArrowTrendingUpIcon, color: 'text-green-600', bgColor: 'bg-green-50' },
          { label: 'Total Revenue', value: `$${analyticsData.revenue.current.toLocaleString()}`, change: analyticsData.revenue.change, icon: ChartBarIcon, color: 'text-purple-600', bgColor: 'bg-purple-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${stat.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                {stat.change >= 0 ? '+' : ''}{stat.change}%
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase">Performance Overview</h3>
          <div>
            <select className="block w-full pl-3 pr-10 py-2.5 text-xs font-bold border-gray-100 focus:outline-none focus:ring-[#D0771E] focus:border-[#D0771E] rounded-xl bg-gray-50/50">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="min-w-[600px] h-[300px] flex items-end justify-between px-4 pb-8">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div className="flex items-end justify-center w-full gap-1 mb-4 h-[200px]">
                  <div className="relative group/bar flex flex-col justify-end h-full">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 text-white text-[10px] px-2 py-1 rounded">
                      {data.views} views
                    </div>
                    <div
                      className="w-4 sm:w-6 bg-orange-100 rounded-t-sm group-hover:bg-[#D0771E] transition-all"
                      style={{ height: `${(data.views / 1400) * 100}%` }}
                    ></div>
                  </div>
                  <div className="relative group/bar flex flex-col justify-end h-full">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 text-white text-[10px] px-2 py-1 rounded">
                      {data.inquiries} inquiries
                    </div>
                    <div
                      className="w-2 sm:w-3 bg-gray-100 rounded-t-sm group-hover:bg-gray-200 transition-all"
                      style={{ height: `${(data.inquiries / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{data.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Services */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 uppercase mb-8">Top Performing Services</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-50">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Service
                </th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Bookings
                </th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Revenue
                </th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Conversion
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {[
                { name: 'Premium Wedding Package', category: 'Wedding Planning', bookings: 24, revenue: '₦30,000,000', conversion: '22.4%' },
                { name: 'Basic Wedding Package', category: 'Wedding Planning', bookings: 32, revenue: '₦19,200,000', conversion: '18.7%' },
                { name: 'Birthday Party Setup', category: 'Party Planning', bookings: 18, revenue: '₦9,000,000', conversion: '15.2%' },
              ].map((service, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 group-hover:text-[#D0771E] transition-colors">{service.name}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{service.category}</div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-sm font-bold text-gray-500">
                    {service.bookings}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-sm font-bold text-gray-900">
                    {service.revenue}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">{service.conversion}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;