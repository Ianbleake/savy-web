import { httpClient, unwrap } from "../http-client";

export const CATEGORIES_QUERY_KEY = ["categories"] as const;

type Category = {
	id: string;
	profileId: string;
	name: string;
	type: CategoryType;
	color: string | null;
	icon: string | null;
	createdAt: string;
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

export const categoryService: CategoryService = {
	getAll: async (filters?: CategoryFilters): Promise<Category[]> => {
		const response = await httpClient.get<APIResponse<Category[]>>("/categories", {
			params: filters,
		});
		return unwrap<Category[]>(response);
	},

	getById: async (id: string): Promise<Category> => {
		const response = await httpClient.get<APIResponse<Category>>(`/categories/${id}`);
		return unwrap<Category>(response);
	},

	create: async (payload: CreateCategoryPayload): Promise<Category> => {
		const response = await httpClient.post<APIResponse<Category>>("/categories", payload);
		return unwrap<Category>(response);
	},

	update: async (id: string, payload: UpdateCategoryPayload): Promise<Category> => {
		const response = await httpClient.patch<APIResponse<Category>>(`/categories/${id}`, payload);
		return unwrap<Category>(response);
	},

	remove: async (id: string): Promise<void> => {
		await httpClient.delete(`/categories/${id}`);
	},
};
