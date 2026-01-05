/**
 * Initialize theme before React renders
 * This prevents flash of incorrect theme
 */

import { storage, STORAGE_KEYS } from './storage';

export function initTheme(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const savedTheme = storage.get<'light' | 'dark'>(STORAGE_KEYS.THEME);
  const theme = savedTheme || 'light';

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// Initialize immediately
initTheme();

