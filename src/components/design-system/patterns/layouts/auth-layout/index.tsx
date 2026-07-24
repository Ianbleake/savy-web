import type React from "react";
import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { useAuthStorage } from "@/storage/authStorage";
import { AuthBranding } from "./components/auth-branding";
import { AuthNavigator } from "./components/auth-navigator";

export const AuthLayout = (): React.ReactElement => {
	const isAuthenticated = useAuthStorage((state) => state.isAuthenticated);

	if (isAuthenticated) {
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
