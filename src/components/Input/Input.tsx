import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ChangeEvent, MouseEvent, ReactElement } from 'react';

import styles from './Input.module.css';

type Props = {
	value: string;
	layout?: boolean;
	layoutId?: string;
	type?: 'text' | 'email' | 'password';
	name?: string;
	placeholder?: string;
	autoFocus?: boolean;
	onChange: (v: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (v: ChangeEvent<HTMLInputElement>) => void;
	onClick?: (v: MouseEvent) => void;
	className?: string;
};

const Input = ({
	type,
	layout,
	layoutId,
	value,
	name,
	placeholder,
	autoFocus,
	className,
	onChange,
	onBlur,
	onClick,
}: Props): ReactElement => {
	return (
		<motion.input
			className={clsx(className, styles.input)}
			name={name}
			type={type}
			value={value}
			layout={layout}
			layoutId={layoutId}
			placeholder={placeholder}
			autoFocus={autoFocus}
			onChange={onChange}
			onBlur={onBlur}
			onClick={onClick}
		/>
	);
};

export default Input;
