'use client';

import { useRouter } from 'next/navigation';
import {
	Dispatch,
	ReactElement,
	ReactNode,
	SetStateAction,
	createContext,
	startTransition,
	useContext,
	useState,
} from 'react';

import { Folder } from '@/types/folder.type';

import { createFolder } from '@/services/folder.service';
import { createNote } from '@/services/notes.service';
import { createTodo } from '@/services/todo.service';

import { useNotifications } from './NotificationProvider';

type Props = {
	children: ReactNode;
};

type NewItemMode = 'todo' | 'note' | 'folder' | null;

type Values = {
	selectedFolder: Folder | null;
	setSelectedFolder: Dispatch<SetStateAction<Folder | null>>;

	newItemMode: NewItemMode;
	setNewItemMode: Dispatch<SetStateAction<NewItemMode>>;

	newTitle: string;
	setNewTitle: Dispatch<SetStateAction<string>>;

	handleNewItem: (cookie: string) => void;
};

const ExplorerContext = createContext<Values | undefined>(undefined);

const ExplorerProvider = ({ children }: Props): ReactElement => {
	const { addSuccess, addError } = useNotifications();

	const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
	const [newItemMode, setNewItemMode] = useState<NewItemMode>(null);
	const [newTitle, setNewTitle] = useState('');

	const router = useRouter();

	const handleAddFolder = async (cookie: string): Promise<void> => {
		try {
			await createFolder(cookie, {
				title: newTitle,
				...(selectedFolder && { parentFolderId: selectedFolder.id }),
			});

			startTransition(() => router.refresh());

			addSuccess('successfully created new folder');

			setNewItemMode(null);
			setNewTitle('');
		} catch (err) {
			addError('failed to create new folder', err);
		}
	};

	const handleAddNote = async (cookie: string): Promise<void> => {
		try {
			const createdNote = await createNote(cookie, {
				title: newTitle,
				...(selectedFolder && { folderId: selectedFolder.id }),
			});

			startTransition(() => router.push(`/editor/${createdNote.id}`));

			addSuccess('successfully created new note');

			setNewItemMode(null);
			setNewTitle('');
		} catch (err) {
			addError('failed to create new note', err);
		}
	};

	const handleAddTodo = async (cookie: string): Promise<void> => {
		try {
			const createdTodo = await createTodo(cookie, {
				title: newTitle,
				...(selectedFolder && { folderId: selectedFolder.id }),
			});

			startTransition(() => router.push(`/editor/${createdTodo.id}`));

			addSuccess('successfully created new todo');

			setNewItemMode(null);
			setNewTitle('');
		} catch (err) {
			addError('failed to create new todo', err);
		}
	};

	const handleNewItem = (cookie: string): void => {
		switch (newItemMode) {
			case 'folder':
				handleAddFolder(cookie);
				break;
			case 'note':
				handleAddNote(cookie);
				break;
			case 'todo':
				handleAddTodo(cookie);
				break;
		}
	};

	return (
		<ExplorerContext.Provider
			value={{
				selectedFolder,
				setSelectedFolder,
				newItemMode,
				setNewItemMode,
				newTitle,
				setNewTitle,
				handleNewItem,
			}}
		>
			{children}
		</ExplorerContext.Provider>
	);
};

const useExplorer = (): Values => {
	const context = useContext(ExplorerContext);
	if (context === undefined) {
		throw new Error('useCover must be used within a CoverProvider');
	}
	return context;
};

export { useExplorer, ExplorerProvider };
