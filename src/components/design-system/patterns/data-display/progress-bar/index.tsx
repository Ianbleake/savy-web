import type React from "react";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";

type ProgressBarVariant = "default" | "warning" | "danger";

type ProgressBarProps = {
	label: string;
	current: number;
	total: number;
	currency?: string;
	locale?: string;
	showValues?: boolean;
	variant?: ProgressBarVariant;
	className?: string;
};

const VARIANT_TRACK: Record<ProgressBarVariant, string> = {
	default: "bg-primary/20",
	warning: "bg-amber-500/20",
	danger: "bg-destructive/20",
};

const VARIANT_TEXT: Record<ProgressBarVariant, string> = {
	default: "text-muted-foreground",
	warning: "text-amber-600",
	danger: "text-destructive",
};

function autoVariant(percentage: number): ProgressBarVariant {
	if (percentage > 90) return "danger";
	if (percentage > 75) return "warning";
	return "default";
}

export const ProgressBar = ({
	label,
	current,
	total,
	currency = "MXN",
	locale = "es-MX",
	showValues = true,
	variant,
	className,
}: ProgressBarProps): React.ReactElement => {
	const ratio = total > 0 ? current / total : 0;
	const clampedRatio = Math.min(Math.max(ratio, 0), 1);
	const percentage = Math.round(clampedRatio * 100);
	const resolvedVariant = variant ?? autoVariant(percentage);

	return (
		<div className={merge("flex flex-col gap-1.5 ", className)}>
			<div className="flex items-baseline justify-between gap-2">
				<span className="truncate text-sm text-foreground">{label}</span>

				{showValues && (
					<span className="shrink-0 text-xs tabular-nums text-muted-foreground">
						{formatCurrency(current, currency, locale)} / {formatCurrency(total, currency, locale)}
					</span>
				)}
			</div>

			<Progress
				value={percentage}
				className={merge(
					"h-2",
					VARIANT_TRACK[resolvedVariant],
					// Override the indicator color from the primitive default (bg-primary)
					"[&_[data-slot=progress-indicator]]:bg-primary",
					resolvedVariant === "warning" && "[&_[data-slot=progress-indicator]]:bg-amber-500",
					resolvedVariant === "danger" && "[&_[data-slot=progress-indicator]]:bg-destructive",
				)}
			/>

			<div className="flex justify-end">
				<span className={merge("text-xs font-medium tabular-nums", VARIANT_TEXT[resolvedVariant])}>
					{percentage}%
				</span>
			</div>
		</div>
	);
};
