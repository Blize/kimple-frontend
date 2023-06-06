import { Base } from './base.type';

export type Folder = Base & {
	id: string;
	title: string;
	userId: string;
	parentFolderId: string | null;
};
