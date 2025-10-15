# React Next.js Demo Application

Przykładowa aplikacja Next.js 15 używająca `react-core` jako biblioteki bazowej.

## Funkcjonalności

### Auth (zaimplementowane):
- ✅ Login page
- ✅ Register page  
- ✅ Forgot password
- ✅ Reset password
- ✅ Change password
- ✅ OAuth Google login
- ✅ Protected routes
- ✅ Landing page

## Struktura

```
apps/react-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages (login, register, etc.)
│   │   ├── layout.tsx
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── auth/              # Auth components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # shadcn/ui components
│   ├── contexts/              # App-specific contexts
│   │   └── auth-context.tsx   # Auth context wrapper
│   ├── lib/                   # App-specific utilities
│   │   └── validations.ts     # Zod schemas
│   └── types/                 # TypeScript types
├── public/
├── package.json
└── tsconfig.json
```

## Używanie react-core

### Importy z @/core

```typescript
// API client i auth
import { apiClient, setTokens, clearTokens } from '@/core/lib/api.client';
import { authAPI } from '@/core/lib/auth.api';

// Error handling
import { getErrorMessage, createApiError } from '@/core/lib/error.guards';

// Auth config i navigation
import { AUTH_CONFIG } from '@/core/lib/auth.config';
import { navigateToLogin, setNavigateFunction } from '@/core/lib/navigation';

// Hooks
import { useLogin, useRegister, useCurrentUser } from '@/core/hooks/auth.hook';

// Providers
import { QueryProvider } from '@/core/providers/query-provider';

// Types
import type { User, LoginRequest, RegisterRequest } from '@/core/types/auth.type';
```

### Przykład użycia

```typescript
// app/layout.tsx - Setup QueryProvider
import { QueryProvider } from '@/core/providers/query-provider';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();
  
  return (
    <html>
      <body>
        <QueryProvider navigate={(path) => router.push(path)}>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

// components/auth/login-form.tsx - Use auth hooks
import { useLogin } from '@/core/hooks/auth.hook';
import { getErrorMessage } from '@/core/lib/error.guards';

export function LoginForm() {
  const { mutateAsync: login, isPending } = useLogin();
  
  const onSubmit = async (data) => {
    try {
      await login(data);
      router.push('/dashboard');
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };
  
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

## Uruchomienie

```bash
# Zainstaluj zależności (z workspace root)
cd /path/to/saas-multirepo
pnpm install

# Uruchom dev server
cd apps/react-next
pnpm dev

# Aplikacja dostępna na http://localhost:3000
```

## Zmienne środowiskowe

Utwórz `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Auth redirects
NEXT_PUBLIC_LOGIN_REDIRECT=/dashboard
NEXT_PUBLIC_LOGOUT_REDIRECT=/login

# reCAPTCHA (opcjonalne)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key

# OAuth Google (opcjonalne)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
```

## Co jest w react-core?

react-core dostarcza:
- ✅ `apiClient` - Axios z auto token refresh
- ✅ `authAPI` - Auth API functions
- ✅ `useLogin`, `useRegister`, `useCurrentUser`, `useLogout` - TanStack Query hooks
- ✅ `getErrorMessage` - Type-safe error handling
- ✅ `AUTH_CONFIG` - Configurable auth redirects
- ✅ `QueryProvider` - TanStack Query setup
- ✅ TypeScript types

## Co dodajesz w aplikacji?

- 📝 UI Components - shadcn/ui, Radix UI
- 📝 Validations - Zod schemas (app-specific)
- 📝 Auth Context - Wrapper nad hooks z core
- 📝 Pages - Next.js App Router pages
- 📝 Layout - App-specific layout components
- 📝 Styling - Tailwind CSS, custom styles

## Integracja z backendem

Backend musi być uruchomiony na `NEXT_PUBLIC_API_URL`.

```bash
# Terminal 1 - Backend
cd apps/backend
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd apps/react-next
pnpm dev
```
