type AppTableHeader = {
	label: string;
	icon?: import("lucide-react").LucideIcon;
	className?: string;
	/** When set, this column becomes sortable. Value is the field name sent to the API (e.g. "name", "created_at"). */
	sortField?: string;
};

type AppTableSelectionConfig<T> = {
	/** True when ALL visible selectable rows are selected */
	allSelected: boolean;
	/** True when SOME (not all) visible selectable rows are selected */
	someSelected: boolean;
	/** Header checkbox callback — called with true (select all) or false (deselect all) */
	onSelectAll: (checked: boolean) => void;
	/** Per-row selection check (used by caller's renderRow) */
	isSelected: (item: T) => boolean;
};
