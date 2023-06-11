'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, startTransition, useCallback, useState } from 'react';

import Input from '@/components/Input/Input';

import styles from './ExplorerSearch.module.css';

const ExplorerSearch = (): ReactElement => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams],
	);

	const handleUpdateSearch = (searchQuery: string) => {
		startTransition(() => {
			router.replace(!searchQuery ? pathname : pathname + '?' + createQueryString('search', searchQuery));
		});
	};

	const [search, setSearch] = useState('');

	return (
		<Input
			className={styles.searchInput}
			onChange={(e) => setSearch(e.target.value)}
			value={search}
			placeholder="Search here"
		/>
	);
};

export default ExplorerSearch;
