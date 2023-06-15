'use client';

import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement, startTransition, useState } from 'react';

import { Note } from '@/types/note.type';

import { deleteNote, updateNote } from '@/services/notes.service';

import { useNotifications } from '@/providers/NotificationProvider';

import ExplorerAddInput from '@/components/ExplorerAddInput/ExplorerAddInput';
import Tooltip from '@/components/Tooltip/Tooltip';

import noteIcon from '@/assets/note.svg';
import penIcon from '@/assets/pen.svg';
import trashIcon from '@/assets/trash.svg';

import styles from './ExplorerNote.module.css';

type Props = {
	note: Note;
};

const ExplorerNote = ({ note }: Props): ReactElement => {
	const tokenCookie = getCookie('token')?.toString() ?? '';

	const title = note.title ?? note.content ?? 'Empty Note';

	const { addSuccess, addError } = useNotifications();

	const router = useRouter();

	const [edit, setEdit] = useState(false);
	const [noteTitle, setNoteTitle] = useState('');

	const handleEdit = (): void => {
		setEdit((old) => !old);
		setNoteTitle(title);
	};

	const handleUpdate = async (): Promise<void> => {
		if (noteTitle === note.title) return setEdit(false);

		try {
			await updateNote(tokenCookie, note.id, {
				title: noteTitle,
			});

			startTransition(() => router.refresh());

			addSuccess('successfully changed note title');

			setEdit(false);
		} catch (err) {
			addError('failed to change note title', err);
		}
	};

	const handleDelete = async (): Promise<void> => {
		try {
			await deleteNote(tokenCookie, note.id);

			addSuccess('successfully deleted note');

			startTransition(() => router.refresh());
		} catch (err) {
			addError('failed to delete note', err);
		}
	};

	return (
		<div className={styles.note}>
			{!edit ? (
				<Link href={`/editor/${note.id}`}>
					<div className={styles.main}>
						<Image className={styles.icon} src={noteIcon} width={19} height={19} alt="note icon" />
						<p>{title}</p>
					</div>
				</Link>
			) : (
				<div className={styles.main}>
					<ExplorerAddInput
						type="note"
						value={noteTitle}
						onChange={(e) => setNoteTitle(e.target.value)}
						onSubmit={() => handleUpdate()}
						onBlur={() => setEdit(false)}
					/>
				</div>
			)}

			<div className={styles.options}>
				<Image className={styles.edit} src={penIcon} width={20} height={20} alt="pen icon" onClick={handleEdit} />

				<Tooltip
					items={[
						{
							label: 'Are you sure?',
							icon: 'alert',
							action: () => handleDelete(),
						},
					]}
				>
					<Image className={styles.edit} src={trashIcon} width={20} height={20} alt="delete icon" />
				</Tooltip>
			</div>
		</div>
	);
};

export default ExplorerNote;
