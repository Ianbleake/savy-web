import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw, TriangleAlert } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { Brand } from "@/components/design-system/primitives/brand";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { type ResetPasswordFormType, resetPasswordSchema } from "@/schemas/auth";

const parseHashTokens = (hash: string): { accessToken: string; refreshToken: string } | null => {
	const params = new URLSearchParams(hash.replace("#", ""));
	const accessToken = params.get("access_token");
	const refreshToken = params.get("refresh_token");

	if (!accessToken || !refreshToken) return null;

	return { accessToken, refreshToken };
};

export const NewPassword = (): React.ReactElement => {
	const location = useLocation();
	const tokens = parseHashTokens(location.hash);

	const resetPasswordForm = useForm<ResetPasswordFormType>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
		},
	});

	const navigate = useNavigate();

	const { mutate: resetPassword, isPending } = useResetPassword();

	if (!tokens) {
		return (
			<Empty
				title="El token de accesso ha expirado"
				description="Recargue la pagina o solicite uno nuevo"
				icon={TriangleAlert}
				action={{
					label: "Recuperar contraseña",
					onClick: () => navigate(ROUTES.AUTH.FORGOT_PASSWORD),
					icon: RefreshCcw,
				}}
			/>
		);
	}

	const onSubmit = (formData: ResetPasswordFormType) => {
		resetPassword({
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			newPassword: formData.newPassword,
		});
	};

	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<div className="flex flex-col gap-2">
				<Brand
					className="self-center mb-8 sm:hidden"
					size="lg"
				/>
				<h1 className="text-2xl font-bold">Crea una nueva contraseña</h1>
				<p className="text-sm text-muted-foreground">Ingresa tu nueva contraseña.</p>
			</div>

			<form
				onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					type="password"
					name="newPassword"
					form={resetPasswordForm}
					label="Nueva contraseña"
				/>
				<FormField
					type="password"
					name="confirmPassword"
					form={resetPasswordForm}
					label="Confirmar contraseña"
				/>
				<Button
					type="submit"
					disabled={isPending}
				>
					{isPending ? "Actualizando..." : "Actualizar contraseña"}
				</Button>
			</form>
		</div>
	);
};
