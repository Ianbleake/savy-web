export const buildBalanceChartData = (
	assets: number,
	liabilities: number,
): { label: string; value: number; color?: string }[] => {
	const data: { label: string; value: number; color?: string }[] = [
		{ label: "Activos", value: assets, color: "var(--color-primary)" },
	];
	if (liabilities > 0) {
		data.push({ label: "Pasivos", value: liabilities, color: "var(--color-destructive)" });
	}
	return data;
};
