"""Application settings extending fastapi-core BaseSettings."""

from pydantic import Field
from fastapi_core import BaseSettings


class Settings(BaseSettings):
    """
    Application settings for CareerHub backend.

    Extends fastapi-core BaseSettings with CareerHub-specific configuration.
    All core settings (app, server, security, rate_limit, database, redis,
    recaptcha, google_oauth) are inherited from BaseSettings.
    """

    # Legacy field for backward compatibility with CareerHub
    frontend_url: str = Field(
        default="http://localhost:3000",
        validation_alias="FRONTEND_URL",
        description="Frontend application URL for reset links and redirects"
    )


# Global settings instance
settings = Settings()
