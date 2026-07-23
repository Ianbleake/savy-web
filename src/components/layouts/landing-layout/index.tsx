import type React from "react";
import { Outlet } from "react-router";

export const LandingLayout = (): React.ReactElement => {
	return (
		<div className="relative flex min-h-svh flex-col">
			<Outlet />
		</div>
	);
};