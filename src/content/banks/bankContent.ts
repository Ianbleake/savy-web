type AccountTypeOption = {
	label: string;
	value: AccountType;
	description: string;
};

export const ACCOUNT_TYPE_OPTIONS: AccountTypeOption[] = [
	{ label: "Débito", value: "DEBIT", description: "Cuenta de débito tradicional" },
	{ label: "Efectivo", value: "CASH", description: "Dinero en efectivo" },
	{ label: "Crédito", value: "CREDIT", description: "Tarjeta de crédito" },
	{ label: "Préstamo", value: "LOAN", description: "Préstamo o crédito de banco" },
];

export const ACCOUNT_TYPE_LABELS: Record<string, string> = {
	DEBIT: "Débito",
	CASH: "Efectivo",
	CREDIT: "Crédito",
	LOAN: "Préstamo",
};
