type BulkActionsBarProps = {
	selectedCount: number;
	entityLabel: string;
	onClear: () => void;
	children: import("react").ReactNode;
};

type BulkActionsGroupProps = {
	label: string;
	children: import("react").ReactNode;
	isFirst?: boolean;
};