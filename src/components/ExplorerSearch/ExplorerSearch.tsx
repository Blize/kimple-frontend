'use client';

import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { getCookie } from 'cookies-next';
import { LayoutGroup, motion } from 'framer-motion';
import { MouseEvent, ReactElement, useEffect, useState } from 'react';

import { Folder } from '@/types/folder.type';
import { Note } from '@/types/note.type';
import { Todo } from '@/types/todo.type';

import { useDebounce } from '@/utils/useDebounce';

import { getFolders } from '@/services/folder.service';

import Input from '@/components/Input/Input';

import ExplorerSearchItem from '../ExplorerSearchItem/ExplorerSearchItem';
import styles from './ExplorerSearch.module.css';

const ExplorerSearch = (): ReactElement => {
	const tokenCookie = getCookie('token')?.toString() ?? '';

	const [focus, setFocus] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	const [results, setResults] = useState<(Note | Todo | Folder)[]>([]);

	const debouncedSearch = useDebounce(search, 300);

	useEffect(() => {
		(async () => {
			const folders = await getFolders(tokenCookie, true, true, debouncedSearch);
			setResults(folders);
		})();
	}, [debouncedSearch, tokenCookie]);

	const handleClose = (event: MouseEvent): void => {
		if (event.target !== event.currentTarget) return;
		setFocus(false);
		setSearch('');
	};

	const handleSelect = (): void => {
		setFocus(false);
		setSearch('');
	};

	useKeyboardShortcut(['ctrl', 'k'], () => setFocus((old) => !old));
	useKeyboardShortcut(['esc'], () => setFocus(false));

	return (
		<>
			<LayoutGroup>
				<div className={styles.placeholderContainer}>
					{!focus && (
						<Input
							layout
							layoutId="search.input"
							className={styles.searchInput}
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							placeholder="Search here (ctrl + k)"
							onClick={() => setFocus(true)}
						/>
					)}
				</div>

				{focus && (
					<div className={styles.background} onClick={handleClose}>
						<motion.div
							className={styles.search}
							initial={{ opacity: 0, y: 100 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 100 }}
						>
							<Input
								layout
								layoutId="search.input"
								className={styles.searchInput}
								onChange={(e) => setSearch(e.target.value)}
								value={search}
								placeholder="Search here"
								autoFocus
							/>

							<div className={styles.searchResults}>
								{debouncedSearch && results.length < 1 && <p>No search results for {`'${debouncedSearch}'`} found</p>}
								{results.map((result) => (
									<ExplorerSearchItem item={result} onSelect={() => handleSelect()} />
								))}
							</div>
						</motion.div>
					</div>
				)}
			</LayoutGroup>
		</>
	);
};

export default ExplorerSearch;
