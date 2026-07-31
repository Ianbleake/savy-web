import type React from "react";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";

type AppTablePaginationProps = {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	pageSize?: number;
	onPageSizeChange?: (size: number) => void;
};

export const AppTablePagination = ({
	page,
	totalPages,
	onPageChange,
	pageSize,
	onPageSizeChange,
}: AppTablePaginationProps): React.ReactElement => {
	return (
		<TablePagination
			page={page}
			totalPages={totalPages}
			onPageChange={onPageChange}
			pageSize={pageSize}
			onPageSizeChange={onPageSizeChange}
		/>
	);
};
