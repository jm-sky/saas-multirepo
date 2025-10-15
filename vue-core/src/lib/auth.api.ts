/**
 * Authentication API functions
 */

import { apiClient, setTokens, clearTokens } from './api.client';
import type { LoginRequest, LoginResponse, RegisterRequest, User } from '../types/auth.type';

/**
 * Login user
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
  setTokens(data.access_token, data.refresh_token);
  return data;
}

/**
 * Register new user
 */
export async function register(userData: RegisterRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/register', userData);
  setTokens(data.access_token, data.refresh_token);
  return data;
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    clearTokens();
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User> {
  const { data } = await apiClient.get<User>('/auth/me');
  return data;
}

/**
 * Request password reset
 */
export async function forgotPassword(email: string): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>('/auth/forgot-password', {
    email,
  });
  return data;
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>('/auth/reset-password', {
    token,
    newPassword,
  });
  return data;
}

/**
 * Change password (authenticated)
 */
export async function changePassword(oldPassword: string, newPassword: string): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>('/auth/change-password', {
    oldPassword,
    newPassword,
  });
  return data;
}

