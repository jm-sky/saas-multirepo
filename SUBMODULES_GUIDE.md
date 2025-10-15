# Core Submodules Setup Guide

This guide explains how to use `fastapi-core`, `react-core`, and `vue-core` as git submodules in your microservices and applications.

## Repository Overview

- **`fastapi-core/`** - Core backend functionality (factory, settings, auth, middleware)
- **`react-core/`** - Core React/Next.js frontend functionality (API client, auth hooks, providers)
- **`vue-core/`** - Core Vue 3 frontend functionality (API client, auth composables, plugins) - WIP

## Initial Setup

### 1. Push Core Repositories to GitHub

```bash
# FastAPI Core
cd fastapi-core
git add .
git commit -m "Initial commit: FastAPI core functionality"
git remote add origin git@github.com:yourusername/fastapi-core.git
git push -u origin main

# React Core
cd ../react-core
git add .
git commit -m "Initial commit: React core functionality"
git remote add origin git@github.com:yourusername/react-core.git
git push -u origin main

# Vue Core (when ready)
cd ../vue-core
git add .
git commit -m "Initial commit: Vue core functionality"
git remote add origin git@github.com:yourusername/vue-core.git
git push -u origin main
```

### 2. Create a New Microservice Project

```bash
# Create new project
mkdir jira-integration && cd jira-integration
git init

# Add backend core as submodule
git submodule add git@github.com:yourusername/fastapi-core.git backend/core

# Add frontend core as submodule (choose React or Vue)
# Option A: React/Next.js
git submodule add git@github.com:yourusername/react-core.git frontend/core

# Option B: Vue 3 (when ready)
git submodule add git@github.com:yourusername/vue-core.git frontend/core

# Commit submodules
git commit -m "Add core submodules"
```

## Project Structure

```
jira-integration/
├── backend/
│   ├── core/                    # Submodule: fastapi-core
│   ├── app/                     # Your application code
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── settings.py          # Extended from core
│   │   ├── api/
│   │   │   └── jira.py
│   │   ├── models/
│   │   └── services/
│   ├── requirements.txt
│   ├── .env
│   └── README.md
├── frontend/                    # Optional: debug dashboard
│   ├── core/                    # Submodule: react-core
│   ├── src/
│   │   └── app/
│   ├── package.json
│   └── next.config.ts
└── README.md
```

## Backend Implementation

### 1. Create Extended Settings

```python
# backend/app/settings.py
from pydantic import Field
from core.fastapi_core.settings import BaseSettings

class Settings(BaseSettings):
    """Extended settings for JIRA integration service."""

    # JIRA-specific settings
    jira_url: str = Field(
        default="https://your-domain.atlassian.net",
        validation_alias="JIRA_URL"
    )
    jira_api_token: str = Field(
        default="",
        validation_alias="JIRA_API_TOKEN"
    )
    jira_email: str = Field(
        default="",
        validation_alias="JIRA_EMAIL"
    )

    # Kafka settings
    kafka_bootstrap_servers: str = Field(
        default="localhost:9092",
        validation_alias="KAFKA_BOOTSTRAP_SERVERS"
    )
    kafka_topic: str = Field(
        default="jira-events",
        validation_alias="KAFKA_TOPIC"
    )

settings = Settings()
```

### 2. Create Main Application

```python
# backend/app/main.py
from core.fastapi_core import create_app
from app.settings import settings
from app.api.jira import router as jira_router

# Create app with core functionality
app = create_app(
    settings,
    extra_routers=[jira_router],
)

# Add any app-specific startup logic
@app.on_event("startup")
async def startup():
    # Initialize Kafka consumer, etc.
    pass
```

### 3. Create API Routes

```python
# backend/app/api/jira.py
from fastapi import APIRouter, Depends
from core.fastapi_core.utils.dependencies import BearerCredentials
from app.services.jira_service import create_issue

router = APIRouter(prefix="/api/jira", tags=["JIRA"])

@router.post("/issue")
async def create_jira_issue(
    issue_data: IssueCreate,
    credentials: BearerCredentials
):
    result = await create_issue(issue_data)
    return {"status": "created", "key": result.key}
```

### 4. Requirements

```txt
# backend/requirements.txt
# Include core requirements
-e ./core

# Add your app-specific dependencies
jira==3.5.0
kafka-python==2.0.2
```

### 5. Environment Configuration

```env
# backend/.env
# Core settings
APP_NAME=JIRA Integration Service
APP_VERSION=1.0.0
DEBUG=false
ENVIRONMENT=production
SECRET_KEY=your-super-secret-key-min-32-characters-long

# Your app settings
JIRA_URL=https://your-domain.atlassian.net
JIRA_API_TOKEN=your_api_token
JIRA_EMAIL=your@email.com
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
KAFKA_TOPIC=jira-events
```

## Frontend Implementation (Optional Debug Dashboard)

### Option A: React/Next.js Implementation

#### 1. Import Core Components

```tsx
// frontend/src/app/layout.tsx
import { QueryProvider } from '@/core/src/providers/query-provider';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <html lang="en">
      <body>
        <QueryProvider navigate={(path) => router.push(path)}>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

#### 2. Use Auth Hooks

```tsx
// frontend/src/app/dashboard/page.tsx
'use client';

import { useIsAuthenticated } from '@/core/src/hooks/auth.hook';
import { apiClient } from '@/core/src/lib/api.client';

export default function DashboardPage() {
  const { isAuthenticated, user } = useIsAuthenticated();

  // Use apiClient for custom endpoints
  const fetchLogs = async () => {
    const { data } = await apiClient.get('/logs');
    return data;
  };

  return <div>Welcome, {user?.name}!</div>;
}
```

#### 3. TypeScript Configuration

```json
// frontend/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/core/*": ["./core/src/*"]
    }
  }
}
```

### Option B: Vue 3 Implementation (When Ready)

#### 1. Setup Vue App (Planned)

```typescript
// frontend/src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
// import { setupQuery } from '@/core/src/plugins/query'; // Planned

const app = createApp(App);
// setupQuery(app); // Planned
app.mount('#app');
```

#### 2. Use Auth Composables (Planned)

```vue
<!-- frontend/src/views/Dashboard.vue -->
<script setup lang="ts">
// import { useAuth } from '@/core/src/composables/useAuth'; // Planned
// import { apiClient } from '@/core/src/lib/api.client'; // Planned

// const { isAuthenticated, user } = useAuth(); // Planned

// Use apiClient for custom endpoints
// const fetchLogs = async () => {
//   const { data } = await apiClient.get('/logs');
//   return data;
// };
</script>

<template>
  <div>
    <p v-if="isAuthenticated">Welcome, {{ user?.name }}!</p>
  </div>
</template>
```

#### 3. TypeScript Configuration

```json
// frontend/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/core/*": ["./core/src/*"]
    }
  }
}
```

## Working with Submodules

### Clone Project with Submodules

```bash
# Clone with submodules
git clone --recursive git@github.com:yourusername/jira-integration.git

# Or if already cloned without --recursive
git submodule update --init --recursive
```

### Update Core in a Project

```bash
# Update to latest core
cd backend/core
git pull origin main

# Go back and commit update
cd ../..
git add backend/core
git commit -m "Update fastapi-core to latest"
git push
```

### Update Core Across All Projects

Create a script to update all projects:

```bash
#!/bin/bash
# scripts/update-all-cores.sh

PROJECTS=(
  "jira-integration"
  "azure-document-ai"
  "careerhub-resume"
)

for project in "${PROJECTS[@]}"; do
  echo "Updating $project..."
  cd "$project"

  # Update backend core
  if [ -d "backend/core" ]; then
    cd backend/core
    git pull origin main
    cd ../..
  fi

  # Update frontend core
  if [ -d "frontend/core" ]; then
    cd frontend/core
    git pull origin main
    cd ../..
  fi

  # Commit changes
  git add .
  git commit -m "Update core submodules" || true
  git push

  cd ..
done
```

### Make Changes to Core

```bash
# In any project, navigate to core
cd backend/core

# Make changes
git checkout -b feature/add-logging
# ... make changes ...
git add .
git commit -m "feat: add logging middleware"
git push origin feature/add-logging

# Create PR on GitHub
# After merge, update in all projects
```

## Best Practices

### 1. Pin Core to Specific Version

```bash
# Pin to a specific tag
cd backend/core
git checkout v1.0.0
cd ../..
git add backend/core
git commit -m "Pin fastapi-core to v1.0.0"
```

### 2. Create Makefile for Common Tasks

```makefile
# Makefile
.PHONY: update-core dev install

update-core:
	git submodule update --remote --merge
	git add backend/core frontend/core
	git commit -m "Update core submodules" || true

install:
	cd backend && pip install -r requirements.txt
	cd frontend && pnpm install

dev:
	pnpm dev
```

### 3. CI/CD Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true  # Important!
          token: ${{ secrets.PAT }}

      - name: Build
        run: make install && make build
```

## Troubleshooting

### Submodule Not Initialized

```bash
git submodule update --init --recursive
```

### Submodule Detached HEAD

```bash
cd backend/core
git checkout main
git pull
cd ../..
git add backend/core
git commit -m "Update core to latest main"
```

### Remove Submodule

```bash
git submodule deinit backend/core
git rm backend/core
git commit -m "Remove core submodule"
```

## Example Projects

### Minimal Microservice

```
minimal-service/
├── backend/
│   ├── core/              # Submodule
│   ├── app/
│   │   ├── main.py        # 10 lines of code
│   │   └── settings.py    # Extended settings
│   └── requirements.txt
└── .env
```

### Full Stack Application

```
full-app/
├── backend/
│   ├── core/              # Submodule
│   └── app/               # Your business logic
├── frontend/
│   ├── core/              # Submodule
│   └── src/               # Your UI
└── docker-compose.yml
```

## Summary

- **Backend**: Extend `BaseSettings`, use `create_app()`, add your routes
- **Frontend**: Use `QueryProvider`, import hooks and utilities
- **Updates**: `git submodule update --remote --merge`
- **Versioning**: Pin to tags for stability

Your microservices now have a consistent foundation with minimal boilerplate!
