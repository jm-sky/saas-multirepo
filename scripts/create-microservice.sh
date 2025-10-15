#!/bin/bash
# Create a new microservice project with core submodules

set -e

# Check if project name is provided
if [ -z "$1" ]; then
  echo "Usage: ./create-microservice.sh <project-name>"
  echo "Example: ./create-microservice.sh jira-integration"
  exit 1
fi

PROJECT_NAME="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECTS_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_PATH="$PROJECTS_DIR/$PROJECT_NAME"

# Check if project already exists
if [ -d "$PROJECT_PATH" ]; then
  echo "❌ Error: Project $PROJECT_NAME already exists at $PROJECT_PATH"
  exit 1
fi

echo "🚀 Creating new microservice: $PROJECT_NAME"
echo ""

# Create project directory
mkdir -p "$PROJECT_PATH"
cd "$PROJECT_PATH"

# Initialize git
git init
echo "✓ Initialized git repository"

# Add gitignore
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
.venv
*.db

# Node
node_modules/
dist/
build/
.next/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
EOF
echo "✓ Created .gitignore"

# Add backend core as submodule
git submodule add git@github.com:yourusername/fastapi-core.git backend/core
echo "✓ Added fastapi-core submodule"

# Create backend structure
mkdir -p backend/app/api
mkdir -p backend/app/models
mkdir -p backend/app/services

# Create main.py
cat > backend/app/main.py << 'EOF'
"""Main application entry point."""

from core.fastapi_core import create_app
from app.settings import settings
# from app.api.routes import router

app = create_app(
    settings,
    # extra_routers=[router],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.server.host, port=settings.server.port)
EOF

# Create settings.py
cat > backend/app/settings.py << EOF
"""Application settings extending core settings."""

from pydantic import Field
from core.fastapi_core.settings import BaseSettings


class Settings(BaseSettings):
    """Extended settings for $PROJECT_NAME."""

    # Add your custom settings here
    # Example:
    # api_key: str = Field(
    #     default="",
    #     validation_alias="API_KEY",
    #     description="External API key"
    # )

settings = Settings()
EOF

# Create __init__.py files
touch backend/app/__init__.py
touch backend/app/api/__init__.py
touch backend/app/models/__init__.py
touch backend/app/services/__init__.py

# Create requirements.txt
cat > backend/requirements.txt << 'EOF'
# Core requirements
-e ./core

# Add your app-specific dependencies here
EOF

# Create .env.example
cat > backend/.env.example << 'EOF'
# Application
APP_NAME=Microservice
APP_VERSION=1.0.0
DEBUG=false
ENVIRONMENT=development

# Server
HOST=127.0.0.1
PORT=8000
CORS_ORIGINS=["http://localhost:3000"]

# Security
SECRET_KEY=your-super-secret-key-must-be-at-least-32-characters-long
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRES_MINUTES=30
REFRESH_TOKEN_EXPIRES_DAYS=7

# Database
DATABASE_URL=sqlite:///./app.db

# Redis
REDIS_URL=redis://localhost:6379/0

# Add your custom variables here
EOF

echo "✓ Created backend structure"

# Ask if user wants frontend
read -p "Add frontend debug dashboard? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  # Add frontend core as submodule
  git submodule add git@github.com:yourusername/react-core.git frontend/core
  echo "✓ Added react-core submodule"

  # Create basic Next.js structure
  mkdir -p frontend/src/app

  cat > frontend/package.json << 'EOF'
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "typescript": "^5"
  }
}
EOF

  cat > frontend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"],
      "@/core/*": ["./core/src/*"]
    },
    "strict": true
  },
  "include": ["src", "core/src"],
  "exclude": ["node_modules"]
}
EOF

  echo "✓ Created frontend structure"
fi

# Create README
cat > README.md << EOF
# $PROJECT_NAME

## Setup

\`\`\`bash
# Clone with submodules
git clone --recursive <repository-url>

# Or initialize submodules after clone
git submodule update --init --recursive

# Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt

# Install frontend dependencies (if applicable)
cd ../frontend
pnpm install
\`\`\`

## Environment Configuration

Copy \`.env.example\` to \`.env\` and configure your settings:

\`\`\`bash
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration
\`\`\`

## Development

\`\`\`bash
# Run backend
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload

# Run frontend (if applicable)
cd frontend
pnpm dev
\`\`\`

## Updating Core

\`\`\`bash
# Update core submodules
git submodule update --remote --merge
git add backend/core frontend/core
git commit -m "Update core submodules"
\`\`\`
EOF

# Initial commit
git add .
git commit -m "Initial commit: create $PROJECT_NAME microservice"

echo ""
echo "✨ Microservice $PROJECT_NAME created successfully!"
echo ""
echo "📍 Location: $PROJECT_PATH"
echo ""
echo "Next steps:"
echo "  1. cd $PROJECT_NAME"
echo "  2. Configure backend/.env"
echo "  3. Install dependencies: cd backend && pip install -r requirements.txt"
echo "  4. Start development: python -m uvicorn app.main:app --reload"
echo ""
