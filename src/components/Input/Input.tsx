import clsx from 'clsx';
import { ChangeEvent, ReactElement } from 'react';

import styles from './Input.module.css';

type Props = {
	value: string;
	type?: 'text' | 'email' | 'password';
	name?: string;
	placeholder?: string;
	autoFocus?: boolean;
	onChange: (v: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (v: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
};

const Input = ({ type, value, name, placeholder, autoFocus, className, onChange, onBlur }: Props): ReactElement => {
	return (
		<input
			className={clsx(className, styles.input)}
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
