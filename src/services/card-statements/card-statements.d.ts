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

