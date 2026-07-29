type CategoryType = "INCOME" | "EXPENSE";

type Category = {
	id: string;
	profileId: string;
	name: string;
	type: CategoryType;
	color: string | null;
	icon: string | null;
	createdAt: string;
};

type CreateCategoryPayload = {
	name: string;
	type: CategoryType;
	color?: string;
	icon?: string;
};

type UpdateCategoryPayload = {
	name?: string;
	color?: string;
	icon?: string;
};

type CategoryFilters = {
	type?: CategoryType;
	sortBy?: "name" | "createdAt";
	order?: "asc" | "desc";
};

type CategoryService = {
	getAll: (filters?: CategoryFilters) => Promise<Category[]>;
	getById: (id: string) => Promise<Category>;
	create: (payload: CreateCategoryPayload) => Promise<Category>;
	update: (id: string, payload: UpdateCategoryPayload) => Promise<Category>;
	remove: (id: string) => Promise<void>;
};