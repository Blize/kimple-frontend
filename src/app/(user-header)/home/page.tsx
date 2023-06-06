import { cookies } from 'next/headers';
import { ReactElement } from 'react';

import { Note } from '@/types/note.type';

import { getNotes } from '@/services/notes.service';

import CreateCard from '@/components/CreateCard/CreateCard';
import Line from '@/components/Line/Line';

import styles from './home.module.css';

const HomePage = async (): Promise<ReactElement> => {
	const cookieToken = cookies().get('token')?.value ?? '';

	const notes: Note[] | null = (await getNotes(cookieToken)) ?? null;

	return (
		<div>
			<p>Recently Viewed</p>

			<div>{/* cards */}</div>

			<Line />

			<p>Notes</p>

			<div className={styles.cardContainer}>
				{notes && notes.map((note) => <p key={`notes.${note.id}`}>{note.title}</p>)} <CreateCard label="Add Note" />
			</div>

			<Line />

			<p>Todo Lists</p>

			<div className={styles.cardContainer}>
				{/* cards */}
				<CreateCard label="Add Todo List" />
			</div>
		</div>
	);
};

export default HomePage;
