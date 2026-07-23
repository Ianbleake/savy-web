import { parse } from "date-fns";

export const parseDate = (value?: string): Date | undefined => {
	if (!value) return undefined;
	const parsed = parse(value, "yyyy-MM-dd", new Date());
	return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};