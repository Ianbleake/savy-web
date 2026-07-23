import type { ReactElement } from "react";
import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { useAuthStorage } from "@/storage/authStorage";

export function ProtectedRoute(): ReactElement {
	const isAuthenticated = useAuthStorage((state) => state.isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
	}

	return <Outlet />;
}