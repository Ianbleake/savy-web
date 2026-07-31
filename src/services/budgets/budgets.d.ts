type BudgetPeriod = "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";

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

