import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";

export const NotFound = (): React.ReactElement => {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-4 px-6">
			<h1 className="text-6xl font-bold text-primary">404</h1>
			<p className="text-lg text-muted-foreground">Página no encontrada.</p>
			<Link
				to={ROUTES.LANDING.ROOT}
				className="rounded-lg border border-border px-6 py-2.5 font-medium transition-colors hover:bg-muted"
			>
				Volver al inicio
			</Link>
		</div>
	);
};