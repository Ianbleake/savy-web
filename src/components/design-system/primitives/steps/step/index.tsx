import type React from "react";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { merge } from "@/utils/ui/mergeStyles";

type StepItemProps = {
	step: Step;
	isCurrent: boolean;
	isCompleted: boolean;
	index: number;
	totalSteps: number;
};

export const StepItem = ({
	step,
	isCurrent,
	isCompleted,
	index,
	totalSteps,
}: StepItemProps): React.ReactElement => {
	return (
		<Fragment>
			<div
				className={merge("flex flex-row items-center gap-2 opacity-60", isCurrent && "opacity-100")}
			>
				<div
					className={merge(
						"p-1 border border-transparent rounded-full flex items-center justify-center",
						isCurrent && "border-primary",
					)}
				>
					<div
						className={merge(
							"h-10 w-10 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full",
							isCurrent
								? "bg-primary text-white opacity-100"
								: isCompleted
									? "bg-primary text-white"
									: "",
						)}
					>
						{step.step}
					</div>
				</div>

				{step.label && <p className="text-sm text-gray-900">{step.label}</p>}
			</div>

			{index < totalSteps - 1 && <Separator className="flex-1 mx-4 bg-gray-300" />}
		</Fragment>
	);
};