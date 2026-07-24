import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ROUTES } from "@/app/router/routes";
import { authService } from "@/services/auth";
import { useAuthStorage } from "@/storage/authStorage";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useLogin = () => {
	const setAuth = useAuthStorage((state) => state.setAuth);
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (credentials: LoginPayload) => authService.login(credentials),
		onSuccess: (data: AuthResponse) => {
			setAuth({
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
				user: data.user,
			});
			navigate(ROUTES.APP.ROOT, { replace: true });
			toast.success(`Bienvenido ${data.user.name}`);
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "No se pudo iniciar sesión");
		},
	});
};
