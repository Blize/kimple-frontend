import { Base } from './base.type';
import { Note } from './note.type';
import { Todo } from './todo.type';

export type Folder = Base & {
	id: string;
	title: string;
	userId: string;
	parentFolderId: string | null;

	subFolders?: (Folder | Todo | Note)[];
};

export type CreateFolder = {
	title: string;
	parentFolderId?: string;
};

export type UpdateFolder = {
	title?: string;
	parentFolderId?: string;
};
