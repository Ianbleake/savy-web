import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/utils/errors/getApiErrorMessage";

/**
 * Global error handler for all queries.
 *
 * Any query that fails shows a toast automatically — no need for per-hook
 * `useEffect` + `isError` checks. Queries that treat certain errors as
 * expected business states (e.g. 404 = "account not created yet") can opt
 * out by passing `meta: { suppressToast: true }` in their query options.
 *
 * @see src/types/query-meta.d.ts — Register augmentation for `suppressToast`
 */
const queryCache = new QueryCache({
	onError: (error, query) => {
		if (query.meta?.suppressToast) return;
		toast.error(getApiErrorMessage(error, "Ocurrió un error inesperado"));
	},
});

export const queryClient = new QueryClient({
	queryCache,
	defaultOptions: {
		queries: {
			staleTime: 15 * 60 * 1000,
			gcTime: 30 * 60 * 1000,
			retry: 1,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 0,
		},
	},
});
