import type React from "react";
import { useMemo } from "react";
import { merge } from "@/utils/ui/mergeStyles";

type MiniGaugeProps = {
	value: number;
	max: number;
	label: string;
	formatValue?: (value: number) => string;
	color?: string;
	className?: string;
};

const RADIUS = 56;
const STROKE_WIDTH = 12;
const CENTER_X = 80;
const CENTER_Y = 80;

const SEMICIRCLE_LENGTH = Math.PI * RADIUS;

function clampRatio(value: number, max: number): number {
	if (max <= 0 || !Number.isFinite(value) || !Number.isFinite(max)) return 0;
	return Math.min(Math.max(value / max, 0), 1);
}

export const MiniGauge = ({
	value,
	max,
	label,
	formatValue,
	color = "var(--color-primary)",
	className,
}: MiniGaugeProps): React.ReactElement => {
	const ratio = clampRatio(value, max);
	const dashOffset = useMemo(() => SEMICIRCLE_LENGTH * (1 - ratio), [ratio]);

	const displayValue =
		max > 0 && formatValue ? formatValue(value) : max > 0 ? value.toLocaleString() : "N/A";

	const arcTransform = `rotate(-90 ${CENTER_X} ${CENTER_Y})`;
	const ariaLabel = `${label}: ${displayValue} de ${max > 0 ? max.toLocaleString() : "N/A"}`;

	return (
		<div
			role="img"
			aria-label={ariaLabel}
			className={merge("flex flex-col items-center gap-1", className)}
		>
			<div className="relative">
				<svg
					width={160}
					height={92}
					viewBox="0 0 160 92"
					fill="none"
					aria-hidden="true"
				>
					{/* Track */}
					<path
						d={`M ${CENTER_X - RADIUS} ${CENTER_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER_X + RADIUS} ${CENTER_Y}`}
						stroke="var(--color-muted)"
						strokeWidth={STROKE_WIDTH}
						strokeLinecap="round"
						fill="none"
						opacity={0.6}
					/>
					{/* Value arc */}
					{max > 0 && (
						<path
							d={`M ${CENTER_X - RADIUS} ${CENTER_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER_X + RADIUS} ${CENTER_Y}`}
							stroke={color}
							strokeWidth={STROKE_WIDTH}
							strokeLinecap="round"
							fill="none"
							strokeDasharray={SEMICIRCLE_LENGTH}
							strokeDashoffset={dashOffset}
							transform={arcTransform}
							style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
						/>
					)}
				</svg>

				<div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
					<span className="text-lg font-bold tabular-nums text-foreground">{displayValue}</span>
				</div>
			</div>

			<span className="text-xs text-muted-foreground">{label}</span>
		</div>
	);
};
