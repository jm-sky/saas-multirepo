# Backend Demo Application

Przykładowa aplikacja FastAPI używająca `fastapi-core` jako biblioteki bazowej.

## Struktura

```
apps/backend/
├── app/
│   ├── api/              # API endpoints
│   │   └── v1/
│   │       ├── __init__.py  # API router
│   │       └── auth.py      # Authentication endpoints
│   ├── models/           # SQLAlchemy models
│   │   └── user.py
│   ├── schemas/          # Pydantic schemas
│   │   └── auth.py
│   ├── services/         # Business logic
│   │   └── auth_service.py
│   ├── database.py       # Database setup
│   ├── dependencies.py   # FastAPI dependencies
│   ├── exceptions.py     # Custom exceptions
│   ├── decorators.py     # Custom decorators
│   ├── oauth.py          # OAuth config
│   ├── settings.py       # Settings extending fastapi-core
│   └── main.py           # Application entry point
├── alembic/              # Database migrations
├── requirements.txt
└── README.md
```

## Funkcjonalności

### Zaimplementowane (auth):
- ✅ Rejestracja użytkowników
- ✅ Logowanie (email/password)
- ✅ JWT access + refresh tokens
- ✅ Token blacklist (Redis)
- ✅ OAuth Google login
- ✅ Password reset (forgot/reset)
- ✅ Change password
- ✅ reCAPTCHA v3 protection
- ✅ Rate limiting

## Jak używać fastapi-core

### 1. Settings

Rozszerz `BaseSettings` z fastapi-core:

```python
# app/settings.py
from pydantic import Field
from fastapi_core import BaseSettings

class Settings(BaseSettings):
    """Application settings extending fastapi-core BaseSettings."""
    
    # Custom application settings
    frontend_url: str = Field(
        default="http://localhost:3000",
        validation_alias="FRONTEND_URL"
    )

settings = Settings()
```

### 2. Main App

Użyj `create_app()` z fastapi-core:

```python
# app/main.py
from fastapi_core import create_app
from app.settings import settings
from app.api.v1 import api_router

app = create_app(
    settings=settings,
    extra_routers=[api_router],
)
```

### 3. Dependencies

Użyj funkcji z fastapi-core w dependencies:

```python
# app/dependencies.py
from fastapi_core import verify_token
from app.settings import settings

async def get_current_user(credentials, db):
    payload = verify_token(credentials.credentials, settings)
    # ... rest of logic
```

### 4. Services

Użyj funkcji crypto z fastapi-core:

```python
# app/services/auth_service.py
from fastapi_core import (
    create_access_token,
    create_refresh_token,
    verify_password,
    get_password_hash,
)
from app.settings import settings

class AuthService:
    @staticmethod
    def _create_tokens(user):
        access = create_access_token({"sub": user.id}, settings)
        refresh = create_refresh_token({"sub": user.id}, settings)
        return access, refresh
```

### 5. Decorators

Użyj decoratorów z fastapi-core:

```python
# app/decorators.py
from fastapi_core import recaptcha_protected as core_recaptcha
from fastapi_core.middleware.rate_limit import limiter
from app.settings import settings

def rate_limit(limit: str):
    return lambda func: limiter(settings).limit(limit)(func)

def recaptcha_protected(action: str):
    return core_recaptcha(action, settings)
```

## Uruchomienie

```bash
# Zainstaluj zależności
pip install -r requirements.txt

# Ustaw zmienne środowiskowe
export DATABASE_URL="postgresql://user:pass@localhost/dbname"
export REDIS_URL="redis://localhost:6379/0"
export SECRET_KEY="your-secret-key-min-32-chars"

# Uruchom migracje
alembic upgrade head

# Uruchom serwer
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Zmienne środowiskowe

### Wymagane
- `SECRET_KEY` - Klucz dla JWT (min 32 znaki)
- `DATABASE_URL` - URL do PostgreSQL
- `REDIS_URL` - URL do Redis

### Opcjonalne (z defaultami)
- `APP_NAME` - Nazwa aplikacji (default: "FastAPI Microservice")
- `DEBUG` - Tryb debug (default: false)
- `CORS_ORIGINS` - Dozwolone origins (default: ["http://localhost:3000"])
- `ACCESS_TOKEN_EXPIRES_MINUTES` - Wygaśnięcie access token (default: 30)
- `REFRESH_TOKEN_EXPIRES_DAYS` - Wygaśnięcie refresh token (default: 7)

### reCAPTCHA (opcjonalne)
- `RECAPTCHA_ENABLED` - Włącz reCAPTCHA (default: false)
- `RECAPTCHA_SECRET_KEY` - Google reCAPTCHA v3 secret key
- `RECAPTCHA_SITE_KEY` - Google reCAPTCHA v3 site key
- `RECAPTCHA_MIN_SCORE` - Minimalny score (default: 0.5)

### OAuth Google (opcjonalne)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_REDIRECT_URI` - OAuth redirect URI

## Co jest w fastapi-core?

fastapi-core dostarcza:
- ✅ `create_app()` - Factory z CORS, rate limiting, exception handlers
- ✅ `BaseSettings` - Konfiguracja (app, server, security, rate_limit, database, redis, recaptcha, google_oauth)
- ✅ JWT funkcje - `create_access_token`, `create_refresh_token`, `verify_token`, `create_password_reset_token`
- ✅ Password hashing - `verify_password`, `get_password_hash`
- ✅ Token blacklist - Redis-based z auto-expiration
- ✅ reCAPTCHA - `verify_recaptcha`, `recaptcha_protected` decorator
- ✅ OAuth - `create_oauth` (Google)
- ✅ Rate limiting - SlowAPI integration
- ✅ Exception handlers - Validation, Auth errors
- ✅ Health endpoints - `/` i `/health`

## Co dodajesz w aplikacji?

W aplikacji dodajesz:
- 📝 Models - SQLAlchemy modele (User, Profile, etc.)
- 📝 Schemas - Pydantic request/response schemas
- 📝 Services - Business logic
- 📝 API endpoints - FastAPI routers
- 📝 Dependencies - Auth dependencies używające fastapi-core
- 📝 Migrations - Alembic migrations
- 📝 Custom settings - Rozszerzenia BaseSettings

## Testowanie

```bash
# Testy jednostkowe
pytest

# Testy z coverage
pytest --cov=app --cov-report=html

# Sprawdź endpointy
curl http://localhost:8000/health
```

## Dokumentacja API

Po uruchomieniu dostępna pod:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
