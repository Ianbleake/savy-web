import type React from "react";
import { Fragment } from "react";
import { BulkActionsBar } from "./Components/bulk-actions-bar";

export { BulkActionsBar } from "./Components/bulk-actions-bar";

import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AppTableHeader } from "./app-table-header";
import { AppTablePagination } from "./app-table-pagination";
import { AppTableSkeleton } from "./app-table-skeleton";

export const AppTable = <T,>({
	headers,
	elements,
	renderRow,
	getRowId,
	isLoading = false,
	tableHeaderClassname,
	headerClassName,
	fixedLayout = false,
	hideHeadersWhenEmpty = false,
	empty,
	pagination,
	sort,
	headerLabelClassName,
	selection,
	bulkActions,
}: AppTableProps<T>): React.ReactElement => {
	const safeElements = elements ?? [];
	const showEmptyDirectly = hideHeadersWhenEmpty && safeElements.length === 0 && !isLoading;
	const extraColumns = selection ? 1 : 0;
	const totalColumns = headers.length + extraColumns;

	return (
		<div className="flex flex-col gap-4">
			<div className="rounded-lg border bg-white shadow w-full overflow-hidden">
				{showEmptyDirectly ? (
					empty ? (
						<Empty
							icon={empty.icon}
							title={empty.title}
							description={empty.description}
						/>
					) : (
						<Empty />
					)
				) : (
					<div className="w-full overflow-x-auto">
						<Table className={fixedLayout ? "w-full table-fixed" : "min-w-max"}>
							<AppTableHeader
								headers={headers}
								tableHeaderClassname={tableHeaderClassname}
								headerLabelClassName={headerLabelClassName}
								headerClassName={headerClassName}
								currentSort={sort?.value}
								onSort={sort?.onSort}
								selection={selection as AppTableSelectionConfig<unknown> | undefined}
							/>

							<TableBody>
								{isLoading ? (
									<AppTableSkeleton
										headerslength={headers.length}
										extraColumns={extraColumns}
									/>
								) : safeElements.length === 0 ? (
									<TableRow>
										<TableCell colSpan={totalColumns}>
											{empty ? (
												<Empty
													icon={empty.icon}
													title={empty.title}
													description={empty.description}
												/>
											) : (
												<Empty />
											)}
										</TableCell>
									</TableRow>
								) : (
									safeElements.map((element, index) => (
										<Fragment key={getRowId(element, index)}>
											{renderRow(element)}
										</Fragment>
									))
								)}
							</TableBody>
						</Table>
					</div>
				)}
			</div>

			{pagination && pagination.totalPages >= 1 && (
				<AppTablePagination
					page={pagination.page}
					totalPages={pagination.totalPages}
					onPageChange={pagination.onPageChange}
					pageSize={pagination.pageSize}
					onPageSizeChange={pagination.onPageSizeChange}
				/>
			)}

			{bulkActions && bulkActions.selectedCount > 0 && (
				<BulkActionsBar
					selectedCount={bulkActions.selectedCount}
					entityLabel={bulkActions.entityLabel}
					onClear={bulkActions.onClear}
				>
					<BulkActionsBar.Group label="Acciones">
						{bulkActions.actions.map((action) => (
							<Button
								key={action.key}
								variant={action.variant ?? "ghost"}
								size="sm"
								onClick={action.onClick}
								disabled={action.disabled}
								className="h-7 gap-1.5 px-2 text-xs"
							>
								<action.icon className="size-3.5" />
								{action.label}
							</Button>
						))}
					</BulkActionsBar.Group>
				</BulkActionsBar>
			)}
		</div>
	);
};