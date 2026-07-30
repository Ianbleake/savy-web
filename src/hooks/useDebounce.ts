import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): [T, boolean] {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);
	const [isPending, setIsPending] = useState<boolean>(false);

	useEffect(() => {
		setIsPending(true);
		const timer = setTimeout(() => {
			setDebouncedValue(value);
			setIsPending(false);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return [debouncedValue, isPending];
}
