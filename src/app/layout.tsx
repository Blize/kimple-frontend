import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';

export const metadata = {
	title: 'Kimple',
	description: 'Take Notes with Kimple',
};

type Props = {
	children: ReactNode;
};

export default function RootLayout({ children }: Props): ReactElement {
	return (
		<html lang={'en'}>
			<body>{children}</body>
		</html>
	);
}
