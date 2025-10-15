#!/bin/bash
# Update core submodules across all projects

set -e

PROJECTS=(
  "jira-integration"
  "azure-document-ai"
  "careerhub-resume"
)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECTS_DIR="$(dirname "$SCRIPT_DIR")"

echo "🚀 Updating core submodules across all projects..."
echo ""

for project in "${PROJECTS[@]}"; do
  PROJECT_PATH="$PROJECTS_DIR/$project"

  if [ ! -d "$PROJECT_PATH" ]; then
    echo "⚠️  Project $project not found at $PROJECT_PATH, skipping..."
    continue
  fi

  echo "📦 Updating $project..."
  cd "$PROJECT_PATH"

  # Update backend core
  if [ -d "backend/core" ]; then
    echo "  ↪ Updating backend core..."
    cd backend/core
    git fetch origin
    git pull origin main
    cd ../..
  fi

  # Update frontend core
  if [ -d "frontend/core" ]; then
    echo "  ↪ Updating frontend core..."
    cd frontend/core
    git fetch origin
    git pull origin main
    cd ../..
  fi

  # Commit changes
  if git diff --quiet HEAD -- backend/core frontend/core 2>/dev/null; then
    echo "  ✓ No changes to commit"
  else
    git add backend/core frontend/core 2>/dev/null || true
    git commit -m "chore: update core submodules" || true
    echo "  ✓ Changes committed"

    # Optionally push
    read -p "  Push changes? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git push
      echo "  ✓ Pushed to remote"
    fi
  fi

  echo ""
done

echo "✨ Done!"
