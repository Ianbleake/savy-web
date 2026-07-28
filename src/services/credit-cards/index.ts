import { httpClient, unwrap } from "../http-client";

export const CREDIT_CARDS_QUERY_KEY = ["credit-cards"] as const;

export const creditCardService: CreditCardService = {
	getAll: async (): Promise<CreditCard[]> => {
		const response = await httpClient.get<APIResponse<CreditCard[]>>("/credit-cards");
		return unwrap<CreditCard[]>(response);
	},

	getById: async (id: string): Promise<CreditCard> => {
		const response = await httpClient.get<APIResponse<CreditCard>>(`/credit-cards/${id}`);
		return unwrap<CreditCard>(response);
	},

	create: async (payload: CreateCreditCardPayload): Promise<CreditCard> => {
		const response = await httpClient.post<APIResponse<CreditCard>>("/credit-cards", payload);
		return unwrap<CreditCard>(response);
	},

	update: async (id: string, payload: UpdateCreditCardPayload): Promise<CreditCard> => {
		const response = await httpClient.patch<APIResponse<CreditCard>>(
			`/credit-cards/${id}`,
			payload,
		);
		return unwrap<CreditCard>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/credit-cards/${id}`);
	},
};
