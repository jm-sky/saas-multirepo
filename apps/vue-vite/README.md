# Vue 3 + Vite Demo Application

Przykładowa aplikacja Vue 3 używająca `vue-core` jako biblioteki bazowej z TanStack Query (Vue Query).

## Funkcjonalności

### Auth (zaimplementowane):
- ✅ Login page  
- ✅ Register page
- ✅ Forgot password
- ✅ Reset password
- ✅ Protected routes
- ✅ Landing page

## Struktura

```
apps/vue-vite/
├── src/
│   ├── pages/
│   │   ├── auth/              # Auth pages
│   │   │   ├── LoginPage.vue
│   │   │   ├── RegisterPage.vue
│   │   │   ├── ForgotPasswordPage.vue
│   │   │   └── ResetPasswordPage.vue
│   │   ├── HomePage.vue       # Landing page
│   │   └── DashboardPage.vue  # Protected page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   └── ui/                # UI components (reka-ui/radix-ui)
│   ├── layouts/
│   │   ├── GuestLayout.vue    # Layout for auth pages
│   │   └── LandingLayout.vue  # Layout for landing
│   ├── router/
│   │   ├── index.ts           # Router setup
│   │   └── routes.ts          # Route definitions
│   ├── composables/           # App-specific composables
│   ├── stores/                # Pinia stores (if needed)
│   ├── css/                   # Global styles
│   └── main.ts                # App entry point
├── package.json
└── vite.config.ts
```

## Używanie vue-core

### Importy

```vue
<script setup lang="ts">
// Auth composables
import { useLogin, useRegister, useCurrentUser } from 'vue-core'

// Error handling
import { getErrorMessage } from 'vue-core'

// API client
import { apiClient, setTokens, clearTokens } from 'vue-core'

// Types
import type { LoginRequest, User } from 'vue-core'
</script>
```

### Przykład użycia - Login

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLogin, getErrorMessage } from 'vue-core'
import { toast } from 'vue-sonner'

const router = useRouter()
const { mutateAsync: login, isPending } = useLogin()

async function handleLogin(email: string, password: string) {
  try {
    await login({ email, password })
    toast.success('Login successful!')
    router.push('/dashboard')
  } catch (error) {
    toast.error(getErrorMessage(error))
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin(email, password)">
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <button :disabled="isPending">
      {{ isPending ? 'Loading...' : 'Login' }}
    </button>
  </form>
</template>
```

### Przykład użycia - Check Auth Status

```vue
<script setup lang="ts">
import { useIsAuthenticated } from 'vue-core'

const { isAuthenticated, isLoading, user } = useIsAuthenticated()
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isAuthenticated">
    Welcome, {{ user?.name }}!
  </div>
  <div v-else>
    Please log in
  </div>
</template>
```

## Uruchomienie

```bash
# Zainstaluj zależności (z workspace root)
cd /path/to/saas-multirepo
pnpm install

# Uruchom dev server
cd apps/vue-vite
pnpm dev

# Aplikacja dostępna na http://localhost:5173
```

## Zmienne środowiskowe

Utwórz `.env.local`:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api/v1

# Auth redirects
VITE_LOGIN_REDIRECT=/dashboard
VITE_LOGOUT_REDIRECT=/
```

Lub skonfiguruj proxy w `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

## Co jest w vue-core?

vue-core dostarcza:
- ✅ `apiClient` - Axios z auto token refresh
- ✅ Auth API functions - `login`, `register`, `logout`, `forgotPassword`, `resetPassword`, `changePassword`
- ✅ Auth composables - `useLogin`, `useRegister`, `useLogout`, `useCurrentUser`, `useIsAuthenticated`, `useForgotPassword`, `useResetPassword`, `useChangePassword`
- ✅ `getErrorMessage` - Type-safe error handling
- ✅ `setNavigateFunction` - Router integration
- ✅ TypeScript types

## Co dodajesz w aplikacji?

- 📝 Pages - Vue Router pages
- 📝 Components - UI components (reka-ui, lucide-vue-next)
- 📝 Layouts - App-specific layouts
- 📝 Forms - vee-validate + zod
- 📝 Styling - Tailwind CSS v4
- 📝 Toast notifications - vue-sonner
- 📝 Tables - @tanstack/vue-table (jeśli potrzebne)

## Integracja z backendem

Backend musi być uruchomiony i dostępny przez proxy lub CORS:

```bash
# Terminal 1 - Backend
cd apps/backend
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd apps/vue-vite
pnpm dev
```

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite 7
- **Router:** Vue Router 4
- **State:** TanStack Query (Vue Query) + Pinia (optional)
- **Forms:** vee-validate + Zod
- **UI:** reka-ui (Radix Vue), lucide-vue-next
- **Styling:** Tailwind CSS v4
- **TypeScript:** Full type safety
- **API Client:** Axios (from vue-core)

## Komponenty UI

Aplikacja używa reka-ui (fork Radix Vue) dla komponentów dostępnościowych:
- Button, Input, Label
- Form components
- Dialog, Dropdown Menu
- Plus wiele innych

Wszystkie komponenty są w `src/components/ui/`.

## Testowanie

```bash
# Unit tests
pnpm test:unit

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Routing

Trasy zdefiniowane w `src/router/routes.ts`:

- `/` - Landing page (public)
- `/auth/login` - Login page
- `/auth/register` - Register page
- `/auth/forgot-password` - Forgot password
- `/auth/reset-password` - Reset password (z tokenem w URL)
- `/dashboard` - Protected dashboard (wymaga auth)

## Protected Routes

```typescript
// router/routes.ts
{
  path: '/dashboard',
  component: () => import('@/pages/DashboardPage.vue'),
  beforeEnter: (to, from, next) => {
    const { isAuthenticated } = useIsAuthenticated()
    if (!isAuthenticated.value) {
      next('/auth/login')
    } else {
      next()
    }
  },
}
```

## Przykłady

Zobacz pliki w `src/pages/auth/` dla pełnych przykładów implementacji:
- Formularze z walidacją (vee-validate)
- TanStack Query mutations
- Error handling
- Loading states
- Success/error messages
- Redirects po sukcesie

## License

MIT
