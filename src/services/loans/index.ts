import { httpClient, unwrap } from "../http-client";

export const LOANS_QUERY_KEY = ["loans"] as const;

type LoanFilters = {
	sortBy?: "createdAt" | "remaining" | "principal";
	order?: "asc" | "desc";
};

type LoanService = {
	getAll: (filters?: LoanFilters) => Promise<Loan[]>;
	getById: (id: string) => Promise<Loan>;
	create: (payload: CreateLoanPayload) => Promise<Loan>;
	update: (id: string, payload: UpdateLoanPayload) => Promise<Loan>;
	remove: (id: string) => Promise<void>;
};

export const loanService: LoanService = {
	getAll: async (filters?: LoanFilters): Promise<Loan[]> => {
		const response = await httpClient.get<APIResponse<Loan[]>>("/loans", {
			params: filters,
		});
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
