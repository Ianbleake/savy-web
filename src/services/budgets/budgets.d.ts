type BudgetPeriod = "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";

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

type CreateBudgetPayload = {
	categoryId: string;
	amount: number;
	period: BudgetPeriod;
	startDate: string;
	endDate?: string;
};

type UpdateBudgetPayload = {
	categoryId?: string;
	amount?: number;
	period?: BudgetPeriod;
	startDate?: string;
	endDate?: string;
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