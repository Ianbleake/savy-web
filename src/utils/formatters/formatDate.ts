import { format, isValid, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

type DateInput = string | Date | null | undefined;

function toValidDate(value: DateInput): Date | null {
	if (!value) return null;

	const date = typeof value === "string" ? parseISO(value) : value;

	return isValid(date) ? date : null;
}

export function formatDate(value: DateInput): string {
	const parsed = toValidDate(value);

	if (!parsed) return "-";

	return format(parsed, "MMMM d, yyyy", { locale: enUS });
}

export function toDateOnly(value: DateInput): string {
	const parsed = toValidDate(value);

	if (!parsed) return "";

	return format(parsed, "yyyy-MM-dd");
}

export function formatDateTime(value: DateInput): string {
	const parsed = toValidDate(value);

	if (!parsed) return "-";

	return format(parsed, "MMMM d, yyyy HH:mm", { locale: enUS });
}

export function formatDateRange(startDate: DateInput, endDate: DateInput): string {
	const formattedStartDate = formatDate(startDate);
	const formattedEndDate = formatDate(endDate);

	if (formattedStartDate === "-" && formattedEndDate === "-") return "-";

	if (formattedStartDate === "-") return `Until ${formattedEndDate}`;

	if (formattedEndDate === "-") return `From ${formattedStartDate}`;

	return `${formattedStartDate} - ${formattedEndDate}`;
}

export function formatTime(value: DateInput): string {
	const parsed = toValidDate(value);

	if (!parsed) return "-";

	return format(parsed, "HH:mm");
}