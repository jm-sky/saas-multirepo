# Quick Start Guide

## 🚀 First Time Setup

### 1. Push Cores to GitHub

```bash
cd /home/madeyskij/projects/private/saas-multirepo

# FastAPI Core
cd fastapi-core
git remote add origin git@github.com:madeyskij/fastapi-core.git
git add .
git commit -m "Initial commit: FastAPI core functionality"
git push -u origin main
cd ..

# React Core
cd react-core
git remote add origin git@github.com:madeyskij/react-core.git
git add .
git commit -m "Initial commit: React core functionality"
git push -u origin main
cd ..
```

### 2. Update Scripts

Edit GitHub username in scripts:

```bash
# Edit scripts/create-microservice.sh
# Edit scripts/update-all-cores.sh
# Replace: yourusername → madeyskij
```

## 📦 Create New Microservice

```bash
cd /home/madeyskij/projects/private/saas-multirepo
./scripts/create-microservice.sh jira-integration
```

Project structure:
```
jira-integration/
├── backend/
│   ├── core/          # Submodule from GitHub
│   ├── app/
│   │   ├── main.py    # Uses create_app()
│   │   └── settings.py # Extends BaseSettings
│   └── requirements.txt
└── frontend/          # Optional
    ├── core/          # Submodule from GitHub
    └── src/
```

## 🔧 Backend Development

### Minimal Example

```python
# backend/app/settings.py
from pydantic import Field
from core.fastapi_core.settings import BaseSettings

class Settings(BaseSettings):
    jira_url: str = Field(default="", validation_alias="JIRA_URL")
    kafka_servers: str = Field(default="localhost:9092", validation_alias="KAFKA_SERVERS")

settings = Settings()
```

```python
# backend/app/main.py
from core.fastapi_core import create_app
from app.settings import settings

app = create_app(settings)  # That's it!

# Or with custom routes:
from app.api.routes import router
app = create_app(settings, extra_routers=[router])
```

```python
# backend/app/api/routes.py
from fastapi import APIRouter
from core.fastapi_core.utils.dependencies import BearerCredentials

router = APIRouter(prefix="/api/jira")

@router.post("/issue")
async def create_issue(data: dict, credentials: BearerCredentials):
    return {"status": "created"}
```

## 🎨 Frontend Development

### Minimal Example

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
```

```tsx
// app/login/page.tsx
'use client';

import { useLogin } from '@/core/src/hooks/auth.hook';

export default function LoginPage() {
  const login = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login.mutateAsync({ email, password });
    window.location.href = '/dashboard';
  };

  return <form onSubmit={handleLogin}>...</form>;
}
```

```tsx
// app/dashboard/page.tsx
'use client';

import { useIsAuthenticated } from '@/core/src/hooks/auth.hook';
import { apiClient } from '@/core/src/lib/api.client';

export default function Dashboard() {
  const { isAuthenticated, user } = useIsAuthenticated();

  // Use apiClient for custom API calls
  const fetchData = async () => {
    const { data } = await apiClient.get('/my-endpoint');
    return data;
  };

  return <div>Welcome, {user?.name}!</div>;
}
```

## 🔄 Update Cores in Projects

### Single Project

```bash
cd my-project/backend/core
git pull origin main
cd ../../..
git add backend/core
git commit -m "Update fastapi-core"
```

### All Projects

```bash
cd /home/madeyskij/projects/private/saas-multirepo
./scripts/update-all-cores.sh
```

## 🛠️ Making Changes to Core

### Backend Core

```bash
cd /home/madeyskij/projects/private/saas-multirepo/fastapi-core

# Make changes
# ...

git add .
git commit -m "feat: add new feature"
git push origin main

# Update in projects
cd ../my-project/backend/core
git pull origin main
```

### Frontend Core

```bash
cd /home/madeyskij/projects/private/saas-multirepo/react-core

# Make changes
# ...

git add .
git commit -m "feat: add new hook"
git push origin main

# Update in projects
cd ../my-project/frontend/core
git pull origin main
```

## 📝 Environment Configuration

### Backend (.env)

```env
# Application
APP_NAME=My Service
APP_VERSION=1.0.0
DEBUG=false
ENVIRONMENT=production

# Server
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=["http://localhost:3000","https://mydomain.com"]

# Security (REQUIRED!)
SECRET_KEY=your-super-secret-key-minimum-32-characters-long-please
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRES_MINUTES=30
REFRESH_TOKEN_EXPIRES_DAYS=7

# Database
DATABASE_URL=postgresql://user:pass@localhost/db

# Redis
REDIS_URL=redis://localhost:6379/0

# Your custom settings
JIRA_URL=https://mydomain.atlassian.net
KAFKA_SERVERS=localhost:9092
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_LOGIN_REDIRECT=/dashboard
NEXT_PUBLIC_LOGOUT_REDIRECT=/login
```

## 🧪 Testing

### Backend

```bash
cd backend
python -m pytest
```

### Frontend

```bash
cd frontend
pnpm test
```

## 🚢 Deployment

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
pnpm build
pnpm start
```

## 📚 Common Commands

```bash
# Create new microservice
./scripts/create-microservice.sh <name>

# Update all cores
./scripts/update-all-cores.sh

# Run backend dev
cd backend && python -m uvicorn app.main:app --reload

# Run frontend dev
cd frontend && pnpm dev

# Install backend deps
cd backend && pip install -r requirements.txt

# Install frontend deps
cd frontend && pnpm install
```

## 🆘 Troubleshooting

### Submodule not initialized

```bash
git submodule update --init --recursive
```

### Core changes not showing

```bash
cd backend/core  # or frontend/core
git pull origin main
cd ../..
git add backend/core
git commit -m "Update core"
```

### Import errors (Backend)

```bash
# Make sure core is installed
cd backend
pip install -e ./core
```

### Import errors (Frontend)

Check `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/core/*": ["./core/src/*"]
    }
  }
}
```

## 💡 Tips

- **Pin core versions**: `cd core && git checkout v1.0.0`
- **Local development**: Edit core directly in project, test, then push
- **Keep it simple**: Don't add to core unless 2+ projects need it
- **Document changes**: Update core README when adding features
- **Version bumps**: Tag releases in core repos

## 📖 Full Documentation

- **CLAUDE.md** - Context for Claude Code
- **SUBMODULES_GUIDE.md** - Complete submodules workflow
- **SETUP_SUMMARY.md** - Detailed examples
- **fastapi-core/README.md** - Backend API reference
- **react-core/README.md** - Frontend API reference

---

**Need help?** Check the full docs or ask Claude Code to help you with specific tasks.
