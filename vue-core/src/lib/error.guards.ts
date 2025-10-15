/**
 * Type guards and error handling utilities
 */

import type { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  detail?: string;
}

/**
 * Check if error is an Axios error
 */
export function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    error.isAxiosError === true
  );
}

/**
 * Extract user-friendly error message from any error
 */
export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    
    if (typeof data === 'object' && data !== null) {
      if ('detail' in data && typeof data.detail === 'string') {
        return data.detail;
      }
      if ('message' in data && typeof data.message === 'string') {
        return data.message;
      }
    }
    
    return error.message || 'An error occurred';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Create standardized API error
 */
export function createApiError(error: unknown): ApiError {
  const message = getErrorMessage(error);
  const status = isAxiosError(error) ? error.response?.status : undefined;
  const detail = isAxiosError(error) ? error.response?.data?.detail : undefined;
  
  return { message, status, detail };
}

