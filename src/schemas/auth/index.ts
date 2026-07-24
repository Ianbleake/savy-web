import { z } from "zod";
import { EMAIL_REGEX } from "../regex/globalRegex";

export const loginSchema = z.object({
	email: z.email("Email inválido").regex(EMAIL_REGEX, "Email invalido"),
	password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginFormType = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		first_name: z.string().min(1, "El nombre es requerido"),
		last_name: z.string().min(1, "El apellido es requerido"),
		email: z.string().regex(EMAIL_REGEX, "Email inválido"),
		password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
		confirmPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Las contraseñas no coinciden",
		path: ["confirmPassword"], // El error aparecerá en este campo
	});

export type RegisterFormType = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
	email: z.string().regex(EMAIL_REGEX, "Email inválido"),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
