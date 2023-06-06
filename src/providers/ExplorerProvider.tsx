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

import { useNotifications } from './NotificationProvider';

type Props = {
	children: ReactNode;
};

type Values = {
	selectedFolder: Folder | null;
	setSelectedFolder: Dispatch<SetStateAction<Folder | null>>;

	newFolderMode: boolean;
	setNewFolderMode: Dispatch<SetStateAction<boolean>>;

	newFolderTitle: string;
	setNewFolderTitle: Dispatch<SetStateAction<string>>;

	handleAddFolder: (cookie: string) => void;
};

const ExplorerContext = createContext<Values | undefined>(undefined);

const ExplorerProvider = ({ children }: Props): ReactElement => {
	const { addSuccess, addError } = useNotifications();

	const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
	const [newFolderMode, setNewFolderMode] = useState(false);
	const [newFolderTitle, setNewFolderTitle] = useState('');

	const router = useRouter();

	const handleAddFolder = async (cookie: string): Promise<void> => {
		try {
			await createFolder(cookie, {
				title: newFolderTitle,
				...(selectedFolder && { parentFolderId: selectedFolder.id }),
			});

			startTransition(() => router.refresh());

			addSuccess('successfully created new folder');

			setNewFolderMode(false);
			setNewFolderTitle('');
		} catch (err) {
			addError('failed to create new folder', err);
		}
	};

	return (
		<ExplorerContext.Provider
			value={{
				selectedFolder,
				setSelectedFolder,
				newFolderMode,
				setNewFolderMode,
				newFolderTitle,
				setNewFolderTitle,
				handleAddFolder,
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
