import { ArrowRight, Loader2 } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { Button } from "@/components/ui/button";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import {
	type OnboardingFormValues,
	STEP_PERSONAL_FIELDS,
} from "@/schemas/onboarding/onboardingSchema";
import { useOnboardingController } from "@/storage/onboarding/onboardingController";

export const StepPersonal = (): React.ReactElement => {
	const form = useFormContext<OnboardingFormValues>();
	const nextStep = useOnboardingController((state) => state.nextStep);
	const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

	const handleContinue = async (): Promise<void> => {
		const isValid = await form.trigger(STEP_PERSONAL_FIELDS);
		if (!isValid) return;

		// Skip PATCH if the user didn't change anything.
		const hasChanges = STEP_PERSONAL_FIELDS.some((field) => form.getFieldState(field).isDirty);

		if (!hasChanges) {
			nextStep();
			return;
		}

		const payload: UpdateProfilePayload = {
			firstName: form.getValues("firstName"),
			lastName: form.getValues("lastName"),
			secondLastName: form.getValues("secondLastName") ?? undefined,
			phone: form.getValues("phone") ?? null,
		};

		try {
			await updateProfile(payload);
			nextStep();
		} catch {
			// onError in the mutation already toasts the error.
		}
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-1">
				<h2 className="text-xl font-semibold text-foreground">Información personal</h2>
				<p className="text-sm text-muted-foreground">
					Tu nombre aparece en tus reportes y presupuestos.
				</p>
			</div>

			<FormField
				name="firstName"
				form={form}
				label="Nombre"
				placeholder="Tu nombre"
				required
			/>
			<FormField
				name="lastName"
				form={form}
				label="Apellido"
				placeholder="Tu apellido"
				required
			/>
			<FormField
				name="secondLastName"
				form={form}
				label="Segundo apellido"
				placeholder="Opcional"
				optional
			/>
			<FormField
				name="phone"
				form={form}
				type="tel"
				label="Teléfono"
				placeholder="55 1234 5678"
				optional
			/>

			<Button
				type="button"
				onClick={handleContinue}
				disabled={isPending}
				className="w-full"
			>
				{isPending ? (
					<>
						<Loader2 className="animate-spin" />
						Guardando...
					</>
				) : (
					<>
						Continuar
						<ArrowRight />
					</>
				)}
			</Button>
		</div>
	);
};
