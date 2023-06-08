import { ReactElement } from 'react';

import styles from './Editor.module.css';

type Props = {
	value?: string;
	className: string;
};

export default function Textarea({ value }: Props): ReactElement {
	return <textarea value={value} className={styles.editor} />;
}
