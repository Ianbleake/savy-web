import { httpClient, unwrap } from "../http-client";

export const INCOME_SOURCES_QUERY_KEY = ["income-sources"] as const;

export const incomeSourceService: IncomeSourceService = {
	getAll: async (filters?: IncomeSourceFilters): Promise<IncomeSource[]> => {
		const response = await httpClient.get<APIResponse<IncomeSource[]>>("/income-sources", {
			params: filters,
		});
		return unwrap<IncomeSource[]>(response);
	},

	create: async (payload: CreateIncomeSourcePayload): Promise<IncomeSource> => {
		const response = await httpClient.post<APIResponse<IncomeSource>>("/income-sources", payload);
		return unwrap<IncomeSource>(response);
	},

	bulkCreate: async (payload: {
		sources: CreateIncomeSourcePayload[];
	}): Promise<BulkCreateResponse> => {
		const response = await httpClient.post<APIResponse<BulkCreateResponse>>(
			"/income-sources/bulk",
			payload,
		);
		return unwrap<BulkCreateResponse>(response);
	},

	update: async (id: string, payload: UpdateIncomeSourcePayload): Promise<IncomeSource> => {
		const response = await httpClient.patch<APIResponse<IncomeSource>>(
			`/income-sources/${id}`,
			payload,
		);
		return unwrap<IncomeSource>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/income-sources/${id}`);
	},
};
