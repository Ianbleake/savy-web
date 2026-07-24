import { z } from "zod";
import { EMAIL_REGEX } from "../regex/globalRegex";

export const loginSchema = z.object({
	email: z.email("Email inválido").regex(EMAIL_REGEX, "Email invalido"),
	password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginFormType = z.infer<typeof loginSchema>;
