/**
 * Router-agnostic navigation utilities
 * These can be used with any router implementation
 */

import { AUTH_CONFIG } from './auth.config';

type NavigateFunction = (path: string) => void;

let navigateFn: NavigateFunction | null = null;

/**
 * Set the navigation function
 * Call this once in your app setup with your router's push function
 */
export function setNavigateFunction(fn: NavigateFunction) {
  navigateFn = fn;
}

/**
 * Navigate to a path
 */
export function navigateTo(path: string) {
  if (!navigateFn) {
    console.warn('Navigate function not set. Call setNavigateFunction first.');
    return;
  }
  navigateFn(path);
}

/**
 * Navigate to login page
 */
export function navigateToLogin() {
  navigateTo(AUTH_CONFIG.logoutRedirect);
}

/**
 * Navigate to dashboard/home after login
 */
export function navigateToHome() {
  navigateTo(AUTH_CONFIG.loginRedirect);
}

