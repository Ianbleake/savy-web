import { Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from "react-hook-form";

import { InfoCard } from "@/components/design-system/patterns/data-display/info-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";
import { Optional } from "../optional";
import {
	cleanNumberInput,
	formatNumberString,
	getNewCursorPosition,
	parseDisplayToNumber,
} from "./utils/numberFormatters";

const parseToCents = (value: string): number => {
	const numeric = value.replace(/[^\d]/g, "");
	return Number(numeric || 0);
};

type FormFieldProps<T extends FieldValues> = {
	label: string;
	name: FieldPath<T>;
	form: UseFormReturn<T>;
	type?: "text" | "email" | "password" | "tel" | "number" | "currency" | "percentage";
	placeholder?: string;
	required?: boolean;
	helperText?: string;
	className?: string;
	info?: string;
	optional?: boolean;
	/** Only for type="number": minimum allowed value (visual + RHF validation) */
	min?: number;
	/** Only for type="number": maximum allowed value (visual + RHF validation) */
	max?: number;
	/** Only for type="number": allows decimal values. Default: false */
	allowDecimals?: boolean;
	/** Only for type="number": allows negative values. Default: false */
	allowNegative?: boolean;
	disabled?: boolean;
};

export const FormField = <T extends FieldValues>({
	label,
	name,
	form,
	type = "text",
	placeholder,
	required = false,
	helperText,
	className,
	info,
	optional = false,
	min,
	max,
	allowDecimals = false,
	allowNegative = false,
	disabled = false,
}: FormFieldProps<T>): React.ReactElement => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const rawRef = useRef<string>("");

	const isPassword = type === "password";
	const isCurrency = type === "currency";
	const isPercentage = type === "percentage";
	const isNumber = type === "number";
	const isPhone = type === "tel";

	const inputType = isPassword
		? showPassword
			? "text"
			: "password"
		: isCurrency || isNumber || isPercentage || isPhone
			? "text"
			: type;

	const error = form.formState.errors[name];

	const getNumberRangeError = (value: number | null): string | null => {
		if (value === null) return null;
		if (min !== undefined && value < min) return `Minimum value is ${min}`;
		if (max !== undefined && value > max) return `Maximum value is ${max}`;
		return null;
	};

	return (
		<div className={merge("flex flex-col gap-2", className)}>
			<Label className="flex items-center justify-between px-1 pr-1">
				<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
					<div className="flex items-center gap-2 min-w-0">
						<span className="wrap-break-word">{label}</span>
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

			<Controller
				control={form.control}
				name={name}
				render={({ field }) => {
					const numberOptions = { allowDecimals, allowNegative };

					if (isNumber && field.value != null && rawRef.current === "") {
						rawRef.current = String(field.value);
					}

					if (isPercentage && field.value != null && rawRef.current === "") {
						rawRef.current = String(field.value / 100);
					}

					const formatPhoneDisplay = (value: string): string => {
						if (!value) return "";
						const digits = value.replace(/\D/g, "").slice(0, 10);
						if (digits.length <= 2) return digits;
						if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
						return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
					};

					const displayValue = isCurrency
						? field.value
							? formatCurrency(field.value)
							: ""
						: isPercentage
							? rawRef.current
								? `${rawRef.current}%`
								: ""
							: isNumber
								? rawRef.current
									? formatNumberString(rawRef.current)
									: ""
								: isPhone
									? formatPhoneDisplay(field.value ?? "")
									: (field.value ?? "");

					const currentNumericValue =
						isNumber && field.value != null ? (field.value as number) : null;
					const rangeError = isNumber ? getNumberRangeError(currentNumericValue) : null;

					return (
						<div className="flex flex-col gap-1">
							<div className="relative">
								<Input
									id={name}
									type={inputType}
									placeholder={placeholder}
									value={displayValue}
									onChange={(e) => {
										if (isCurrency) {
											const cents = parseToCents(e.target.value);
											field.onChange(cents);
										} else if (isPercentage) {
											const raw = e.target.value.replace(/[^\d]/g, "");
											rawRef.current = raw;
											const num = raw === "" ? null : Number(raw);
											field.onChange(num === null ? null : num * 100);
										} else if (isNumber) {
											const input = e.target;
											const cursorBefore = input.selectionStart ?? 0;

											const raw = cleanNumberInput(input.value, numberOptions);
											rawRef.current = raw;

											const formatted = formatNumberString(raw);
											const newCursor = getNewCursorPosition(raw, formatted, cursorBefore);

											const parsed = parseDisplayToNumber(raw);
											field.onChange(parsed);

											if (parsed !== null) {
												if (min !== undefined && parsed < min) {
													form.setError(name, {
														type: "min",
														message: `Minimum value is ${min}`,
													});
												} else if (max !== undefined && parsed > max) {
													form.setError(name, {
														type: "max",
														message: `Maximum value is ${max}`,
													});
												} else {
													const currentError = form.formState.errors[name];
													if (currentError?.type === "min" || currentError?.type === "max") {
														form.clearErrors(name);
													}
												}
											} else {
												const currentError = form.formState.errors[name];
												if (currentError?.type === "min" || currentError?.type === "max") {
													form.clearErrors(name);
												}
											}

											requestAnimationFrame(() => {
												input.setSelectionRange(newCursor, newCursor);
											});
										} else if (isPhone) {
											const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
											field.onChange(digits);
										} else {
											field.onChange(e.target.value);
										}
									}}
									onBlur={() => {
										if (isPercentage) {
											rawRef.current = field.value != null ? String(field.value / 100) : "";
											field.onBlur();
											return;
										}
										if (isNumber) {
											rawRef.current = field.value != null ? String(field.value) : "";

											const value = field.value as number | null;
											if (value !== null && value !== undefined) {
												if (min !== undefined && value < min) {
													form.setError(name, {
														type: "min",
														message: `Minimum value is ${min}`,
													});
												} else if (max !== undefined && value > max) {
													form.setError(name, {
														type: "max",
														message: `Maximum value is ${max}`,
													});
												}
											}
										}
										field.onBlur();
									}}
									onKeyDown={(e) => {
										if (!isNumber) return;

										const allowed = new Set([
											"Backspace",
											"Delete",
											"Tab",
											"Escape",
											"Enter",
											"ArrowLeft",
											"ArrowRight",
											"ArrowUp",
											"ArrowDown",
											"Home",
											"End",
										]);

										if (allowed.has(e.key)) return;

										if (e.ctrlKey || e.metaKey) return;

										const isDot = e.key === ".";
										const isMinus = e.key === "-";
										const isDigit = /^\d$/.test(e.key);

										if (isDot && !allowDecimals) {
											e.preventDefault();
											return;
										}

										if (isMinus && !allowNegative) {
											e.preventDefault();
											return;
										}

										if (isMinus && allowNegative) {
											const input = e.currentTarget;
											if (input.selectionStart !== 0) {
												e.preventDefault();
											}
											return;
										}

										if (isDot && allowDecimals) {
											if (rawRef.current.includes(".")) {
												e.preventDefault();
											}
											return;
										}

										if (!isDigit) {
											e.preventDefault();
										}
									}}
									name={field.name}
									ref={field.ref}
									disabled={disabled}
									aria-invalid={!!error || !!rangeError}
								/>

								{isPassword && (
									<button
										type="button"
										onClick={() => setShowPassword((prev) => !prev)}
										className="absolute right-0 top-0 flex items-center justify-center h-full w-10 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
										tabIndex={-1}
										aria-label={showPassword ? "Hide password" : "Show password"}
									>
										{showPassword ? (
											<EyeOff
												size={16}
												className="text-primary"
											/>
										) : (
											<Eye
												size={16}
												className="text-primary"
											/>
										)}
									</button>
								)}
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