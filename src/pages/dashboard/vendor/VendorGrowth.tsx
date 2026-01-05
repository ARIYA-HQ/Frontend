import { useState, useMemo } from 'react';
import {
    ChartBarIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    TrophyIcon,
    StarIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumTabs from '../../../components/ui/PremiumTabs';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';
import { GROWTH_STATS, MONTHLY_DATA, TOP_SERVICES, REVIEWS } from '../../../data/mockGrowth';

const VendorGrowth = () => {
    const [activeTab, setActiveTab] = useState('Performance');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'Performance', label: 'Performance' },
        { id: 'Reviews', label: 'Reviews' },
        { id: 'Benchmarks', label: 'Benchmarks' },
    ];

    const filteredServices = useMemo(() =>
        TOP_SERVICES.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase())),
        [searchQuery]
    );

    const renderPerformance = () => (
        <div className="space-y-8 animate-fade-in">
            {/* Chart Section */}
            <PremiumCard className="p-10 border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Performance Overview</h3>
                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Profile views vs enquiries over the last 7 months</p>
                    </div>
                    <select className="h-11 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#D0771E]/20 transition-all cursor-pointer">
                        <option>Last 7 months</option>
                        <option>Last 12 months</option>
                        <option>Year to date</option>
                    </select>
                </div>

                <div className="h-[300px] flex items-end justify-between px-4 pb-8 border-b border-dashed border-gray-100 dark:border-gray-800 relative">
                    {/* Y-axis grid lines (Background) */}
                    <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none flex flex-col justify-between pb-8">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-full h-px bg-gray-50 dark:bg-gray-800/50"></div>
                        ))}
                    </div>

                    {MONTHLY_DATA.map((data, index) => (
                        <div key={index} className="flex flex-col items-center flex-1 group relative z-10">
                            <div className="flex items-end justify-center w-full gap-2 mb-6 h-[200px]">
                                {/* Views Bar */}
                                <div className="relative group/bar flex flex-col justify-end h-full w-3 md:w-5">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-[#1D2939] dark:bg-white text-white dark:text-black text-[9px] font-black px-3 py-1.5 rounded-lg z-20 shadow-xl">
                                        {data.views} views
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1D2939] dark:bg-white rotate-45"></div>
                                    </div>
                                    <div
                                        className="w-full bg-[#D0771E]/20 dark:bg-[#D0771E]/40 rounded-t-lg group-hover:bg-[#D0771E] transition-all duration-300 transform origin-bottom hover:scale-y-105"
                                        style={{ height: `${(data.views / 1400) * 100}%` }}
                                    ></div>
                                </div>
                                {/* Inquiries Bar */}
                                <div className="relative group/bar flex flex-col justify-end h-full w-2 md:w-3">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 dark:bg-gray-100 text-white dark:text-black text-[9px] font-black px-3 py-1.5 rounded-lg z-20 shadow-xl">
                                        {data.inquiries} inquiries
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                                    </div>
                                    <div
                                        className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-sm group-hover:bg-gray-400 dark:group-hover:bg-gray-500 transition-all duration-300 transform origin-bottom hover:scale-y-105"
                                        style={{ height: `${(data.inquiries / 50) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest group-hover:text-[#D0771E] transition-colors">{data.month}</div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#D0771E]"></div>
                        <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Views</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Inquiries</span>
                    </div>
                </div>
            </PremiumCard>

            {/* Top Performing Services */}
            <PremiumCard className="p-0 overflow-hidden border-gray-100 dark:border-gray-800">
                <div className="p-10 border-b border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Top Performing Services</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#F3F0EB]/30 dark:bg-gray-800/50">
                                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Service</th>
                                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Bookings</th>
                                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Revenue</th>
                                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Conversion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800">
                            {filteredServices.map((service, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors group bg-white dark:bg-gray-900">
                                    <td className="px-10 py-6">
                                        <div className="text-sm font-black text-[#1D2939] dark:text-white group-hover:text-[#D0771E] transition-colors uppercase tracking-tight">{service.name}</div>
                                        <div className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">{service.category}</div>
                                    </td>
                                    <td className="px-10 py-6 text-sm font-black text-gray-500 dark:text-gray-400">{service.bookings}</td>
                                    <td className="px-10 py-6 text-sm font-black text-[#1D2939] dark:text-white">{service.revenue}</td>
                                    <td className="px-10 py-6">
                                        <span className="text-sm font-black text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-lg">
                                            {service.conversion}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </PremiumCard>
        </div>
    );

    const renderReviews = () => (
        <div className="grid grid-cols-1 gap-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <PremiumCard className="p-8 text-center bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Average Rating</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <h3 className="text-4xl font-black text-[#1D2939] dark:text-white">4.9</h3>
                        <StarIcon className="w-6 h-6 text-orange-400 fill-orange-400" />
                    </div>
                    <p className="text-[9px] font-black text-green-600 dark:text-green-400 uppercase">Top 2% of Vendors</p>
                </PremiumCard>
                <PremiumCard className="p-8 text-center bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Total Reviews</p>
                    <h3 className="text-4xl font-black text-[#1D2939] dark:text-white">1,204</h3>
                    <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase mt-2">+12 this month</p>
                </PremiumCard>
                <PremiumCard className="p-8 text-center bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Response Rate</p>
                    <h3 className="text-4xl font-black text-[#1D2939] dark:text-white">98%</h3>
                    <p className="text-[9px] font-black text-green-600 dark:text-green-400 uppercase mt-2">Elite Status</p>
                </PremiumCard>
            </div>

            {REVIEWS.map((review) => (
                <PremiumCard key={review.id} className="p-10 group hover:border-[#D0771E]/30 transition-all border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-16 h-16 rounded-[24px] bg-[#F3F0EB] dark:bg-gray-800 flex items-center justify-center text-xl font-black text-[#1D2939] dark:text-white shrink-0">
                                {review.avatar}
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">{review.user}</h4>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-orange-400">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-orange-400' : 'text-gray-200 dark:text-gray-700'}`} />
                                        ))}
                                    </div>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                    <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{review.date}</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="h-10 px-6 rounded-xl border-gray-100 dark:border-gray-700 text-[10px] font-black uppercase tracking-widest hover:text-[#D0771E] dark:text-gray-300 dark:hover:text-[#D0771E]">
                            Reply Message
                        </Button>
                    </div>
                    <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 font-medium leading-[2] max-w-4xl">
                        "{review.comment}"
                    </p>
                </PremiumCard>
            ))}
        </div>
    );

    const renderBenchmarks = () => (
        <div className="min-h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            <PremiumCard className="p-10 space-y-10 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div>
                    <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight mb-2">Market Standing</h3>
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">How you compare to similar vendors in Lagos</p>
                </div>

                <div className="space-y-8">
                    {[
                        { label: 'Pricing Competitiveness', value: 85, status: 'Premium' },
                        { label: 'Booking Speed', value: 92, status: 'Elite' },
                        { label: 'Customer Satisfaction', value: 96, status: 'Elite' },
                        { label: 'Profile Completeness', value: 100, status: 'Perfect' },
                    ].map((item, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black text-[#1D2939] dark:text-white uppercase tracking-widest mb-1">{item.label}</p>
                                    <p className="text-[9px] font-black text-[#D0771E] uppercase">{item.status}</p>
                                </div>
                                <span className="text-xs font-black text-[#1D2939] dark:text-white">{item.value}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-[#1D2939] dark:bg-white rounded-full transition-all duration-1000 ease-out" style={{ width: `${item.value}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </PremiumCard>

            <PremiumCard className="p-10 bg-[#1D2939] dark:bg-black text-white flex flex-col justify-center items-center text-center overflow-hidden relative border-none">
                <div className="relative z-10 space-y-6">
                    <div className="w-24 h-24 rounded-[32px] bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
                        <TrophyIcon className="w-12 h-12 text-[#D0771E]" />
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Become a Pro Member</h3>
                    <p className="text-sm text-gray-300 max-w-xs mx-auto leading-relaxed">Get advanced benchmarking tools and access to premium market insights.</p>
                    <Button className="h-16 px-12 rounded-2xl bg-[#D0771E] text-white border-none shadow-2xl shadow-[#D0771E]/20 mt-4 mx-auto block uppercase text-[11px] font-black tracking-widest hover:scale-105 transition-transform">Upgrade to Pro</Button>
                </div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#D0771E]/10 blur-3xl"></div>
            </PremiumCard>
        </div>
    );

    const ArrowDownTrayIcon = ({ className }: { className?: string }) => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
    );

    return (
        <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col gap-10">
            <PageHeader
                breadcrumb="Operations"
                title="Growth"
                subtitle="Track your business performance and market insights"
                actions={
                    <div className="flex gap-4">
                        <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                        <Button className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none bg-[#D0771E] text-white">
                            <ChartBarIcon className="w-5 h-5 mr-2" />
                            Live Analytics
                        </Button>
                    </div>
                }
            />

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {GROWTH_STATS.map((stat, idx) => (
                    <div key={idx} className="relative group">
                        <StatCard
                            label={stat.label}
                            value={stat.value}
                            icon={<stat.icon className="w-5 h-5 text-white" />}
                            iconBgColor={stat.color}
                        />
                        <div className={`absolute top-6 right-8 text-[9px] font-black uppercase tracking-widest ${stat.change.startsWith('+') ? 'text-green-500' : 'text-rose-500'}`}>
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-8">
                {/* Tabs & Search */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <PremiumTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D0771E] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search Data..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-xl text-xs font-black placeholder:text-gray-400 dark:text-white focus:ring-2 focus:ring-[#D0771E]/20 focus:bg-white dark:focus:bg-gray-900 focus:border-[#D0771E] transition-all outline-none"
                            />
                        </div>
                        <Button variant="outline" className="h-11 rounded-xl px-5 border-gray-100 dark:border-gray-700 dark:text-white">
                            <FunnelIcon className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'Performance' && renderPerformance()}
                    {activeTab === 'Reviews' && renderReviews()}
                    {activeTab === 'Benchmarks' && renderBenchmarks()}
                </div>
            </div>
        </div>
    );
};

export default VendorGrowth;
