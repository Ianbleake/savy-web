/**
 * Currency conversion helpers — bridge between display units and storage units.
 *
 * The backend stores all monetary values in the smallest currency unit
 * (cents, centavos, etc.). These helpers convert between the display value
 * (what the user types) and the storage value (what the API expects).
 *
 * @example
 * toCents(150.99) // 15099
 * fromCents(15099) // 150.99
 */

/**
 * Converts a display value (pesos, dollars, etc.) to the smallest currency unit (cents).
 * Uses Math.round to avoid floating-point precision issues.
 *
 * @param displayValue - Amount in display units (e.g. 150.99)
 * @returns Amount in cents (e.g. 15099)
 */
export function toCents(displayValue: number): number {
	return Math.round(displayValue * 100);
}

/**
 * Converts the smallest currency unit (cents) to a display value (pesos, dollars, etc.).
 *
 * @param cents - Amount in cents (e.g. 15099)
 * @returns Amount in display units (e.g. 150.99)
 */
export function fromCents(cents: number): number {
	return cents / 100;
}