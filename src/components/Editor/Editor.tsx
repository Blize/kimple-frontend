'use client';

import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ChangeEvent, ReactElement, startTransition, useState } from 'react';

import { Note } from '@/types/note.type';

import { createNote, updateNote } from '@/services/notes.service';

import { useNotifications } from '@/providers/NotificationProvider';

import Button from '@/components/Button/Button';

import Input from '../Input/Input';
import styles from './Editor.module.css';

type Props = {
	note?: Note;
};

export default function Editor({ note }: Props): ReactElement {
	const cookieToken = getCookie('token')?.toString() ?? '';
	const [textAreaValue, setTextAreaValue] = useState(note?.content ?? '');
	const [inputValue, setInputValue] = useState(note?.title ?? '');

	const router = useRouter();
	const { addSuccess, addError, addWarning } = useNotifications();

	const handleSaveNote = async (): Promise<void> => {
		if (note) {
			try {
				await updateNote(cookieToken, note.id, { content: textAreaValue });
				startTransition(() => router.refresh());
				addSuccess('successfully update new note');
			} catch (err) {
				addError('failed to update note', err);
			}
		} else {
			if (textAreaValue === '') {
				addWarning(`can't create empty note`);
				return;
			}
			try {
				await createNote(cookieToken, { content: textAreaValue });
				startTransition(() => router.refresh());

				addSuccess('successfully created new note');
			} catch (err) {
				addError('failed to create note', err);
			}
		}
	};

	useKeyboardShortcut(['ctrl', 's'], () => handleSaveNote());
	return (
		<div className={styles.container}>
			<Input
				value={inputValue}
				placeholder="Your note title..."
				onChange={(e) => setInputValue(e.target.value)}
				className={styles.input}
			/>
			<textarea
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTextAreaValue(e.target.value)}
				value={textAreaValue}
				className={styles.editor}
			/>
			<Button onClick={() => handleSaveNote()} className={styles.button}>
				Save Note
			</Button>
		</div>
	);
}
