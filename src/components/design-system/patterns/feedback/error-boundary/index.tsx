import { AlertTriangle } from "lucide-react";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/button";

type ErrorFallbackProps = {
	error: unknown;
	resetError: () => void;
};

export function ErrorFallback({ error, resetError }: ErrorFallbackProps): ReactElement {
	const errorMessage = error instanceof Error ? error.message : String(error);

	return (
		<div className="flex h-full min-h-50 w-full flex-col items-center justify-center gap-4 text-center">
			<div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/15 bg-red-50">
				<AlertTriangle className="h-8 w-8 text-red-500" />
			</div>

			<div className="flex flex-col gap-1">
				<h3 className="text-lg font-semibold text-gray-900">Algo salió mal</h3>
				<p className="text-sm text-gray-500">Ocurrió un error inesperado. Intentá de nuevo.</p>

				{import.meta.env.DEV && errorMessage && (
					<p className="mt-1 max-w-md text-xs text-red-400">{errorMessage}</p>
				)}
			</div>

			<Button
				size="sm"
				variant="outline"
				onClick={resetError}
			>
				Reintentar
			</Button>
		</div>
	);
}