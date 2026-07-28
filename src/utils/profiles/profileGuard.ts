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
	// Still loading — do not redirect yet to avoid flicker.
	if (profile === undefined) return null;

	// Defensive: no profile at all (shouldn't happen inside ProtectedRoute).
	if (profile === null) return ROUTES.AUTH.LOGIN;

	// Onboarding incomplete — force the user into the wizard.
	if (!profile.onboardingCompleted) {
		return pathname === ROUTES.APP.ONBOARDING ? null : ROUTES.APP.ONBOARDING;
	}

	// Onboarding completed but user is sitting on the onboarding route — send home.
	if (pathname === ROUTES.APP.ONBOARDING) return ROUTES.APP.ROOT;

	return null;
};
