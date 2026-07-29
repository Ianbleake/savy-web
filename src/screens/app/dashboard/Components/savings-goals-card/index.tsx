import { Target } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { WaffleChart } from "@/components/design-system/patterns/data-display/waffle-chart";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type SavingsGoalsCardProps = {
	goals: import("@/services/dashboard/dashboard").DashboardSavingsGoal[];
	currency: string;
	locale: string;
	maxItems?: number;
	className?: string;
};

export const SavingsGoalsCard = ({
	goals,
	currency,
	locale,
	maxItems = 4,
	className,
}: SavingsGoalsCardProps): React.ReactElement => {
	const navigate = useNavigate();
	const visible = goals.slice(0, maxItems);
	const isEmpty = visible.length === 0;

	return (
		<SummaryCard
			title="Metas de ahorro"
			icon={Target}
			actionLabel="Ver todo"
			onAction={() => navigate(ROUTES.APP.GOALS)}
			className={className}
		>
			{isEmpty ? (
				<Empty
					title="Sin metas"
					description="Define una meta para empezar a ahorrar."
					action={{
						label: "Crear meta",
						onClick: () => navigate(`${ROUTES.APP.GOALS}?new=1`),
					}}
				/>
			) : (
				<div className="grid grid-cols-2 gap-4">
					{visible.map((goal) => (
						<button
							key={goal.id}
							type="button"
							onClick={() => navigate(ROUTES.APP.GOALS)}
							className="flex flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-accent/40"
						>
							<WaffleChart
								percentage={goal.percentage}
								color={goal.isCompleted ? "var(--color-primary)" : undefined}
							/>
							<span className="max-w-full truncate text-sm font-medium text-foreground">
								{goal.name}
							</span>
							<span className="text-xs tabular-nums text-muted-foreground">
								{formatCurrency(goal.currentAmount, currency, locale)} /{" "}
								{formatCurrency(goal.targetAmount, currency, locale)}
							</span>
						</button>
					))}
				</div>
			)}
		</SummaryCard>
	);
};
