import { useState, useMemo } from 'react';
import {
    ChartBarIcon,
    EyeIcon,
    ChatBubbleLeftRightIcon,
    ArrowTrendingUpIcon,
    ClockIcon,
    StarIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    TrophyIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumTabs from '../../../components/ui/PremiumTabs';
import StatCard from '../../../components/dashboard/StatCard';
import PremiumCard from '../../../components/ui/PremiumCard';
import { Button } from '../../../components/ui/Button';

const VendorGrowth = () => {
    const [activeTab, setActiveTab] = useState('Performance');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'Performance', label: 'Performance' },
        { id: 'Reviews', label: 'Reviews' },
        { id: 'Benchmarks', label: 'Benchmarks' },
    ];

    const stats = [
        { label: 'Profile Views', value: '12,450', icon: EyeIcon, color: 'bg-blue-600', change: '+12.5%' },
        { label: 'Enquiries', value: '156', icon: ChatBubbleLeftRightIcon, color: 'bg-orange-600', change: '+8.2%' },
        { label: 'Conversion Rate', value: '3.2%', icon: ArrowTrendingUpIcon, color: 'bg-emerald-600', change: '-1.5%' },
        { label: 'Avg Response', value: '2.3 Days', icon: ClockIcon, color: 'bg-purple-600', change: '+0.5%' },
    ];

    const monthlyData = [
        { month: 'Jan', views: 800, inquiries: 30 },
        { month: 'Feb', views: 950, inquiries: 35 },
        { month: 'Mar', views: 1100, inquiries: 42 },
        { month: 'Apr', views: 1050, inquiries: 38 },
        { month: 'May', views: 1200, inquiries: 45 },
        { month: 'Jun', views: 1350, inquiries: 48 },
        { month: 'Jul', views: 1250, inquiries: 44 }
    ];

    const topServices = [
        { name: 'Premium Wedding Package', category: 'Wedding Planning', bookings: 24, revenue: '₦30,000,000', conversion: '22.4%' },
        { name: 'Basic Wedding Package', category: 'Wedding Planning', bookings: 32, revenue: '₦19,200,000', conversion: '18.7%' },
        { name: 'Birthday Party Setup', category: 'Party Planning', bookings: 18, revenue: '₦9,000,000', conversion: '15.2%' },
    ];

    const reviews = [
        { id: 1, user: 'Sarah Johnson', rating: 5, date: '2 days ago', comment: 'The service was absolutely exceptional. The attention to detail and professionalism made our wedding day stress-free and beautiful.', avatar: 'S' },
        { id: 2, user: 'Michael Chen', rating: 4, date: '1 week ago', comment: 'Great experience overall. Communication was smooth and the execution was on point. Highly recommended for corporate events.', avatar: 'M' },
        { id: 3, user: 'Emily Davis', rating: 5, date: '2 weeks ago', comment: 'Beyond my expectations! Antigravity really knows how to deliver a premium experience. Will definitely book again.', avatar: 'E' },
    ];

    const filteredServices = useMemo(() =>
        topServices.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase())),
        [searchQuery]
    );

    const renderPerformance = () => (
        <div className="space-y-8">
            {/* Chart Section */}
            <PremiumCard className="p-10">
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-[#1D2939] uppercase tracking-tight">Performance Overview</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile views vs enquiries over the last 7 months</p>
                    </div>
                    <select className="h-11 px-4 rounded-xl bg-gray-50 border-none text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#D0771E]/20 transition-all cursor-pointer">
                        <option>Last 7 months</option>
                        <option>Last 12 months</option>
                        <option>Year to date</option>
                    </select>
                </div>

                <div className="h-[300px] flex items-end justify-between px-4 pb-8">
                    {monthlyData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center flex-1 group relative">
                            <div className="flex items-end justify-center w-full gap-2 mb-6 h-[200px]">
                                <div className="relative group/bar flex flex-col justify-end h-full w-4">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-[#1D2939] text-white text-[9px] font-black px-2 py-1 rounded-lg z-10">
                                        {data.views} views
                                    </div>
                                    <div
                                        className="w-full bg-[#D0771E]/10 rounded-t-lg group-hover:bg-[#D0771E] transition-all duration-500"
                                        style={{ height: `${(data.views / 1400) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="relative group/bar flex flex-col justify-end h-full w-2">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-[#1D2939] text-white text-[9px] font-black px-2 py-1 rounded-lg z-10">
                                        {data.inquiries} inquiries
                                    </div>
                                    <div
                                        className="w-full bg-gray-100 rounded-t-sm group-hover:bg-gray-300 transition-all duration-500"
                                        style={{ height: `${(data.inquiries / 50) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{data.month}</div>
                        </div>
                    ))}
                </div>
            </PremiumCard>

            {/* Top Performing Services */}
            <PremiumCard className="p-0 overflow-hidden">
                <div className="p-10 border-b border-gray-50">
                    <h3 className="text-xl font-black text-[#1D2939] uppercase tracking-tight">Top Performing Services</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#F3F0EB]/30">
                                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Service</th>
                                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Bookings</th>
                                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Revenue</th>
                                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Conversion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50">
                            {filteredServices.map((service, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="px-10 py-6">
                                        <div className="text-sm font-black text-[#1D2939] group-hover:text-[#D0771E] transition-colors uppercase tracking-tight">{service.name}</div>
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{service.category}</div>
                                    </td>
                                    <td className="px-10 py-6 text-sm font-black text-gray-500">{service.bookings}</td>
                                    <td className="px-10 py-6 text-sm font-black text-[#1D2939]">{service.revenue}</td>
                                    <td className="px-10 py-6">
                                        <span className="text-sm font-black text-green-600">{service.conversion}</span>
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
        <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <PremiumCard className="p-8 text-center bg-white">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Average Rating</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <h3 className="text-4xl font-black text-[#1D2939]">4.9</h3>
                        <StarIcon className="w-6 h-6 text-orange-400 fill-orange-400" />
                    </div>
                    <p className="text-[9px] font-black text-green-600 uppercase">Top 2% of Vendors</p>
                </PremiumCard>
                <PremiumCard className="p-8 text-center bg-white">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Reviews</p>
                    <h3 className="text-4xl font-black text-[#1D2939]">1,204</h3>
                    <p className="text-[9px] font-black text-gray-400 uppercase mt-2">+12 this month</p>
                </PremiumCard>
                <PremiumCard className="p-8 text-center bg-white">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Response Rate</p>
                    <h3 className="text-4xl font-black text-[#1D2939]">98%</h3>
                    <p className="text-[9px] font-black text-green-600 uppercase mt-2">Elite Status</p>
                </PremiumCard>
            </div>

            {reviews.map((review) => (
                <PremiumCard key={review.id} className="p-10 group hover:border-[#D0771E]/30 transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-16 h-16 rounded-[24px] bg-[#F3F0EB] flex items-center justify-center text-xl font-black text-[#1D2939]">
                                {review.avatar}
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-black text-[#1D2939] uppercase tracking-tight">{review.user}</h4>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-orange-400">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-orange-400' : 'text-gray-200'}`} />
                                        ))}
                                    </div>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{review.date}</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="h-10 px-6 rounded-xl border-gray-100 text-[10px] font-black uppercase tracking-widest hover:text-[#D0771E]">
                            Reply Message
                        </Button>
                    </div>
                    <p className="mt-8 text-sm text-gray-500 font-medium leading-[2] max-w-4xl">
                        "{review.comment}"
                    </p>
                </PremiumCard>
            ))}
        </div>
    );

    const renderBenchmarks = () => (
        <div className="min-h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PremiumCard className="p-10 space-y-10">
                <div>
                    <h3 className="text-xl font-black text-[#1D2939] uppercase tracking-tight mb-2">Market Standing</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">How you compare to similar vendors in Lagos</p>
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
                                    <p className="text-[10px] font-black text-[#1D2939] uppercase tracking-widest mb-1">{item.label}</p>
                                    <p className="text-[9px] font-black text-[#D0771E] uppercase">{item.status}</p>
                                </div>
                                <span className="text-xs font-black text-[#1D2939]">{item.value}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                                <div className="h-full bg-[#1D2939] rounded-full transition-all duration-1000" style={{ width: `${item.value}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </PremiumCard>

            <PremiumCard className="p-10 bg-[#1D2939] text-white flex flex-col justify-center items-center text-center overflow-hidden relative">
                <div className="relative z-10 space-y-6">
                    <div className="w-24 h-24 rounded-[32px] bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
                        <TrophyIcon className="w-12 h-12 text-[#D0771E]" />
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Become a Pro Member</h3>
                    <p className="text-sm text-gray-300 max-w-xs mx-auto leading-relaxed">Get advanced benchmarking tools and access to premium market insights.</p>
                    <Button className="h-16 px-12 rounded-2xl bg-[#D0771E] text-white border-none shadow-2xl shadow-[#D0771E]/20 mt-4 mx-auto block uppercase text-[11px] font-black tracking-widest">Upgrade to Pro</Button>
                </div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#D0771E]/10 blur-3xl"></div>
            </PremiumCard>
        </div>
    );

    return (
        <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col gap-10">
            <PageHeader
                breadcrumb="Operations"
                title="Growth"
                subtitle="Track your business performance and market insights"
                actions={
                    <div className="flex gap-4">
                        <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 bg-white">
                            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                        <Button className="h-12 px-8 rounded-2xl shadow-xl shadow-orange-100 bg-[#D0771E]">
                            <ChartBarIcon className="w-5 h-5 mr-2" />
                            Live Analytics
                        </Button>
                    </div>
                }
            />

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-100">
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
                                placeholder="Search Services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-black placeholder:text-gray-400 focus:ring-2 focus:ring-[#D0771E]/20 focus:bg-white focus:border-[#D0771E] transition-all outline-none"
                            />
                        </div>
                        <Button variant="outline" className="h-11 rounded-xl px-5 border-gray-100">
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

const ArrowDownTrayIcon = ({ className }: { className?: string }) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export default VendorGrowth;
