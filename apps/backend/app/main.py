"""SaasMultirepo API - Professional Profile Management Platform."""

from fastapi_core import create_app
from app.settings import settings
from app.api.v1 import api_router

# Create FastAPI application using core factory
app = create_app(
    settings=settings,
    extra_routers=[api_router],
)

# Override app metadata
app.title = "SaasMultirepo API"
app.description = "Professional Profile Management Platform"


# Custom root endpoint
@app.get("/")
async def root():
    """Root endpoint - API information."""
    return {
        "message": "Welcome to SaasMultirepo API",
        "version": settings.app.version,
        "docs": "/docs",
        "health": "/health",
    }
