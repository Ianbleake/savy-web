import { z } from "zod";

export const incomeSourceSchema = z
	.object({
		name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
		amount: z.number().positive("El monto debe ser mayor a 0"),
		frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"], {
			message: "Selecciona una frecuencia",
		}),
		paydays: z.array(z.number().int()),
		destinationAccountId: z.string().min(1, "Selecciona una cuenta"),
	})
	.superRefine((data, ctx) => {
		if (data.frequency === "WEEKLY") {
			if (data.paydays.length !== 1) {
				ctx.addIssue({
					path: ["paydays"],
					message: "Selecciona un día de la semana",
					code: "custom",
				});
				return;
			}
			if (data.paydays[0] < 1 || data.paydays[0] > 7) {
				ctx.addIssue({
					path: ["paydays"],
					message: "Para frecuencia semanal, el día debe ser 1-7",
					code: "custom",
				});
			}
			return;
		}

		if (data.frequency === "BIWEEKLY") {
			if (data.paydays.length !== 2) {
				ctx.addIssue({
					path: ["paydays"],
					message: "Selecciona dos días del mes",
					code: "custom",
				});
				return;
			}
			for (const day of data.paydays) {
				if (day < 1 || day > 31) {
					ctx.addIssue({
						path: ["paydays"],
						message: "Los días del mes deben estar entre 1 y 31",
						code: "custom",
					});
					return;
				}
			}
			return;
		}

		if (data.frequency === "MONTHLY") {
			if (data.paydays.length !== 1) {
				ctx.addIssue({
					path: ["paydays"],
					message: "Selecciona un día del mes",
					code: "custom",
				});
				return;
			}
			if (data.paydays[0] < 1 || data.paydays[0] > 31) {
				ctx.addIssue({
					path: ["paydays"],
					message: "El día del mes debe estar entre 1 y 31",
					code: "custom",
				});
			}
		}
	});

export type IncomeSourceFormValues = z.infer<typeof incomeSourceSchema>;
