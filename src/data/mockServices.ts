export interface Service {
    id: string;
    name: string;
    category: 'Wedding Planning' | 'Corporate Events' | 'Party Planning' | 'Consultation' | 'Other';
    price: number;
    description: string;
    features: string[];
    active: boolean;
    image?: string;
}

export const MOCK_SERVICES: Service[] = [
    {
        id: 'serv-1',
        name: 'Full Wedding Planning',
        category: 'Wedding Planning',
        price: 3500,
        description: 'Complete end-to-end wedding planning service. We handle everything from venue selection to day-of coordination.',
        features: ['Venue Selection', 'Vendor Management', 'Budget Tracking', 'Day-of Coordination'],
        active: true,
        image: 'bg-rose-100 text-rose-600'
    },
    {
        id: 'serv-2',
        name: 'Partial Planning Package',
        category: 'Wedding Planning',
        price: 2000,
        description: 'Perfect for couples who have started planning but need professional guidance for the final stretch.',
        features: ['Vendor Recommendations', 'Timeline Creation', 'Month-of Coordination'],
        active: true,
        image: 'bg-pink-100 text-pink-600'
    },
    {
        id: 'serv-3',
        name: 'Corporate Gala Management',
        category: 'Corporate Events',
        price: 5000,
        description: 'Professional management for large-scale corporate galas and award ceremonies.',
        features: ['Event Design', 'Audio/Visual Setup', 'Guest Registration', 'Catering Management'],
        active: true,
        image: 'bg-indigo-100 text-indigo-600'
    },
    {
        id: 'serv-4',
        name: 'Birthday Party Coordination',
        category: 'Party Planning',
        price: 800,
        description: 'Fun and stress-free planning for milestone birthdays.',
        features: ['Theme Development', 'Decor Setup', 'Entertainment Booking'],
        active: true,
        image: 'bg-orange-100 text-orange-600'
    },
    {
        id: 'serv-5',
        name: 'Initial Consultation',
        category: 'Consultation',
        price: 150,
        description: 'One-hour consultation to brainstorm ideas and get professional advice.',
        features: ['1 Hour Session', 'Budget Assessment', 'Vendor Recommendations'],
        active: true,
        image: 'bg-gray-100 text-gray-600'
    }
];
