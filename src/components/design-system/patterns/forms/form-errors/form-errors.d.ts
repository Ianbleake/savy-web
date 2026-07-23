type FormError = {
	key: string;
	title: string;
	message: string;
};

type FormErrorsProps<T extends import("react-hook-form").FieldValues> = {
	sectionTitles: Record<string, string>;
	crossErrors?: FormError[];
};