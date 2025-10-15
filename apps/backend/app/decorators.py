"""Custom decorators for authentication, rate limiting, and validation."""

from typing import Callable

from fastapi_core.middleware.rate_limit import limiter
from fastapi_core import recaptcha_protected as core_recaptcha_protected

from app.settings import settings


def rate_limit(limit: str):
    """
    Decorator for rate limiting.

    NOTE: This is just a convenience wrapper around limiter.limit.
    The decorated endpoint MUST include a 'request: Request' parameter.

    Args:
        limit: Rate limit string (e.g., "5/minute", "100/hour")

    Usage:
        @router.post("/login")
        @rate_limit("10/minute")
        async def login(request: Request, credentials: UserLogin) -> LoginResponse:
            # request parameter is required for rate limiting
            ...
    """

    def decorator(func: Callable) -> Callable:
        # Apply limiter.limit directly - it will handle the request parameter
        return limiter(settings).limit(limit)(func)

    return decorator


def recaptcha_protected(action: str):
    """
    Decorator for endpoints requiring reCAPTCHA verification.

    Wraps fastapi-core recaptcha_protected with application settings.

    Args:
        action: reCAPTCHA action name (should match client-side action)

    Usage:
        @router.post("/register")
        @recaptcha_protected("register")
        async def register(user_data: UserRegister) -> LoginResponse:
            # reCAPTCHA already verified
            ...
    """
    return core_recaptcha_protected(action, settings)
