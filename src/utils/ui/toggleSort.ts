/**
 * Cycles a sort field through: none -> ASC -> DESC -> none.
 *
 * Supports multi-sort (comma-separated). Each click on a field cycles it
 * independently while preserving other active sort fields.
 *
 * Examples (single-sort):
 *   toggleSort(undefined, "name")     -> "name"
 *   toggleSort("name", "name")        -> "-name"
 *   toggleSort("-name", "name")       -> undefined
 *
 * Examples (multi-sort):
 *   toggleSort("name", "status")      -> "name,status"
 *   toggleSort("name,status", "status") -> "name,-status"
 *   toggleSort("name,-status", "status") -> "name"
 *   toggleSort("name", "name")        -> "-name"
 */
export function toggleSort(currentSort: string | undefined, field: string): string | undefined {
	const fields = currentSort ? currentSort.split(",").filter(Boolean) : [];

	const ascIndex = fields.indexOf(field);
	const descIndex = fields.indexOf(`-${field}`);

	if (ascIndex !== -1) {
		fields[ascIndex] = `-${field}`;
	} else if (descIndex !== -1) {
		fields.splice(descIndex, 1);
	} else {
		fields.push(field);
	}

	return fields.length > 0 ? fields.join(",") : undefined;
}