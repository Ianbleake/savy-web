/**
 * Formats a decimal value as a percentage string.
 *
 * @param value - Decimal value (0.15 = 15%)
 * @param decimals - Number of decimal places (default: 2)
 *
 * @example
 * formatPercent(0.15) // "15.00%"
 * formatPercent(0.155, 1) // "15.5%"
 */
export function formatPercent(value: number, decimals = 2): string {
	return `${(value * 100).toFixed(decimals)}%`;
}