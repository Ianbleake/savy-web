export const NUMBER_FORMATTER = new Intl.NumberFormat("es-MX", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 6,
});

export const cleanNumberInput = (
	value: string,
	options: { allowDecimals: boolean; allowNegative: boolean },
): string => {
	const { allowDecimals, allowNegative } = options;

	const isNegative = allowNegative && value.startsWith("-");

	const pattern = allowDecimals ? /[^\d.]/g : /[^\d]/g;
	let cleaned = value.replace(pattern, "");

	if (allowDecimals) {
		const firstDot = cleaned.indexOf(".");
		if (firstDot !== -1) {
			cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
		}
	}

	return isNegative ? `-${cleaned}` : cleaned;
};

export const formatNumberString = (value: string): string => {
	if (!value || value === "-") return value;

	const isNegative = value.startsWith("-");
	const abs = isNegative ? value.slice(1) : value;

	const [intPart, decPart] = abs.split(".");
	const intFormatted = NUMBER_FORMATTER.format(Number(intPart || 0));

	const formatted = decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;

	return isNegative ? `-${formatted}` : formatted;
};

export const getNewCursorPosition = (raw: string, formatted: string, cursor: number): number => {
	const rawIsNegative = raw.startsWith("-");
	const formattedIsNegative = formatted.startsWith("-");

	const rawBefore = raw.slice(0, cursor);
	const digitsBefore = rawBefore.replace(/[^\d]/g, "").length;

	const startOffset = formattedIsNegative ? 1 : 0;

	if (rawIsNegative && cursor <= 1 && digitsBefore === 0) {
		return formattedIsNegative ? 1 : 0;
	}

	let count = 0;
	for (let i = startOffset; i < formatted.length; i++) {
		if (/\d/.test(formatted[i])) count++;
		if (count === digitsBefore) return i + 1;
	}

	return formatted.length;
};

export const parseDisplayToNumber = (value: string): number | null => {
	if (!value || value === "-") return null;
	const cleaned = value.replace(/,/g, "");
	const num = Number(cleaned);
	return Number.isNaN(num) ? null : num;
};