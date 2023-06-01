import { cookies } from 'next/headers';
import { ReactElement, ReactNode } from 'react';

import { getCurrentUser } from '@/services/auth.service';

import Line from '@/components/Line/Line';
import Navigation from '@/components/Navigation/Navigation';

import styles from './layout.module.css';

type Props = {
	children: ReactNode;
};

const Layout = async ({ children }: Props): Promise<ReactElement> => {
	const tokenCookie = cookies().get('token')?.value ?? '';
	const user = await getCurrentUser(tokenCookie);

	return (
		<div className={styles.container}>
			<div>
				<p>Welcome back, {user.username}</p>
			</div>

			<Line />

			<Navigation />

			<Line />

			{children}
		</div>
	);
};

export default Layout;
