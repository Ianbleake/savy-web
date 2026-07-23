import { X } from "lucide-react";
import { Children, cloneElement, isValidElement, type ReactElement } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BulkActionsGroup } from "./components/bulk-actions-group";

export const BulkActionsBarInner = ({
	selectedCount,
	entityLabel,
	onClear,
	children,
}: BulkActionsBarProps): ReactElement => {
	const childArray = Children.toArray(children);

	const childrenWithGroupIndex = childArray.map((child, index) => {
		if (isValidElement<BulkActionsGroupProps>(child)) {
			return cloneElement(child, { isFirst: index === 0 });
		}
		return child;
	});

	return (
		<div
			role="toolbar"
			aria-label={`Bulk actions for ${selectedCount} ${entityLabel} selected`}
			className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in-0 slide-in-from-bottom-4 duration-200"
		>
			<div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-2 ring-1 ring-neutral-900/5">
				{/* Count badge + entity label */}
				<div className="flex items-center gap-2 pr-1">
					<Badge
						variant={"secondary"}
						className="text-xs px-3 py-3"
					>
						{selectedCount}
					</Badge>
					<span className="whitespace-nowrap text-xs font-medium text-neutral-600">
						{selectedCount} {entityLabel} selected
					</span>
				</div>

				<Separator orientation="vertical" />

				{/* Action groups */}
				<div className="flex items-center gap-1">{childrenWithGroupIndex}</div>

				<Separator orientation="vertical" />

				{/* Clear button */}
				<Button
					variant="ghost"
					size="icon"
					onClick={onClear}
					className="size-7 rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
					aria-label="Clear selection"
				>
					<X className="size-3.5" />
				</Button>
			</div>
		</div>
	);
};

type BulkActionsBarWithGroup = typeof BulkActionsBarInner & {
	Group: typeof BulkActionsGroup;
};

const BulkActionsBar = BulkActionsBarInner as BulkActionsBarWithGroup;
BulkActionsBar.Group = BulkActionsGroup;

export { BulkActionsBar };