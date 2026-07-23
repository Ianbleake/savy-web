export function buildPayload<T extends Record<string, unknown>>(
	data: T,
	dirtyFields: Partial<Record<keyof T, boolean>>,
): Partial<T> {
	return Object.fromEntries(
		Object.entries(data).filter(([key, value]) => {
			const typedKey = key as keyof T;

			if (!dirtyFields[typedKey]) return false;
			if (value === undefined || value === "") return false;

			return true;
		}),
	) as Partial<T>;
}