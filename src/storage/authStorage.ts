import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStorage = create<AuthStorage>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			user: null,
			isAuthenticated: false,

			setTokens: (accessToken: string, refreshToken: string): void => {
				set({ accessToken, refreshToken, isAuthenticated: true });
			},

			setAuth: ({ accessToken, refreshToken, user }): void => {
				set({
					accessToken,
					refreshToken,
					user,
					isAuthenticated: true,
				});
			},

			setUser: (user: AuthUser): void => {
				set({ user });
			},

			logout: (): void => {
				set({
					accessToken: null,
					refreshToken: null,
					user: null,
					isAuthenticated: false,
				});
				useAuthStorage.persist.clearStorage();
			},
		}),
		{
			name: "auth-storage",
		},
	),
);
