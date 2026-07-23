# Create Services

We need to create services for the section: [SECTION_NAME].

Before implementing:

- Review the development rules (`docs/dev/dev-rules.md`, `docs/dev/services-rules.md`).
- Search for existing similar services.
- Follow exactly the current project pattern.

Requirements:

- Pure services.
- No UI logic.
- Strict typing.
- Reuse `httpClient`, `unwrap`, and existing utilities.
- Maintain consistency in names and structure.
- The backend wraps ALL responses in `{ success, data, message }`.
  Use `unwrap<T>()` to extract the inner `data` — never access `response.data.data` manually.
- The `/api` prefix is already in `httpClient` `baseURL` — never add it manually.

Verify:

- Payloads
- Responses
- Query params
- Path params
- Shared types

If anything is unclear, ask before implementing.

# Create React Query Hooks

We need to create React Query hooks for the section: [SECTION_NAME].

Before implementing:

- Review existing similar hooks.
- Follow the current project patterns.

Requirements:

- Separate queries and mutations.
- Small, specific hooks.
- Maintain strict typing.
- Do not add unnecessary business logic.
- Reuse existing query keys and helpers.
- Queries auto-toast errors via global `QueryCache.onError`.
  Use `meta: { suppressToast: true }` to opt out when an error is an expected business state.
- Mutations must have `onError` with `getApiErrorMessage(error, "fallback")`.

Verify:

- Invalidations
- Optimistic updates (if applicable)
- Loading/error states
- Response and payload typing

If any doubt or ambiguity exists, ask before continuing.