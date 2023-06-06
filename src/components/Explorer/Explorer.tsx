'use client';

import clsx from 'clsx';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { MouseEvent, ReactElement } from 'react';

import { Folder } from '@/types/folder.type';
import { Note } from '@/types/note.type';
import { Todo } from '@/types/todo.type';

import { useExplorer } from '@/providers/ExplorerProvider';

import Button from '@/components/Button/Button';
import ExplorerAddInput from '@/components/ExplorerAddInput/ExplorerAddInput';
import ExplorerFolder from '@/components/ExplorerFolder/ExplorerFolder';
import ExplorerNote from '@/components/ExplorerNote/ExplorerNote';
import ExplorerTodo from '@/components/ExplorerTodo/ExplorerTodo';

import noteIcon from '@/assets/note.svg';
import todoIcon from '@/assets/todo.svg';

import styles from './Explorer.module.css';

type Props = {
	tree: (Note | Todo | Folder)[] | null;
};

const Explorer = ({ tree }: Props): ReactElement => {
	const tokenCookie = getCookie('token')?.toString() ?? '';

	const {
		selectedFolder,
		setSelectedFolder,
		newFolderMode,
		setNewFolderMode,
		newFolderTitle,
		setNewFolderTitle,
		handleAddFolder,
	} = useExplorer();

	const handleDeselect = (event: MouseEvent): void => {
		if (event.target !== event.currentTarget) return;
		setSelectedFolder(null);
	};

	return (
		<div className={styles.explorer}>
			<p className="small">Explorer</p>

			{/* TODO drag n drop */}
			{/* TODO nested folder creation  */}
			{/* TODO scrolling */}

			{/* TODO set selected null when on no folder */}
			<div className={styles.items} onClick={(e) => handleDeselect(e)}>
				{!tree || (tree.length < 1 && <p>no items found</p>)}

				{tree &&
					tree.map((treeItem) => {
						return 'parentFolderId' in treeItem ? (
							<ExplorerFolder folder={treeItem as Folder} key={treeItem.id} />
						) : 'content' in treeItem ? (
							<ExplorerNote note={treeItem as Note} key={treeItem.id} />
						) : (
							<ExplorerTodo todo={treeItem as Todo} key={treeItem.id} />
						);
					})}

				{newFolderMode && !selectedFolder && (
					<ExplorerAddInput
						type="folder"
						value={newFolderTitle}
						onChange={(e) => setNewFolderTitle(e.target.value)}
						onSubmit={() => handleAddFolder(tokenCookie)}
						onBlur={() => setNewFolderMode((oldValue) => !oldValue)}
					/>
				)}
			</div>

			<div className={styles.buttons}>
				<Button className={styles.button} onClick={() => setNewFolderMode((oldValue) => !oldValue)}>
					New Folder
				</Button>

				<div className={styles.splitButtons}>
					<Button className={clsx(styles.button, styles.splitButton)}>
						<Image src={noteIcon} width={20} height={20} alt="note icon" />
						Add Note
					</Button>

					<Button className={clsx(styles.button, styles.splitButton)}>
						<Image src={todoIcon} width={20} height={20} alt="todo icon" />
						Add Todo
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Explorer;
