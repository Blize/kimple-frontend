import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import plusIcon from '@/assets/plus.svg';

import styles from './CreateCard.module.css';

type Props = {
	label: string;
};

const CreateCard = ({ label }: Props): ReactElement => {
	return (
		<Link href={`/editor/new`}>
			<div className={styles.wrapper}>
				<div className={styles.card}>
					<Image src={plusIcon} width={50} height={50} alt="plus icon" />
				</div>
				<p>{label}</p>
			</div>
		</Link>
	);
};

export default CreateCard;
