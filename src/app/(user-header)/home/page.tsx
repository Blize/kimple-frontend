import { cookies } from 'next/headers';
import { ReactElement } from 'react';

import { Note } from '@/types/note.type';
import { Recent } from '@/types/recent.type';

import { getNotes } from '@/services/notes.service';

import CreateCard from '@/components/CreateCard/CreateCard';
import HomeCard from '@/components/HomeCard/HomeCard';
import Line from '@/components/Line/Line';

import styles from './home.module.css';

const HomePage = async (): Promise<ReactElement> => {
	const cookieToken = cookies().get('token')?.value ?? '';
	const cookieRecent: Recent = JSON.parse(cookies().get('recent')?.value ?? '{}') ?? {};

	const notes: Note[] | null = (await getNotes(cookieToken)) ?? null;

	// TODO add todos here too when implemented
	const suggestions = [...notes].sort((itemA, itemB) => {
		if (cookieRecent[itemA.id] > cookieRecent[itemB.id]) return -1;
		if (cookieRecent[itemA.id] < cookieRecent[itemB.id]) return 1;
		return 0;
	});

	return (
		<div className={styles.container}>
			<p>Most Viewed</p>

			<div>
				{suggestions.map((item) => (
					<HomeCard key={`suggestion.${item.id}`} note={item} />
				))}

				{suggestions.length < 1 && (
					<div className={styles.emptySuggestions}>
						<p>Your most used Notes and Todos will be shown here</p>
						<p className="small">this will adjust and fill up as you use kimple</p>
					</div>
				)}
			</div>

			<Line />

			<p>Notes</p>

			<div className={styles.cardContainer}>
				{notes && notes.map((note) => <HomeCard key={note.id} note={note} />)}
				<CreateCard label="Add Note" />
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
