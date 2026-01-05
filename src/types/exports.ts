/**
 * Type Exports
 * Centralized exports for all TypeScript types and interfaces
 */

// User Types
export type { User } from './index';

// Event Types
export type { Event } from './index';

// Vendor Types
export type { Vendor } from './index';

// Guest Types
export type { Guest } from './index';

// Budget Types
export type { Budget, BudgetItem } from './index';

// Booking Types
export type { Booking } from './index';

// AI Recommendation Types
export type { AIRecommendation } from './index';

// Registry Types
export type { Registry, RegistryItem } from './index';

// Review Types
export type { Review } from './index';

// Activity Log Types
export interface ActivityLog {
  id: string;
  userId: string;
  eventId?: string;
  action: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Re-export all types from main index
export * from './index';

