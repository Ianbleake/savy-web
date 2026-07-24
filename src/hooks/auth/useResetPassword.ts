import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ROUTES } from "@/app/router/routes";
import { authService } from "@/services/auth";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useResetPassword = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (payload: ResetPasswordPayload) => authService.resetPassword(payload),
		onSuccess: (data: MessageResponse) => {
			toast.success(data.message);
			navigate(ROUTES.AUTH.LOGIN, { replace: true });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "No se pudo restablecer la contraseña");
		},
	});
};
