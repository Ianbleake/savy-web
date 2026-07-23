type ConfirmDialogProps = {
	children: import("react").ReactNode;

	title: string;
	description?: string;

	confirmText?: string;
	cancelText?: string;

	variant?: "default" | "destructive" | "success";

	onConfirm: () => void | Promise<void>;
	loading?: boolean;

	disabled?: boolean;

	open?: boolean;
	onOpenChange?: (open: boolean) => void;

	confirmIcon?: import("lucide-react").LucideIcon;
};