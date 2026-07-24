import type React from "react";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "./Components/app-header";
import { AppSidebar } from "./Components/app-sidebar";

export const AppLayout = (): React.ReactElement => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-1 flex-col min-w-0 min-h-svh bg-muted/30">
				<AppHeader />
				<div className="flex flex-1 flex-col overflow-y-auto p-6">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	);
};
