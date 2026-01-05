// Demo mode service
const DEMO_MODE_KEY = 'ariya_demo_mode';

export const demoService = {
  // Check if demo mode is enabled
  isEnabled: (): boolean => {
    const demoMode = localStorage.getItem(DEMO_MODE_KEY);
    return demoMode === 'true';
  },

  // Enable demo mode
  enable: (): void => {
    localStorage.setItem(DEMO_MODE_KEY, 'true');
  },

  // Disable demo mode
  disable: (): void => {
    localStorage.removeItem(DEMO_MODE_KEY);
  },

  // Toggle demo mode
  toggle: (): boolean => {
    const current = demoService.isEnabled();
    if (current) {
      demoService.disable();
      return false;
    } else {
      demoService.enable();
      return true;
    }
  }
};