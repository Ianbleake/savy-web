import { create } from "zustand";

const TOTAL_STEPS = 3;
const FIRST_STEP = 1;

export const useOnboardingController = create<OnboardingController>()((set, get) => ({
	currentStep: FIRST_STEP,
	totalSteps: TOTAL_STEPS,
	incomeSourceDrafts: [],
	createdIncomeSources: [],

	setStep: (step: number): void => {
		const clamped = Math.min(TOTAL_STEPS, Math.max(FIRST_STEP, step));
		set({ currentStep: clamped });
	},

	nextStep: (): void => {
		const { currentStep } = get();
		if (currentStep < TOTAL_STEPS) {
			set({ currentStep: currentStep + 1 });
		}
	},

	prevStep: (): void => {
		const { currentStep } = get();
		if (currentStep > FIRST_STEP) {
			set({ currentStep: currentStep - 1 });
		}
	},

	addDraft: (draft: CreateIncomeSourcePayload): void => {
		set((state) => ({
			incomeSourceDrafts: [...state.incomeSourceDrafts, draft],
		}));
	},

	removeDraft: (index: number): void => {
		set((state) => ({
			incomeSourceDrafts: state.incomeSourceDrafts.filter((_, draftIndex) => draftIndex !== index),
		}));
	},

	clearDrafts: (): void => {
		set({ incomeSourceDrafts: [] });
	},

	setCreatedIncomeSources: (sources: IncomeSource[]): void => {
		set({ createdIncomeSources: sources });
	},

	reset: (): void => {
		set({
			currentStep: FIRST_STEP,
			incomeSourceDrafts: [],
			createdIncomeSources: [],
		});
	},
}));
