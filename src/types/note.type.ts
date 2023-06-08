import { Base } from './base.type';

export type Note = Base & {
	title: string | null;
	content: string | null;
	userId: string;
	folderId: string | null;
	createdAt: string;
	updatedAt: string | null;
};

export type CreateNote = {
	folderId?: string;
	title?: string;
	content?: string;
};
