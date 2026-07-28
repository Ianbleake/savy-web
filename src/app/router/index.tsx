import { createBrowserRouter } from "react-router";
import { AppGuardLayout } from "@/components/design-system/patterns/layouts/app-guard-layout";
import { AppLayout } from "@/components/design-system/patterns/layouts/app-layout";
import { AuthLayout } from "@/components/design-system/patterns/layouts/auth-layout";
import { LandingLayout } from "@/components/design-system/patterns/layouts/landing-layout";
import { ProtectedRoute } from "./protected-route";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
	{
		path: "*",
		lazy: () => import("@/screens/error-pages/not-found").then((m) => ({ Component: m.NotFound })),
	},
	{
		path: ROUTES.LANDING.ROOT,
		element: <LandingLayout />,
		children: [
			{
				index: true,
				lazy: () => import("@/screens/landing/home").then((m) => ({ Component: m.Home })),
			},
		],
	},
	{
		path: ROUTES.AUTH.ROOT,
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.AUTH.LOGIN,
				lazy: () => import("@/screens/auth/login").then((m) => ({ Component: m.LoginPage })),
			},
			{
				path: ROUTES.AUTH.REGISTER,
				lazy: () => import("@/screens/auth/register").then((m) => ({ Component: m.Register })),
			},
			{
				path: ROUTES.AUTH.FORGOT_PASSWORD,
				lazy: () => import("@/screens/auth/password").then((m) => ({ Component: m.Password })),
			},
			{
				path: ROUTES.AUTH.RESET_PASSWORD,
				lazy: () =>
					import("@/screens/auth/new-password").then((m) => ({ Component: m.NewPassword })),
			},
		],
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				// Shared profile guard for every authenticated app route, including
				// /app/onboarding which intentionally renders without AppLayout chrome.
				element: <AppGuardLayout />,
				children: [
					{
						path: ROUTES.APP.ROOT,
						element: <AppLayout />,
						children: [
							{
								index: true,
								lazy: () =>
									import("@/screens/app/dashboard").then((m) => ({ Component: m.Dashboard })),
							},
							{
								path: ROUTES.APP.ACCOUNTS,
								lazy: () =>
									import("@/screens/app/accounts").then((m) => ({ Component: m.Accounts })),
							},
						],
					},
					{
						// Onboarding wizard — clean full-screen layout, no AppLayout chrome.
						path: ROUTES.APP.ONBOARDING,
						lazy: () =>
							import("@/screens/app/onboarding").then((m) => ({ Component: m.Onboarding })),
					},
				],
			},
			{
				path: "*",
				lazy: () =>
					import("@/screens/error-pages/not-found").then((m) => ({ Component: m.NotFound })),
			},
		],
	},
]);
