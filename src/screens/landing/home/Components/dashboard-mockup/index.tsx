import { ArrowDown, ArrowUp } from "lucide-react";
import type React from "react";

import { merge } from "@/utils/ui/mergeStyles";

export const DashboardMockup = (): React.ReactElement => {
	return (
		<div className="relative mx-auto w-full max-w-md lg:max-w-none">
			{/* Background glow */}
			<div className="absolute inset-0 -m-4 rounded-3xl bg-primary/5" />

			<div className="relative flex flex-col gap-3 p-4">
				{/* Main balance card */}
				<div className="rounded-2xl border border-border/60 bg-card p-6 shadow-lg">
					<p className="text-sm text-muted-foreground">Balance total</p>
					<p className="mt-1 text-4xl font-bold tracking-tight text-foreground">
						$47,250
						<span className="text-2xl text-muted-foreground/70">.00</span>
					</p>
					<div className="mt-3 flex items-center gap-1.5 text-sm text-primary">
						<ArrowUp className="size-3.5" />
						<span className="font-medium">+12.4%</span>
						<span className="text-muted-foreground">vs. mes anterior</span>
					</div>
				</div>

				{/* Stat cards row */}
				<div className="grid grid-cols-3 gap-3">
					<StatCard
						label="Ingresos"
						value="$32,000"
						icon={<ArrowUp className="size-3.5" />}
						variant="positive"
					/>
					<StatCard
						label="Gastos"
						value="$18,400"
						icon={<ArrowDown className="size-3.5" />}
						variant="negative"
					/>
					<StatCard
						label="Ahorro"
						value="74%"
						variant="neutral"
					/>
				</div>
			</div>
		</div>
	);
};

type StatCardProps = {
	label: string;
	value: string;
	icon?: React.ReactNode;
	variant: "positive" | "negative" | "neutral";
};

const StatCard = ({ label, value, icon, variant }: StatCardProps): React.ReactElement => {
	return (
		<div className="rounded-xl border border-border/60 bg-card p-3 shadow-sm">
			<p className="text-xs text-muted-foreground">{label}</p>
			<div className="mt-1 flex items-center gap-1">
				{icon && (
					<span
						className={merge(
							variant === "positive" && "text-primary",
							variant === "negative" && "text-destructive",
						)}
					>
						{icon}
					</span>
				)}
				<p
					className={merge(
						"text-lg font-semibold",
						variant === "positive" && "text-foreground",
						variant === "negative" && "text-foreground",
						variant === "neutral" && "text-primary",
					)}
				>
					{value}
				</p>
			</div>
			{variant === "neutral" && (
				<div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
					<div
						className="h-full rounded-full bg-primary"
						style={{ width: "74%" }}
					/>
				</div>
			)}
		</div>
	);
};
