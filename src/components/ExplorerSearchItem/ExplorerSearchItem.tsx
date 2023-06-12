import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import { Folder } from '@/types/folder.type';
import { Note } from '@/types/note.type';
import { Todo } from '@/types/todo.type';

import chevronRightIcon from '@/assets/chevron-right.svg';
import noteIcon from '@/assets/note.svg';
import todoIcon from '@/assets/todo.svg';

import styles from './ExplorerSearchItem.module.css';

type Props = {
	item: Todo | Note | Folder;
	history?: string[];
	onSelect?: () => void;
};

const ExplorerSearchItem = ({ item, history, onSelect }: Props): ReactElement => {
	return (
		<>
			{/* If folder, add itself to history and pass items */}
			{'parentFolderId' in item &&
				item.subFolders &&
				item.subFolders.map((subItem) => (
					<ExplorerSearchItem
						key={subItem.id}
						item={subItem}
						history={[...(history ?? []), item.title]}
						onSelect={onSelect}
					/>
				))}

			{/* If note or todo, show history with title and content */}
			{'folderId' in item && (
				<Link href={`/editor/${item.id}`} onClick={onSelect}>
					<div className={styles.main}>
						<div className={styles.history}>
							{!history && <p>root</p>}
							{history &&
								history.map((historyItem) => (
									<div key={`history.item.${historyItem}.${item.id}`} className={styles.history}>
										<p className={styles.historyItem}>{historyItem}</p>
										<Image src={chevronRightIcon} alt="" height={10} width={10} className={styles.icon} />
									</div>
								))}
						</div>

						{'content' in item && (
							<div className={styles.item}>
								<Image src={noteIcon} alt="note icon" height={20} width={20} className={styles.icon} />
								<p>{item.title ?? item.content ?? 'Empty Note'}</p>
							</div>
						)}

						{'todoItems' in item && (
							<div className={styles.item}>
								<Image src={todoIcon} alt="todo icon" height={20} width={20} className={styles.icon} />
								<p>{item.title ?? 'Empty Todo'}</p>
							</div>
						)}
					</div>
				</Link>
			)}
		</>
	);
};

export default ExplorerSearchItem;
