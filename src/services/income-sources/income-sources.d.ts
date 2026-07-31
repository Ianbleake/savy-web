type IncomeSourceFrequency = "WEEKLY" | "BIWEEKLY" | "MONTHLY";

type IncomeSource = {
	id: string;
	profileId: string;
	name: string;
	amount: number;
	frequency: IncomeSourceFrequency;
	paydays: number[];
	destinationAccountId: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type CreateIncomeSourcePayload = {
	name: string;
	amount: number;
	frequency: IncomeSourceFrequency;
	paydays: number[];
	destinationAccountId: string;
};

type UpdateIncomeSourcePayload = Partial<CreateIncomeSourcePayload>;


