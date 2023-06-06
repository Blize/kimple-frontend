'use client';

import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement, useState } from 'react';

import { login } from '@/services/auth.service';

import { useNotifications } from '@/providers/NotificationProvider';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

import styles from './page.module.css';

const LoginPage = (): ReactElement => {
	const { addSuccess, addError } = useNotifications();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const router = useRouter();

	const handleLogin = async (username: string, password: string): Promise<void> => {
		if (!username || !password) return;

		try {
			const { token } = await login({ username, password });

			// TODO use exp instead of ENV
			setCookie('token', token, { sameSite: true, expires: new Date(Date.now() + 86400 * 1000 * 14) });

			addSuccess('successfully logged in');

			router.push('/home');
		} catch (err) {
			addError('login failed', err);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1>Welcome please login</h1>

				<div className={styles.fields}>
					<Input
						placeholder={'username'}
						value={username}
						autoFocus={true}
						onChange={(e) => setUsername(e.target.value)}
						className={styles.input}
					/>

					<Input
						type={'password'}
						placeholder={'password'}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={styles.input}
					/>
				</div>

				<Button className={styles.button} onClick={() => handleLogin(username, password)}>
					Login
				</Button>

				<Link href={'/login'}>or register here</Link>
			</div>
		</div>
	);
};

export default LoginPage;
