import { Loader2 } from "lucide-react";
import type React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useQueryProfile } from "@/hooks/profile/useQueryProfile";
import { profileGuard } from "@/utils/profiles/profileGuard";

const ProfileGuardSkeleton = (): React.ReactElement => {
	return (
		<div className="flex min-h-svh w-full items-center justify-center bg-muted/30">
			<div className="flex flex-col items-center gap-3 text-muted-foreground">
				<Loader2 className="size-6 animate-spin text-primary" />
				<p className="text-sm">Cargando tu cuenta...</p>
			</div>
		</div>
	);
};

/**
 * Layout route that runs the profile guard for every protected app route,
 * including `/app/onboarding` (which intentionally has no sidebar chrome).
 * Shows a non-jarring skeleton while the profile is still loading and cannot
 * be judged by the guard yet.
 */
export const AppGuardLayout = (): React.ReactElement => {
	const { profile, isLoading } = useQueryProfile();
	const { pathname } = useLocation();

	if (isLoading || profile === undefined) {
		return <ProfileGuardSkeleton />;
	}

	const redirectTo = profileGuard(profile, pathname);
	if (redirectTo) {
		return (
			<Navigate
				to={redirectTo}
				replace
			/>
		);
	}

	return <Outlet />;
};
