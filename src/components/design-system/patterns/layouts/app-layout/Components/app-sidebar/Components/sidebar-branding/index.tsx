import type React from "react";
import { Brand } from "@/components/design-system/primitives/brand";
import { SidebarGroup, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { merge } from "@/utils/ui/mergeStyles";

export const SidebarBranding = (): React.ReactElement => {
	const { open } = useSidebar();

	return (
		<SidebarGroup
			className={merge(
				"flex flex-row items-center border-b border-white/20 h-14 px-4",
				open ? "justify-between" : "justify-center",
			)}
		>
			{open && <Brand size="sm" />}
			<SidebarTrigger />
		</SidebarGroup>
	);
};
