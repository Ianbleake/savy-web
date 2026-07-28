import type React from "react";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "./Components/app-header";
import { AppSidebar } from "./Components/app-sidebar";

/**
 * Sidebar + header chrome for the authenticated app area. The profile guard
 * runs in the surrounding `AppGuardLayout`, so this layout assumes the profile
 * is already loaded and authorized.
 */
export const AppLayout = (): React.ReactElement => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="relative flex flex-1 flex-col min-w-0 min-h-svh overflow-hidden">
				<AppHeader />
				<div className="relative flex flex-1 flex-col overflow-y-auto p-6">
					{/* Background decor — fixed to the content area */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0"
					>
						{/* Base tinted wash */}
						<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/8" />
						{/* Distributed blobs */}
						<div className="absolute -left-[10%] top-[5%] size-[500px] rounded-full bg-primary/8 blur-[120px]" />
						<div className="absolute -right-[5%] top-[40%] size-[450px] rounded-full bg-primary/6 blur-[100px]" />
						<div className="absolute bottom-[5%] left-[30%] size-[400px] rounded-full bg-primary/5 blur-[100px]" />
						{/* Subtle grid texture */}
						<div
							className="absolute inset-0 opacity-[0.02]"
							style={{
								backgroundImage:
									"linear-gradient(to right, var(--color-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)",
								backgroundSize: "40px 40px",
							}}
						/>
					</div>
					<div className="relative z-10">
						<Outlet />
					</div>
				</div>
			</main>
		</SidebarProvider>
	);
};
