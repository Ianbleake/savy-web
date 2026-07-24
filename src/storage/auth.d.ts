type AuthUser = {
	id: string;
	email: string;
};

type AuthStorage = {
	accessToken: string | null;
	refreshToken: string | null;
	user: AuthUser | null;
	isAuthenticated: boolean;

	setTokens: (accessToken: string, refreshToken: string) => void;
	setAuth: (auth: { accessToken: string; refreshToken: string; user: AuthUser }) => void;
	setUser: (user: AuthUser) => void;
	logout: () => void;
};