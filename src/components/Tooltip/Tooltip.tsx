import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent, ReactElement, ReactNode, useState } from 'react';

import TooltipItem from '../TooltipItem/TooltipItem';
import styles from './Tooltip.module.css';

type Item = {
	label: string;
	icon?: 'alert' | 'trash' | 'pen';
	action?: () => void;
	confirmation?: string;
};

type Props = {
	className?: string;
	items: Item[];
	children: ReactNode;
};

const Tooltip = ({ items, className, children }: Props): ReactElement => {
	const [open, setOpen] = useState(false);

	const handleOpen = (e: MouseEvent): void => {
		setOpen((old) => {
			if (e.target !== e.currentTarget) return true;
			return !old;
		});
	};

	return (
		<motion.div onClick={handleOpen} onMouseLeave={() => setOpen(false)} className={className}>
			{children}

			<AnimatePresence>
				{open && (
					<motion.div
						className={styles.tooltip}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
					>
						{items.map((item, index) => (
							<TooltipItem key={`tooltip.item.${index}`} item={item} />
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default Tooltip;
