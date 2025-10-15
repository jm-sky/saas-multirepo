# Core Submodules - Setup Summary

## What Was Created

Three separate core repositories have been created:

### 1. **fastapi-core** (`/home/madeyskij/projects/private/fastapi-core/`)

Backend core functionality including:
- **Application Factory** (`factory.py`) - Configurable FastAPI app creation
- **Settings Management** (`settings.py`) - Pydantic-based configuration
- **JWT Authentication** (`utils/auth.py`) - Token creation, verification, password hashing
- **Rate Limiting** (`middleware/rate_limit.py`) - IP-based rate limiting
- **Exception Handling** (`utils/exceptions.py`) - Custom exceptions and handlers
- **Health Check** (`api/health.py`) - Built-in health endpoints
- **Dependencies** (`utils/dependencies.py`) - Common FastAPI dependencies

### 2. **react-core** (`/home/madeyskij/projects/private/react-core/`)

React/Next.js frontend core functionality including:
- **API Client** (`lib/api.client.ts`) - Axios with auto token refresh
- **Auth Hooks** (`hooks/auth.hook.ts`) - TanStack Query hooks (login, register, logout)
- **Error Handling** (`lib/error.guards.ts`) - Type-safe error utilities
- **Navigation** (`lib/navigation.ts`) - Router-agnostic navigation helpers
- **Query Provider** (`providers/query-provider.tsx`) - TanStack Query setup
- **TypeScript Types** (`types/auth.type.ts`) - Full type definitions

### 3. **vue-core** (`/home/madeyskij/projects/private/vue-core/`)

Vue 3 frontend core functionality including:
- **API Client** (`lib/api.client.ts`) - Axios with auto token refresh
- **Auth Composables** (`composables/useAuth.ts`) - Vue Composition API auth composables
- **Error Handling** (`lib/error.guards.ts`) - Type-safe error utilities
- **Navigation** (`lib/navigation.ts`) - Router-agnostic navigation helpers
- **TypeScript Types** (`types/auth.type.ts`) - Full type definitions

### 4. **Demo Applications** (`/home/madeyskij/projects/private/saas-multirepo/apps/`)

Three demo applications showing how to use the cores:
- **apps/backend/** - FastAPI app using `fastapi-core`
- **apps/react-next/** - Next.js 15 app using `react-core`
- **apps/vue-vite/** - Vue 3 + Vite app using `vue-core`

## Repository Structure

```
/home/madeyskij/projects/private/saas-multirepo/
├── fastapi-core/              # Backend core library (separate git repo)
│   ├── fastapi_core/
│   │   ├── __init__.py
│   │   ├── factory.py
│   │   ├── settings.py
│   │   ├── api/
│   │   │   └── health.py
│   │   ├── middleware/
│   │   │   └── rate_limit.py
│   │   ├── utils/
│   │   │   ├── auth.py
│   │   │   ├── exceptions.py
│   │   │   └── dependencies.py
│   │   ├── models/
│   │   ├── schemas/
│   │   └── database/
│   ├── requirements.txt
│   ├── setup.py
│   ├── README.md
│   ├── .gitignore
│   ├── .env.example
│   └── .git/
│
├── react-core/                # React core library (separate git repo)
│   ├── src/
│   │   ├── index.ts
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── providers/
│   │   ├── types/
│   │   └── components/
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── vue-core/                  # Vue core library (separate git repo)
│   ├── src/
│   │   ├── index.ts
│   │   ├── composables/
│   │   ├── lib/
│   │   └── types/
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── apps/                      # Demo applications
│   ├── backend/               # FastAPI demo app
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   └── settings.py
│   │   ├── requirements.txt
│   │   └── .env.example
│   │
│   ├── react-next/            # Next.js demo app
│   │   ├── src/app/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── next.config.ts
│   │
│   └── vue-vite/              # Vue Vite demo app
│       ├── src/
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── scripts/
│   ├── create-microservice.sh      # Create new microservice with cores
│   └── update-all-cores.sh         # Update cores in all projects
│
├── package.json                    # Root workspace config
├── pnpm-workspace.yaml             # PNPM workspace config
├── SUBMODULES_GUIDE.md             # Complete usage guide
└── SETUP_SUMMARY.md                # This file
```

## Quick Start - Running Demo Apps

### 1. Install Dependencies

```bash
cd /home/madeyskij/projects/private/saas-multirepo

# Install all frontend dependencies
pnpm install

# Install backend dependencies
cd apps/backend
pip install -r requirements.txt
cd ../..
```

### 2. Run All Apps

```bash
# From root directory
pnpm dev:all
```

This will start:
- Backend on `http://127.0.0.1:8000`
- React Next.js on `http://localhost:3000`
- Vue Vite on `http://localhost:5173`

Or run individually:
```bash
pnpm dev:backend  # Backend only
pnpm dev:react    # React only
pnpm dev:vue      # Vue only
```

## Next Steps

### 1. Push Core Repositories to GitHub

```bash
# FastAPI Core
cd /home/madeyskij/projects/private/fastapi-core
git add .
git commit -m "Initial commit: FastAPI core functionality"
git remote add origin git@github.com:yourusername/fastapi-core.git
git push -u origin main

# React Core
cd /home/madeyskij/projects/private/react-core
git add .
git commit -m "Initial commit: React core functionality"
git remote add origin git@github.com:yourusername/react-core.git
git push -u origin main

# Vue Core (when ready)
cd /home/madeyskij/projects/private/vue-core
git add .
git commit -m "Initial commit: Vue core functionality"
git remote add origin git@github.com:yourusername/vue-core.git
git push -u origin main
```

### 2. Update Scripts with Your GitHub Username

Edit these scripts to replace `yourusername` with your actual GitHub username:
- `/home/madeyskij/projects/private/scripts/create-microservice.sh`
- `/home/madeyskij/projects/private/scripts/update-all-cores.sh`

### 3. Create Your First Microservice

```bash
cd /home/madeyskij/projects/private
./scripts/create-microservice.sh jira-integration
```

This will:
- Create a new project structure
- Add core submodules
- Set up basic backend with extended settings
- Optionally add frontend dashboard
- Initialize git repository

### 4. Use Core in Existing Projects

To add cores to an existing project:

```bash
cd your-existing-project

# Add backend core
git submodule add git@github.com:yourusername/fastapi-core.git backend/core

# Add frontend core (optional)
git submodule add git@github.com:yourusername/react-core.git frontend/core

git commit -m "Add core submodules"
```

## Quick Start Examples

### Backend Example

```python
# backend/app/settings.py
from pydantic import Field
from core.fastapi_core.settings import BaseSettings

class Settings(BaseSettings):
    kafka_servers: str = Field(default="localhost:9092", validation_alias="KAFKA_SERVERS")

settings = Settings()

# backend/app/main.py
from core.fastapi_core import create_app
from app.settings import settings
from app.api.routes import router

app = create_app(settings, extra_routers=[router])
```

### Frontend Example

```tsx
// app/layout.tsx
import { QueryProvider } from '@/core/src/providers/query-provider';

export default function RootLayout({ children }) {
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

## Key Features

### Backend (fastapi-core)

- ✅ **Zero boilerplate** - Just extend settings and add your routes
- ✅ **JWT Authentication** - Built-in token management
- ✅ **Rate Limiting** - IP-based with customizable rules
- ✅ **CORS & Sessions** - Pre-configured middleware
- ✅ **Health Checks** - `/health` endpoint out of the box
- ✅ **Extensible** - Plugin pattern for custom middleware/routes
- ✅ **Type Safe** - Full Pydantic validation

### Frontend (react-core)

- ✅ **Auto Token Refresh** - Handles 401s automatically
- ✅ **TanStack Query Integration** - Hooks for auth operations
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Next.js Compatible** - Works with App Router
- ✅ **Zero Config** - Just wrap your app with QueryProvider

### Frontend (vue-core)

- ✅ **Auto Token Refresh** - Handles 401s automatically
- ✅ **TanStack Query (Vue Query)** - Composables for auth operations
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Vue 3 Composition API** - Modern Vue patterns
- ✅ **Zero Config** - Just import and use composables

## Updating Core Across Projects

### Manual Update

```bash
cd your-project/backend/core
git pull origin main
cd ../..
git add backend/core
git commit -m "Update fastapi-core"
```

### Batch Update All Projects

```bash
cd /home/madeyskij/projects/private
./scripts/update-all-cores.sh
```

This script will:
- Update core in all specified projects
- Commit changes
- Optionally push to remote

## Documentation

- **Complete Guide**: See `SUBMODULES_GUIDE.md` for detailed instructions
- **FastAPI Core**: See `fastapi-core/README.md` for backend documentation
- **React Core**: See `react-core/README.md` for frontend documentation

## Use Cases

### Perfect For:

1. **Microservices** (JIRA integration, Azure AI, etc.)
   - Minimal GUI - just debugging dashboards
   - Core provides auth, health checks, logging
   - Focus on business logic

2. **Small Applications** (CareerHub, etc.)
   - Need full auth system
   - Want consistent patterns
   - Don't want to reinvent the wheel

3. **Rapid Prototyping**
   - Start with core
   - Add only what you need
   - Deploy in minutes

### What Makes This Approach Work:

- **Submodules** - Easy to update, no package registry needed
- **Composition over Inheritance** - Extend settings, add routers
- **Type Safety** - Catch errors at compile time
- **Consistent Patterns** - Same structure across all projects
- **Quick Updates** - One command to update all projects

## File Checklist

Created files:
- ✅ fastapi-core/ (complete package)
- ✅ react-core/ (complete package)
- ✅ scripts/create-microservice.sh
- ✅ scripts/update-all-cores.sh
- ✅ SUBMODULES_GUIDE.md
- ✅ SETUP_SUMMARY.md (this file)

## What You Get

With these cores, your microservice `main.py` can be as simple as:

```python
from core.fastapi_core import create_app
from app.settings import settings

app = create_app(settings)  # That's it!
```

And your frontend `layout.tsx`:

```tsx
import { QueryProvider } from '@/core/src';

export default function Layout({ children }) {
  return <QueryProvider>{children}</QueryProvider>;
}
```

No more copying auth code, middleware, error handlers, etc. Just use the core!

---

**Ready to use!** Push cores to GitHub, then start creating microservices with the scripts.
