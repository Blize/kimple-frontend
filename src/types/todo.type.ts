import { Base } from './base.type';

type TodoItem = Base & {
	name: string;
	done: boolean;
	todoListId: string;
};

export type Todo = Base & {
	id: string;
	title: string;
	userId: string;
	folderId: string | null;
	todoItems: TodoItem[];
};

export type CreateTodo = {
	title?: string;
	folderId?: string;
	todoItems?: TodoItem[];
};

export type UpdateTodo = {
	title?: string | null;
	folderId?: string | null;
	todoItems?: TodoItem[];
};
