import type React from "react";
import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from "react-hook-form";
import { InfoCard } from "@/components/design-system/patterns/data-display/info-card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { merge } from "@/utils/ui/mergeStyles";
import { Optional } from "../optional";

type FormTextareaProps<T extends FieldValues> = {
	label: string;
	name: FieldPath<T>;
	form: UseFormReturn<T>;
	placeholder?: string;
	required?: boolean;
	helperText?: string;
	className?: string;
	info?: string;
	optional?: boolean;
	rows?: number;
	action?: React.ReactElement;
};

export const FormTextarea = <T extends FieldValues>({
	label,
	name,
	form,
	placeholder,
	required = false,
	helperText,
	className,
	info,
	optional = false,
	rows = 4,
	action,
}: FormTextareaProps<T>): React.ReactElement => {
	const error = form.formState.errors[name];

	return (
		<div className={merge("flex flex-col gap-2", className)}>
			<div className="flex items-center justify-between px-1 pr-1">
				<Label htmlFor={name}>
					<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
						<div className="flex items-center gap-2 min-w-0">
							<span className="wrap-break-word">{label}</span>
							{required && <span className="text-primary">*</span>}
						</div>

						{optional && <Optional />}
					</div>
				</Label>

				{action}

				{info && (
					<InfoCard size="xs">
						<span className="max-w-45">{info}</span>
					</InfoCard>
				)}
			</div>

			<Controller
				control={form.control}
				name={name}
				render={({ field }) => (
					<Textarea
						id={name}
						placeholder={placeholder}
						className="bg-white"
						rows={rows}
						{...field}
					/>
				)}
			/>

			{error && <span className="text-sm text-red-500">{String(error.message)}</span>}

			{!error && helperText && <span className="text-xs text-muted-foreground">{helperText}</span>}
		</div>
	);
};