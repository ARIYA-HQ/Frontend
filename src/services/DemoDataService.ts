
// Mock Interfaces
export interface DemoInquiry {
    id: string;
    clientName: string;
    email: string;
    type: string;
    date: string;
    status: 'New' | 'Contacted' | 'Meeting' | 'Proposal' | 'Won' | 'Lost';
    budget: string;
    eventDate: string;
    details: string;
    read: boolean;
}

export interface DemoMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isAdmin?: boolean; // If true, sent by the user (Vendor/Planner)
}

export interface DemoConversation {
    id: string;
    participantName: string;
    participantRole: string; // 'Vendor' or 'Planner'
    participantAvatar?: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    messages: DemoMessage[];
}

const INQUIRIES_KEY = 'ariya_demo_inquiries';
const CONVERSATIONS_KEY = 'ariya_demo_conversations';

// Initial Mock Data (to populate if empty)
const INITIAL_INQUIRIES: DemoInquiry[] = [
    {
        id: 'inq-1',
        clientName: 'Sarah & James',
        email: 'sarah.j@example.com',
        type: 'Wedding',
        date: '2024-03-10',
        status: 'New',
        budget: '₦2,500,000',
        eventDate: '2024-12-15',
        details: 'Looking for full decoration service for 500 guests.',
        read: false
    },
    {
        id: 'inq-2',
        clientName: 'TechCorp Gala',
        email: 'events@techcorp.ng',
        type: 'Corporate',
        date: '2024-03-08',
        status: 'Contacted',
        budget: '₦5,000,000',
        eventDate: '2024-11-20',
        details: 'Annual end of year gala dinner.',
        read: true
    }
];

export const DemoDataService = {
    // --- INQUIRIES ---

    getInquiries: (): DemoInquiry[] => {
        const stored = localStorage.getItem(INQUIRIES_KEY);
        if (!stored) {
            localStorage.setItem(INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES));
            return INITIAL_INQUIRIES;
        }
        return JSON.parse(stored);
    },

    addInquiry: (inquiry: Omit<DemoInquiry, 'id' | 'date' | 'status' | 'read'>): DemoInquiry => {
        const inquiries = DemoDataService.getInquiries();
        const newInquiry: DemoInquiry = {
            ...inquiry,
            id: `inq-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            status: 'New',
            read: false
        };
        const updated = [newInquiry, ...inquiries];
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
        return newInquiry;
    },

    updateInquiryStatus: (id: string, status: DemoInquiry['status']) => {
        const inquiries = DemoDataService.getInquiries();
        const updated = inquiries.map(inq => inq.id === id ? { ...inq, status } : inq);
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    },

    // --- CONVERSATIONS ---

    getConversations: (): DemoConversation[] => {
        const stored = localStorage.getItem(CONVERSATIONS_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    createConversation: (participantName: string, initialMessage?: string): DemoConversation => {
        const conversations = DemoDataService.getConversations();

        // Check if exists
        const existing = conversations.find(c => c.participantName === participantName);
        if (existing) {
            if (initialMessage) {
                DemoDataService.addMessage(existing.id, initialMessage, true);
            }
            return existing;
        }

        const newConv: DemoConversation = {
            id: `conv-${Date.now()}`,
            participantName,
            participantRole: 'Vendor', // Defaulting to Vendor for Planner view
            participantAvatar: `https://ui-avatars.com/api/?name=${participantName}&background=random`,
            lastMessage: initialMessage || 'Started a conversation',
            lastMessageTime: 'Just now',
            unreadCount: 0,
            messages: initialMessage ? [{
                id: `msg-${Date.now()}`,
                senderId: 'user',
                text: initialMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isAdmin: true
            }] : []
        };

        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify([newConv, ...conversations]));
        return newConv;
    },

    addMessage: (conversationId: string, text: string, isAdmin: boolean = true) => {
        const conversations = DemoDataService.getConversations();
        const updated = conversations.map(c => {
            if (c.id === conversationId) {
                return {
                    ...c,
                    lastMessage: text,
                    lastMessageTime: 'Just now',
                    messages: [...c.messages, {
                        id: `msg-${Date.now()}`,
                        senderId: isAdmin ? 'user' : 'other',
                        text,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isAdmin
                    }]
                };
            }
            return c;
        });
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(updated));
    },

    clearData: () => {
        localStorage.removeItem(INQUIRIES_KEY);
        localStorage.removeItem(CONVERSATIONS_KEY);
    }
};
