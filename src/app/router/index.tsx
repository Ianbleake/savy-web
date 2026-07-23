import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/components/layouts/app-layout";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { LandingLayout } from "@/components/layouts/landing-layout";
import { ROUTES } from "./routes";
import { ProtectedRoute } from "./protected-route";

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
		],
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: ROUTES.APP.ROOT,
				element: <AppLayout />,
				children: [
					{
						index: true,
						lazy: () => import("@/screens/app/dashboard").then((m) => ({ Component: m.Dashboard })),
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