type TablePaginationProps = {
	/** Current page number (1-based) */
	page: number;
	/** Total number of pages. Component renders when totalPages >= 1, hidden only when 0 or undefined */
	totalPages: number;
	/** Callback invoked when the user selects a new page */
	onPageChange: (page: number) => void;
	/** Current page size (items per page). When provided, shows the page size selector */
	pageSize?: number;
	/** Callback invoked when the user changes the page size */
	onPageSizeChange?: (size: number) => void;
};