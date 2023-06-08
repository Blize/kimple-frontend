'use client';

import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ChangeEvent, ReactElement, startTransition, useState } from 'react';

import { createNote } from '@/services/notes.service';

import { useNotifications } from '@/providers/NotificationProvider';

import Button from '@/components/Button/Button';

import styles from './Editor.module.css';

type Props = {
	value?: string;
	className: string;
};

export default function Editor({ value }: Props): ReactElement {
	const tokenCookie = getCookie('token')?.toString() ?? '';
	const [textAreaValue, setTextAreaValue] = useState('');

	const router = useRouter();
	const { addSuccess, addError, addWarning } = useNotifications();

	const handleSaveNote = async (): Promise<void> => {
		if (textAreaValue === '') {
			addWarning('Cant create empty note');
			return;
		}
		try {
			await createNote(tokenCookie, { content: textAreaValue });
			startTransition(() => router.refresh());

			addSuccess('successfully created new note');
		} catch (err) {
			addError('failed to create note', err);
		}
	};

	useKeyboardShortcut(['ctrl', 's'], handleSaveNote);
	return (
		<>
			<textarea
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTextAreaValue(e.target.value)}
				value={textAreaValue}
				className={styles.editor}
			/>
			<Button onClick={handleSaveNote} className={styles.button}>
				Save Note
			</Button>
		</>
	);
}
