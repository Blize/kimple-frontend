'use client';
import { ReactElement, useState } from 'react';
import Input from '../../../components/Input/Input';
import styles from './page.module.css';

const SignUpPage = (): ReactElement => {
	const [userName, setUserName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [passWord, setPassWord] = useState<string>('');

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Sign Up</h1>
				<label htmlFor="username">Username</label>
				<Input
					type={'text'}
					value={userName}
					name={'username'}
					autoFocus={true}
					onChange={(v) => setUserName(v.target.value)}
				/>
				<label htmlFor="email">Email</label>
				<Input type={'email'} value={email} name={'email'} onChange={(v) => setEmail(v.target.value)} />
				<label htmlFor="password">Password</label>
				<Input type={'password'} value={passWord} name={'password'} onChange={(v) => setPassWord(v.target.value)} />
			</div>
		</div>
	);
};

export default SignUpPage;
