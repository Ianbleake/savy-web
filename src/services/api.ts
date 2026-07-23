import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const tokens = JSON.parse(localStorage.getItem("auth-storage") || "{}");
	const accessToken = tokens?.state?.accessToken;
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const tokens = JSON.parse(localStorage.getItem("auth-storage") || "{}");
			const refreshToken = tokens?.state?.refreshToken;

			if (refreshToken) {
				try {
				const { data } = await axios.post(
					`${API_BASE_URL}/auth/refresh`,
						{ refreshToken },
					);

					const currentStorage = JSON.parse(
						localStorage.getItem("auth-storage") || "{}",
					);
					currentStorage.state = {
						...currentStorage.state,
						accessToken: data.accessToken,
						refreshToken: data.refreshToken,
					};
					localStorage.setItem("auth-storage", JSON.stringify(currentStorage));

					originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
					return api(originalRequest);
				} catch {
					localStorage.removeItem("auth-storage");
					window.location.href = "/login";
				}
			} else {
				localStorage.removeItem("auth-storage");
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	},
);

export { api };
