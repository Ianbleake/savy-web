import { Wallet } from "lucide-react";
import type React from "react";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type NetWorthCardProps = {
	netWorth: import("@/services/dashboard/dashboard").DashboardNetWorth;
	currency: string;
	locale: string;
	className?: string;
};

export const NetWorthCard = ({
	netWorth,
	currency,
	locale,
	className,
}: NetWorthCardProps): React.ReactElement => {
	const formattedTotal = formatCurrency(netWorth.total, netWorth.currency, locale);
	const delta = netWorth.monthDelta;

	return (
		<SummaryCard
			title="Patrimonio neto"
			icon={Wallet}
			className={className}
		>
			<KpiCard
				label="Total"
				value={formattedTotal}
				delta={delta}
				currency={currency}
			/>

			<div className="mt-4 flex flex-col gap-2 text-sm">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Activos</span>
					<span className="font-medium tabular-nums text-foreground">
						{formatCurrency(netWorth.assets, netWorth.currency, locale)}
					</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Pasivos</span>
					<span className="font-medium tabular-nums text-destructive">
						{formatCurrency(netWorth.liabilities, netWorth.currency, locale)}
					</span>
				</div>
			</div>
		</SummaryCard>
	);
};
