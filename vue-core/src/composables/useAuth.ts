/**
 * Vue composables for authentication using TanStack Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed } from 'vue';
import { 
  login, 
  register, 
  logout, 
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword 
} from '../lib/auth.api';
import { navigateToHome, navigateToLogin } from '../lib/navigation';
import type { LoginRequest, RegisterRequest } from '../types/auth.type';

/**
 * Get current authenticated user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Check if user is authenticated
 */
export function useIsAuthenticated() {
  const { data: user, isLoading, error } = useCurrentUser();
  
  const isAuthenticated = computed(() => !!user.value && !error.value);
  
  return {
    isAuthenticated,
    isLoading,
    user,
  };
}

/**
 * Login mutation
 */
export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
      navigateToHome();
    },
  });
}

/**
 * Register mutation
 */
export function useRegister() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: RegisterRequest) => register(userData),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
      navigateToHome();
    },
  });
}

/**
 * Logout mutation
 */
export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null);
      queryClient.clear();
      navigateToLogin();
    },
  });
}

/**
 * Forgot password mutation
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
}

/**
 * Reset password mutation
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
      resetPassword(token, newPassword),
  });
}

/**
 * Change password mutation
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
      changePassword(oldPassword, newPassword),
  });
}

