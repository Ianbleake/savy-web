import type React from "react";
import { Outlet } from "react-router";

import { Header } from "./Components/header";

export const LandingLayout = (): React.ReactElement => {
	return (
		<div className="relative flex min-h-svh flex-col">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	);
};
