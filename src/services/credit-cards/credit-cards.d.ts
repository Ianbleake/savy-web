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

