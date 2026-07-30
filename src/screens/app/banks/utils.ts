import { ACCOUNT_TYPE_LABELS } from "@/content/banks/bankContent";

export const SORT_OPTIONS: Option[] = [
	{ label: "Nombre", value: "name" },
	{ label: "Fecha de creación", value: "createdAt" },
];

export const STATUS_OPTIONS: Option[] = [
	{ label: "Todos", value: "all" },
	{ label: "Activos", value: "active" },
	{ label: "Inactivos", value: "inactive" },
];

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

export const filterBanks = (
	banks: BankWithStats[],
	searchQuery: string,
	statusFilter: "all" | "active" | "inactive",
): BankWithStats[] => {
	return banks.filter((bank) => {
		const matchesSearch =
			searchQuery === "" || bank.name.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			statusFilter === "all" ||
			(statusFilter === "active" && bank.isActive) ||
			(statusFilter === "inactive" && !bank.isActive);

		return matchesSearch && matchesStatus;
	});
};

export const sortBanks = (
	banks: BankWithStats[],
	sortBy: "name" | "createdAt",
	order: "asc" | "desc",
): BankWithStats[] => {
	const sorted = [...banks].sort((prev, next) => {
		if (sortBy === "name") {
			return prev.name.localeCompare(next.name);
		}
		return new Date(prev.createdAt).getTime() - new Date(next.createdAt).getTime();
	});

	return order === "desc" ? sorted.reverse() : sorted;
};
