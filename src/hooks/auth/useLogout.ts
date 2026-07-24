import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ROUTES } from "@/app/router/routes";
import { authService } from "@/services/auth";
import { useAuthStorage } from "@/storage/authStorage";

export const useLogout = () => {
	const logout = useAuthStorage((state) => state.logout);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => authService.logout(),
		onSettled: () => {
			logout();
			queryClient.clear();
			navigate(ROUTES.LANDING.ROOT, { replace: true });
			toast.success(`Se cerró sesión correctamente!`);
		},
	});
};
