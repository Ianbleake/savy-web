type AppTablePaginationProps = {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	pageSize?: number;
	onPageSizeChange?: (size: number) => void;
};