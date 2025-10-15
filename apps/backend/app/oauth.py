"""OAuth configuration for third-party authentication providers."""

from fastapi_core import create_oauth
from app.settings import settings

# Create OAuth registry with application settings
oauth = create_oauth(settings)

