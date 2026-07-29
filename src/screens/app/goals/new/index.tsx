import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";

export const GoalNew = (): React.ReactElement => {
	return (
		<div className="flex flex-1 items-center justify-center p-8">
			<GlassCard
				variant="light"
				className="p-8"
			>
				<div className="flex flex-col items-center gap-3 text-center">
					<h1 className="text-2xl font-bold text-primary">Nueva meta de ahorro</h1>
					<p className="text-muted-foreground">
						El formulario de creación de metas se implementará próximamente.
					</p>
				</div>
			</GlassCard>
		</div>
	);
};
