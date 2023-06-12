import { env } from '@/env.mjs';

import { CreateNote } from '@/types/note.type';
import { Todo, UpdateTodo } from '@/types/todo.type';

import { fetcher } from '@/utils/fetcher';

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

export const updateTodo = (token: string, id: string, newTodo: UpdateTodo): Promise<Todo> => {
	return fetcher<Todo>('patch', `${baseURL}/todo/${id}`, newTodo, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};

export const deleteTodo = (token: string, id: string): Promise<Todo> => {
	return fetcher<Todo>('delete', `${baseURL}/todo/${id}`, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
		cache: 'no-store',
	});
};
