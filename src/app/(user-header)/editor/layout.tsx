import { cookies } from 'next/headers';
import { ReactElement, type ReactNode } from 'react';

import { getFolders } from '@/services/folder.service';

import { ExplorerProvider } from '@/providers/ExplorerProvider';

import Explorer from '@/components/Explorer/Explorer';
import ExplorerSearch from '@/components/ExplorerSearch/ExplorerSearch';

import styles from './layout.module.css';

type Props = {
	children: ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function Layout({ children }: Props): Promise<ReactElement> {
	const tokenCookie = cookies().get('token')?.value ?? '';

	const folders = await getFolders(tokenCookie, true, true);

	return (
		<div className={styles.container}>
			<div className={styles.folders}>
				<ExplorerProvider>
					<ExplorerSearch />

					<Explorer tree={folders} />
				</ExplorerProvider>
			</div>

			<div className={styles.notes}>{children}</div>
		</div>
	);
}
