import type React from "react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/useLogout";

export const LogoutButton = (): React.ReactElement => {
	const { mutate: logout, isPending } = useLogout();

	return (
		<Button
			onClick={() => logout()}
			disabled={isPending}
		>
			{isPending ? "Cerrando sesión..." : "Cerrar sesión"}
		</Button>
	);
};
