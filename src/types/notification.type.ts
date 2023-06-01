export type Level = 'info' | 'success' | 'warning' | 'error';

export type Notification = {
	id: number;
	level: Level;
	message: string;
	faded: boolean;
	cleared: boolean;
};
