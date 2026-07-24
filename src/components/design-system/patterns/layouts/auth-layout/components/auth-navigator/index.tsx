import { useLocation, useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";

export const AuthNavigator = (): React.ReactElement => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const isLogin = pathname === ROUTES.AUTH.LOGIN;
	const isPasswordRecovery = pathname === ROUTES.AUTH.FORGOT_PASSWORD;

	const navigatorText = isPasswordRecovery
		? "Volver al inicio de sesion"
		: isLogin
			? "Registrarse"
			: "Iniciar sesión";
	const navigatorPath = isPasswordRecovery
		? ROUTES.AUTH.LOGIN
		: isLogin
			? ROUTES.AUTH.REGISTER
			: ROUTES.AUTH.LOGIN;
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
