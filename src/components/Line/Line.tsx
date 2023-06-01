import { ReactElement } from 'react';

import styles from './Line.module.css';

const Line = (): ReactElement => {
	return <hr className={styles.line} />;
};

export default Line;
