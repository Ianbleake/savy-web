import type React from "react";
import { ThemeToggle } from "@/components/design-system/primitives/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppHeader = (): React.ReactElement => {
	return (
		<header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-white/20 bg-gray-200/15 backdrop-blur-[15px] dark:bg-white/[0.08] dark:border-white/[0.12] px-6">
			<SidebarTrigger className="md:hidden" />
			<ThemeToggle className="ml-auto" />
		</header>
	);
};
