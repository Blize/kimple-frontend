import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';

import styles from './Button.module.css';

type Props = {
	onClick?: () => void;
	className?: string;
	children: ReactNode;
};

const Button = ({ children, className, onClick }: Props): ReactElement => {
	return (
		<button className={clsx(className, styles.button)} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
