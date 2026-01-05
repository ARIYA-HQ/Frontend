// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'personal_planner' | 'professional_event_planner' | 'vendor' | 'admin';
  avatar?: string;
}

// Event type
export interface Event {
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
export interface Vendor {
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
export interface Guest {
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
export interface BudgetItem {
  id: string;
  eventId: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  vendorId?: string;
  notes?: string;
}

// Budget type
export interface Budget {
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
export interface AIRecommendation {
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
export interface RegistryItem {
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
export interface Registry {
  id: string;
  eventId: string;
  items: RegistryItem[];
  type: 'gift' | 'cash_fund';
  message: string;
  createdAt: string;
  updatedAt: string;
}

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

// Activity Log type
export interface ActivityLog {
  id: string;
  userId: string;
  eventId?: string;
  action: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}