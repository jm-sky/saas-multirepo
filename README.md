# Microservices & Applications - Core Management

This repository manages core functionality for FastAPI + frontend (React/Vue) microservices and applications.

## Structure

```
.
├── fastapi-core/          # Backend core library (separate git repo)
├── react-core/            # React/Next.js frontend core library (separate git repo)
├── vue-core/              # Vue 3 frontend core library (separate git repo)
├── apps/                  # Demo applications
│   ├── backend/           # FastAPI demo app using fastapi-core
│   ├── react-next/        # Next.js demo app using react-core
│   └── vue-vite/          # Vue 3 Vite demo app using vue-core
├── scripts/               # Management scripts
│   ├── create-microservice.sh
│   └── update-all-cores.sh
├── SUBMODULES_GUIDE.md   # Complete usage guide
└── SETUP_SUMMARY.md      # Quick reference
```

## Quick Start

### 1. Install Dependencies and Run Demo Apps

```bash
# Install all dependencies (frontend + backend)
pnpm install:all

# Run all apps in parallel (backend + React + Vue)
pnpm dev:all

# Or run individually:
pnpm dev:backend  # Backend on http://127.0.0.1:8000
pnpm dev:react    # React Next.js on http://localhost:3000
pnpm dev:vue      # Vue Vite on http://localhost:5173
```

### 2. Push Cores to GitHub

```bash
# FastAPI Core
cd fastapi-core
git remote add origin git@github.com:yourusername/fastapi-core.git
git add .
git commit -m "Initial commit"
git push -u origin main

# React Core
cd ../react-core
git remote add origin git@github.com:yourusername/react-core.git
git add .
git commit -m "Initial commit"
git push -u origin main

# Vue Core (when ready)
cd ../vue-core
git remote add origin git@github.com:yourusername/vue-core.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 3. Create a New Microservice

```bash
./scripts/create-microservice.sh my-service
```

### 4. Update All Projects

```bash
./scripts/update-all-cores.sh
```

## Core Repositories

### FastAPI Core (v0.2.0)
- ✅ Application factory with configurable middleware
- ✅ JWT authentication & token management
- ✅ Redis token blacklist with auto-expiration
- ✅ Password reset functionality
- ✅ Rate limiting & CORS setup
- ✅ Google reCAPTCHA v3 verification
- ✅ OAuth (Google) support
- ✅ Health check endpoints
- ✅ Custom exception handlers with validation errors
- ✅ Pydantic v2 settings (nested configuration)

### React Core
- ✅ Axios API client with auto token refresh
- ✅ TokenManager (secure closure-based storage)
- ✅ TanStack Query authentication hooks
- ✅ Password reset/change hooks
- ✅ Type-safe error handling
- ✅ Navigation utilities (router-agnostic)
- ✅ Query provider setup
- ✅ Full TypeScript support

### Vue Core
- ✅ Axios API client with auto token refresh
- ✅ TanStack Query (Vue Query) authentication composables
- ✅ Password reset/change composables
- ✅ Type-safe error handling
- ✅ Navigation utilities (router-agnostic)
- ✅ Vue 3 Composition API
- ✅ Full TypeScript support

## Demo Applications

This repository includes three demo applications that showcase how to use the cores with full authentication flows:

### Backend (apps/backend/)
- FastAPI application using `fastapi-core` as a library
- **Features**: User registration/login, JWT tokens, password reset, OAuth Google, reCAPTCHA
- **Models**: User model with ULID IDs
- **Endpoints**: Complete auth API (register, login, logout, refresh, forgot/reset password, change password, OAuth)
- **Migrations**: Alembic for database versioning

### React Next.js (apps/react-next/)
- Next.js 15 App Router application using `react-core`
- **Pages**: Login, Register, Forgot Password, Reset Password, Landing page
- **Features**: TanStack Query hooks, auto token refresh, protected routes
- **UI**: shadcn/ui, Radix UI, Tailwind CSS v4, React Hook Form + Zod

### Vue 3 Vite (apps/vue-vite/)
- Vue 3 + Vite application using `vue-core`
- **Pages**: Login, Register, Forgot Password, Reset Password, Landing page, Dashboard
- **Features**: TanStack Query (Vue Query) composables, auto token refresh, protected routes
- **UI**: reka-ui (Radix Vue), lucide-vue-next, Tailwind CSS v4, vee-validate + Zod

All apps are configured to work together - backend provides API, frontends consume it.

## Documentation

- **SUBMODULES_GUIDE.md** - Detailed guide on using submodules
- **SETUP_SUMMARY.md** - Quick reference and examples
- **fastapi-core/README.md** - Backend core documentation
- **react-core/README.md** - React frontend core documentation
- **vue-core/README.md** - Vue frontend core documentation
- **apps/backend/README.md** - Backend demo app
- **apps/react-next/README.md** - React demo app
- **apps/vue-vite/README.md** - Vue demo app

## Workflow

1. **Develop cores** in `fastapi-core/`, `react-core/`, or `vue-core/`
2. **Push changes** to their respective GitHub repos
3. **Create projects** using `scripts/create-microservice.sh`
4. **Update cores** in projects with `git submodule update --remote`

## Projects Using These Cores

These cores were originally developed for and extracted from:
- **CareerHub** - Professional profile management platform (source of auth patterns)
- jira-integration (planned)
- azure-document-ai (planned)
- (add your projects here)

## Benefits

- **Consistency** - Same patterns across all projects
- **Maintainability** - Update core once, propagate everywhere
- **Speed** - New microservice in minutes
- **Type Safety** - Full TypeScript + Pydantic
- **Zero Boilerplate** - Focus on business logic

---

**Note**: This is a management repo. Individual cores are separate git repositories.
