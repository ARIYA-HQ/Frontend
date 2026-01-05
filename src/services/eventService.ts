import ApiService, { ApiResponse } from './apiService';
import { Event } from '@/types';

class EventService extends ApiService {
  constructor() {
    super('/events');
  }

  async getEventsByUser(userId: string): Promise<ApiResponse<Event[]>> {
    return this.getAll<Event>({ userId });
  }

  async getEventsByStatus(status: string): Promise<ApiResponse<Event[]>> {
    return this.getAll<Event>({ status });
  }
}

export default new EventService();