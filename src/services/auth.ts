import { api } from "./api";

type LoginPayload = {
	email: string;
	password: string;
};

type RegisterPayload = {
	email: string;
	password: string;
	name: string;
};

type AuthResponse = {
	accessToken: string;
	refreshToken: string;
	user: {
		id: string;
		email: string;
		name: string;
	};
};

async function login(payload: LoginPayload): Promise<AuthResponse> {
	const { data } = await api.post<AuthResponse>("/auth/login", payload);
	return data;
}

async function register(payload: RegisterPayload): Promise<AuthResponse> {
	const { data } = await api.post<AuthResponse>("/auth/register", payload);
	return data;
}

async function logout(): Promise<void> {
	await api.post("/auth/logout");
}

async function getMe(): Promise<AuthResponse["user"]> {
	const { data } = await api.get<AuthResponse["user"]>("/auth/me");
	return data;
}

export { login, register, logout, getMe };
export type { LoginPayload, RegisterPayload, AuthResponse };
