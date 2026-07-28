import { httpClient, unwrap } from "../http-client";

export const LOANS_QUERY_KEY = ["loans"] as const;

export const loanService: LoanService = {
	getAll: async (): Promise<Loan[]> => {
		const response = await httpClient.get<APIResponse<Loan[]>>("/loans");
		return unwrap<Loan[]>(response);
	},

	getById: async (id: string): Promise<Loan> => {
		const response = await httpClient.get<APIResponse<Loan>>(`/loans/${id}`);
		return unwrap<Loan>(response);
	},

	create: async (payload: CreateLoanPayload): Promise<Loan> => {
		const response = await httpClient.post<APIResponse<Loan>>("/loans", payload);
		return unwrap<Loan>(response);
	},

	update: async (id: string, payload: UpdateLoanPayload): Promise<Loan> => {
		const response = await httpClient.patch<APIResponse<Loan>>(`/loans/${id}`, payload);
		return unwrap<Loan>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/loans/${id}`);
	},
};
