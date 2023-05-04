import { ReactElement } from 'react';
import styles from './Textarea.module.css';

type Props = {
	cols: number;
	rows: number;
	className?: string;
};

export default function Textarea({ cols, rows, className }: Props): ReactElement {
	return <textarea cols={cols} rows={rows} className={styles.textarea} />;
}
