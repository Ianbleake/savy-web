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

type CreateCardStatementPayload = {
	creditCardId: string;
	periodStart: string;
	periodEnd: string;
	balance: number;
	minPayment: number;
	noInterestPayment: number;
	interestAmount?: number;
};

type UpdateCardStatementPayload = {
	balance?: number;
	minPayment?: number;
	noInterestPayment?: number;
	interestAmount?: number;
	isPaid?: boolean;
};

type CardStatementService = {
	getAll: (creditCardId?: string) => Promise<CardStatement[]>;
	getById: (id: string) => Promise<CardStatement>;
	create: (payload: CreateCardStatementPayload) => Promise<CardStatement>;
	update: (id: string, payload: UpdateCardStatementPayload) => Promise<CardStatement>;
	remove: (id: string) => Promise<void>;
};