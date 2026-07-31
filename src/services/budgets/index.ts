import { httpClient, unwrap } from "../http-client";

export const BUDGETS_QUERY_KEY = ["budgets"] as const;

type Budget = {
	id: string;
	profileId: string;
	categoryId: string;
	amount: number;
	period: BudgetPeriod;
	startDate: string;
	endDate: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type BudgetProgress = {
	spent: number;
	budget: number;
	remaining: number;
	percentage: number;
	periodStart: string;
	periodEnd: string;
};

type BudgetFilters = {
	isActive?: boolean;
	period?: BudgetPeriod;
	sortBy?: "amount" | "startDate";
	order?: "asc" | "desc";
};

type BudgetService = {
	getAll: (filters?: BudgetFilters) => Promise<Budget[]>;
	getById: (id: string) => Promise<Budget>;
	create: (payload: CreateBudgetPayload) => Promise<Budget>;
	update: (id: string, payload: UpdateBudgetPayload) => Promise<Budget>;
	remove: (id: string) => Promise<void>;
	getProgress: (id: string) => Promise<BudgetProgress>;
};

export const budgetService: BudgetService = {
	getAll: async (filters?: BudgetFilters): Promise<Budget[]> => {
		const response = await httpClient.get<APIResponse<Budget[]>>("/budgets", {
			params: filters,
		});
		return unwrap<Budget[]>(response);
	},

	getById: async (id: string): Promise<Budget> => {
		const response = await httpClient.get<APIResponse<Budget>>(`/budgets/${id}`);
		return unwrap<Budget>(response);
	},

	create: async (payload: CreateBudgetPayload): Promise<Budget> => {
		const response = await httpClient.post<APIResponse<Budget>>("/budgets", payload);
		return unwrap<Budget>(response);
	},

	update: async (id: string, payload: UpdateBudgetPayload): Promise<Budget> => {
		const response = await httpClient.patch<APIResponse<Budget>>(`/budgets/${id}`, payload);
		return unwrap<Budget>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/budgets/${id}`);
	},

	getProgress: async (id: string): Promise<BudgetProgress> => {
		const response = await httpClient.get<APIResponse<BudgetProgress>>(`/budgets/${id}/progress`);
		return unwrap<BudgetProgress>(response);
	},
};
