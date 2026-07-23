import type { DateRange } from "react-day-picker";

/**
 * In `mode="range"`, react-day-picker does NOT return the day the user clicked.
 * When a committed range is reopened (pendingRange has both `from` and `to`),
 * the first click yields a recalculated `range` containing the previous endpoints
 * plus the newly clicked day. This helper isolates the day the user actually clicked
 * by discarding the endpoints that already existed in the previous range.
 */
export const resolveClickedDay = (range: DateRange, previous?: DateRange): Date => {
	if (!range.from) throw new Error("resolveClickedDay requires range.from to be defined");
	if (!range.to) return range.from;

	const prevFrom = previous?.from?.getTime();
	const prevTo = previous?.to?.getTime();

	if (prevFrom !== undefined && prevFrom === prevTo) {
		return range.to;
	}

	const fromIsOld = range.from.getTime() === prevFrom || range.from.getTime() === prevTo;
	const toIsOld = range.to.getTime() === prevFrom || range.to.getTime() === prevTo;

	if (fromIsOld && !toIsOld) return range.to;
	if (!fromIsOld) return range.from;
	return range.to;
};

/**
 * Guarantees the range invariant `from <= to` by swapping endpoints when the user
 * picks an end date earlier than the start date.
 */
export const normalizeRange = (from: Date, to: Date): { from: Date; to: Date } => {
	return from.getTime() <= to.getTime() ? { from, to } : { from: to, to: from };
};