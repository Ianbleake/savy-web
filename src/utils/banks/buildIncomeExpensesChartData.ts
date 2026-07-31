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
