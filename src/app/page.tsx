import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactElement } from 'react';

import Button from '@/components/Button/Button';

import styles from './root-page.module.css';

export default function Home(): ReactElement {
	const tokenCookie = cookies().get('token')?.value ?? '';

	return (
		<main className={styles.container}>
			<h1>Welcome to kimple</h1>
			<p>the simple note and todo App</p>

			<div className={styles.buttons}>
				{tokenCookie ? (
					<Link href="/home">
						<Button>Home</Button>
					</Link>
				) : (
					<>
						<Link href="/login">
							<Button>Login</Button>
						</Link>

						<Link href="/register">
							<Button>Register</Button>
						</Link>
					</>
				)}
			</div>
		</main>
	);
}
