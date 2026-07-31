type Loan = {
	id: string;
	accountId: string;
	principal: number;
	interestRate: number;
	termMonths: number;
	startDate: string;
	monthlyPayment: number;
	remaining: number;
	createdAt: string;
	updatedAt: string;
};

type CreateLoanPayload = {
	accountId: string;
	principal: number;
	interestRate: number;
	termMonths: number;
	startDate: string;
	monthlyPayment: number;
	remaining?: number;
};

type UpdateLoanPayload = {
	interestRate?: number;
	termMonths?: number;
	monthlyPayment?: number;
	remaining?: number;
};

