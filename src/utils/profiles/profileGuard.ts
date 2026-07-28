import { ROUTES } from "@/app/router/routes";

/**
 * Pure routing guard for the onboarding flow.
 *
 * @param profile - the user's profile. `undefined` means "still loading".
 * @param pathname - current location pathname.
 * @returns the route to redirect to, or `null` when no redirect is needed.
 */
export const profileGuard = (
	profile: Profile | null | undefined,
	pathname: string,
): string | null => {
	// Still loading or fetch failed — do not redirect.
	// The 401 interceptor handles invalid tokens via logout; ProtectedRoute
	// handles unauthenticated users. Redirecting here causes infinite loops
	// when isAuthenticated is true but the profile fetch fails.
	if (profile === undefined || profile === null) return null;

	// Onboarding incomplete — force the user into the wizard.
	if (!profile.onboardingCompleted) {
		return pathname === ROUTES.APP.ONBOARDING ? null : ROUTES.APP.ONBOARDING;
	}

	// Onboarding completed but user is sitting on the onboarding route — send home.
	if (pathname === ROUTES.APP.ONBOARDING) return ROUTES.APP.ROOT;

	return null;
};
