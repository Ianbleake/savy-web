import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export const AuthNavigator = (): React.ReactElement => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const isLogin = pathname === "/auth/login";
	const isPasswordRecovery = pathname === "/auth/password-recovery";

	const navigatorText = isPasswordRecovery
		? "Volver al login"
		: isLogin
			? "Registrarse"
			: "Iniciar sesión";
	const navigatorPath = isPasswordRecovery
		? "/auth/login"
		: isLogin
			? "/auth/register"
			: "/auth/login";
	const navigatorCTA = isPasswordRecovery
		? "¿Recordaste tu contraseña?"
		: isLogin
			? "¿No tienes cuenta?"
			: "¿Olvidaste tu contraseña?";

	return (
		<div className="absolute top-3 right-6 text-sm">
			{navigatorCTA}
			<Button
				variant="link"
				className="mx-0 px-1"
				onClick={() => navigate(navigatorPath)}
			>
				{navigatorText}
			</Button>
		</div>
	);
};
