import axios, {
	type AxiosError,
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import { authService } from "@/services/auth";
import { useAuthStorage } from "@/storage/authStorage";

// --- Service registry ---
// Maps a service key to its base URL env var.
// Add new services here as the platform grows.

export type ServiceKey = "core";

declare module "axios" {
	interface InternalAxiosRequestConfig {
		serviceKey?: ServiceKey;
	}
	interface AxiosRequestConfig {
		serviceKey?: ServiceKey;
	}
}

const SERVICE_URLS: Record<ServiceKey, string> = {
	core: import.meta.env.VITE_API_BASE_URL,
};

const DEFAULT_SERVICE: ServiceKey = "core";

/**
 * Extracts the inner `data` field from the backend's `APIResponse<T>` envelope.
 *
 * The backend wraps ALL successful responses in `{ success: boolean, data: T, message?: string }`.
 * Axios adds its own `.data` layer, so the full path is `axiosResponse.data.data`.
 * This utility hides that double-unwrap so services return clean domain objects.
 *
 * @example
 * ```ts
 * const account = unwrap(await httpClient.get<APIResponse<Account>>('/accounts'));
 * // account is now `Account`, not `{ success, data: Account, message }`
 * ```
 *
 * @param axiosApiResponse - The raw Axios response typed as `AxiosResponse<APIResponse<T>>`
 * @returns The inner data of type `T`
 */
export function unwrap<T>(axiosApiResponse: AxiosResponse<APIResponse<T>>): T {
	return axiosApiResponse.data.data;
}

// --- Refresh token queue ---
// Prevents multiple simultaneous calls to the refresh endpoint.
// All requests that fail with 401 while refreshing are queued
// and resumed (or rejected) when refresh completes.

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

function processQueue(error: unknown, token: string | null): void {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token as string);
		}
	});
	failedQueue = [];
}

// --- Shared 401 interceptor ---

export function attach401Interceptor(client: AxiosInstance): void {
	client.interceptors.response.use(
		(response: AxiosResponse): AxiosResponse => response,

		async (error: AxiosError): Promise<AxiosResponse> => {
			const originalRequest = error.config as InternalAxiosRequestConfig & {
				_retry?: boolean;
			};

			// Only handle 401 errors
			if (error.response?.status !== 401) {
				return Promise.reject(error);
			}

			// Already retried this request — logout and reject
			// This means the refresh succeeded but the new token was also rejected,
			// which should never happen in practice. Logout to be safe.
			if (originalRequest._retry) {
				useAuthStorage.getState().logout();
				return Promise.reject(error);
			}

			const { refreshToken, setTokens, logout } = useAuthStorage.getState();

			// No refresh token — session is dead, logout immediately
			if (!refreshToken) {
				logout();
				return Promise.reject(error);
			}

			// If a refresh is already in progress, queue this request
			if (isRefreshing) {
				return new Promise<AxiosResponse>((resolve, reject) => {
					failedQueue.push({
						resolve: (token: string) => {
							originalRequest.headers.Authorization = `Bearer ${token}`;
							resolve(client(originalRequest));
						},
						reject,
					});
				});
			}

			// Start refresh process
			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const { accessToken, refreshToken: newRefreshToken } =
					await authService.refresh(refreshToken);

				setTokens(accessToken, newRefreshToken);
				processQueue(null, accessToken);

				originalRequest.headers.Authorization = `Bearer ${accessToken}`;

				return client(originalRequest);
			} catch (refreshError) {
				// Refresh failed — refreshToken is expired or invalid, logout immediately
				processQueue(refreshError, null);
				logout();
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		},
	);
}

export const httpClient: AxiosInstance = axios.create({
	baseURL: SERVICE_URLS[DEFAULT_SERVICE],
	headers: { "Content-Type": "application/json" },
});

// --- Request interceptor ---
// Resolves the baseURL dynamically based on the `serviceKey` custom param.
// Falls back to the default service (core) if not provided.

httpClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const token = useAuthStorage.getState().accessToken;
		if (token) config.headers.Authorization = `Bearer ${token}`;

		const serviceKey: ServiceKey = config.serviceKey ?? DEFAULT_SERVICE;
		config.baseURL = SERVICE_URLS[serviceKey];

		return config;
	},
	(error: unknown): Promise<never> => Promise.reject(error),
);

attach401Interceptor(httpClient);
