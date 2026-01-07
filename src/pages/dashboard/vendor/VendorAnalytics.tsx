import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  ArrowDownTrayIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import PageHeader from '../../../components/ui/PageHeader';
import PremiumCard from '../../../components/ui/PremiumCard';
import StatCard from '../../../components/dashboard/StatCard';
import { Button } from '../../../components/ui/Button';
import { GROWTH_STATS, MONTHLY_DATA, TOP_SERVICES, CUSTOMER_SOURCES } from '../../../data/mockGrowth';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const VendorAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7m');

  // Dynamic Data Filtering
  const getFilteredData = () => {
    switch (timeRange) {
      case '7m': return MONTHLY_DATA.slice(-7);
      case 'YTD': return MONTHLY_DATA.slice(0, 7); // Simulating Jan-July
      default: return MONTHLY_DATA;
    }
  };

  const currentData = getFilteredData();

  // Revenue & Engagement Line Chart Data
  const lineData = {
    labels: currentData.map(d => d.month),
    datasets: [
      {
        label: 'Inquiries',
        data: currentData.map(d => d.inquiries),
        borderColor: '#D0771E',
        backgroundColor: 'rgba(208, 119, 30, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Revenue (M)',
        data: currentData.map(d => d.revenue / 1000000),
        borderColor: '#1D2939',
        backgroundColor: 'rgba(29, 41, 57, 0.05)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  const handleExportCSV = () => {
    const headers = 'Month,Inquiries,Revenue\n';
    const rows = MONTHLY_DATA.map(d => `${d.month},${d.inquiries},${d.revenue}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ariya_analytics_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Customer Distribution Doughnut Data
  const doughnutData = {
    labels: CUSTOMER_SOURCES.map((s: { source: string }) => s.source),
    datasets: [{
      data: CUSTOMER_SOURCES.map((s: { value: number }) => s.value),
      backgroundColor: CUSTOMER_SOURCES.map((s: { color: string }) => s.color),
      borderColor: 'transparent',
      hoverOffset: 4
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1D2939',
        padding: 12,
        titleFont: { size: 10, weight: 'bold' as const },
        bodyFont: { size: 12 },
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      y: {
        grid: { display: true, color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { size: 10 } }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 h-full flex flex-col gap-6 sm:gap-10 dark:bg-gray-900 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader
        breadcrumb="Vendor Dashboard"
        title="Analytics"
        subtitle="Track your business performance and insights"
        actions={
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0">
            <Button
              variant="outline"
              onClick={handleExportCSV}
              className="h-10 sm:h-12 px-4 sm:px-6 rounded-2xl border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white group text-xs sm:text-sm whitespace-nowrap"
            >
              <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
              Download CSV
            </Button>
            <Button className="h-10 sm:h-12 px-6 sm:px-8 rounded-2xl shadow-xl shadow-[#D0771E]/20 dark:shadow-none bg-[#D0771E] text-white text-xs sm:text-sm whitespace-nowrap">
              <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Update Data
            </Button>
          </div>
        }
      />

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {GROWTH_STATS.map((stat, idx) => (
          <div key={idx} className="relative group">
            <StatCard
              label={stat.label}
              value={stat.value}
              icon={<stat.icon className="w-5 h-5 text-white" />}
              iconBgColor={stat.color}
            />
            <div className={`absolute top-8 right-8 text-[9px] font-black uppercase tracking-widest ${stat.change.startsWith('+') ? 'text-green-500' : 'text-rose-500'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Line Chart */}
        <PremiumCard className="lg:col-span-2 p-10 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Earning & Engagement</h3>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Revenue (M) vs Inquiries</p>
            </div>
            <div className="flex gap-2 p-1 bg-gray-50 dark:bg-gray-900 rounded-xl">
              {['7m', '12m', 'YTD'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${timeRange === range ? 'bg-white dark:bg-gray-800 text-[#D0771E] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px] w-full mt-4">
            <Line data={lineData} options={chartOptions} />
          </div>
        </PremiumCard>

        {/* Traffic Sources Doughnut */}
        <PremiumCard className="p-10 flex flex-col gap-8">
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Client Discovery</h3>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Where your clients find you</p>
          </div>
          <div className="h-[250px] relative">
            <Doughnut data={doughnutData} options={{ ...chartOptions, cutout: '75%' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-[#1D2939] dark:text-white">85%</span>
              <span className="text-[9px] font-black text-gray-400 uppercase">Ariya Core</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-auto">
            {CUSTOMER_SOURCES.map((s: { color: string; source: string }, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div>
                <span className="text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase truncate">{s.source}</span>
              </div>
            ))}
          </div>
        </PremiumCard>
      </div>

      {/* Secondary Table Row */}
      <PremiumCard className="p-0 overflow-hidden border-gray-100 dark:border-gray-800">
        <div className="p-10 border-b border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-between items-center">
          <h3 className="text-xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">Market Conversion Ranking</h3>
          <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#D0771E]">View Full Report</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F3F0EB]/30 dark:bg-gray-800/50">
                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Service Tier</th>
                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Total Inquiries</th>
                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Est. Value</th>
                <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800">
              {TOP_SERVICES.map((service, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors group bg-white dark:bg-gray-900">
                  <td className="px-10 py-6">
                    <div className="text-sm font-black text-[#1D2939] dark:text-white group-hover:text-[#D0771E] transition-colors">{service.name}</div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{service.category}</div>
                  </td>
                  <td className="px-10 py-6 text-sm font-black text-gray-500 dark:text-gray-400">{service.bookings * 3}</td>
                  <td className="px-10 py-6 text-sm font-black text-[#1D2939] dark:text-white">{service.revenue}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: service.conversion }}></div>
                      </div>
                      <span className="text-xs font-black text-green-600">{service.conversion}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>
    </div>
  );
};

export default VendorAnalytics;

