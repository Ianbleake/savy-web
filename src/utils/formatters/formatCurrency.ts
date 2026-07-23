/**
 * Formats a money amount (stored in cents by the backend) for display.
 *
 * The backend stores all monetary values in the smallest currency unit
 * (cents, centavos, etc.). This function divides by 100 and formats
 * using Intl.NumberFormat with the specified currency and locale.
 *
 * Formatters are cached per currency+locale for performance.
 *
 * @param cents - Amount in the smallest currency unit (e.g. cents, centavos)
 * @param currency - ISO 4217 currency code (default: "MXN")
 * @param locale - BCP 47 locale tag (default: "es-MX")
 *
 * @example
 * formatCurrency(15099) // "$150.99" (MXN)
 * formatCurrency(15099, "USD", "en-US") // "$150.99" (USD)
 * formatCurrency(0) // "$0.00"
 */
const formatterCache = new Map<string, Intl.NumberFormat>();

export function formatCurrency(
	cents: number,
	currency = "MXN",
	locale = "es-MX",
): string {
	const cacheKey = `${currency}:${locale}`;

	let formatter = formatterCache.get(cacheKey);
	if (!formatter) {
		formatter = new Intl.NumberFormat(locale, {
			style: "currency",
			currency,
			minimumFractionDigits: 2,
		});
		formatterCache.set(cacheKey, formatter);
	}

	return formatter.format(cents / 100);
}