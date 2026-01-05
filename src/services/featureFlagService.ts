import ApiService, { ApiResponse } from './apiService';

// Feature flag service
export interface FeatureFlags {
  adminFeatures: boolean;
  experimentalAI: boolean;
  premiumFeatures: boolean;
  betaTesting: boolean;
  vendorDashboard: boolean;
  eventTemplates: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  adminFeatures: false,
  experimentalAI: false,
  premiumFeatures: false,
  betaTesting: false,
  vendorDashboard: true,
  eventTemplates: true
};

class FeatureFlagService extends ApiService {
  constructor() {
    super('/feature-flags');
  }

  async getAll(userId?: string): Promise<ApiResponse<FeatureFlags>> {
    try {
      const params = userId ? { userId } : {};
      const response = await super.getAll<FeatureFlags>(params);
      if (response.status === 'success') {
        return response;
      }
      // Return default flags on error
      return {
        status: 'error',
        data: DEFAULT_FLAGS,
        error: response.error || {
          code: 'FEATURE_FLAGS_ERROR',
          message: 'Error fetching feature flags',
        },
      };
    } catch (error) {
      // Return default flags on error - this is intentional for feature flags
      return {
        status: 'error',
        data: DEFAULT_FLAGS,
        error: {
          code: 'FEATURE_FLAGS_ERROR',
          message: 'Error fetching feature flags',
        },
      };
    }
  }

  // Override to provide a method that doesn't conflict with parent
  async getFeatureFlags(userId?: string): Promise<ApiResponse<FeatureFlags>> {
    return this.getAll(userId);
  }

  async get(flag: keyof FeatureFlags, userId?: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await this.getAll(userId);
      if (response.status === 'success') {
        return {
          status: 'success',
          data: response.data[flag],
        };
      } else {
        return {
          status: 'error',
          data: DEFAULT_FLAGS[flag],
          error: response.error,
        };
      }
    } catch (error) {
      return {
        status: 'error',
        data: DEFAULT_FLAGS[flag],
        error: {
          code: 'FEATURE_FLAG_ERROR',
          message: 'Error fetching feature flag',
        },
      };
    }
  }

  async update(flags: Partial<FeatureFlags>, userId?: string): Promise<ApiResponse<FeatureFlags>> {
    try {
      const payload = userId ? { flags, userId } : { flags };
      const response = await super.create<FeatureFlags>(payload as unknown as Partial<FeatureFlags>);
      return response;
    } catch (error) {
      return {
        status: 'error',
        data: DEFAULT_FLAGS,
        error: {
          code: 'UPDATE_FLAGS_ERROR',
          message: 'Error updating feature flags',
        },
      };
    }
  }
}

export default new FeatureFlagService();
