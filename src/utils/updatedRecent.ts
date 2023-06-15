import { Recent } from '@/types/recent.type';

export const updatedRecent = (cookie: string | undefined, itemId: string): Recent => {
	if (!cookie) return { [itemId]: 1 };

	const parsedCookie: Recent = JSON.parse(cookie) ?? {};

	return {
		...parsedCookie,

		...(parsedCookie[itemId] !== undefined &&
			typeof parsedCookie[itemId] === 'number' && {
				[itemId]: parsedCookie[itemId] + 1,
			}),

		...(parsedCookie[itemId] === undefined && {
			[itemId]: 1,
		}),
	};
};
