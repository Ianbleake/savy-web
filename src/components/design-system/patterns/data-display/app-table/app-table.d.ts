type AppTableHeader = {
	label: string;
	icon?: import("lucide-react").LucideIcon;
	className?: string;
	/** When set, this column becomes sortable. Value is the field name sent to the API (e.g. "name", "created_at"). */
	sortField?: string;
};

type AppTablePaginationConfig = {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	pageSize?: number;
	onPageSizeChange?: (size: number) => void;
};

type AppTableSortConfig = {
	/** Current sort value (e.g. "name", "-name", undefined) */
	value?: string;
	/** Called when a sortable column header is clicked */
	onSort: (field: string) => void;
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

type AppTableBulkAction = {
	/** Unique key for the action */
	key: string;
	/** Label shown in the bulk actions bar group */
	label: string;
	/** Icon component from Lucide */
	icon: import("lucide-react").LucideIcon;
	/** Callback when action is triggered */
	onClick: () => void;
	/** Variant for the action button */
	variant?: "default" | "destructive" | "outline" | "ghost";
	/** If true, action is disabled (e.g., mutation in progress) */
	disabled?: boolean;
};

type AppTableBulkActionsConfig = {
	/** Number of selected items (for badge) */
	selectedCount: number;
	/** Entity label for the bar ("event", "candidate") */
	entityLabel: string;
	/** Clear all selections */
	onClear: () => void;
	/** Array of actions to render */
	actions: AppTableBulkAction[];
};

type AppTableProps<T> = {
	headers: AppTableHeader[];
	headerLabelClassName?: string;
	elements: T[] | undefined;
	renderRow: (item: T) => import("react").ReactNode;
	getRowId: (item: T, index: number) => import("react").Key;
	isLoading?: boolean;
	tableHeaderClassname?: string;
	headerClassName?: string;
	fixedLayout?: boolean;
	/** When true AND there are no elements AND not loading, renders Empty component directly without the Table wrapper */
	hideHeadersWhenEmpty?: boolean;
	empty?: {
		icon: import("lucide-react").LucideIcon;
		title: string;
		description: string;
	};
	pagination?: AppTablePaginationConfig;
	sort?: AppTableSortConfig;
	/** Optional selection config — enables header checkbox and selection state integration */
	selection?: AppTableSelectionConfig<T>;
	/** Optional bulk actions config — renders BulkActionsBar when selectedCount > 0 */
	bulkActions?: AppTableBulkActionsConfig;
};