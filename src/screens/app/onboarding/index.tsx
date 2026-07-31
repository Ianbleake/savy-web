import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Brand } from "@/components/design-system/primitives/brand";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/useLogout";
import { useQueryProfile } from "@/hooks/profile/useQueryProfile";
import { type OnboardingFormValues, onboardingSchema } from "@/schemas/onboarding/onboardingSchema";
import { useOnboardingController } from "@/storage/onboarding/onboardingController";
import { merge } from "@/utils/ui/mergeStyles";

import { BackgroundDecor } from "./components/background-decor";
import { OnboardingProgress } from "./components/onboarding-progress";
import { StepBanks } from "./components/step-banks";
import { StepFinancial } from "./components/step-financial";
import { StepPersonal } from "./components/step-personal";
import { StepPreferences } from "./components/step-preferences";

export const Onboarding = (): React.ReactElement => {
	const { profile } = useQueryProfile();
	const currentStep = useOnboardingController((state) => state.currentStep);
	const reset = useOnboardingController((state) => state.reset);
	const { mutate: logout, isPending: isLoggingOut } = useLogout();

	const defaultValues = useMemo<OnboardingFormValues>(
		() => ({
			firstName: profile?.firstName ?? "",
			lastName: profile?.lastName ?? "",
			secondLastName: profile?.secondLastName ?? "",
			phone: profile?.phone ?? "",
			currency: profile?.currency ?? "MXN",
			locale: profile?.locale ?? "es-MX",
			timezone: profile?.timezone ?? "America/Mexico_City",
		}),
		[profile],
	);

	const form = useForm<OnboardingFormValues>({
		resolver: zodResolver(onboardingSchema),
		mode: "onChange",
		defaultValues,
	});

	// useForm only reads defaultValues on mount. When the profile arrives
	// asynchronously (undefined -> Profile), reinitialize the form values so
	// step 1 "Continuar" does not overwrite the user's real data with empty
	// strings. Tracked by profile id so it only fires once per profile, not on
	// every profile update.
	const initializedProfileId = useRef<string | null>(null);
	useEffect(() => {
		if (!profile || initializedProfileId.current === profile.id) return;
		initializedProfileId.current = profile.id;
		form.reset(defaultValues);
	}, [profile, defaultValues, form]);

	// Defensive: if a user with onboardingCompleted re-enters /app/onboarding
	// via URL, the guard redirects them home — but also reset the wizard step
	// so a future genuine entry starts at step 1.
	useEffect(() => {
		if (profile?.onboardingCompleted) {
			reset();
		}
	}, [profile?.onboardingCompleted, reset]);

	// Steps 2 (banks/accounts) and 3 (income sources) use two cards side by side; a wider container.
	return (
		<div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-4 py-8">
			<BackgroundDecor />

			<FormProvider {...form}>
				<ScaleFadeIn
					key="onboarding-shell"
					className={merge(
						"relative z-10 flex w-full flex-col gap-6",
						currentStep === 2 || currentStep === 3 ? "max-w-3xl" : "max-w-md",
					)}
				>
					<Brand
						size="md"
						className="self-center"
					/>

					<div className="relative">
						{/* Distributed glows behind the card(s) */}
						<div aria-hidden="true">
							<div className="pointer-events-none absolute -left-20 -top-12 size-[300px] rounded-full bg-primary/15 blur-[80px]" />
							<div className="pointer-events-none absolute -bottom-16 -right-16 size-[280px] rounded-full bg-primary/12 blur-[70px]" />
							<div className="pointer-events-none absolute -bottom-8 left-[20%] size-[200px] rounded-full bg-primary/10 blur-[60px]" />
						</div>

						{currentStep === 2 ? (
							<StepBanks />
						) : currentStep === 3 ? (
							<StepFinancial />
						) : (
							<GlassCard
								variant="light"
								className="relative p-6 sm:p-8"
							>
								<OnboardingProgress />

								<StaggerContainer
									key={`step-${currentStep}`}
									className="mt-6 flex flex-col gap-5"
								>
									{currentStep === 1 && <StepPersonal />}
									{currentStep === 4 && <StepPreferences />}
								</StaggerContainer>
							</GlassCard>
						)}
					</div>

					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="self-center text-muted-foreground hover:text-foreground"
						onClick={() => logout()}
						disabled={isLoggingOut}
					>
						<LogOut className="size-4" />
						Cerrar sesión
					</Button>
				</ScaleFadeIn>
			</FormProvider>
		</div>
	);
};
