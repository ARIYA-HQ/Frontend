/**
 * Utility functions for handling subdomain routing
 */

const BASE_DOMAIN = window.location.hostname;

/**
 * Get the current subdomain from the URL
 */
export function getCurrentSubdomain(): string | null {
  const parts = BASE_DOMAIN.split('.');
  if (parts.length >= 3) {
    return parts[0];
  }
  return null;
}

/**
 * Get the main domain (without subdomain)
 */
export function getMainDomain(): string {
  const parts = BASE_DOMAIN.split('.');
  if (parts.length >= 3) {
    // Return the last two parts (e.g., "ariya.com")
    return parts.slice(-2).join('.');
  }
  return BASE_DOMAIN;
}

/**
 * Redirect to a specific subdomain
 */
export function redirectToSubdomain(subdomain: string, path: string = '/'): void {
  // If on localhost, just navigate to the path
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.location.href = path;
    return;
  }

  const mainDomain = getMainDomain();
  const newUrl = `https://${subdomain}.${mainDomain}${path}`;
  window.location.href = newUrl;
}

/**
 * Get the appropriate dashboard path based on user role
 */
export function getDashboardPathByRole(role: string): string {
  switch (role) {
    case 'vendor':
      return '/dashboard/vendor';
    case 'admin':
      return '/dashboard/admin';
    case 'professional_event_planner':
    case 'personal_planner':
    default:
      return '/dashboard';
  }
}

/**
 * Redirect to the appropriate subdomain based on user role
 */
export function redirectToRoleSubdomain(role: string): void {
  const dashboardPath = getDashboardPathByRole(role);

  // If on localhost, skip subdomains and go direct to path
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.location.href = dashboardPath;
    return;
  }

  const subdomainMap: Record<string, string> = {
    vendor: 'vendor',
    professional_event_planner: 'pro',
    personal_planner: 'planner',
    admin: 'admin'
  };

  const subdomain = subdomainMap[role];
  if (subdomain) {
    redirectToSubdomain(subdomain, dashboardPath);
  } else {
    // Default to main domain if role doesn't have a specific subdomain
    window.location.href = dashboardPath;
  }
}