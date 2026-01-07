import {
    EyeIcon,
    ChatBubbleLeftRightIcon,
    ArrowTrendingUpIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export const GROWTH_STATS = [
    { label: 'Profile Views', value: '12,450', icon: EyeIcon, color: 'bg-blue-600', change: '+12.5%' },
    { label: 'Enquiries', value: '156', icon: ChatBubbleLeftRightIcon, color: 'bg-orange-600', change: '+8.2%' },
    { label: 'Conversion Rate', value: '3.2%', icon: ArrowTrendingUpIcon, color: 'bg-emerald-600', change: '-1.5%' },
    { label: 'Avg Response', value: '2.3 Days', icon: ClockIcon, color: 'bg-purple-600', change: '+0.5%' },
];

export const MONTHLY_DATA = [
    { month: 'Jan', views: 800, inquiries: 30, revenue: 1500000 },
    { month: 'Feb', views: 950, inquiries: 35, revenue: 1800000 },
    { month: 'Mar', views: 1100, inquiries: 42, revenue: 2500000 },
    { month: 'Apr', views: 1050, inquiries: 38, revenue: 2100000 },
    { month: 'May', views: 1200, inquiries: 45, revenue: 2800000 },
    { month: 'Jun', views: 1350, inquiries: 48, revenue: 3200000 },
    { month: 'Jul', views: 1250, inquiries: 44, revenue: 2900000 }
];

export const CUSTOMER_SOURCES = [
    { source: 'Ariya Core', value: 85, color: '#D0771E' },
    { source: 'Direct Search', value: 10, color: '#1D2939' },
    { source: 'Other', value: 5, color: '#98A2B3' },
];

export const TOP_SERVICES = [
    { name: 'Premium Wedding Package', category: 'Wedding Planning', bookings: 24, revenue: '₦30,000,000', conversion: '22.4%' },
    { name: 'Basic Wedding Package', category: 'Wedding Planning', bookings: 32, revenue: '₦19,200,000', conversion: '18.7%' },
    { name: 'Birthday Party Setup', category: 'Party Planning', bookings: 18, revenue: '₦9,000,000', conversion: '15.2%' },
];

export const REVIEWS = [
    { id: 1, user: 'Sarah Johnson', rating: 5, date: '2 days ago', comment: 'The service was absolutely exceptional. The attention to detail and professionalism made our wedding day stress-free and beautiful.', avatar: 'S' },
    { id: 2, user: 'Michael Chen', rating: 4, date: '1 week ago', comment: 'Great experience overall. Communication was smooth and the execution was on point. Highly recommended for corporate events.', avatar: 'M' },
    { id: 3, user: 'Emily Davis', rating: 5, date: '2 weeks ago', comment: 'Beyond my expectations! Antigravity really knows how to deliver a premium experience. Will definitely book again.', avatar: 'E' },
];
