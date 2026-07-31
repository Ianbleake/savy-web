import { zodResolver } from "@hookform/resolvers/zod";
import { Ban, Check, Loader2 } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { Button } from "@/components/ui/button";
import { ACCOUNT_TYPE_OPTIONS } from "@/content/banks/bankContent";
import { type AccountFormValues, accountSchema } from "@/schemas/onboarding/accountSchema";

type AccountFormProps = {
	onSave: (values: AccountFormValues) => void | Promise<void>;
	onCancel: () => void;
	bankOptions: Option[];
};

const DEFAULT_VALUES: AccountFormValues = {
	name: "",
	type: "DEBIT",
	bankId: "",
	currency: "MXN",
	balance: 0,
};

export const AccountForm = ({
	onSave,
	onCancel,
	bankOptions,
}: AccountFormProps): React.ReactElement => {
	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountSchema),
		mode: "onChange",
		defaultValues: DEFAULT_VALUES,
	});

	const accountType = form.watch("type");
	const isCash = accountType === "CASH";
	const isCredit = accountType === "CREDIT";
	const isLoan = accountType === "LOAN";

	const handleSave = form.handleSubmit(async (values) => {
		const payload: AccountFormValues = isCash ? { ...values, bankId: null } : values;
		await onSave(payload);
		form.reset(DEFAULT_VALUES);
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<h3 className="text-base font-semibold text-foreground">Nueva cuenta</h3>
				<p className="text-xs text-muted-foreground">
					Registra tu cuenta para recibir ingresos y registrar gastos.
				</p>
			</div>

			<FormField
				name="name"
				form={form}
				label="Nombre de la cuenta"
				placeholder="Ej. Cuenta principal"
				required
			/>

			<FormSelect
				name="type"
				form={form}
				label="Tipo de cuenta"
				options={ACCOUNT_TYPE_OPTIONS}
				required
			/>

			{!isCash && (
				<FormSelect
					name="bankId"
					form={form}
					label="Banco"
					options={bankOptions}
					placeholder="Selecciona un banco..."
					required
				/>
			)}

			<FormField
				name="currency"
				form={form}
				label="Moneda"
				placeholder="MXN"
				required
			/>

			<FormField
				name="balance"
				form={form}
				type="currency"
				label={isLoan ? "Saldo restante" : "Saldo inicial"}
				placeholder="0"
				helperText={
					isLoan
						? "Monto restante del préstamo."
						: isCredit
							? "Deuda actual de la tarjeta."
							: "Saldo actual de la cuenta."
				}
			/>

			{/* Credit card fields */}
			{isCredit && (
				<>
					<div className="flex flex-col gap-1">
						<p className="text-xs font-medium text-muted-foreground">Datos de la tarjeta</p>
					</div>
					<FormField
						name="creditLimit"
						form={form}
						type="currency"
						label="Límite de crédito"
						placeholder="0"
						required
						helperText="Monto máximo disponible en la tarjeta."
					/>
					<div className="flex flex-row gap-3">
						<FormField
							name="cutDay"
							form={form}
							type="number"
							label="Día de corte"
							placeholder="15"
							min={1}
							max={31}
							required
						/>
						<FormField
							name="paymentDay"
							form={form}
							type="number"
							label="Día de pago"
							placeholder="25"
							min={1}
							max={31}
							required
						/>
					</div>
					<FormField
						name="interestRate"
						form={form}
						type="percentage"
						label="Tasa de interés anual"
						placeholder="36"
						required
						helperText="Tasa de interés anual (ej. 36%)."
					/>
				</>
			)}

			{/* Loan fields */}
			{isLoan && (
				<>
					<div className="flex flex-col gap-1">
						<p className="text-xs font-medium text-muted-foreground">Datos del préstamo</p>
					</div>
					<FormField
						name="principal"
						form={form}
						type="currency"
						label="Monto del préstamo"
						placeholder="0"
						required
						helperText="Monto original del préstamo."
					/>
					<div className="flex flex-row gap-3">
						<FormField
							name="termMonths"
							form={form}
							type="number"
							label="Plazo (meses)"
							placeholder="36"
							min={1}
							required
						/>
						<FormField
							name="monthlyPayment"
							form={form}
							type="currency"
							label="Pago mensual"
							placeholder="0"
							required
						/>
					</div>
					<FormField
						name="interestRate"
						form={form}
						type="percentage"
						label="Tasa de interés anual"
						placeholder="15"
						required
						helperText="Tasa de interés anual (ej. 15%)."
					/>
				</>
			)}

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
							Guardar cuenta
						</>
					)}
				</Button>
			</div>
		</div>
	);
};
