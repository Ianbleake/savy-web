import type React from "react";

export const Dashboard = (): React.ReactElement => {
	return (
		<div className="flex flex-1 items-center justify-center p-8">
			<div className="flex flex-col items-center gap-3">
				<h1 className="text-3xl font-bold text-primary">Dashboard</h1>
				<p className="text-muted-foreground">
					Tu resumen financiero aparecerá aquí.
				</p>
			</div>
		</div>
	);
};