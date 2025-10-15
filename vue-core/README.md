# Vue Core

Reusable core functionality for Vue 3 applications with TypeScript, TanStack Query (Vue Query), and authentication.

## Features

- ✅ **API Client** - Axios with auto token refresh
- ✅ **Auth API** - Login, register, logout, password reset/change  
- ✅ **Vue Composables** - TanStack Query (Vue Query) hooks
- ✅ **Error Handling** - Type-safe error utilities
- ✅ **Navigation** - Router-agnostic navigation helpers
- ✅ **TypeScript** - Full type safety
- ✅ **OAuth Support** - Ready for Google OAuth integration

## Installation

This is a workspace package. In your Vue 3 application:

```bash
# Add to package.json dependencies
{
  "dependencies": {
    "vue": "^3.5.0",
    "@tanstack/vue-query": "^5.89.0",
    "axios": "^1.12.0",
    "zod": "^4.1.0"
  }
}
```

## Usage

### 1. Setup TanStack Query

```typescript
// main.ts
import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';

const app = createApp(App);
app.use(VueQueryPlugin);
app.mount('#app');
```

### 2. Setup Navigation

```typescript
// main.ts or App.vue
import { setNavigateFunction } from 'vue-core';
import { useRouter } from 'vue-router';

const router = useRouter();
setNavigateFunction((path) => router.push(path));
```

### 3. Use Auth Composables

```vue
<script setup lang="ts">
import { useLogin, getErrorMessage } from 'vue-core';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const { mutateAsync: login, isPending } = useLogin();

async function handleLogin() {
  try {
    await login({ email: email.value, password: password.value });
    // Automatically redirects to home on success
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button :disabled="isPending">
      {{ isPending ? 'Loading...' : 'Login' }}
    </button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>
```

### 4. Check Authentication Status

```vue
<script setup lang="ts">
import { useIsAuthenticated } from 'vue-core';

const { isAuthenticated, isLoading, user } = useIsAuthenticated();
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isAuthenticated">
    <p>Welcome, {{ user?.name }}!</p>
  </div>
  <div v-else>
    <p>Please log in</p>
  </div>
</template>
```

## Available Composables

### Auth Composables

```typescript
import {
  useLogin,           // Login mutation
  useRegister,        // Register mutation
  useLogout,          // Logout mutation
  useCurrentUser,     // Get current user query
  useIsAuthenticated, // Check auth status
  useForgotPassword,  // Forgot password mutation
  useResetPassword,   // Reset password mutation
  useChangePassword,  // Change password mutation
} from 'vue-core';
```

### Auth API Functions

```typescript
import {
  login,
  register,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword,
} from 'vue-core';
```

### API Client

```typescript
import { 
  apiClient,      // Axios instance
  setTokens,      // Store tokens
  clearTokens,    // Clear tokens
  getStoredTokens // Get tokens from storage
} from 'vue-core';

// Manual API call
const response = await apiClient.get('/api/custom-endpoint');
```

### Error Handling

```typescript
import { getErrorMessage, createApiError, isAxiosError } from 'vue-core';

try {
  await someAPICall();
} catch (error) {
  const message = getErrorMessage(error); // User-friendly message
  console.error(message);
}
```

### Navigation

```typescript
import { 
  setNavigateFunction, // Setup router
  navigateTo,          // Navigate to path
  navigateToLogin,     // Navigate to login
  navigateToHome       // Navigate to home
} from 'vue-core';
```

## Configuration

### Auth Config

Configure redirects via environment variables or defaults:

```typescript
// .env
VITE_LOGIN_REDIRECT=/dashboard
VITE_LOGOUT_REDIRECT=/login
VITE_UNAUTHORIZED_REDIRECT=/login
```

### API Base URL

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
```

## TypeScript Types

```typescript
import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  TokenResponse,
  ApiError,
} from 'vue-core';
```

## Integration with Backend

Works seamlessly with `fastapi-core` backend:

```bash
# Backend (Terminal 1)
cd apps/backend
uvicorn app.main:app --reload

# Frontend (Terminal 2)
cd apps/vue-vite
npm run dev
```

## Features

### Automatic Token Refresh
- Axios interceptors handle token refresh automatically
- Failed requests retry after token refresh
- Automatic redirect to login when refresh fails

### Type Safety
- Full TypeScript support
- Type-safe API calls
- Inferred types from TanStack Query

### Error Handling
- Type guards for different error types
- User-friendly error messages
- Axios error parsing

### State Management
- TanStack Query for server state
- Automatic cache invalidation
- Optimistic updates support

## Examples

See `apps/vue-vite` for full example implementation with:
- Login/Register pages
- Password reset flow
- Protected routes
- OAuth integration
- Landing page

## License

MIT
