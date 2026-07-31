import axios from "axios";
import { httpClient, unwrap } from "../http-client";

const API_BASE_URL =
	import.meta.env.VITE_SCOPE === "dev"
		? import.meta.env.VITE_DEV_API_BASE_URL
		: import.meta.env.VITE_PROD_API_BASE_URL;

type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};

type AuthService = {
	login: (payload: LoginPayload) => Promise<AuthResponse>;
	register: (payload: RegisterPayload) => Promise<AuthResponse>;
	refresh: (refreshToken: string) => Promise<AuthTokens>;
	logout: () => Promise<void>;
	getMe: () => Promise<AuthUser>;
	forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
	resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
};

export const authService: AuthService = {
	// ====================== LOGIN =========================
	// Uses raw axios — login happens before any token exists.
	login: async (credentials: LoginPayload): Promise<AuthResponse> => {
		const response = await axios.post<APIResponse<AuthResponse>>(
			`${API_BASE_URL}/auth/login`,
			credentials,
		);
		return unwrap<AuthResponse>(response);
	},

	// ====================== REGISTER =========================
	// Uses raw axios — register happens before any token exists.
	register: async (userData: RegisterPayload): Promise<AuthResponse> => {
		const response = await axios.post<APIResponse<AuthResponse>>(
			`${API_BASE_URL}/auth/register`,
			userData,
		);
		return unwrap<AuthResponse>(response);
	},

	// ====================== REFRESH TOKEN =========================
	// Uses raw axios — called from inside the 401 interceptor.
	// Using httpClient here would cause infinite recursion.
	refresh: async (refreshToken: string): Promise<AuthTokens> => {
		const response = await axios.post<APIResponse<AuthTokens>>(`${API_BASE_URL}/auth/refresh`, {
			refreshToken,
		});
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

	// ====================== FORGOT PASSWORD =========================
	// Uses raw axios — no token needed. Response data is null; message lives in the envelope.
	forgotPassword: async (payload: ForgotPasswordPayload): Promise<void> => {
		await axios.post<APIResponse<null>>(`${API_BASE_URL}/auth/forgot-password`, payload);
	},

	// ====================== RESET PASSWORD =========================
	// Uses raw axios — tokens come from the Supabase redirect URL, not from storage.
	// Response data is null; message lives in the envelope.
	resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
		await axios.post<APIResponse<null>>(`${API_BASE_URL}/auth/reset-password`, payload);
	},
};
