type ModalProps = {
	children?: import("react").ReactElement;
	openModal?: boolean;
	setOpenModal?: (open: boolean) => void;
	showClose?: boolean;
	className?: string;
	title: string;
	description: string;
	icon?: import("react").ElementType;
	iconVariant?: "orange" | "neutral" | "amber" | "red";
	content: import("react").ReactElement;
	actions?: import("react").ReactElement;
	showCancel?: boolean;
};