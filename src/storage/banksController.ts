import { create } from "zustand";

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
