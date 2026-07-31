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
