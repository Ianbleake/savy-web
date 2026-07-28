type SavingsGoal = {
	id: string;
	profileId: string;
	accountId: string;
	name: string;
	targetAmount: number;
	deadline: string | null;
	color: string | null;
	currentAmount: number;
	isCompleted: boolean;
	createdAt: string;
	updatedAt: string;
};

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

type SavingsGoalService = {
	getAll: () => Promise<SavingsGoal[]>;
	getById: (id: string) => Promise<SavingsGoal>;
	create: (payload: CreateSavingsGoalPayload) => Promise<SavingsGoal>;
	update: (id: string, payload: UpdateSavingsGoalPayload) => Promise<SavingsGoal>;
	remove: (id: string) => Promise<void>;
};