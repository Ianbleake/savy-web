import { zodResolver } from "@hookform/resolvers/zod";
import { Ban, Check, Loader2 } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { Button } from "@/components/ui/button";
import { type BankFormValues, bankSchema } from "@/schemas/onboarding/bankSchema";

type BankFormProps = {
	onSave: (values: BankFormValues) => void | Promise<void>;
	onCancel: () => void;
};

const DEFAULT_VALUES: BankFormValues = {
	name: "",
};

export const BankForm = ({ onSave, onCancel }: BankFormProps): React.ReactElement => {
	const form = useForm<BankFormValues>({
		resolver: zodResolver(bankSchema),
		mode: "onChange",
		defaultValues: DEFAULT_VALUES,
	});

	const handleSave = form.handleSubmit(async (values) => {
		await onSave(values);
		form.reset(DEFAULT_VALUES);
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<h3 className="text-base font-semibold text-foreground">Nuevo banco</h3>
				<p className="text-xs text-muted-foreground">
					El banco agrupa tus cuentas de débito, crédito y préstamos.
				</p>
			</div>

			<FormField
				name="name"
				form={form}
				label="Nombre del banco"
				placeholder="Ej. BBVA, Santander..."
				required
			/>

			<div className="flex flex-row gap-2">
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={form.formState.isSubmitting}
				>
					<Ban />
					Cancelar
				</Button>
				<Button
					type="button"
					onClick={handleSave}
					disabled={form.formState.isSubmitting}
					className="flex-1"
				>
					{form.formState.isSubmitting ? (
						<>
							<Loader2 className="animate-spin" />
							Guardando...
						</>
					) : (
						<>
							<Check className="size-4" />
							Guardar banco
						</>
					)}
				</Button>
			</div>
		</div>
	);
};
