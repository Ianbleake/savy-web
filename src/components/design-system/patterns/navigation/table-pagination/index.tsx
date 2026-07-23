import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

const ARROW_CLASSES =
	"inline-flex items-center justify-center size-8 rounded-md border border-gray-200 bg-white shadow-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 hover:border-primary/50 hover:text-primary active:bg-primary/10 transition-colors";

/**
 * Generic table pagination component.
 *
 * Visibility rule:
 * - Renders when `totalPages >= 1` (even a single page shows the bar)
 * - Hidden only when there is no data at all (`totalPages === 0`)
 *
 * Consumers are responsible for the outer visibility guard:
 * `{totalPages >= 1 && <TablePagination ... />}`
 */
export const TablePagination = ({
	page,
	totalPages,
	onPageChange,
	pageSize,
	onPageSizeChange,
}: TablePaginationProps): React.ReactElement => {
	const showPageSizeSelector = pageSize !== undefined && onPageSizeChange !== undefined;

	return (
		<div className="flex items-center justify-between pt-2">
			{/* Page size selector — left side */}
			{showPageSizeSelector ? (
				<div className="flex items-center gap-2">
					<span className="text-xs text-muted-foreground">Mostrar</span>
				<Select
					value={String(pageSize)}
					onValueChange={(value) => onPageSizeChange(Number(value))}
				>
						<SelectTrigger className="h-8 w-17.5 text-xs">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{PAGE_SIZE_OPTIONS.map((size) => (
								<SelectItem
									key={size}
									value={String(size)}
								>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<span className="text-xs text-muted-foreground">por página</span>
				</div>
			) : (
				<div />
			)}

			{/* Page navigation — right side */}
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => onPageChange(page - 1)}
					disabled={page <= 1}
					className={ARROW_CLASSES}
					aria-label="Página anterior"
				>
					<ChevronLeft className="size-4" />
				</button>

				<span className="text-xs text-muted-foreground px-1 select-none">
					Página {page} de {totalPages}
				</span>

				<button
					type="button"
					onClick={() => onPageChange(page + 1)}
					disabled={page >= totalPages}
					className={ARROW_CLASSES}
					aria-label="Página siguiente"
				>
					<ChevronRight className="size-4" />
				</button>
			</div>
		</div>
	);
};