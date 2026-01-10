import { api } from '@/api/client';

// Define local interface if not exported globally
interface OnboardingStatusLocal {
  userId: string;
  completed: boolean;
  steps: string[];
  completedAt?: string;
}

class OnboardingService {
  async getStatus(userId: string): Promise<{ data: OnboardingStatusLocal; success: boolean; message?: string }> {
    try {
      // Endpoint: GET /onboarding/{userId} - Assuming this exists on backend even if not in SDK shortcuts
      const response = await api.instance.get<OnboardingStatusLocal>(`/onboarding/${userId}`);
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return {
        data: { userId, completed: false, steps: [] },
        success: false,
        message: error.message || 'Error fetching onboarding status',
      };
    }
  }

  async markAsCompleted(userId: string, steps: string[] = []): Promise<{ success: boolean; message?: string }> {
    try {
      const payload = {
        userId,
        completed: true,
        steps,
        completedAt: new Date().toISOString()
      };
      // Endpoint: POST /onboarding - Assuming this exists
      await api.instance.post('/onboarding', payload);
      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Error updating onboarding status',
      };
    }
  }

  async reset(userId: string): Promise<{ success: boolean; message?: string }> {
    try {
      // Endpoint: DELETE /onboarding/{userId}
      await api.instance.delete(`/onboarding/${userId}`);
      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Error resetting onboarding status',
      };
    }
  }
}

export default new OnboardingService();
