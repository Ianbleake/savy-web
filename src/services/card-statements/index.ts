import { httpClient, unwrap } from "../http-client";

export const CARD_STATEMENTS_QUERY_KEY = ["card-statements"] as const;

type CardStatement = {
	id: string;
	creditCardId: string;
	periodStart: string;
	periodEnd: string;
	balance: number;
	minPayment: number;
	noInterestPayment: number;
	interestAmount: number;
	isPaid: boolean;
	createdAt: string;
};

type CardStatementFilters = {
	creditCardId?: string;
	isPaid?: boolean;
	sortBy?: "periodEnd" | "balance" | "createdAt";
	order?: "asc" | "desc";
};

type CardStatementService = {
	getAll: (filters?: CardStatementFilters) => Promise<CardStatement[]>;
	getById: (id: string) => Promise<CardStatement>;
	create: (payload: CreateCardStatementPayload) => Promise<CardStatement>;
	update: (id: string, payload: UpdateCardStatementPayload) => Promise<CardStatement>;
	remove: (id: string) => Promise<void>;
};

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
