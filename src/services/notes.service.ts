import { env } from '@/env.mjs';
import { fetcher } from '@/utils/fetcher';

import { Note } from '@/types/note.type';

const baseURL = env.NEXT_PUBLIC_BACKEND_URL;

export const getNotes = (token: string): Promise<Note[]> => {
	return fetcher<Note[]>('get', `${baseURL}/note`, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		next: {
			revalidate: 10, // use cache for 10 secs, then get new data
		},
	});
};
