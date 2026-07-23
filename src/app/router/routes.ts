export const ROUTES = {
	LANDING: {
		ROOT: "/",
	},

	AUTH: {
		ROOT: "/auth",
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		FORGOT_PASSWORD: "/auth/forgot-password",
		RESET_PASSWORD: "/auth/reset-password",
	},

	APP: {
		ROOT: "/app",
		DASHBOARD: "/app/dashboard",
		SETTINGS: "/app/settings",
	},
} as const;