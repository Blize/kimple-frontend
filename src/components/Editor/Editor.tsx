'use client';

import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { ReactElement } from 'react';

import Button from '@/components/Button/Button';

import styles from './Editor.module.css';

type Props = {
	value?: string;
	className: string;
};

export default function Editor({ value }: Props): ReactElement {
	const handleSaveFile = (): void => {
		//TODO: Code to save file
	};

	useKeyboardShortcut(['ctrl', 's'], handleSaveFile);
	return (
		<>
			<textarea value={value} className={styles.editor} />
			<Button className={styles.button}>Save Note</Button>
		</>
	);
}
