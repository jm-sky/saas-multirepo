/**
 * Authentication configuration
 * Can be overridden by environment variables or at runtime
 */

export const AUTH_CONFIG = {
  loginRedirect: import.meta.env?.VITE_LOGIN_REDIRECT || '/dashboard',
  logoutRedirect: import.meta.env?.VITE_LOGOUT_REDIRECT || '/login',
  unauthorizedRedirect: import.meta.env?.VITE_UNAUTHORIZED_REDIRECT || '/login',
};

