import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
	id: string;
	email: string;
	name: string;
};

type AuthState = {
	accessToken: string | null;
	refreshToken: string | null;
	user: User | null;
	isAuthenticated: boolean;
};

type AuthActions = {
	setTokens: (accessToken: string, refreshToken: string) => void;
	setUser: (user: User) => void;
	login: (accessToken: string, refreshToken: string, user: User) => void;
	logout: () => void;
};

const useAuthStorage = create<AuthState & AuthActions>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			user: null,
			isAuthenticated: false,

			setTokens: (accessToken: string, refreshToken: string) =>
				set({ accessToken, refreshToken, isAuthenticated: true }),

			setUser: (user: User) => set({ user }),

			login: (accessToken: string, refreshToken: string, user: User) =>
				set({ accessToken, refreshToken, user, isAuthenticated: true }),

			logout: () =>
				set({
					accessToken: null,
					refreshToken: null,
					user: null,
					isAuthenticated: false,
				}),
		}),
		{
			name: "auth-storage",
		},
	),
);

export { useAuthStorage };
