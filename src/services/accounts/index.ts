import { httpClient, unwrap } from "../http-client";

export const ACCOUNTS_QUERY_KEY = ["accounts"] as const;

type AccountFilters = {
	type?: AccountType;
	bankId?: string;
	isActive?: boolean;
	sortBy?: "balance" | "name" | "createdAt";
	order?: "asc" | "desc";
};

type AccountService = {
	getAll: (filters?: AccountFilters) => Promise<Account[]>;
	getById: (id: string) => Promise<Account>;
	create: (payload: CreateAccountPayload) => Promise<Account>;
	update: (id: string, payload: UpdateAccountPayload) => Promise<Account>;
	remove: (id: string) => Promise<void>;
};

export const accountService: AccountService = {
	getAll: async (filters?: AccountFilters): Promise<Account[]> => {
		const response = await httpClient.get<APIResponse<Account[]>>("/accounts", {
			params: filters,
		});
		return unwrap<Account[]>(response);
	},

	getById: async (id: string): Promise<Account> => {
		const response = await httpClient.get<APIResponse<Account>>(`/accounts/${id}`);
		return unwrap<Account>(response);
	},

	create: async (payload: CreateAccountPayload): Promise<Account> => {
		const response = await httpClient.post<APIResponse<Account>>("/accounts", payload);
		return unwrap<Account>(response);
	},

	update: async (id: string, payload: UpdateAccountPayload): Promise<Account> => {
		const response = await httpClient.patch<APIResponse<Account>>(`/accounts/${id}`, payload);
		return unwrap<Account>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/accounts/${id}`);
	},
};
