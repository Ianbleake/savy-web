export const formatPhone = (phone: string | undefined): string => {
	if (!phone) return "-";

	const digits = phone.replace(/\D/g, "");

	const match = digits.match(/(\d{10})$/);

	if (!match) {
		return phone;
	}

	const clean = match[1];

	const areaCode = clean.slice(0, 3);
	const part1 = clean.slice(3, 6);
	const part2 = clean.slice(6);

	return `(${areaCode}) ${part1}-${part2}`;
};