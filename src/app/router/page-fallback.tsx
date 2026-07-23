import type React from "react";

export const PageFallback = (): React.ReactElement => {
	return (
		<div className="flex min-h-svh items-center justify-center gap-3">
			<div className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
			<span className="font-medium text-sm text-muted-foreground">Cargando...</span>
		</div>
	);
};