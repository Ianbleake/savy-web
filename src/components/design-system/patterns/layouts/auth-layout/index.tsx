import type React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Brand } from "@/components/design-system/primitives/brand";
import { useAuthStorage } from "@/storage/authStorage";
import { AuthBranding } from "./components/auth-branding";
import { AuthNavigator } from "./components/auth-navigator";

const AUTH_GUARD_BYPASS: string[] = [ROUTES.AUTH.RESET_PASSWORD];

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
		<div className="flex flex-row min-h-svh">
			<AuthBranding />
			<div className="relative flex flex-1 items-center justify-center overflow-hidden p-8">
				{/* Background decor — distributed blobs matching product.md §4 */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0"
				>
					<div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/4 to-primary/15" />
					<div className="absolute -left-[15%] -top-[10%] size-[700px] rounded-full bg-primary/10 blur-[140px]" />
					<div className="absolute -right-[10%] top-[15%] size-[600px] rounded-full bg-primary/12 blur-[120px]" />
					<div className="absolute -bottom-[15%] -left-[5%] size-[650px] rounded-full bg-primary/18 blur-[130px]" />
					<div className="absolute -bottom-[5%] -right-[10%] size-[550px] rounded-full bg-primary/12 blur-[110px]" />
					<div className="absolute left-[40%] top-[30%] size-[400px] rounded-full bg-primary/10 blur-[90px]" />
					<div
						className="absolute inset-0 opacity-[0.04]"
						style={{
							backgroundImage:
								"linear-gradient(to right, var(--color-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)",
							backgroundSize: "40px 40px",
						}}
					/>
				</div>

				{/* Card glow — 3 distributed blobs behind the form area */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0"
				>
					<div className="absolute -left-20 -top-12 size-[300px] rounded-full bg-primary/15 blur-[80px]" />
					<div className="absolute -bottom-16 -right-16 size-[280px] rounded-full bg-primary/12 blur-[70px]" />
					<div className="absolute -bottom-8 left-[20%] size-[200px] rounded-full bg-primary/10 blur-[60px]" />
				</div>

				<div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
					<Brand
						className="self-center lg:hidden"
						size="lg"
					/>
					<AuthNavigator />
					<GlassCard
						variant="light"
						className="p-6 sm:p-8"
					>
						<Outlet />
					</GlassCard>
				</div>
			</div>
		</div>
	);
};
