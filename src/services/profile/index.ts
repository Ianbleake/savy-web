import { httpClient, unwrap } from "../http-client";

type OnboardingValidation = {
	valid: boolean;
	missingFields: string[];
};

type ProfileService = {
	getProfile: () => Promise<Profile>;
	updateProfile: (payload: UpdateProfilePayload) => Promise<Profile>;
	validateOnboarding: () => Promise<OnboardingValidation>;
	completeOnboarding: () => Promise<Profile>;
};

export const profileService: ProfileService = {
	// ====================== GET PROFILE =========================
	getProfile: async (): Promise<Profile> => {
		const response = await httpClient.get<APIResponse<Profile>>("/profiles/me");
		return unwrap<Profile>(response);
	},

	// ====================== UPDATE PROFILE =========================
	// Backend uses forbidNonWhitelisted — only UpdateProfileDto fields are allowed.
	updateProfile: async (payload: UpdateProfilePayload): Promise<Profile> => {
		const response = await httpClient.patch<APIResponse<Profile>>("/profiles/me", payload);
		return unwrap<Profile>(response);
	},

	// ====================== VALIDATE ONBOARDING =========================
	validateOnboarding: async (): Promise<OnboardingValidation> => {
		const response = await httpClient.get<APIResponse<OnboardingValidation>>(
			"/profiles/onboarding/validate",
		);
		return unwrap<OnboardingValidation>(response);
	},

	// ====================== COMPLETE ONBOARDING =========================
	// Returns 400 with missingFields when requirements are not met.
	completeOnboarding: async (): Promise<Profile> => {
		const response = await httpClient.post<APIResponse<Profile>>("/profiles/onboarding/complete");
		return unwrap<Profile>(response);
	},
};
