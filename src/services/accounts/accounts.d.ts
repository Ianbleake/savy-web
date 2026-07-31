type AccountType = "DEBIT" | "CREDIT" | "LOAN" | "CASH";

type Account = {
	id: string;
	profileId: string;
	bankId: string | null;
	name: string;
	type: AccountType;
	currency: string;
	balance: number;
	color: string | null;
	icon: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type CreateAccountPayload = {
	name: string;
	type: AccountType;
	bankId?: string | null;
	currency?: string;
	balance?: number;
	color?: string;
	icon?: string;
};

type UpdateAccountPayload = {
	name?: string;
	bankId?: string | null;
	currency?: string;
	balance?: number;
	color?: string;
	icon?: string;
};

