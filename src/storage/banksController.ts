import { create } from "zustand";

export const useBanksController = create<BanksController>()((set) => ({
	searchQuery: "",
	sortBy: "name",
	order: "asc",
	statusFilter: "all",

	setSearchQuery: (query: string): void => {
		set({ searchQuery: query });
	},

	setSortBy: (sortBy: "name" | "createdAt"): void => {
		set({ sortBy });
	},

	setOrder: (order: "asc" | "desc"): void => {
		set({ order });
	},

	setStatusFilter: (filter: "all" | "active" | "inactive"): void => {
		set({ statusFilter: filter });
	},

	resetFilters: (): void => {
		set({ searchQuery: "", sortBy: "name", order: "asc", statusFilter: "all" });
	},
}));
