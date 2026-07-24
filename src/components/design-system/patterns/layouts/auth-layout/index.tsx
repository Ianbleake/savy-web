import type React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { useAuthStorage } from "@/storage/authStorage";
import { AuthBranding } from "./components/auth-branding";
import { AuthNavigator } from "./components/auth-navigator";

const AUTH_GUARD_BYPASS = [ROUTES.AUTH.RESET_PASSWORD];

export const AuthLayout = (): React.ReactElement => {
	const isAuthenticated = useAuthStorage((state) => state.isAuthenticated);
	const { pathname } = useLocation();

	if (isAuthenticated && !AUTH_GUARD_BYPASS.includes(pathname)) {
		return (
			<Navigate
				to={ROUTES.APP.ROOT}
				replace
			/>
		);
	}

	return (
		<div className="flex flex-row min-h-svh bg-muted/50">
			<AuthBranding />
			<div className="flex flex-1 items-center justify-center p-8 relative">
				<AuthNavigator />
				<Outlet />
			</div>
		</div>
	);
};
