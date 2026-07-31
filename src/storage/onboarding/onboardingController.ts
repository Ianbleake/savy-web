import { create } from "zustand";

type OnboardingController = {
	currentStep: number;
	totalSteps: number;
	incomeSourceDrafts: CreateIncomeSourcePayload[];
	createdIncomeSources: IncomeSource[];
	createdBanks: Bank[];
	createdAccounts: Account[];
	setStep: (step: number) => void;
	nextStep: () => void;
	prevStep: () => void;
	addDraft: (draft: CreateIncomeSourcePayload) => void;
	removeDraft: (index: number) => void;
	clearDrafts: () => void;
	setCreatedIncomeSources: (sources: IncomeSource[]) => void;
	setCreatedBanks: (banks: Bank[]) => void;
	addCreatedBank: (bank: Bank) => void;
	removeCreatedBank: (bankId: string) => void;
	setCreatedAccounts: (accounts: Account[]) => void;
	addCreatedAccount: (account: Account) => void;
	removeCreatedAccount: (accountId: string) => void;
	reset: () => void;
};

const TOTAL_STEPS = 4;
const FIRST_STEP = 1;

export const useOnboardingController = create<OnboardingController>()((set, get) => ({
	currentStep: FIRST_STEP,
	totalSteps: TOTAL_STEPS,
	incomeSourceDrafts: [],
	createdIncomeSources: [],
	createdBanks: [],
	createdAccounts: [],

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

	setCreatedBanks: (banks: Bank[]): void => {
		set({ createdBanks: banks });
	},

	addCreatedBank: (bank: Bank): void => {
		set((state) => ({
			createdBanks: [...state.createdBanks, bank],
		}));
	},

	removeCreatedBank: (bankId: string): void => {
		set((state) => ({
			createdBanks: state.createdBanks.filter((bank) => bank.id !== bankId),
		}));
	},

	setCreatedAccounts: (accounts: Account[]): void => {
		set({ createdAccounts: accounts });
	},

	addCreatedAccount: (account: Account): void => {
		set((state) => ({
			createdAccounts: [...state.createdAccounts, account],
		}));
	},

	removeCreatedAccount: (accountId: string): void => {
		set((state) => ({
			createdAccounts: state.createdAccounts.filter((account) => account.id !== accountId),
		}));
	},

	reset: (): void => {
		set({
			currentStep: FIRST_STEP,
			incomeSourceDrafts: [],
			createdIncomeSources: [],
			createdBanks: [],
			createdAccounts: [],
		});
	},
}));
