export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'pending' | 'completed' | 'archived';
    lastContact: string;
    nextEvent?: string;
    eventType?: string;
    totalEvents: number;
    totalSpent: number;
    avatar?: string;
    location: string;
}

export const MOCK_CLIENTS: Client[] = [
    {
        id: '1',
        name: 'Sarah & James Wedding',
        email: 'sarah.j@gmail.com',
        phone: '+1 (555) 123-4567',
        status: 'active',
        lastContact: '2 hours ago',
        nextEvent: 'Oct 24, 2024',
        eventType: 'Wedding',
        totalEvents: 3,
        totalSpent: 45000,
        location: 'New York, NY',
        avatar: 'bg-rose-100 text-rose-600'
    },
    {
        id: '2',
        name: 'TechCorp Annual Summit',
        email: 'events@techcorp.com',
        phone: '+1 (555) 987-6543',
        status: 'active',
        lastContact: '1 day ago',
        nextEvent: 'Nov 12, 2024',
        eventType: 'Corporate',
        totalEvents: 5,
        totalSpent: 120000,
        location: 'San Francisco, CA',
        avatar: 'bg-blue-100 text-blue-600'
    },
    {
        id: '3',
        name: 'Miller 50th Anniversary',
        email: 'jmiller@yahoo.com',
        phone: '+1 (555) 456-7890',
        status: 'pending',
        lastContact: '3 days ago',
        nextEvent: 'Dec 05, 2024',
        eventType: 'Anniversary',
        totalEvents: 1,
        totalSpent: 15000,
        location: 'Chicago, IL',
        avatar: 'bg-amber-100 text-amber-600'
    },
    {
        id: '4',
        name: 'Green Gala 2024',
        email: 'contact@greengala.org',
        phone: '+1 (555) 234-5678',
        status: 'active',
        lastContact: '1 week ago',
        nextEvent: 'Nov 30, 2024',
        eventType: 'Galas',
        totalEvents: 2,
        totalSpent: 85000,
        location: 'Austin, TX',
        avatar: 'bg-emerald-100 text-emerald-600'
    },
    {
        id: '5',
        name: 'David\'s Bar Mitzvah',
        email: 'susan.weiss@gmail.com',
        phone: '+1 (555) 345-6789',
        status: 'completed',
        lastContact: '2 weeks ago',
        nextEvent: undefined,
        eventType: 'Mitzvah',
        totalEvents: 1,
        totalSpent: 28000,
        location: 'Miami, FL',
        avatar: 'bg-purple-100 text-purple-600'
    },
    {
        id: '6',
        name: 'Winter Product Launch',
        email: 'launch@innovate.io',
        phone: '+1 (555) 678-9012',
        status: 'pending',
        lastContact: '1 day ago',
        nextEvent: 'Jan 15, 2025',
        eventType: 'Corporate',
        totalEvents: 1,
        totalSpent: 55000,
        location: 'Seattle, WA',
        avatar: 'bg-indigo-100 text-indigo-600'
    },
    {
        id: '7',
        name: 'Elena\'s Quinceañera',
        email: 'garcia.family@outlook.com',
        phone: '+1 (555) 789-0123',
        status: 'active',
        lastContact: '4 hours ago',
        nextEvent: 'Feb 20, 2025',
        eventType: 'Birthday',
        totalEvents: 1,
        totalSpent: 22000,
        location: 'Los Angeles, CA',
        avatar: 'bg-pink-100 text-pink-600'
    }
];
