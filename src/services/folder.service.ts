import { env } from '@/env.mjs';
import { fetcher } from '@/utils/fetcher';

import { CreateFolder, Folder, UpdateFolder } from '@/types/folder.type';
import { Note } from '@/types/note.type';
import { Todo } from '@/types/todo.type';

const baseURL = env.NEXT_PUBLIC_BACKEND_URL;

export const getFolders = (token: string, notes?: boolean, todos?: boolean): Promise<(Folder | Note | Todo)[]> => {
	return fetcher<(Folder | Note | Todo)[]>('get', `${baseURL}/folder`, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		params: {
			notes,
			todos,
		},
		cache: 'no-store',
	});
};

export const createFolder = (token: string, newFolder: CreateFolder): Promise<Folder> => {
	return fetcher<Folder>('post', `${baseURL}/folder`, newFolder, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};

export const updateFolder = (token: string, id: string, newFolder: UpdateFolder): Promise<Folder> => {
	return fetcher<Folder>('patch', `${baseURL}/folder/${id}`, newFolder, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};

export const deleteFolder = (token: string, id: string): Promise<null> => {
	return fetcher<null>('delete', `${baseURL}/folder/${id}`, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};
