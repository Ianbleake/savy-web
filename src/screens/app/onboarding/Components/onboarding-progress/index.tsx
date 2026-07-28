import { Check } from "lucide-react";
import type React from "react";
import { ONBOARDING_STEPS } from "@/content/onboarding/onboardingSteps";
import { useOnboardingController } from "@/storage/onboarding/onboardingController";
import { merge } from "@/utils/ui/mergeStyles";

export const OnboardingProgress = (): React.ReactElement => {
	const currentStep = useOnboardingController((state) => state.currentStep);
	const totalSteps = ONBOARDING_STEPS.length;

	const rawProgress = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;
	const progress = Math.min(100, Math.max(0, rawProgress));

	const current = ONBOARDING_STEPS.find((step) => step.step === currentStep);

	return (
		<div className="flex flex-col gap-4">
			{/* Steps with connecting line */}
			<div className="relative flex items-center justify-between">
				{/* Connecting line behind circles */}
				<div className="absolute inset-x-0 top-1/2 mx-6 h-0.5 -translate-y-1/2 rounded-full bg-border/40" />
				<div
					className="absolute left-6 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-primary/60 transition-all duration-500"
					style={{ width: `calc(${progress}% - 48px)` }}
				/>

				{ONBOARDING_STEPS.map((step) => {
					const isActive = step.step === currentStep;
					const isCompleted = step.step < currentStep;

					return (
						<div
							key={step.step}
							className="relative z-10 flex flex-col items-center"
						>
							<div
								className={merge(
									"flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
									isCompleted
										? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
										: isActive
											? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/15"
											: "bg-white/60 text-muted-foreground shadow-sm shadow-black/5 border border-border/30",
								)}
							>
								{isCompleted ? <Check className="size-4" /> : step.step}
							</div>
						</div>
					);
				})}
			</div>

			{current && (
				<p className="text-center text-xs text-muted-foreground">
					Paso {current.step} de {totalSteps} · {current.label} — {current.description}
				</p>
			)}
		</div>
	);
};
