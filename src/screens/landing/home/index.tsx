import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";

export const Home = (): React.ReactElement => {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6">
			<div className="flex flex-col items-center gap-3">
				<h1 className="text-5xl font-bold text-primary">Savy</h1>
				<p className="max-w-md text-center text-lg text-muted-foreground">
					Centralize and manage your personal finances in one place.
				</p>
			</div>
			<div className="flex gap-4">
				<Link
					to={ROUTES.AUTH.LOGIN}
					className="rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
				>
					Sign in
				</Link>
				<Link
					to={ROUTES.AUTH.REGISTER}
					className="rounded-lg border border-border px-6 py-2.5 font-medium transition-colors hover:bg-muted"
				>
					Get started
				</Link>
			</div>
		</div>
	);
};