import ApiService, { ApiResponse } from './apiService';
import { Vendor } from '@/types';

class VendorService extends ApiService {
  constructor() {
    super('/vendors');
  }

  async getVendorsByCategory(category: string): Promise<ApiResponse<Vendor[]>> {
    return this.getAll<Vendor>({ category });
  }

  async getVendorsByEvent(eventId: string): Promise<ApiResponse<Vendor[]>> {
    return this.getAll<Vendor>({ eventId });
  }
}

export default new VendorService();