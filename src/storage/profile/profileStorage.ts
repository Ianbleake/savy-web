import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProfileStorage = {
	profile: Profile | null;
	setProfile: (profile: Profile | null) => void;
	clearProfile: () => void;
};

export const useProfileStorage = create<ProfileStorage>()(
	persist(
		(set) => ({
			profile: null,

			setProfile: (profile: Profile | null): void => {
				set({ profile });
			},

			clearProfile: (): void => {
				set({ profile: null });
				useProfileStorage.persist.clearStorage();
			},
		}),
		{
			name: "savy-profile",
			partialize: (state) => ({ profile: state.profile }),
		},
	),
);
