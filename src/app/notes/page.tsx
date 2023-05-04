import { ReactElement } from 'react';
import styles from './page.module.css';
import Textarea from '../../components/Textarea/Textarea';

export default function Page(): ReactElement {
	return (
		<div className={styles.container}>
			<Textarea cols={30} rows={10} className={styles.noteField}></Textarea>
		</div>
	);
}
