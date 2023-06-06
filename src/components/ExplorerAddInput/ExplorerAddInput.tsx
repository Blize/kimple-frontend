import Image from 'next/image';
import { ChangeEvent, FormEvent, ReactElement } from 'react';

import folderIcon from '@/assets/folder.svg';
import noteIcon from '@/assets/note.svg';
import todoIcon from '@/assets/todo.svg';

import styles from './ExplorerAddInput.module.css';

type Props = {
	type: 'note' | 'folder' | 'todo';
	value: string;
	onChange: (v: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => void;
	onBlur: () => void;
};

const ExplorerAddInput = ({ type, value, onChange, onSubmit, onBlur }: Props): ReactElement => {
	const image = type === 'note' ? noteIcon : type === 'folder' ? folderIcon : todoIcon;

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<div className={styles.container}>
			<Image src={image} width={20} height={20} alt={`${type} icon`} />
			<form onSubmit={handleSubmit}>
				<input
					autoFocus
					className={styles.input}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					placeholder={`enter new ${type} name`}
				/>
			</form>
		</div>
	);
};

export default ExplorerAddInput;
