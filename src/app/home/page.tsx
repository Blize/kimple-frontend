import { cookies } from 'next/headers';
import { ReactElement } from 'react';

import { getCurrentUser } from '@/services/auth.service';

const HomePage = async (): Promise<ReactElement> => {
	const tokenCookie = cookies().get('token');
	const user = await getCurrentUser(tokenCookie?.value ?? '');

	return <div>user: {JSON.stringify(user) ?? ''}</div>;
};

export default HomePage;
