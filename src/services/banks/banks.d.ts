type Bank = {
	id: string;
	profileId: string;
	name: string;
	color: string | null;
	logo: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type BankDetail = Bank & {
	accounts: import("../accounts/accounts").Account[];
	creditCards: import("../credit-cards/credit-cards").CreditCard[];
	loans: import("../loans/loans").Loan[];
};

type CreateBankPayload = {
	name: string;
	color?: string;
	logo?: string;
};

type UpdateBankPayload = {
	name?: string;
	color?: string;
	logo?: string;
};

type BankFilters = {
	isActive?: boolean;
	sortBy?: "name" | "createdAt";
	order?: "asc" | "desc";
};

type BankService = {
	getAll: (filters?: BankFilters) => Promise<Bank[]>;
	getById: (id: string) => Promise<BankDetail>;
	create: (payload: CreateBankPayload) => Promise<Bank>;
	update: (id: string, payload: UpdateBankPayload) => Promise<Bank>;
	remove: (id: string) => Promise<void>;
};

type PeriodType = "day" | "week" | "month" | "other_month" | "quarter" | "semester" | "year";

type BankSummary = {
	bank: {
		id: string;
		name: string;
		color: string | null;
		logo: string | null;
		isActive: boolean;
	};
	netWorth: number;
	liquidity: number;
	debt: number;
	balanceBreakdown: {
		assets: number;
		liabilities: number;
	};
	incomeVsExpenses: {
		income: number;
		expenses: number;
		period: string;
		periodLabel: string;
	};
	topCategories: {
		categoryId: string;
		categoryName: string;
		amount: number;
		percentage: number;
	}[];
	accounts: import("../accounts/accounts").Account[];
	creditCards: import("../credit-cards/credit-cards").CreditCard[];
	loans: {
		id: string;
		accountId: string;
		principal: number;
		interestRate: number;
		termMonths: number;
		startDate: string;
		monthlyPayment: number;
		remaining: number;
		progress: number;
		createdAt: string;
		updatedAt: string;
	}[];
	currency: string;
};

type BankServiceWithSummary = BankService & {
	getSummary: (id: string, period: PeriodType) => Promise<BankSummary>;
};