import { PERIOD_OPTIONS } from "@/content/banks/bankContent";

export { PERIOD_OPTIONS };

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

export const buildIncomeExpensesChartData = (
	income: number,
	expenses: number,
): { label: string; value: number; color?: string }[] => {
	const data: { label: string; value: number; color?: string }[] = [];
	if (income > 0) data.push({ label: "Ingresos", value: income, color: "var(--color-primary)" });
	if (expenses > 0)
		data.push({ label: "Gastos", value: expenses, color: "var(--color-destructive)" });
	return data;
};
