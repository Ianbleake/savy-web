import type React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarBranding } from "./Components/sidebar-branding";
import { SidebarNavigation } from "./Components/sidebar-navigation";
import { SidebarUser } from "./Components/sidebar-user";

export const AppSidebar = (): React.ReactElement => {
	return (
		<Sidebar
			collapsible="icon"
			className="border-r border-border/50"
		>
			<SidebarHeader className="p-0 gap-0">
				<SidebarBranding />
			</SidebarHeader>

			<SidebarContent>
				<SidebarNavigation />
			</SidebarContent>

			<SidebarFooter className="p-0 gap-0">
				<SidebarUser />
			</SidebarFooter>
		</Sidebar>
	);
};
