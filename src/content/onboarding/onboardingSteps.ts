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
		label: "Financiero",
		description: "Tus ingresos y día de pago",
	},
	{
		step: 3,
		label: "Preferencias",
		description: "Moneda, idioma y zona horaria",
	},
];
