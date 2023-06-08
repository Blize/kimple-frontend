import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import { Todo } from '@/types/todo.type';

import todoIcon from '@/assets/todo.svg';

import styles from './ExplorerTodo.module.css';

type Props = {
	todo: Todo;
};

const ExplorerTodo = ({ todo }: Props): ReactElement => {
	return (
		<Link href={`/editor/${todo.id}`}>
			<div className={styles.todo}>
				<Image className={styles.icon} src={todoIcon} width={20} height={20} alt="todo icon" />
				<p>{todo.title ?? todo.todoItems[0].name ?? 'Empty Todo'}</p>
			</div>
		</Link>
	);
};

export default ExplorerTodo;
