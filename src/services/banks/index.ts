import { httpClient, unwrap } from "../http-client";

export const BANKS_QUERY_KEY = ["banks"] as const;

export const bankService: BankService = {
	getAll: async (filters?: BankFilters): Promise<Bank[]> => {
		const response = await httpClient.get<APIResponse<Bank[]>>("/banks", {
			params: filters,
		});
		return unwrap<Bank[]>(response);
	},

	getById: async (id: string): Promise<BankDetail> => {
		const response = await httpClient.get<APIResponse<BankDetail>>(`/banks/${id}`);
		return unwrap<BankDetail>(response);
	},

	create: async (payload: CreateBankPayload): Promise<Bank> => {
		const response = await httpClient.post<APIResponse<Bank>>("/banks", payload);
		return unwrap<Bank>(response);
	},

	update: async (id: string, payload: UpdateBankPayload): Promise<Bank> => {
		const response = await httpClient.patch<APIResponse<Bank>>(`/banks/${id}`, payload);
		return unwrap<Bank>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/banks/${id}`);
	},
};
