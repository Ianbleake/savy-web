import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarGroup, useSidebar } from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/auth/useLogout";
import { useAuthStorage } from "@/storage/authStorage";
import { merge } from "@/utils/ui/mergeStyles";

export const SidebarUser = (): React.ReactElement => {
	const user = useAuthStorage((state) => state.user);
	const { open } = useSidebar();
	const { mutate: logout, isPending: isLoggingOut } = useLogout();
	const navigate = useNavigate();

	const initial = user?.email?.[0]?.toUpperCase() ?? "?";

	return (
		<SidebarGroup className="border-t border-white/20 p-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						className={merge(
							"flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-white/30 hover:backdrop-blur-sm",
							!open && "justify-center",
						)}
					>
						<Avatar className="size-8">
							<AvatarFallback className="bg-primary text-primary-foreground text-sm">
								{initial}
							</AvatarFallback>
						</Avatar>
						{open && (
							<>
								<div className="flex flex-1 flex-col overflow-hidden">
									<span className="truncate text-sm font-medium text-foreground">
										{user?.email ?? "Usuario"}
									</span>
								</div>
								<ChevronsUpDown className="size-4 text-muted-foreground" />
							</>
						)}
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="min-w-56 rounded-lg"
					side="top"
					align="start"
					sideOffset={8}
				>
					<DropdownMenuLabel className="font-normal">
						<div className="flex items-center gap-3 px-1 py-1">
							<Avatar className="size-8">
								<AvatarFallback className="bg-primary text-primary-foreground text-sm">
									{initial}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="text-sm font-medium">{user?.email ?? "Usuario"}</span>
							</div>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => navigate(ROUTES.APP.SETTINGS)}>
						<Settings className="size-4" />
						Configuración
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						variant="destructive"
						onClick={() => logout()}
						disabled={isLoggingOut}
					>
						<LogOut className="size-4" />
						{isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</SidebarGroup>
	);
};
