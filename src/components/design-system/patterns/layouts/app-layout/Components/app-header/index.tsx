import type React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppHeader = (): React.ReactElement => {
	return (
		<header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border/50 bg-background/95 px-6 backdrop-blur-sm">
			<SidebarTrigger className="md:hidden" />
		</header>
	);
};
