import { httpClient, unwrap } from "../http-client";

export const TRANSACTIONS_QUERY_KEY = ["transactions"] as const;

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

type PaginatedResponse<T> = {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
};

type TransactionService = {
	getAll: (filters?: TransactionFilters) => Promise<PaginatedResponse<Transaction>>;
	getById: (id: string) => Promise<Transaction>;
	create: (payload: CreateTransactionPayload) => Promise<Transaction>;
	update: (id: string, payload: UpdateTransactionPayload) => Promise<Transaction>;
	remove: (id: string) => Promise<void>;
};

export const transactionService: TransactionService = {
	getAll: async (filters?: TransactionFilters): Promise<PaginatedResponse<Transaction>> => {
		const response = await httpClient.get<APIResponse<PaginatedResponse<Transaction>>>(
			"/transactions",
			{
				params: filters,
			},
		);
		return unwrap<PaginatedResponse<Transaction>>(response);
	},

	getById: async (id: string): Promise<Transaction> => {
		const response = await httpClient.get<APIResponse<Transaction>>(`/transactions/${id}`);
		return unwrap<Transaction>(response);
	},

	create: async (payload: CreateTransactionPayload): Promise<Transaction> => {
		const response = await httpClient.post<APIResponse<Transaction>>("/transactions", payload);
		return unwrap<Transaction>(response);
	},

	update: async (id: string, payload: UpdateTransactionPayload): Promise<Transaction> => {
		const response = await httpClient.patch<APIResponse<Transaction>>(
			`/transactions/${id}`,
			payload,
		);
		return unwrap<Transaction>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/transactions/${id}`);
	},
};
