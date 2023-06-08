import { cookies } from 'next/headers';
import { ReactElement } from 'react';

import { Note } from '@/types/note.type';

import { getNote } from '@/services/notes.service';

import Editor from '@/components/Editor/Editor';

const ItemPage = async ({ params }: { params: { id: string } }): Promise<ReactElement> => {
	const cookieToken = cookies().get('token')?.value ?? '';

	const note: Note | null = (await getNote(cookieToken, params.id)) ?? null;

	return (
		<div>
			{note && <Editor update={true} note={note} />}
			{/* TODO: nice error message handling stuff */}
			{!note && <p>no note found</p>}
		</div>
	);
};

export default ItemPage;
