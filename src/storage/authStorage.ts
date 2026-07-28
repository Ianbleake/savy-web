import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useProfileStorage } from "@/storage/profile/profileStorage";

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
				// Clear the persisted profile so a different user logging in on the
				// same device does not rehydrate the previous user's profile from
				// AsyncStorage before their own query resolves.
				useProfileStorage.getState().clearProfile();
			},
		}),
		{
			name: "auth-storage",
		},
	),
);
