import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";
import { StepItem } from "./step";

type StepsProps = {
	steps: Step[];
	currentStep: number;
	variant?: "line" | "bar";
	label?: string;
	className?: string;
};

const Bar = ({
	steps,
	currentStep,
	label,
	className,
}: Omit<StepsProps, "variant">): React.ReactElement => {
	const totalSteps = steps.length;
	const rawProgress = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;
	const progress = Math.min(100, Math.max(0, rawProgress));

	return (
		<div className={merge("w-full hidden sm:flex flex-col items-center", className)}>
			<div className="relative flex items-center justify-between w-full max-w-xs">
				<div className="absolute inset-0 flex items-center px-10">
					<div className="w-full h-1 bg-gray-300/50 rounded-full" />
				</div>

				<div
					className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all"
					style={{ width: `${progress}%` }}
				/>

				{steps.map((step, index) => {
					const stepNumber = index + 1;
					const isActive = stepNumber === currentStep;
					const isCompleted = stepNumber < currentStep;

					return (
						<div
							key={`${step.step}`}
							className="relative z-10 flex items-center justify-center"
						>
							<div
								className={merge(
									"w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition",
									isActive && "bg-primary text-white",
									isCompleted && "bg-primary text-white",
									!isActive && !isCompleted && "bg-gray-200 text-gray-500",
								)}
							>
								{stepNumber}
							</div>
						</div>
					);
				})}
			</div>

			{label && <p className="mt-3 text-xs text-gray-500/80 font-light text-center">{label}</p>}
		</div>
	);
};

export const Steps = ({
	steps,
	currentStep,
	variant = "line",
	label,
	className,
}: StepsProps): React.ReactElement => {
	if (variant === "bar") {
		return (
			<Bar
				steps={steps}
				currentStep={currentStep}
				label={label}
				className={className}
			/>
		);
	}

	return (
		<div
			className={merge(
				"w-full hidden sm:flex items-center justify-center p-4 px-20 select-none",
				className,
			)}
		>
			{steps.map((step, index) => (
				<StepItem
					key={step.label}
					step={step}
					isCurrent={step.step === currentStep}
					isCompleted={step.step < currentStep}
					index={index}
					totalSteps={steps.length}
				/>
			))}
		</div>
	);
};