import { env } from '@/env.mjs';
import { fetcher } from '@/utils/fetcher';

import { Base } from '@/types/base.type';
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

export const getNote = (token: string, id: Base['id']): Promise<Note> => {
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

export const updateNote = (token: string, newNote: CreateNote, id: Base['id']): Promise<Note> => {
	return fetcher<Note>('patch', `${baseURL}/note/${id}`, newNote, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};

export const deleteNote = (token: string, id: Base['id']): Promise<null> => {
	return fetcher<null>('delete', `${baseURL}/note/${id}`, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};
