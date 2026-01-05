// User type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'personal_planner' | 'professional_event_planner' | 'vendor' | 'admin';
  avatar?: string;
}

// Event type
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  eventType: string;
  guestCount: number;
  budget: number;
  status: 'planning' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Vendor type
interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  availability: string[];
  services: string[];
  portfolio: string[];
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  address: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending_approval';
  email?: string;
  phone?: string;
}

// Guest type
interface Guest {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  dietaryRestrictions?: string;
  plusOnes: number;
  groupId?: string;
}

// BudgetItem type
interface BudgetItem {
  id: string;
  eventId: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  vendorId?: string;
  notes?: string;
}

// Budget type
interface Budget {
  id: string;
  eventId: string;
  totalBudget: number;
  items: BudgetItem[];
  createdAt: string;
  updatedAt: string;
}

// Booking type
export interface Booking {
  id: string;
  eventId: string;
  vendorId: string;
  status: 'inquiry' | 'quoted' | 'booked' | 'completed' | 'cancelled';
  inquiryDate: string;
  bookingDate?: string;
  completionDate?: string;
  amount?: number;
  notes?: string;
  eventName?: string;
  serviceType?: string;
  clientName?: string;
  eventDate?: string;
  eventLocation?: string;
  budget?: number;
}

// AIRecommendation type
interface AIRecommendation {
  id: string;
  eventId: string;
  type: 'event_idea' | 'budget_allocation' | 'vendor_recommendation' | 'cost_saving_tip';
  title: string;
  description: string;
  confidence: number;
  reason?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

// RegistryItem type
interface RegistryItem {
  id: string;
  eventId: string;
  title: string;
  description: string;
  price: number;
  link?: string;
  purchasedBy?: string;
  quantity: number;
  purchasedQuantity: number;
}

// Registry type
interface Registry {
  id: string;
  eventId: string;
  items: RegistryItem[];
  type: 'gift' | 'cash_fund';
  message: string;
  createdAt: string;
  updatedAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'personal_planner',
    avatar: 'https://via.placeholder.com/40x40'
  },
  {
    id: 'user-2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'vendor',
    avatar: 'https://via.placeholder.com/40x40'
  },
  {
    id: 'user-3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://via.placeholder.com/40x40'
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Summer Wedding',
    description: 'Outdoor garden wedding for 150 guests',
    date: '2024-07-15',
    location: 'Riverside Gardens, New York',
    eventType: 'wedding',
    guestCount: 150,
    budget: 25000,
    status: 'planning',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20',
    userId: 'user-1'
  },
  {
    id: 'event-2',
    title: 'Corporate Conference',
    description: 'Annual tech conference with 500 attendees',
    date: '2024-09-10',
    location: 'Convention Center, San Francisco',
    eventType: 'conference',
    guestCount: 500,
    budget: 75000,
    status: 'confirmed',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-10',
    userId: 'user-1'
  },
  {
    id: 'event-3',
    title: 'Birthday Party',
    description: '30th birthday celebration at private venue',
    date: '2024-05-22',
    location: 'Private Villa, Miami',
    eventType: 'birthday',
    guestCount: 80,
    budget: 12000,
    status: 'completed',
    createdAt: '2024-01-20',
    updatedAt: '2024-05-23',
    userId: 'user-1'
  }
];

// Mock Vendors
export const mockVendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Elegant Catering Co.',
    category: 'Catering Services',
    description: 'Premium catering services for all occasions',
    rating: 4.8,
    reviewCount: 124,
    priceRange: '$$$',
    availability: ['2024-07-15', '2024-07-22', '2024-08-05'],
    services: ['Buffet', 'Plated Service', 'Cocktail Reception'],
    portfolio: [
      'https://via.placeholder.com/300x200',
      'https://via.placeholder.com/300x200',
      'https://via.placeholder.com/300x200'
    ],
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'info@elegantcatering.com',
      website: 'www.elegantcatering.com'
    },
    address: '123 Main St, New York, NY',
    createdAt: '2023-05-10',
    status: 'active'
  },
  {
    id: 'vendor-2',
    name: 'Golden Moments Photography',
    category: 'Photographers',
    description: 'Capturing life\'s precious moments',
    rating: 4.9,
    reviewCount: 89,
    priceRange: '$$',
    availability: ['2024-07-15', '2024-07-16', '2024-07-18'],
    services: ['Wedding Photography', 'Portrait Sessions', 'Event Coverage'],
    portfolio: [
      'https://via.placeholder.com/300x200',
      'https://via.placeholder.com/300x200',
      'https://via.placeholder.com/300x200'
    ],
    contactInfo: {
      phone: '+1 (555) 987-6543',
      email: 'hello@goldenmomentsphoto.com',
      website: 'www.goldenmomentsphoto.com'
    },
    address: '456 Oak Ave, New York, NY',
    createdAt: '2023-03-15',
    status: 'active'
  },
  {
    id: 'vendor-3',
    name: 'Bella Events Decor',
    category: 'Decorators',
    description: 'Transforming spaces into magical experiences',
    rating: 4.7,
    reviewCount: 67,
    priceRange: '$$',
    availability: ['2024-07-15', '2024-07-20', '2024-08-10'],
    services: ['Wedding Decor', 'Corporate Events', 'Birthday Parties'],
    portfolio: [
      'https://via.placeholder.com/300x200',
      'https://via.placeholder.com/300x200',
      'https://via.placeholder.com/300x200'
    ],
    contactInfo: {
      phone: '+1 (555) 456-7890',
      email: 'contact@bellaeventsdecor.com',
      website: 'www.bellaeventsdecor.com'
    },
    address: '789 Pine St, New York, NY',
    createdAt: '2023-01-22',
    status: 'active'
  }
];

// Mock Guests
export const mockGuests: Guest[] = [
  {
    id: 'guest-1',
    eventId: 'event-1',
    name: 'Michael Thompson',
    email: 'michael@example.com',
    phone: '+1 (555) 111-2222',
    rsvpStatus: 'confirmed',
    dietaryRestrictions: 'Vegetarian',
    plusOnes: 1,
    groupId: 'family'
  },
  {
    id: 'guest-2',
    eventId: 'event-1',
    name: 'Jennifer Davis',
    email: 'jennifer@example.com',
    phone: '+1 (555) 333-4444',
    rsvpStatus: 'pending',
    plusOnes: 0,
    groupId: 'friends'
  },
  {
    id: 'guest-3',
    eventId: 'event-1',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    phone: '+1 (555) 555-6666',
    rsvpStatus: 'declined',
    plusOnes: 2,
    groupId: 'work'
  }
];

// Mock Budget Items
const budgetItems: BudgetItem[] = [
  {
    id: 'budget-item-1',
    eventId: 'event-1',
    category: 'Venue',
    allocatedAmount: 8000,
    spentAmount: 0,
    vendorId: 'vendor-4',
    notes: 'Garden rental with outdoor space'
  },
  {
    id: 'budget-item-2',
    eventId: 'event-1',
    category: 'Catering',
    allocatedAmount: 12000,
    spentAmount: 0,
    vendorId: 'vendor-1',
    notes: '3-course plated dinner for 150 guests'
  },
  {
    id: 'budget-item-3',
    eventId: 'event-1',
    category: 'Photography',
    allocatedAmount: 3000,
    spentAmount: 0,
    vendorId: 'vendor-2',
    notes: 'Full day coverage with engagement session'
  },
  {
    id: 'budget-item-4',
    eventId: 'event-1',
    category: 'Decor',
    allocatedAmount: 2000,
    spentAmount: 0,
    vendorId: 'vendor-3',
    notes: 'Floral arrangements and centerpieces'
  }
];

// Mock Budget
export const mockBudget: Budget = {
  id: 'budget-1',
  eventId: 'event-1',
  totalBudget: 25000,
  items: budgetItems,
  createdAt: '2024-01-15',
  updatedAt: '2024-02-20'
};

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    eventId: 'event-1',
    vendorId: 'vendor-1',
    status: 'inquiry',
    inquiryDate: '2024-02-15',
    notes: 'Requested quote for 150-person wedding reception',
    eventName: 'Summer Wedding',
    serviceType: 'Catering',
    clientName: 'Alex Johnson',
    eventDate: '2024-07-15',
    eventLocation: 'Riverside Gardens, New York',
    budget: 12000
  },
  {
    id: 'booking-2',
    eventId: 'event-1',
    vendorId: 'vendor-2',
    status: 'quoted',
    inquiryDate: '2024-02-16',
    amount: 3000,
    notes: 'Full day photography package',
    eventName: 'Summer Wedding',
    serviceType: 'Photography',
    clientName: 'Alex Johnson',
    eventDate: '2024-07-15',
    eventLocation: 'Riverside Gardens, New York',
    budget: 3000
  },
  {
    id: 'booking-3',
    eventId: 'event-1',
    vendorId: 'vendor-3',
    status: 'booked',
    inquiryDate: '2024-02-17',
    bookingDate: '2024-02-20',
    amount: 2000,
    notes: 'Floral arrangements and decor',
    eventName: 'Summer Wedding',
    serviceType: 'Decor',
    clientName: 'Alex Johnson',
    eventDate: '2024-07-15',
    eventLocation: 'Riverside Gardens, New York',
    budget: 2000
  }
];

// Mock AI Recommendations
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'ai-rec-1',
    eventId: 'event-1',
    type: 'event_idea',
    title: 'Garden Party Theme',
    description: 'Consider a garden party theme to complement the outdoor venue. This will enhance the natural beauty of the location.',
    confidence: 0.92,
    reason: 'Your venue has beautiful outdoor spaces that would be perfect for a garden party theme.',
    createdAt: '2024-02-20'
  },
  {
    id: 'ai-rec-2',
    eventId: 'event-1',
    type: 'budget_allocation',
    title: 'Budget Reallocation',
    description: 'Based on your guest count and venue, consider increasing catering budget by 10% and reducing decor budget by 5% for optimal allocation.',
    confidence: 0.87,
    reason: 'Catering typically has the greatest impact on guest satisfaction for outdoor events.',
    metadata: {
      category: 'Catering',
      adjustment: '+10%',
      targetCategory: 'Decor',
      targetAdjustment: '-5%'
    },
    createdAt: '2024-02-20'
  },
  {
    id: 'ai-rec-3',
    eventId: 'event-1',
    type: 'vendor_recommendation',
    title: 'Catering Recommendation',
    description: 'Elegant Catering Co. would be an excellent match for your garden wedding. They have experience with outdoor events and positive reviews.',
    confidence: 0.95,
    reason: 'They have a 4.8 rating and specialize in outdoor events similar to your venue.',
    metadata: {
      vendorId: 'vendor-1',
      reason: 'Experience with outdoor events and high ratings'
    },
    createdAt: '2024-02-20'
  },
  {
    id: 'ai-rec-4',
    eventId: 'event-1',
    type: 'cost_saving_tip',
    title: 'Cost Saving Tip',
    description: 'Consider weekday event to save 20% on venue costs. Saturday to Friday shift could save you $1,600.',
    confidence: 0.85,
    reason: 'Weekday events typically cost 20% less than weekend events with similar quality.',
    createdAt: '2024-02-20'
  }
];

// Mock Registry Items
export const mockRegistryItems: RegistryItem[] = [
  {
    id: 'item-1',
    eventId: 'event-1',
    title: 'Honeymoon Fund',
    description: 'Help us start our new life together',
    price: 100,
    link: 'https://example.com/honeymoon-fund',
    quantity: 10,
    purchasedQuantity: 3
  },
  {
    id: 'item-2',
    eventId: 'event-1',
    title: 'Kitchen Aid Stand Mixer',
    description: 'Our dream kitchen appliance',
    price: 379,
    link: 'https://example.com/kitchenaid',
    quantity: 1,
    purchasedQuantity: 0
  }
];

// Mock Registry
export const mockRegistry: Registry = {
  id: 'registry-1',
  eventId: 'event-1',
  items: mockRegistryItems,
  type: 'gift',
  message: 'We would love to start our new life together with your help. Thank you for celebrating with us!',
  createdAt: '2024-01-20',
  updatedAt: '2024-02-15'
};

// Review type
export interface Review {
  id: string;
  vendorId: string;
  eventId?: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
  createdAt: string;
}

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    vendorId: 'vendor-1',
    clientName: 'Alex Johnson',
    rating: 5,
    comment: 'Outstanding catering service! The food was delicious and presentation was beautiful.',
    date: '2024-02-15',
    createdAt: '2024-02-15'
  },
  {
    id: 'review-2',
    vendorId: 'vendor-1',
    clientName: 'Sarah Williams',
    rating: 4,
    comment: 'Great food and service. Would recommend to others.',
    date: '2024-02-10',
    createdAt: '2024-02-10'
  },
  {
    id: 'review-3',
    vendorId: 'vendor-2',
    clientName: 'Michael Thompson',
    rating: 5,
    comment: 'The photographer captured all the special moments perfectly. Highly recommend!',
    date: '2024-02-05',
    createdAt: '2024-02-05'
  }
];