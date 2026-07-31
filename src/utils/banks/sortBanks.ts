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
