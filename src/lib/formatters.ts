const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
});

function formatCurrency(amount: number, currency = "USD", locale = "en-US"): string {
	if (currency === "USD" && locale === "en-US") {
		return currencyFormatter.format(amount);
	}
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
	}).format(amount);
}

function formatPercent(value: number, decimals = 2): string {
	return `${(value * 100).toFixed(decimals)}%`;
}

function formatCompact(amount: number, locale = "en-US"): string {
	return new Intl.NumberFormat(locale, {
		notation: "compact",
		compactDisplay: "short",
	}).format(amount);
}

export { formatCurrency, formatPercent, formatCompact };
