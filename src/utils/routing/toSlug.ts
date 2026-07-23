type ToSlugOptions = {
	upper?: boolean;
};

export const toSlug = (value: string, options?: ToSlugOptions): string => {
	const { upper = false } = options ?? {};

	const slug = value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-zA-Z0-9\s_]/g, "")
		.trim()
		.replace(/\s+/g, "_");

	return upper ? slug.toUpperCase() : slug.toLowerCase();
};