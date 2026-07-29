import type React from "react";
import { useMemo } from "react";
import { merge } from "@/utils/ui/mergeStyles";

type WaffleChartProps = {
	percentage: number;
	label?: string;
	color?: string;
	className?: string;
};

const GRID_SIZE = 10;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

function clampPercentage(value: number): number {
	if (!Number.isFinite(value)) return 0;
	return Math.min(Math.max(value, 0), 100);
}

export const WaffleChart = ({
	percentage,
	label,
	color = "var(--color-primary)",
	className,
}: WaffleChartProps): React.ReactElement => {
	const filled = useMemo(() => Math.round(clampPercentage(percentage)), [percentage]);
	const clamped = clampPercentage(percentage);

	const cells = useMemo(
		() =>
			Array.from({ length: TOTAL_CELLS }, (_, index) => ({
				id: index,
				isFilled: index < filled,
			})),
		[filled],
	);

	const ariaLabel = `Progreso: ${clamped.toFixed(0)}%${label ? `, ${label}` : ""}`;

	return (
		<div
			role="img"
			aria-label={ariaLabel}
			className={merge("flex flex-col items-center gap-2", className)}
		>
			<div
				className="grid w-full max-w-[180px]"
				style={{
					gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
					gap: "2px",
				}}
			>
				{cells.map((cell) => (
					<span
						key={cell.id}
						className="aspect-square rounded-sm"
						style={{
							backgroundColor: cell.isFilled ? color : "var(--color-muted)",
							opacity: cell.isFilled ? 1 : 0.5,
						}}
					/>
				))}
			</div>

			{label && (
				<div className="flex items-baseline gap-1.5 text-sm">
					<span className="font-medium text-foreground">{label}</span>
					<span className="tabular-nums text-muted-foreground">{clamped.toFixed(0)}%</span>
				</div>
			)}

			{!label && <span className="sr-only">{ariaLabel}</span>}
		</div>
	);
};
