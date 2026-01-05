// Test API connection
import apiClient from '@/lib/apiClient';

export const testApiConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Try to make a simple request to the backend
    const response = await apiClient.get('/health');
    
    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        message: `Connected to backend successfully. Response: ${JSON.stringify(response.data)}`
      };
    } else {
      return {
        success: false,
        message: `Backend returned status: ${response.status}`
      };
    }
  } catch (error: any) {
    console.error('API connection test failed:', error);
    return {
      success: false,
      message: `Failed to connect to backend: ${error.message}`
    };
  }
};