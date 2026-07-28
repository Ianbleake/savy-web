type ProfileStorage = {
	profile: Profile | null;
	setProfile: (profile: Profile | null) => void;
	clearProfile: () => void;
};