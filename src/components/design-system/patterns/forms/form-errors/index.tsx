import { AlertCircle } from "lucide-react";
import type React from "react";
import { Fragment } from "react";
import {
	type FieldError,
	type FieldErrors,
	type FieldValues,
	useFormContext,
} from "react-hook-form";

type FormError = {
	key: string;
	title: string;
	message: string;
};

const getSectionTitle = (fieldName: string, sectionTitles: Record<string, string>): string => {
	const topLevelKey = fieldName.split(".")[0];
	return sectionTitles[topLevelKey] ?? "Form error";
};

const collectSchemaErrors = <T extends FieldValues>(
	errors: FieldErrors<T>,
	sectionTitles: Record<string, string>,
	prefix = "",
): FormError[] => {
	const result: FormError[] = [];

	for (const [key, error] of Object.entries(errors)) {
		if (!error) continue;

		const fieldPath = prefix ? `${prefix}.${key}` : key;

		if ((error as FieldError).message) {
			const message = (error as FieldError).message;
			if (message) {
				result.push({
					key: `schema-${fieldPath}`,
					title: getSectionTitle(fieldPath, sectionTitles),
					message,
				});
			}
			continue;
		}

		if (typeof error === "object") {
			result.push(...collectSchemaErrors(error as FieldErrors<T>, sectionTitles, fieldPath));
		}
	}

	return result;
};

export const FormErrors = <T extends FieldValues>({
	sectionTitles,
	crossErrors = [],
}: FormErrorsProps<T>): React.ReactElement => {
	const form = useFormContext<T>();

	const schemaErrors = form.formState.errors;
	const schemaFormErrors = collectSchemaErrors(schemaErrors, sectionTitles);

	const allErrors = [...crossErrors, ...schemaFormErrors];

	if (allErrors.length === 0) return <Fragment />;

	return (
		<div className="space-y-2">
			{allErrors.map((error) => (
				<div
					key={error.key}
					className="flex items-start gap-2 rounded-md border border-red-200/50 bg-red-50 px-3 py-2"
				>
					<AlertCircle className="size-5 shrink-0 text-red-500" />
					<div className="flex flex-col">
						<span className="text-sm font-medium text-red-500">{error.title}</span>
						<span className="text-xs text-gray-500">{error.message}</span>
					</div>
				</div>
			))}
		</div>
	);
};