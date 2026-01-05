import {
    BanknotesIcon,
    ClockIcon,
    ChartBarIcon,
    ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

export interface Invoice {
    id: string;
    clientName: string;
    service: string;
    amount: string;
    date: string;
    status: 'PAID' | 'PENDING' | 'OVERDUE';
    invoiceNumber: string;
    paymentMethod?: string;
    tax?: string;
    notes?: string;
    timestamp: string;
}

export const FINANCE_STATS = [
    { label: 'Total Revenue', value: '₦45,000,000', icon: BanknotesIcon, color: 'bg-emerald-600' },
    { label: 'Outstanding', value: '₦4,000,000', icon: ClockIcon, color: 'bg-[#D0771E]' },
    { label: 'Net Profit', value: '₦5,000,000', icon: ChartBarIcon, color: 'bg-indigo-600' },
    { label: 'Expenses', value: '₦5,000,000', icon: ArrowTrendingDownIcon, color: 'bg-rose-600' },
];

export const INITIAL_PAYMENTS: Invoice[] = [
    {
        id: '1',
        clientName: 'Sarah Johnson',
        service: 'Wedding Photography',
        amount: '₦40,000,000',
        date: 'Aug 15, 2024',
        status: 'PAID',
        invoiceNumber: 'INV-2024-001',
        paymentMethod: 'Bank Transfer',
        tax: '₦2,000,000',
        notes: 'Final payment for the summer wedding package. Includes 10 hours of coverage and premium photo album.',
        timestamp: '2 hours ago'
    },
    {
        id: '2',
        clientName: 'Michael Chen',
        service: 'Event Cinematography',
        amount: '₦25,000,000',
        date: 'Aug 10, 2024',
        status: 'PAID',
        invoiceNumber: 'INV-2024-002',
        paymentMethod: 'Card Payment',
        tax: '₦1,250,000',
        notes: 'Deposit for the corporate gala video services.',
        timestamp: '1 day ago'
    },
];

export const OUTSTANDING_PAYMENTS: Invoice[] = [
    {
        id: '5',
        clientName: 'Sarah Johnson',
        service: 'Wedding Photography',
        amount: '₦40,000,000',
        date: 'Aug 15, 2024',
        status: 'PENDING',
        invoiceNumber: 'INV-2024-005',
        paymentMethod: 'Pending',
        tax: '₦2,000,000',
        notes: 'Awaiting client approval of the updated service contract for the bridal shower.',
        timestamp: '5 hours ago'
    },
    {
        id: '7',
        clientName: 'Jessica Lee',
        service: 'Product Launch',
        amount: '₦8,000,000',
        date: 'Jul 15, 2024',
        status: 'OVERDUE',
        invoiceNumber: 'INV-2024-007',
        paymentMethod: 'Overdue',
        tax: '₦400,000',
        notes: 'Final invoice for the tech summit photography. Second reminder already sent.',
        timestamp: '1 week ago'
    },
    {
        id: '8',
        clientName: 'TechCorp Annual',
        service: 'Corporate Event',
        amount: '₦12,500,000',
        date: 'Sep 01, 2024',
        status: 'PENDING',
        invoiceNumber: 'INV-2024-008',
        paymentMethod: 'Pending',
        tax: '₦625,000',
        notes: 'Main event planning fee, 50% deposit remaining.',
        timestamp: '2 weeks ago'
    }
];

export const REVENUE_DATA = [
    { month: 'Jan', revenue: 12000000, expenses: 5000000 },
    { month: 'Feb', revenue: 15000000, expenses: 4500000 },
    { month: 'Mar', revenue: 8000000, expenses: 6000000 },
    { month: 'Apr', revenue: 22000000, expenses: 7000000 },
    { month: 'May', revenue: 18000000, expenses: 5500000 },
    { month: 'Jun', revenue: 28000000, expenses: 8000000 },
];
