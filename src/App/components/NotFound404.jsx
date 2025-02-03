import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../App/components/TodoList.module.css';

export const NotFound404 = () => {
	return (
		<div className={styles.notFoundPage}>
			<h1>404</h1>
			<p>Страница не найдена</p>
			<p>
				Вы можете вернуться на{' '}
				<Link to="/React-TodoList-App/">главную страницу</Link>.
			</p>
		</div>
	);
};
