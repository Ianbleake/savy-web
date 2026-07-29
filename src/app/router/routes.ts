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
		BANKS: "/app/banks",
		ACCOUNTS: "/app/accounts",
		TRANSACTIONS: "/app/transactions",
		BUDGETS: "/app/budgets",
		GOALS: "/app/goals",
		CREDITS: "/app/credits",
		ANALYTICS: "/app/analytics",
		SETTINGS: "/app/settings",
		ONBOARDING: "/app/onboarding",
	},
	AUX: {
		ROOT: "/aux",
	},
} as const;
