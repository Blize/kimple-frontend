import { env } from '@/env.mjs';
import { fetcher } from '@/utils/fetcher';

import { CreateNote } from '@/types/note.type';
import { Todo, UpdateTodo } from '@/types/todo.type';

const baseURL = env.NEXT_PUBLIC_BACKEND_URL;

export const getTodos = (token: string): Promise<Todo[]> => {
	return fetcher<Todo[]>('get', `${baseURL}/todo`, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		next: {
			revalidate: 10, // use cache for 10 secs, then get new data
		},
	});
};

export const createTodo = (token: string, todo: CreateNote): Promise<Todo> => {
	return fetcher<Todo>('post', `${baseURL}/todo`, todo, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};

export const updateTodo = (token: string, newTodo: UpdateTodo): Promise<Todo> => {
	return fetcher<Todo>('patch', `${baseURL}/todo`, newTodo, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};
