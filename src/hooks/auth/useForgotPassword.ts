import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/services/auth";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: (payload: ForgotPasswordPayload) => authService.forgotPassword(payload),
		onSuccess: () => {
			toast.success(
				"Si el correo está registrado, recibirás un enlace para restablecer tu contraseña",
			);
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "No se pudo enviar el correo de recuperación");
		},
	});
};
