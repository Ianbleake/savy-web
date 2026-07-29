type CreditCard = {
	id: string;
	accountId: string;
	creditLimit: number;
	cutDay: number;
	paymentDay: number;
	interestRate: number;
	noInterestMonths: number;
	createdAt: string;
	updatedAt: string;
};

type CreateCreditCardPayload = {
	accountId: string;
	creditLimit: number;
	cutDay: number;
	paymentDay: number;
	interestRate: number;
	noInterestMonths?: number;
};

type UpdateCreditCardPayload = {
	creditLimit?: number;
	cutDay?: number;
	paymentDay?: number;
	interestRate?: number;
	noInterestMonths?: number;
};

type CreditCardFilters = {
	sortBy?: "createdAt" | "creditLimit";
	order?: "asc" | "desc";
};

type CreditCardService = {
	getAll: (filters?: CreditCardFilters) => Promise<CreditCard[]>;
	getById: (id: string) => Promise<CreditCard>;
	create: (payload: CreateCreditCardPayload) => Promise<CreditCard>;
	update: (id: string, payload: UpdateCreditCardPayload) => Promise<CreditCard>;
	remove: (id: string) => Promise<void>;
};