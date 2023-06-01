import { Inter } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Kimple',
	description: 'Take Notes with Kimple',
};

type Props = {
	children: ReactNode;
};

export default function RootLayout({ children }: Props): ReactElement {
	return (
		<html lang={'en'} className={inter.className}>
			<body>{children}</body>
		</html>
	);
}
