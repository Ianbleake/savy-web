type CategoryType = "INCOME" | "EXPENSE";

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

