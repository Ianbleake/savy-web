type SectionTitleProps = {
	icon: import("react").ElementType;
	title: string;
	/** Optional description below the title (settings variant — large icon) */
	description?: string;
	/** Optional action node on the right (button, menu, etc.) */
	action?: import("react").ReactNode;
	/** Optional callback for inline edit button (candidates variant — small icon) */
	onEdit?: () => void;
	/** Edit button label (default: "Editar") */
	editLabel?: string;
};