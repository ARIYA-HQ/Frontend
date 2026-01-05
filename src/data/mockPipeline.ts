import {
    BanknotesIcon,
    ClipboardDocumentListIcon,
    ChartPieIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export const PIPELINE_STATS = [
    { label: 'Inquiries Value', value: '₦45,000,000', icon: BanknotesIcon, color: 'bg-[#D0771E]' },
    { label: 'Total Inquiries', value: '1,200', icon: ClipboardDocumentListIcon, color: 'bg-indigo-600' },
    { label: 'Acceptance Rate', value: '54%', icon: ChartPieIcon, color: 'bg-emerald-600' },
    { label: 'Avg Response Time', value: '2.3 Days', icon: ClockIcon, color: 'bg-purple-600' },
];

export const MOCK_INQUIRIES = [
    {
        id: 1,
        company: 'Unity Bank',
        event: 'Product Launch Event',
        date: 'March 15, 2025',
        budget: '₦5,000,000 - ₦8,000,000',
        guests: '100 people',
        location: 'Asokoro Abuja, Nigeria',
        description: "We're organizing our annual company retreat and need comprehensive photography coverage. The event spans 3 days and includes keynote sessions, breakout meetings, networking events, and team building activities...",
        status: 'ACCEPTED',
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        company: 'Access Holdings',
        event: 'Annual General Meeting',
        date: 'April 20, 2025',
        budget: '₦12,000,000 - ₦15,000,000',
        guests: '500 people',
        location: 'Victoria Island, Lagos',
        description: "Require full event planning and coordination for our AGM. This includes venue setup, catering for 500 guests, AV systems, and live streaming capabilities.",
        status: 'SENT',
        timestamp: '5 hours ago'
    },
    {
        id: 3,
        company: 'TechStart Summit',
        event: 'Tech Conference',
        date: 'May 10, 2025',
        budget: '₦3,000,000 - ₦4,500,000',
        guests: '200 people',
        location: 'Yaba, Lagos',
        description: "Looking for a catering vendor for our 2-day tech summit. Must provide breakfast, lunch, and coffee breaks. Vegetarian and vegan options required.",
        status: 'VIEWED',
        timestamp: '1 day ago'
    }
];

