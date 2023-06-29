import { JwtPayload } from '@/types/user.type';

export const parseJwt = (token: string): JwtPayload => {
	return JSON.parse(atob(token.split('.')[1]));
};
