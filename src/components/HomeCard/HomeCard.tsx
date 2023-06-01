import Link from 'next/link';
import { ReactElement } from 'react';

import { Note } from '@/types/note.type';

import styles from './HomeCard.module.css';

type Props = {
	note: Note;
};

const HomeCard = ({ note }: Props): ReactElement => {
	// what did we say again, should it be in the url that is a note or a todo?

	return (
		<Link href={`/editor/${note.id}`}>
			<div className={styles.wrapper}>
				{/* TODO need markdown reader here to if we want to do markdown and support preview */}
				<div className={styles.card}>{note.content}</div>
				<p>{note.title}</p>
			</div>
		</Link>
	);
};

export default HomeCard;
