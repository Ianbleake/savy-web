import { httpClient, unwrap } from "../http-client";

export const BANKS_QUERY_KEY = ["banks"] as const;

export const bankService: BankServiceWithSummary = {
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

	getSummary: async (id: string, period: PeriodType): Promise<BankSummary> => {
		const response = await httpClient.get<APIResponse<BankSummary>>(`/banks/${id}/summary`, {
			params: { period },
		});
		const raw = unwrap<BankSummary>(response);

		// CRITICAL: normalize Decimal-as-string fields from Prisma.
		// accounts[].balance, creditCards[].creditLimit and interestRate arrive as strings.
		return {
			...raw,
			accounts: raw.accounts.map((account) => ({
				...account,
				balance: Number(account.balance),
			})),
			creditCards: raw.creditCards.map((card) => ({
				...card,
				creditLimit: Number(card.creditLimit),
				interestRate: Number(card.interestRate),
			})),
		};
	},
};
