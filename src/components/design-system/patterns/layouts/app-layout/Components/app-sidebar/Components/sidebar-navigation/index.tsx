import type React from "react";
import { Link, useLocation } from "react-router";
import { ROUTES } from "@/app/router/routes";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { menuItems } from "@/content/app/menuItems";
import { merge } from "@/utils/ui/mergeStyles";

export const SidebarNavigation = (): React.ReactElement => {
	const { pathname } = useLocation();
	const { isMobile, setOpenMobile } = useSidebar();

	const isActive = (path: string): boolean => {
		if (path === ROUTES.APP.ROOT) return pathname === path;
		return pathname.startsWith(path);
	};

	return (
		<>
			{menuItems.map((group) => (
				<SidebarGroup key={group.groupLabel}>
					<SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
					<SidebarMenu>
						{group.children.map((item) => {
							const Icon = item.icon;
							const active = isActive(item.href);

							return (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton asChild>
										<Link
											to={item.href}
											onClick={() => {
												if (isMobile) setOpenMobile(false);
											}}
											className={merge(
												"flex items-center gap-3 px-3 py-2 rounded-md border border-transparent",
												active
													? "bg-primary/15 border-primary/20 text-primary backdrop-blur-sm shadow-sm shadow-primary/10"
													: "text-muted-foreground hover:bg-white/30 hover:text-primary hover:backdrop-blur-sm hover:border-white/20",
											)}
										>
											<Icon className="size-5" />
											<span className="text-sm">{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	);
};
