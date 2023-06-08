import { env } from '@/env.mjs';
import { fetcher } from '@/utils/fetcher';

import { CreateNote, Note } from '@/types/note.type';

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

export const getNote = (token: string, id: string): Promise<Note> => {
	return fetcher<Note>('get', `${baseURL}/note/${id}`, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};

export const createNote = (token: string, note: CreateNote): Promise<Note> => {
	return fetcher<Note>('post', `${baseURL}/note`, note, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};

export const updateNote = (token: string, newNote: CreateNote): Promise<Note> => {
	return fetcher<Note>('patch', `${baseURL}/note`, newNote, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};

export const deleteNote = (token: string, id: string): Promise<null> => {
	return fetcher<null>('delete', `${baseURL}/note/${id}`, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};
