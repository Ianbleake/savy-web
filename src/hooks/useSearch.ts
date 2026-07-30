import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

type UseSearchOptions = {
	externalValue: string | undefined;
	onCommit: (value: string | undefined) => void;
	debounceMs?: number;
};

type UseSearchReturn = {
	localValue: string;
	onChange: (value: string) => void;
};

export const useSearch = ({
	externalValue,
	onCommit,
	debounceMs = 500,
}: UseSearchOptions): UseSearchReturn => {
	const [localValue, setLocalValue] = useState<string>(externalValue ?? "");

	useEffect(() => {
		setLocalValue(externalValue ?? "");
	}, [externalValue]);

	const [debouncedValue] = useDebounce(localValue, debounceMs);

	useEffect(() => {
		onCommit(debouncedValue || undefined);
	}, [debouncedValue, onCommit]);

	const onChange = (value: string) => {
		setLocalValue(value);
	};

	return { localValue, onChange };
};
