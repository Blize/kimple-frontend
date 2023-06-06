'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

import Button from '../Button/Button';
import styles from './Navigation.module.css';

const Navigation = (): ReactElement => {
	const pathname = usePathname();

	return (
		<div className={styles.container}>
			<Link href={'/home'}>
				<Button className={pathname === '/home' ? styles.active : ''}>Home</Button>
			</Link>

			<Link href={'/editor'}>
				<Button className={pathname === '/editor' ? styles.active : ''}>Editor</Button>
			</Link>
		</div>
	);
};

export default Navigation;
