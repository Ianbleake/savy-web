import { FREQUENCY_LABELS } from "@/content/income-sources/incomeSourceContent";

export const getFrequencyLabel = (frequency: IncomeSourceFrequency): string =>
	FREQUENCY_LABELS[frequency] ?? frequency;
