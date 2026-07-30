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
		BANKS_NEW: "/app/banks/new",
		BANKS_DETAIL: "/app/banks/:id",
		BANKS_EDIT: "/app/banks/:id/edit",
		ACCOUNTS: "/app/accounts",
		ACCOUNTS_NEW: "/app/accounts/new",
		TRANSACTIONS: "/app/transactions",
		TRANSACTIONS_NEW: "/app/transactions/new",
		BUDGETS: "/app/budgets",
		BUDGETS_NEW: "/app/budgets/new",
		GOALS: "/app/goals",
		GOALS_NEW: "/app/goals/new",
		CREDITS: "/app/credits",
		ANALYTICS: "/app/analytics",
		SETTINGS: "/app/settings",
		ONBOARDING: "/app/onboarding",
	},
	AUX: {
		ROOT: "/aux",
	},
} as const;
