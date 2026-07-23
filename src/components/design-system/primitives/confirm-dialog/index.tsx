import { Ban, type LucideIcon, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

type ConfirmDialogProps = {
	children: React.ReactElement;

	title: string;
	description?: string;

	confirmText?: string;
	cancelText?: string;

	variant?: "default" | "destructive";

	onConfirm: () => void | Promise<void>;
	loading?: boolean;

	disabled?: boolean;

	open?: boolean;
	onOpenChange?: (open: boolean) => void;

	confirmIcon?: LucideIcon;
};

export const ConfirmDialog = ({
	children,
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	variant = "destructive",
	onConfirm,
	loading = false,
	disabled = false,
	open: controlledOpen,
	onOpenChange: setControlledOpen,
	confirmIcon,
}: ConfirmDialogProps): React.ReactElement => {
	const ConfirmActionIcon = confirmIcon ?? Trash2;
	const [internalOpen, setInternalOpen] = useState<boolean>(false);

	const open = controlledOpen ?? internalOpen;
	const setOpen = setControlledOpen ?? setInternalOpen;

	const handleConfirm = (e: React.MouseEvent) => {
		e.preventDefault();
		const result = onConfirm();

		if (result instanceof Promise) {
			result.then(() => setOpen(false)).catch(() => undefined);
		} else {
			setOpen(false);
		}
	};

	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
		<AlertDialogTrigger
			render={children}
			disabled={disabled}
		/>

			<AlertDialogContent className="max-w-md p-0 overflow-hidden">
				<AlertDialogHeader className="px-0 pt-6 pb-4 space-y-2">
					<AlertDialogTitle className="px-6 text-base font-semibold text-gray-900">
						{title}
					</AlertDialogTitle>

					<Separator />

					{description && (
						<AlertDialogDescription className="px-6 text-sm text-gray-500">
							{description}
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>

				<Separator />

				<AlertDialogFooter className="px-6 mb-3 flex flex-row justify-end gap-2">
					<AlertDialogCancel
						variant="outline"
						disabled={loading}
					>
						<Ban />
						{cancelText}
					</AlertDialogCancel>

					<AlertDialogAction
						variant={variant}
						className="min-w-32"
						disabled={loading}
						onClick={handleConfirm}
					>
						<ConfirmActionIcon />
						{loading ? (
							<div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
						) : (
							confirmText
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};