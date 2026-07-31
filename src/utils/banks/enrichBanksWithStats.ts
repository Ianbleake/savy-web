import { ACCOUNT_TYPE_LABELS } from "@/content/banks/bankContent";

export const enrichBanksWithStats = (banks: Bank[], accounts: Account[]): BankWithStats[] => {
	return banks.map((bank) => {
		const bankAccounts = accounts.filter((account) => account.bankId === bank.id);
		const uniqueTypes = [...new Set(bankAccounts.map((account) => account.type))];
		const accountTypes = uniqueTypes.map((type) => ACCOUNT_TYPE_LABELS[type] ?? type);

		return {
			id: bank.id,
			name: bank.name,
			color: bank.color,
			logo: bank.logo,
			isActive: bank.isActive,
			accountCount: bankAccounts.length,
			accountTypes,
			createdAt: bank.createdAt,
		};
	});
};
