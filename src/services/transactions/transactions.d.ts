type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER" | "PAYMENT";

type Transaction = {
	id: string;
	accountId: string;
	destinationAccountId: string | null;
	categoryId: string | null;
	type: TransactionType;
	amount: number;
	description: string | null;
	note: string | null;
	date: string;
	createdAt: string;
	updatedAt: string;
};

type TransactionFilters = {
	accountId?: string;
	type?: TransactionType;
	categoryId?: string;
	bankId?: string;
	search?: string;
	from?: string;
	to?: string;
	sortBy?: "date" | "amount" | "createdAt";
	order?: "asc" | "desc";
	page?: number;
	limit?: number;
};

type CreateTransactionPayload = {
	accountId: string;
	type: TransactionType;
	amount: number;
	destinationAccountId?: string | null;
	categoryId?: string;
	description?: string;
	note?: string;
	date?: string;
};

type UpdateTransactionPayload = {
	accountId?: string;
	destinationAccountId?: string | null;
	categoryId?: string | null;
	type?: TransactionType;
	amount?: number;
	description?: string | null;
	note?: string | null;
	date?: string;
};

type TransactionService = {
	getAll: (filters?: TransactionFilters) => Promise<PaginatedResponse<Transaction>>;
	getById: (id: string) => Promise<Transaction>;
	create: (payload: CreateTransactionPayload) => Promise<Transaction>;
	update: (id: string, payload: UpdateTransactionPayload) => Promise<Transaction>;
	remove: (id: string) => Promise<void>;
};