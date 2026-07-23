import axios from "axios";
import { unwrap } from "../http-client";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export const authService: AuthService = {
	// ====================== LOGIN =========================
	login: async (credentials: LoginPayload): Promise<AuthResponse> => {
		const response = await axios.post<APIResponse<AuthResponse>>(
			`${BASE_API_URL}/auth/login`,
			credentials,
		);
		return unwrap<AuthResponse>(response);
	},

	// ====================== REGISTER =========================
	register: async (userData: RegisterPayload): Promise<AuthResponse> => {
		const response = await axios.post<APIResponse<AuthResponse>>(
			`${BASE_API_URL}/auth/register`,
			userData,
		);
		return unwrap<AuthResponse>(response);
	},

	// ====================== REFRESH TOKEN =========================
	refresh: async (refreshToken: string): Promise<AuthTokens> => {
		const response = await axios.post<APIResponse<AuthTokens>>(`${BASE_API_URL}/auth/refresh`, {
			refreshToken,
		});
		return unwrap<AuthTokens>(response);
	},

	// ====================== LOGOUT =========================
	logout: async (accessToken: string): Promise<void> => {
		await axios.post<APIResponse<null>>(
			`${BASE_API_URL}/auth/logout`,
			{},
			{ headers: { Authorization: `Bearer ${accessToken}` } },
		);
	},

	// ====================== GET ME =========================
	getMe: async (accessToken: string): Promise<AuthUser> => {
		const response = await axios.get<APIResponse<AuthUser>>(`${BASE_API_URL}/auth/me`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		return unwrap<AuthUser>(response);
	},
};
