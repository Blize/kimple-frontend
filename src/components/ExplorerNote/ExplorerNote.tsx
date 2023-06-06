import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import { Note } from '@/types/note.type';

import noteIcon from '@/assets/note.svg';

import styles from './ExplorerNote.module.css';

type Props = {
	note: Note;
};

const ExplorerNote = ({ note }: Props): ReactElement => {
	return (
		<Link href={`/editor/${note.id}`}>
			<div className={styles.note}>
				<Image className={styles.icon} src={noteIcon} width={19} height={19} alt="note icon" />
				<p>{note.title ?? note.content ?? 'Empty Note'}</p>
			</div>
		</Link>
	);
};

export default ExplorerNote;
