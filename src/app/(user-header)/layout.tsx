import { cookies } from 'next/headers';
import { ReactElement, ReactNode } from 'react';

import { getCurrentUser } from '@/services/auth.service';

type Props = {
	children: ReactNode;
};

const Layout = async ({ children }: Props): Promise<ReactElement> => {
	const tokenCookie = cookies().get('token')?.value ?? '';
	const user = await getCurrentUser(tokenCookie);

	return (
		<div>
			<div>
				<p>Welcome back, {user.username}</p>
			</div>

			<div>nav</div>

			{children}
		</div>
	);
};

export default Layout;
