'use client';
import { ReactElement, useState } from 'react';
import Input from '../../../components/Input/Input';
import styles from './page.module.css';

const SignUpPage = (): ReactElement => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Sign Up</h1>
				<label htmlFor="username">Username</label>
				<Input
					type={'text'}
					value={username}
					name={'username'}
					autoFocus={true}
					onChange={(v) => setUsername(v.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<Input type={'password'} value={password} name={'password'} onChange={(v) => setPassword(v.target.value)} />
			</div>
		</div>
	);
};

export default SignUpPage;
