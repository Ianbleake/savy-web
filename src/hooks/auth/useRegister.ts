import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ROUTES } from "@/app/router/routes";
import { authService } from "@/services/auth";
import { useAuthStorage } from "@/storage/authStorage";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useRegister = () => {
	const setAuth = useAuthStorage((state) => state.setAuth);
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (userData: RegisterPayload) => authService.register(userData),
		onSuccess: (data: AuthResponse) => {
			setAuth({
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
				user: data.user,
			});
			navigate(ROUTES.APP.ROOT, { replace: true });
			toast.success(`Bienvenido!`);
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "No se pudo crear la cuenta");
		},
	});
};
