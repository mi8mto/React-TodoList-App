import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './App/components/Header/Header';
import { NotFound404 } from './App/components/NotFound404';
import { SinglePage } from './App/components/SinglePage';

import { TodoListJsonServer } from './App/components/TodoListJSONServer';

import styles from './App.module.css';

export const App = () => {
	return (
		<div>
			{<Header />}
			<div className={styles.container}>
				<Routes>
					<Route path="/" element={<TodoListJsonServer />} />
					<Route path="/task/:id" element={<SinglePage />} />
					<Route path="/404" element={<NotFound404 />} />
					<Route path="*" element={<Navigate to="/404" replace />} />
				</Routes>
			</div>
		</div>
	);
};
