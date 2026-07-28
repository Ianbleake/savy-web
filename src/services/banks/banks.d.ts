type Bank = {
	id: string;
	profileId: string;
	name: string;
	color: string | null;
	logo: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type BankDetail = Bank & {
	accounts: import("../accounts/accounts").Account[];
	creditCards: import("../credit-cards/credit-cards").CreditCard[];
	loans: import("../loans/loans").Loan[];
};

type CreateBankPayload = {
	name: string;
	color?: string;
	logo?: string;
};

type UpdateBankPayload = {
	name?: string;
	color?: string;
	logo?: string;
};

type BankService = {
	getAll: () => Promise<Bank[]>;
	getById: (id: string) => Promise<BankDetail>;
	create: (payload: CreateBankPayload) => Promise<Bank>;
	update: (id: string, payload: UpdateBankPayload) => Promise<Bank>;
	remove: (id: string) => Promise<void>;
};