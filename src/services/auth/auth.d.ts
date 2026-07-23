type AuthUser = {
	id: string;
	email: string;
	name: string | null;
};

type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};

type AuthResponse = AuthTokens & {
	user: AuthUser;
};

type LoginPayload = {
	email: string;
	password: string;
};

type RegisterPayload = {
	email: string;
	password: string;
	name: string;
};

type RefreshPayload = {
	refreshToken: string;
};

type AuthService = {
	login: (payload: LoginPayload) => Promise<AuthResponse>;
	register: (payload: RegisterPayload) => Promise<AuthResponse>;
	refresh: (refreshToken: string) => Promise<AuthTokens>;
	logout: (accessToken: string) => Promise<void>;
	getMe: (accessToken: string) => Promise<AuthUser>;
};