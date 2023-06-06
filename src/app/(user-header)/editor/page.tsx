import { ReactElement } from 'react';

import Textarea from '@/components/Textarea/Textarea';

import styles from './page.module.css';

export default function Page(): ReactElement {
	return (
		<div className={styles.container}>
			<Textarea cols={30} rows={10} className={styles.noteField}></Textarea>
		</div>
	);
}
