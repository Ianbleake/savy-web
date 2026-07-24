import { ArrowLeft, MapPinOff } from "lucide-react";
import type React from "react";
import { Link, useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Brand } from "@/components/design-system/primitives/brand";
import { Button } from "@/components/ui/button";
import { useAuthStorage } from "@/storage/authStorage";

export const NotFound = (): React.ReactElement => {
	const navigate = useNavigate();
	const isAuthenticated = useAuthStorage((state) => state.isAuthenticated);
	const homeRoute = isAuthenticated ? ROUTES.APP.ROOT : ROUTES.LANDING.ROOT;

	return (
		<div className="flex min-h-svh flex-col bg-background">
			{/* Header */}
			<div className="p-6">
				<Brand size="sm" />
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
				<div className="flex flex-col items-center gap-6 text-center">
					{/* Icon */}
					<div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10">
						<MapPinOff className="size-10 text-primary" />
					</div>

					{/* Copy */}
					<div className="flex flex-col gap-2">
						<p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
							Error 404
						</p>
						<h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Página no encontrada
						</h1>
						<p className="max-w-sm text-base text-muted-foreground">
							La dirección que buscas no existe o fue movida a otra ubicación.
						</p>
					</div>

					{/* Actions */}
					<div className="flex flex-col items-center gap-3 sm:flex-row">
						<Button
							variant="outline"
							onClick={() => navigate(-1)}
						>
							<ArrowLeft className="size-4" />
							Volver atrás
						</Button>
						<Button asChild>
							<Link to={homeRoute}>Ir al inicio</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
