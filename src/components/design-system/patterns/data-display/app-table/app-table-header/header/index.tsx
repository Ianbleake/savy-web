import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type React from "react";
import { TableHead } from "@/components/ui/table";
import { merge } from "@/utils/ui/mergeStyles";

type HeaderProps = {
	header: AppTableHeader;
	headerClassName?: string;
	headerLabelClassName?: string;
	currentSort?: string;
	onSort?: (field: string) => void;
};

export const Header = ({
	header,
	headerClassName,
	currentSort,
	onSort,
	headerLabelClassName,
}: HeaderProps): React.ReactElement => {
	const Icon = header.icon;

	if (header.sortField && onSort) {
		const isAsc = currentSort === header.sortField;
		const isDesc = currentSort === `-${header.sortField}`;
		const sortDirection = isAsc ? "asc" : isDesc ? "desc" : undefined;

		return (
			<TableHead
				className={merge("min-w-48 w-50 max-w-70", headerClassName, header.className)}
			>
				<button
					type="button"
					onClick={() => onSort(header.sortField as string)}
					className="flex flex-row items-center gap-3 text-left"
				>
					{Icon && <Icon className="text-current h-5 w-5" />}
					<span className={merge(headerLabelClassName, "")}>{header.label}</span>
					{sortDirection === "asc" && <ArrowDown className="size-3" />}
					{sortDirection === "desc" && <ArrowUp className="size-3" />}
					{!sortDirection && <ChevronsUpDown className="size-3 opacity-50" />}
				</button>
			</TableHead>
		);
	}

	return (
		<TableHead className={merge("w-20", headerClassName, header.className)}>
			<div className="flex flex-row gap-3">
				{Icon && <Icon className="text-current h-5 w-5" />}
				<p className={merge("text-sm font-normal text-gray-500", headerLabelClassName)}>
					{header.label}
				</p>
			</div>
		</TableHead>
	);
};