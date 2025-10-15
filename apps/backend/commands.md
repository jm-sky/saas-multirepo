# Commands

### Run migrations
```
alembic upgrade head
```

### Start application
```
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```