import { z } from "zod";

export const bankSchema = z.object({
	name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
	color: z.string().optional(),
	logo: z.string().optional(),
});

export type BankFormValues = z.infer<typeof bankSchema>;
