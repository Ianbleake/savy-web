import { PieChart } from "lucide-react";
import type React from "react";
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";

type Props = {
	categories: {
		categoryId: string;
		categoryName: string;
		amount: number;
		percentage: number;
	}[];
	totalExpenses: number;
	currency: string;
	locale: string;
};

export const TopCategories = ({
	categories,
	totalExpenses,
	currency,
	locale,
}: Props): React.ReactElement => {
	return (
		<GlassCard className="flex flex-col gap-4 p-6">
			<div className="flex items-center gap-2">
				<PieChart className="size-4 text-primary" />
				<h3 className="text-sm font-semibold text-foreground">Top categorías de gasto</h3>
			</div>

			{categories.length === 0 ? (
				<Empty
					icon={PieChart}
					title="Sin gastos"
					description="No hay gastos registrados en este periodo."
				/>
			) : (
				<div className="flex flex-col gap-3">
					{categories.map((category) => (
						<ProgressBar
							key={category.categoryId}
							label={category.categoryName}
							current={category.amount}
							total={totalExpenses}
							currency={currency}
							locale={locale}
						/>
					))}
				</div>
			)}
		</GlassCard>
	);
};
