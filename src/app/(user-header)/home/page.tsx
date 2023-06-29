import { cookies } from 'next/headers';
import { ReactElement } from 'react';

import { Note } from '@/types/note.type';
import { Recent } from '@/types/recent.type';
import { Todo } from '@/types/todo.type';

import { getNotes } from '@/services/notes.service';
import { getTodos } from '@/services/todo.service';

import CreateCard from '@/components/CreateCard/CreateCard';
import HomeCard from '@/components/HomeCard/HomeCard';
import Line from '@/components/Line/Line';

import styles from './home.module.css';

const HomePage = async (): Promise<ReactElement> => {
	const cookieToken = cookies().get('token')?.value ?? '';
	const cookieRecent: Recent = JSON.parse(cookies().get('recent')?.value ?? '{}') ?? {};

	const notes: Note[] | null = (await getNotes(cookieToken)) ?? null;
	const todos: Todo[] | null = (await getTodos(cookieToken)) ?? null;

	const suggestions = [...notes, ...todos].sort((itemA, itemB) => {
		// TODO handle if cookieRecent[itemA.id] or cookieRecent[itemB.id] is undefined
		if (cookieRecent[itemA.id] > cookieRecent[itemB.id]) return -1;
		if (cookieRecent[itemA.id] < cookieRecent[itemB.id]) return 1;
		return 0;
	});

	return (
		<div className={styles.container}>
			<p>Most Viewed</p>

			<div className={styles.cardContainer}>
				{suggestions.map((item) => (
					<HomeCard key={`suggestion.${item.id}`} item={item} />
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
				{notes && notes.map((note) => <HomeCard key={note.id} item={note} />)}
				<CreateCard label="Add Note" />
			</div>

			<Line />

			<p>Todo Lists</p>

			<div className={styles.cardContainer}>
				{todos && todos.map((todo) => <HomeCard key={todo.id} item={todo} />)}
				<CreateCard label="Add Todo List" />
			</div>
		</div>
	);
};

export default HomePage;
