/**
 * Formats a number in compact notation (e.g. 1.5M, 23K).
 *
 * @param amount - The number to format
 * @param locale - BCP 47 locale tag (default: "es-MX")
 *
 * @example
 * formatCompact(1500000) // "1.5 M"
 * formatCompact(23000, "en-US") // "23K"
 */
export function formatCompact(amount: number, locale = "es-MX"): string {
	return new Intl.NumberFormat(locale, {
		notation: "compact",
		compactDisplay: "short",
	}).format(amount);
}