import { ReactElement } from 'react';

const getNote = (id: string): void => {
	return;
};

export default async function Page(): Promise<ReactElement> {
	await new Promise((resolve) => setTimeout(resolve));
	return <div>page</div>;
}
