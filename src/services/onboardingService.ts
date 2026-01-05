import apiClient from '@/lib/apiClient';

interface OnboardingStatus {
  userId: string;
  completed: boolean;
  steps: string[];
  completedAt?: string;
}

class OnboardingService {
  async getStatus(userId: string): Promise<{ data: OnboardingStatus; success: boolean; message?: string }> {
    try {
      const response = await apiClient.get<OnboardingStatus>(`/onboarding/${userId}`);
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
      await apiClient.post('/onboarding', payload);
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
      await apiClient.delete(`/onboarding/${userId}`);
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
