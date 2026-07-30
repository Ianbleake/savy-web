import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Brand } from "@/components/design-system/primitives/brand";
import { ThemeToggle } from "@/components/design-system/primitives/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuthStorage } from "@/storage/authStorage";

export const Header = (): React.ReactElement => {
	const isAuthenticated = useAuthStorage((state) => state.isAuthenticated);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
			<div className="flex h-16 items-center justify-between px-6">
				<Brand />

				<nav className="flex items-center gap-2">
					<ThemeToggle />

					{isAuthenticated ? (
						<Button variant={"ghost"}>
							<Link to={ROUTES.APP.ROOT}>Ingresar</Link>
						</Button>
					) : (
						<div className="flex flex-row items-center gap-2">
							<Button
								variant="ghost"
								size="sm"
								className="hidden sm:block"
							>
								<Link to={ROUTES.AUTH.LOGIN}>Iniciar sesión</Link>
							</Button>
							<Button
								size="sm"
								className="hidden sm:block"
							>
								<Link to={ROUTES.AUTH.REGISTER}>Empezar gratis</Link>
							</Button>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};
