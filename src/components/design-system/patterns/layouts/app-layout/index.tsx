import type React from "react";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "./components/app-header";
import { AppSidebar } from "./components/app-sidebar";

/**
 * Sidebar + header chrome for the authenticated app area. The profile guard
 * runs in the surrounding `AppGuardLayout`, so this layout assumes the profile
 * is already loaded and authorized.
 */
export const AppLayout = (): React.ReactElement => {
	return (
		<SidebarProvider>
			{/* Background decor — behind everything (sidebar, header, content) */}
			<div
				aria-hidden="true"
				className="pointer-events-none fixed inset-0 z-0"
			>
				<div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-primary/10" />
				<div className="absolute -left-[10%] top-[5%] size-[600px] rounded-full bg-primary/10 blur-[140px]" />
				<div className="absolute -right-[5%] top-[30%] size-[500px] rounded-full bg-primary/8 blur-[120px]" />
				<div className="absolute bottom-[5%] left-[25%] size-[500px] rounded-full bg-primary/8 blur-[120px]" />
				<div className="absolute -bottom-[10%] right-[10%] size-[450px] rounded-full bg-primary/6 blur-[100px]" />
				<div
					className="absolute inset-0 opacity-[0.02]"
					style={{
						backgroundImage:
							"linear-gradient(to right, var(--color-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)",
						backgroundSize: "40px 40px",
					}}
				/>
			</div>

			<AppSidebar />
			<main className="relative z-10 flex flex-1 flex-col min-w-0 min-h-svh">
				<AppHeader />
				<div className="flex flex-1 flex-col overflow-y-auto p-6">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	);
};
