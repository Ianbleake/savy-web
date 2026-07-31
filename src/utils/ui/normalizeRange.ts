export const normalizeRange = (from: Date, to: Date): { from: Date; to: Date } => {
	return from.getTime() <= to.getTime() ? { from, to } : { from: to, to: from };
};
