/**
 * Module augmentation — extends TanStack Query v5's type registry.
 *
 * ## Why this exists
 *
 * `QueryCache.onError` (see `src/services/query-client.ts`) shows a global
 * error toast for every failed query. However, some queries treat specific
 * HTTP errors as expected business states, not user-facing failures:
 *
 * - A 404 might mean "resource not created yet" (onboarding flow)
 * - A 401 might mean "no permission" (authz check)
 *
 * Those hooks pass `meta: { suppressToast: true }` so the global handler
 * skips the toast. This declaration tells TypeScript that `suppressToast`
 * is a valid field on `query.meta`.
 *
 * IMPORTANT: This file MUST stay a module (i.e. have a top-level `export`)
 * so that the `declare module` block below is treated as a module augmentation
 * and NOT as an ambient module declaration.  Without `export {}`, TypeScript
 * treats this as a global script file and the `declare module` block *replaces*
 * the real "@tanstack/react-query" package, making all of its exports invisible.
 *
 * @see https://tanstack.com/query/v5/docs/framework/react/typescript#registering-a-global-meta
 */
export {};

declare module "@tanstack/react-query" {
	interface Register {
		queryMeta: {
			/** When `true`, the global `QueryCache.onError` handler skips the error toast for this query. */
			suppressToast?: boolean;
		};
	}
}