'use client';

import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactElement, startTransition, useState } from 'react';

import { Todo } from '@/types/todo.type';

import { deleteTodo, updateTodo } from '@/services/todo.service';

import { useNotifications } from '@/providers/NotificationProvider';

import ExplorerAddInput from '@/components/ExplorerAddInput/ExplorerAddInput';
import Tooltip from '@/components/Tooltip/Tooltip';

import penIcon from '@/assets/pen.svg';
import todoIcon from '@/assets/todo.svg';
import trashIcon from '@/assets/trash.svg';

import styles from './ExplorerTodo.module.css';

type Props = {
	todo: Todo;
};

const ExplorerTodo = ({ todo }: Props): ReactElement => {
	const tokenCookie = getCookie('token')?.toString() ?? '';

	const title = todo.title ?? todo.todoItems[0].name ?? 'Empty Todo';

	const { addSuccess, addError } = useNotifications();

	const router = useRouter();

	const [edit, setEdit] = useState(false);
	const [todoTitle, setTodoTitle] = useState('');

	const handleEdit = (): void => {
		setEdit((old) => !old);
		setTodoTitle(title);
	};

	const handleUpdate = async (): Promise<void> => {
		if (todoTitle === todo.title) return setEdit(false);

		try {
			await updateTodo(tokenCookie, todo.id, {
				title: todoTitle,
			});

			startTransition(() => router.refresh());

			addSuccess('successfully changed todo title');

			setEdit(false);
		} catch (err) {
			addError('failed to change todo title', err);
		}
	};

	const handleDelete = async (): Promise<void> => {
		try {
			await deleteTodo(tokenCookie, todo.id);

			addSuccess('successfully deleted todo');

			startTransition(() => router.refresh());
		} catch (err) {
			addError('failed to delete todo', err);
		}
	};

	return (
		<div className={styles.todo}>
			{!edit ? (
				<Link href={`/editor/${todo.id}`}>
					<div className={styles.main}>
						<Image className={styles.icon} src={todoIcon} width={19} height={19} alt="note icon" />
						<p>{title}</p>
					</div>
				</Link>
			) : (
				<div className={styles.main}>
					<ExplorerAddInput
						type="todo"
						value={todoTitle}
						onChange={(e) => setTodoTitle(e.target.value)}
						onSubmit={() => handleUpdate()}
						onBlur={() => setEdit(false)}
					/>
				</div>
			)}

			<div className={styles.options}>
				<Image className={styles.edit} src={penIcon} width={20} height={20} alt="pen icon" onClick={handleEdit} />

				<Tooltip
					items={[
						{
							label: 'Are you sure?',
							icon: 'alert',
							action: () => handleDelete(),
						},
					]}
				>
					<Image className={styles.edit} src={trashIcon} width={20} height={20} alt="delete icon" />
				</Tooltip>
			</div>
		</div>
	);
};

export default ExplorerTodo;
