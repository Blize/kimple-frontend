import clsx from 'clsx';
import Image from 'next/image';
import { ReactElement, useState } from 'react';

import alertIcon from '@/assets/alert.svg';
import penIcon from '@/assets/pen.svg';
import trashIcon from '@/assets/trash.svg';

import styles from './TooltipItem.module.css';

type Item = {
	label: string;
	icon?: 'alert' | 'trash' | 'pen';
	action?: () => void;
	confirmation?: string;
};

type Props = {
	item: Item;
};

const TooltipItem = ({ item }: Props): ReactElement => {
	const [clicked, setClicked] = useState(false);

	const icon = item.icon
		? item.icon === 'alert'
			? alertIcon
			: item.icon === 'trash'
			? trashIcon
			: item.icon === 'pen'
			? penIcon
			: null
		: null;

	const handleClick = (): void => {
		if (item.confirmation && !clicked) return;
		if (item.action) item.action();
	};

	return (
		<div
			className={clsx(styles.item, { [styles.confirm]: item.confirmation && clicked })}
			onClick={() => {
				setClicked(true);
				handleClick();
			}}
		>
			{icon && <Image src={icon} height={20} width={20} alt={`${item.icon} icon`} />}
			{(item.confirmation && !clicked) || (!clicked && !item.confirmation) || (clicked && !item.confirmation) ? (
				<p>{item.label}</p>
			) : null}
			{item.confirmation && clicked && <p>{item.confirmation}</p>}
		</div>
	);
};

export default TooltipItem;
