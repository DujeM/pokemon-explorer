# Pokémon Explorer

## Technologies Used

- **React** – UI and application logic
- **Vite** – Fast development server and build tool
- **React Router** – Client-side routing
- **Zustand** - UI state
- **TanStack Query (React Query)** – Data fetching, caching, and background updates
- **Vitest** – Unit and component testing
- **Playwright** – End-to-end (E2E) testing
- **ESLint** – Code quality and linting

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Build for production

```bash
npm run build
```

### Run tests

```bash
# unit / component tests
npm run test

# end-to-end tests
npx playwright test
```

## Project Architecture

The project follows a **feature-based architecture** with shared infrastructure extracted into a shared layer.

```
src/
├── app/            # App-level setup (routing, providers)
├── features/       # Feature modules (explore, team, compare)
├── shared/         # Reusable cross-feature code
├── test/           # Test utilities and MSW setup
├── main.tsx        # Application entry point
└── index.css       # Global styles
```

### Feature Modules (`src/features`)

Each feature is self-contained and organized by responsibility:

```
features/explore/
├── api/            # Feature specific API calls
├── components/     # UI components and feature specific sections
├── hooks/          # Feature specific hooks
├── store/          # Local state
├── types/          # TypeScript types
└── utils/          # Pure utility functions
```

### Shared Layer (`src/shared`)

Contains reusable building blocks used across multiple features:

- **api/** – API client setup and shared endpoints
- **components/** – Generic UI components (layout, modal, loading)
- **hooks/** – Shared hooks
- **types/** – Shared TypeScript types

### App Layer (`src/app`)

Responsible for:

- Route configuration
- Global providers (Router, QueryClient)
- Application layout

## Testing Approach

### Unit & Component Tests (Vitest)

- Pure functions (utils) are tested in isolation
- Components are tested with **Testing Library**
- API calls are mocked using **MSW**
- Tests focus on behavior, not implementation details

### End-to-End Tests (Playwright)

- Located in `/e2e`
- Validate full user flows (navigation, filtering, adding Pokémon)
- Run against a real browser environment
