import { ArrowDown, ArrowUp } from "lucide-react";
import type React from "react";

import { StatCard } from "./Components/stat-card";

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
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
						className="col-span-2 sm:col-span-1"
					/>
				</div>
			</div>
		</div>
	);
};
