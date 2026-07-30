type BanksController = {
	searchQuery: string;
	sortBy: "name" | "createdAt";
	order: "asc" | "desc";
	statusFilter: "all" | "active" | "inactive";
	setSearchQuery: (query: string) => void;
	setSortBy: (sortBy: "name" | "createdAt") => void;
	setOrder: (order: "asc" | "desc") => void;
	setStatusFilter: (filter: "all" | "active" | "inactive") => void;
	resetFilters: () => void;
};
