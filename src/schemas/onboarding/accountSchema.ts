import { z } from "zod";

export const accountSchema = z
	.object({
		name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
		type: z.enum(["DEBIT", "CREDIT", "LOAN", "CASH"], {
			message: "Selecciona un tipo de cuenta",
		}),
		bankId: z.string().nullable().optional(),
		currency: z.string().min(1, "La moneda es obligatoria"),
		balance: z.number(),
		// Credit card fields — only used when type is CREDIT
		creditLimit: z.number().optional(),
		cutDay: z.number().min(1, "Mínimo 1").max(31, "Máximo 31").optional(),
		paymentDay: z.number().min(1, "Mínimo 1").max(31, "Máximo 31").optional(),
		interestRate: z.number().min(0, "No puede ser negativo").optional(),
		// Loan fields — only used when type is LOAN
		principal: z.number().positive("Debe ser mayor a 0").optional(),
		termMonths: z.number().int().positive("Debe ser mayor a 0").optional(),
		monthlyPayment: z.number().positive("Debe ser mayor a 0").optional(),
	})
	.superRefine((data, ctx) => {
		if (data.type === "CREDIT") {
			if (data.creditLimit === undefined || data.creditLimit <= 0) {
				ctx.addIssue({
					path: ["creditLimit"],
					message: "El límite de crédito es obligatorio",
					code: "custom",
				});
			}
			if (!data.cutDay) {
				ctx.addIssue({
					path: ["cutDay"],
					message: "El día de corte es obligatorio",
					code: "custom",
				});
			}
			if (!data.paymentDay) {
				ctx.addIssue({
					path: ["paymentDay"],
					message: "El día de pago es obligatorio",
					code: "custom",
				});
			}
			if (data.interestRate === undefined) {
				ctx.addIssue({
					path: ["interestRate"],
					message: "La tasa de interés es obligatoria",
					code: "custom",
				});
			}
		}

		if (data.type === "LOAN") {
			if (!data.principal) {
				ctx.addIssue({
					path: ["principal"],
					message: "El monto del préstamo es obligatorio",
					code: "custom",
				});
			}
			if (!data.termMonths) {
				ctx.addIssue({
					path: ["termMonths"],
					message: "El plazo es obligatorio",
					code: "custom",
				});
			}
			if (!data.monthlyPayment) {
				ctx.addIssue({
					path: ["monthlyPayment"],
					message: "El pago mensual es obligatorio",
					code: "custom",
				});
			}
			if (data.interestRate === undefined) {
				ctx.addIssue({
					path: ["interestRate"],
					message: "La tasa de interés es obligatoria",
					code: "custom",
				});
			}
		}
	});

export type AccountFormValues = z.infer<typeof accountSchema>;
