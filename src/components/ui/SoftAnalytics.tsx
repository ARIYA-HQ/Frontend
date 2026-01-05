import React from 'react';

interface AnalyticsData {
  budgetHealth: number; // Percentage
  planningCompleteness: number; // Percentage
  vendorResponsiveness: number; // Average rating
  upcomingEventsCount: number;
  pendingRSVPs: number;
  completedTasks: number;
  totalTasks: number;
}

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
  icon?: React.ReactNode;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  title, 
  value, 
  description, 
  trend, 
  trendText,
  icon 
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icon || (
              <div className="bg-indigo-100 rounded-md p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            )}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {trend && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {trend === 'up' ? (
                      <svg className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : trend === 'down' ? (
                      <svg className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : null}
                    {trendText}
                  </div>
                )}
              </dd>
            </dl>
            <div className="mt-1">
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SoftAnalyticsProps {
  data: AnalyticsData;
}

const SoftAnalytics: React.FC<SoftAnalyticsProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Planning Analytics</h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnalyticsCard
          title="Budget Health"
          value={`${data.budgetHealth}%`}
          description="Percentage of budget allocated"
          trend={data.budgetHealth > 80 ? 'up' : data.budgetHealth < 50 ? 'down' : 'neutral'}
          trendText={data.budgetHealth > 80 ? "Good allocation" : data.budgetHealth < 50 ? "Low allocation" : "Needs attention"}
          icon={
            <div className={`rounded-md p-2 ${
              data.budgetHealth > 80 ? 'bg-green-100' : data.budgetHealth < 50 ? 'bg-yellow-100' : 'bg-blue-100'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                data.budgetHealth > 80 ? 'text-green-600' : data.budgetHealth < 50 ? 'text-yellow-600' : 'text-blue-600'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          }
        />
        
        <AnalyticsCard
          title="Planning Completeness"
          value={`${data.planningCompleteness}%`}
          description="Progress toward event completion"
          trend={data.planningCompleteness > 70 ? 'up' : data.planningCompleteness < 30 ? 'down' : 'neutral'}
          trendText={data.planningCompleteness > 70 ? "On track" : data.planningCompleteness < 30 ? "Behind schedule" : "Needs attention"}
          icon={
            <div className={`rounded-md p-2 ${
              data.planningCompleteness > 70 ? 'bg-green-100' : data.planningCompleteness < 30 ? 'bg-yellow-100' : 'bg-blue-100'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                data.planningCompleteness > 70 ? 'text-green-600' : data.planningCompleteness < 30 ? 'text-yellow-600' : 'text-blue-600'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          }
        />
        
        <AnalyticsCard
          title="Vendor Responsiveness"
          value={data.vendorResponsiveness.toFixed(1)}
          description="Average vendor rating"
          trend="neutral"
          trendText="Based on recent interactions"
          icon={
            <div className="bg-indigo-100 rounded-md p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          }
        />
        
        <AnalyticsCard
          title="Upcoming Events"
          value={data.upcomingEventsCount}
          description="Events in the next 30 days"
          trend="neutral"
          icon={
            <div className="bg-indigo-100 rounded-md p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          }
        />
        
        <AnalyticsCard
          title="Pending RSVPs"
          value={data.pendingRSVPs}
          description="Guest responses needed"
          trend={data.pendingRSVPs > 10 ? 'down' : data.pendingRSVPs === 0 ? 'up' : 'neutral'}
          trendText={data.pendingRSVPs > 10 ? "Many pending" : data.pendingRSVPs === 0 ? "All responded" : "Few pending"}
          icon={
            <div className={`rounded-md p-2 ${
              data.pendingRSVPs > 10 ? 'bg-yellow-100' : data.pendingRSVPs === 0 ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                data.pendingRSVPs > 10 ? 'text-yellow-600' : data.pendingRSVPs === 0 ? 'text-green-600' : 'text-blue-600'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          }
        />
        
        <AnalyticsCard
          title="Tasks Completed"
          value={`${Math.round((data.completedTasks / data.totalTasks) * 100)}%`}
          description={`${data.completedTasks} of ${data.totalTasks} tasks`}
          trend={data.completedTasks / data.totalTasks > 0.7 ? 'up' : data.completedTasks / data.totalTasks < 0.3 ? 'down' : 'neutral'}
          trendText={data.completedTasks / data.totalTasks > 0.7 ? "Ahead of schedule" : data.completedTasks / data.totalTasks < 0.3 ? "Behind schedule" : "On track"}
          icon={
            <div className={`rounded-md p-2 ${
              data.completedTasks / data.totalTasks > 0.7 ? 'bg-green-100' : data.completedTasks / data.totalTasks < 0.3 ? 'bg-yellow-100' : 'bg-blue-100'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                data.completedTasks / data.totalTasks > 0.7 ? 'text-green-600' : data.completedTasks / data.totalTasks < 0.3 ? 'text-yellow-600' : 'text-blue-600'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default SoftAnalytics;