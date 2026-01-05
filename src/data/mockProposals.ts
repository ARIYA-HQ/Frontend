export interface Proposal {
    id: string;
    title: string;
    clientName: string;
    clientId: string; // To link to client details if needed
    value: number;
    status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined';
    dueDate: string;
    items: number; // Number of services/items in proposal
    tags: string[];
    description?: string;
}

export const MOCK_PROPOSALS: Proposal[] = [
    {
        id: 'prop-1',
        title: 'Full Wedding Planning Package',
        clientName: 'Sarah & James Wedding',
        clientId: 'client-1',
        value: 15000,
        status: 'accepted',
        dueDate: '2024-02-15',
        items: 4,
        tags: ['Wedding', 'Full Service'],
        description: 'Comprehensive planning services from start to finish.'
    },
    {
        id: 'prop-2',
        title: 'Photography & Videography Bundle',
        clientName: 'TechCorp Annual Summit',
        clientId: 'client-2',
        value: 8500,
        status: 'sent',
        dueDate: '2024-03-01',
        items: 2,
        tags: ['Corporate', 'Photography'],
        description: 'Event coverage including 2 photographers and 1 videographer.'
    },
    {
        id: 'prop-3',
        title: 'Catering Proposal - Buffet Style',
        clientName: 'Miller 50th Anniversary',
        clientId: 'client-3',
        value: 12000,
        status: 'draft',
        dueDate: '2024-02-28',
        items: 15,
        tags: ['Catering', 'Buffet'],
        description: 'Buffet selection for 150 guests including drinks.'
    },
    {
        id: 'prop-4',
        title: 'Venue Decoration & Floral Design',
        clientName: 'Green Gala 2024',
        clientId: 'client-4',
        value: 25000,
        status: 'viewed',
        dueDate: '2024-02-10',
        items: 8,
        tags: ['Decor', 'Floral'],
        description: 'Theme: Enchanted Forest. Includes centerpieces and stage decor.'
    },
    {
        id: 'prop-5',
        title: 'DJ & Sound System Setup',
        clientName: 'David\'s Bar Mitzvah',
        clientId: 'client-5',
        value: 3000,
        status: 'declined',
        dueDate: '2024-01-20',
        items: 3,
        tags: ['Entertainment', 'Audio'],
        description: 'Professional DJ service for 5 hours.'
    },
    {
        id: 'prop-6',
        title: 'Coordination Day-of Service',
        clientName: 'Elena\'s Quinceañera',
        clientId: 'client-7',
        value: 2500,
        status: 'sent',
        dueDate: '2024-03-10',
        items: 1,
        tags: ['Coordination'],
        description: 'On-site coordination for the main event day.'
    }
];
