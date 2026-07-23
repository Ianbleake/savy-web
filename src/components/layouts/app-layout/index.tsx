import type React from "react";
import { Outlet } from "react-router";

export const AppLayout = (): React.ReactElement => {
	return (
		<div className="flex min-h-svh flex-col">
			<Outlet />
		</div>
	);
};