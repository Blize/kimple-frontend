import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getCurrentUser } from './services/auth.service';
import { updatedRecent } from './utils/updatedRecent';

export async function middleware(request: NextRequest): Promise<NextResponse | void> {
	try {
		const tokenCookie = request.cookies.get('token')?.value ?? '';
		const user = await getCurrentUser(tokenCookie);
		if (!user.id) return NextResponse.redirect(new URL('/login', request.url));

		const [mainPage, itemPage] = request.nextUrl.pathname.slice(1).split('/');

		if (mainPage === 'editor' && itemPage && itemPage !== 'new') {
			const response = NextResponse.next();
			const recentCookie = request.cookies.get('recent')?.value;

			response.cookies.set({
				name: 'recent',
				value: JSON.stringify(updatedRecent(recentCookie, itemPage)),
				expires: Date.now() + 10 * 365 * 24 * 60 * 60,
			});

			return response;
		}
	} catch (_) {
		// If something else fails, redirect to login
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

// Add all routes that should auth here check this if questions:
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
export const config = {
	matcher: ['/home', '/editor', '/editor/:id*'],
};
