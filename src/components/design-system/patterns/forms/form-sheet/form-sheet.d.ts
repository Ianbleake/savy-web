type FormSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;

	/** Icon shown in the header next to the title */
	icon: import("react").ElementType;
	/** Sheet title text */
	title: string;
	/** Optional description shown below the title */
	description?: string;

	/** Maximum width of the sheet panel (default: "28rem") */
	maxWidth?: string;

	/** Sheet body — form fields, content, etc. */
	children: import("react").ReactNode;

	/** Footer actions — buttons, etc. If omitted, no footer is rendered */
	footer?: import("react").ReactNode;
};