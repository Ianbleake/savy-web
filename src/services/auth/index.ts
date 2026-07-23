import axios from "axios";
import { httpClient, unwrap } from "../http-client";

export const authService: AuthService = {
	// ====================== LOGIN =========================
	// Uses raw axios — login happens before any token exists.
	login: async (credentials: LoginPayload): Promise<AuthResponse> => {
		const response = await axios.post<APIResponse<AuthResponse>>(
			`${import.meta.env.VITE_API_BASE_URL}/auth/login`,
			credentials,
		);
		return unwrap<AuthResponse>(response);
	},

	// ====================== REGISTER =========================
	// Uses raw axios — register happens before any token exists.
	register: async (userData: RegisterPayload): Promise<AuthResponse> => {
		const response = await axios.post<APIResponse<AuthResponse>>(
			`${import.meta.env.VITE_API_BASE_URL}/auth/register`,
			userData,
		);
		return unwrap<AuthResponse>(response);
	},

	// ====================== REFRESH TOKEN =========================
	// Uses raw axios — called from inside the 401 interceptor.
	// Using httpClient here would cause infinite recursion.
	refresh: async (refreshToken: string): Promise<AuthTokens> => {
		const response = await axios.post<APIResponse<AuthTokens>>(
			`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
			{ refreshToken },
		);
		return unwrap<AuthTokens>(response);
	},

	// ====================== LOGOUT =========================
	// Uses httpClient — token is injected by the request interceptor.
	logout: async (): Promise<void> => {
		await httpClient.post<APIResponse<null>>("/auth/logout");
	},

	// ====================== GET ME =========================
	// Uses httpClient — token is injected by the request interceptor.
	getMe: async (): Promise<AuthUser> => {
		const response = await httpClient.get<APIResponse<AuthUser>>("/auth/me");
		return unwrap<AuthUser>(response);
	},
};