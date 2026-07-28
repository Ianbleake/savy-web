type OnboardingController = {
	currentStep: number;
	totalSteps: number;
	incomeSourceDrafts: CreateIncomeSourcePayload[];
	createdIncomeSources: IncomeSource[];
	setStep: (step: number) => void;
	nextStep: () => void;
	prevStep: () => void;
	addDraft: (draft: CreateIncomeSourcePayload) => void;
	removeDraft: (index: number) => void;
	clearDrafts: () => void;
	setCreatedIncomeSources: (sources: IncomeSource[]) => void;
	reset: () => void;
};
