import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface PageHeaderProps {
    breadcrumb?: string;
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ breadcrumb, title, subtitle, actions }) => {
    const isVendor = window.location.pathname.includes('/dashboard/vendor');
    const dashboardLabel = isVendor ? 'Vendor Dashboard' : 'Planner Dashboard';

    return (
        <div className="mb-10">
            {breadcrumb && (
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    <span>{dashboardLabel}</span>
                    <ChevronRightIcon className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-900 dark:text-white">{breadcrumb}</span>
                </div>
            )}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-black text-[#1D2939] dark:text-white uppercase tracking-tighter leading-none">{title}</h1>
                    {subtitle && (
                        <p className="text-xs text-gray-400 dark:text-gray-400 font-bold uppercase tracking-widest mt-3">{subtitle}</p>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center gap-4">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
