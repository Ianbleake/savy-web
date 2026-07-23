import type React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { merge } from "@/utils/ui/mergeStyles";
import { Header } from "./header";

type AppTableHeaderProps = {
	headers: AppTableHeader[];
	tableHeaderClassname?: string;
	headerClassName?: string;
	currentSort?: string;
	onSort?: (field: string) => void;
	headerLabelClassName?: string;
	selection?: AppTableSelectionConfig<unknown>;
};

export const AppTableHeader = ({
	headers,
	tableHeaderClassname,
	headerClassName,
	currentSort,
	onSort,
	headerLabelClassName,
	selection,
}: AppTableHeaderProps): React.ReactElement => {
	return (
		<TableHeader
			className={merge("rounded-t-lg bg-gray-100 hover:bg-gray-100", tableHeaderClassname)}
		>
			<TableRow>
				{selection && (
					<TableHead className="w-10 px-3">
						<Checkbox
							checked={selection.allSelected || selection.someSelected}
							indeterminate={selection.someSelected}
							onCheckedChange={(checked) => {
								selection.onSelectAll(checked === true);
							}}
							aria-label="Select all rows"
						/>
					</TableHead>
				)}
				{headers.map((header) => {
					return (
						<Header
							headerClassName={headerClassName}
							headerLabelClassName={headerLabelClassName}
							header={header}
							key={header.label}
							currentSort={currentSort}
							onSort={onSort}
						/>
					);
				})}
			</TableRow>
		</TableHeader>
	);
};