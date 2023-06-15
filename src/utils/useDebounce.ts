import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, wait: number): T | undefined => {
	const [debouncedStateValue, setDebouncedStateValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedStateValue(value);
		}, wait);

		return () => {
			clearTimeout(handler);
		};
	}, [value, wait]);

	return debouncedStateValue;
};
