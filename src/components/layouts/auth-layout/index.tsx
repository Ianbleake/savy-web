import type React from "react";
import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { useAuthStorage } from "@/storage/authStorage";

export const AuthLayout = (): React.ReactElement => {
	const isAuthenticated = useAuthStorage((state) => state.isAuthenticated);

	if (isAuthenticated) {
		return <Navigate to={ROUTES.APP.ROOT} replace />;
	}

	return (
		<div className="flex min-h-svh items-center justify-center bg-muted/50 p-8">
			<Outlet />
		</div>
	);
};