export const buildRoute = (path: string, params: Record<string, string | number>): string => {
	return Object.entries(params).reduce((acc, [key, value]) => {
		return acc.replace(`:${key}`, String(value));
	}, path);
};