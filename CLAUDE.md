# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Overview

This is a **management repository** for FastAPI and frontend core functionality used across multiple microservices and applications.

### Purpose
- Centralized development of core backend (FastAPI) and frontend (React/Next.js, Vue) functionality
- Version control for core components
- Scripts for project creation and maintenance
- Documentation for using cores as git submodules

### Structure

```
saas-multirepo/
├── fastapi-core/              # Backend core (separate git repo)
│   ├── fastapi_core/          # Python package
│   │   ├── factory.py         # FastAPI app factory
│   │   ├── settings.py        # Pydantic settings base classes
│   │   ├── middleware/        # Rate limiting, etc.
│   │   ├── utils/             # Auth, exceptions, dependencies
│   │   └── api/               # Health check endpoints
│   ├── requirements.txt
│   └── README.md
│
├── react-core/                # Frontend core - React/Next.js (separate git repo)
│   ├── src/
│   │   ├── lib/               # API client, auth, error handling
│   │   ├── hooks/             # TanStack Query auth hooks
│   │   ├── providers/         # Query provider setup
│   │   └── types/             # TypeScript definitions
│   ├── package.json
│   └── README.md
│
├── vue-core/                  # Frontend core - Vue 3 (separate git repo)
│   ├── src/
│   │   ├── lib/               # API client, auth, error handling (TODO)
│   │   ├── composables/       # Vue Composition API auth composables (TODO)
│   │   ├── router/            # Router setup
│   │   └── stores/            # Pinia stores
│   ├── package.json
│   └── README.md
│
├── scripts/
│   ├── create-microservice.sh # Create new project with cores
│   └── update-all-cores.sh    # Update cores in all projects
│
├── SUBMODULES_GUIDE.md        # Complete usage guide
├── SETUP_SUMMARY.md           # Quick reference
└── README.md                  # Main documentation
```

## Core Repositories

### FastAPI Core (`fastapi-core/`) v0.2.0

**Purpose**: Reusable FastAPI functionality for microservices

**Key Components**:
- `factory.py` - `create_app(settings, extra_routers=[], custom_middleware=[])` with validation error handler, token blacklist init
- `settings.py` - `BaseSettings` class with nested config (app, server, security, rate_limit, database, redis, recaptcha, google_oauth)
- `middleware/rate_limit.py` - SlowAPI rate limiting with IP detection
- `utils/auth.py` - JWT token creation/verification, password hashing, password reset tokens, Redis token blacklist
- `utils/recaptcha.py` - Google reCAPTCHA v3 verification
- `utils/oauth.py` - OAuth provider configuration (Google)
- `utils/decorators.py` - recaptcha_protected decorator
- `utils/exceptions.py` - Custom exception classes with handlers
- `utils/dependencies.py` - Common FastAPI dependencies
- `api/health.py` - `/` and `/health` endpoints

**Extension Pattern**:
```python
from pydantic import Field
from core.fastapi_core.settings import BaseSettings

class Settings(BaseSettings):
    # Add custom settings
    kafka_servers: str = Field(default="localhost:9092", validation_alias="KAFKA_SERVERS")

settings = Settings()
```

**Usage Pattern**:
```python
from core.fastapi_core import create_app
from app.settings import settings
from app.api.routes import router

app = create_app(settings, extra_routers=[router])
```

### React Core (`react-core/`)

**Purpose**: Reusable React/Next.js functionality with auth and API client

**Key Components**:
- `lib/api.client.ts` - Axios instance with TokenManager, auto token refresh, request queuing
- `lib/auth.api.ts` - Auth API functions (login, register, logout, forgotPassword, resetPassword, changePassword)
- `hooks/auth.hook.ts` - TanStack Query hooks (useLogin, useRegister, useCurrentUser, useLogout, etc.)
- `lib/error.guards.ts` - Type-safe error handling utilities with FastAPI validation support
- `lib/navigation.ts` - Router-agnostic navigation helpers
- `lib/auth.config.ts` - Configurable auth redirects
- `providers/query-provider.tsx` - TanStack Query setup
- `types/auth.type.ts` - TypeScript definitions

**Usage Pattern**:
```tsx
// app/layout.tsx
import { QueryProvider } from '@/core/src/providers/query-provider';

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <QueryProvider navigate={(path) => router.push(path)}>
      {children}
    </QueryProvider>
  );
}

// app/dashboard/page.tsx
import { useIsAuthenticated } from '@/core/src/hooks/auth.hook';

export default function Dashboard() {
  const { isAuthenticated, user } = useIsAuthenticated();
  return <div>Welcome, {user?.name}!</div>;
}
```

### Vue Core (`vue-core/`)

**Purpose**: Reusable Vue 3 functionality with auth and API client

**Status**: ✅ Complete - Feature parity with react-core

**Key Components**:
- `lib/api.client.ts` - Axios instance with auto token refresh, request queuing
- `lib/auth.api.ts` - Auth API functions (login, register, logout, forgotPassword, resetPassword, changePassword)
- `composables/useAuth.ts` - Vue Composition API auth composables using TanStack Query (useLogin, useRegister, useCurrentUser, useForgotPassword, useResetPassword, useChangePassword)
- `lib/error.guards.ts` - Type-safe error handling utilities with FastAPI validation support
- `lib/navigation.ts` - Router-agnostic navigation helpers
- `lib/auth.config.ts` - Configurable auth redirects
- `types/auth.type.ts` - TypeScript definitions

**Usage Pattern**:
```vue
<!-- App.vue -->
<script setup lang="ts">
import { useAuth } from '@/core/src/composables/useAuth';

const { isAuthenticated, user } = useAuth();
</script>

<template>
  <div>
    <p v-if="isAuthenticated">Welcome, {{ user?.name }}!</p>
  </div>
</template>
```

## Demo Applications

This repository includes complete demo applications showcasing how to use the cores:

### apps/backend/ - FastAPI Demo
- **Purpose**: Example FastAPI application using fastapi-core
- **Features**: Complete auth system (register, login, logout, refresh, password reset, OAuth Google, reCAPTCHA)
- **Models**: User model with ULID IDs, password hashing, reset tokens
- **Database**: PostgreSQL with SQLAlchemy + Alembic migrations
- **Key Files**: 
  - `app/main.py` - Uses `create_app()` from fastapi-core
  - `app/settings.py` - Extends `BaseSettings`
  - `app/api/v1/auth.py` - Complete auth endpoints
  - `app/services/auth_service.py` - Business logic using fastapi-core functions

### apps/react-next/ - Next.js 15 Demo
- **Purpose**: Example Next.js App Router application using react-core
- **Features**: Full auth pages (login, register, forgot/reset password, landing page)
- **UI**: shadcn/ui + Radix UI + Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **State**: TanStack Query hooks from react-core
- **Key Features**: Auto token refresh, protected routes, type-safe error handling

### apps/vue-vite/ - Vue 3 + Vite Demo
- **Purpose**: Example Vue 3 application using vue-core
- **Features**: Full auth pages (login, register, forgot/reset password, landing page, dashboard)
- **UI**: reka-ui (Radix Vue) + lucide-vue-next + Tailwind CSS v4
- **Forms**: vee-validate + Zod validation
- **State**: TanStack Query (Vue Query) composables from vue-core
- **Key Features**: Auto token refresh, protected routes, type-safe error handling

## Workflow

### 1. Developing Cores

When making changes to cores:

```bash
# Edit files in fastapi-core/, react-core/, or vue-core/
cd fastapi-core
# ... make changes ...
git add .
git commit -m "feat: add new feature"
git push origin main

# Update in projects that use it
cd /path/to/project/backend/core
git pull origin main
```

### 2. Creating New Projects

Use the provided script:

```bash
./scripts/create-microservice.sh <project-name>
```

This creates a new project with:
- Backend with core as submodule
- Extended Settings class
- Basic main.py using `create_app()`
- Optional frontend with core as submodule
- Git repository initialized

### 3. Updating Cores Across Projects

```bash
./scripts/update-all-cores.sh
```

Updates core submodules in all configured projects.

## Use Cases

### Microservices
- JIRA integration (Kafka consumer → JIRA API)
- Azure Document Intelligence (PDF processing)
- Minimal GUI (just debugging dashboards)
- JWT auth for API access
- Logging to database

### Small Applications
- CareerHub Resume Management
- Full-featured web apps
- Complete auth system
- May grow but not become complex

## Important Notes for Claude Code

### When Working with Cores

1. **Backend Changes**:
   - Maintain backward compatibility
   - Update version in `setup.py` if breaking changes
   - Test with example project before pushing
   - Document changes in core README

2. **Frontend Changes (React/Vue)**:
   - Keep TypeScript types updated
   - Maintain peer dependency compatibility
   - React: Test with Next.js App Router, update exports in `src/index.ts`
   - Vue: Test with Vue 3 + Vite, ensure composables are properly exported

3. **Scripts**:
   - Update `yourusername` placeholders with actual GitHub username
   - Make scripts executable: `chmod +x scripts/*.sh`
   - Test script functionality before committing

### Code Standards

**Backend (Python)**:
- Use Pydantic v2 syntax
- Full type hints
- FastAPI best practices
- Async/await where appropriate

**Frontend (TypeScript)**:
- Strict TypeScript
- **React**: React 18/19 patterns, TanStack Query v5, Next.js 15 App Router compatible
- **Vue**: Vue 3 Composition API, TanStack Query (Vue Query) v5, Vite compatible

### Git Workflow

This repo contains:
- `fastapi-core/` - separate git repo (to push to GitHub)
- `react-core/` - separate git repo (to push to GitHub)
- `vue-core/` - separate git repo (to push to GitHub)
- Management files tracked in this repo

When updating:
1. Change core files
2. Commit in core's own repo
3. Push core to GitHub
4. Projects pull updates via submodule

## Common Tasks

### Add New Core Feature (Backend)

```python
# In fastapi-core/fastapi_core/utils/new_feature.py
def new_utility_function():
    """Docstring explaining feature."""
    pass

# Export in fastapi_core/__init__.py
from fastapi_core.utils.new_feature import new_utility_function
__all__ = [..., "new_utility_function"]

# Update README.md with usage example
```

### Add New Core Feature (Frontend - React)

```typescript
// In react-core/src/lib/new-feature.ts
export function newUtilityFunction() {
  // Implementation
}

// Export in react-core/src/index.ts
export { newUtilityFunction } from './lib/new-feature';

// Update README.md with usage example
```

### Add New Core Feature (Frontend - Vue)

```typescript
// In vue-core/src/composables/useNewFeature.ts
export function useNewFeature() {
  // Vue Composition API implementation
  return {
    // Composable returns
  };
}

// Export in vue-core/src/index.ts (if main export file exists)
export { useNewFeature } from './composables/useNewFeature';

// Update README.md with usage example
```

### Testing Changes

Before pushing core changes:
1. Create a test project: `./scripts/create-microservice.sh test-project`
2. Link to local core: `cd test-project/backend/core && git checkout <branch>`
3. Test functionality
4. Clean up test project

## Environment Variables

### Backend (.env)
```env
APP_NAME=Service Name
SECRET_KEY=min-32-chars
DATABASE_URL=sqlite:///./app.db
CORS_ORIGINS=["http://localhost:3000"]
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_LOGIN_REDIRECT=/dashboard
NEXT_PUBLIC_API_URL=/api
```

## Support Files

- **SUBMODULES_GUIDE.md** - Detailed guide on git submodules workflow
- **SETUP_SUMMARY.md** - Quick start and examples
- **README.md** - Overview and quick reference

## Philosophy

**Goal**: Minimize boilerplate, maximize consistency

**Principles**:
- Extension over duplication
- Type safety throughout
- Simple > complex
- Documentation with examples
- Backwards compatibility when possible

**Not a framework**: Cores are building blocks, not rigid frameworks. Projects can:
- Override core behavior
- Add custom middleware
- Extend or replace components
- Use only what they need

---

When in doubt, refer to:
1. Core README files for API reference
2. SUBMODULES_GUIDE.md for git workflows
3. SETUP_SUMMARY.md for quick examples
