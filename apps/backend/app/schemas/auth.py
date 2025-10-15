"""Authentication schemas for request/response validation."""

import re
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, field_validator


class UserLogin(BaseModel):
    """User login request schema with camelCase."""

    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)
    recaptchaToken: str | None = Field(default=None, description="reCAPTCHA token")


class UserRegister(BaseModel):
    """User registration request schema with camelCase."""

    email: EmailStr
    password: str = Field(
        ...,
        min_length=8,
        max_length=100,
        description="Password must contain uppercase, lowercase, digit, and special character",
    )
    name: str = Field(..., min_length=1, max_length=100)
    recaptchaToken: str | None = Field(default=None, description="reCAPTCHA token")

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        """Validate password meets strength requirements."""
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)')
        return v


class TokenResponse(BaseModel):
    """Token response schema with camelCase."""

    accessToken: str
    refreshToken: str
    tokenType: str = "bearer"
    expiresIn: int  # seconds


class TokenRefresh(BaseModel):
    """Token refresh request schema."""

    refreshToken: str


class UserResponse(BaseModel):
    """User response schema with camelCase."""

    id: str  # ULID as string
    email: EmailStr
    name: str
    isActive: bool = Field(alias="is_active")
    createdAt: datetime = Field(alias="created_at")
    tier: str = "free"

    model_config = {"from_attributes": True, "populate_by_name": True}


class LoginResponse(BaseModel):
    """Login response schema combining token and user info."""

    user: UserResponse
    accessToken: str
    refreshToken: str
    tokenType: str = "bearer"
    expiresIn: int


class MessageResponse(BaseModel):
    """Generic message response."""

    message: str


class ForgotPasswordRequest(BaseModel):
    """Forgot password request schema."""

    email: EmailStr
    recaptchaToken: str | None = Field(default=None, description="reCAPTCHA token")


class ResetPasswordRequest(BaseModel):
    """Reset password request schema."""

    token: str = Field(..., min_length=1)
    newPassword: str = Field(
        ...,
        min_length=8,
        max_length=100,
        description="Password must contain uppercase, lowercase, digit, and special character",
    )

    @field_validator("newPassword")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        """Validate password meets strength requirements."""
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)')
        return v


class ChangePasswordRequest(BaseModel):
    """Change password request schema for authenticated users."""

    currentPassword: str = Field(..., min_length=1, max_length=100)
    newPassword: str = Field(
        ...,
        min_length=8,
        max_length=100,
        description="Password must contain uppercase, lowercase, digit, and special character",
    )

    @field_validator("newPassword")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        """Validate password meets strength requirements."""
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)')
        return v
