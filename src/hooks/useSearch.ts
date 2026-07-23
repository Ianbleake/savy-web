import { useEffect, useState } from "react";

type UseSearchOptions = {
	externalValue: string | undefined;
	onCommit: (value: string | undefined) => void;
};

export const useSearch = ({ externalValue, onCommit }: UseSearchOptions) => {
	const [localValue, setLocalValue] = useState<string>(externalValue ?? "");

	useEffect(() => {
		setLocalValue(externalValue ?? "");
	}, [externalValue]);

	const onChange = (value: string) => {
		setLocalValue(value);
	};

	const commit = () => {
		onCommit(localValue || undefined);
	};

	return { localValue, onChange, commit };
};