import Link from 'next/link';
import { ReactElement } from 'react';

import { Note } from '@/types/note.type';
import { Todo } from '@/types/todo.type';

import styles from './HomeCard.module.css';

type Props = {
	item: Note | Todo;
};

const HomeCard = ({ item }: Props): ReactElement => {
	return (
		<Link href={`/editor/${item.id}`}>
			<div className={styles.wrapper}>
				{/* TODO need markdown reader here to if we want to do markdown and support preview */}
				<div className={styles.card}>
					{'content' in item
						? item.content
						: 'todoItems' in item
						? item.todoItems[0]
							? item.todoItems[0].name
							: ''
						: ''}
				</div>
				<p>{item.title ?? 'Empty Title'}</p>
			</div>
		</Link>
	);
};

export default HomeCard;
