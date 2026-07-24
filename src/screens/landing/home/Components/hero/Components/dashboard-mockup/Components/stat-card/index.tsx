import type React from "react";

import { merge } from "@/utils/ui/mergeStyles";

type Props = {
	label: string;
	value: string;
	icon?: React.ReactNode;
	variant: "positive" | "negative" | "neutral";
};

export const StatCard = ({ label, value, icon, variant }: Props): React.ReactElement => {
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
