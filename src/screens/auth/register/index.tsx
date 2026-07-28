import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/auth/useRegister";
import { type RegisterFormType, registerSchema } from "@/schemas/auth";

export const Register = (): React.ReactElement => {
	const registerForm = useForm<RegisterFormType>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	const { mutate: register, isPending } = useRegister();

	const onSubmit = (registerData: RegisterFormType) => {
		const registerPayload = {
			email: registerData.email,
			password: registerData.password,
			firstName: registerData.first_name,
			lastName: registerData.last_name,
		};
		register(registerPayload);
	};

	return (
		<StaggerContainer className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">Registro</h1>
				<p className="text-sm text-muted-foreground">
					Ingresa tus credenciales para crear una cuenta.
				</p>
			</div>

			<form
				onSubmit={registerForm.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<div className="flex flex-row items-center gap-4">
					<FormField
						type="text"
						name="first_name"
						form={registerForm}
						label="Nombre"
					/>

					<FormField
						type="text"
						name="last_name"
						form={registerForm}
						label="Apellido"
					/>
				</div>

				<FormField
					type="email"
					name="email"
					form={registerForm}
					label="Email"
				/>

				<FormField
					type="password"
					name="password"
					form={registerForm}
					label="Contraseña"
				/>

				<FormField
					type="password"
					name="confirmPassword"
					form={registerForm}
					label="Confirmar contraseña"
				/>

				<Button
					type="submit"
					disabled={isPending}
					className="w-full"
				>
					{isPending ? "Registrando..." : "Registrarse"}
				</Button>
			</form>
		</StaggerContainer>
	);
};
