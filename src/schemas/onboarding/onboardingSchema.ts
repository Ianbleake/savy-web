import { z } from "zod";

export const onboardingSchema = z.object({
	firstName: z.string().min(1, "El nombre es requerido"),
	lastName: z.string().min(1, "El apellido es requerido"),
	secondLastName: z.string().optional().nullable(),
	phone: z.string().optional().nullable(),
	currency: z.string().min(1, "La moneda es requerida"),
	locale: z.string().min(1, "El idioma es requerido"),
	timezone: z.string().min(1, "La zona horaria es requerida"),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

// Per-step field arrays — used to validate only the visible subset on each "Continuar".
export const STEP_PERSONAL_FIELDS: Array<keyof OnboardingFormValues> = [
	"firstName",
	"lastName",
	"secondLastName",
	"phone",
];

// Step 2 (income sources) uses its own separate form — no fields here.
export const STEP_FINANCIAL_FIELDS: Array<keyof OnboardingFormValues> = [];

export const STEP_PREFERENCES_FIELDS: Array<keyof OnboardingFormValues> = [
	"currency",
	"locale",
	"timezone",
];
