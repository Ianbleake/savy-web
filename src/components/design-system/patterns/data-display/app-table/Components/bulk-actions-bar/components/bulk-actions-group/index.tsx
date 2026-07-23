import type React from "react";

export const BulkActionsGroup = ({
	label,
	children,
	isFirst = false,
}: BulkActionsGroupProps): React.ReactElement => {
	return (
		<>
			{!isFirst && (
				<div
					className="h-6 w-px self-center bg-neutral-200"
					aria-hidden="true"
				/>
			)}
			<div className="flex flex-col items-center gap-1.5">
				<span className="text-[0.5rem] leading-tight font-medium tracking-wide text-gray-500">
					{label}
				</span>
				<div className="flex items-center gap-1">{children}</div>
			</div>
		</>
	);
};

BulkActionsGroup.displayName = "BulkActionsGroup";