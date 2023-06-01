import { ChangeEvent, ReactElement } from 'react';

import styles from './Input.module.css';

type Props = {
	type: 'text' | 'email' | 'password';
	value: string;
	name?: string;
	placeholder?: string;
	autoFocus?: boolean;
	onChange?: (v: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (v: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
};

const Input = ({ type, value, name, placeholder, autoFocus, onChange, onBlur }: Props): ReactElement => {
	return (
		<input
			className={styles.input}
			name={name}
			type={type}
			value={value}
			placeholder={placeholder}
			autoFocus={autoFocus}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

export default Input;
