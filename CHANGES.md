# Zmiany w Repozytorium - Restructuryzacja

## Data: 2025-10-14

## Podsumowanie

Zrestrukturyzowano repozytorium, aby zawierało:
1. Trzy biblioteki core (fastapi-core, react-core, vue-core)
2. Trzy aplikacje demo pokazujące użycie cores
3. Workspace configuration dla łatwego zarządzania

## Utworzone Pliki i Katalogi

### 1. Aplikacja Backend (apps/backend/)
```
apps/backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # Główny plik aplikacji FastAPI
│   └── settings.py      # Rozszerzone ustawienia z fastapi-core
├── requirements.txt     # Zależności Pythona
├── .env.example         # Przykładowa konfiguracja
├── .gitignore
└── README.md
```

**Funkcjonalność:**
- Używa `fastapi-core` jako biblioteki
- Przykładowe endpointy: `/hello`, `/status`
- Health check z core: `/`, `/health`
- Port: 8000

### 2. Aplikacja React Next.js (apps/react-next/)
```
apps/react-next/
├── src/
│   └── app/
│       ├── layout.tsx   # Root layout z QueryProvider
│       ├── page.tsx     # Strona główna z demo
│       └── globals.css
├── package.json
├── tsconfig.json        # Z aliasami @/* i @/core/*
├── next.config.ts       # Z proxy /api -> backend:8000
├── .env.example
├── .gitignore
└── README.md
```

**Funkcjonalność:**
- Używa `react-core` jako biblioteki
- Next.js 15 App Router
- React 19
- TanStack Query integration
- API proxy do backendu
- Port: 3000

### 3. Aplikacja Vue Vite (apps/vue-vite/)
```
apps/vue-vite/
├── src/                 # Cała zawartość z poprzedniego vue-core
├── package.json
├── tsconfig.json        # Zaktualizowany z aliasem @/core/*
├── vite.config.ts       # Zaktualizowany z proxy i aliasem
├── .gitignore
└── README.md            # Nowy
```

**Funkcjonalność:**
- Używa nowej biblioteki `vue-core`
- Vue 3 + Vite
- Tailwind CSS
- API proxy do backendu
- Port: 5173 (zmieniony z 3000)

### 4. Nowa Biblioteka vue-core
```
vue-core/
├── src/
│   ├── index.ts                    # Główny export
│   ├── lib/
│   │   ├── api.client.ts           # Axios z auto token refresh
│   │   ├── auth.api.ts             # API functions
│   │   ├── auth.config.ts          # Konfiguracja
│   │   ├── error.guards.ts         # Type guards
│   │   ├── navigation.ts           # Router-agnostic navigation
│   │   └── utils.ts                # Utilities (cn)
│   ├── composables/
│   │   └── useAuth.ts              # Vue composables dla auth
│   └── types/
│       └── auth.type.ts            # TypeScript types
├── package.json                    # Biblioteka (bez Vite)
├── tsconfig.json
├── .gitignore
└── README.md                       # Pełna dokumentacja
```

**Funkcjonalność:**
- Analogiczna do `react-core` ale dla Vue 3
- TanStack Query (Vue Query) composables
- Pełna funkcjonalność auth
- Type-safe error handling
- Router-agnostic navigation

### 5. Workspace Configuration
```
/
├── package.json            # Root workspace config
└── pnpm-workspace.yaml     # PNPM workspace definition
```

**Skrypty:**
- `pnpm dev:all` - uruchamia backend + React + Vue równolegle
- `pnpm dev:backend` - tylko backend
- `pnpm dev:react` - tylko React
- `pnpm dev:vue` - tylko Vue
- `pnpm install:all` - instaluje wszystkie zależności

## Zmodyfikowane Pliki

### README.md
- Dodano sekcję "Demo Applications"
- Zaktualizowano strukturę repozytorium
- Dodano instrukcje uruchamiania `pnpm dev:all`
- Zaktualizowano opis vue-core (już nie WIP)

### SETUP_SUMMARY.md
- Dodano sekcję "Quick Start - Running Demo Apps"
- Zaktualizowano strukturę katalogów
- Zaktualizowano status vue-core (✅ zamiast ⏳)
- Dodano opis aplikacji demo

### CLAUDE.md
- (Może wymagać aktualizacji w przyszłości z nową strukturą)

## Migracja vue-core

**Przed:**
```
vue-core/                  # Aplikacja Vite
├── src/
│   ├── App.vue
│   ├── main.ts
│   ├── pages/
│   ├── layouts/
│   └── ...
├── vite.config.ts
└── package.json (z Vite)
```

**Po:**
```
vue-core/                  # Biblioteka (jak react-core)
├── src/
│   ├── index.ts
│   ├── composables/
│   ├── lib/
│   └── types/
└── package.json (bez Vite, tylko peer deps)

apps/vue-vite/             # Aplikacja Vite
├── src/
│   ├── App.vue
│   ├── main.ts
│   └── ...
├── vite.config.ts
└── package.json (z Vite)
```

## Instrukcje Uruchomienia

### Pierwsza Instalacja

```bash
cd /home/madeyskij/projects/private/saas-multirepo

# Zainstaluj zależności frontend
pnpm install

# Zainstaluj zależności backend
cd apps/backend
pip install -r requirements.txt
cd ../..

# Lub użyj skryptu
pnpm install:all
```

### Uruchomienie

```bash
# Wszystko naraz
pnpm dev:all

# Lub osobno
pnpm dev:backend  # http://127.0.0.1:8000
pnpm dev:react    # http://localhost:3000
pnpm dev:vue      # http://localhost:5173
```

### Testowanie

1. Backend: `http://127.0.0.1:8000/hello`
2. React: `http://localhost:3000` (proxy /api do backendu)
3. Vue: `http://localhost:5173` (proxy /api do backendu)

## Porty

- Backend: **8000**
- React Next.js: **3000**
- Vue Vite: **5173** (zmieniony z 3000)

## Workspaces

PNPM workspaces obejmują:
- `fastapi-core`
- `react-core`
- `vue-core`
- `apps/*` (backend, react-next, vue-vite)

## Aliasy TypeScript

### React Next.js (apps/react-next/tsconfig.json)
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/core/*": ["../../react-core/src/*"]
  }
}
```

### Vue Vite (apps/vue-vite/tsconfig.json)
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/core/*": ["../../vue-core/src/*"]
  }
}
```

## Proxy Configuration

### React Next.js (next.config.ts)
```ts
rewrites: [
  { source: '/api/:path*', destination: 'http://127.0.0.1:8000/:path*' }
]
```

### Vue Vite (vite.config.ts)
```ts
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

## Następne Kroki

1. ✅ Wszystkie aplikacje demo działają lokalnie
2. ⏳ Przetestować integrację auth między frontend a backend
3. ⏳ Dodać przykładowe strony login/dashboard do apps
4. ⏳ Zaktualizować CLAUDE.md z nową strukturą
5. ⏳ Commit i push zmian do git

## Notatki

- Zachowano historię git w vue-core (katalog .git)
- Wszystkie pliki .env.example są gotowe do użycia
- Backend wymaga SECRET_KEY w .env (minimum 32 znaki)
- Frontend apps mają już skonfigurowane proxy do backendu
- Workspaces pozwalają na shared dependencies między projektami

