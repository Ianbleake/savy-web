import type { FieldValues, UseFormReturn } from "react-hook-form";

export const handleClose = <T extends FieldValues>(
	setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	form: UseFormReturn<T>,
): void => {
	setOpen(false);
	form.reset();
};