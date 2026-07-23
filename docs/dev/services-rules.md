# RULES — SERVICES & HOOKS

These are mandatory rules for this task.
You must follow them throughout the implementation.

## Context

We need to implement new services and hooks for the section: `[SECTION_NAME]`.

---

# Mandatory Rules

## 1. Review context before implementing

Before writing any code:

- Review the project's development rules (`docs/dev/dev-rules.md`).
- Review existing similar implementations.
- Review the API documentation (Swagger at `/api/docs` or `ENDPOINTS.md`).
- Identify and replicate existing patterns from the project.

Do not start implementing without first analyzing the current context.

---

## 2. Expected architecture

Services are a direct mirror of the API.

Therefore:

- Each API section must have its own folder inside `src/services/`.
- You must implement ALL endpoints from the documented section.
- Do not implement only the explicitly mentioned endpoints.
- The structure must remain consistent with the rest of the project.

---

## 3. Implementation rules

### Services

- Must be pure functions.
- Must not contain UI logic.
- Must reuse `httpClient`, `unwrap`, and existing utilities.
- Must maintain strict typing.
- Must respect existing naming and structure.
- The `/api` prefix is already included in the `httpClient` `baseURL`.
- Never add `/api` manually in service endpoints.
- The backend wraps ALL responses in `{ success: boolean, data: T, message?: string }`.
  Use `unwrap<T>()` to extract the inner `data` field — never access `response.data.data` manually.

### Hooks

- Must follow the project's current pattern.
- Separate queries and mutations correctly.
- Keep hooks small and specific.
- Avoid unnecessary business logic.
- Reuse existing query keys and helpers.
- Queries automatically toast errors via the global `QueryCache.onError` handler.
  Use `meta: { suppressToast: true }` to opt out when an error is an expected business state
  (e.g. 404 = "resource not created yet").
- Mutations must have their own `onError` toast with `getApiErrorMessage(error, "fallback")`.

---

## 3.1 Comment and format conventions

- Respect exactly the comment format used in the project.
- Do not invent new comment styles.
- Replicate the existing pattern exactly.

Valid example:

//*=================== UPDATE ACCOUNT ===================

- Comments in `.d.ts`, services, and hooks must follow this format if the project already uses it.
- Maintain consistency in capitalization, spacing, and separators.

## 4. Project consistency

- Do not invent new patterns if one already exists in the project.
- Do not introduce unnecessary new architectures.
- Prioritize consistency over creativity.
- Replicate current patterns even if multiple valid approaches exist.

---

## 5. Important restrictions

- Do not invent endpoints.
- Do not invent payloads.
- Do not invent responses.
- All implementation must be based on existing documentation.
- Do not assume undocumented behavior.

---

## 6. Validations

Before finishing:

- Verify types.
- Verify imports.
- Verify query keys.
- Verify invalidations.
- Verify naming consistency.
- Verify that all endpoints in the section were implemented.

---

## 7. Ambiguity or doubts

If context is missing, ambiguity exists, or inconsistencies are detected:

- Stop.
- Explain the doubt.
- Ask before continuing.