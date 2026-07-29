type OnboardingStep = {
	step: number;
	label: string;
	description: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
	{
		step: 1,
		label: "Personal",
		description: "Cuéntanos quién eres",
	},
	{
		step: 2,
		label: "Bancos",
		description: "Tus bancos y cuentas",
	},
	{
		step: 3,
		label: "Ingresos",
		description: "Tus fuentes de ingreso",
	},
	{
		step: 4,
		label: "Preferencias",
		description: "Moneda, idioma y zona horaria",
	},
];
