type CreateSavingsGoalPayload = {
	accountId: string;
	name: string;
	targetAmount: number;
	deadline?: string;
	color?: string;
};

type UpdateSavingsGoalPayload = {
	accountId?: string;
	name?: string;
	targetAmount?: number;
	deadline?: string;
	color?: string;
};

