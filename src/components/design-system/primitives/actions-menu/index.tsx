import { EllipsisVertical } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ActionsMenuProps = {
	children: React.ReactNode;
	align?: "start" | "center" | "end";
	triggerDirection?: "vertical" | "horizontal";
};

export const ActionsMenu = ({
	children,
	align = "end",
	triggerDirection = "vertical",
}: ActionsMenuProps): React.ReactElement => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
					>
						{triggerDirection === "vertical" ? (
							<EllipsisVertical />
						) : (
							<EllipsisVertical className="rotate-90" />
						)}
					</Button>
				}
			/>

			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width]"
				side="bottom"
				sideOffset={4}
				align={align}
				alignOffset={1}
			>
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};