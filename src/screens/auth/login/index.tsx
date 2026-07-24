import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/useLogin";
import { type LoginFormType, loginSchema } from "@/schemas/auth";

export const LoginPage = (): React.ReactElement => {
	const navigate = useNavigate();
	const loginForm = useForm<LoginFormType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate: login, isPending } = useLogin();

	const onSubmit = (loginData: LoginFormType) => {
		login(loginData);
	};

	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">Iniciar sesión</h1>
				<p className="text-sm text-muted-foreground">
					Ingresa tus credenciales para acceder a tu cuenta.
				</p>
			</div>

			<form
				onSubmit={loginForm.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					type="email"
					name="email"
					form={loginForm}
					label="Email"
				/>
				<FormField
					type="password"
					name="password"
					form={loginForm}
					label="Contraseña"
				/>
				<div className="flex flex-col gap-2 items-center">
					<Button
						type="submit"
						disabled={isPending}
						className="w-full"
					>
						{isPending ? "Iniciando sesión..." : "Iniciar sesión"}
					</Button>
					<Button
						type="button"
						variant="link"
						onClick={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
					>
						¿Olvidaste tu contraseña?
					</Button>
				</div>
			</form>
		</div>
	);
};
