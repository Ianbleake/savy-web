# AGENTS.md — savy-web

Code rules and conventions for the frontend (React + TypeScript).

---

## Component conventions

### File structure

- **One component per file.** If a component has sub-components, the `.tsx` file becomes a **folder** following the same convention.
- Component folders use **kebab-case**: `account-card/`, `budget-progress/`.
- Inside a component folder:
  - `index.tsx` — the main component (single export)
  - `{name}.d.ts` — component types (ambient declarations, no `export`)
  - `utils.ts` — helper functions or utilities
  - `Components/` — sub-components, each in its own folder with the same structure

```
account-card/
├── index.tsx
├── account-card.d.ts
├── utils.ts
└── Components/
    ├── balance-display/
    │   └── index.tsx
    └── transaction-list/
        ├── index.tsx
        └── transaction-list.d.ts
```

- This structure applies **recursively**: if a sub-component has its own sub-components, repeat the pattern.

### Exports

- **Never use `export default`** unless strictly necessary (e.g., lazy loading with `React.lazy`).
- Always use **named exports**: `export { MyComponent }`, never `export default MyComponent`.
- This applies to components, hooks, services, utils — everything.

### Types

- **Domain types, service contracts, and shared types go in `.d.ts` ambient files.** Never inline.
- Type files go inside the component/service/hook folder.
- **Exception — local component props:** `Props` exclusive to a single component (or screen store state types) MAY be defined inline in the `.tsx`/`.ts` file, since they are never reused and co-location improves DX. As soon as a type is needed in more than one file, move it to `.d.ts`.
- `.d.ts` files are **ambient declarations** (no `export` or `import` at top-level). Reference external types with inline `import()`:
  ```typescript
  type MyProps = {
    account: import("@/storage/accountStorage").Account;
  };
  ```
- **NEVER use `any`**, under any circumstance. If you don't know the type, investigate first.

### State hooks

- **All `useState` calls must have the explicit generic type**, even when TypeScript could infer it:
  - `useState<boolean>(false)` — never `useState(false)`
  - `useState<number>(0)` — never `useState(0)`
  - `useState<string>("")` — never `useState("")`
  - `useState<string | null>(null)`

### Variables and naming

- **NEVER use magic variables** like `s`, `j`, `a`, `b` in callbacks or iterators.
- Use descriptive names always:
  - `(s) => s.accounts` -> `(state) => state.accounts`
  - `(a) => a.balance` -> `(account) => account.balance`
  - `(a, b) => a.date - b.date` -> `(prev, next) => prev.date - next.date`

### Helpers and utilities

- Helper functions exclusive to a component go in `utils.ts` inside its folder.
- Constants like label maps or static configuration also go in `utils.ts`.
- If a helper is reusable across multiple components, it goes in `src/utils/`.

---

## Store conventions (Zustand)

- Stores go in `src/storage/` (camelCase). Suffix depends on responsibility:
  - **`{name}Storage.ts`** when the store **stores/persists domain data**: `authStorage.ts`, `accountStorage.ts`.
  - **`{name}Controller.ts`** when the store **only manages UI state/filters for a screen** (does not persist domain data): `dashboardController.ts`.
- Zustand 5 syntax: `create<Type>()((set, get) => ...)` — note the double parentheses.
- Standalone selectors exported outside `create()`, not inside.
- Store types go in `{name}.d.ts` inside the storage folder (e.g., `src/storage/auth.d.ts`).

## Hook conventions

- Hooks in `src/hooks/` named `use{Name}.ts` (camelCase): `useAccounts.ts`, `useAuth.ts`.
- Domain subfolders use **kebab-case**: `src/hooks/accounts/`, `src/hooks/auth/`.
- Query hooks auto-toast errors via the global `QueryCache.onError` handler.
  Use `meta: { suppressToast: true }` to opt out when an error is an expected business state.
- Mutation hooks must have `onError` with `getApiErrorMessage(error, "fallback")`.

## Service conventions

- Services in `src/services/{name}/` (one folder per domain).
- Service types in `{name}.d.ts` inside the service folder.
- Services are **pure functions** — no UI logic, no React imports.
- Services reuse `httpClient`, `unwrap`, and existing utilities.
- The `/api` prefix is already included in `httpClient` `baseURL` — never add it manually.
- The backend wraps ALL responses in `{ success: boolean, data: T, message?: string }`.
  Use `unwrap<T>()` to extract the inner `data` — never access `response.data.data` manually.

### HTTP client

- `src/services/http-client.ts` — shared axios instance with:
  - `unwrap<T>()` — strips the `APIResponse<T>` envelope, returns clean `T`.
  - Request interceptor — injects Bearer token from `useAuthStorage.getState()`, resolves `baseURL` by `serviceKey`.
  - 401 interceptor — queues concurrent requests, refreshes token via `authService.refresh`, retries once, logs out on failure.
- `src/services/types.d.ts` — `APIResponse<T>` envelope + `QueuedRequest` types (ambient, shared by all services).
- `src/services/query-client.ts` — global `QueryClient` with `QueryCache.onError` toast handler.
- `src/services/persister.ts` — async storage persister for React Query cache.

### Error handling

- `src/utils/errors/getApiErrorMessage.ts` — extracts `response.data.message` from the `APIResponse` envelope, falls back to `Error.message`, then to a passed fallback string.
- `src/types/query-meta.d.ts` — TanStack Query `Register` augmentation for `meta: { suppressToast: true }`.
- Every mutation hook must call `getApiErrorMessage(error, "fallback")` in its `onError`.
- The global `QueryCache.onError` handler toasts all failed queries unless `suppressToast` is set.

## General conventions

- TypeScript strict with `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`.
- `import type` for type-only imports (`verbatimModuleSyntax: true`).
- Biome as linter and formatter.
- Package manager: **bun** (never npm or yarn).
- OKLCH for colors.
- Elevation: ring or box-shadow, whichever looks better for the case.
- Icons: Lucide React.
- Toast: Sonner.

## Response style

- **Brief, technical, direct.** No verbose explanations or redundant context.
- Go straight to the point: what was done, why, and code if applicable.
- Don't repeat context the user already knows.
- Prioritize token efficiency in every response.