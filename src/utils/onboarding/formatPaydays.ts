export const formatPaydays = (paydays: number[]): string => {
	const days = [...paydays].sort((prev, next) => prev - next);

	if (days.length === 0) return "";
	if (days.length === 1) return `Día ${days[0]}`;
	return `Días ${days.join(", ")}`;
};
