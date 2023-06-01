import { ReactElement, type ReactNode } from 'react';

import styles from './layout.module.css';

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props): ReactElement {
	return (
		<div className={styles.container}>
			<div className={styles.folders}>folders</div>

			<div className={styles.notes}>{children}</div>
		</div>
	);
}
