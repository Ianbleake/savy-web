import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { type ForgotPasswordFormType, forgotPasswordSchema } from "@/schemas/auth";

export const Password = (): React.ReactElement => {
	const forgotPasswordForm = useForm<ForgotPasswordFormType>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const { mutate: forgotPassword, isPending } = useForgotPassword();

	const onSubmit = (forgotPasswordData: ForgotPasswordFormType) => {
		forgotPassword(forgotPasswordData);
	};

	return (
		<StaggerContainer className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">Olvidaste tu contraseña?</h1>
				<p className="text-sm text-muted-foreground">Ingresa tu correo para recuperarla.</p>
			</div>

			<form
				onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					type="email"
					name="email"
					form={forgotPasswordForm}
					label="Email"
				/>

				<Button
					type="submit"
					disabled={isPending}
				>
					{isPending ? "Enviando email..." : "Recuperar contraseña"}
				</Button>
			</form>
		</StaggerContainer>
	);
};
