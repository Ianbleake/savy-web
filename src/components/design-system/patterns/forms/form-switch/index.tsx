import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from "react-hook-form";

import { InfoCard } from "@/components/design-system/patterns/data-display/info-card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { merge } from "@/utils/ui/mergeStyles";
import { Optional } from "../optional";

type FormSwitchProps<T extends FieldValues> = {
	label?: string;
	name: FieldPath<T>;
	form: UseFormReturn<T>;
	helperText?: string;
	className?: string;
	info?: string;
	optional?: boolean;
	required?: boolean;
	disabled?: boolean;
	activeText?: string;
	inactiveText?: string;
};

export const FormSwitch = <T extends FieldValues>({
	label,
	name,
	form,
	helperText,
	className,
	info,
	optional = false,
	required = false,
	disabled = false,
	activeText = "Active",
	inactiveText = "Inactive",
}: FormSwitchProps<T>): React.ReactElement => {
	const error = form.formState.errors[name];

	return (
		<div className={merge("flex flex-col gap-3", className)}>
			{label && (
				<Label className="flex items-center justify-between px-1 pr-1">
					<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
						<div className="flex items-center gap-2 min-w-0">
							<span className="wrap-break-word text-left">{label}</span>
							{required && <span className="text-primary">*</span>}
						</div>
						{optional && <Optional />}
					</div>

					{info && (
						<InfoCard size="xs">
							<span className="max-w-45">{info}</span>
						</InfoCard>
					)}
				</Label>
			)}

			<Controller
				control={form.control}
				name={name}
				render={({ field }) => {
					const isChecked = !!field.value;

					return (
						<div className="flex items-center justify-between px-1">
							<div className="flex items-center gap-3">
								<Switch
									id={name}
									checked={isChecked}
									onCheckedChange={(checked) => field.onChange(checked)}
									onBlur={field.onBlur}
									disabled={disabled}
								/>

								<span className="text-sm text-muted-foreground">
									{isChecked ? activeText : inactiveText}
								</span>
							</div>
						</div>
					);
				}}
			/>

			{error && <span className="text-sm text-red-500">{String(error.message)}</span>}

			{!error && helperText && <span className="text-xs text-muted-foreground">{helperText}</span>}
		</div>
	);
};