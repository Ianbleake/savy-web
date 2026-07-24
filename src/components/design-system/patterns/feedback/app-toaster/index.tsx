import { useTheme } from "next-themes";
import type React from "react";
import { Toaster } from "sonner";

type AppTheme = "light" | "dark" | "system" | undefined;

export function AppToaster(): React.ReactElement {
	const { theme } = useTheme();

	return (
		<Toaster
			position="top-right"
			theme={theme as AppTheme}
			richColors
			closeButton
			duration={4000}
			toastOptions={{
				closeButton: false,
				classNames: {
					toast: "bg-background text-foreground border border-border shadow-lg rounded-xl",
					title: "text-sm font-semibold",
					description: "text-xs text-muted-foreground",
					success: "bg-green-500 text-white",
					error: "bg-destructive text-white",
				},
			}}
		/>
	);
}
