import ApiService, { ApiResponse } from './apiService';
import { ActivityLog } from '@/types';

class ActivityLogService extends ApiService {
  constructor() {
    super('/activity-logs');
  }

  // Get all activities for a user
  async getAllByUser(userId: string): Promise<ApiResponse<ActivityLog[]>> {
    return this.getAll<ActivityLog>({ userId });
  }

  // Add a new activity
  async add(activity: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ApiResponse<ActivityLog>> {
    return this.create<ActivityLog>(activity);
  }

  // Get activities by event
  async getByEvent(eventId: string): Promise<ApiResponse<ActivityLog[]>> {
    return this.getAll<ActivityLog>({ eventId });
  }
}

export default new ActivityLogService();