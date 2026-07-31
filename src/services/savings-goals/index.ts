import { httpClient, unwrap } from "../http-client";

export const SAVINGS_GOALS_QUERY_KEY = ["savings-goals"] as const;

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

type SavingsGoalFilters = {
	isCompleted?: boolean;
	sortBy?: "deadline" | "targetAmount" | "currentAmount";
	order?: "asc" | "desc";
};

type SavingsGoalService = {
	getAll: (filters?: SavingsGoalFilters) => Promise<SavingsGoal[]>;
	getById: (id: string) => Promise<SavingsGoal>;
	create: (payload: CreateSavingsGoalPayload) => Promise<SavingsGoal>;
	update: (id: string, payload: UpdateSavingsGoalPayload) => Promise<SavingsGoal>;
	remove: (id: string) => Promise<void>;
};

export const savingsGoalService: SavingsGoalService = {
	getAll: async (filters?: SavingsGoalFilters): Promise<SavingsGoal[]> => {
		const response = await httpClient.get<APIResponse<SavingsGoal[]>>("/savings-goals", {
			params: filters,
		});
		return unwrap<SavingsGoal[]>(response);
	},

	getById: async (id: string): Promise<SavingsGoal> => {
		const response = await httpClient.get<APIResponse<SavingsGoal>>(`/savings-goals/${id}`);
		return unwrap<SavingsGoal>(response);
	},

	create: async (payload: CreateSavingsGoalPayload): Promise<SavingsGoal> => {
		const response = await httpClient.post<APIResponse<SavingsGoal>>("/savings-goals", payload);
		return unwrap<SavingsGoal>(response);
	},

	update: async (id: string, payload: UpdateSavingsGoalPayload): Promise<SavingsGoal> => {
		const response = await httpClient.patch<APIResponse<SavingsGoal>>(
			`/savings-goals/${id}`,
			payload,
		);
		return unwrap<SavingsGoal>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/savings-goals/${id}`);
	},
};
