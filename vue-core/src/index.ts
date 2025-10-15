/**
 * Vue Core - Main exports
 */

// API Client
export { apiClient, setTokens, clearTokens, getStoredTokens } from './lib/api.client';

// Auth API
export { 
  login, 
  register, 
  logout, 
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword 
} from './lib/auth.api';

// Auth Config
export { AUTH_CONFIG } from './lib/auth.config';

// Navigation
export { setNavigateFunction, navigateTo, navigateToLogin, navigateToHome } from './lib/navigation';

// Error Handling
export { getErrorMessage, createApiError, isAxiosError } from './lib/error.guards';
export type { ApiError } from './lib/error.guards';

// Utilities
export { cn } from './lib/utils';

// Composables
export {
  useCurrentUser,
  useIsAuthenticated,
  useLogin,
  useRegister,
  useLogout,
  useForgotPassword,
  useResetPassword,
  useChangePassword,
} from './composables/useAuth';

// Types
export type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  TokenResponse,
} from './types/auth.type';

