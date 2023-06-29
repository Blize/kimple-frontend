'use client';

import clsx from 'clsx';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { MouseEvent, ReactElement, useState } from 'react';

import { Folder } from '@/types/folder.type';
import { Note } from '@/types/note.type';
import { Todo } from '@/types/todo.type';

import { useExplorer } from '@/providers/ExplorerProvider';

import Button from '@/components/Button/Button';
import ExplorerAddInput from '@/components/ExplorerAddInput/ExplorerAddInput';
import ExplorerFolder from '@/components/ExplorerFolder/ExplorerFolder';
import ExplorerNote from '@/components/ExplorerNote/ExplorerNote';
import ExplorerTodo from '@/components/ExplorerTodo/ExplorerTodo';

import minusIcon from '@/assets/minus-circle.svg';
import noteIcon from '@/assets/note.svg';
import plusIcon from '@/assets/plus-circle.svg';
import todoIcon from '@/assets/todo.svg';

import styles from './Explorer.module.css';

type Props = {
	tree: (Note | Todo | Folder)[] | null;
};

const Explorer = ({ tree }: Props): ReactElement => {
	const tokenCookie = getCookie('token')?.toString() ?? '';

	const { selectedFolder, setSelectedFolder, newItemMode, setNewItemMode, newTitle, setNewTitle, handleNewItem } =
		useExplorer();

	const handleDeselect = (event: MouseEvent): void => {
		if (event.target !== event.currentTarget) return;
		setSelectedFolder(null);
	};

	const [expand, setExpand] = useState<boolean>(false);

	return (
		<div className={styles.explorer} onClick={(e) => handleDeselect(e)}>
			<div className={styles.header}>
				<p className="small">Explorer</p>

				<div className={styles.headerActions}>
					{expand ? (
						<Image src={minusIcon} width={15} height={15} alt="minimize" onClick={() => setExpand((old) => !old)} />
					) : (
						<Image src={plusIcon} width={15} height={15} alt="expand" onClick={() => setExpand((old) => !old)} />
					)}
				</div>
			</div>

			{/* TODO drag n drop */}
			{/* TODO scrolling */}

			<div className={styles.itemsWrapper}>
				<div className={styles.items}>
					{!tree || (tree.length < 1 && <p>no items found</p>)}

					{tree &&
						tree.map((treeItem) => {
							return 'parentFolderId' in treeItem ? (
								<ExplorerFolder folder={treeItem as Folder} key={treeItem.id} expand={expand} />
							) : 'content' in treeItem ? (
								<ExplorerNote note={treeItem as Note} key={treeItem.id} />
							) : (
								<ExplorerTodo todo={treeItem as Todo} key={treeItem.id} />
							);
						})}

					{newItemMode && !selectedFolder && (
						<ExplorerAddInput
							type={newItemMode}
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
							onSubmit={() => handleNewItem(tokenCookie)}
							onBlur={() => setNewItemMode(null)}
						/>
					)}
				</div>
			</div>

			<div className={styles.buttons}>
				<Button className={styles.button} onClick={() => setNewItemMode((oldValue) => (oldValue ? null : 'folder'))}>
					New Folder
				</Button>

				<div className={styles.splitButtons}>
					<Button
						className={clsx(styles.button, styles.splitButton)}
						onClick={() => setNewItemMode((oldValue) => (oldValue ? null : 'note'))}
					>
						<Image src={noteIcon} width={20} height={20} alt="note icon" />
						Add Note
					</Button>

					<Button
						className={clsx(styles.button, styles.splitButton)}
						onClick={() => setNewItemMode((oldValue) => (oldValue ? null : 'todo'))}
					>
						<Image src={todoIcon} width={20} height={20} alt="todo icon" />
						Add Todo
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Explorer;
