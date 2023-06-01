import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getCurrentUser } from './services/auth.service';

export async function middleware(request: NextRequest): Promise<NextResponse | void> {
	try {
		const tokenCookie = request.cookies.get('token')?.value ?? '';
		const user = await getCurrentUser(tokenCookie);
		if (!user.id) return NextResponse.redirect(new URL('/login', request.url));
	} catch (_) {
		// If something else fails, redirect to login
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

// Add all routes that should auth here check this if questions:
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
export const config = {
	matcher: ['/home'],
};
