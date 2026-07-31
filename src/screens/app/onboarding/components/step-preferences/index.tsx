import { ArrowLeft, Check, Loader2 } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { Button } from "@/components/ui/button";
import {
	CURRENCY_OPTIONS,
	LOCALE_OPTIONS,
	TIMEZONE_OPTIONS,
} from "@/content/onboarding/preferenceOptions";
import { useCompleteOnboarding } from "@/hooks/onboarding/useCompleteOnboarding";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import {
	type OnboardingFormValues,
	STEP_PREFERENCES_FIELDS,
} from "@/schemas/onboarding/onboardingSchema";
import { useOnboardingController } from "@/storage/onboarding/onboardingController";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

export const StepPreferences = (): React.ReactElement => {
	const form = useFormContext<OnboardingFormValues>();
	const prevStep = useOnboardingController((state) => state.prevStep);
	const createdIncomeSources = useOnboardingController((state) => state.createdIncomeSources);
	const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile();
	const { mutateAsync: completeOnboarding, isPending: isCompleting } = useCompleteOnboarding();

	const isPending = isUpdating || isCompleting;

	const handleComplete = async (): Promise<void> => {
		const isValid = await form.trigger(STEP_PREFERENCES_FIELDS);
		if (!isValid) return;

		const payload: UpdateProfilePayload = {
			currency: form.getValues("currency"),
			locale: form.getValues("locale"),
			timezone: form.getValues("timezone"),
		};

		try {
			await updateProfile(payload);
			await completeOnboarding();
		} catch {
			// onError in the mutations already toasts the error.
		}
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-1">
				<h2 className="text-xl font-semibold text-foreground">Preferencias</h2>
				<p className="text-sm text-muted-foreground">
					Configura cómo Savy formatea tus montos, fechas y reportes.
				</p>
			</div>

			<FormSelect
				name="currency"
				form={form}
				label="Moneda"
				options={CURRENCY_OPTIONS}
				required
			/>
			<FormSelect
				name="locale"
				form={form}
				label="Idioma"
				options={LOCALE_OPTIONS}
				required
			/>
			<FormSelect
				name="timezone"
				form={form}
				label="Zona horaria"
				options={TIMEZONE_OPTIONS}
				required
			/>

			{createdIncomeSources.length > 0 && (
				<div className="flex flex-col gap-2 rounded-md border border-border/60 bg-muted/40 p-3">
					<p className="text-xs font-medium text-muted-foreground">Fuentes de ingreso</p>
					<ul className="flex flex-col gap-1">
						{createdIncomeSources.map((source) => (
							<li
								key={source.id}
								className="flex items-center justify-between gap-2 text-sm text-foreground"
							>
								<span className="truncate">{source.name}</span>
								<span className="shrink-0 text-muted-foreground">
									{formatCurrency(source.amount)}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}

			<div className="flex flex-col gap-2 rounded-md border border-border/60 bg-muted/40 p-3">
				<p className="text-xs font-medium text-muted-foreground">Resumen</p>
				<p className="text-sm text-foreground">
					Al completar, tu cuenta estará lista para registrar ingresos, gastos y presupuestos.
				</p>
			</div>

			<div className="flex flex-row gap-3">
				<Button
					type="button"
					variant="outline"
					onClick={prevStep}
					disabled={isPending}
				>
					<ArrowLeft />
					Atrás
				</Button>
				<Button
					type="button"
					onClick={handleComplete}
					disabled={isPending}
					className="flex-1"
				>
					{isCompleting ? (
						<>
							<Loader2 className="animate-spin" />
							Completando...
						</>
					) : (
						<>
							<Check />
							Completar onboarding
						</>
					)}
				</Button>
			</div>
		</div>
	);
};
