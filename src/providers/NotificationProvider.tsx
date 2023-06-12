'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ReactElement, ReactNode, createContext, useContext, useState } from 'react';

import icon from '@/assets/x.svg';

import { Notification } from '../types/notification.type';
import styles from './NotificationProvider.module.css';

type Props = {
	children: ReactNode;
};

type Values = {
	notifications: Notification[];
	addInfo: (message: Notification['message']) => void;
	addSuccess: (message: Notification['message']) => void;
	addWarning: (message: Notification['message']) => void;
	addError: (message: Notification['message'], error: unknown) => void;
};

const useNotifications = (): Values => {
	return useContext(NotificationContext);
};

const NotificationContext = createContext<Values>({
	notifications: [],
	addInfo: () => null,
	addSuccess: () => null,
	addWarning: () => null,
	addError: () => null,
});

const NotificationProvider = ({ children }: Props): ReactElement => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	const fadedNotification = (id: Notification['id']): void => {
		setNotifications((notifications) =>
			notifications.map((notification) => (notification.id === id ? { ...notification, faded: true } : notification)),
		);
	};

	const clearNotification = (id: Notification['id']): void => {
		setNotifications((notifications) =>
			notifications.map((notification) => (notification.id === id ? { ...notification, cleared: true } : notification)),
		);
		setNotifications((notifications) => notifications.filter((notification) => notification.id !== id));
	};

	const addInfo = (message: Notification['message']): void => {
		const id = Date.now();
		setNotifications([
			...notifications,
			{
				id,
				level: 'info',
				message,
				faded: false,
				cleared: false,
			},
		]);
		setTimeout(() => clearNotification(id), 4000);
		fadedNotification(id);
	};

	const addSuccess = (message: Notification['message']): void => {
		const id = Date.now();
		setNotifications([
			...notifications,
			{
				id,
				level: 'success',
				message,
				faded: false,
				cleared: false,
			},
		]);
		setTimeout(() => clearNotification(id), 4000);
		fadedNotification(id);
	};

	const addWarning = (message: Notification['message']): void => {
		const id = Date.now();
		setNotifications([
			...notifications,
			{
				id,
				level: 'warning',
				message,
				faded: false,
				cleared: false,
			},
		]);
		setTimeout(() => clearNotification(id), 6000);
		fadedNotification(id);
	};

	const addError = (message: Notification['message']): void => {
		const id = Date.now();
		setNotifications([
			...notifications,
			{
				id,
				level: 'error',
				message,
				faded: false,
				cleared: false,
			},
		]);
		setTimeout(() => clearNotification(id), 8000);
		fadedNotification(id);
	};

	const value: Values = { notifications, addInfo, addSuccess, addWarning, addError };

	const levelStyles = {
		info: styles.info,
		success: styles.success,
		warning: styles.warning,
		error: styles.error,
	};

	return (
		<NotificationContext.Provider value={value}>
			<div className={styles.wrapper}>
				<AnimatePresence>
					{notifications
						.sort((a, b) => b.id - a.id)
						.map((notification) => (
							<motion.div
								layout
								layoutId={`${notification.id}`}
								key={notification.id}
								className={clsx(styles.notification, levelStyles[notification.level])}
								initial={{ opacity: 0, x: 200 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 0, y: 0 }}
							>
								<p className={styles.message}>{notification.message}</p>

								<Image
									src={icon}
									height={20}
									width={20}
									alt="close"
									onClick={() => clearNotification(notification.id)}
									className={styles.closeIcon}
								/>
							</motion.div>
						))}
				</AnimatePresence>
			</div>
			{children}
		</NotificationContext.Provider>
	);
};

export { NotificationProvider, useNotifications };
