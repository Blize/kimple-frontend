import { ReactElement } from 'react';

import Editor from '@/components/Editor/Editor';

import styles from './page.module.css';

export default function Page(): ReactElement {
	return (
		<div className={styles.container}>
			<Editor update={false} />
		</div>
	);
}
