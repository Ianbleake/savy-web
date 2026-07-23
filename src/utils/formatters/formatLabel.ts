export const formatLabel = (text?: string | null): string => {
	if (!text?.trim()) {
		return "-";
	}

	return text
		.replace(/_/g, " ")
		.trim()
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase());
};