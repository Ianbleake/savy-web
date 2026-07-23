import { toast } from "sonner";
import { getApiErrorMessage } from "./getApiErrorMessage";

/**
 * Shows an error toast from an API error, using the backend's message
 * when available and falling back to a provided fallback string.
 *
 * Designed for mutation `onError` handlers — the global `QueryCache.onError`
 * already handles query errors. Use this in mutations that need explicit
 * error feedback beyond the default toast.
 *
 * @example
 * ```ts
 * useMutation({
 *   mutationFn: accountsService.create,
 *   onError: (error) => apiErrorToast(error, "Failed to create account"),
 * });
 * ```
 */
export const apiErrorToast = (error: unknown, fallback: string): void => {
	toast.error(getApiErrorMessage(error, fallback));
};