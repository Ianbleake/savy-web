import { httpClient, unwrap } from "../http-client";

export const CATEGORIES_QUERY_KEY = ["categories"] as const;

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
