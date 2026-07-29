import { httpClient, unwrap } from "../http-client";

export const CARD_STATEMENTS_QUERY_KEY = ["card-statements"] as const;

export const cardStatementService: CardStatementService = {
	getAll: async (filters?: CardStatementFilters): Promise<CardStatement[]> => {
		const response = await httpClient.get<APIResponse<CardStatement[]>>("/card-statements", {
			params: filters,
		});
		return unwrap<CardStatement[]>(response);
	},

	getById: async (id: string): Promise<CardStatement> => {
		const response = await httpClient.get<APIResponse<CardStatement>>(`/card-statements/${id}`);
		return unwrap<CardStatement>(response);
	},

	create: async (payload: CreateCardStatementPayload): Promise<CardStatement> => {
		const response = await httpClient.post<APIResponse<CardStatement>>("/card-statements", payload);
		return unwrap<CardStatement>(response);
	},

	update: async (id: string, payload: UpdateCardStatementPayload): Promise<CardStatement> => {
		const response = await httpClient.patch<APIResponse<CardStatement>>(
			`/card-statements/${id}`,
			payload,
		);
		return unwrap<CardStatement>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/card-statements/${id}`);
	},
};
