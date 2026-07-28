import { httpClient, unwrap } from "../http-client";

export const TRANSACTIONS_QUERY_KEY = ["transactions"] as const;

export const transactionService: TransactionService = {
	getAll: async (filters?: TransactionFilters): Promise<Transaction[]> => {
		const response = await httpClient.get<APIResponse<Transaction[]>>("/transactions", {
			params: filters,
		});
		return unwrap<Transaction[]>(response);
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
