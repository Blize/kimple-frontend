'use client';

import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement, useState } from 'react';

import { parseJwt } from '@/utils/decodeJwt';

import { login, register } from '@/services/auth.service';

import { useNotifications } from '@/providers/NotificationProvider';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

import styles from './page.module.css';

const RegisterPage = (): ReactElement => {
	const { addSuccess, addError } = useNotifications();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const router = useRouter();

	const handleRegister = async (username: string, password: string): Promise<void> => {
		if (!username || !password) return;

		try {
			await register({ username, password });
			const { token } = await login({ username, password });

			const { exp } = parseJwt(token);

			setCookie('token', token, { sameSite: true, expires: new Date(exp * 1000) });

			addSuccess('successfully registered');

			router.push('/home');
		} catch (err) {
			addError('registering failed', err);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1>Welcome please register</h1>

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

				<Button className={styles.button} onClick={() => handleRegister(username, password)}>
					Register
				</Button>

				<Link href={'/login'}>or login here</Link>
			</div>
		</div>
	);
};

export default RegisterPage;
