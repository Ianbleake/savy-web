type SearchFilterSelectProps = {
	/** Trigger placeholder when no selection */
	placeholder?: string;
	/** Label for the "all" option (e.g. "All campaigns") */
	allLabel?: string;
	/** Search input placeholder */
	searchPlaceholder?: string;
	/** Selected value (ID) or undefined */
	value: string | undefined;
	/** Callback on selection change — undefined = clear */
	onChange: (value: string | undefined) => void;
	/** Available options */
	options: Option[];
	/** Is loading options */
	isLoading?: boolean;
	/** Search callback — called with debounce to search the backend */
	onSearch?: (term: string) => void;
	/** Additional classes for the container */
	className?: string;
};