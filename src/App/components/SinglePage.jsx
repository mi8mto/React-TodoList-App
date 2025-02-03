import { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import styles from './TodoList.module.css';

// export const SinglePage = (handleClick) => {
export const SinglePage = () => {
	const { id } = useParams();
	const [todo, setTodo] = useState(null); // Состояние для одной задачи
	const [editingId, setEditingId] = useState(null); // Стейт для отслеживания редактируемой задачи
	const [editingTitle, setEditingTitle] = useState(''); // Стейт для отслеживания нового текста задачи
	const [isActive, setIsActive] = useState(false);
	const navigate = useNavigate(); // Хук для навигации

	// Загружаем данные с сервера при монтировании компонента
	useEffect(() => {
		fetch(`http://localhost:3000/todos/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setTodo(data);
				setEditingTitle(data.title); // Устанавливаем начальное значение для редактирования
			});
	}, [id]);

	// Функция для редактирования задачи
	const editTodo = (title) => {
		setEditingId(id); // Устанавливаем, что задача редактируется
		setEditingTitle(title); // Инициализируем редактор с текущим названием
	};

	// Функция для сохранения изменений задачи
	const saveEditTodo = () => {
		// Обновление задачи на сервере
		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: editingTitle, // Отправляем обновленный текст
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setTodo(data); // Обновляем состояние задачи
				setEditingId(null); // Снимаем флаг редактирования
			});
	};

	// Функция для удаления задачи
	const deleteTodo = (id) => {
		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',
		}).then(() => {
			// После удаления можно перенаправить или обновить состояние
			console.log('Задача удалена');
		});
	};

	// Функция для возврата на предыдущую страницу
	const goBack = () => {
		navigate(-1); // Переход на предыдущую страницу
	};

	if (!todo) return <div>Загрузка...</div>;

	if (!todo.id) {
		// Если задача не найдена, редиректим на страницу 404
		return <Navigate to="/404" replace />;
	}

	return (
		<div>
			{/* <p>
				<Link to="/">dthyenmcz</Link>
			</p> */}

			{/* Кнопка "Назад" */}
			<button onClick={goBack} className={styles.backButton}>
				← Назад
			</button>
			<div key={id} className={styles.todoItem}>
				{/* Если задача редактируется, показываем инпут */}
				{editingId === id ? (
					<>
						<input
							className={styles.changeInput}
							type="text"
							value={editingTitle}
							onChange={(e) => setEditingTitle(e.target.value)}
						/>
						<button className={styles.editButton} onClick={saveEditTodo}>
							ок
						</button>
					</>
				) : (
					<>
						<span className={isActive ? '' : 'active-span'}>
							{todo.title}
						</span>
						<div className={styles.buttonContainer}>
							{/* Кнопка для редактирования задачи */}
							<button
								onClick={() => editTodo(todo.title)}
								className={styles.editButton}
							>
								Ред
							</button>
							{/* Кнопка для удаления задачи */}
							<button
								onClick={() => deleteTodo(todo.id)}
								className={styles.deleteButton}
							>
								х
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
