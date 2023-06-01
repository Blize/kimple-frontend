import { env } from '@/env.mjs';
import { fetcher } from '@/utils/fetcher';

import { Credentials, Token, User } from '@/types/user.type';

const baseURL = env.NEXT_PUBLIC_BACKEND_URL;

export const register = async (credentials: Credentials): Promise<User> => {
	return fetcher<User>('post', `${baseURL}/auth/sign-up`, credentials, {
		cache: 'no-store',
	});
};

export const login = async (credentials: Credentials): Promise<Token> => {
	return fetcher<Token>('post', `${baseURL}/auth/sign-in`, credentials, {
		cache: 'no-store',
	});
};

export const getCurrentUser = async (token: string): Promise<User> => {
	return fetcher<User>('get', `${baseURL}/auth/me`, undefined, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};
